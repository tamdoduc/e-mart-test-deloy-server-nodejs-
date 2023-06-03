'use strict';

function valuefy(value) {
	if (typeof value !== 'object') {
		return (typeof value === 'string') ? `"${value}"` : value;
	}

	let values = [];

	if (Array.isArray(value)) {
		for (const v of value) {
			values.push(valuefy(v));
		}
		values = `[${values.join(',')}]`;
	} else {
		for (let v in value) {
			if ({}.hasOwnProperty.call(value, v)) {
				values.push(`"${v}":${valuefy(value[v])}`);
			}
		}
		values = `{${values.join(',')}}`;
	}

	return values;
}

function serialize(target) {
	if (!target || typeof target !== 'object') {
		throw new TypeError('Invalid type of target');
	}

	let values = [];

	for (let t in target) {
		if ({}.hasOwnProperty.call(target, t)) {
			values.push(`${t}=${valuefy(target[t])}`);
		}
	}

	return values;
}

function extract(t, outter, onlyContent) {
	const start = onlyContent ? 1 : 0;
	const pad = onlyContent ? 0 : 1;
	return t.slice(start, t.lastIndexOf(outter) + pad);
}

function objectify(v) {
	if (v[0] === '{') {
		return JSON.parse(extract(v, '}'));
	} else if (v[0] === '[') {
		const set = [];
		const es = extract(v, ']', true);

		if (es[0] === '[' || es[0] === '{') {
			set.push(objectify(es));
		} else {
			for (const e of es.split(',')) {
				set.push(objectify(e));
			}
		}

		return set;
	} else if (v[0] === '"') {
		v = extract(v, '"', true);
	}

	return v;
}

function deserialize(values) {
	if (!values) {
		throw new TypeError('Invalid type of values');
	} else if (!Array.isArray(values)) {
		values = [values];
	}

	const target = {};

	for (const v of values) {
		const fieldValue = v.split('=', 2);
		target[fieldValue[0]] = objectify(fieldValue[1]);
	}

	return target;
}

module.exports = {
	pairify: serialize,
	parse: deserialize
};
