/****
 * The MIT License
 *
 * Copyright (c) 2017 Riley Shaw
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 ****/
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('timsortAsync', ['exports', 'regenerator-runtime/runtime'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime/runtime'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.runtime);
    global.timsortAsync = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sort = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var DEFAULT_MIN_MERGE = 32;

  var DEFAULT_MIN_GALLOPING = 7;

  var DEFAULT_TMP_STORAGE_LENGTH = 256;

  function minRunLength(n) {
    var r = 0;

    while (n >= DEFAULT_MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }

    return n + r;
  }

  var makeAscendingRun = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(array, lo, hi, compare) {
      var runHi;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              runHi = lo + 1;

              if (!(runHi === hi)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', 1);

            case 3:
              _context.next = 5;
              return compare(array[runHi++], array[lo]);

            case 5:
              _context.t0 = _context.sent;

              if (!(_context.t0 < 0)) {
                _context.next = 20;
                break;
              }

            case 7:
              _context.t1 = runHi < hi;

              if (!_context.t1) {
                _context.next = 13;
                break;
              }

              _context.next = 11;
              return compare(array[runHi], array[runHi - 1]);

            case 11:
              _context.t2 = _context.sent;
              _context.t1 = _context.t2 < 0;

            case 13:
              if (!_context.t1) {
                _context.next = 17;
                break;
              }

              runHi++;
              _context.next = 7;
              break;

            case 17:

              reverseRun(array, lo, runHi);
              _context.next = 30;
              break;

            case 20:
              _context.t3 = runHi < hi;

              if (!_context.t3) {
                _context.next = 26;
                break;
              }

              _context.next = 24;
              return compare(array[runHi], array[runHi - 1]);

            case 24:
              _context.t4 = _context.sent;
              _context.t3 = _context.t4 >= 0;

            case 26:
              if (!_context.t3) {
                _context.next = 30;
                break;
              }

              runHi++;
              _context.next = 20;
              break;

            case 30:
              return _context.abrupt('return', runHi - lo);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function makeAscendingRun(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  function reverseRun(array, lo, hi) {
    hi--;

    while (lo < hi) {
      var t = array[lo];
      array[lo++] = array[hi];
      array[hi--] = t;
    }
  }

  var binaryInsertionSort = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(array, lo, hi, start, compare) {
      var pivot, left, right, mid, n;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (start === lo) {
                start++;
              }

            case 1:
              if (!(start < hi)) {
                _context2.next = 30;
                break;
              }

              pivot = array[start];
              left = lo;
              right = start;

            case 5:
              if (!(left < right)) {
                _context2.next = 17;
                break;
              }

              mid = left + right >>> 1;
              _context2.next = 9;
              return compare(pivot, array[mid]);

            case 9:
              _context2.t0 = _context2.sent;

              if (!(_context2.t0 < 0)) {
                _context2.next = 14;
                break;
              }

              right = mid;
              _context2.next = 15;
              break;

            case 14:
              left = mid + 1;

            case 15:
              _context2.next = 5;
              break;

            case 17:
              n = start - left;
              _context2.t1 = n;
              _context2.next = _context2.t1 === 3 ? 21 : _context2.t1 === 2 ? 22 : _context2.t1 === 1 ? 23 : 25;
              break;

            case 21:
              array[left + 3] = array[left + 2];

            case 22:
              array[left + 2] = array[left + 1];

            case 23:
              array[left + 1] = array[left];
              return _context2.abrupt('break', 26);

            case 25:
              while (n > 0) {
                array[left + n] = array[left + n - 1];
                n--;
              }

            case 26:

              array[left] = pivot;

            case 27:
              start++;
              _context2.next = 1;
              break;

            case 30:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function binaryInsertionSort(_x5, _x6, _x7, _x8, _x9) {
      return _ref2.apply(this, arguments);
    };
  }();

  var gallopLeft = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(value, array, start, length, hint, compare) {
      var lastOffset, maxOffset, offset, tmp, m;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              lastOffset = 0;
              maxOffset = 0;
              offset = 1;
              _context3.next = 5;
              return compare(value, array[start + hint]);

            case 5:
              _context3.t0 = _context3.sent;

              if (!(_context3.t0 > 0)) {
                _context3.next = 25;
                break;
              }

              maxOffset = length - hint;

            case 8:
              _context3.t1 = offset < maxOffset;

              if (!_context3.t1) {
                _context3.next = 14;
                break;
              }

              _context3.next = 12;
              return compare(value, array[start + hint + offset]);

            case 12:
              _context3.t2 = _context3.sent;
              _context3.t1 = _context3.t2 > 0;

            case 14:
              if (!_context3.t1) {
                _context3.next = 20;
                break;
              }

              lastOffset = offset;
              offset = (offset << 1) + 1;

              if (offset <= 0) {
                offset = maxOffset;
              }
              _context3.next = 8;
              break;

            case 20:

              if (offset > maxOffset) {
                offset = maxOffset;
              }

              lastOffset += hint;
              offset += hint;

              _context3.next = 42;
              break;

            case 25:
              maxOffset = hint + 1;

            case 26:
              _context3.t3 = offset < maxOffset;

              if (!_context3.t3) {
                _context3.next = 32;
                break;
              }

              _context3.next = 30;
              return compare(value, array[start + hint - offset]);

            case 30:
              _context3.t4 = _context3.sent;
              _context3.t3 = _context3.t4 <= 0;

            case 32:
              if (!_context3.t3) {
                _context3.next = 38;
                break;
              }

              lastOffset = offset;
              offset = (offset << 1) + 1;

              if (offset <= 0) {
                offset = maxOffset;
              }
              _context3.next = 26;
              break;

            case 38:
              if (offset > maxOffset) {
                offset = maxOffset;
              }

              tmp = lastOffset;

              lastOffset = hint - offset;
              offset = hint - tmp;

            case 42:
              lastOffset++;

            case 43:
              if (!(lastOffset < offset)) {
                _context3.next = 55;
                break;
              }

              m = lastOffset + (offset - lastOffset >>> 1);
              _context3.next = 47;
              return compare(value, array[start + m]);

            case 47:
              _context3.t5 = _context3.sent;

              if (!(_context3.t5 > 0)) {
                _context3.next = 52;
                break;
              }

              lastOffset = m + 1;

              _context3.next = 53;
              break;

            case 52:
              offset = m;

            case 53:
              _context3.next = 43;
              break;

            case 55:
              return _context3.abrupt('return', offset);

            case 56:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function gallopLeft(_x10, _x11, _x12, _x13, _x14, _x15) {
      return _ref3.apply(this, arguments);
    };
  }();

  var gallopRight = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(value, array, start, length, hint, compare) {
      var lastOffset, maxOffset, offset, tmp, m;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              lastOffset = 0;
              maxOffset = 0;
              offset = 1;
              _context4.next = 5;
              return compare(value, array[start + hint]);

            case 5:
              _context4.t0 = _context4.sent;

              if (!(_context4.t0 < 0)) {
                _context4.next = 26;
                break;
              }

              maxOffset = hint + 1;

            case 8:
              _context4.t1 = offset < maxOffset;

              if (!_context4.t1) {
                _context4.next = 14;
                break;
              }

              _context4.next = 12;
              return compare(value, array[start + hint - offset]);

            case 12:
              _context4.t2 = _context4.sent;
              _context4.t1 = _context4.t2 < 0;

            case 14:
              if (!_context4.t1) {
                _context4.next = 20;
                break;
              }

              lastOffset = offset;
              offset = (offset << 1) + 1;

              if (offset <= 0) {
                offset = maxOffset;
              }
              _context4.next = 8;
              break;

            case 20:

              if (offset > maxOffset) {
                offset = maxOffset;
              }

              tmp = lastOffset;

              lastOffset = hint - offset;
              offset = hint - tmp;

              _context4.next = 42;
              break;

            case 26:
              maxOffset = length - hint;

            case 27:
              _context4.t3 = offset < maxOffset;

              if (!_context4.t3) {
                _context4.next = 33;
                break;
              }

              _context4.next = 31;
              return compare(value, array[start + hint + offset]);

            case 31:
              _context4.t4 = _context4.sent;
              _context4.t3 = _context4.t4 >= 0;

            case 33:
              if (!_context4.t3) {
                _context4.next = 39;
                break;
              }

              lastOffset = offset;
              offset = (offset << 1) + 1;

              if (offset <= 0) {
                offset = maxOffset;
              }
              _context4.next = 27;
              break;

            case 39:

              if (offset > maxOffset) {
                offset = maxOffset;
              }

              lastOffset += hint;
              offset += hint;

            case 42:
              lastOffset++;

            case 43:
              if (!(lastOffset < offset)) {
                _context4.next = 55;
                break;
              }

              m = lastOffset + (offset - lastOffset >>> 1);
              _context4.next = 47;
              return compare(value, array[start + m]);

            case 47:
              _context4.t5 = _context4.sent;

              if (!(_context4.t5 < 0)) {
                _context4.next = 52;
                break;
              }

              offset = m;

              _context4.next = 53;
              break;

            case 52:
              lastOffset = m + 1;

            case 53:
              _context4.next = 43;
              break;

            case 55:
              return _context4.abrupt('return', offset);

            case 56:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function gallopRight(_x16, _x17, _x18, _x19, _x20, _x21) {
      return _ref4.apply(this, arguments);
    };
  }();

  var TimSort = function () {
    function TimSort(array, compare) {
      _classCallCheck(this, TimSort);

      this.array = null;
      this.compare = null;
      this.minGallop = DEFAULT_MIN_GALLOPING;
      this.length = 0;
      this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;
      this.stackLength = 0;
      this.runStart = null;
      this.runLength = null;
      this.stackSize = 0;

      this.array = array;
      this.compare = compare;

      this.length = array.length;

      if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
        this.tmpStorageLength = this.length >>> 1;
      }

      this.tmp = new Array(this.tmpStorageLength);

      this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;

      this.runStart = new Array(this.stackLength);
      this.runLength = new Array(this.stackLength);
    }

    _createClass(TimSort, [{
      key: 'pushRun',
      value: function pushRun(runStart, runLength) {
        this.runStart[this.stackSize] = runStart;
        this.runLength[this.stackSize] = runLength;
        this.stackSize += 1;
      }
    }, {
      key: 'mergeRuns',
      value: function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
          var n;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!(this.stackSize > 1)) {
                    _context5.next = 12;
                    break;
                  }

                  n = this.stackSize - 2;

                  if (!(n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1])) {
                    _context5.next = 6;
                    break;
                  }

                  if (this.runLength[n - 1] < this.runLength[n + 1]) {
                    n--;
                  }

                  _context5.next = 8;
                  break;

                case 6:
                  if (!(this.runLength[n] > this.runLength[n + 1])) {
                    _context5.next = 8;
                    break;
                  }

                  return _context5.abrupt('break', 12);

                case 8:
                  _context5.next = 10;
                  return this.mergeAt(n);

                case 10:
                  _context5.next = 0;
                  break;

                case 12:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function mergeRuns() {
          return _ref5.apply(this, arguments);
        }

        return mergeRuns;
      }()
    }, {
      key: 'forceMergeRuns',
      value: function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
          var n;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(this.stackSize > 1)) {
                    _context6.next = 7;
                    break;
                  }

                  n = this.stackSize - 2;


                  if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
                    n--;
                  }

                  _context6.next = 5;
                  return this.mergeAt(n);

                case 5:
                  _context6.next = 0;
                  break;

                case 7:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function forceMergeRuns() {
          return _ref6.apply(this, arguments);
        }

        return forceMergeRuns;
      }()
    }, {
      key: 'mergeAt',
      value: function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(i) {
          var compare, array, start1, length1, start2, length2, k;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  compare = this.compare;
                  array = this.array;
                  start1 = this.runStart[i];
                  length1 = this.runLength[i];
                  start2 = this.runStart[i + 1];
                  length2 = this.runLength[i + 1];


                  this.runLength[i] = length1 + length2;

                  if (i === this.stackSize - 3) {
                    this.runStart[i + 1] = this.runStart[i + 2];
                    this.runLength[i + 1] = this.runLength[i + 2];
                  }

                  this.stackSize--;

                  _context7.next = 11;
                  return gallopRight(array[start2], array, start1, length1, 0, compare);

                case 11:
                  k = _context7.sent;

                  start1 += k;
                  length1 -= k;

                  if (!(length1 === 0)) {
                    _context7.next = 16;
                    break;
                  }

                  return _context7.abrupt('return');

                case 16:
                  _context7.next = 18;
                  return gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

                case 18:
                  length2 = _context7.sent;

                  if (!(length2 === 0)) {
                    _context7.next = 21;
                    break;
                  }

                  return _context7.abrupt('return');

                case 21:
                  if (!(length1 <= length2)) {
                    _context7.next = 26;
                    break;
                  }

                  _context7.next = 24;
                  return this.mergeLow(start1, length1, start2, length2);

                case 24:
                  _context7.next = 28;
                  break;

                case 26:
                  _context7.next = 28;
                  return this.mergeHigh(start1, length1, start2, length2);

                case 28:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function mergeAt(_x22) {
          return _ref7.apply(this, arguments);
        }

        return mergeAt;
      }()
    }, {
      key: 'mergeLow',
      value: function () {
        var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(start1, length1, start2, length2) {
          var compare, array, tmp, i, cursor1, cursor2, dest, minGallop, count1, count2, exit;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  compare = this.compare;
                  array = this.array;
                  tmp = this.tmp;
                  i = 0;


                  for (i = 0; i < length1; i++) {
                    tmp[i] = array[start1 + i];
                  }

                  cursor1 = 0;
                  cursor2 = start2;
                  dest = start1;


                  array[dest++] = array[cursor2++];

                  if (!(--length2 === 0)) {
                    _context8.next = 12;
                    break;
                  }

                  for (i = 0; i < length1; i++) {
                    array[dest + i] = tmp[cursor1 + i];
                  }
                  return _context8.abrupt('return');

                case 12:
                  if (!(length1 === 1)) {
                    _context8.next = 16;
                    break;
                  }

                  for (i = 0; i < length2; i++) {
                    array[dest + i] = array[cursor2 + i];
                  }
                  array[dest + length2] = tmp[cursor1];
                  return _context8.abrupt('return');

                case 16:
                  minGallop = this.minGallop;

                case 17:
                  if (!true) {
                    _context8.next = 80;
                    break;
                  }

                  count1 = 0;
                  count2 = 0;
                  exit = false;

                case 21:
                  _context8.next = 23;
                  return compare(array[cursor2], tmp[cursor1]);

                case 23:
                  _context8.t0 = _context8.sent;

                  if (!(_context8.t0 < 0)) {
                    _context8.next = 33;
                    break;
                  }

                  array[dest++] = array[cursor2++];
                  count2++;
                  count1 = 0;

                  if (!(--length2 === 0)) {
                    _context8.next = 31;
                    break;
                  }

                  exit = true;
                  return _context8.abrupt('break', 40);

                case 31:
                  _context8.next = 39;
                  break;

                case 33:
                  array[dest++] = tmp[cursor1++];
                  count1++;
                  count2 = 0;

                  if (!(--length1 === 1)) {
                    _context8.next = 39;
                    break;
                  }

                  exit = true;
                  return _context8.abrupt('break', 40);

                case 39:
                  if ((count1 | count2) < minGallop) {
                    _context8.next = 21;
                    break;
                  }

                case 40:
                  if (!exit) {
                    _context8.next = 42;
                    break;
                  }

                  return _context8.abrupt('break', 80);

                case 42:
                  _context8.next = 44;
                  return gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

                case 44:
                  count1 = _context8.sent;

                  if (!(count1 !== 0)) {
                    _context8.next = 53;
                    break;
                  }

                  for (i = 0; i < count1; i++) {
                    array[dest + i] = tmp[cursor1 + i];
                  }

                  dest += count1;
                  cursor1 += count1;
                  length1 -= count1;

                  if (!(length1 <= 1)) {
                    _context8.next = 53;
                    break;
                  }

                  exit = true;
                  return _context8.abrupt('break', 74);

                case 53:

                  array[dest++] = array[cursor2++];

                  if (!(--length2 === 0)) {
                    _context8.next = 57;
                    break;
                  }

                  exit = true;
                  return _context8.abrupt('break', 74);

                case 57:
                  _context8.next = 59;
                  return gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

                case 59:
                  count2 = _context8.sent;

                  if (!(count2 !== 0)) {
                    _context8.next = 68;
                    break;
                  }

                  for (i = 0; i < count2; i++) {
                    array[dest + i] = array[cursor2 + i];
                  }

                  dest += count2;
                  cursor2 += count2;
                  length2 -= count2;

                  if (!(length2 === 0)) {
                    _context8.next = 68;
                    break;
                  }

                  exit = true;
                  return _context8.abrupt('break', 74);

                case 68:
                  array[dest++] = tmp[cursor1++];

                  if (!(--length1 === 1)) {
                    _context8.next = 72;
                    break;
                  }

                  exit = true;
                  return _context8.abrupt('break', 74);

                case 72:

                  minGallop--;

                case 73:
                  if (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING) {
                    _context8.next = 42;
                    break;
                  }

                case 74:
                  if (!exit) {
                    _context8.next = 76;
                    break;
                  }

                  return _context8.abrupt('break', 80);

                case 76:

                  if (minGallop < 0) {
                    minGallop = 0;
                  }

                  minGallop += 2;
                  _context8.next = 17;
                  break;

                case 80:

                  this.minGallop = minGallop;

                  if (minGallop < 1) {
                    this.minGallop = 1;
                  }

                  if (!(length1 === 1)) {
                    _context8.next = 87;
                    break;
                  }

                  for (i = 0; i < length2; i++) {
                    array[dest + i] = array[cursor2 + i];
                  }
                  array[dest + length2] = tmp[cursor1];

                  _context8.next = 92;
                  break;

                case 87:
                  if (!(length1 === 0)) {
                    _context8.next = 91;
                    break;
                  }

                  throw new Error('mergeLow preconditions were not respected');

                case 91:
                  for (i = 0; i < length1; i++) {
                    array[dest + i] = tmp[cursor1 + i];
                  }

                case 92:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function mergeLow(_x23, _x24, _x25, _x26) {
          return _ref8.apply(this, arguments);
        }

        return mergeLow;
      }()
    }, {
      key: 'mergeHigh',
      value: function () {
        var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(start1, length1, start2, length2) {
          var compare, array, tmp, i, cursor1, cursor2, dest, customCursor, customDest, minGallop, count1, count2, exit;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  compare = this.compare;
                  array = this.array;
                  tmp = this.tmp;
                  i = 0;


                  for (i = 0; i < length2; i++) {
                    tmp[i] = array[start2 + i];
                  }

                  cursor1 = start1 + length1 - 1;
                  cursor2 = length2 - 1;
                  dest = start2 + length2 - 1;
                  customCursor = 0;
                  customDest = 0;


                  array[dest--] = array[cursor1--];

                  if (!(--length1 === 0)) {
                    _context9.next = 15;
                    break;
                  }

                  customCursor = dest - (length2 - 1);

                  for (i = 0; i < length2; i++) {
                    array[customCursor + i] = tmp[i];
                  }

                  return _context9.abrupt('return');

                case 15:
                  if (!(length2 === 1)) {
                    _context9.next = 23;
                    break;
                  }

                  dest -= length1;
                  cursor1 -= length1;
                  customDest = dest + 1;
                  customCursor = cursor1 + 1;

                  for (i = length1 - 1; i >= 0; i--) {
                    array[customDest + i] = array[customCursor + i];
                  }

                  array[dest] = tmp[cursor2];
                  return _context9.abrupt('return');

                case 23:
                  minGallop = this.minGallop;

                case 24:
                  if (!true) {
                    _context9.next = 95;
                    break;
                  }

                  count1 = 0;
                  count2 = 0;
                  exit = false;

                case 28:
                  _context9.next = 30;
                  return compare(tmp[cursor2], array[cursor1]);

                case 30:
                  _context9.t0 = _context9.sent;

                  if (!(_context9.t0 < 0)) {
                    _context9.next = 40;
                    break;
                  }

                  array[dest--] = array[cursor1--];
                  count1++;
                  count2 = 0;

                  if (!(--length1 === 0)) {
                    _context9.next = 38;
                    break;
                  }

                  exit = true;
                  return _context9.abrupt('break', 47);

                case 38:
                  _context9.next = 46;
                  break;

                case 40:
                  array[dest--] = tmp[cursor2--];
                  count2++;
                  count1 = 0;

                  if (!(--length2 === 1)) {
                    _context9.next = 46;
                    break;
                  }

                  exit = true;
                  return _context9.abrupt('break', 47);

                case 46:
                  if ((count1 | count2) < minGallop) {
                    _context9.next = 28;
                    break;
                  }

                case 47:
                  if (!exit) {
                    _context9.next = 49;
                    break;
                  }

                  return _context9.abrupt('break', 95);

                case 49:
                  _context9.t1 = length1;
                  _context9.next = 52;
                  return gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

                case 52:
                  _context9.t2 = _context9.sent;
                  count1 = _context9.t1 - _context9.t2;

                  if (!(count1 !== 0)) {
                    _context9.next = 64;
                    break;
                  }

                  dest -= count1;
                  cursor1 -= count1;
                  length1 -= count1;
                  customDest = dest + 1;
                  customCursor = cursor1 + 1;

                  for (i = count1 - 1; i >= 0; i--) {
                    array[customDest + i] = array[customCursor + i];
                  }

                  if (!(length1 === 0)) {
                    _context9.next = 64;
                    break;
                  }

                  exit = true;
                  return _context9.abrupt('break', 89);

                case 64:

                  array[dest--] = tmp[cursor2--];

                  if (!(--length2 === 1)) {
                    _context9.next = 68;
                    break;
                  }

                  exit = true;
                  return _context9.abrupt('break', 89);

                case 68:
                  _context9.t3 = length2;
                  _context9.next = 71;
                  return gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

                case 71:
                  _context9.t4 = _context9.sent;
                  count2 = _context9.t3 - _context9.t4;

                  if (!(count2 !== 0)) {
                    _context9.next = 83;
                    break;
                  }

                  dest -= count2;
                  cursor2 -= count2;
                  length2 -= count2;
                  customDest = dest + 1;
                  customCursor = cursor2 + 1;

                  for (i = 0; i < count2; i++) {
                    array[customDest + i] = tmp[customCursor + i];
                  }

                  if (!(length2 <= 1)) {
                    _context9.next = 83;
                    break;
                  }

                  exit = true;
                  return _context9.abrupt('break', 89);

                case 83:

                  array[dest--] = array[cursor1--];

                  if (!(--length1 === 0)) {
                    _context9.next = 87;
                    break;
                  }

                  exit = true;
                  return _context9.abrupt('break', 89);

                case 87:

                  minGallop--;

                case 88:
                  if (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING) {
                    _context9.next = 49;
                    break;
                  }

                case 89:
                  if (!exit) {
                    _context9.next = 91;
                    break;
                  }

                  return _context9.abrupt('break', 95);

                case 91:

                  if (minGallop < 0) {
                    minGallop = 0;
                  }

                  minGallop += 2;
                  _context9.next = 24;
                  break;

                case 95:

                  this.minGallop = minGallop;

                  if (minGallop < 1) {
                    this.minGallop = 1;
                  }

                  if (!(length2 === 1)) {
                    _context9.next = 106;
                    break;
                  }

                  dest -= length1;
                  cursor1 -= length1;
                  customDest = dest + 1;
                  customCursor = cursor1 + 1;

                  for (i = length1 - 1; i >= 0; i--) {
                    array[customDest + i] = array[customCursor + i];
                  }

                  array[dest] = tmp[cursor2];

                  _context9.next = 112;
                  break;

                case 106:
                  if (!(length2 === 0)) {
                    _context9.next = 110;
                    break;
                  }

                  throw new Error('mergeHigh preconditions were not respected');

                case 110:
                  customCursor = dest - (length2 - 1);
                  for (i = 0; i < length2; i++) {
                    array[customCursor + i] = tmp[i];
                  }

                case 112:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function mergeHigh(_x27, _x28, _x29, _x30) {
          return _ref9.apply(this, arguments);
        }

        return mergeHigh;
      }()
    }]);

    return TimSort;
  }();

  var sort = exports.sort = function () {
    var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(array, compare) {
      var lo = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      var hi = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : array.length;
      var remaining, runLength, ts, minRun, force;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (Array.isArray(array)) {
                _context10.next = 2;
                break;
              }

              throw new TypeError('Can only sort arrays');

            case 2:
              remaining = hi - lo;

              if (!(remaining < 2)) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt('return');

            case 5:
              runLength = 0;

              if (!(remaining < DEFAULT_MIN_MERGE)) {
                _context10.next = 13;
                break;
              }

              _context10.next = 9;
              return makeAscendingRun(array, lo, hi, compare);

            case 9:
              runLength = _context10.sent;
              _context10.next = 12;
              return binaryInsertionSort(array, lo, hi, lo + runLength, compare);

            case 12:
              return _context10.abrupt('return');

            case 13:
              ts = new TimSort(array, compare);
              minRun = minRunLength(remaining);

            case 15:
              _context10.next = 17;
              return makeAscendingRun(array, lo, hi, compare);

            case 17:
              runLength = _context10.sent;

              if (!(runLength < minRun)) {
                _context10.next = 24;
                break;
              }

              force = remaining;

              if (force > minRun) {
                force = minRun;
              }

              _context10.next = 23;
              return binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);

            case 23:
              runLength = force;

            case 24:
              ts.pushRun(lo, runLength);
              _context10.next = 27;
              return ts.mergeRuns();

            case 27:
              remaining -= runLength;
              lo += runLength;

            case 29:
              if (remaining !== 0) {
                _context10.next = 15;
                break;
              }

            case 30:
              _context10.next = 32;
              return ts.forceMergeRuns();

            case 32:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function sort(_x31, _x32) {
      return _ref10.apply(this, arguments);
    };
  }();
});
