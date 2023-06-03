# field-value [![Build Status](https://travis-ci.org/ragingwind/field-value.svg?branch=master)](https://travis-ci.org/ragingwind/field-value)

> Pair up objects to field-values


## Install

```
$ npm install --save field-value
```


## Usage

```js
const fv = require('field-value');

// pair up object to field value pair
fv.pairify({
	'key1': 'value1',
	'key2': 'value2',
	'key3': 'value3',
	'key4': {
		'key4_1': 'value4_1',
		'key4_2': 'value4_2'
	}
});

//=>
[
	'key1="value1"',
	'key2=1',
	'key3=[3,"value3"]',
	'key4={"key4_1":"value4_1","key4_2":"value4_2"}',
]

// parse pairify field value to generate object
fv.parse([
	'key1="value1"',
	'key2=1',
	'key3=[3,"value3"]',
	'key4={"key4_1":"value4_1","key4_2":"value4_2"}',
]);
```


## API

### fieldValue.pairify(object)

Pair up objects to field-value

#### object

Type: object

Object consists of both of key and value

### fieldValue.parse(fieldValue)

Parse pairify field value to generate object

#### fieldValue

Type: Array or string

Strings pairified up by `field-value`

## Uses

You can see more complex samples in test.js

## Development

Using watch option `-w` to continuous build by babel for compile es2015 source

```js
OPTIONS=-w npm run build
```

## License

MIT © [Jimmy Moon](http://ragingwind.me)
