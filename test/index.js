'use strict';

const assert = require('assert');

const TimSort = require('../index.js');
const ArrayGenerator = require('./array-generator.js');

const lengths = [10, 100, 1000, 10000];
const repetitions = 10;

function numberCompare(a, b) {
  return a - b;
}

function numberCompareAsync(a, b) {
  return Promise.resolve(a - b);
}

describe('Sort a Random Array', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        const arr1 = ArrayGenerator.randomInt(length);
        const arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort a Descending Array', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.descendingInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort an Ascending Array', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.ascendingInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort an Ascending Array with 3 Random Exchanges', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.ascending3RandomExchangesInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort an Ascending Array with 10 Random Elements at Last', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.ascending10RandomEndInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });

  });
});

describe('Sort an Array of all Equal Elements', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.allEqualInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort an Array with Many Duplicates', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.manyDuplicateInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort an Array with Some Duplicates', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var arr1 = ArrayGenerator.someDuplicateInt(length);
        var arr2 = arr1.slice();
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync).then(() => {
          assert.deepEqual(arr1, arr2);
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort Subrange of a Random Array', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var lo = parseInt(length / 4);
        var hi = length - lo;
        var arr1 = ArrayGenerator.randomInt(length);
        var arr2 = arr1.slice(lo, hi);
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
          var j = 0;
          while (lo + j < hi) {
            assert.equal(arr1[lo + j], arr2[j]);
            j++;
          }
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort Subrange of a Descending Array', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var lo = parseInt(length / 4);
        var hi = length - lo;
        var arr1 = ArrayGenerator.descendingInt(length);
        var arr2 = arr1.slice(lo, hi);
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
          var j = 0;
          while (lo + j < hi) {
            assert.equal(arr1[lo + j], arr2[j]);
            j++;
          }
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort Subrange of an Ascending Array', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var lo = parseInt(length / 4);
        var hi = length - lo;
        var arr1 = ArrayGenerator.ascendingInt(length);
        var arr2 = arr1.slice(lo, hi);
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
          var j = 0;
          while (lo + j < hi) {
            assert.equal(arr1[lo + j], arr2[j]);
            j++;
          }
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe(
  'Sort Subrange of an Ascending Array with 3 Random Exchanges',
  function () {
    lengths.forEach(function (length) {

      it('Should sort a size ' + length + ' array', function (done) {
        const attempts = Array.from({length: repetitions}, () => {
          var lo = parseInt(length / 4);
          var hi = length - lo;
          var arr1 = ArrayGenerator.ascending3RandomExchangesInt(length);
          var arr2 = arr1.slice(lo, hi);
          arr2.sort(numberCompare);
          return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
            var j = 0;
            while (lo + j < hi) {
              assert.equal(arr1[lo + j], arr2[j]);
              j++;
            }
          }).catch(done);
        });

      Promise.all(attempts).then(() => done());
      });
    });
  });

describe(
  'Sort Subrange of an Ascending Array with 10 Random Elements at Last',
  function () {
    lengths.forEach(function (length) {

      it('Should sort a size ' + length + ' array', function (done) {
        const attempts = Array.from({length: repetitions}, () => {
          var lo = parseInt(length / 4);
          var hi = length - lo;
          var arr1 = ArrayGenerator.ascending10RandomEndInt(length);
          var arr2 = arr1.slice(lo, hi);
          arr2.sort(numberCompare);
          return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
            var j = 0;
            while (lo + j < hi) {
              assert.equal(arr1[lo + j], arr2[j]);
              j++;
            }
          }).catch(done);
        });

      Promise.all(attempts).then(() => done());
      });
    })
  });

describe('Sort Subrange of an Array of all Equal Elements', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var lo = parseInt(length / 4);
        var hi = length - lo;
        var arr1 = ArrayGenerator.allEqualInt(length);
        var arr2 = arr1.slice(lo, hi);
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
          var j = 0;
          while (lo + j < hi) {
            assert.equal(arr1[lo + j], arr2[j]);
            j++;
          }
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort Subrange of an Array with Many Duplicates', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var lo = parseInt(length / 4);
        var hi = length - lo;
        var arr1 = ArrayGenerator.manyDuplicateInt(length);
        var arr2 = arr1.slice(lo, hi);
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
          var j = 0;
          while (lo + j < hi) {
            assert.equal(arr1[lo + j], arr2[j]);
            j++;
          }
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});

describe('Sort Subrange of an Array with Some Duplicates', function () {
  lengths.forEach(function (length) {

    it('Should sort a size ' + length + ' array', function (done) {
      const attempts = Array.from({length: repetitions}, () => {
        var lo = parseInt(length / 4);
        var hi = length - lo;
        var arr1 = ArrayGenerator.someDuplicateInt(length);
        var arr2 = arr1.slice(lo, hi);
        arr2.sort(numberCompare);
        return TimSort.sort(arr1, numberCompareAsync, lo, hi).then(() => {
          var j = 0;
          while (lo + j < hi) {
            assert.equal(arr1[lo + j], arr2[j]);
            j++;
          }
        }).catch(done);
      });

      Promise.all(attempts).then(() => done());
    });
  });
});
