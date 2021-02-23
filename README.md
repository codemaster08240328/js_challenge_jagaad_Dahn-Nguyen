# jagaad-fe-challenge

Project is hosted here.
http://jagaad-fe.surge.sh/

## How to run locally

It requires React 15.6.0.
You can easily install using

```
nvm install 15.6.0
nvm use 15.6.0
```

Then run commands in your terminal

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

```

## Production build using Docker.

```bash

$ docker build -t jagaad-fe .
$ docker run -it -p 3000:3000 jagaad-fe

```

You can see the project running on your localhost:3000 in production mode.

## How to t

1. Unit test

```
$ yarn test
```

2. E2E test

```
yarn e2e
```
