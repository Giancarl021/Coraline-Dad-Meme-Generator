# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node16-appservice
FROM node:16.18.0 as base

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM mcr.microsoft.com/azure-functions/node:4-node16 as production

WORKDIR /home/site/wwwroot

ENV AzureWebJobsScriptRoot=/home/site/wwwroot
ENV AzureFunctionsJobHost__Logging__Console__IsEnabled=true


RUN apt-get update && \
    apt-get upgrade --yes && \
    apt-get install --yes imagemagick && \
    apt-get autoremove --yes

COPY --from=base /usr/app .