# express-lazy-middleware

[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]
[![NPM version][npm-v-image]][npm-url]
[![NPM Downloads][npm-dm-image]][npm-url]


--------------------------------------------------------------------------------


## Installation

```sh
$ npm install --save express-lazy-middleware
# Or with yarn
$ yarn add express-lazy-middleware
```


--------------------------------------------------------------------------------


## Usage

Basic usage:

```ts
'use strict';
/** Imports */
import * as Express from 'express';
import lazy from 'express-lazy-middleware';


/** Init */
app.get('/users', lazy(() => (req, res, next) => {
  res
    .send('I am too lazy');
}));


/** Start */
app.listen(3000);
```


Lazy require a module:

```ts
'use strict';
/** Imports */
import * as Express from 'express';
import lazy from 'express-lazy-middleware';


/** Init */
// `require` will be called after request to the `/users`.
// Note: when you use a ES6 module with `require()` don't forget about `default`
// export.
app.use('/users', lazy(() => require('./users').default));


/** Start */
app.listen(3000);
```


Init with promise:

```ts
'use strict';
/** Imports */
import * as Express from 'express';
import lazy from 'express-lazy-middleware';


/** Init */
// The `loader` (first argument) function will be called only once.
app.get('/session', lazy(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 5);
  });

  return require('./session').get;
}));


/** Start */
app.listen(3000);
```

--------------------------------------------------------------------------------


## Build

```sh
$ npm install
$ # or
$ yarn
$
$ npm run build
```


--------------------------------------------------------------------------------

## Test

```sh
$ npm run test
```


--------------------------------------------------------------------------------

## Contributing

1. Fork it (<https://github.com/SuperPaintman/express-lazy-middleware/fork>)
2. Create your feature branch (`git checkout -b feature/<feature_name>`)
3. Commit your changes (`git commit -am '<type>(<scope>): added some feature'`)
4. Push to the branch (`git push origin feature/<feature_name>`)
5. Create a new Pull Request


--------------------------------------------------------------------------------

## Contributors

- [SuperPaintman](https://github.com/SuperPaintman) SuperPaintman - creator, maintainer


--------------------------------------------------------------------------------

## Changelog
[Changelog][changelog-url]


--------------------------------------------------------------------------------

## License

[MIT][license-url]


[license-url]: https://raw.githubusercontent.com/SuperPaintman/express-lazy-middleware/master/LICENSE
[changelog-url]: https://raw.githubusercontent.com/SuperPaintman/express-lazy-middleware/master/CHANGELOG.md
[npm-url]: https://www.npmjs.com/package/express-lazy-middleware
[npm-v-image]: https://img.shields.io/npm/v/express-lazy-middleware.svg
[npm-dm-image]: https://img.shields.io/npm/dm/express-lazy-middleware.svg
[travis-image]: https://img.shields.io/travis/SuperPaintman/express-lazy-middleware/master.svg?label=linux
[travis-url]: https://travis-ci.org/SuperPaintman/express-lazy-middleware
[coveralls-image]: https://img.shields.io/coveralls/SuperPaintman/express-lazy-middleware/master.svg
[coveralls-url]: https://coveralls.io/r/SuperPaintman/express-lazy-middleware?branch=master
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: https://commitizen.github.io/cz-cli/
