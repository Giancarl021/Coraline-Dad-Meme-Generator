# Coraline-Dad-Meme-Generator

![Coraline Dad Empty Template](render/data/img/coraline-dad.png)

Coraline Dad tired meme generator [Containerized Azure Function](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-linux-custom-image?tabs=in-process%2Cbash%2Cazure-cli&pivots=programming-language-typescript).

## Pulling from Docker Hub

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

## Building from source

> **Note:** To build this project [Docker](https://www.docker.com/), [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) need to be installed.

### Locally

To build and run the project locally you can run the following commands:

> **Important:** To run the project without docker the `imagemagick` package is needed.

```bash
yarn build:local # Transpile Typescript to Javascript and copy assets
yarn start:local # Run the transpiled Javascript Azure Function locally
```

### Docker

To build and run the project in a container you can run the following commands:

```bash
yarn build:docker # Build the Docker image
yarn start:docker # Run the Docker image
```