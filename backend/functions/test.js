'use strict'

const ss = require('simple-statistics');
const groupBy = require('json-groupby');

const japanese = [5, 73, 29, 63, 68, 28, 45, 78, 70, 93];
const math = [11, 82, 25, 61, 66, 27, 42, 88, 71, 84];

var products = 
 [{"id": 1,
   "product": "ri", "price": 16, "color": "green", "available": false,
   "tags": ["bravo"],
   "vendor": {"name": "Donald Chambers", "address": {"city": "Mumbai"}}},
  {"id": 2,
   "product": "foef", "price": 44, "color": "yellow", "available": false,
   "tags": ["alpha"],
   "vendor": {"name": "Barbara Garrett", "address": {"city": "Mumbai"}}},
  {"id": 3,
   "product": "jehnojto", "price": 29, "color": "red", "available": true,
   "tags": ["alpha"],
   "vendor": {"name": "Anne Leonard", "address": {"city": "New York"}}},
  {"id": 4,
   "product": "ru", "price": 35, "color": "yellow", "available": false,
   "tags": ["echo", "charlie", "bravo"],
   "vendor": {"name": "Justin Doyle", "address": {"city": "London"}}},
  {"id": 5,
   "product": "pihluve", "price": 47, "color": "green", "available": true,
   "tags": ["delta", "echo", "bravo"],
   "vendor": {"name": "Emily Abbott", "address": {"city": "New York"}}},
  {"id": 6,
   "product": "dum", "price": 28, "color": "green", "available": true,
   "tags": ["echo", "delta", "charlie"],
   "vendor": {"name": "Henry Peterson", "address": {"city": "New York"}}},
  {"id": 7,
   "product": "zifpeza", "price": 10, "color": "green", "available": false,
   "tags": ["echo", "charlie", "bravo"],
   "vendor": {"name": "Jesus Lowe", "address": {"city": "Mumbai"}}},
  {"id": 8,
   "product": "av", "price": 39, "color": "green", "available": true,
   "tags": ["bravo"],
   "vendor": {"name": "Rosalie Erickson", "address": {"city": "New York"}}}]

const correlation = ss.sampleCorrelation(japanese, math).toFixed(2);
const sum = ss.sum(japanese);
const mean = ss.mean(japanese);

console.log(correlation);
console.log(sum);
console.log(mean);

console.log(groupBy(products, ['color'], ['id']));
