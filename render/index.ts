import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as multipart from 'parse-multipart-data';
import locate from '@giancarl021/locate';
import { readFile, writeFile } from 'fs/promises';
import { execSync as exec } from 'child_process';

import Temp from './src/temp';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const now = new Date();
  const tmp = Temp();

  console.log(`Request received at ${now.toISOString()}`);

  const [type] = req.headers['content-type']
    .split(';')
    .map((h) => h.trim().toLowerCase());

  if (type !== 'multipart/form-data') {
    await error('Invalid Content-Type. Must be multipart/form-data', 400);
    return;
  }

  const body = multipart.parse(
    req.body,
    multipart.getBoundary(req.headers['content-type'])
  );

  const imageField = body.find((e) => e.type.startsWith('image/'));

  if (!imageField) {
    await error('Invalid request. No image found', 400);
    return;
  }

  const imageExtension = imageField.filename?.split('.').pop();
  const imageBuffer = imageField.data;

  if (!imageExtension || !imageBuffer) {
    await error('Invalid image file', 400);
    return;
  }

  const imagePath = tmp.create(imageExtension);

  await writeFile(imagePath, imageBuffer);

  const convert = locate(`/usr/bin/convert`);
  const identify = locate(`/usr/bin/identify`);

  const baseImg = locate(`${__dirname}/data/img/coraline-dad.png`);
  const resultImg = tmp.create('png');

  const [width, height] = exec(`${identify} -format "%wx%h" ${baseImg}`)
    .toString('utf8')
    .split('x')
    .map(Number);

  if (width > 3000 || height > 2000) {
    context.res = error('Image too large', 400);

    return;
  }

  exec(
    `${convert} ${baseImg} \\( ${imagePath} -resize 1920x1080! +distort perspective "0,0 1310,350 1920,0 1935,342  1920,1080 1950,845  0,1080 1335,875" \\) ${baseImg} -layers flatten +repage ${resultImg}`
  );

  const resultBuffer = await readFile(resultImg);

  await tmp.clear();

  context.res = {
    body: resultBuffer,
    headers: {
      'Content-Type': 'image/png',
    },
  };

  async function error(message: string, statusCode: number = 500) {
    await tmp.clear();
    context.res = {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        error: message,
      },
    };
  }
};

export default httpTrigger;
