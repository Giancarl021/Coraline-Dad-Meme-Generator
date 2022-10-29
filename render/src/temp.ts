import { mkdirSync as mkdir } from 'fs';
import { unlink } from 'fs/promises';
import locate from '@giancarl021/locate';

const baseDir = locate(`${__dirname}/../temp`);
mkdir(baseDir, { recursive: true });

export default function () {
    const files: string[] = [];
    function create(extension: string = 'tmp') {
        const file = `${baseDir}/${Number(new Date())}-${Math.floor(Math.random() * 1000)}.${extension}`;

        files.push(file);

        return file;
    }

    async function clear() {
        await Promise.all(files.map(file => unlink(file)));
    }

    return {
        create,
        clear
    };
}