![Salve Mundi Logo](/Logo_paars.png)
# Salve Mundi website API
[![Coverage Status](https://coveralls.io/repos/github/salvemundi/samu-api/badge.svg?branch=master)](https://coveralls.io/github/salvemundi/samu-api?branch=master)
[![Build Status](http://ci.salvemundi.nl/teamcity/app/rest/builds/buildType:(id:SamuApi_Build)/statusIcon)](http://ci.salvemundi.nl)

## Description

This is a NodeJS backend build with TypeORM and NestJS to deliver all of the data to the website. 

## Getting started

Before you start, please read the following wiki sections:
- [Env](https://github.com/salvemundi/samu-api/wiki/Environment-File-(.env))
- [TypeORM](https://github.com/salvemundi/samu-api/wiki/TypeORM)
- [Testing](https://github.com/salvemundi/samu-api/wiki)

To make life easier, make sure that you have installed the nest CLI using: 
```
$ npm install -g @nestjs/cli
```
And use this cli to generate the components/controllers/services/etc. For documentatie see: [Nest CLI](https://docs.nestjs.com/cli/usages)

To run the api run the following commands and you will be set:

```bash
$ npm install
$ npm run start
```

## Full documentation

At the [wiki section](https://github.com/salvemundi/samu-api/wiki) of the repository is all the documentation

## Run tests

```bash
# run tests with coverage report
$ npm run testLocal
```

## License

This project is [GPL-2.0 licensed](LICENSE)
