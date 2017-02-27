# Node-TimSort Async: Fast Sorting for Node.js

An adaptive and **stable** sort algorithm based on merging that requires fewer than nlog(n)
comparisons when run on partially sorted arrays. The algorithm uses O(n) memory and still runs in O(nlogn)
(worst case) on random arrays.
This implementation is based on the original
[TimSort](http://svn.python.org/projects/python/trunk/Objects/listsort.txt) developed
by Tim Peters for Python's lists (code [here](http://svn.python.org/projects/python/trunk/Objects/listobject.c)).
TimSort has been also adopted in Java starting from version 7.

## Acknowledgments

This is forked from [Node TimSort](https://github.com/mziccard/node-timsort).

## Usage

Install the package with npm:
```
npm install --save timsort
```

You can also install it with bower:
```
bower install timsort
```
You must provide your own async compare function (to sort any object) as:
```javascript
function numberCompare(a, b) {
    return Promise.resolve(a - b);
}

var arr = [...];
var TimSort = require('timsort');
TimSort.sort(arr, numberCompare);
```
You can also sort only a specific subrange of the array:
```javascript
TimSort.sort(arr, numberCompare, 5, 10);
```

## Performance

I removed the benchmarks, since they weren't built with asynchronicity in mind.
Benchmarking speed here seems unimportant if you're waiting on user input.

## Stability

TimSort is *stable* which means that equal items maintain their relative order
after sorting. Stability is a desirable property for a sorting algorithm.
Consider the following array of items with an height and a weight.
```javascript
[
  { height: 100, weight: 80 },
  { height: 90, weight: 90 },
  { height: 70, weight: 95 },
  { height: 100, weight: 100 },
  { height: 80, weight: 110 },
  { height: 110, weight: 115 },
  { height: 100, weight: 120 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 100, weight: 135 },
  { height: 75, weight: 140 },
  { height: 70, weight: 140 }
]
```
Items are already sorted by `weight`. Sorting the array
according to the item's `height` with the `timsort` module
results in the following array:
```javascript
[
  { height: 70, weight: 95 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 70, weight: 140 },
  { height: 75, weight: 140 },
  { height: 80, weight: 110 },
  { height: 90, weight: 90 },
  { height: 100, weight: 80 },
  { height: 100, weight: 100 },
  { height: 100, weight: 120 },
  { height: 100, weight: 135 },
  { height: 110, weight: 115 }
]
```
Items with the same  `height` are still sorted by `weight` which means they preserved their relative order.

`array.sort`, instead, is not guarranteed to be *stable*. In Node v0.12.7
sorting the previous array by `height` with `array.sort` results in:
```javascript
[
  { height: 70, weight: 140 },
  { height: 70, weight: 95 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 75, weight: 140 },
  { height: 80, weight: 110 },
  { height: 90, weight: 90 },
  { height: 100, weight: 100 },
  { height: 100, weight: 80 },
  { height: 100, weight: 135 },
  { height: 100, weight: 120 },
  { height: 110, weight: 115 }
]
```
As you can see the sorting did not preserve `weight` ordering for items with the
same `height`.
