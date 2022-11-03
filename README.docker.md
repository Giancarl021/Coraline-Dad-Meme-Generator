# Coraline-Dad-Meme-Generator

Coraline Dad tired meme generator [Containerized Azure Function](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-linux-custom-image?tabs=in-process%2Cbash%2Cazure-cli&pivots=programming-language-typescript).

## Running

The image is available on Docker Hub as [giancarl021/coraline-dad-meme-generator-azure-function](https://hub.docker.com/r/giancarl021/coraline-dad-meme-generator-azure-function).

To run this container the following command can be used:

```bash
docker run --name coraline-dad-meme-generator -d --rm -p 7071:80 giancarl021/coraline-dad-meme-generator-azure-function:latest
```

## Usage

After running, the function will be available at `http://localhost:7071/api/render`.

The body must be a `multipart/form-data` with the following field:

```yaml
file: <image-file.extension>
```

The response will be an `image/png` file with the rendered result.

## Source-code

The source-code of this project can be found on [this GitHub repository](https://github.com/Giancarl021/Coraline-Dad-Meme-Generator).