
# co-nedb       [![NPM version][npm-image]][npm-url] [![Dependencies Status][dep-image]][dep-url] [![Build Status][build-image]][build-url] 

  Nedb made more awesome with generators.

## Installation

```
$ npm install co-nedb
```

## Setup

  Call `wrap()` on collections to make them generator friendly:

```js
var Datastore = require('nedb');
var wrap = require('co-nedb');

var db = new Datastore({ autoload: true }); // in-memory database
var users = wrap(db);
```

## Example

  Simple example:

```js
yield users.remove({});

yield users.insert({ name: 'Tobi', species: 'ferret' });
yield users.insert({ name: 'Loki', species: 'ferret' });
yield users.insert({ name: 'Jane', species: 'ferret' });

var res = yield users.findOne({ name: 'Tobi' });
res.name.should.equal('Tobi');

var res = yield users.find({ species: 'ferret' });
res.should.have.length(3);
```

  Parallel inserts:

```js
yield users.remove({});

yield [
  users.insert({ name: 'Tobi', species: 'ferret' }),
  users.insert({ name: 'Loki', species: 'ferret' }),
  users.insert({ name: 'Jane', species: 'ferret' })
];

var res = yield users.findOne({ name: 'Tobi' });
res.name.should.equal('Tobi');

var res = yield users.find({ species: 'ferret' });
res.should.have.length(3);
```

# License

  MIT


# Changelog

## v2.0.0 (18 Oct 2014)
- Bumped thunkify version from `0.0.1` to `2.1.2`.
- Removed nedb as a dependency
- Added .npmignore


[npm-image]: https://img.shields.io/npm/v/co-nedb.svg?style=flat-square
[npm-url]: https://npmjs.org/package/co-nedb
[dep-image]: http://img.shields.io/david/jksdua/co-nedb.svg?style=flat-square
[dep-url]: https://david-dm.org/jksdua/co-nedb
[build-image]: http://img.shields.io/travis/jksdua/co-nedb.svg?style=flat-square
[build-url]: https://travis-ci.org/jksdua/co-nedb
