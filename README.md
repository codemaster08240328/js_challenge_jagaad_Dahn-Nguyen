# jagaad-fe-challenge

Project is hosted here.
http://jagaad-fe.surge.sh/

## How to run locally

It requires Node ^12.13.0
You can easily install it using:

```bash
$ nvm install 12.3.0
$ nvm use 12.3.0
```

Then run commands in your terminal

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

```

## How to change `CURRENCY TYPE` and `Language`

You can simply change inside `/utils/constants`

## Production build using Docker.

```bash

$ docker build -t jagaad-fe .
$ docker run -it -p 3000:3000 jagaad-fe

```

You can see the project running on your localhost:3000 in production mode.

## How to test

1. Unit test

```bash
$ yarn test
```

2. E2E test

```bash
$ yarn e2e
```

## How to lint your code

```bash
$ yarn lint
```
