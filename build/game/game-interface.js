var game = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/uuid-random/index.js
  var require_uuid_random = __commonJS({
    "node_modules/uuid-random/index.js"(exports, module) {
      "use strict";
      (function() {
        var buf, bufIdx = 0, hexBytes = [], i;
        for (i = 0; i < 256; i++) {
          hexBytes[i] = (i + 256).toString(16).substr(1);
        }
        uuid2.BUFFER_SIZE = 4096;
        uuid2.bin = uuidBin;
        uuid2.clearBuffer = function() {
          buf = null;
          bufIdx = 0;
        };
        uuid2.test = function(uuid3) {
          if (typeof uuid3 === "string") {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid3);
          }
          return false;
        };
        var crypt0;
        if (typeof crypto !== "undefined") {
          crypt0 = crypto;
        } else if (typeof window !== "undefined" && typeof window.msCrypto !== "undefined") {
          crypt0 = window.msCrypto;
        }
        if (typeof module !== "undefined" && typeof __require === "function") {
          crypt0 = crypt0 || require_crypto();
          module.exports = uuid2;
        } else if (typeof window !== "undefined") {
          window.uuid = uuid2;
        }
        uuid2.randomBytes = function() {
          if (crypt0) {
            if (crypt0.randomBytes) {
              return crypt0.randomBytes;
            }
            if (crypt0.getRandomValues) {
              if (typeof Uint8Array.prototype.slice !== "function") {
                return function(n2) {
                  var bytes = new Uint8Array(n2);
                  crypt0.getRandomValues(bytes);
                  return Array.from(bytes);
                };
              }
              return function(n2) {
                var bytes = new Uint8Array(n2);
                crypt0.getRandomValues(bytes);
                return bytes;
              };
            }
          }
          return function(n2) {
            var i2, r = [];
            for (i2 = 0; i2 < n2; i2++) {
              r.push(Math.floor(Math.random() * 256));
            }
            return r;
          };
        }();
        function randomBytesBuffered(n2) {
          if (!buf || bufIdx + n2 > uuid2.BUFFER_SIZE) {
            bufIdx = 0;
            buf = uuid2.randomBytes(uuid2.BUFFER_SIZE);
          }
          return buf.slice(bufIdx, bufIdx += n2);
        }
        __name(randomBytesBuffered, "randomBytesBuffered");
        function uuidBin() {
          var b = randomBytesBuffered(16);
          b[6] = b[6] & 15 | 64;
          b[8] = b[8] & 63 | 128;
          return b;
        }
        __name(uuidBin, "uuidBin");
        function uuid2() {
          var b = uuidBin();
          return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
        }
        __name(uuid2, "uuid");
      })();
    }
  });

  // node_modules/json-stringify-safe/stringify.js
  var require_stringify = __commonJS({
    "node_modules/json-stringify-safe/stringify.js"(exports, module) {
      exports = module.exports = stringify;
      exports.getSerialize = serializer;
      function stringify(obj, replacer, spaces, cycleReplacer) {
        return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
      }
      __name(stringify, "stringify");
      function serializer(replacer, cycleReplacer) {
        var stack = [], keys = [];
        if (cycleReplacer == null)
          cycleReplacer = /* @__PURE__ */ __name(function(key, value) {
            if (stack[0] === value)
              return "[Circular ~]";
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
          }, "cycleReplacer");
        return function(key, value) {
          if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value))
              value = cycleReplacer.call(this, key, value);
          } else
            stack.push(value);
          return replacer == null ? value : replacer.call(this, key, value);
        };
      }
      __name(serializer, "serializer");
    }
  });

  // node_modules/random-seed/index.js
  var require_random_seed = __commonJS({
    "node_modules/random-seed/index.js"(exports, module) {
      "use strict";
      var stringify = require_stringify();
      var Mash = /* @__PURE__ */ __name(function() {
        var n2 = 4022871197;
        var mash = /* @__PURE__ */ __name(function(data) {
          if (data) {
            data = data.toString();
            for (var i = 0; i < data.length; i++) {
              n2 += data.charCodeAt(i);
              var h = 0.02519603282416938 * n2;
              n2 = h >>> 0;
              h -= n2;
              h *= n2;
              n2 = h >>> 0;
              h -= n2;
              n2 += h * 4294967296;
            }
            return (n2 >>> 0) * 23283064365386963e-26;
          } else {
            n2 = 4022871197;
          }
        }, "mash");
        return mash;
      }, "Mash");
      var uheprng = /* @__PURE__ */ __name(function(seed) {
        return function() {
          var o = 48;
          var c = 1;
          var p = o;
          var s = new Array(o);
          var i;
          var j;
          var k = 0;
          var mash = new Mash();
          for (i = 0; i < o; i++) {
            s[i] = mash(Math.random());
          }
          var rawprng = /* @__PURE__ */ __name(function() {
            if (++p >= o) {
              p = 0;
            }
            var t = 1768863 * s[p] + c * 23283064365386963e-26;
            return s[p] = t - (c = t | 0);
          }, "rawprng");
          var random3 = /* @__PURE__ */ __name(function(range2) {
            return Math.floor(range2 * (rawprng() + (rawprng() * 2097152 | 0) * 11102230246251565e-32));
          }, "random");
          random3.string = function(count) {
            var i2;
            var s2 = "";
            for (i2 = 0; i2 < count; i2++) {
              s2 += String.fromCharCode(33 + random3(94));
            }
            return s2;
          };
          var hash = /* @__PURE__ */ __name(function() {
            var args = Array.prototype.slice.call(arguments);
            for (i = 0; i < args.length; i++) {
              for (j = 0; j < o; j++) {
                s[j] -= mash(args[i]);
                if (s[j] < 0) {
                  s[j] += 1;
                }
              }
            }
          }, "hash");
          random3.cleanString = function(inStr) {
            inStr = inStr.replace(/(^\s*)|(\s*$)/gi, "");
            inStr = inStr.replace(/[\x00-\x1F]/gi, "");
            inStr = inStr.replace(/\n /, "\n");
            return inStr;
          };
          random3.hashString = function(inStr) {
            inStr = random3.cleanString(inStr);
            mash(inStr);
            for (i = 0; i < inStr.length; i++) {
              k = inStr.charCodeAt(i);
              for (j = 0; j < o; j++) {
                s[j] -= mash(k);
                if (s[j] < 0) {
                  s[j] += 1;
                }
              }
            }
          };
          random3.seed = function(seed2) {
            if (typeof seed2 === "undefined" || seed2 === null) {
              seed2 = Math.random();
            }
            if (typeof seed2 !== "string") {
              seed2 = stringify(seed2, function(key, value) {
                if (typeof value === "function") {
                  return value.toString();
                }
                return value;
              });
            }
            random3.initState();
            random3.hashString(seed2);
          };
          random3.addEntropy = function() {
            var args = [];
            for (i = 0; i < arguments.length; i++) {
              args.push(arguments[i]);
            }
            hash(k++ + (/* @__PURE__ */ new Date()).getTime() + args.join("") + Math.random());
          };
          random3.initState = function() {
            mash();
            for (i = 0; i < o; i++) {
              s[i] = mash(" ");
            }
            c = 1;
            p = o;
          };
          random3.done = function() {
            mash = null;
          };
          if (typeof seed !== "undefined") {
            random3.seed(seed);
          }
          random3.range = function(range2) {
            return random3(range2);
          };
          random3.random = function() {
            return random3(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
          };
          random3.floatBetween = function(min, max) {
            return random3.random() * (max - min) + min;
          };
          random3.intBetween = function(min, max) {
            return Math.floor(random3.random() * (max - min + 1)) + min;
          };
          return random3;
        }();
      }, "uheprng");
      uheprng.create = function(seed) {
        return new uheprng(seed);
      };
      module.exports = uheprng;
    }
  });

  // src/game/game-interface.ts
  var game_interface_exports = {};
  __export(game_interface_exports, {
    default: () => game_interface_default
  });

  // node_modules/@boardzilla/core/entry/board/element-collection.js
  var ElementCollection = class _ElementCollection extends Array {
    static {
      __name(this, "ElementCollection");
    }
    slice(...a) {
      return super.slice(...a);
    }
    filter(...a) {
      return super.filter(...a);
    }
    all(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, {}, ...finders);
      }
      return this._finder(className, {}, ...finders);
    }
    _finder(className, options, ...finders) {
      const coll = new _ElementCollection();
      if (options.limit !== void 0 && options.limit <= 0)
        return coll;
      const fns = finders.map((finder) => {
        if (typeof finder === "object") {
          const attrs = finder;
          return (el) => Object.entries(attrs).every(([k1, v1]) => (k1 === "empty" ? el.isEmpty() : el[k1]) === v1);
        }
        if (typeof finder === "string") {
          const name = finder;
          return (el) => el.name === name;
        }
        return finder;
      });
      const finderFn = /* @__PURE__ */ __name((el, order) => {
        if ((!className || el instanceof className) && fns.every((fn) => fn(el))) {
          if (order === "asc") {
            coll.push(el);
          } else {
            coll.unshift(el);
          }
        }
        if (!options.noRecursive) {
          if (options.limit !== void 0) {
            coll.push(...el._t.children._finder(className, { limit: options.limit - coll.length, order: options.order }, ...finders));
          } else {
            coll.push(...el._t.children._finder(className, {}, ...finders));
          }
        }
      }, "finderFn");
      if (options.order === "desc") {
        for (let e = this.length - 1; e >= 0; e--) {
          const el = this[e];
          if (options.limit !== void 0 && coll.length >= options.limit)
            break;
          finderFn(el, "desc");
        }
      } else {
        for (const el of this) {
          if (options.limit !== void 0 && coll.length >= options.limit)
            break;
          finderFn(el, "asc");
        }
      }
      return coll;
    }
    first(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1 }, ...finders)[0];
      }
      return this._finder(className, { limit: 1 }, ...finders)[0];
    }
    firstN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2 }, ...finders);
      }
      return this._finder(className, { limit: n2 }, ...finders);
    }
    last(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1, order: "desc" }, ...finders)[0];
      }
      return this._finder(className, { limit: 1, order: "desc" }, ...finders)[0];
    }
    lastN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2, order: "desc" }, ...finders);
      }
      return this._finder(className, { limit: n2, order: "desc" }, ...finders);
    }
    top(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1 }, ...finders)[0];
      }
      return this._finder(className, { limit: 1 }, ...finders)[0];
    }
    topN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2 }, ...finders);
      }
      return this._finder(className, { limit: n2 }, ...finders);
    }
    bottom(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1, order: "desc" }, ...finders)[0];
      }
      return this._finder(className, { limit: 1, order: "desc" }, ...finders)[0];
    }
    bottomN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2, order: "desc" }, ...finders);
      }
      return this._finder(className, { limit: n2, order: "desc" }, ...finders);
    }
    /**
     * Show these elements to all players
     * @category Visibility
     */
    showToAll() {
      for (const el of this) {
        delete el._visible;
      }
    }
    /**
     * Show these elements only to the given player
     * @category Visibility
     */
    showOnlyTo(player) {
      if (typeof player !== "number")
        player = player.position;
      for (const el of this) {
        el._visible = {
          default: false,
          except: [player]
        };
      }
    }
    /**
     * Show these elements to the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    showTo(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      for (const el of this) {
        if (el._visible === void 0)
          continue;
        if (el._visible.default) {
          if (!el._visible.except)
            continue;
          el._visible.except = el._visible.except.filter((i) => !player.includes(i));
        } else {
          el._visible.except = Array.from(/* @__PURE__ */ new Set([...el._visible.except instanceof Array ? el._visible.except : [], ...player]));
        }
      }
    }
    /**
     * Hide this element from all players
     * @category Visibility
     */
    hideFromAll() {
      for (const el of this) {
        el._visible = { default: false };
      }
    }
    /**
     * Hide these elements from the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    hideFrom(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      for (const el of this) {
        if (el._visible?.default === false && !el._visible.except)
          continue;
        if (el._visible === void 0 || el._visible.default === true) {
          el._visible = {
            default: true,
            except: Array.from(/* @__PURE__ */ new Set([...el._visible?.except instanceof Array ? el._visible.except : [], ...player]))
          };
        } else {
          if (!el._visible.except)
            continue;
          el._visible.except = el._visible.except.filter((i) => !player.includes(i));
        }
      }
    }
    /**
     * Sorts this collection by some {@link Sorter}.
     * @category Structure
     */
    sortBy(key, direction) {
      const rank = /* @__PURE__ */ __name((e, k) => typeof k === "function" ? k(e) : e[k], "rank");
      const [up, down] = direction === "desc" ? [-1, 1] : [1, -1];
      return this.sort((a, b) => {
        const keys = key instanceof Array ? key : [key];
        for (const k of keys) {
          const r1 = rank(a, k);
          const r2 = rank(b, k);
          if (r1 > r2)
            return up;
          if (r1 < r2)
            return down;
        }
        return 0;
      });
    }
    /**
     * Returns a copy of this collection sorted by some {@link Sorter}.
     * @category Structure
     */
    sortedBy(key, direction = "asc") {
      return this.slice(0, this.length).sortBy(key, direction);
    }
    /**
     * Returns the sum of all elements in this collection measured by a provided key
     * @category Queries
     *
     * @example
     * deck.create(Card, '2', { pips: 2 });
     * deck.create(Card, '3', { pips: 3 });
     * deck.all(Card).sum('pips'); // => 5
     */
    sum(key) {
      return this.reduce((sum, n2) => sum + (typeof key === "function" ? key(n2) : n2[key]), 0);
    }
    /**
     * Returns the element in this collection with the highest value of the
     * provided key(s).
     * @category Queries
     *
     * @param attributes - any number of {@link Sorter | Sorter's} used for
     * comparing. If multiple are provided, subsequent ones are used to break ties
     * on earlier ones.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 3, initiative: 2 });
     * army.all(Solider).withHighest('strength', 'initiative'); // => Soldier 'c'
     */
    withHighest(...attributes) {
      return this.sortedBy(attributes, "desc")[0];
    }
    /**
     * Returns the element in this collection with the lowest value of the
     * provided key(s).
     * @category Queries
     *
     * @param attributes - any number of {@link Sorter | Sorter's} used for
     * comparing. If multiple are provided, subsequent ones are used to break ties
     * on earlier ones.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 2, initiative: 2 });
     * army.all(Solider).withLowest('strength', 'initiative'); // => Soldier 'c'
     */
    withLowest(...attributes) {
      return this.sortedBy(attributes, "asc")[0];
    }
    /**
     * Returns the highest value of the provided key(s) found on any element in
     * this collection.
     * @category Queries
     *
     * @param key - a {@link Sorter | Sorter's} used for comparing and extracting
     * the max.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 2, initiative: 2 });
     * army.all(Solider).max('strength'); // => 3
     */
    max(key) {
      const el = this.sortedBy(key, "desc")[0];
      if (!el)
        return;
      return typeof key === "function" ? key(el) : el[key];
    }
    /**
     * Returns the lowest value of the provided key(s) found on any element in
     * this collection.
     * @category Queries
     *
     * @param key - a {@link Sorter | Sorter's} used for comparing and extracting
     * the minimum.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 2, initiative: 2 });
     * army.all(Solider).min('initiative'); // => 1
     */
    min(key) {
      const el = this.sortedBy(key, "asc")[0];
      if (!el)
        return;
      return typeof key === "function" ? key(el) : el[key];
    }
    /**
     * Returns whether all elements in this collection have the same value for key.
     * @category Queries
     */
    areAllEqual(key) {
      if (this.length === 0)
        return true;
      return this.every((el) => el[key] === this[0][key]);
    }
    /**
     * Remove all elements in this collection from the playing area and place them
     * into {@link Game#pile}
     * @category Structure
     */
    remove() {
      for (const el of this) {
        if ("isSpace" in el)
          throw Error("cannot move Space");
        el.remove();
      }
    }
    /**
     * Move all pieces in this collection into another element. See {@link Piece#putInto}.
     * @category Structure
     */
    putInto(to, options) {
      if (this.some((el) => el.hasMoved()) || to.hasMoved())
        to.game.addDelay();
      for (const el of this) {
        if ("isSpace" in el)
          throw Error("cannot move Space");
        el.putInto(to, options);
      }
    }
    // UI
    /**
     * Apply a layout to some of the elements directly contained within the elements
     * in this collection. See {@link GameElement#layout}
     * @category UI
     */
    layout(applyTo, attributes) {
      for (const el of this)
        el.layout(applyTo, attributes);
    }
    /**
     * Configure the layout for all elements contained within this collection. See
     * {@link GameElement#configureLayout}
     * @category UI
     */
    configureLayout(attributes) {
      for (const el of this)
        el.configureLayout(attributes);
    }
    /**
     * Define the appearance of the elements in this collection. Any values
     * provided override previous ones. See {@link GameElement#appearance}.
     * @category UI
     */
    appearance(appearance) {
      for (const el of this)
        el.appearance(appearance);
    }
  };

  // node_modules/@boardzilla/core/entry/action/utils.js
  var serialize = /* @__PURE__ */ __name((arg, forPlayer = true, name) => {
    if (arg === void 0)
      return void 0;
    if (arg === null)
      return null;
    if (arg instanceof Array)
      return arg.map((a) => serialize(a, forPlayer));
    if (typeof arg === "object" && "constructor" in arg && ("isPlayer" in arg.constructor || "isGameElement" in arg.constructor)) {
      return serializeSingleArg(arg, forPlayer);
    }
    if (typeof arg === "object")
      return serializeObject(arg, forPlayer);
    if (typeof arg === "number" || typeof arg === "string" || typeof arg === "boolean")
      return serializeSingleArg(arg, forPlayer);
    throw Error(`Unable to serialize the property ${name ? '"' + name + '": ' : ""} ${arg}. Only primitives, Player's, GameElement's or arrays/objects containing such can be used.`);
  }, "serialize");
  var serializeSingleArg = /* @__PURE__ */ __name((arg, forPlayer = true) => {
    if (typeof arg === "object" && "constructor" in arg) {
      if ("isPlayer" in arg.constructor)
        return `$p[${arg.position}]`;
      if ("isGameElement" in arg.constructor)
        return forPlayer ? `$el[${arg.branch()}]` : `$eid[${arg._t.id}]`;
    }
    return arg;
  }, "serializeSingleArg");
  var serializeObject = /* @__PURE__ */ __name((obj, forPlayer = true) => {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, serialize(v, forPlayer, k)]));
  }, "serializeObject");
  var escapeArgument = /* @__PURE__ */ __name((arg) => {
    if (arg instanceof Array) {
      const escapees = arg.map(escapeArgument);
      return escapees.slice(0, -1).join(", ") + (escapees.length > 1 ? " and " : "") + (escapees[escapees.length - 1] || "");
    }
    if (typeof arg === "object")
      return `[[${serializeSingleArg(arg)}|${arg.toString()}]]`;
    return String(arg);
  }, "escapeArgument");
  var deserializeArg = /* @__PURE__ */ __name((arg, game) => {
    if (arg instanceof Array)
      return arg.map((a) => deserializeSingleArg(a, game));
    return deserializeSingleArg(arg, game);
  }, "deserializeArg");
  var deserializeSingleArg = /* @__PURE__ */ __name((arg, game) => {
    if (typeof arg === "number" || typeof arg === "boolean")
      return arg;
    let deser;
    if (arg.slice(0, 3) === "$p[") {
      deser = game.players.atPosition(parseInt(arg.slice(3, -1)));
    } else if (arg.slice(0, 4) === "$el[") {
      deser = game.atBranch(arg.slice(4, -1));
    } else if (arg.slice(0, 5) === "$eid[") {
      deser = game.atID(parseInt(arg.slice(5, -1)));
    } else {
      return arg;
    }
    if (!deser)
      throw Error(`Unable to find arg: ${arg}`);
    return deser;
  }, "deserializeSingleArg");
  var deserializeObject = /* @__PURE__ */ __name((obj, game) => {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deserialize(v, game)]));
  }, "deserializeObject");
  var deserialize = /* @__PURE__ */ __name((arg, game) => {
    if (arg === void 0)
      return void 0;
    if (arg === null)
      return null;
    if (arg instanceof Array)
      return arg.map((a) => deserialize(a, game));
    if (typeof arg === "object")
      return deserializeObject(arg, game);
    if (typeof arg === "number" || typeof arg === "string" || typeof arg === "boolean")
      return deserializeSingleArg(arg, game);
    throw Error(`unable to deserialize ${arg}`);
  }, "deserialize");
  var combinations = /* @__PURE__ */ __name((set, min, max) => {
    const combos = [];
    const poss = /* @__PURE__ */ __name((curr, i) => {
      if (set.length - i < min - curr.length)
        return;
      if (curr.length >= min)
        combos.push(curr);
      if (curr.length < max) {
        for (let j = i; j !== set.length; j++) {
          poss(curr.concat([set[j]]), j + 1);
        }
      }
    }, "poss");
    poss([], 0);
    return combos;
  }, "combinations");

  // node_modules/@boardzilla/core/entry/utils.js
  var shuffleArray = /* @__PURE__ */ __name((array, random3) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(random3() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }, "shuffleArray");
  var times = /* @__PURE__ */ __name((n2, fn) => Array.from(Array(n2)).map((_, i) => fn(i + 1)), "times");
  var range = /* @__PURE__ */ __name((min, max, step = 1) => times(Math.floor((max - min) / step) + 1, (i) => (i - 1) * step + min), "range");
  var n = /* @__PURE__ */ __name((message, args, escaped = false) => {
    Object.entries(args || {}).forEach(([k, v]) => {
      message = message.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`), escaped ? escapeArgument(v) : v.toString());
    });
    const missingArgs = Array.from(message.matchAll(new RegExp(`\\{\\{\\s*(\\w+)\\s*\\}\\}`, "g"))).map(([, arg]) => arg);
    if (missingArgs.length)
      throw Error(`Missing strings in:
${message}
All substitution strings must be specified in 2nd parameter. Missing: ${missingArgs.join("; ")}`);
    return message;
  }, "n");

  // node_modules/@boardzilla/core/entry/board/element.js
  var import_uuid_random = __toESM(require_uuid_random(), 1);
  var GameElement = class _GameElement {
    static {
      __name(this, "GameElement");
    }
    /**
     * Do not use the constructor directly. Instead Call {@link
     * GameElement#create} or {@link GameElement#createMany} on the element in
     * which you want to create a new element.
     * @category Structure
     */
    constructor(ctx) {
      var _a;
      this._t = {
        children: new ElementCollection(),
        id: 0,
        ref: 0,
        setId: () => {
        }
      };
      this._ui = {
        layouts: [],
        appearance: {},
        getBaseLayout: () => ({
          alignment: "center",
          direction: "square"
        })
      };
      this._ctx = ctx;
      (_a = this._ctx).classRegistry ?? (_a.classRegistry = []);
      if (!ctx.top) {
        this._ctx.top = this;
        this._ctx.sequence = 0;
      }
      if (!this._ctx.namedSpaces) {
        this._ctx.uniqueNames = {};
        this._ctx.namedSpaces = {};
      }
      this._t = {
        children: new ElementCollection(),
        id: this._ctx.sequence,
        ref: this._ctx.sequence,
        setId: (id) => {
          if (id !== void 0) {
            this._t.id = id;
            if (this._ctx.sequence < id)
              this._ctx.sequence = id;
          }
        }
      };
      this._ctx.sequence += 1;
    }
    /**
     * String used for representng this element in game messages when the object
     * is passed directly, e.g. when taking the choice directly from a
     * chooseOnBoard choice.
     * @category Structure
     */
    toString() {
      return this.name || this.constructor.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    isVisibleTo(_player) {
      return true;
    }
    isVisible() {
      return true;
    }
    all(className, ...finders) {
      return this._t.children.all(className, ...finders);
    }
    first(className, ...finders) {
      return this._t.children.first(className, ...finders);
    }
    firstN(n2, className, ...finders) {
      return this._t.children.firstN(n2, className, ...finders);
    }
    last(className, ...finders) {
      return this._t.children.last(className, ...finders);
    }
    lastN(n2, className, ...finders) {
      return this._t.children.lastN(n2, className, ...finders);
    }
    top(className, ...finders) {
      return this._t.children.top(className, ...finders);
    }
    topN(n2, className, ...finders) {
      return this._t.children.topN(n2, className, ...finders);
    }
    bottom(className, ...finders) {
      return this._t.children.bottom(className, ...finders);
    }
    bottomN(n2, className, ...finders) {
      return this._t.children.bottomN(n2, className, ...finders);
    }
    others(className, ...finders) {
      if (!this._t.parent)
        new ElementCollection();
      return this._t.parent._t.children.all(className, (el) => el !== this, ...finders);
    }
    has(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return !!this.first(_GameElement, ...finders);
      }
      return !!this.first(className, ...finders);
    }
    /**
     * If this element is adjacent to some other element, using the nearest
     * containing space that has an adjacency map.
     * @category Adjacency
     */
    isAdjacentTo(element) {
      const graph = this.containerWithProperty("isAdjacent");
      if (!graph)
        return false;
      return graph.isAdjacent(this, element);
    }
    /**
     * Finds the shortest distance between two spaces
     * @category Adjacency
     *
     * @param element - {@link element} to measure distance to
     */
    distanceTo(element) {
      const graph = this.containerWithProperty("distanceBetween");
      if (!graph)
        return Infinity;
      return graph.distanceBetween(this, element);
    }
    adjacencies(className, ...finders) {
      const graph = this.containerWithProperty("isAdjacent");
      if (!graph)
        return false;
      return graph.allAdjacentTo(this, className, ...finders);
    }
    withinDistance(distance, className, ...finders) {
      const graph = this.containerWithProperty("allWithinDistanceOf");
      if (!graph)
        return new ElementCollection();
      return graph.allWithinDistanceOf(this, distance, className, ...finders);
    }
    /**
     * Set this class to use a different ordering style.
     * @category Structure
     * @param order - ordering style
     * - "normal": Elements placed into this element are put at the end of the
     *   list (default)
     * - "stacking": Used primarily for stacks of cards. Elements placed into this
     *   element are put at the beginning of the list. E.g. if a stack of cards
     *   has `order` set to `stacking` the {@link first} method will return the
     *   last card placed in the stack, rather than the first one placed in the
     *   stack. Hidden items in the stack are not tracked or animated while
     *   reordered to prevent their identity from being exposed as they move
     */
    setOrder(order) {
      this._t.order = order;
    }
    /**
     * Returns this elements parent.
     * @category Queries
     * @param className - If provided, searches up the parent tree to find the first
     * matching element. E.g. if a Token is placed on a Card in a players
     * Tableau. calling `token.container(Tableau)` can be used to find the
     * grandparent.
     */
    container(className) {
      if (!className)
        return this._t.parent;
      if (this._t.parent)
        return this._t.parent instanceof className ? this._t.parent : this._t.parent.container(className);
    }
    /**
     * Returns this elements containing element that also has a given property.
     * @category Queries
     */
    containerWithProperty(property, value) {
      const parent = this._t.parent;
      if (parent)
        return property in parent && (value === void 0 || parent[property] === value) ? parent : parent.containerWithProperty(property, value);
    }
    /**
     * Returns whether this element has no elements placed within it.
     * @category Structure
     */
    isEmpty() {
      return !this._t.children.length;
    }
    /**
     * Sorts the elements directly contained within this element by some {@link Sorter}.
     * @category Structure
     */
    sortBy(key, direction) {
      return this._t.children.sortBy(key, direction);
    }
    /**
     * re-orders the elements directly contained within this element randomly.
     * @category Structure
     */
    shuffle() {
      const refs = this.childRefsIfObscured();
      shuffleArray(this._t.children, this._ctx.gameManager?.random || Math.random);
      if (refs)
        this.assignChildRefs(refs);
    }
    /**
     * The player that owns this element, or the first element that contains this
     * element searching up through the parent hierarchy. This is related to, but
     * different than {@link player}. E.g. if a standard playing card is in a
     * player's hand, typically the `hand.player` will be assigned to that player
     * but the card itself would not have a `player`. In this case the
     * card.owner() will equal the player in whose hand the card is placed.
     * @category Structure
     */
    get owner() {
      return this.player !== void 0 ? this.player : this._t.parent?.owner;
    }
    /**
     * Whether this element belongs to the player viewing the game. A player is
     * considered to be currently viewing the game if this is called in the
     * context of an action taken by a given player (during an action taken by a
     * player or while the game is viewed by a given player.) It is an error to
     * call this method when not in the context of a player action. When querying
     * for elements using {@link ElementFinder} such as {@link all} and {@link
     * first}, {@link mine} is available as a search key that accepts a value of
     * true/false
     @category Queries
     */
    get mine() {
      if (!this._ctx.player)
        return false;
      return this.owner === this._ctx.player;
    }
    /**
     * Create an element inside this element. This can only be called during the
     * game setup (see {@link createGame}. Any game elements that are required
     * must be created before the game starts. Elements that only appear later in
     * the game can be created inside the {@link Game#pile} or made invisible.
     * @category Structure
     *
     * @param className - Class to create. This class must be included in the `elementClasses` in {@link createGame}.
     * @param name - Sets {@link GameElement#name | name}
     * @param attributes - Sets any attributes of the class that are defined in
     * your own class that extend {@link Space}, {@link Piece}, or {@link
     * Game}. Can also include {@link player}.
     *
     * @example
     * deck.create(Card, 'ace-of-hearts', { suit: 'H', value: '1' });
     */
    create(className, name, attributes) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Game elements cannot be created once game has started.");
      const el = this.createElement(className, name, attributes);
      el._t.parent = this;
      const firstPiece = this._t.children.findIndex((c) => !("isSpace" in c));
      if (this._t.order === "stacking" && !("isSpace" in el)) {
        if (firstPiece > 0) {
          this._t.children.splice(firstPiece, 0, el);
        } else {
          this._t.children.unshift(el);
        }
      } else {
        if ("isSpace" in el && firstPiece !== -1) {
          this._t.children.splice(firstPiece, 0, el);
        } else {
          this._t.children.push(el);
        }
      }
      if ("isSpace" in el && name) {
        if (name in this._ctx.uniqueNames) {
          delete this._ctx.namedSpaces[name];
          this._ctx.uniqueNames[name] = false;
        } else {
          this._ctx.namedSpaces[name] = el;
          this._ctx.uniqueNames[name] = true;
        }
      }
      return el;
    }
    /**
     * Create n elements inside this element of the same class. This can only be
     * called during the game setup (see {@link createGame}. Any game elements
     * that are required must be created before the game starts. Elements that
     * only appear later in the game can be created inside the {@link Game#pile}
     * or made invisible.
     * @category Structure
     *
     * @param n - Number to create
     * @param className - Class to create. This class must be included in the `elementClasses` in {@link createGame}.
     * @param name - Sets {@link GameElement#name | name}
     * @param attributes - Sets any attributes of the class that are defined in
     * your own class that extend {@link Space}, {@link Piece}, or {@link
     * Game}. Can also include {@link player}. If a function is supplied here, a
     * single number argument will be passed with the number of the added element,
     * starting with 1.
     */
    createMany(n2, className, name, attributes) {
      return new ElementCollection(...times(n2, (i) => this.create(className, name, typeof attributes === "function" ? attributes(i) : attributes)));
    }
    /**
     * Base element creation method
     * @internal
     */
    createElement(className, name, attrs) {
      if (!this._ctx.classRegistry.includes(className)) {
        this._ctx.classRegistry.push(className);
      }
      const el = new className(this._ctx);
      el.game = this.game;
      el.name = name;
      Object.assign(el, attrs);
      if ("afterCreation" in el)
        el.afterCreation.bind(el)();
      return el;
    }
    /**
     * Permanently remove an element. This can only be done while defining the
     * game, and is usually only useful when creating groups of elements, such as
     * {@link createMany} or {@link createGrid} where some of the created elements
     * are not needed.
     * @category Structure
     */
    destroy() {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Game elements cannot be destroy once game has started.");
      const position = this.position();
      this._t.parent?._t.children.splice(position, 1);
    }
    /**
     * Rotation of element if set, normalized to 0-359 degrees
     * @category Structure
     */
    get rotation() {
      if (this._rotation === void 0)
        return 0;
      return (this._rotation % 360 + 360) % 360;
    }
    set rotation(r) {
      this._rotation = r;
    }
    /**
     * Returns the index of this element within its parent, starting at zero
     * @category Structure
     */
    position() {
      return this._t.parent?._t.children.indexOf(this) ?? -1;
    }
    /**
     * Returns a string identifying the tree position of the element suitable for
     * anonymous reference
     * @internal
     */
    branch() {
      const branches = [];
      let node = this;
      while (node._t.parent) {
        const index = node.position();
        if (index === -1)
          throw Error(`Reference to element ${this.constructor.name}${this.name ? ":" + this.name : ""} is no longer current`);
        branches.unshift(index);
        node = node._t.parent;
      }
      branches.unshift(this._ctx.removed === node ? 1 : 0);
      return branches.join("/");
    }
    /**
     * Returns the element at the given position returned by {@link branch}
     * @internal
     */
    atBranch(b) {
      let branch = b.split("/");
      let index = parseInt(branch[0]);
      let node = index === 0 ? this._ctx.top : this._ctx.removed._t.children[index - 1];
      branch.shift();
      while (branch[0] !== void 0) {
        node = node._t.children[parseInt(branch[0])];
        branch.shift();
      }
      return node;
    }
    /**
     * Returns the element for the given id
     * @internal
     */
    atID(id) {
      let el = this._t.children.find((c) => c._t.id === id);
      if (el)
        return el;
      for (const child of this._t.children) {
        el = child.atID(id);
        if (el)
          return el;
      }
    }
    /**
     * Returns the element for the given ref
     * @internal
     */
    atRef(ref) {
      let el = this._t.children.find((c) => c._t.ref === ref);
      if (el)
        return el;
      for (const child of this._t.children) {
        el = child.atRef(ref);
        if (el)
          return el;
      }
    }
    _cellAt(pos) {
      if (!this._size)
        return pos.x === 0 && pos.y === 0 ? "." : void 0;
      if (this.rotation === 0)
        return this._size.shape[pos.y]?.[pos.x];
      if (this.rotation === 90)
        return this._size.shape[this._size.height - 1 - pos.x]?.[pos.y];
      if (this.rotation === 180)
        return this._size.shape[this._size.height - 1 - pos.y]?.[this._size.width - 1 - pos.x];
      if (this.rotation === 270)
        return this._size.shape[pos.x]?.[this._size.width - 1 - pos.y];
    }
    _sizeNeededFor(_element) {
      return { width: 1, height: 1 };
    }
    /**
       * Set an irregular shape for this element. This is only meaningful for the
       * purposes of finding specifically adjacent cells when placed into a
       * PieceGrid. See {@link PieceGrid#adjacenciesByCell}. When rendered in a
       * PieceGrid, the element will have a size large enough to fill the
       * appropriate number of spaces in the grid, but it's appearance is otherwise
       * unaffected and will be based on {@link appearance}. When not rendered in a
       * PieceGrid, the element will take up a single cell but will be scaled
       * relatively to other elements with a shape in the same layout.
       *
       * @param shape - A set of single characters used as labels for each cell. The
       * cell label characters are provided as an array of strings, with each string
       * being one row of cell labels, with spaces used to indicate empty "holes" in
       * the shape. Each row must be the same length. The specific non-space
       * characters used are used for labelling the adjacencies in {@link
       * PieceGrid#adjacenciesByCell} but are otherwise unimportant.
       * @category Adjacency
       *
       * @example
       *
       * domino12.setShape(
       *   '12'
       * );
    
       * tetrisPiece.setShape(
       *   'XX ',
       *   ' XX'
       * );
       */
    setShape(...shape) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Cannot change shape once game has started.");
      if (shape.some((s) => s.length !== shape[0].length))
        throw Error("Each row in shape must be same size. Invalid shape:\n" + shape);
      this._size = {
        shape,
        width: shape[0].length,
        height: shape.length
      };
    }
    /**
     * Set the edge labels for this element. These are only meaningful for the
     * purposes of finding specifically adjacent edges when placed into a
     * PieceGrid. See {@link PieceGrid#adjacenciesByEdge}.
     * @category Adjacency
     *
     * @param edges - A set of edge labels for each cell label provided by {@link
     * setShape}. For simple 1-celled shapes, the edges can be provided without
     * cell labels.
     *
     * @example
     *
     * // a bridge tile with a road leading from left to right and a river leading
     * // from top to bottom.
     * simpleTile.setEdge(
     *   up: 'river',
     *   down: 'river',
     *   left: 'road'
     *   right: 'road'
     * });
     *
     * // A tetris-shaped tile with sockets coming out either "end"
     * tetrisPiece.setShape(
     *   'AX ',
     *   ' XB'
     * );
     * tetrisPiece.setEdge({
     *   A: {
     *     left: 'socket'
     *   },
     *   B: {
     *     right: 'socket'
     *   }
     * });
     */
    setEdges(edges) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Cannot change shape once game has started.");
      if (Object.keys(edges)[0].length === 1) {
        const missingCell = Object.keys(edges).find((c) => this._size?.shape.every((s) => !s.includes(c)));
        if (missingCell)
          throw Error(`No cell '${missingCell}' defined in shape`);
        this._size.edges = edges;
      } else {
        if (this._size)
          throw Error("setEdges must use the cell characters from setShape as keys");
        this._size = { shape: ["."], width: 1, height: 1, edges: { ".": edges } };
      }
    }
    /**
     * Whether this element has the given element in its parent hierarchy
     * @category Structure
     */
    isDescendantOf(el) {
      return this._t.parent === el || !!this._t.parent?.isDescendantOf(el);
    }
    attributeList() {
      let attrs;
      ({ ...attrs } = this);
      for (const attr of this.constructor.unserializableAttributes)
        delete attrs[attr];
      return Object.fromEntries(Object.entries(attrs).filter(([, value]) => typeof value !== "function"));
    }
    /**
     * JSON representation
     * @param seenBy - optional player position viewing the game
     * @internal
     */
    toJSON(seenBy) {
      let attrs = this.attributeList();
      if (seenBy !== void 0 && !this.isVisibleTo(seenBy)) {
        attrs = Object.fromEntries(Object.entries(attrs).filter(([attr]) => ["_visible", "row", "column", "_rotation", "_size"].includes(attr) || attr !== "name" && this.constructor.visibleAttributes?.includes(attr)));
      }
      const json = Object.assign(serializeObject(attrs, seenBy !== void 0), { className: this.constructor.name });
      if (this._t.order)
        json.order = this._t.order;
      if (seenBy === void 0)
        json._id = this._t.id;
      if (json._id !== this._t.ref)
        json._ref = this._t.ref;
      if (seenBy !== void 0 && this._t.wasRef !== void 0 && this.isVisibleTo(seenBy))
        json._wasRef = this._t.wasRef;
      if (this._t.children.length && (!seenBy || !("_screen" in this) || this._screen === void 0 || this._screen === "all-but-owner" && this.owner?.position === seenBy || this._screen instanceof Array && this._screen.includes(this.owner?.position))) {
        json.children = Array.from(this._t.children.map((c) => c.toJSON(seenBy)));
      }
      if (globalThis.window) {
        try {
          structuredClone(json);
        } catch (e) {
          console.error(`invalid properties on ${this}:
${JSON.stringify(json, void 0, 2)}`);
          throw e;
        }
      }
      return json;
    }
    createChildrenFromJSON(childrenJSON, branch) {
      const childrenRefs = [...this._t.children];
      this._t.children = new ElementCollection();
      for (let i = 0; i !== childrenJSON.length; i++) {
        const json = childrenJSON[i];
        const childBranch = branch + "/" + i;
        let { className, children, _id, _ref, _wasRef, name, order } = json;
        let child = childrenRefs.find((c) => _id !== void 0 ? c._t.id === _id : c._t.ref === (_wasRef ?? _ref));
        if (!child) {
          const elementClass = this._ctx.classRegistry.find((c) => c.name === className);
          if (!elementClass)
            throw Error(`No class found ${className}. Declare any classes in \`game.registerClasses\``);
          child = this.createElement(elementClass, name);
          child._t.setId(_id);
          child._t.parent = this;
          child._t.order = order;
          child._t.ref = _ref ?? _id;
        } else {
          const emptyAttrs = Object.keys(child).filter((k) => !(k in json) && !["_rotation", "column", "row"].includes(k) && !child.constructor.unserializableAttributes.includes(k));
          if (emptyAttrs.length) {
            const blank = Reflect.construct(child.constructor, [{}]);
            for (const attr of emptyAttrs)
              Object.assign(child, { [attr]: blank[attr] });
          }
        }
        if (_id !== void 0)
          child._t.ref = _ref ?? _id;
        if (_wasRef !== void 0 && !this._ctx.trackMovement)
          child._t.wasRef = _wasRef;
        this._t.children.push(child);
        child.createChildrenFromJSON(children || [], childBranch);
      }
    }
    assignAttributesFromJSON(childrenJSON, branch) {
      for (let i = 0; i !== childrenJSON.length; i++) {
        const json = childrenJSON[i];
        let { className: _cn, children, _ref, _wasRef, _id, order: _o, ...rest } = json;
        rest = deserializeObject({ ...rest }, this.game);
        let child = this._t.children[i];
        Object.assign(child, rest);
        child.assignAttributesFromJSON(children || [], branch + "/" + i);
      }
    }
    resetUI() {
      this._ui.layouts = [{
        applyTo: _GameElement,
        attributes: this._ui.getBaseLayout()
      }];
      this._ui.appearance = {};
      for (const child of this._t.children)
        child.resetUI();
    }
    /**
     * Apply a layout to some of the elements directly contained within this
     * element. See also {@link ElementCollection#layout}
     * @category UI
     *
     * @param applyTo - Which elements this layout applies to. Provided value can be:
     * - A specific {@link GameElement}
     * - The name of an element
     * - A specific set of elements ({@link ElementCollection})
     * - A class of elements
     *
     * If multiple layout declarations would apply to the same element, only one
     * will be used. The order of specificity is as above. If a class is used and
     * mutiple apply, the more specific class will be used.
     *
     * @param {Object} attributes - A list of attributes describing the
     * layout. All units of measurement are percentages of this elements width and
     * height from 0-100, unless otherwise noted (See `margin` and `gap`)
     */
    layout(applyTo, attributes) {
      let { slots, area, size, aspectRatio, scaling, gap, margin, offsetColumn, offsetRow } = attributes;
      if (slots && (area || margin || scaling || gap || margin || offsetColumn || offsetRow)) {
        console.warn("Layout has `slots` which overrides supplied grid parameters");
        delete attributes.area;
        delete attributes.margin;
        delete attributes.gap;
        delete attributes.scaling;
        delete attributes.offsetRow;
        delete attributes.offsetColumn;
      }
      if (area && margin) {
        console.warn("Both `area` and `margin` supplied in layout. `margin` is ignored");
        delete attributes.margin;
      }
      if (size && aspectRatio) {
        console.warn("Both `size` and `aspectRatio` supplied in layout. `aspectRatio` is ignored");
        delete attributes.aspectRatio;
      }
      if (size && scaling) {
        console.warn("Both `size` and `scaling` supplied in layout. `scaling` is ignored");
        delete attributes.scaling;
      }
      if (gap && (offsetColumn || offsetRow)) {
        console.warn("Both `gap` and `offset` supplied in layout. `gap` is ignored");
        delete attributes.gap;
      }
      this._ui.layouts.push({ applyTo, attributes: { alignment: "center", direction: "square", ...attributes } });
    }
    /**
     * Creates a collapsible drawer layout for a Space within this Element. This
     * is like {@link GameElement#layout} except for one specific Space, with
     * additional parameters that set the behaviour/appearance of the drawer. A
     * tab will be attached the drawer that will allow it be opened/closed.
     *
     * @param applyTo - The Space for the drawer. Either the Space itself or its
     * name.
     * @param area - The area for the drawer when opened expressed in percentage
     * sizes of this element.
     * @param openDirection - the direction the drawer will open
     * @param tab - JSX for the appearance of the tab
     * @param closedTab - JSX for the appearance of the tab when closed if
     * different
     * @param openIf - A function that will be checked at each game state. If it
     * returns true, the drawer will automatically open.
     * @param closeIf - A function that will be checked at each game state. If it
     * returns true, the drawer will automatically close.
     */
    layoutAsDrawer(applyTo, attributes) {
      const { area, ...container } = attributes;
      this.layout(applyTo, { area, __container__: { type: "drawer", attributes: container } });
    }
    /**
     * Creates a tabbed layout for a set of Space's within this Element. This is
     * like {@link GameElement#layout} except for a set of Spaces, with additional
     * parameters that set the behaviour/appearance of the tabs. Each Space will
     * be laid out into the same area, with a set of tabs attached to allow the
     * Player or the game rules to select which tab is shown.
     *
     * @param applyTo - The Spaces for the drawer as a set of key-value
     * pairs. Each value is a Space or a name of a Space.
     * @param area - The area for the tabs expressed in percentage sizes of this
     * element.
     * @param tabDirection - the side on which the tabs will be placed
     * @param tabs - JSX for the appearance of the tabs as a set of key-value pairs
     * @param setTabTo - A function that will be checked at each game state. If it
     * returns a string, the tab with the matching key will be shown.
     */
    layoutAsTabs(tabs, attributes) {
      const { area, ...container } = attributes;
      const id = (0, import_uuid_random.default)();
      for (const [key, tab] of Object.entries(tabs)) {
        this.layout(tab, { area, __container__: { type: "tabs", id, key, attributes: container } });
      }
    }
    /**
     * Hides a Space within this element and replaces it with popout
     * button. Clicking on the button opens this Space in a full-board modal. This
     * is like {@link GameElement#layout} except for one Space, with additional
     * parameters that set the behaviour/appearance of the popout modal.
     *
     * @param applyTo - The Space for the popout. Either a Space or the name of a
     * Space.
     * @param area - The area for the tabs expressed in percentage sizes of this
     * element.
     * @param button - JSX for the appearance of the popout button
     * @param popoutMargin - Alter the default margin around the opened
     * popout. Takes a percentage or an object with percentages for top, bottom,
     * left and right.
     */
    layoutAsPopout(applyTo, attributes) {
      const { area, ...container } = attributes;
      this.layout(applyTo, { area, __container__: { type: "popout", attributes: container } });
    }
    /**
     * Change the layout attributes for this space's layout.
     * @category UI
     */
    configureLayout(layoutConfiguration) {
      this._ui.layouts[0] = {
        applyTo: _GameElement,
        attributes: {
          ...this._ui.getBaseLayout(),
          ...layoutConfiguration
        }
      };
    }
    /**
     * Define the appearance of this element. Any values provided override
     * previous ones. See also {@link ElementCollection#appearance}
     * @category UI
     *
     * @param appearance - Possible values are:
     * @param appearance.className - A class name to add to the dom element
     *
     * @param appearance.render - A function that takes this element as its only
     * argument and returns JSX for the element. See {@link ../ui/appearance} for
     * more on usage.
     *
     * @param appearance.aspectRatio - The aspect ratio for this element. This
     * value is a ratio of width over height. All layouts defined in {@link
     * layout} will respect this aspect ratio.
     *
     * @param appearance.info - Return JSX for more info on this element. If
     * returning true, an info modal will be available for this element but with
     * only the rendered element and no text
     *
     * @param appearance.connections - If the elements immediately within this
     * element are connected using {@link Space#connectTo}, this makes those
     * connections visible as connecting lines. Providing a `label` will place a
     * label over top of this line by calling the provided function with the
     * distance of the connection specified in {@link Space#connectTo} and using
     * the retured JSX. If `labelScale` is provided, the label is scaled by this
     * amount.
     *
     * @param appearance.effects - Provides a CSS class that will be applied to
     * this element if its attributes change to match the provided ones.
     */
    appearance(appearance) {
      Object.assign(this._ui.appearance, appearance);
    }
    childRefsIfObscured() {
      var _a;
      if (this._t.order !== "stacking")
        return;
      const refs = [];
      for (const child of this._t.children) {
        if (this._ctx.trackMovement)
          (_a = child._t).wasRef ?? (_a.wasRef = child._t.ref);
        refs.push(child._t.ref);
      }
      return refs;
    }
    assignChildRefs(refs) {
      for (let i = 0; i != refs.length; i++) {
        this._t.children[i]._t.ref = refs[i];
      }
    }
    hasMoved() {
      return this._t.moved || !!this._t.parent?.hasMoved();
    }
    resetMovementTracking() {
      this._t.moved = false;
      for (const child of this._t.children)
        child.resetMovementTracking();
    }
    resetRefTracking() {
      delete this._t.wasRef;
      for (const child of this._t.children)
        child.resetRefTracking();
    }
  };
  GameElement.isGameElement = true;
  GameElement.unserializableAttributes = ["_ctx", "_t", "_ui", "game"];
  var element_default = GameElement;

  // node_modules/@boardzilla/core/entry/board/space.js
  var Space = class extends element_default {
    static {
      __name(this, "Space");
    }
    constructor() {
      super(...arguments);
      this._eventHandlers = { enter: [], exit: [] };
    }
    /**
     * Show pieces to all players when they enter this space
     * @category Visibility
     */
    contentsWillBeShown() {
      this._visOnEnter = { default: true };
    }
    /**
     * Show pieces when they enter this space to its owner
     * @category Visibility
     */
    contentsWillBeShownToOwner() {
      this._visOnEnter = { default: false, except: "owner" };
    }
    /**
     * Show piece to these players when they enter this space
     * @category Visibility
     */
    contentsWillBeShownTo(...players) {
      this._visOnEnter = { default: false, except: players.map((p) => p.position) };
    }
    /**
     * Hide pieces to all players when they enter this space
     * @category Visibility
     */
    contentsWillBeHidden() {
      this._visOnEnter = { default: false };
    }
    /**
     * Hide piece to these players when they enter this space
     * @category Visibility
     */
    contentsWillBeHiddenFrom(...players) {
      this._visOnEnter = { default: true, except: players.map((p) => p.position) };
    }
    /**
     * Call this to screen view completely from players. Blocked spaces completely
     * hide their contents, like a physical screen. No information about the
     * number, type or movement of contents inside this Space will be revealed to
     * the specified players
     *
     * @param players = Players for whom the view is blocked
     * @category Visibility
     */
    blockViewFor(players) {
      this._screen = players === "none" ? void 0 : players instanceof Array ? players.map((p) => p.position) : players;
    }
    isSpace() {
      return true;
    }
    create(className, name, attributes) {
      const el = super.create(className, name, attributes);
      if ("showTo" in el)
        this.triggerEvent("enter", el);
      return el;
    }
    addEventHandler(type, handler) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Event handlers cannot be added once game has started.");
      this._eventHandlers[type].push(handler);
    }
    /**
     * Attach a callback to this space for every element that enters or is created
     * within.
     * @category Structure
     *
     * @param type - the class of element that will trigger this callback
     * @param callback - Callback will be called each time an element enters, with
     * the entering element as the only argument.
     *
     * @example
     * deck.onEnter(Card, card => card.hideFromAll()) // card placed in the deck are automatically turned face down
     */
    onEnter(type, callback) {
      this.addEventHandler("enter", { callback, type });
    }
    /**
     * Attach a callback to this space for every element that is moved out of this
     * space.
     * @category Structure
     *
     * @param type - the class of element that will trigger this callback
     * @param callback - Callback will be called each time an element exits, with
     * the exiting element as the only argument.
     *
     * @example
     * deck.onExit(Card, card => card.showToAll()) // cards drawn from the deck are automatically turned face up
     */
    onExit(type, callback) {
      this.addEventHandler("exit", { callback, type });
    }
    triggerEvent(event, element) {
      if (this._visOnEnter) {
        element._visible = {
          default: this._visOnEnter.default,
          except: this._visOnEnter.except === "owner" ? this.owner ? [this.owner.position] : void 0 : this._visOnEnter.except
        };
      }
      for (const handler of this._eventHandlers[event]) {
        if (event === "enter" && !(element instanceof handler.type))
          continue;
        if (event === "exit" && !(element instanceof handler.type))
          continue;
        handler.callback(element);
      }
    }
  };
  Space.unserializableAttributes = [...element_default.unserializableAttributes, "_eventHandlers", "_visOnEnter", "_screen"];
  var space_default = Space;

  // node_modules/@boardzilla/core/entry/board/piece.js
  var Piece = class _Piece extends element_default {
    static {
      __name(this, "Piece");
    }
    createElement(className, name, attrs) {
      if (className === space_default || Object.prototype.isPrototypeOf.call(space_default, className)) {
        throw Error(`May not create Space "${name}" in Piece "${this.name}"`);
      }
      return super.createElement(className, name, attrs);
    }
    /**
     * Show this piece to all players
     * @category Visibility
     */
    showToAll() {
      delete this._visible;
    }
    /**
     * Show this piece only to the given player
     * @category Visibility
     */
    showOnlyTo(player) {
      if (typeof player !== "number")
        player = player.position;
      this._visible = {
        default: false,
        except: [player]
      };
    }
    /**
     * Show this piece to the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    showTo(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      if (this._visible === void 0)
        return;
      if (this._visible.default) {
        if (!this._visible.except)
          return;
        this._visible.except = this._visible.except.filter((i) => !player.includes(i));
      } else {
        this._visible.except = Array.from(/* @__PURE__ */ new Set([...this._visible.except instanceof Array ? this._visible.except : [], ...player]));
      }
    }
    /**
     * Hide this piece from all players
     * @category Visibility
     */
    hideFromAll() {
      this._visible = { default: false };
    }
    /**
     * Hide this piece from the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    hideFrom(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      if (this._visible?.default === false && !this._visible.except)
        return;
      if (this._visible === void 0 || this._visible.default === true) {
        this._visible = {
          default: true,
          except: Array.from(/* @__PURE__ */ new Set([...this._visible?.except instanceof Array ? this._visible.except : [], ...player]))
        };
      } else {
        if (!this._visible.except)
          return;
        this._visible.except = this._visible.except.filter((i) => !player.includes(i));
      }
    }
    /**
     * Returns whether this piece is visible to the given player
     * @category Visibility
     */
    isVisibleTo(player) {
      if (typeof player !== "number")
        player = player.position;
      if (this._visible === void 0)
        return true;
      if (this._visible.default) {
        return !this._visible.except || !this._visible.except.includes(player);
      } else {
        return this._visible.except?.includes(player) || false;
      }
    }
    /**
     * Returns whether this piece is visible to all players, or to the current
     * player if called when in a player context (during an action taken by a
     * player or while the game is viewed by a given player.)
     * @category Visibility
     */
    isVisible() {
      if (this._ctx.player)
        return this.isVisibleTo(this._ctx.player.position);
      return this._visible?.default !== false && (this._visible?.except ?? []).length === 0;
    }
    /**
     * Provide list of attributes that remain visible even when these pieces are
     * not visible to players. E.g. In a game with multiple card decks with
     * different backs, identified by Card#deck, the identity of the card when
     * face-down is hidden, but the deck it belongs to is not, since the card art
     * on the back would identify the deck. In this case calling
     * `Card.revealWhenHidden('deck')` will cause all attributes other than 'deck'
     * to be hidden when the card is face down, while still revealing which deck
     * it is.
     * @category Visibility
     */
    static revealWhenHidden(...attrs) {
      this.visibleAttributes = attrs;
    }
    /**
     * Move this piece into another element. This triggers any {@link
     * Space#onEnter | onEnter} callbacks in the destination.
     * @category Structure
     *
     * @param to - Destination element
     * @param options.position - Place the piece into a specific numbered position
     * relative to the other elements in this space. Positive numbers count from
     * the beginning. Negative numbers count from the end.
     * @param options.fromTop - Place the piece into a specific numbered position counting
     * from the first element
     * @param options.fromBottom - Place the piece into a specific numbered position
     * counting from the last element
     */
    putInto(to, options) {
      if (to.isDescendantOf(this))
        throw Error(`Cannot put ${this} into itself`);
      let pos = to._t.order === "stacking" ? 0 : to._t.children.length;
      if (options?.position !== void 0)
        pos = options.position >= 0 ? options.position : to._t.children.length + options.position + 1;
      if (options?.fromTop !== void 0)
        pos = options.fromTop;
      if (options?.fromBottom !== void 0)
        pos = to._t.children.length - options.fromBottom;
      const previousParent = this._t.parent;
      const position = this.position();
      if (this.hasMoved() || to.hasMoved())
        this.game.addDelay();
      const refs = previousParent === to && options?.row === void 0 && options?.column === void 0 && to.childRefsIfObscured();
      this._t.parent._t.children.splice(position, 1);
      this._t.parent = to;
      to._t.children.splice(pos, 0, this);
      if (refs)
        to.assignChildRefs(refs);
      if (previousParent !== to && previousParent instanceof space_default)
        previousParent.triggerEvent("exit", this);
      if (previousParent !== to && this._ctx.trackMovement)
        this._t.moved = true;
      delete this.column;
      delete this.row;
      if (options?.row !== void 0)
        this.row = options.row;
      if (options?.column !== void 0)
        this.column = options.column;
      if (previousParent !== to && to instanceof space_default)
        to.triggerEvent("enter", this);
    }
    cloneInto(into) {
      let attrs = this.attributeList();
      delete attrs.column;
      delete attrs.row;
      const clone = into.createElement(this.constructor, this.name, attrs);
      if (into._t.order === "stacking") {
        into._t.children.unshift(clone);
      } else {
        into._t.children.push(clone);
      }
      clone._t.parent = into;
      clone._t.order = this._t.order;
      for (const child of this._t.children)
        if (child instanceof _Piece)
          child.cloneInto(clone);
      return clone;
    }
    /**
     * Remove this piece from the playing area and place it into {@link
     * Game#pile}
     * @category Structure
     */
    remove() {
      return this.putInto(this._ctx.removed);
    }
  };

  // node_modules/@boardzilla/core/entry/player/player.js
  var Player = class {
    static {
      __name(this, "Player");
    }
    /**
     * Provide list of attributes that are hidden from other players
     */
    static hide(...attrs) {
      this.hiddenAttributes = attrs;
    }
    isCurrent() {
      return this._players.currentPosition.includes(this.position);
    }
    /**
     * Set this player as the current player
     */
    setCurrent() {
      return this._players.setCurrent(this);
    }
    /**
     * Returns an array of all other players.
     */
    others() {
      return Array.from(this._players).filter((p) => p !== this);
    }
    /**
     * Returns the other player. Only allowed in 2 player games
     */
    other() {
      if (this._players.length !== 2)
        throw Error("Can only use `other` for 2 player games");
      return this._players.find((p) => p !== this);
    }
    allMy(className, ...finders) {
      return this.game.all(className, { owner: this }, ...finders);
    }
    my(className, ...finders) {
      return this.game.first(className, { owner: this }, ...finders);
    }
    has(className, ...finders) {
      return this.game.has(className, { owner: this }, ...finders);
    }
    toJSON(player) {
      let { _players, game: _b, ...attrs } = this;
      attrs = serializeObject(Object.fromEntries(Object.entries(attrs).filter(([key, value]) => typeof value !== "function" && (player === void 0 || player === this || !this.constructor.hiddenAttributes.includes(key)))));
      if (globalThis.window) {
        try {
          structuredClone(attrs);
        } catch (e) {
          console.error(`invalid properties on player ${this}:
${JSON.stringify(attrs, void 0, 2)}`);
          throw e;
        }
      }
      return attrs;
    }
    toString() {
      return this.name;
    }
  };
  Player.isPlayer = true;
  Player.hiddenAttributes = [];
  var player_default = Player;

  // node_modules/@boardzilla/core/entry/action/selection.js
  var Selection = class _Selection {
    static {
      __name(this, "Selection");
    }
    constructor(name, s) {
      this.clientContext = {};
      this.invalidOptions = [];
      this.name = name;
      if (s instanceof _Selection) {
        Object.assign(this, s);
      } else {
        if (s.selectFromChoices) {
          this.type = "choices";
          this.choices = s.selectFromChoices.choices;
          this.initial = s.selectFromChoices.initial;
        } else if (s.selectOnBoard) {
          this.type = "board";
          this.boardChoices = s.selectOnBoard.chooseFrom;
          if (s.selectOnBoard.number !== void 0) {
            this.min = s.selectOnBoard.number;
            this.max = s.selectOnBoard.number;
          }
          this.min ?? (this.min = s.selectOnBoard.min);
          this.max ?? (this.max = s.selectOnBoard.max);
          this.initial ?? (this.initial = s.selectOnBoard.initial);
        } else if (s.selectNumber) {
          this.type = "number";
          this.min = s.selectNumber.min;
          this.max = s.selectNumber.max;
          this.initial = s.selectNumber.initial ?? s.selectNumber.min ?? 1;
        } else if (s.enterText) {
          this.type = "text";
          this.regexp = s.enterText.regexp;
          this.initial = s.enterText.initial;
        } else if (s.selectPlaceOnBoard) {
          this.type = "place";
          this.placePiece = s.selectPlaceOnBoard.piece;
          this.rotationChoices = s.selectPlaceOnBoard.rotationChoices;
        } else {
          this.type = "button";
          this.value = s.value;
          this.skipIf ?? (this.skipIf = "only-one");
        }
      }
      this.prompt = s.prompt;
      this.confirm = typeof s.confirm === "string" ? [s.confirm, void 0] : s.confirm;
      this.validation = s.validation;
      this.skipIf = "skipIf" in s && s.skipIf || "only-one";
      this.clientContext = s.clientContext ?? {};
    }
    isLabeledChoice() {
      return this.choices && typeof this.choices[0] === "object" && !(this.choices[0] instanceof element_default) && !(this.choices[0] instanceof player_default);
    }
    choiceLabels() {
      if (this.isLabeledChoice()) {
        return this.choices.map((c) => c.label);
      }
      return this.choices ?? [];
    }
    choiceValues() {
      if (this.isLabeledChoice()) {
        return this.choices.map((c) => c.choice);
      }
      return this.choices ?? [];
    }
    labelFor(choice) {
      return String(this.isLabeledChoice() ? this.choices.find((c) => c.choice === choice)?.label : choice);
    }
    /**
     * check specific selection with a given arg. evaluates within the context of
     * previous args, so any selection elements that have previous-arg-function
     * forms are here evaluated with the previous args. returns new selection and
     * error if any
     */
    error(args) {
      const arg = args[this.name];
      const s = this.resolve(args);
      if (s.validation) {
        const error = s.validation(args);
        if (error !== void 0 && error !== true)
          return error || "Invalid selection";
      }
      if (s.type === "choices" && s.choices) {
        if (arg instanceof Array)
          return "multi-choice stil unsupported";
        return s.choiceValues().includes(arg) ? void 0 : "Not a valid choice";
      }
      if (s.type === "board" && s.boardChoices) {
        const results = s.boardChoices;
        if (!results)
          console.warn("Attempted to validate an impossible move", s);
        if (this.isMulti()) {
          if (!(arg instanceof Array))
            throw Error("Required multi select");
          if (results && arg.some((a) => !results.includes(a)))
            return "Selected elements are not valid";
          if (s.min !== void 0 && arg.length < s.min)
            return "Below minimum";
          if (s.max !== void 0 && arg.length > s.max)
            return "Above maximum";
        } else {
          return results && results.includes(arg) ? void 0 : "Selected element is not valid";
        }
      }
      if (s.type === "text") {
        return typeof arg === "string" && (!s.regexp || arg.match(s.regexp)) ? void 0 : "Invalid text entered";
      }
      if (s.type === "number") {
        if (typeof arg !== "number")
          return "Not a number";
        if (s.min !== void 0 && arg < s.min)
          return "Below minimum";
        if (s.max !== void 0 && arg > s.max)
          return "Above maximum";
        return void 0;
      }
      return void 0;
    }
    // All possible valid Arguments to this selection. Have to make some assumptions here to tree shake possible moves
    options() {
      if (this.isUnbounded())
        return [];
      if (this.type === "number")
        return range(this.min ?? 1, this.max);
      const choices = this.choiceValues();
      if (this.isMulti())
        return combinations(this.boardChoices || choices, this.min ?? 1, this.max ?? Infinity);
      if (this.boardChoices)
        return this.boardChoices;
      if (this.choices)
        return choices;
      return [];
    }
    isUnbounded() {
      if (this.type === "number")
        return this.max === void 0 || this.max - (this.min ?? 1) > 100;
      return this.type === "text" || this.type === "button" || this.type === "place";
    }
    isResolved() {
      return typeof this.prompt !== "function" && typeof this.min !== "function" && typeof this.max !== "function" && typeof this.initial !== "function" && typeof this.skipIf !== "function" && typeof this.choices !== "function" && typeof this.boardChoices !== "function";
    }
    isMulti() {
      return (this.type === "choices" || this.type === "board") && (this.min !== void 0 || this.max !== void 0);
    }
    isBoardChoice() {
      return this.type === "board" || this.type === "place";
    }
    resolve(args) {
      const resolved = new _Selection(this.name, this);
      if (typeof this.boardChoices === "string")
        throw Error("not impl");
      if (typeof this.prompt === "function")
        resolved.prompt = this.prompt(args);
      if (typeof this.min === "function")
        resolved.min = this.min(args);
      if (typeof this.max === "function")
        resolved.max = this.max(args);
      if (typeof this.initial === "function")
        resolved.initial = this.initial(args);
      if (typeof this.skipIf === "function")
        resolved.skipIf = this.skipIf(args);
      if (typeof this.choices === "function")
        resolved.choices = this.choices(args);
      if (typeof this.boardChoices === "string")
        throw Error("not impl");
      if (typeof this.boardChoices === "function")
        resolved.boardChoices = this.boardChoices(args);
      return resolved;
    }
    isPossible() {
      if (this.type === "choices" && this.choices)
        return this.choices.length > 0;
      const isInBounds = this.max !== void 0 ? (this.min ?? 1) <= this.max : true;
      if (this.type === "board" && this.boardChoices)
        return isInBounds && this.boardChoices.length >= (this.min ?? 1);
      if (this.type === "number")
        return isInBounds;
      return true;
    }
    isForced() {
      if (this.skipIf === "never")
        return;
      if (this.type === "button") {
        return this.value;
      } else if (this.boardChoices && (this.skipIf === true || this.boardChoices?.length === 1) && !this.isMulti()) {
        return this.boardChoices[0];
      } else if (this.boardChoices && this.isMulti() && (this.skipIf === true || this.boardChoices.length === (this.min ?? 1) || this.max === 0)) {
        return this.boardChoices.slice(0, this.min);
      } else if (this.type === "number" && this.min !== void 0 && this.min === this.max) {
        return this.min;
      } else if (this.type === "choices" && this.choices) {
        if (this.choices.length === 1 || this.skipIf === true)
          return this.choiceValues()[0];
      }
    }
    overrideOptions(options) {
      if (this.type === "board") {
        this.boardChoices = options;
      } else if (this.isLabeledChoice()) {
        this.choices = this.choices.filter((c) => options.includes(c.choice));
      } else {
        this.choices = options;
      }
    }
    toString() {
      if (!this.isResolved())
        return `unresolved selection ${this.type}`;
      return `${this.type === "board" ? `click ${this.boardChoices[0]?.constructor.name || "board element"}` : `pick ${this.type}`}${this.choices || this.boardChoices ? ` (${(this.choices || this.boardChoices).length} choices)` : ""}`;
    }
  };

  // node_modules/@boardzilla/core/entry/action/action.js
  var Action = class {
    static {
      __name(this, "Action");
    }
    constructor({ prompt, description, condition }) {
      this.selections = [];
      this.moves = [];
      this.messages = [];
      this.order = [];
      this.mutated = false;
      this.prompt = prompt;
      this.description = description;
      this.condition = condition;
    }
    isPossible(args) {
      return typeof this.condition === "function" ? this.condition(args) : this.condition ?? true;
    }
    // given a set of args, return sub-selections possible trying each possible next arg
    // return undefined if these args are impossible
    // return 0-length if these args are submittable
    // return array of follow-up selections if incomplete
    // skipping/expanding is very complex and this method runs all the rules for what should/must be combined, either as additional selections or as forced args
    // skippable options will still appear in order to present the choices to the user to select that tree. This will be the final selection if no other selection turned skipping off
    // TODO memoize
    _getPendingMoves(args, debug) {
      if (debug) {
        debug[this.name] = { args: {} };
        for (const arg of Object.keys(args))
          debug[this.name].args[arg] = "sel";
      }
      const moves = this._getPendingMovesInner(args, debug);
      if (moves?.length) {
        for (const move of moves) {
          if (debug) {
            debug[move.name].args[move.selections[0].name] = "ask";
          }
          const combineWith = move.selections[0].clientContext?.combineWith;
          let confirm = move.selections[0].confirm;
          let validation = move.selections[0].validation;
          for (let i = this.selections.findIndex((s) => s.name === move.selections[0].name) + 1; i !== this.selections.length; i++) {
            if (confirm)
              break;
            let selection = this.selections[i];
            if (combineWith?.includes(selection.name))
              selection = selection.resolve(move.args);
            if (!selection.isResolved())
              break;
            const arg = selection.isForced();
            if (arg !== void 0) {
              move.args[selection.name] = arg;
              if (debug) {
                debug[move.name].args[selection.name] = "forced";
              }
            } else if (combineWith?.includes(selection.name)) {
              move.selections.push(selection);
              if (debug) {
                debug[move.name].args[selection.name] = "ask";
              }
            } else {
              break;
            }
            confirm = selection.confirm ?? confirm;
            validation = selection.validation ?? validation;
          }
          if (confirm)
            move.selections[0].confirm = confirm;
          if (validation)
            move.selections[move.selections.length - 1].validation = validation;
        }
      }
      return moves;
    }
    _getPendingMovesInner(args, debug) {
      var _a, _b, _c, _d;
      let selection = this._nextSelection(args);
      if (!selection)
        return [];
      const move = {
        name: this.name,
        prompt: this.prompt,
        description: this.description,
        args,
        selections: [selection]
      };
      if (!selection.isPossible()) {
        if (debug) {
          (_a = debug[this.name].args)[_b = selection.name] ?? (_a[_b] = "imp");
        }
        return;
      }
      if (!selection.isUnbounded()) {
        let possibleOptions = [];
        let pruned = false;
        let pendingMoves = [];
        let hasCompleteMove = false;
        for (const option of selection.options()) {
          const allArgs = { ...args, [selection.name]: option };
          if (selection.validation && !selection.isMulti()) {
            const error = this._withDecoratedArgs(allArgs, (args2) => selection.error(args2));
            if (error) {
              pruned = true;
              selection.invalidOptions.push({ option, error, label: selection.labelFor(option) });
              continue;
            }
          }
          const submoves = this._getPendingMovesInner(allArgs, debug);
          if (submoves === void 0) {
            pruned = true;
          } else {
            possibleOptions.push(option);
            hasCompleteMove || (hasCompleteMove = submoves.length === 0);
            pendingMoves = pendingMoves.concat(submoves);
          }
        }
        if (!possibleOptions.length) {
          if (debug) {
            debug[this.name].args[selection.name] = "tree";
          }
          return void 0;
        }
        if (pruned && !selection.isMulti()) {
          selection.overrideOptions(possibleOptions);
        }
        if (pendingMoves.length && ((selection.skipIf === "always" || selection.skipIf === true) && !hasCompleteMove || selection.skipIf === "only-one" && possibleOptions.length === 1 && (!selection.clientContext?.combineWith || selection.options().length <= 1))) {
          if (debug) {
            debug[this.name].args[selection.name] = selection.skipIf === true ? "skip" : selection.skipIf;
          }
          return pendingMoves;
        }
      }
      if (debug && (debug[this.name].args[selection.name] ?? "imp") === "imp") {
        (_c = debug[this.name].args)[_d = selection.name] ?? (_c[_d] = "future");
      }
      return [move];
    }
    /**
     * given a partial arg list, returns a selection object for continuation if one exists.
     * @internal
     */
    _nextSelection(args) {
      let nextSelection = void 0;
      for (const s of this.selections) {
        const selection = s.resolve(args);
        if (selection.skipIf === true)
          continue;
        if (!(s.name in args)) {
          nextSelection = selection;
          break;
        }
      }
      return nextSelection;
    }
    /**
     * process this action with supplied args. returns error if any
     * @internal
     */
    _process(player, args) {
      let error = void 0;
      if (!this.isPossible(args))
        return `${this.name} action not possible`;
      for (const selection of this.selections) {
        if (args[selection.name] === void 0) {
          const arg = selection.resolve(args).isForced();
          if (arg)
            args[selection.name] = arg;
        }
        error = this._withDecoratedArgs(args, (args2) => selection.error(args2));
        if (error) {
          console.error(`Invalid choice for ${selection.name}. Got "${args[selection.name]}" ${error}`);
          break;
        }
      }
      if (error)
        return error;
      if (!globalThis.window) {
        const pendingMoves = this._getPendingMoves(args);
        if (!pendingMoves) {
          console.error("attempted to process invalid args", this.name, args);
          return error || "unknown error during action._process";
        }
        if (pendingMoves.length) {
          return error || "incomplete action";
        }
      }
      let moveIndex = 0;
      let messageIndex = 0;
      for (const seq of this.order) {
        if (seq === "move") {
          this.moves[moveIndex++](args);
        } else {
          const message = this.messages[messageIndex++];
          const messageArgs = typeof message.args === "function" ? message.args(args) : message.args;
          if (message.position) {
            this.gameManager.game.messageTo(message.position, message.text, { ...args, player, ...messageArgs });
          } else {
            this.gameManager.game.message(message.text, { ...args, player, ...messageArgs });
          }
        }
      }
    }
    _addSelection(selection) {
      if (this.selections.find((s) => s.name === selection.name))
        throw Error(`Duplicate selection name on action: ${selection.name}`);
      if (this.mutated)
        console.warn(`Adding a choice ("${selection.name}") after behavior in action is valid but players will need to perform the choices before the behavior.`);
      this.selections.push(selection);
      return selection;
    }
    // fn must be idempotent
    _withDecoratedArgs(args, fn) {
      if (args["__placement__"]) {
        const placementSelection = this.selections.find((s) => s.name === "__placement__");
        if (placementSelection && args[placementSelection.placePiece]) {
          args = { ...args };
          const placePiece = args[placementSelection.placePiece];
          const { row, column, _rotation } = placePiece;
          const [newColumn, newRow, newRotation] = args["__placement__"];
          placePiece.column = newColumn;
          placePiece.row = newRow;
          placePiece.rotation = newRotation ?? 0;
          const result = fn(args);
          placePiece.column = column;
          placePiece.row = row;
          placePiece._rotation = _rotation;
          return result;
        }
      }
      return fn(args);
    }
    _getError(selection, args) {
      return this._withDecoratedArgs(args, (args2) => selection.error(args2));
    }
    _getConfirmation(selection, args) {
      if (!selection.confirm)
        return;
      const argList = selection.confirm[1];
      return n(selection.confirm[0], { ...args, ...typeof argList === "function" ? this._withDecoratedArgs(args, argList) : argList });
    }
    /**
     * Add behaviour to this action to alter game state. After adding the choices
     * to an action, calling `do` causes Boardzilla to use the player choices to
     * actually do something with those choices. Call this method after all the
     * methods for player choices so that the choices are properly available to
     * the `do` function.
     *
     * @param move - The action to perform. This function accepts one argument
     * with key-value pairs for each choice added to the action using the provided
     * names.
     *
     * @example
     * player => action({
     *   prompt: 'Take resources',
     * }).chooseFrom({
     *   'resource', ['lumber', 'steel'],
     *   { prompt: 'Select resource' }
     * }).chooseNumber(
     *   'amount', {
     *     prompt: 'Select amount',
     *     max: 3
     * }).do(({ resource, amount }) => {
     *   // the choices are automatically passed in with their proper type
     *   game.firstN(amount, Resource, {resource}).putInto(
     *     player.my('stockPile')
     *   );
     * })
     * @category Behaviour
     */
    do(move) {
      this.mutated = true;
      this.moves.push(move);
      this.order.push("move");
      return this;
    }
    /**
     * Add a message to this action that will be broadcast in the chat. Call this
     * method after all the methods for player choices so that the choices are
     * properly available to the `message` function. However the message should be
     * called before or after any `do` behaviour depending on whether you want the
     * message to reflect the game state before or after the move is performs. The
     * action's `message` and `do` functions can be intermixed in this way to
     * generate messages at different points int the execution of a move.
     *
     * @param text - The text of the message to send. This can contain interpolated
     * strings with double braces just as when calling {@link Game#message}
     * directly. However when using this method, the player performing the action,
     * plus any choices made in the action are automatically made available.
     *
     * @param args - If additional strings are needed in the message besides
     * 'player' and the player choices, these can be specified here. This can also
     * be specified as a function that accepts the player choices and returns
     * key-value pairs of strings for interpolation.
     *
     * @example
     * action({
     *   prompt: 'Say something',
     * }).enterText({
     *   'message',
     * }).message(
     *   '{{player}} said {{message}}' // no args needed
     * ).message(
     *   "I said, {{player}} said {{loudMessage}}",
     *   ({ message }) => ({ loudMessage: message.toUpperCase() })
     * )
     * @category Behaviour
     */
    message(text, args) {
      this.messages.push({ text, args });
      this.order.push("message");
      return this;
    }
    /**
     * Add a message to this action that will be broadcast in the chat to the
     * specified player(s). Call this method after all the methods for player
     * choices so that the choices are properly available to the `message`
     * function. However the message should be called before or after any `do`
     * behaviour depending on whether you want the message to reflect the game
     * state before or after the move is performs. The action's `message` and `do`
     * functions can be intermixed in this way to generate messages at different
     * points int the execution of a move.
     *
     * @param player - Player or players to receive the message
     *
     * @param text - The text of the message to send. This can contain interpolated
     * strings with double braces just as when calling {@link Game#message}
     * directly. However when using this method, the player performing the action,
     * plus any choices made in the action are automatically made available.
     *
     * @param args - If additional strings are needed in the message besides
     * 'player' and the player choices, these can be specified here. This can also
     * be specified as a function that accepts the player choices and returns
     * key-value pairs of strings for interpolation.
     *
     * @example
     * action({
     *   prompt: 'Say something',
     * }).enterText({
     *   'message',
     * }).message(
     *   '{{player}} said {{message}}' // no args needed
     * ).message(
     *   "I said, {{player}} said {{loudMessage}}",
     *   ({ message }) => ({ loudMessage: message.toUpperCase() })
     * )
     * @category Behaviour
     */
    messageTo(player, text, args) {
      if (!(player instanceof Array))
        player = [player];
      for (const p of player) {
        this.messages.push({ position: typeof p === "number" ? p : p.position, text, args });
        this.order.push("message");
      }
      return this;
    }
    /**
     * Add a choice to this action from a list of options. These choices will be
     * displayed as buttons in the UI.
     *
     * @param name - The name of this choice. This name will be used in all
     * functions that accept the player's choices
     *
     * @param choices - An array of choices. This may be an array of simple values
     * or an array of objects in the form: `{ label: string, choice: value }`
     * where value is the actual choice that will be passed to the rest of the
     * action, but label is the text presented to the player that they will be
     * prompted to click. Use the object style when you want player text to
     * contain additional logic or differ in some way from the choice, similiar to
     * `<option value="key">Some text</option>` in HTML. This can also be a
     * function that returns the choice array. This function will accept arguments
     * for each choice the player has made up to this point in the action.
     *
     * @param {Object} options
     * @param options.prompt - Prompt displayed to the user for this choice.
     * @param options.skipIf - One of 'always', 'never' or 'only-one' or a
     * function returning a boolean. (Default 'only-one').
     *
     * <ul>
     * <li>only-one: If there is only valid choice in the choices given, the game
     * will skip this choice, prompting the player for subsequent choices, if any,
     * or completing the action otherwise.
     * <li>always: Rather than present this choice directly, the player will be
     * prompted with choices from the *next choice* in the action for each
     * possible choice here, essentially expanding the choices ahead of time to
     * save the player a step. This option only has relevance if there are
     * subsequent choices in the action.
     * <li>never: Always present this choice, even if the choice is forced
     * <li>function: A function that accepts all player choices up to this point
     * and returns a boolean. If returning true, this choice will be skipped.
     * This form is useful in the rare situations where the choice at the time may
     * be meaningless, e.g. selecting from a set of identical tokens. In this case
     * the game will make the choice for the player using the first viable option.
     * </ul>
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit this choice. If a string is returned, this
     * will display as the reason for disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @example
     * action({
     *   prompt: 'Choose color',
     * }).chooseFrom(
     *   'color', ['white', 'blue', 'red'],
     * ).do(
     *   ({ color }) => ... color will be equal to the player-selected color ...
     * )
     *
     * // a more complex example:
     * action({
     *   prompt: 'Take resources',
     * }).chooseFrom(
     *   'resource', ['lumber', 'steel', 'oil'],
     *   { prompt: 'Select resource' }
     * ).chooseFrom(
     *   // Use the functional style to include the resource choice in the text
     *   // Also use object style to have the value simply be "high" or "low"
     *   'grade', ({ resource }) => [
     *     { choice: 'high', label: `High grade ${resource}` }
     *     { choice: 'low', label: `Low grade ${resource}` }
     *   ],
     *   {
     *     // A follow-up choice that doesn't apply to "oil"
     *     skipIf: ({ resource }) => resource === 'oil',
     *     // Add an 'are you sure?' message
     *     confirm: ['Buy {{grade}} grade {{resource}}?', ({ grade }) = ({ grade: grade.toUpperCase() })]
     *   }
     * ).do (
     *   ({ resource, grade }) => {
     *     // resource will equal 'lumber', 'steel' or 'oil'
     *     // grade will equal 'high' or 'low'
     *   }
     * )
     * @category Choices
     */
    chooseFrom(name, choices, options) {
      this._addSelection(new Selection(name, {
        prompt: options?.prompt,
        validation: options?.validate,
        confirm: options?.confirm,
        skipIf: options?.skipIf,
        selectFromChoices: { choices }
      }));
      return this;
    }
    /**
     * Prompt the user for text entry. Use this in games where players submit
     * text, like word-guessing games.
     *
     * @param name - The name of this text input. This name will be used in all
     * functions that accept the player's choices
     *
     * @param {Object} options
     * @param options.initial - Default text that can appear initially before a
     * user types.
     * @param options.prompt - Prompt displayed to the user for entering this
     * text.
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit this text. If a string is returned, this
     * will display as the reason for disallowing this text.
     *
     * @example
     * action({
     *   prompt: 'Guess a word',
     * }).enterText({
     *   'guess',
     *   { prompt: 'Your guess', }
     * }).message(
     *   guess => `{{player}} guessed ${guess}`
     * })
     * @category Choices
     */
    enterText(name, options) {
      const { prompt, validate, regexp, initial } = options || {};
      this._addSelection(new Selection(name, { prompt, validation: validate, enterText: { regexp, initial } }));
      return this;
    }
    /**
     * Add a numerical choice for this action. This will be presented with a
     * number picker.
     *
     * @param name - The name of this choice. This name will be used in all
     * functions that accept the player's choices
     *
     * @param {Object} options
     *
     * @param options.prompt - Prompt displayed to the user for entering this
     * number.
     *
     * @param options.min - Minimum allowed. Default 1.
     *
     * @param options.max - Maximum allowed. Default Infinity
     *
     * @param options.initial - Initial value to display in the picker
     *
     * @param options.skipIf - One of 'always', 'never' or 'only-one' or a
     * function returning a boolean. (Default 'only-one').
     *
     * <ul>
     * <li>only-one: If there is only valid choice in the choices given, the game
     * will skip this choice, prompting the player for subsequent choices, if any,
     * or completing the action otherwise.
     * <li>always: Rather than present this choice directly, the player will be
     * prompted with choices from the *next choice* in the action for each
     * possible choice here, essentially expanding the choices ahead of time to
     * save the player a step. This option only has relevance if there are
     * subsequent choices in the action.
     * <li>never: Always present this choice, even if the choice is forced
     * <li>function: A function that accepts all player choices up to this point
     * and returns a boolean. If returning true, this choice will be skipped.
     * This form is useful in the rare situations where the choice at the time may
     * be meaningless, e.g. selecting from a set of identical tokens. In this case
     * the game will make the choice for the player using the first viable option.
     * </ul>
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit this choice. If a string is returned, this
     * will display as the reason for disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @example
     * player => action({
     *   prompt: 'Buy resources',
     * }).chooseNumber(
     *   'amount', {
     *     min: 5,
     *     max: 10 // select from 5 - 10
     * }).do(
     *   ({ amount }) => player.resource += amount
     * );
     * @category Choices
     */
    chooseNumber(name, options = {}) {
      const { min, max, prompt, confirm, validate, initial, skipIf } = options;
      this._addSelection(new Selection(name, { prompt, confirm, validation: validate, skipIf, selectNumber: { min, max, initial } }));
      return this;
    }
    chooseOnBoard(name, choices, options) {
      const { prompt, confirm, validate, initial, min, max, number, skipIf } = options || {};
      this._addSelection(new Selection(name, { prompt, confirm, validation: validate, skipIf, selectOnBoard: { chooseFrom: choices, min, max, number, initial } }));
      if (min !== void 0 || max !== void 0 || number !== void 0) {
        return this;
      }
      return this;
    }
    choose(name, type, choices, options) {
      if (type === "number")
        return this.chooseNumber(name, choices);
      if (type === "text")
        return this.enterText(name, choices);
      if (type === "select")
        return this.chooseFrom(name, choices, options);
      return this.chooseOnBoard(name, choices, options);
    }
    /**
     * Create a multi-selection choice. These selections will be presented all at
     * once as a form. This is used for form-like choices that have a number of
     * choices that are not board choices, i.e. chooseFrom, chooseNumber and
     * enterText
     *
     * @param choices - An object containing the selections. This is a set of
     * key-value pairs where each key is the name of the selection and each value
     * is an array of options where the first array element is a string indicating
     * the type of choice ('number', 'select', 'text') and subsequent elements
     * contain the options for the appropriate choice function (`chooseNumber`,
     * `chooseFrom` or `enterText`).
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit these choices. If a string is returned, this
     * will display as the reason for disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @example
     * action({
     *   prompt: 'purchase'
     * }).chooseGroup({
     *   lumber: ['number', { min: 2 }],
     *   steel: ['number', { min: 2 }]
     * }, {
     *   // may not purchase more than 10 total resources
     *   validate: ({ lumber, steel }) => lumber + steel <= 10
     * });
     * @category Choices
     */
    chooseGroup(choices, options) {
      for (const [name, choice] of Object.entries(choices)) {
        if (choice[0] === "number")
          this.chooseNumber(name, choice[1]);
        if (choice[0] === "select")
          this.chooseFrom(name, choice[1], choice[2]);
        if (choice[0] === "text")
          this.enterText(name, choice[1]);
      }
      if (options?.confirm)
        this.selections[this.selections.length - 1].confirm = typeof options.confirm === "string" ? [options.confirm, void 0] : options.confirm;
      if (options?.validate)
        this.selections[this.selections.length - 1].validation = options.validate;
      for (let i = 1; i < Object.values(choices).length; i++) {
        this.selections[this.selections.length - 1 - i].clientContext = { combineWith: this.selections.slice(-i).map((s) => s.name) };
      }
      return this;
    }
    /**
     * Add a confirmtation step to this action. This can be useful if you want to
     * present additional information to the player related to the consequences of
     * their choice, like a cost incurred. Or this can simply be used to force the
     * user to click an additional button on a particular important choice.
     *
     * @param prompt - Button text for the confirmation step. This can be a
     * function returning the text which accepts each choice the player has made
     * up till now as an argument.
     *
     * @example
     * action({
     *   prompt: "Buy resources",
     * }).chooseNumber({
     *   'amount', {
     *     prompt: "Amount",
     *     max: Math.floor(player.coins / 5)
     * }).confirm(
     *   ({ amount }) => `Spend ${amount * 5} coins`
     * }).do(({ amount }) => {
     *   player.resource += amount;
     *   player.coins -= amount * 5;
     * });
     */
    confirm(prompt) {
      this._addSelection(new Selection("__confirm__", {
        prompt,
        confirm: typeof prompt === "string" ? prompt : ["{{__message__}}", (args) => ({ __message__: prompt(args) })],
        value: true
      }));
      return this;
    }
    /**
     * Perform a move with the selected element(s) into a selected
     * Space/Piece. This is almost the equivalent of calling Action#do and adding
     * a putInto command, except that the game will also permit the UI to allow a
     * mouse drag for the move.
     *
     * @param piece - A {@link Piece} to move or the name of the piece selection in this action
     * @param into - A {@link GameElement} to move into or the name of the
     * destination selection in this action.
     *
     * player => action({
     *   prompt: 'Discard a card from hand'
     * }).chooseOnBoard(
     *   'card', player.my(Card)
     * ).move(
     *   'card', $.discard
     * )
     * @category Behaviour
     */
    move(piece, into) {
      this.do((args) => {
        const selectedPiece = piece instanceof Piece ? piece : args[piece];
        const selectedInto = into instanceof element_default ? into : args[into];
        if (selectedPiece instanceof Array) {
          new ElementCollection(...selectedPiece).putInto(selectedInto);
        } else {
          selectedPiece.putInto(selectedInto);
        }
      });
      const pieceSelection = typeof piece === "string" ? this.selections.find((s) => s.name === piece) : void 0;
      const intoSelection = typeof into === "string" ? this.selections.find((s) => s.name === into) : void 0;
      if (intoSelection && intoSelection.type !== "board")
        throw Error(`Invalid move: "${into}" must be the name of a previous chooseOnBoard`);
      if (pieceSelection && pieceSelection.type !== "board")
        throw Error(`Invalid move: "${piece}" must be the name of a previous chooseOnBoard`);
      if (intoSelection?.isMulti())
        throw Error("Invalid move: May not move into a multiple choice selection");
      if (pieceSelection && !pieceSelection.isMulti())
        pieceSelection.clientContext = { dragInto: intoSelection ?? into };
      if (intoSelection)
        intoSelection.clientContext = { dragFrom: pieceSelection ?? piece };
      return this;
    }
    /**
     * Swap the location of two Pieces. Each of the two pieces can either be the
     * name of a previous `chooseOnBoard`, or a simply provide a piece if it is
     * not a player choice. The game will also allow a mouse drag for the swap.
     *
     * @param piece1 - A {@link Piece} to swap or the name of the piece selection in this action
     * @param piece2 - A {@link Piece} to swap or the name of the piece selection in this action
     *
     * player => action({
     *   prompt: 'Exchange a card from hand with the top of the deck'
     * }).chooseOnBoard(
     *   'card', player.my(Card)
     * ).swap(
     *   'card', $.deck.first(Card)!
     * )
     * @category Behaviour
     */
    swap(piece1, piece2) {
      this.do((args) => {
        const p1 = piece1 instanceof Piece ? piece1 : args[piece1];
        const p2 = piece2 instanceof Piece ? piece2 : args[piece2];
        const parent1 = p1._t.parent;
        const parent2 = p2._t.parent;
        const pos1 = p1.position();
        const pos2 = p2.position();
        const row1 = p1.row;
        const column1 = p1.column;
        const row2 = p2.row;
        const column2 = p2.column;
        p1.putInto(parent2, { position: pos2, row: row2, column: column2 });
        p2.putInto(parent1, { position: pos1, row: row1, column: column1 });
      });
      const piece1Selection = typeof piece1 === "string" ? this.selections.find((s) => s.name === piece1) : void 0;
      const piece2Selection = typeof piece2 === "string" ? this.selections.find((s) => s.name === piece2) : void 0;
      if (piece1Selection && piece1Selection.type !== "board")
        throw Error(`Invalid swap: "${piece1}" must be the name of a previous chooseOnBoard`);
      if (piece2Selection && piece2Selection.type !== "board")
        throw Error(`Invalid swap: "${piece2}" must be the name of a previous chooseOnBoard`);
      if (piece1Selection)
        piece1Selection.clientContext = { dragInto: piece2Selection ?? piece2 };
      return this;
    }
    /**
     * Have the player select one of the Pieces in the collection and select a new
     * position within the collection while keeping everything else in the same
     * order. The game will also permit a mouse drag for the reorder.
     *
     * @param collection - A collection of {@link Piece}s to reorder
     *
     * @param options.prompt - Prompt displayed to the user for this reorder
     * choice.
     *
     * player => action({
     *   prompt: 'Reorder cards in hand'
     * }).reorder(
     *   player.my(Card)
     * )
     * @category Behaviour
     */
    reorder(collection, options) {
      const { prompt } = options || {};
      if (this.selections.some((s) => s.name === "__reorder_from__"))
        throw Error(`Invalid reorder: only one reorder allowed`);
      if (collection.some((c) => c._t.parent !== collection[0]._t.parent))
        throw Error(`Invalid reorder: all elements must belong to the same parent`);
      const pieceSelection = this._addSelection(new Selection("__reorder_from__", { prompt, selectOnBoard: { chooseFrom: collection } }));
      const intoSelection = this._addSelection(new Selection("__reorder_to__", { prompt, selectOnBoard: { chooseFrom: ({ __reorder_from__ }) => collection.filter((e) => e !== __reorder_from__) } }));
      pieceSelection.clientContext = { dragInto: intoSelection };
      intoSelection.clientContext = { dragFrom: pieceSelection };
      this.do((args) => {
        const reorderFrom = args["__reorder_from__"];
        const reorderTo = args["__reorder_to__"];
        let position = reorderTo.position();
        reorderFrom.putInto(reorderFrom._t.parent, { position });
      });
      return this;
    }
    /**
     * Add a placement selection to this action. This will be presented as a piece
     * that players can move into the desired location, snapping to the grid of
     * the destination as the player moves.
     *
     * @param piece - The name of the piece selection in this action from a
     * `chooseOnBoard` prior to this
     * @param into - A {@link GameElement} to move into
     *
     * @param options.prompt - Prompt displayed to the user for this placement
     * choice.
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. The position selected
     * during the piece placement can be checked by reading the 'column', 'row'
     * and `rotation` properties of the `piece` as provided in the first
     * argument. If false, the game will not allow the player to submit these
     * choices. If a string is returned, this will display as the reason for
     * disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @param options.rotationChoices = An array of valid rotations in
     * degrees. These choices must be normalized to numbers between 0-359°. If
     * supplied the piece will be given rotation handles for the player to set the
     * rotation and position together.
     *
     * player => action({
     *   prompt: 'Place your tile'
     * }).chooseOnBoard(
     *   'tile', player.my(Tile)
     * ).placePiece(
     *   'tile', $.map, {
     *     confirm: ({ tile }) => [
     *       'Place tile into row {{row}} and column {{column}}?',
     *       tile
     *     ]
     * })
     * @category Choices
     */
    placePiece(piece, into, options) {
      const { prompt, confirm, validate } = options || {};
      if (this.selections.some((s) => s.name === "__placement__"))
        throw Error(`Invalid placePiece: only one placePiece allowed`);
      const pieceSelection = this.selections.find((s) => s.name === piece);
      if (!pieceSelection)
        throw `No selection named ${String(piece)} for placePiece`;
      const positionSelection = this._addSelection(new Selection("__placement__", { prompt, confirm, validation: validate, selectPlaceOnBoard: { piece, rotationChoices: options?.rotationChoices } }));
      positionSelection.clientContext = { placement: { piece, into } };
      this.do((args) => {
        const selectedPiece = args[piece];
        if (!(selectedPiece instanceof Piece))
          throw Error(`Cannot place piece selection named ${String(piece)}. Returned ${selectedPiece} instead of a piece`);
        selectedPiece.putInto(into, { column: args["__placement__"][0], row: args["__placement__"][1] });
        selectedPiece.rotation = args["__placement__"][2];
      });
      if (pieceSelection)
        pieceSelection.clientContext = { dragInto: into };
      return this;
    }
  };

  // node_modules/@boardzilla/core/entry/flow/enums.js
  var Do = {
    repeat: (loop) => interrupt({ signal: InterruptControl.repeat, data: typeof loop === "string" ? loop : void 0 }),
    continue: (loop) => interrupt({ signal: InterruptControl.continue, data: typeof loop === "string" ? loop : void 0 }),
    break: (loop) => interrupt({ signal: InterruptControl.break, data: typeof loop === "string" ? loop : void 0 }),
    subflow: (flow, args) => interrupt({ signal: InterruptControl.subflow, data: { name: flow, args } })
  };
  var interruptSignal = [];
  function interrupt({ signal, data }) {
    if (signal === InterruptControl.subflow) {
      if (interruptSignal.every((s) => s.signal === InterruptControl.subflow)) {
        interruptSignal.push({ data, signal });
      }
    } else {
      interruptSignal.splice(0);
      interruptSignal[0] = { data, signal };
    }
  }
  __name(interrupt, "interrupt");
  var InterruptControl;
  (function(InterruptControl2) {
    InterruptControl2["repeat"] = "__REPEAT__";
    InterruptControl2["continue"] = "__CONTINUE__";
    InterruptControl2["break"] = "__BREAK__";
    InterruptControl2["subflow"] = "__SUBFLOW__";
  })(InterruptControl || (InterruptControl = {}));
  var FlowControl;
  (function(FlowControl2) {
    FlowControl2["ok"] = "__OK__";
    FlowControl2["complete"] = "__COMPLETE__";
  })(FlowControl || (FlowControl = {}));

  // node_modules/@boardzilla/core/entry/flow/flow.js
  var Flow = class _Flow {
    static {
      __name(this, "Flow");
    }
    constructor({ name, do: block }) {
      this.type = "main";
      this.name = name;
      this.block = block;
      this.top = this;
    }
    validateNoDuplicate() {
      const name = this.name;
      this.name = void 0;
      if (name && this.getStep(name))
        throw Error(`Duplicate flow name: ${name}`);
      this.name = name;
    }
    flowStepArgs() {
      const args = { ...this.top.args ?? {} };
      let flow = this.top;
      while (flow instanceof _Flow) {
        Object.assign(args, flow.thisStepArgs());
        flow = flow.step;
      }
      return args;
    }
    thisStepArgs() {
      if (this.position && "value" in this.position && this.name) {
        return { [this.name]: this.position.value };
      }
    }
    branchJSON(forPlayer = true) {
      let branch = {
        type: this.type
      };
      if (this.name)
        branch.name = this.name;
      if (this.position !== void 0)
        branch.position = this.toJSON(forPlayer);
      if (this.sequence !== void 0 && this.currentBlock() instanceof Array)
        branch.sequence = this.sequence;
      const thisBranch = branch;
      if (this.step instanceof _Flow)
        return [thisBranch].concat(this.step.branchJSON(forPlayer));
      return [thisBranch];
    }
    setBranchFromJSON(branch) {
      const node = branch[0];
      if (node === void 0)
        throw Error(`Insufficient position elements sent to flow for ${this.name}`);
      if (node.type !== this.type || node.name !== this.name) {
        throw Error(`Flow mismatch. Trying to set ${node.type}:${node.name} on ${this.type}:${this.name}`);
      }
      this.setPositionFromJSON(node.position, node.sequence);
      if (this.step instanceof _Flow) {
        this.step.setBranchFromJSON(branch.slice(1));
      }
    }
    setPosition(position, sequence, reset = true) {
      this.position = position;
      const block = this.currentBlock();
      if (!block) {
        this.step = void 0;
      } else if (block instanceof Array) {
        if (sequence === void 0)
          sequence = 0;
        this.sequence = sequence;
        if (!block[sequence])
          throw Error(`Invalid sequence for ${this.type}:${this.name} ${sequence}/${block.length}`);
        this.step = block[sequence];
      } else {
        this.step = block;
      }
      if (this.step instanceof _Flow) {
        this.step.gameManager = this.gameManager;
        this.step.top = this.top;
        this.step.parent = this;
        if (reset)
          this.step.reset();
      }
    }
    setPositionFromJSON(positionJSON, sequence) {
      this.setPosition(this.fromJSON(positionJSON), sequence, false);
    }
    currentLoop(name) {
      if ("interrupt" in this && (!name || name === this.name))
        return this;
      return this.parent?.currentLoop();
    }
    currentProcessor() {
      if (this.step instanceof _Flow)
        return this.step.currentProcessor();
      if (this.type === "action" || this.type === "parallel")
        return this;
    }
    actionNeeded(player) {
      return this.currentProcessor()?.actionNeeded(player);
    }
    processMove(move) {
      interruptSignal.splice(0);
      const step = this.currentProcessor();
      if (!step)
        throw Error(`Cannot process action currently ${JSON.stringify(this.branchJSON())}`);
      return step.processMove(move);
    }
    getStep(name) {
      if (this.name === name) {
        this.validateNoDuplicate();
        return this;
      }
      const steps = this.allSteps();
      if (!steps)
        return;
      for (const step of steps instanceof Array ? steps : [steps]) {
        if (step instanceof _Flow) {
          const found = step.getStep(name);
          if (found)
            return found;
        }
      }
    }
    /**
     * Advance flow one step and return FlowControl.complete if complete,
     * FlowControl.ok if can continue, Do to interrupt the current loop. Returns
     * ActionStep if now waiting for player input. override for self-contained
     * flows that do not have subflows.
     */
    playOneStep() {
      const step = this.step;
      let result = FlowControl.complete;
      if (step instanceof Function) {
        if (!interruptSignal[0])
          step(this.flowStepArgs());
        result = FlowControl.complete;
        if (interruptSignal[0] && interruptSignal[0].signal !== InterruptControl.subflow)
          result = interruptSignal.splice(0);
      } else if (step instanceof _Flow) {
        result = step.playOneStep();
      }
      if (result === FlowControl.ok || result instanceof _Flow)
        return result;
      if (result !== FlowControl.complete) {
        if ("interrupt" in this && typeof this.interrupt === "function" && (!result[0].data || result[0].data === this.name))
          return this.interrupt(result[0].signal);
        return result;
      }
      const block = this.currentBlock();
      if (block instanceof Array) {
        if ((this.sequence ?? 0) + 1 !== block.length) {
          this.setPosition(this.position, (this.sequence ?? 0) + 1);
          return FlowControl.ok;
        }
      }
      return this.advance();
    }
    // play until action required (returns ActionStep) or flow complete (undefined) or subflow started {name, args}
    play() {
      interruptSignal.splice(0);
      let step;
      do {
        if (this.gameManager.phase !== "finished")
          step = this.playOneStep();
        if (!(step instanceof _Flow))
          console.debug(`Advancing flow:
 ${this.stacktrace()}`);
      } while (step === FlowControl.ok && interruptSignal[0]?.signal !== InterruptControl.subflow && this.gameManager.phase !== "finished");
      if (interruptSignal[0]?.signal === InterruptControl.subflow)
        return interruptSignal.map((s) => s.data);
      if (step instanceof _Flow)
        return step;
      if (step instanceof Array) {
        if (step[0].signal === InterruptControl.continue)
          throw Error("Cannot use Do.continue when not in a loop");
        if (step[0].signal === InterruptControl.repeat)
          throw Error("Cannot use Do.repeat when not in a loop");
        throw Error("Cannot use Do.break when not in a loop");
      }
    }
    // must override. reset runs any logic needed and call setPosition. Must not modify own state.
    reset() {
      this.setPosition(void 0);
    }
    // must override. must rely solely on this.position
    currentBlock() {
      return this.block;
    }
    // override if position contains objects that need serialization
    toJSON(_forPlayer = true) {
      return this.position;
    }
    // override if position contains objects that need deserialization
    fromJSON(json) {
      return json;
    }
    // override for steps that advance through their subflows. call setPosition if needed. return ok/complete
    advance() {
      return FlowControl.complete;
    }
    // override return all subflows
    allSteps() {
      return this.block;
    }
    toString() {
      return `flow${this.name ? ":" + this.name.replace(/__/g, "") : ""}${this.block instanceof Array && this.block.length > 1 ? " (item #" + this.sequence + ")" : ""}`;
    }
    stacktrace(indent = 0) {
      let string = this.toString();
      if (this.step instanceof _Flow)
        string += "\n " + " ".repeat(indent) + "\u21B3 " + this.step.stacktrace(indent + 2);
      return string;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "flow",
        top,
        blocks: {
          do: this.block ? this.block instanceof Array ? this.block : [this.block] : void 0
        },
        block: "do"
      });
    }
    visualizeBlocks({ type, blocks, name, top, block, position }) {
      const blockViz = Object.fromEntries(Object.entries(blocks).map(([key, block2]) => [
        key,
        block2?.map((s) => {
          if (s instanceof _Flow)
            return s.visualize(top);
          if (s === Do.break)
            return "Do.break";
          if (s === Do.repeat)
            return "Do.repeat";
          if (s === Do.continue)
            return "Do.continue";
          return s.toString();
        })
      ]));
      return {
        type,
        name: name === void 0 ? this.name : name,
        blocks: blockViz,
        current: {
          block,
          position,
          sequence: this.sequence
        }
      };
    }
  };

  // node_modules/@boardzilla/core/entry/player/collection.js
  var PlayerCollection = class extends Array {
    static {
      __name(this, "PlayerCollection");
    }
    constructor() {
      super(...arguments);
      this.currentPosition = [];
    }
    addPlayer(attrs) {
      const player = new this.className(attrs);
      Object.assign(player, attrs, { _players: this });
      this.push(player);
      if (this.game) {
        player.game = this.game;
      }
    }
    /**
     * Returns the player at a given table position.
     */
    atPosition(position) {
      return this.find((p) => p.position === position);
    }
    /**
     * Returns the player that may currently act. It is an error to call current
     * when multiple players can act
     */
    current() {
      if (this.currentPosition.length > 1)
        throw Error(`Using players.current when ${this.currentPosition.length} players may act`);
      return this.atPosition(this.currentPosition[0] ?? -1);
    }
    /**
     * Returns the array of all players that may currently act.
     */
    allCurrent() {
      return this.currentPosition.map((p) => this.atPosition(p));
    }
    /**
     * Returns the host player
     */
    host() {
      return this.find((p) => p.host);
    }
    /**
     * Returns the array of players that may not currently act.
     */
    notCurrent() {
      return this.filter((p) => !this.currentPosition.includes(p.position));
    }
    /**
     * Returns the array of players in the order of table positions. Does not
     * alter the actual player order.
     */
    inPositionOrder() {
      return this.sort((p1, p2) => p1.position > p2.position ? 1 : -1);
    }
    /**
     * Set the current player(s).
     *
     * @param players - The {@link Player} or table position of the player to act,
     * or an array of either.
     */
    setCurrent(players) {
      if (!(players instanceof Array))
        players = [players];
      players = players.map((p) => typeof p === "number" ? p : p.position);
      this.currentPosition = players;
    }
    /**
     * Advance the current player to act to the next player based on player order.
     */
    next() {
      if (this.currentPosition.length === 0) {
        this.currentPosition = [this[0].position];
      } else if (this.currentPosition.length === 1) {
        this.currentPosition = [this.after(this.currentPosition[0]).position];
      }
      return this.current();
    }
    /**
     * Return the next player to act based on player order.
     */
    after(player) {
      return this[(this.turnOrderOf(player) + 1) % this.length];
    }
    /**
     * Return the player next to this player at the table.
     * @param steps - 1 = one step to the left, -1 = one step to the right, etc
     */
    seatedNext(player, steps = 1) {
      return this.atPosition((player.position + steps - 1) % this.length + 1);
    }
    /**
     * Returns the turn order of the given player, starting with 0. This is
     * distinct from {@link Player#position}. Turn order can be altered during a
     * game, whereas table position cannot.
     */
    turnOrderOf(player) {
      if (typeof player !== "number")
        player = player.position;
      const index = this.findIndex((p) => p.position === player);
      if (index === -1)
        throw Error("No such player");
      return index;
    }
    /**
     * Sorts the players by some means, changing the turn order.
     * @param key - A key of function for sorting, or a list of such. See {@link
     * Sorter}
     * @param direction - `"asc"` to cause players to be sorted from lowest to
     * highest, `"desc"` for highest to lower
     */
    sortBy(key, direction) {
      const rank = /* @__PURE__ */ __name((p, k) => typeof k === "function" ? k(p) : p[k], "rank");
      const [up, down] = direction === "desc" ? [-1, 1] : [1, -1];
      return this.sort((a, b) => {
        const keys = key instanceof Array ? key : [key];
        for (const k of keys) {
          const r1 = rank(a, k);
          const r2 = rank(b, k);
          if (r1 > r2)
            return up;
          if (r1 < r2)
            return down;
        }
        return 0;
      });
    }
    /**
     * Returns a copy of this collection sorted by some {@link Sorter}.
     */
    sortedBy(key, direction = "asc") {
      return this.slice(0, this.length).sortBy(key, direction);
    }
    sum(key) {
      return this.reduce((sum, n2) => sum + (typeof key === "function" ? key(n2) : n2[key]), 0);
    }
    withHighest(...attributes) {
      return this.sortedBy(attributes, "desc")[0];
    }
    withLowest(...attributes) {
      return this.sortedBy(attributes, "asc")[0];
    }
    shuffle() {
      shuffleArray(this, this.game?.random || Math.random);
    }
    max(key) {
      return this.sortedBy(key, "desc")[0][key];
    }
    min(key) {
      return this.sortedBy(key, "asc")[0][key];
    }
    fromJSON(players) {
      this.splice(0);
      for (const p of players) {
        this.addPlayer({ position: p.position });
      }
    }
    assignAttributesFromJSON(players) {
      for (let p = 0; p !== players.length; p++) {
        Object.assign(this[p], deserializeObject(players[p], this.game));
      }
    }
  };

  // node_modules/@boardzilla/core/entry/flow/action-step.js
  var ActionStep = class extends Flow {
    static {
      __name(this, "ActionStep");
    }
    constructor({ name, player, players, actions, prompt, description, optional, condition, continueIfImpossible, repeatUntil, skipIf }) {
      super({ name });
      this.type = "action";
      this.actions = actions.map((a) => typeof a === "string" ? { name: a } : a);
      this.prompt = prompt;
      if (repeatUntil) {
        this.repeatUntil = true;
        this.actions.push({ name: "__pass__", prompt: typeof repeatUntil === "function" ? repeatUntil(this.flowStepArgs()) : repeatUntil });
      } else if (optional) {
        this.actions.push({ name: "__pass__", prompt: typeof optional === "function" ? optional(this.flowStepArgs()) : optional });
      }
      this.description = description;
      this.condition = condition;
      this.continueIfImpossible = continueIfImpossible ?? false;
      this.skipIf = skipIf ?? "always";
      this.players = players ?? player;
    }
    reset() {
      this.setPosition(void 0);
    }
    thisStepArgs() {
      if (this.position?.name && this.position?.args) {
        return { [this.position.name]: this.position.args };
      }
    }
    setPosition(position, sequence) {
      super.setPosition(position, sequence);
      if (this.awaitingAction()) {
        const players = this.getPlayers();
        if (players)
          this.gameManager.players.setCurrent(players);
      }
    }
    getPlayers() {
      if (this.players) {
        const players = typeof this.players === "function" ? this.players(this.flowStepArgs()) : this.players;
        return (players instanceof Array ? players : [players]).map((p) => p.position);
      }
    }
    awaitingAction() {
      return !this.position && (!this.condition || this.condition(this.flowStepArgs()));
    }
    currentBlock() {
      if (this.position) {
        const actionName = this.position.name;
        const step = this.actions.find((a) => a.name === actionName)?.do;
        if (step)
          return step;
      }
    }
    // current actions that can process. does not check player
    allowedActions() {
      return this.position ? [] : this.actions.map((a) => a.name);
    }
    actionNeeded(player) {
      if (!this.position) {
        if (!player || player.isCurrent()) {
          return {
            prompt: typeof this.prompt === "function" ? this.prompt(this.flowStepArgs()) : this.prompt,
            description: this.description,
            step: this.name,
            actions: this.actions.map((action) => ({
              name: action.name,
              prompt: typeof action.prompt === "function" ? action.prompt(this.flowStepArgs()) : action.prompt,
              args: typeof action.args === "function" ? action.args(this.flowStepArgs()) : action.args
            })),
            continueIfImpossible: this.continueIfImpossible,
            skipIf: this.skipIf
          };
        }
      }
    }
    // returns error (string) or subflow {args, name} or ok (undefined)
    processMove(move) {
      if ((move.name !== "__continue__" || !this.continueIfImpossible) && !this.allowedActions().includes(move.name)) {
        throw Error(`No action ${move.name} available at this point. Waiting for ${this.allowedActions().join(", ")}`);
      }
      const gameManager = this.gameManager;
      if (!gameManager.players.currentPosition.includes(move.player)) {
        throw Error(`Move ${move.name} from player #${move.player} not allowed. Current players: #${gameManager.players.currentPosition.join("; ")}`);
      }
      const player = gameManager.players.atPosition(move.player);
      if (!player)
        return `No such player position: ${move.player}`;
      if (move.name === "__pass__" || move.name === "__continue__") {
        this.setPosition(move);
        return;
      }
      const gameAction = gameManager.getAction(move.name, player);
      const error = gameAction._process(player, move.args);
      if (error) {
        return error;
      } else {
        this.setPosition(this.position ? { ...this.position } : move);
        if (interruptSignal[0]) {
          const interrupt2 = interruptSignal.splice(0);
          if (interrupt2[0].signal === InterruptControl.subflow)
            return interrupt2.map((s) => s.data);
          const loop = this.currentLoop(interrupt2[0].data);
          if (!loop) {
            if (interrupt2[0].data)
              throw Error(`No loop found "${interrupt2[0].data}" for interrupt`);
            if (interrupt2[0].signal === InterruptControl.continue)
              throw Error("Cannot use Do.continue when not in a loop");
            if (interrupt2[0].signal === InterruptControl.repeat)
              throw Error("Cannot use Do.repeat when not in a loop");
            throw Error("Cannot use Do.break when not in a loop");
          } else {
            loop.interrupt(interrupt2[0].signal);
            return;
          }
        }
      }
    }
    playOneStep() {
      return this.awaitingAction() ? this : super.playOneStep();
    }
    advance() {
      if (!this.repeatUntil || this.position?.name === "__pass__")
        return FlowControl.complete;
      this.reset();
      return FlowControl.ok;
    }
    toJSON(forPlayer = true) {
      if (this.position) {
        const json = {
          player: this.position.player,
          name: this.position.name,
          args: serializeObject(this.position.args, forPlayer)
        };
        return json;
      }
      return void 0;
    }
    fromJSON(position) {
      if (!position)
        return void 0;
      return !("player" in position) ? position : {
        ...position,
        args: deserializeObject(position.args ?? {}, this.gameManager.game)
      };
    }
    allSteps() {
      return this.actions.map((a) => a.do).reduce((a, f) => f ? a.concat(f) : a, []);
    }
    toString() {
      return `player-action${this.name ? ":" + this.name : ""} (player #${this.top.gameManager.players.currentPosition}: ${this.allowedActions().join(", ")}${this.block instanceof Array ? " item #" + this.sequence : ""})`;
    }
    visualize(top) {
      const args = this.position && "{" + Object.entries(this.position.args).map(([k, v]) => `${k}: ${v}`).join(", ") + "}";
      return this.visualizeBlocks({
        type: "playerActions",
        name: this.position?.name ?? "",
        top,
        blocks: Object.fromEntries(this.actions.filter((a) => a.name !== "__pass__").map((a) => [a.name, a.do ? a.do instanceof Array ? a.do : [a.do] : void 0])),
        block: this.position?.name,
        position: args ?? top.gameManager.players.allCurrent().map((p) => p.name).join(", ")
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/while-loop.js
  var WhileLoop = class extends Flow {
    static {
      __name(this, "WhileLoop");
    }
    constructor({ do: block, while: whileCondition }) {
      super({ do: block });
      this.type = "loop";
      this.whileCondition = () => whileCondition(this.flowStepArgs());
    }
    reset() {
      const position = { index: 0 };
      if (this.initial !== void 0)
        position.value = this.initial instanceof Function ? this.initial(this.flowStepArgs()) : this.initial;
      if (!this.whileCondition(position)) {
        this.setPosition({ ...position, index: -1 });
      } else {
        this.setPosition(position);
      }
    }
    currentBlock() {
      if (this.position.index !== -1)
        return this.block;
    }
    advance() {
      if (this.position.index > 1e4)
        throw Error(`Endless loop detected: ${this.name}`);
      if (this.position.index === -1) {
        return this.exit();
      }
      const position = { ...this.position, index: this.position.index + 1 };
      if (this.next && this.position.value !== void 0)
        position.value = this.next(this.position.value);
      if (!this.whileCondition(position))
        return this.exit();
      this.setPosition(position);
      return FlowControl.ok;
    }
    repeat() {
      if (!this.whileCondition(this.position))
        return this.exit();
      this.setPosition(this.position);
      return FlowControl.ok;
    }
    exit() {
      this.setPosition({ ...this.position, index: -1 });
      return FlowControl.complete;
    }
    interrupt(signal) {
      if (signal === InterruptControl.continue)
        return this.advance();
      if (signal === InterruptControl.repeat)
        return this.repeat();
      if (signal === InterruptControl.break)
        return this.exit();
    }
    allSteps() {
      return this.block;
    }
    toString() {
      return `loop${this.name ? ":" + this.name : ""} (loop ${this.position.index === -1 ? "complete" : "#" + this.position.index}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      const isLoop = this.whileCondition.toString() === "() => true";
      return this.visualizeBlocks({
        type: isLoop ? "loop" : "whileLoop",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position ? this.position.index + 1 : void 0
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/for-loop.js
  var ForLoop = class extends WhileLoop {
    static {
      __name(this, "ForLoop");
    }
    constructor({ name, initial, next, do: block, while: whileCondition }) {
      super({ do: block, while: () => true });
      this.type = "loop";
      this.name = name;
      this.initial = initial;
      this.next = next;
      this.whileCondition = (position) => whileCondition(position.value);
    }
    currentBlock() {
      if (this.position.index !== -1)
        return this.block;
    }
    toString() {
      return `loop${this.name ? ":" + this.name : ""} (index: ${this.position.index}, value: ${this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})$`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "forLoop",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/for-each.js
  var ForEach = class extends ForLoop {
    static {
      __name(this, "ForEach");
    }
    constructor({ name, collection, do: block }) {
      super({
        name,
        initial: () => (typeof collection === "function" ? collection(this.flowStepArgs()) : collection)[0],
        next: () => this.position.collection[this.position.index + 1],
        while: () => true,
        do: block
      });
      this.type = "foreach";
      this.collection = collection;
      this.whileCondition = (position) => position.index >= 0 && position.index < position.collection.length;
    }
    reset() {
      const collection = typeof this.collection === "function" ? this.collection(this.flowStepArgs()) : this.collection;
      this.setPosition({ index: collection.length ? 0 : -1, value: collection[0], collection });
    }
    toJSON(forPlayer = true) {
      return {
        index: this.position.index,
        value: serialize(this.position.value, forPlayer),
        collection: serialize(this.position.collection, forPlayer)
      };
    }
    fromJSON(position) {
      return {
        index: position.index,
        value: deserialize(position.value, this.gameManager.game),
        collection: deserialize(position.collection, this.gameManager.game)
      };
    }
    toString() {
      return `foreach${this.name ? ":" + this.name : ""} (index: ${this.position.index}, value: ${this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "forEach",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/each-player.js
  var EachPlayer = class extends ForLoop {
    static {
      __name(this, "EachPlayer");
    }
    constructor({ name, startingPlayer, nextPlayer, turns, continueUntil, do: block }) {
      let initial;
      if (startingPlayer) {
        initial = /* @__PURE__ */ __name(() => startingPlayer instanceof Function ? startingPlayer(this.flowStepArgs()) : startingPlayer, "initial");
      } else {
        initial = /* @__PURE__ */ __name(() => this.gameManager.players[0], "initial");
      }
      let next = /* @__PURE__ */ __name((player) => nextPlayer ? nextPlayer(player) : this.gameManager.players.after(player), "next");
      super({
        name,
        initial,
        next,
        while: () => true,
        do: block
      });
      this.whileCondition = (position) => continueUntil !== void 0 ? !continueUntil(position.value) : position.index < this.gameManager.players.length * (this.turns || 1);
      this.turns = turns;
    }
    setPosition(position, sequence, reset = true) {
      if (position.value && position.value.position !== this.position?.value.position) {
        this.gameManager.players.setCurrent(position.value);
      }
      super.setPosition(position, sequence, reset);
    }
    toJSON() {
      return {
        index: this.position.index,
        value: this.position.value ? serializeSingleArg(this.position.value) : void 0
      };
    }
    fromJSON(position) {
      return {
        index: position.index,
        value: position.value ? deserializeSingleArg(position.value, this.gameManager.game) : void 0
      };
    }
    allSteps() {
      return this.block;
    }
    toString() {
      return `each-player${this.name ? ":" + this.name : ""} (player #${this.position?.value?.position}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "eachPlayer",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/switch-case.js
  var SwitchCase = class extends Flow {
    static {
      __name(this, "SwitchCase");
    }
    constructor({ name, switch: switchExpr, cases, default: def }) {
      super({ name });
      this.type = "switch-case";
      this.switch = switchExpr;
      this.cases = cases;
      this.default = def;
    }
    reset() {
      const test = typeof this.switch === "function" ? this.switch(this.flowStepArgs()) : this.switch;
      let position = { index: -1, value: test };
      for (let c = 0; c != this.cases.length; c += 1) {
        const ca = this.cases[c];
        if ("test" in ca && ca.test(test) || "eq" in ca && ca.eq === test) {
          position.index = c;
          break;
        }
      }
      if (position.index === -1 && this.default)
        position.default = true;
      this.setPosition(position);
    }
    currentBlock() {
      if (this.position.default)
        return this.default;
      if (this.position.index !== void 0 && this.position.index >= 0) {
        return this.cases[this.position.index].do;
      }
    }
    toJSON(forPlayer = true) {
      return {
        index: this.position.index,
        value: serialize(this.position.value, forPlayer),
        default: !!this.position.default
      };
    }
    fromJSON(position) {
      return {
        index: position.index,
        value: deserialize(position.value, this.gameManager.game),
        default: position.default
      };
    }
    allSteps() {
      const cases = this.cases.reduce((a, f) => a.concat(f.do ? f.do instanceof Array ? f.do : [f.do] : []), []);
      const defaultExpr = this.default ? this.default instanceof Array ? this.default : [this.default] : [];
      return cases.concat(defaultExpr);
    }
    toString() {
      return `switch-case${this.name ? ":" + this.name : ""} (${this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      let block = void 0;
      if (this.position.default) {
        block = "default";
      } else if (this.position.index !== void 0 && this.position.index >= 0) {
        const c = this.cases[this.position.index];
        block = String("eq" in c ? c.eq : c.test);
      }
      return this.visualizeBlocks({
        type: "switchCase",
        top,
        blocks: Object.fromEntries(this.cases.map((c) => [String("eq" in c ? c.eq : c.test), c.do instanceof Array ? c.do : [c.do]]).concat([
          this.default ? ["default", this.default instanceof Array ? this.default : [this.default]] : []
        ])),
        block,
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/if-else.js
  var If = class extends SwitchCase {
    static {
      __name(this, "If");
    }
    constructor({ name, if: test, do: doExpr, else: elseExpr }) {
      super({ name, switch: test, cases: [{ eq: true, do: doExpr }], default: elseExpr });
    }
    toString() {
      return `if-else${this.name ? ":" + this.name : ""} (${!!this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      const blocks = {
        do: this.cases[0].do instanceof Array ? this.cases[0].do : [this.cases[0].do]
      };
      if (this.default)
        blocks.else = this.default instanceof Array ? this.default : [this.default];
      return this.visualizeBlocks({
        type: "ifElse",
        top,
        blocks,
        block: this.position ? this.position.default ? "else" : "do" : void 0,
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/every-player.js
  var EveryPlayer = class extends Flow {
    static {
      __name(this, "EveryPlayer");
    }
    constructor({ players, do: block, name }) {
      super({ do: block, name });
      this.completed = [];
      this.type = "parallel";
      this.players = players;
    }
    reset() {
      this.value = -1;
      this.completed = [];
      this.setPosition({ positions: [], sequences: [], completed: [] });
    }
    thisStepArgs() {
      if (this.name) {
        const currentPlayer = this.getPlayers()[this.value];
        if (currentPlayer)
          return { [this.name]: currentPlayer };
      }
    }
    // closure wrapper for super's methods that will setPosition temporarily to a
    // specific player and pretend to be a normal flow with just one subflow
    withPlayer(value, fn, mutate = false) {
      this.value = value;
      this.sequence = this.position.sequences[this.value];
      this.setPosition(this.position, this.sequence);
      const result = fn();
      if (mutate) {
        const currentPlayer = this.getPlayers()[this.value];
        this.position.sequences[this.value] = this.sequence;
        if (currentPlayer && this.step instanceof Flow)
          this.position.positions[this.value] = this.step.branchJSON();
      }
      this.value = -1;
      this.setPosition(this.position);
      return result;
    }
    getPlayers() {
      return this.players || this.gameManager.players;
    }
    // reimpl ourselves to collect json from all players
    branchJSON(forPlayer = true) {
      if (this.position === void 0 && this.sequence === void 0)
        return [];
      let branch = {
        type: this.type,
        position: { positions: [], sequences: this.position.sequences, completed: this.completed }
      };
      if (this.name)
        branch.name = this.name;
      for (let i = 0; i !== this.getPlayers().length; i++) {
        this.withPlayer(i, () => {
          if (this.step instanceof Flow)
            branch.position.positions[i] = this.step.branchJSON(forPlayer);
        });
      }
      return [branch];
    }
    // add player management, hydration of flow for the correct player, sequences[] management
    setPosition(positionJSON, sequence) {
      const player = this.getPlayers()[this.value];
      this.completed = positionJSON.completed;
      if (player) {
        player.setCurrent();
        positionJSON.sequences[this.value] = sequence;
      } else {
        const players = [];
        for (let i = 0; i !== this.getPlayers().length; i++) {
          if (this.completed[i] === false)
            players.push(this.getPlayers()[i]);
        }
        this.gameManager.players.setCurrent(players);
      }
      super.setPosition(positionJSON, positionJSON.sequences[this.value]);
      if (this.step instanceof Flow && this.position.positions[this.value]) {
        this.step.setBranchFromJSON(this.position.positions[this.value]);
      }
    }
    currentBlock() {
      return this.value >= 0 && this.value < this.getPlayers().length ? this.block : void 0;
    }
    actionNeeded(player) {
      if (player && this.getPlayers().includes(player)) {
        return this.withPlayer(this.getPlayers().indexOf(player), () => super.actionNeeded(player));
      }
    }
    processMove(move) {
      const player = this.getPlayers().findIndex((p) => p.position === move.player);
      if (player < 0)
        throw Error(`Cannot process action from ${move.player}`);
      return this.withPlayer(player, () => {
        this.completed[player] = void 0;
        return super.processMove(move);
      }, true);
    }
    // intercept super.playOneStep so a single branch doesn't signal complete
    // without us checking all branches
    playOneStep() {
      const player = this.getPlayers().findIndex((_, p) => this.completed[p] === void 0);
      if (player !== -1) {
        return this.withPlayer(player, () => {
          let result = super.playOneStep();
          if (result instanceof Flow || result === FlowControl.complete)
            this.completed[player] = result === FlowControl.complete;
          return FlowControl.ok;
        }, true);
      }
      return this.completed.every((r) => r) ? FlowControl.complete : this;
    }
    toString() {
      return `every-player${this.name ? ":" + this.name : ""}`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "everyPlayer",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do"
      });
    }
  };

  // node_modules/@boardzilla/core/entry/board/game.js
  var Game = class _Game extends space_default {
    static {
      __name(this, "Game");
    }
    constructor(ctx) {
      super({ ...ctx, trackMovement: false });
      this.players = new PlayerCollection();
      this.flowGuard = (name) => {
        if (this._ctx.gameManager.phase !== "new") {
          throw Error(`Cannot use "${name}" once game has started. It is likely that this function is in the wrong place and must be called directly in defineFlow as a FlowDefinition`);
        }
        return true;
      };
      this.flowCommands = {
        playerActions: (options) => this.flowGuard("playerActions") && new ActionStep(options),
        loop: (...block) => this.flowGuard("loop") && new WhileLoop({ do: block, while: () => true }),
        whileLoop: (options) => this.flowGuard("whileloop") && new WhileLoop(options),
        forEach: (options) => this.flowGuard("forEach") && new ForEach(options),
        forLoop: (options) => this.flowGuard("forloop") && new ForLoop(options),
        eachPlayer: (options) => this.flowGuard("eachPlayer") && new EachPlayer(options),
        everyPlayer: (options) => this.flowGuard("everyplayer") && new EveryPlayer(options),
        ifElse: (options) => this.flowGuard("ifelse") && new If(options),
        switchCase: (options) => this.flowGuard("switchCase") && new SwitchCase(options)
      };
      this._ui = {
        layouts: [],
        appearance: {},
        stepLayouts: {},
        announcements: {},
        infoModals: [],
        getBaseLayout: () => ({
          alignment: "center",
          direction: "square"
        })
      };
      this.game = this;
      this.random = ctx.gameManager?.random || Math.random;
      if (ctx.gameManager)
        this.players = ctx.gameManager.players;
      this._ctx.removed = this.createElement(space_default, "removed"), this.pile = this._ctx.removed;
    }
    // no longer needed - remove in next minor release
    registerClasses(...classList) {
      this._ctx.classRegistry = this._ctx.classRegistry.concat(classList);
    }
    /**
     * Define your game's main flow. May contain any of the following:
     * - {@link playerActions}
     * - {@link loop}
     * - {@link whileLoop}
     * - {@link forEach}
     * - {@link forLoop}
     * - {@link eachPlayer}
     * - {@link everyPlayer}
     * - {@link ifElse}
     * - {@link switchCase}
     * @category Definition
     */
    defineFlow(...flow) {
      this.defineSubflow("__main__", ...flow);
    }
    /**
     * Define an addtional flow that the main flow can enter. A subflow has a
     * unique name and can be entered at any point by calling {@link
     * Do|Do.subflow}.
     *
     * @param name - Unique name of flow
     * @param flow - Steps of the flow
     */
    defineSubflow(name, ...flow) {
      if (this._ctx.gameManager.phase !== "new")
        throw Error("cannot call defineFlow once started");
      this._ctx.gameManager.flows[name] = new Flow({ name, do: flow });
      this._ctx.gameManager.flows[name].gameManager = this._ctx.gameManager;
    }
    /**
     * Define your game's actions.
     * @param actions - An object consisting of actions where the key is the name
     * of the action and value is a function that accepts a player taking the
     * action and returns the result of calling {@link action} and chaining
     * choices, results and messages onto the result
     * @category Definition
     */
    defineActions(actions) {
      if (this._ctx.gameManager.phase !== "new")
        throw Error("cannot call defineActions once started");
      this._ctx.gameManager.actions = actions;
    }
    /**
     * Retrieve the selected setting value for a setting defined in {@link
     * render}.
     * @category Definition
     */
    setting(key) {
      return this._ctx.gameManager.settings[key];
    }
    /**
     * Create an {@link Action}. An action is a single move that a player can
     * take. Some actions require choices, sometimes several, before they can be
     * executed. Some don't have any choices, like if a player can simply
     * 'pass'. What defines where one action ends and another begins is how much
     * you as a player can decide before you "commit". For example, in chess you
     * select a piece to move and then a place to put it. These are a single move,
     * not separate. (Unless playing touch-move, which is rarely done in digital
     * chess.) In hearts, you pass 3 cards to another players. These are a single
     * move, not 3. You can change your mind as you select the cards, rather than
     * have to commit to each one. Similarly, other players do not see any
     * information about your choices until you actually commit the entire move.
     *
     * This function is called for each action in the game `actions` you define in
     * {@link defineActions}. These actions are initially declared with an optional
     * prompt and condition. Further information is added to the action by chaining
     * methods that add choices and behaviour. See {@link Action}.
     *
     * If this action accepts prior arguments besides the ones chosen by the
     * player during the execution of this action (especially common for {@link
     * followUp} actions) then a generic can be added for these arguments to help
     * Typescript type these parameters, e.g.:
     * `player => action<{ cards: number}>(...)`
     *
     * @param definition.prompt - The prompt that will appear for the player to
     * explain what the action does. Further prompts can be defined for each choice
     * they subsequently make to complete the action.
     *
     * @param definition.condition - A boolean or a function returning a boolean
     * that determines whether the action is currently allowed. Note that the
     * choices you define for your action will further determine if the action is
     * allowed. E.g. if you have a play card action and you add a choice for cards
     * in your hand, Boardzilla will automatically disallow this action if there
     * are no cards in your hand based on the face that there are no valid choices
     * to complete the action. You do not need to specify a `condition` for these
     * types of limitations. If using the function form, the function will receive
     * an object with any arguments passed to this action, e.g. from {@link
     * followUp}.
     *
     * @example
     * action({
     *   prompt: 'Flip one of your cards'
     * }).chooseOnBoard({
     *   choices: game.all(Card, {mine: true})
     * }).do(
     *   card => card.hideFromAll()
     * )
     *
     * @category Definition
     */
    action(definition = {}) {
      return new Action(definition);
    }
    /**
     * Queue up a follow-up action while processing an action. If called during
     * the processing of a game action, the follow-up action given will be added
     * as a new action immediately following the current one, before the game's
     * flow can resume normally. This is common for card games where the play of a
     * certain card may require more actions be taken.
     *
     * @param {Object} action - The action added to the follow-up queue.
     *
     * @example
     * defineAction({
     *   ...
     *   playCard: player => action()
     *     .chooseOnBoard('card', cards)
     *     .do(
     *       ({ card }) => {
     *         if (card.damage) {
     *           // this card allows another action to do damage to another Card
     *           game.followUp({
     *             name: 'doDamage',
     *             args: { amount: card.damage }
     *           });
     *         }
     *       }
     *     )
     * @category Game Management
     */
    followUp(action) {
      Do.subflow("__followup__", action);
    }
    /**
     * End the game
     *
     * @param winner - a player or players that are the winners of the game. In a
     * solo game if no winner is provided, this is considered a loss.
     * @param announcement - an optional announcement from {@link render} to
     * replace the standard boardzilla announcement.
     * @category Game Management
     */
    finish(winner, announcement) {
      this._ctx.gameManager.phase = "finished";
      if (winner)
        this._ctx.gameManager.winner = winner instanceof Array ? winner : [winner];
      this._ctx.gameManager.announcements.push(announcement ?? "__finish__");
    }
    /**
     * Return array of game winners, or undefined if game is not yet finished
     * @category Game Management
     */
    getWinners() {
      let winner = this._ctx.gameManager.winner;
      if (!(winner instanceof Array))
        winner = [winner];
      return this._ctx.gameManager.phase === "finished" ? winner : void 0;
    }
    /**
     * Add a delay in the animation of the state change at this point for player
     * as they receive game updates.
     * @category Game Management
     */
    addDelay() {
      this.resetMovementTracking();
      if (this.game._ctx.trackMovement) {
        this._ctx.gameManager.sequence += 1;
      } else if (this._ctx.gameManager.intermediateUpdates.length) {
        return;
      }
      this._ctx.gameManager.intermediateUpdates.push(this.players.map(
        (p) => this._ctx.gameManager.getState(p)
        // TODO unnecessary for all players if in context of player
      ));
    }
    /**
     * Add a message that will be broadcast in the chat at the next game update,
     * based on the current state of the game.
     *
     * @param text - The text of the message to send. This can contain interpolated strings
     * with double braces, i.e. {{player}} that are defined in args. Of course,
     * strings can be interpolated normally using template literals. However game
     * objects (e.g. players or pieces) passed in as args will be displayed
     * specially by Boardzilla.
     *
     * @param args - An object of key-value pairs of strings for interpolation in
     * the message.
     *
     * @example
     * game.message(
     *   '{{player}} has a score of {{score}}',
     *   { player, score: player.score() }
     * );
     *
     * @category Game Management
     */
    message(text, args) {
      this._ctx.gameManager.messages.push({ body: n(text, args, true) });
    }
    /**
     * Add a message that will be broadcast to the given player(s) in the chat at
     * the next game update, based on the current state of the game.
     *
     * @param player - Player or players to receive the message
     *
     * @param text - The text of the message to send. This can contain interpolated strings
     * with double braces, i.e. {{player}} that are defined in args. Of course,
     * strings can be interpolated normally using template literals. However game
     * objects (e.g. players or pieces) passed in as args will be displayed
     * specially by Boardzilla.
     *
     * @param args - An object of key-value pairs of strings for interpolation in
     * the message.
     *
     * @example
     * game.message(
     *   '{{player}} has a score of {{score}}',
     *   { player, score: player.score() }
     * );
     *
     * @category Game Management
     */
    messageTo(player, text, args) {
      if (!(player instanceof Array))
        player = [player];
      for (const p of player) {
        this._ctx.gameManager.messages.push({
          body: n(text, args, true),
          position: typeof p === "number" ? p : p.position
        });
      }
    }
    /**
     * Broadcast a message to all players that interrupts the game and requires
     * dismissal before actions can be taken.
     *
     * @param announcement - The modal name to announce, as provided in {@link render}.
     *
     * @example
     * game.message(
     *   '{{player}} has a score of {{score}}',
     *   { player, score: player.score() }
     * );
     *
     * @category Game Management
     */
    announce(announcement) {
      this._ctx.gameManager.announcements.push(announcement);
      this.addDelay();
      this._ctx.gameManager.announcements = [];
    }
    // also gets removed elements
    allJSON(seenBy) {
      return [this.toJSON(seenBy)].concat(this._ctx.removed._t.children.map((el) => el.toJSON(seenBy)));
    }
    // hydrate from json, and assign all attrs. requires that players be hydrated first
    fromJSON(boardJSON) {
      let { className, children, _id, order, ...rest } = boardJSON[0];
      if (this.constructor.name !== className)
        throw Error(`Cannot create board from JSON. ${className} must equal ${this.constructor.name}`);
      for (const key of Object.keys(this)) {
        if (!_Game.unserializableAttributes.includes(key) && !(key in rest))
          rest[key] = void 0;
      }
      this.createChildrenFromJSON(children || [], "0");
      this._ctx.removed.createChildrenFromJSON(boardJSON.slice(1), "1");
      if (order)
        this._t.order = order;
      if (this._ctx.gameManager)
        rest = deserializeObject({ ...rest }, this);
      Object.assign(this, { ...rest });
      this.assignAttributesFromJSON(children || [], "0");
      this._ctx.removed.assignAttributesFromJSON(boardJSON.slice(1), "1");
    }
    // restore default layout rules before running setupLayout
    resetUI() {
      super.resetUI();
      this._ui.stepLayouts = {};
    }
    setBoardSize(boardSize) {
      if (boardSize.name !== this._ui.boardSize?.name || boardSize.aspectRatio !== this._ui.boardSize?.aspectRatio) {
        this._ui.boardSize = boardSize;
      }
    }
    getBoardSize(screenX, screenY, mobile) {
      return this._ui.boardSizes?.(screenX, screenY, mobile) ?? {
        name: "_default",
        aspectRatio: 1,
        frame: { x: 100, y: 100 },
        screen: { x: 100, y: 100 }
      };
    }
    /**
     * Apply default layout rules for all the placement of all player prompts and
     * choices, in relation to the playing area
     *
     * @param attributes - see {@link ActionLayout}
     *
     * @category UI
     */
    layoutControls(attributes) {
      this._ui.stepLayouts["*"] = attributes;
    }
    /**
     * Apply layout rules to a particular step in the flow, controlling where
     * player prompts and choices appear in relation to the playing area
     *
     * @param step - the name of the step as defined in {@link playerActions}
     * @param attributes - see {@link ActionLayout}
     *
     * @category UI
     */
    layoutStep(step, attributes) {
      if (!this._ctx.gameManager.getFlowStep(step))
        throw Error(`No such step: ${step}`);
      this._ui.stepLayouts["step:" + step] = attributes;
    }
    /**
     * Apply layout rules to a particular action, controlling where player prompts
     * and choices appear in relation to the playing area
     *
     * @param action - the name of the action as defined in {@link game#defineActions}
     * @param attributes - see {@link ActionLayout}
     *
     * @category UI
     */
    layoutAction(action, attributes) {
      this._ui.stepLayouts["action:" + action] = attributes;
    }
    /**
     * Remove all built-in default appearance. If any elements have not been given a
     * custom appearance, this causes them to be hidden.
     *
     * @category UI
     */
    disableDefaultAppearance() {
      this._ui.disabledDefaultAppearance = true;
    }
    /**
     * Show bounding boxes around every layout
     *
     * @category UI
     */
    showLayoutBoundingBoxes() {
      this._ui.boundingBoxes = true;
    }
  };
  Game.unserializableAttributes = [...space_default.unserializableAttributes, "pile", "flowCommands", "flowGuard", "players", "random"];
  var game_default = Game;

  // node_modules/@boardzilla/core/entry/interface.js
  var import_random_seed = __toESM(require_random_seed(), 1);
  var colors = [
    "#d50000",
    "#00695c",
    "#304ffe",
    "#ff6f00",
    "#7c4dff",
    "#ffa825",
    "#f2d330",
    "#43a047",
    "#004d40",
    "#795a4f",
    "#00838f",
    "#408074",
    "#448aff",
    "#1a237e",
    "#ff4081",
    "#bf360c",
    "#4a148c",
    "#aa00ff",
    "#455a64",
    "#600020"
  ];
  function advanceRseed(rseed) {
    if (!rseed) {
      rseed = String(Math.random());
    } else {
      rseed = String(import_random_seed.default.create(rseed).random());
    }
    return rseed;
  }
  __name(advanceRseed, "advanceRseed");
  var createInterface = /* @__PURE__ */ __name((setup) => {
    return {
      initialState: (state) => {
        let rseed = state.randomSeed;
        if (!rseed) {
          if (globalThis.window?.sessionStorage) {
            let fixedRseed = sessionStorage.getItem("rseed");
            if (!fixedRseed) {
              fixedRseed = String(Math.random());
              sessionStorage.setItem("rseed", fixedRseed);
            }
            rseed = fixedRseed;
          }
          if (!rseed)
            rseed = advanceRseed();
        }
        const gameManager = setup(state, { rseed, trackMovement: true });
        if (globalThis.window)
          window.serverGameManager = gameManager;
        if (gameManager.phase !== "finished")
          gameManager.play();
        return gameManager.getUpdate();
      },
      processMove: (previousState, move) => {
        const rseed = advanceRseed(previousState.state.rseed);
        previousState.state.rseed = rseed;
        const gameManager = setup(previousState.state, { rseed, trackMovement: true });
        const player = gameManager.players.atPosition(move.position);
        gameManager.messages = [];
        gameManager.announcements = [];
        if (!(move.data instanceof Array))
          move.data = [move.data];
        let error = void 0;
        for (let i = 0; i !== move.data.length; i++) {
          error = gameManager.processMove({
            player,
            name: move.data[i].name,
            args: Object.fromEntries(Object.entries(move.data[i].args).map(([k, v]) => [k, deserializeArg(v, gameManager.game)]))
          });
          if (error) {
            throw Error(`Unable to process move: ${error}`);
          }
          if (gameManager.phase === "finished")
            break;
          gameManager.play();
        }
        return gameManager.getUpdate();
      },
      seatPlayer: (players, seatCount) => {
        let usedPositions = range(1, seatCount);
        let usedColors = [...colors];
        for (const player of players) {
          usedPositions = usedPositions.filter((position) => position !== player.position);
          usedColors = usedColors.filter((color) => color !== player.color);
        }
        if (usedPositions.length) {
          return {
            position: usedPositions[0],
            color: usedColors[0],
            settings: {}
          };
        }
        return null;
      },
      reprocessHistory(state, moves) {
        let rseed = state.randomSeed;
        const gameManager = setup(state, { rseed, trackMovement: false });
        if (gameManager.phase !== "finished")
          gameManager.play();
        const initialState = gameManager.getUpdate();
        let error = void 0;
        const updates = [];
        for (const move of moves) {
          rseed = advanceRseed(rseed);
          gameManager.setRandomSeed(rseed);
          gameManager.messages = [];
          gameManager.announcements = [];
          gameManager.intermediateUpdates = [];
          const player = gameManager.players.atPosition(move.position);
          if (!(move.data instanceof Array))
            move.data = [move.data];
          for (let i = 0; i !== move.data.length; i++) {
            try {
              error = gameManager.processMove({
                player,
                name: move.data[i].name,
                args: Object.fromEntries(Object.entries(move.data[i].args).map(([k, v]) => [k, deserializeArg(v, gameManager.game)]))
              });
            } catch (e) {
              error = e.message;
            }
            if (error || gameManager.phase === "finished")
              break;
            gameManager.play();
          }
          if (error)
            break;
          updates.push(gameManager.getUpdate());
          if (gameManager.phase === "finished")
            break;
        }
        return {
          initialState,
          updates,
          error
        };
      }
    };
  }, "createInterface");

  // node_modules/@boardzilla/core/entry/game-manager.js
  var import_random_seed2 = __toESM(require_random_seed(), 1);
  var GameManager = class {
    static {
      __name(this, "GameManager");
    }
    constructor(playerClass, gameClass, elementClasses = []) {
      this.flows = {};
      this.flowState = [];
      this.players = new PlayerCollection();
      this.sequence = 0;
      this.phase = "new";
      this.messages = [];
      this.announcements = [];
      this.intermediateUpdates = [];
      this.godMode = false;
      this.winner = [];
      this.players = new PlayerCollection();
      this.players.className = playerClass;
      this.game = new gameClass({ gameManager: this, classRegistry: [element_default, space_default, Piece, ...elementClasses] });
      this.players.game = this.game;
    }
    /**
     * configuration functions
     */
    setSettings(settings) {
      this.settings = settings;
    }
    setRandomSeed(rseed) {
      this.rseed = rseed;
      this.random = import_random_seed2.default.create(rseed).random;
      if (this.game.random)
        this.game.random = this.random;
    }
    /**
     * flow functions
     * @internal
     */
    // start the game fresh
    start() {
      if (this.phase === "started")
        throw Error("cannot call start once started");
      if (!this.players.length) {
        throw Error("No players");
      }
      this.phase = "started";
      this.players.currentPosition = [...this.players].map((p) => p.position);
      this.flowState = [{ stack: [], currentPosition: this.players.currentPosition }];
      this.startFlow();
    }
    play() {
      if (this.phase === "finished")
        return;
      if (this.phase !== "started")
        throw Error("cannot call play until started");
      const result = this.flow().play();
      if (result instanceof Flow) {
        if ("continueIfImpossible" in result && result.continueIfImpossible) {
          const possible = this.players.allCurrent().some((player) => this.getPendingMoves(player) !== void 0);
          if (!possible) {
            console.debug(`Continuing past playerActions "${result.name}" with no possible moves`);
            this.flow().processMove({ player: this.players.currentPosition[0], name: "__continue__", args: {} });
            this.play();
          }
        }
      } else if (result) {
        for (const flow of result.reverse())
          this.beginSubflow(flow);
        this.play();
      } else {
        if (this.flowState.length > 1) {
          console.debug(`Completed "${this.flowState[0].name}" flow. Returning to "${this.flowState[1].name ?? "main"}" flow`);
          this.flowState.shift();
          this.startFlow();
          this.play();
        } else {
          this.game.finish();
        }
      }
    }
    flow() {
      return this.flows[this.flowState[0].name ?? "__main__"];
    }
    getFlowStep(name) {
      for (const flow of Object.values(this.flows)) {
        const step = flow.getStep(name);
        if (step)
          return step;
      }
    }
    beginSubflow(flow) {
      if (flow.name !== "__followup__" && flow.name !== "__main__" && !this.flows[flow.name])
        throw Error(`No flow named "${flow.name}"`);
      console.debug(`Proceeding to "${flow.name}" flow${flow.args ? ` with { ${Object.entries(flow.args).map(([k, v]) => `${k}: ${v}`).join(", ")} }` : ""}`);
      this.flowState[0].stack = this.flow().branchJSON();
      this.flowState[0].currentPosition = this.players.currentPosition;
      this.flowState.unshift({
        name: flow.name,
        args: serialize(flow.args),
        currentPosition: this.players.currentPosition,
        stack: []
      });
      this.startFlow();
    }
    setFlowFromJSON(json) {
      this.flowState = json;
      this.phase = "started";
      this.startFlow();
    }
    startFlow(json) {
      const { name, args, stack, currentPosition } = json ?? this.flowState[0];
      let flow;
      const deserializedArgs = deserialize(args, this.game);
      if (name === "__followup__") {
        const actions = deserializedArgs;
        flow = new ActionStep({ name: "__followup__", player: actions.player, actions: [actions] });
        flow.gameManager = this;
        this.flows.__followup__ = flow;
      } else {
        flow = this.flows[name ?? "__main__"];
      }
      this.players.currentPosition = currentPosition;
      if (stack.length) {
        flow.setBranchFromJSON(stack);
      } else {
        flow.reset();
      }
      if (args)
        flow.args = deserializedArgs;
    }
    flowJSON(player = false) {
      const currentFlow = this.flows[this.flowState[0].name ?? "__main__"];
      const currentState = {
        stack: currentFlow.branchJSON(!!player),
        currentPosition: this.players.currentPosition
      };
      if (this.flowState[0].name)
        currentState.name = this.flowState[0].name;
      if (currentFlow.args)
        currentState.args = serialize(currentFlow.args);
      return [currentState, ...this.flowState.slice(1)];
    }
    /**
     * state functions
     * @internal
     */
    getState(player) {
      return {
        players: this.players.map((p) => p.toJSON()),
        settings: this.settings,
        position: this.flowJSON(!!player),
        board: this.game.allJSON(player?.position),
        sequence: this.sequence,
        messages: this.messages.filter((m) => player && (!m.position || m.position === player?.position)),
        announcements: [...this.announcements],
        rseed: player ? "" : this.rseed
      };
    }
    getPlayerStates() {
      return this.players.map((p, i) => ({
        position: p.position,
        state: this.intermediateUpdates.length ? this.intermediateUpdates.map((state) => state[i]).concat([this.getState(p)]) : this.getState(p)
      }));
    }
    getUpdate() {
      this.sequence += 1;
      if (this.phase === "started") {
        return {
          game: {
            state: this.getState(),
            currentPlayers: this.players.currentPosition,
            phase: this.phase
          },
          players: this.getPlayerStates(),
          messages: this.messages
        };
      }
      if (this.phase === "finished") {
        return {
          game: {
            state: this.getState(),
            winners: this.winner.map((p) => p.position),
            phase: this.phase
          },
          players: this.getPlayerStates(),
          messages: this.messages
        };
      }
      throw Error("unable to initialize game");
    }
    contextualizeBoardToPlayer(player) {
      const prev = this.game._ctx.player;
      this.game._ctx.player = player;
      return prev;
    }
    inContextOfPlayer(player, fn) {
      const prev = this.contextualizeBoardToPlayer(player);
      const results = fn();
      this.contextualizeBoardToPlayer(prev);
      return results;
    }
    trackMovement(track = true) {
      if (this.game._ctx.trackMovement !== track) {
        this.game._ctx.trackMovement = track;
        if (track)
          this.intermediateUpdates = [];
      }
    }
    /**
     * action functions
     */
    getAction(name, player) {
      if (this.godMode) {
        const godModeAction = this.godModeActions()[name];
        if (godModeAction) {
          godModeAction.name = name;
          return godModeAction;
        }
      }
      if (!this.actions[name]) {
        throw Error(`No action found: "${name}". All actions must be specified in defineActions()`);
      }
      return this.inContextOfPlayer(player, () => {
        const action = this.actions[name](player);
        action.gameManager = this;
        action.name = name;
        return action;
      });
    }
    godModeActions() {
      if (this.phase !== "started")
        throw Error("cannot call god mode actions until started");
      return {
        _godMove: this.game.action({
          prompt: "Move"
        }).chooseOnBoard("piece", this.game.all(Piece)).chooseOnBoard("into", this.game.all(element_default)).move("piece", "into"),
        _godEdit: this.game.action({
          prompt: "Change"
        }).chooseOnBoard("element", this.game.all(element_default)).chooseFrom("property", ({ element }) => Object.keys(element).filter((a) => !element_default.unserializableAttributes.concat(["_visible", "mine", "owner"]).includes(a)), { prompt: "Change property" }).enterText("value", {
          prompt: ({ property }) => `Change ${property}`,
          initial: ({ element, property }) => String(element[property])
        }).do(({ element, property, value }) => {
          let v = value;
          if (value === "true") {
            v = true;
          } else if (value === "false") {
            v = false;
          } else if (parseInt(value).toString() === value) {
            v = parseInt(value);
          }
          element[property] = v;
        })
      };
    }
    // given a player's move (minimum a selected action), attempts to process
    // it. if not, returns next selection for that player, plus any implied partial
    // moves
    processMove({ player, name, args }) {
      if (this.phase === "finished")
        return "Game is finished";
      let result;
      return this.inContextOfPlayer(player, () => {
        if (this.godMode && this.godModeActions()[name]) {
          const godModeAction = this.godModeActions()[name];
          result = godModeAction._process(player, args);
        } else {
          result = this.flow().processMove({
            name,
            player: player.position,
            args
          });
        }
        console.debug(`Received move from player #${player.position} ${name}({${Object.entries(args).map(([k, v]) => `${k}: ${v}`).join(", ")}}) ${result ? typeof result === "string" ? "\u274C " + result : `\u2B95  ${result[0].name}({${Object.entries(result[0].args || {}).map(([k, v]) => `${k}: ${v}`).join(", ")}})` : "\u2705"}`);
        if (result instanceof Array) {
          for (const flow of result.reverse())
            this.beginSubflow(flow);
        }
        return typeof result === "string" ? result : void 0;
      });
    }
    allowedActions(player, debug) {
      const actions = this.godMode ? Object.keys(this.godModeActions()).map((name) => ({ name })) : [];
      if (!player.isCurrent())
        return {
          actions,
          skipIf: "always"
        };
      const actionStep = this.flow().actionNeeded(player);
      if (actionStep?.actions) {
        for (const allowedAction of actionStep.actions) {
          if (allowedAction.name === "__pass__") {
            actions.push(allowedAction);
          } else {
            const gameAction = this.getAction(allowedAction.name, player);
            if (gameAction.isPossible(allowedAction.args ?? {})) {
              actions.push({ ...gameAction, ...allowedAction, player });
            } else if (debug) {
              debug[allowedAction.name] = { impossible: true, args: {} };
            }
          }
        }
        return {
          ...actionStep,
          actions
        };
      }
      return {
        skipIf: "always",
        actions: []
      };
    }
    getPendingMoves(player, name, args, debug) {
      if (this.phase === "finished")
        return;
      const allowedActions = this.allowedActions(player, debug);
      let possibleActions = [];
      if (allowedActions.actions.length) {
        const { step, prompt, actions, skipIf } = allowedActions;
        if (!name) {
          let pendingMoves = [];
          for (const action of actions) {
            if (action.name === "__pass__") {
              possibleActions.push("__pass__");
              pendingMoves.push({
                name: "__pass__",
                args: {},
                selections: [
                  new Selection("__action__", { prompt: action.prompt, value: "__pass__" }).resolve({})
                ]
              });
              if (debug) {
                debug["__pass__"] = { args: {} };
              }
            } else {
              const playerAction = this.getAction(action.name, player);
              const args2 = action.args || {};
              let submoves = playerAction._getPendingMoves(args2, debug);
              if (submoves !== void 0) {
                possibleActions.push(action.name);
                if (submoves.length === 0 || skipIf === "never" || skipIf === "only-one" && actions.length > 1) {
                  submoves = [{
                    name: action.name,
                    prompt: action.prompt,
                    args: args2,
                    selections: [
                      new Selection("__action__", {
                        prompt: action.prompt ?? playerAction.prompt,
                        value: action.name,
                        skipIf
                      }).resolve({})
                    ]
                  }];
                }
                pendingMoves = pendingMoves.concat(submoves);
              } else {
                console.debug(`Action ${action.name} not allowed because no valid selections exist`);
              }
            }
          }
          if (possibleActions.length)
            return { step, prompt, moves: pendingMoves };
        } else {
          if (name === "__pass__")
            return { step, prompt, moves: [] };
          const moves = this.getAction(name, player)?._getPendingMoves(args || {}, debug);
          if (moves)
            return { step, prompt, moves };
        }
      }
      return void 0;
    }
  };

  // node_modules/@boardzilla/core/entry/game-creator.js
  var createGame = /* @__PURE__ */ __name((playerClass, gameClass, gameCreator) => (state, options) => {
    const gameManager = new GameManager(playerClass, gameClass);
    const inSetup = !("board" in state);
    globalThis.$ = gameManager.game._ctx.namedSpaces;
    if (options?.rseed)
      gameManager.setRandomSeed(options.rseed);
    gameManager.setSettings(state.settings);
    gameManager.players.fromJSON(state.players);
    gameCreator(gameManager.game);
    if (options?.mocks)
      options.mocks(gameManager.game);
    if (options?.trackMovement)
      gameManager.trackMovement();
    if (!inSetup) {
      gameManager.sequence = state.sequence;
      gameManager.messages = state.messages;
      gameManager.announcements = state.announcements;
      gameManager.game.fromJSON(state.board);
      gameManager.players.assignAttributesFromJSON(state.players);
      gameManager.setFlowFromJSON(state.position);
    } else {
      gameManager.start();
      gameManager.players.assignAttributesFromJSON(state.players);
    }
    return gameManager;
  }, "createGame");

  // src/game/index.ts
  var Cabo = class extends game_default {
    constructor() {
      super(...arguments);
      /**
       * Any overall properties of your game go here
       */
      this.gameEnd = false;
      this.caboCalled = false;
    }
    static {
      __name(this, "Cabo");
    }
  };
  var CaboPlayer = class extends player_default {
    constructor() {
      super(...arguments);
      /**
       * Any properties of your players that are specific to your game go here
       */
      this.score = 0;
    }
    static {
      __name(this, "CaboPlayer");
    }
  };
  var Card = class extends Piece {
    static {
      __name(this, "Card");
    }
  };
  var game_default2 = createGame(CaboPlayer, Cabo, (game) => {
    const { action } = game;
    const { playerActions, whileLoop, loop, eachPlayer, everyPlayer, forEach } = game.flowCommands;
    game.registerClasses(Card);
    const board = game.create(space_default, "board");
    const deck = board.create(space_default, "deck");
    const discardPile = board.create(space_default, "discardPile");
    $.discardPile.onEnter(Card, (e) => e.showToAll());
    ["club", "spade", "diamond", "heart"].forEach((suit) => {
      ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"].forEach(
        (value) => {
          $.deck.create(Card, `${value}-${suit}`, {
            suit: [suit],
            value
          });
        }
      );
    });
    for (const player of game.players) {
      const cards = board.create(space_default, "cards", { player });
      const hand = board.create(space_default, "hand", { player });
      hand.onEnter(Card, (t) => {
        t.hideFromAll();
      });
    }
    game.defineActions({
      lookAtOwnCards: (player) => action({
        prompt: "Look at two of your own cards"
      }).chooseOnBoard("cards", () => player.my("cards").all(Card), {
        number: 2
      }).do(({ cards }) => {
        cards.forEach((c) => {
          c.showTo(player);
        });
      }),
      drawFromDeck: (player) => action({
        prompt: "Draw a card and swap it with one of your own",
        description: "Drawing and swapping"
      }).chooseOnBoard("drawn-card", [$.deck.first(Card)], { skipIf: "never" }).chooseOnBoard("chosen-card", player.allMy(Card), {
        prompt: "Choose a card to swap with the drawn card",
        number: 1
      }).swap("chosen-card", "drawn-card"),
      drawFromDiscard: (player) => action({
        prompt: "Take the top card from the discard pile"
      })
    });
    game.defineFlow(
      () => $.deck.shuffle(),
      // deal 4 cards for each player
      forEach({
        name: "player",
        collection: () => game.players,
        do: ({ player }) => {
          console.log(`Dealing cards to player ${player}`);
          for (let i = 0; i < 4; i++) {
            $.deck.first(Card).putInto(player.my("cards"));
          }
        }
      }),
      // get every player to look at two of their cards
      everyPlayer({ do: playerActions({ actions: ["lookAtOwnCards"] }) }),
      // get the first player
      // loop until someone calls cabo and then end game when back to person that called cabo
      loop(
        eachPlayer({
          name: "play",
          do: playerActions({ actions: ["drawFromDeck"] })
        })
      )
    );
  });

  // src/game/game-interface.ts
  var game_interface_default = createInterface(game_default2);
  return __toCommonJS(game_interface_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQtcmFuZG9tL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcmFuZG9tLXNlZWQvaW5kZXguanMiLCAiLi4vLi4vc3JjL2dhbWUvZ2FtZS1pbnRlcmZhY2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2JvYXJkL2VsZW1lbnQtY29sbGVjdGlvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvYWN0aW9uL3V0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy91dGlscy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvYm9hcmQvZWxlbWVudC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvYm9hcmQvc3BhY2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2JvYXJkL3BpZWNlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9wbGF5ZXIvcGxheWVyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9hY3Rpb24vc2VsZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9hY3Rpb24vYWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L2VudW1zLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L2Zsb3cudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL3BsYXllci9jb2xsZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L2FjdGlvbi1zdGVwLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L3doaWxlLWxvb3AudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvZm9yLWxvb3AudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvZm9yLWVhY2gudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvZWFjaC1wbGF5ZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvc3dpdGNoLWNhc2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvaWYtZWxzZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvZmxvdy9ldmVyeS1wbGF5ZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2JvYXJkL2dhbWUudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2ludGVyZmFjZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvZ2FtZS1tYW5hZ2VyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9nYW1lLWNyZWF0b3IudHMiLCAiLi4vLi4vc3JjL2dhbWUvaW5kZXgudHMiXSwKICAic291cmNlUm9vdCI6ICJzcmMvZ2FtZSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCl7XG5cbiAgdmFyXG4gICAgYnVmLFxuICAgIGJ1ZklkeCA9IDAsXG4gICAgaGV4Qnl0ZXMgPSBbXSxcbiAgICBpXG4gIDtcblxuICAvLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbiAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgaGV4Qnl0ZXNbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICB9XG5cbiAgLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuICAvLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbiAgLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG4gIHV1aWQuQlVGRkVSX1NJWkUgPSA0MDk2O1xuXG4gIC8vIEJpbmFyeSB1dWlkc1xuICB1dWlkLmJpbiA9IHV1aWRCaW47XG5cbiAgLy8gQ2xlYXIgYnVmZmVyXG4gIHV1aWQuY2xlYXJCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICBidWYgPSBudWxsO1xuICAgIGJ1ZklkeCA9IDA7XG4gIH07XG5cbiAgLy8gVGVzdCBmb3IgdXVpZFxuICB1dWlkLnRlc3QgPSBmdW5jdGlvbih1dWlkKSB7XG4gICAgaWYgKHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tNFswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaS50ZXN0KHV1aWQpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICB2YXIgY3J5cHQwO1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjcnlwdDAgPSBjcnlwdG87XG4gIH0gZWxzZSBpZiggKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJiAodHlwZW9mIHdpbmRvdy5tc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgY3J5cHQwID0gd2luZG93Lm1zQ3J5cHRvOyAvLyBJRTExXG4gIH1cblxuICBpZiAoKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgY3J5cHQwID0gY3J5cHQwIHx8IHJlcXVpcmUoJ2NyeXB0bycpO1xuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy51dWlkID0gdXVpZDtcbiAgfVxuXG4gIC8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG4gIC8vIEFsc28gZXhwb3NlIHRoaXMgc28geW91IGNhbiBvdmVycmlkZSBpdC5cbiAgdXVpZC5yYW5kb21CeXRlcyA9IChmdW5jdGlvbigpe1xuICAgIGlmIChjcnlwdDApIHtcbiAgICAgIGlmIChjcnlwdDAucmFuZG9tQnl0ZXMpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0MC5yYW5kb21CeXRlcztcbiAgICAgIH1cbiAgICAgIGlmIChjcnlwdDAuZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICAgICAgICBjcnlwdDAuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKTtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKGJ5dGVzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICAgICAgY3J5cHQwLmdldFJhbmRvbVZhbHVlcyhieXRlcyk7XG4gICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgdmFyIGksIHIgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgfSkoKTtcblxuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGZ1bmN0aW9uIHJhbmRvbUJ5dGVzQnVmZmVyZWQobikge1xuICAgIGlmICghYnVmIHx8ICgoYnVmSWR4ICsgbikgPiB1dWlkLkJVRkZFUl9TSVpFKSkge1xuICAgICAgYnVmSWR4ID0gMDtcbiAgICAgIGJ1ZiA9IHV1aWQucmFuZG9tQnl0ZXModXVpZC5CVUZGRVJfU0laRSk7XG4gICAgfVxuICAgIHJldHVybiBidWYuc2xpY2UoYnVmSWR4LCBidWZJZHggKz0gbik7XG4gIH1cblxuICAvLyB1dWlkLmJpblxuICBmdW5jdGlvbiB1dWlkQmluKCkge1xuICAgIHZhciBiID0gcmFuZG9tQnl0ZXNCdWZmZXJlZCgxNik7XG4gICAgYls2XSA9IChiWzZdICYgMHgwZikgfCAweDQwO1xuICAgIGJbOF0gPSAoYls4XSAmIDB4M2YpIHwgMHg4MDtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8vIFN0cmluZyBVVUlEdjQgKFJhbmRvbSlcbiAgZnVuY3Rpb24gdXVpZCgpIHtcbiAgICB2YXIgYiA9IHV1aWRCaW4oKTtcbiAgICByZXR1cm4gaGV4Qnl0ZXNbYlswXV0gKyBoZXhCeXRlc1tiWzFdXSArXG4gICAgICBoZXhCeXRlc1tiWzJdXSArIGhleEJ5dGVzW2JbM11dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbNF1dICsgaGV4Qnl0ZXNbYls1XV0gKyAnLScgK1xuICAgICAgaGV4Qnl0ZXNbYls2XV0gKyBoZXhCeXRlc1tiWzddXSArICctJyArXG4gICAgICBoZXhCeXRlc1tiWzhdXSArIGhleEJ5dGVzW2JbOV1dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbMTBdXSArIGhleEJ5dGVzW2JbMTFdXSArXG4gICAgICBoZXhCeXRlc1tiWzEyXV0gKyBoZXhCeXRlc1tiWzEzXV0gK1xuICAgICAgaGV4Qnl0ZXNbYlsxNF1dICsgaGV4Qnl0ZXNbYlsxNV1dXG4gICAgO1xuICB9XG5cbn0pKCk7XG4iLCAiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5leHBvcnRzLmdldFNlcmlhbGl6ZSA9IHNlcmlhbGl6ZXJcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcywgY3ljbGVSZXBsYWNlcikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSwgc3BhY2VzKVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHZhciBzdGFjayA9IFtdLCBrZXlzID0gW11cblxuICBpZiAoY3ljbGVSZXBsYWNlciA9PSBudWxsKSBjeWNsZVJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFja1swXSA9PT0gdmFsdWUpIHJldHVybiBcIltDaXJjdWxhciB+XVwiXG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyIH4uXCIgKyBrZXlzLnNsaWNlKDAsIHN0YWNrLmluZGV4T2YodmFsdWUpKS5qb2luKFwiLlwiKSArIFwiXVwiXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgdGhpc1BvcyA9IHN0YWNrLmluZGV4T2YodGhpcylcbiAgICAgIH50aGlzUG9zID8gc3RhY2suc3BsaWNlKHRoaXNQb3MgKyAxKSA6IHN0YWNrLnB1c2godGhpcylcbiAgICAgIH50aGlzUG9zID8ga2V5cy5zcGxpY2UodGhpc1BvcywgSW5maW5pdHksIGtleSkgOiBrZXlzLnB1c2goa2V5KVxuICAgICAgaWYgKH5zdGFjay5pbmRleE9mKHZhbHVlKSkgdmFsdWUgPSBjeWNsZVJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBzdGFjay5wdXNoKHZhbHVlKVxuXG4gICAgcmV0dXJuIHJlcGxhY2VyID09IG51bGwgPyB2YWx1ZSA6IHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgfVxufVxuIiwgIi8qXG4gKiByYW5kb20tc2VlZFxuICogaHR0cHM6Ly9naXRodWIuY29tL3NrcmF0Y2hkb3QvcmFuZG9tLXNlZWRcbiAqXG4gKiBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBTdGV2ZSBHaWJzb24gYW5kIGNhbiBiZSBmb3VuZCBoZXJlOlxuICpcbiAqIGh0dHBzOi8vd3d3LmdyYy5jb20vb3RnL3VoZXBybmcuaHRtXG4gKlxuICogSXQgd2FzIHNsaWdodGx5IG1vZGlmaWVkIGZvciB1c2UgaW4gbm9kZSwgdG8gcGFzcyBqc2hpbnQsIGFuZCBhIGZldyBhZGRpdGlvbmFsXG4gKiBoZWxwZXIgZnVuY3Rpb25zIHdlcmUgYWRkZWQuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIHNrcmF0Y2hkb3RcbiAqIER1YWwgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGFuZCB0aGUgb3JpZ2luYWwgR1JDIGNvcHlyaWdodC9saWNlbnNlXG4gKiBpbmNsdWRlZCBiZWxvdy5cbiAqL1xuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XHRcdFx0XHRcdFx0XHRcdEdpYnNvbiBSZXNlYXJjaCBDb3Jwb3JhdGlvblxuXHRcdFx0XHRVSEVQUk5HIC0gVWx0cmEgSGlnaCBFbnRyb3B5IFBzZXVkby1SYW5kb20gTnVtYmVyIEdlbmVyYXRvclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdExJQ0VOU0UgQU5EIENPUFlSSUdIVDogIFRISVMgQ09ERSBJUyBIRVJFQlkgUkVMRUFTRUQgSU5UTyBUSEUgUFVCTElDIERPTUFJTlxuXHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb24gcmVsZWFzZXMgYW5kIGRpc2NsYWltcyBBTEwgUklHSFRTIEFORCBUSVRMRSBJTlxuXHRUSElTIENPREUgT1IgQU5ZIERFUklWQVRJVkVTLiBBbnlvbmUgbWF5IGJlIGZyZWVseSB1c2UgaXQgZm9yIGFueSBwdXJwb3NlLlxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFRoaXMgaXMgR1JDJ3MgY3J5cHRvZ3JhcGhpY2FsbHkgc3Ryb25nIFBSTkcgKHBzZXVkby1yYW5kb20gbnVtYmVyIGdlbmVyYXRvcilcblx0Zm9yIEphdmFTY3JpcHQuIEl0IGlzIGRyaXZlbiBieSAxNTM2IGJpdHMgb2YgZW50cm9weSwgc3RvcmVkIGluIGFuIGFycmF5IG9mXG5cdDQ4LCAzMi1iaXQgSmF2YVNjcmlwdCB2YXJpYWJsZXMuICBTaW5jZSBtYW55IGFwcGxpY2F0aW9ucyBvZiB0aGlzIGdlbmVyYXRvcixcblx0aW5jbHVkaW5nIG91cnMgd2l0aCB0aGUgXCJPZmYgVGhlIEdyaWRcIiBMYXRpbiBTcXVhcmUgZ2VuZXJhdG9yLCBtYXkgcmVxdWlyZVxuXHR0aGUgZGV0ZXJpbWluaXN0aWMgcmUtZ2VuZXJhdGlvbiBvZiBhIHNlcXVlbmNlIG9mIFBSTnMsIHRoaXMgUFJORydzIGluaXRpYWxcblx0ZW50cm9waWMgc3RhdGUgY2FuIGJlIHJlYWQgYW5kIHdyaXR0ZW4gYXMgYSBzdGF0aWMgd2hvbGUsIGFuZCBpbmNyZW1lbnRhbGx5XG5cdGV2b2x2ZWQgYnkgcG91cmluZyBuZXcgc291cmNlIGVudHJvcHkgaW50byB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWwgc3RhdGUuXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0RU5ETEVTUyBUSEFOS1MgYXJlIGR1ZSBKb2hhbm5lcyBCYWFnb2UgZm9yIGhpcyBjYXJlZnVsIGRldmVsb3BtZW50IG9mIGhpZ2hseVxuXHRyb2J1c3QgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbnMgb2YgSlMgUFJOR3MuICBUaGlzIHdvcmsgd2FzIGJhc2VkIHVwb24gaGlzXG5cdEphdmFTY3JpcHQgXCJBbGVhXCIgUFJORyB3aGljaCBpcyBiYXNlZCB1cG9uIHRoZSBleHRyZW1lbHkgcm9idXN0IE11bHRpcGx5LVxuXHRXaXRoLUNhcnJ5IChNV0MpIFBSTkcgaW52ZW50ZWQgYnkgR2VvcmdlIE1hcnNhZ2xpYS4gTVdDIEFsZ29yaXRobSBSZWZlcmVuY2VzOlxuXHRodHRwOi8vd3d3LkdSQy5jb20vb3RnL01hcnNhZ2xpYV9QUk5Hcy5wZGZcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfTVdDX0dlbmVyYXRvcnMucGRmXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0VGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMgaGF2ZSBiZWVuIHZlcmlmaWVkIGJ5XG5cdG11bHRpcGxlIGluZGVwZW5kZW50IHJlc2VhcmNoZXJzLiBJdCBoYW5kaWx5IHBhc3NlcyB0aGUgZmVybWlsYWIuY2ggdGVzdHMgYXNcblx0d2VsbCBhcyB0aGUgXCJkaWVoYXJkXCIgYW5kIFwiZGllaGFyZGVyXCIgdGVzdCBzdWl0ZXMuICBGb3IgaW5kaXZpZHVhbHMgd2lzaGluZ1xuXHR0byBmdXJ0aGVyIHZlcmlmeSB0aGUgcXVhbGl0eSBvZiB0aGlzIGFsZ29yaXRobSdzIHBzZXVkby1yYW5kb20gbnVtYmVycywgYVxuXHQyNTYtbWVnYWJ5dGUgZmlsZSBvZiB0aGlzIGFsZ29yaXRobSdzIG91dHB1dCBtYXkgYmUgZG93bmxvYWRlZCBmcm9tIEdSQy5jb20sXG5cdGFuZCBhIE1pY3Jvc29mdCBXaW5kb3dzIHNjcmlwdGluZyBob3N0IChXU0gpIHZlcnNpb24gb2YgdGhpcyBhbGdvcml0aG0gbWF5IGJlXG5cdGRvd25sb2FkZWQgYW5kIHJ1biBmcm9tIHRoZSBXaW5kb3dzIGNvbW1hbmQgcHJvbXB0IHRvIGdlbmVyYXRlIHVuaXF1ZSBmaWxlc1xuXHRvZiBhbnkgc2l6ZTpcblx0VGhlIEZlcm1pbGFiIFwiRU5UXCIgdGVzdHM6IGh0dHA6Ly9mb3VybWlsYWIuY2gvcmFuZG9tL1xuXHRUaGUgMjU2LW1lZ2FieXRlIHNhbXBsZSBQUk4gZmlsZSBhdCBHUkM6IGh0dHBzOi8vd3d3LkdSQy5jb20vb3RnL3VoZXBybmcuYmluXG5cdFRoZSBXaW5kb3dzIHNjcmlwdGluZyBob3N0IHZlcnNpb246IGh0dHBzOi8vd3d3LkdSQy5jb20vb3RnL3dzaC11aGVwcm5nLmpzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0UXVhbGlmeWluZyBNV0MgbXVsdGlwbGllcnMgYXJlOiAxODc4ODQsIDY4NjExOCwgODk4MTM0LCAxMTA0Mzc1LCAxMjUwMjA1LFxuXHQxNDYwOTEwIGFuZCAxNzY4ODYzLiAoV2UgdXNlIHRoZSBsYXJnZXN0IG9uZSB0aGF0J3MgPCAyXjIxKVxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4ndXNlIHN0cmljdCc7XG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuXG4vKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuVGhpcyBpcyBiYXNlZCB1cG9uIEpvaGFubmVzIEJhYWdvZSdzIGNhcmVmdWxseSBkZXNpZ25lZCBhbmQgZWZmaWNpZW50IGhhc2hcbmZ1bmN0aW9uIGZvciB1c2Ugd2l0aCBKYXZhU2NyaXB0LiAgSXQgaGFzIGEgcHJvdmVuIFwiYXZhbGFuY2hlXCIgZWZmZWN0IHN1Y2hcbnRoYXQgZXZlcnkgYml0IG9mIHRoZSBpbnB1dCBhZmZlY3RzIGV2ZXJ5IGJpdCBvZiB0aGUgb3V0cHV0IDUwJSBvZiB0aGUgdGltZSxcbndoaWNoIGlzIGdvb2QuXHRTZWU6IGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvaGFzaC9hdmFsYW5jaGUueGh0bWxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiovXG52YXIgTWFzaCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG4gPSAweGVmYzgyNDlkO1xuXHR2YXIgbWFzaCA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0biArPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRcdHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdGggKj0gbjtcblx0XHRcdFx0biA9IGggPj4+IDA7XG5cdFx0XHRcdGggLT0gbjtcblx0XHRcdFx0biArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcblx0XHRcdH1cblx0XHRcdHJldHVybiAobiA+Pj4gMCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuID0gMHhlZmM4MjQ5ZDtcblx0XHR9XG5cdH07XG5cdHJldHVybiBtYXNoO1xufTtcblxudmFyIHVoZXBybmcgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRyZXR1cm4gKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbyA9IDQ4OyAvLyBzZXQgdGhlICdvcmRlcicgbnVtYmVyIG9mIEVOVFJPUFktaG9sZGluZyAzMi1iaXQgdmFsdWVzXG5cdFx0dmFyIGMgPSAxOyAvLyBpbml0IHRoZSAnY2FycnknIHVzZWQgYnkgdGhlIG11bHRpcGx5LXdpdGgtY2FycnkgKE1XQykgYWxnb3JpdGhtXG5cdFx0dmFyIHAgPSBvOyAvLyBpbml0IHRoZSAncGhhc2UnIChtYXgtMSkgb2YgdGhlIGludGVybWVkaWF0ZSB2YXJpYWJsZSBwb2ludGVyXG5cdFx0dmFyIHMgPSBuZXcgQXJyYXkobyk7IC8vIGRlY2xhcmUgb3VyIGludGVybWVkaWF0ZSB2YXJpYWJsZXMgYXJyYXlcblx0XHR2YXIgaTsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cdFx0dmFyIGo7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBrID0gMDsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cblx0XHQvLyB3aGVuIG91ciBcInVoZXBybmdcIiBpcyBpbml0aWFsbHkgaW52b2tlZCBvdXIgUFJORyBzdGF0ZSBpcyBpbml0aWFsaXplZCBmcm9tIHRoZVxuXHRcdC8vIGJyb3dzZXIncyBvd24gbG9jYWwgUFJORy4gVGhpcyBpcyBva2F5IHNpbmNlIGFsdGhvdWdoIGl0cyBnZW5lcmF0b3IgbWlnaHQgbm90XG5cdFx0Ly8gYmUgd29uZGVyZnVsLCBpdCdzIHVzZWZ1bCBmb3IgZXN0YWJsaXNoaW5nIGxhcmdlIHN0YXJ0dXAgZW50cm9weSBmb3Igb3VyIHVzYWdlLlxuXHRcdHZhciBtYXNoID0gbmV3IE1hc2goKTsgLy8gZ2V0IGEgcG9pbnRlciB0byBvdXIgaGlnaC1wZXJmb3JtYW5jZSBcIk1hc2hcIiBoYXNoXG5cblx0XHQvLyBmaWxsIHRoZSBhcnJheSB3aXRoIGluaXRpYWwgbWFzaCBoYXNoIHZhbHVlc1xuXHRcdGZvciAoaSA9IDA7IGkgPCBvOyBpKyspIHtcblx0XHRcdHNbaV0gPSBtYXNoKE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblxuXHRcdC8vIHRoaXMgUFJJVkFURSAoaW50ZXJuYWwgYWNjZXNzIG9ubHkpIGZ1bmN0aW9uIGlzIHRoZSBoZWFydCBvZiB0aGUgbXVsdGlwbHktd2l0aC1jYXJyeVxuXHRcdC8vIChNV0MpIFBSTkcgYWxnb3JpdGhtLiBXaGVuIGNhbGxlZCBpdCByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBudW1iZXIgaW4gdGhlIGZvcm0gb2YgYVxuXHRcdC8vIDMyLWJpdCBKYXZhU2NyaXB0IGZyYWN0aW9uICgwLjAgdG8gPDEuMCkgaXQgaXMgYSBQUklWQVRFIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIGRlZmF1bHRcblx0XHQvLyBbMC0xXSByZXR1cm4gZnVuY3Rpb24sIGFuZCBieSB0aGUgcmFuZG9tICdzdHJpbmcobiknIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgJ24nXG5cdFx0Ly8gY2hhcmFjdGVycyBmcm9tIDMzIHRvIDEyNi5cblx0XHR2YXIgcmF3cHJuZyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgrK3AgPj0gbykge1xuXHRcdFx0XHRwID0gMDtcblx0XHRcdH1cblx0XHRcdHZhciB0ID0gMTc2ODg2MyAqIHNbcF0gKyBjICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHRcdHJldHVybiBzW3BdID0gdCAtIChjID0gdCB8IDApO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uIGlzIHRoZSBkZWZhdWx0IGZ1bmN0aW9uIHJldHVybmVkIGJ5IHRoaXMgbGlicmFyeS5cblx0XHQvLyBUaGUgdmFsdWVzIHJldHVybmVkIGFyZSBpbnRlZ2VycyBpbiB0aGUgcmFuZ2UgZnJvbSAwIHRvIHJhbmdlLTEuIFdlIGZpcnN0XG5cdFx0Ly8gb2J0YWluIHR3byAzMi1iaXQgZnJhY3Rpb25zIChmcm9tIHJhd3BybmcpIHRvIHN5bnRoZXNpemUgYSBzaW5nbGUgaGlnaFxuXHRcdC8vIHJlc29sdXRpb24gNTMtYml0IHBybmcgKDAgdG8gPDEpLCB0aGVuIHdlIG11bHRpcGx5IHRoaXMgYnkgdGhlIGNhbGxlcidzXG5cdFx0Ly8gXCJyYW5nZVwiIHBhcmFtIGFuZCB0YWtlIHRoZSBcImZsb29yXCIgdG8gcmV0dXJuIGEgZXF1YWxseSBwcm9iYWJsZSBpbnRlZ2VyLlxuXHRcdHZhciByYW5kb20gPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHJhbmdlICogKHJhd3BybmcoKSArIChyYXdwcm5nKCkgKiAweDIwMDAwMCB8IDApICogMS4xMTAyMjMwMjQ2MjUxNTY1ZS0xNikpOyAvLyAyXi01M1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uICdzdHJpbmcobiknIHJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIHN0cmluZyBvZlxuXHRcdC8vICduJyBwcmludGFibGUgY2hhcmFjdGVycyByYW5naW5nIGZyb20gY2hyKDMzKSB0byBjaHIoMTI2KSBpbmNsdXNpdmUuXG5cdFx0cmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIChjb3VudCkge1xuXHRcdFx0dmFyIGk7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0XHRcdFx0cyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDMzICsgcmFuZG9tKDk0KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBQUklWQVRFIFwiaGFzaFwiIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZXZvbHZlIHRoZSBnZW5lcmF0b3IncyBpbnRlcm5hbFxuXHRcdC8vIGVudHJvcHkgc3RhdGUuIEl0IGlzIGFsc28gY2FsbGVkIGJ5IHRoZSBFWFBPUlRFRCBhZGRFbnRyb3B5KCkgZnVuY3Rpb25cblx0XHQvLyB3aGljaCBpcyB1c2VkIHRvIHBvdXIgZW50cm9weSBpbnRvIHRoZSBQUk5HLlxuXHRcdHZhciBoYXNoID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG87IGorKykge1xuXHRcdFx0XHRcdHNbal0gLT0gbWFzaChhcmdzW2ldKTtcblx0XHRcdFx0XHRpZiAoc1tqXSA8IDApIHtcblx0XHRcdFx0XHRcdHNbal0gKz0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBcImNsZWFuIHN0cmluZ1wiIGZ1bmN0aW9uIHJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzIGFuZCBub24tcHJpbnRpbmdcblx0XHQvLyBjb250cm9sIGNoYXJhY3RlcnMsIGluY2x1ZGluZyBhbnkgZW1iZWRkZWQgY2FycmlhZ2UtcmV0dXJuIChDUikgYW5kIGxpbmUtZmVlZCAoTEYpIGNoYXJhY3RlcnMsXG5cdFx0Ly8gZnJvbSBhbnkgc3RyaW5nIGl0IGlzIGhhbmRlZC4gdGhpcyBpcyBhbHNvIHVzZWQgYnkgdGhlICdoYXNoc3RyaW5nJyBmdW5jdGlvbiAoYmVsb3cpIHRvIGhlbHBcblx0XHQvLyB1c2VycyBhbHdheXMgb2J0YWluIHRoZSBzYW1lIEVGRkVDVElWRSB1aGVwcm5nIHNlZWRpbmcga2V5LlxuXHRcdHJhbmRvbS5jbGVhblN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgbGVhZGluZyBzcGFjZXNcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvW1xceDAwLVxceDFGXS9naSwgJycpOyAvLyByZW1vdmUgYW55L2FsbCBjb250cm9sIGNoYXJhY3RlcnNcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvXFxuIC8sICdcXG4nKTsgLy8gcmVtb3ZlIGFueS9hbGwgdHJhaWxpbmcgc3BhY2VzXG5cdFx0XHRyZXR1cm4gaW5TdHI7IC8vIHJldHVybiB0aGUgY2xlYW5lZCB1cCByZXN1bHRcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBcImhhc2ggc3RyaW5nXCIgZnVuY3Rpb24gaGFzaGVzIHRoZSBwcm92aWRlZCBjaGFyYWN0ZXIgc3RyaW5nIGFmdGVyIGZpcnN0IHJlbW92aW5nXG5cdFx0Ly8gYW55IGxlYWRpbmcgb3IgdHJhaWxpbmcgc3BhY2VzIGFuZCBpZ25vcmluZyBhbnkgZW1iZWRkZWQgY2FycmlhZ2UgcmV0dXJucyAoQ1IpIG9yIExpbmUgRmVlZHMgKExGKVxuXHRcdHJhbmRvbS5oYXNoU3RyaW5nID0gZnVuY3Rpb24gKGluU3RyKSB7XG5cdFx0XHRpblN0ciA9IHJhbmRvbS5jbGVhblN0cmluZyhpblN0cik7XG5cdFx0XHRtYXNoKGluU3RyKTsgLy8gdXNlIHRoZSBzdHJpbmcgdG8gZXZvbHZlIHRoZSAnbWFzaCcgc3RhdGVcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBpblN0ci5sZW5ndGg7IGkrKykgeyAvLyBzY2FuIHRocm91Z2ggdGhlIGNoYXJhY3RlcnMgaW4gb3VyIHN0cmluZ1xuXHRcdFx0XHRrID0gaW5TdHIuY2hhckNvZGVBdChpKTsgLy8gZ2V0IHRoZSBjaGFyYWN0ZXIgY29kZSBhdCB0aGUgbG9jYXRpb25cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG87IGorKykgeyAvL1x0XCJtYXNoXCIgaXQgaW50byB0aGUgVUhFUFJORyBzdGF0ZVxuXHRcdFx0XHRcdHNbal0gLT0gbWFzaChrKTtcblx0XHRcdFx0XHRpZiAoc1tqXSA8IDApIHtcblx0XHRcdFx0XHRcdHNbal0gKz0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNlZWQgdGhlIHJhbmRvbSBnZW5lcmF0b3IuXG5cdFx0cmFuZG9tLnNlZWQgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBzZWVkID09PSAndW5kZWZpbmVkJyB8fCBzZWVkID09PSBudWxsKSB7XG5cdFx0XHRcdHNlZWQgPSBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWVkID0gc3RyaW5naWZ5KHNlZWQsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSkudG9TdHJpbmcoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJhbmRvbS5pbml0U3RhdGUoKTtcblx0XHRcdHJhbmRvbS5oYXNoU3RyaW5nKHNlZWQpO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIGhhbmR5IGV4cG9ydGVkIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYWRkIGVudHJvcHkgdG8gb3VyIHVoZXBybmcgYXQgYW55IHRpbWVcblx0XHRyYW5kb20uYWRkRW50cm9weSA9IGZ1bmN0aW9uICggLyogYWNjZXB0IHplcm8gb3IgbW9yZSBhcmd1bWVudHMgKi8gKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdH1cblx0XHRcdGhhc2goKGsrKykgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpICsgYXJncy5qb2luKCcnKSArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH07XG5cblx0XHQvLyBpZiB3ZSB3YW50IHRvIHByb3ZpZGUgYSBkZXRlcm1pbmlzdGljIHN0YXJ0dXAgY29udGV4dCBmb3Igb3VyIFBSTkcsXG5cdFx0Ly8gYnV0IHdpdGhvdXQgZGlyZWN0bHkgc2V0dGluZyB0aGUgaW50ZXJuYWwgc3RhdGUgdmFyaWFibGVzLCB0aGlzIGFsbG93c1xuXHRcdC8vIHVzIHRvIGluaXRpYWxpemUgdGhlIG1hc2ggaGFzaCBhbmQgUFJORydzIGludGVybmFsIHN0YXRlIGJlZm9yZSBwcm92aWRpbmdcblx0XHQvLyBzb21lIGhhc2hpbmcgaW5wdXRcblx0XHRyYW5kb20uaW5pdFN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bWFzaCgpOyAvLyBwYXNzIGEgbnVsbCBhcmcgdG8gZm9yY2UgbWFzaCBoYXNoIHRvIGluaXRcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBvOyBpKyspIHtcblx0XHRcdFx0c1tpXSA9IG1hc2goJyAnKTsgLy8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRcdH1cblx0XHRcdGMgPSAxOyAvLyBpbml0IG91ciBtdWx0aXBseS13aXRoLWNhcnJ5IGNhcnJ5XG5cdFx0XHRwID0gbzsgLy8gaW5pdCBvdXIgcGhhc2Vcblx0XHR9O1xuXG5cdFx0Ly8gd2UgdXNlIHRoaXMgKG9wdGlvbmFsKSBleHBvcnRlZCBmdW5jdGlvbiB0byBzaWduYWwgdGhlIEphdmFTY3JpcHQgaW50ZXJwcmV0ZXJcblx0XHQvLyB0aGF0IHdlJ3JlIGZpbmlzaGVkIHVzaW5nIHRoZSBcIk1hc2hcIiBoYXNoIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGZyZWUgdXAgdGhlXG5cdFx0Ly8gbG9jYWwgXCJpbnN0YW5jZSB2YXJpYWJsZXNcIiBpcyB3aWxsIGhhdmUgYmVlbiBtYWludGFpbmluZy4gIEl0J3Mgbm90IHN0cmljdGx5XG5cdFx0Ly8gbmVjZXNzYXJ5LCBvZiBjb3Vyc2UsIGJ1dCBpdCdzIGdvb2QgSmF2YVNjcmlwdCBjaXRpemVuc2hpcC5cblx0XHRyYW5kb20uZG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2ggPSBudWxsO1xuXHRcdH07XG5cblx0XHQvLyBpZiB3ZSBjYWxsZWQgXCJ1aGVwcm5nXCIgd2l0aCBhIHNlZWQgdmFsdWUsIHRoZW4gZXhlY3V0ZSByYW5kb20uc2VlZCgpIGJlZm9yZSByZXR1cm5pbmdcblx0XHRpZiAodHlwZW9mIHNlZWQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyYW5kb20uc2VlZChzZWVkKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCByYW5nZSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbShyYW5nZSk7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCAxIChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLnJhbmRvbSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiByYW5kb20oTnVtYmVyLk1BWF9WQUxVRSAtIDEpIC8gTnVtYmVyLk1BWF9WQUxVRTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLmZsb2F0QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbS5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxuXHRcdHJhbmRvbS5pbnRCZXR3ZWVuID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXHRcdH07XG5cblx0XHQvLyB3aGVuIG91ciBtYWluIG91dGVyIFwidWhlcHJuZ1wiIGZ1bmN0aW9uIGlzIGNhbGxlZCwgYWZ0ZXIgc2V0dGluZyB1cCBvdXJcblx0XHQvLyBpbml0aWFsIHZhcmlhYmxlcyBhbmQgZW50cm9waWMgc3RhdGUsIHdlIHJldHVybiBhbiBcImluc3RhbmNlIHBvaW50ZXJcIlxuXHRcdC8vIHRvIHRoZSBpbnRlcm5hbCBhbm9ueW1vdXMgZnVuY3Rpb24gd2hpY2ggY2FuIHRoZW4gYmUgdXNlZCB0byBhY2Nlc3Ncblx0XHQvLyB0aGUgdWhlcHJuZydzIHZhcmlvdXMgZXhwb3J0ZWQgZnVuY3Rpb25zLiAgQXMgd2l0aCB0aGUgXCIuZG9uZVwiIGZ1bmN0aW9uXG5cdFx0Ly8gYWJvdmUsIHdlIHNob3VsZCBzZXQgdGhlIHJldHVybmVkIHZhbHVlIHRvICdudWxsJyBvbmNlIHdlJ3JlIGZpbmlzaGVkXG5cdFx0Ly8gdXNpbmcgYW55IG9mIHRoZXNlIGZ1bmN0aW9ucy5cblx0XHRyZXR1cm4gcmFuZG9tO1xuXHR9KCkpO1xufTtcblxuLy8gTW9kaWZpY2F0aW9uIGZvciB1c2UgaW4gbm9kZTpcbnVoZXBybmcuY3JlYXRlID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIG5ldyB1aGVwcm5nKHNlZWQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gdWhlcHJuZztcbiIsICJpbXBvcnQgc2V0dXAgZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7IGNyZWF0ZUludGVyZmFjZSB9IGZyb20gXCJAYm9hcmR6aWxsYS9jb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUludGVyZmFjZShzZXR1cCk7XG4iLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCAiaW1wb3J0IHsgR2FtZSwgU3BhY2UsIFBpZWNlLCBjcmVhdGVHYW1lLCBQbGF5ZXIsIERvIH0gZnJvbSBcIkBib2FyZHppbGxhL2NvcmVcIjtcbmltcG9ydCB7IGFDIH0gZnJvbSBcInZpdGVzdC9kaXN0L3JlcG9ydGVycy0xZXZBNWxvbS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FibyBleHRlbmRzIEdhbWU8Q2FibywgQ2Fib1BsYXllcj4ge1xuICAvKipcbiAgICogQW55IG92ZXJhbGwgcHJvcGVydGllcyBvZiB5b3VyIGdhbWUgZ28gaGVyZVxuICAgKi9cbiAgZ2FtZUVuZCA9IGZhbHNlO1xuICBjYWJvQ2FsbGVkID0gZmFsc2U7XG4gIGNhYm9DYWxsZWRCeT86IENhYm9QbGF5ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBDYWJvUGxheWVyIGV4dGVuZHMgUGxheWVyPENhYm8sIENhYm9QbGF5ZXI+IHtcbiAgLyoqXG4gICAqIEFueSBwcm9wZXJ0aWVzIG9mIHlvdXIgcGxheWVycyB0aGF0IGFyZSBzcGVjaWZpYyB0byB5b3VyIGdhbWUgZ28gaGVyZVxuICAgKi9cbiAgc2NvcmU6IG51bWJlciA9IDA7XG59XG5cbnR5cGUgU3VpdCA9IFwiY2x1YlwiIHwgXCJoZWFydFwiIHwgXCJzcGFkZVwiIHwgXCJkaWFtb25kXCI7XG4vKipcbiAqIERlZmluZSB5b3VyIGdhbWUncyBjdXN0b20gcGllY2VzIGFuZCBzcGFjZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJkIGV4dGVuZHMgUGllY2U8Q2Fibz4ge1xuICBzdWl0OiBbU3VpdF07XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFiaWxpdHk6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZShDYWJvUGxheWVyLCBDYWJvLCAoZ2FtZSkgPT4ge1xuICBjb25zdCB7IGFjdGlvbiB9ID0gZ2FtZTtcbiAgY29uc3QgeyBwbGF5ZXJBY3Rpb25zLCB3aGlsZUxvb3AsIGxvb3AsIGVhY2hQbGF5ZXIsIGV2ZXJ5UGxheWVyLCBmb3JFYWNoIH0gPVxuICAgIGdhbWUuZmxvd0NvbW1hbmRzO1xuXG4gIC8qIFJlZ2lzdGVyIGFsbCBjdXN0b20gcGllY2VzIGFuZCBzcGFjZXMgKi9cbiAgZ2FtZS5yZWdpc3RlckNsYXNzZXMoQ2FyZCk7XG5cbiAgLyogQ3JlYXRlIHlvdXIgZ2FtZSBib2FyZCdzIGxheW91dCBhbmQgYWxsIGluY2x1ZGVkIHBpZWNlcy4gKi9cbiAgY29uc3QgYm9hcmQgPSBnYW1lLmNyZWF0ZShTcGFjZSwgXCJib2FyZFwiKTtcbiAgY29uc3QgZGVjayA9IGJvYXJkLmNyZWF0ZShTcGFjZSwgXCJkZWNrXCIpO1xuICAvLyAkLmRlY2sub25FbnRlcihDYXJkLCAoZSkgPT4gZS5oaWRlRnJvbUFsbCgpKTtcblxuICBjb25zdCBkaXNjYXJkUGlsZSA9IGJvYXJkLmNyZWF0ZShTcGFjZSwgXCJkaXNjYXJkUGlsZVwiKTtcbiAgJC5kaXNjYXJkUGlsZS5vbkVudGVyKENhcmQsIChlKSA9PiBlLnNob3dUb0FsbCgpKTtcblxuICAvLyBjcmVhdGluZyB0aGUgY2FyZHNcbiAgW1wiY2x1YlwiLCBcInNwYWRlXCIsIFwiZGlhbW9uZFwiLCBcImhlYXJ0XCJdLmZvckVhY2goKHN1aXQ6IFN1aXQpID0+IHtcbiAgICBbXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiLCBcIjEwXCIsIFwialwiLCBcInFcIiwgXCJrXCJdLmZvckVhY2goXG4gICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgJC5kZWNrLmNyZWF0ZShDYXJkLCBgJHt2YWx1ZX0tJHtzdWl0fWAsIHtcbiAgICAgICAgICBzdWl0OiBbc3VpdF0sXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGZvciAoY29uc3QgcGxheWVyIG9mIGdhbWUucGxheWVycykge1xuICAgIGNvbnN0IGNhcmRzID0gYm9hcmQuY3JlYXRlKFNwYWNlLCBcImNhcmRzXCIsIHsgcGxheWVyIH0pO1xuICAgIGNvbnN0IGhhbmQgPSBib2FyZC5jcmVhdGUoU3BhY2UsIFwiaGFuZFwiLCB7IHBsYXllciB9KTtcbiAgICAvLyAkLmhhbmQub25FbnRlcihDYXJkLCAoZSkgPT4gZS5zaG93T25seVRvKHBsYXllcikpO1xuICAgIGhhbmQub25FbnRlcihDYXJkLCAodCkgPT4ge1xuICAgICAgdC5oaWRlRnJvbUFsbCgpO1xuICAgIH0pO1xuICAgIC8vIHdhaXRpbmcub25FbnRlcihDYXJkLCAoZSkgPT4gZS5oaWRlRnJvbUFsbCgpKTtcbiAgfVxuXG4gIC8qKiBEZWZpbmUgYWxsIHBvc3NpYmxlIGdhbWUgYWN0aW9ucy4gKi9cbiAgZ2FtZS5kZWZpbmVBY3Rpb25zKHtcbiAgICBsb29rQXRPd25DYXJkczogKHBsYXllcikgPT5cbiAgICAgIGFjdGlvbih7XG4gICAgICAgIHByb21wdDogXCJMb29rIGF0IHR3byBvZiB5b3VyIG93biBjYXJkc1wiLFxuICAgICAgfSlcbiAgICAgICAgLmNob29zZU9uQm9hcmQoXCJjYXJkc1wiLCAoKSA9PiBwbGF5ZXIubXkoXCJjYXJkc1wiKSEuYWxsKENhcmQpLCB7XG4gICAgICAgICAgbnVtYmVyOiAyLFxuICAgICAgICB9KVxuICAgICAgICAuZG8oKHsgY2FyZHMgfSkgPT4ge1xuICAgICAgICAgIGNhcmRzLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICAgIGMuc2hvd1RvKHBsYXllcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgIGRyYXdGcm9tRGVjazogKHBsYXllcikgPT5cbiAgICAgIGFjdGlvbih7XG4gICAgICAgIHByb21wdDogXCJEcmF3IGEgY2FyZCBhbmQgc3dhcCBpdCB3aXRoIG9uZSBvZiB5b3VyIG93blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJEcmF3aW5nIGFuZCBzd2FwcGluZ1wiLFxuICAgICAgfSlcbiAgICAgICAgLmNob29zZU9uQm9hcmQoXCJkcmF3bi1jYXJkXCIsIFskLmRlY2suZmlyc3QoQ2FyZCkhXSwgeyBza2lwSWY6IFwibmV2ZXJcIiB9KVxuICAgICAgICAvLyAubW92ZShcImRyYXduLWNhcmRcIilcbiAgICAgICAgLmNob29zZU9uQm9hcmQoXCJjaG9zZW4tY2FyZFwiLCBwbGF5ZXIuYWxsTXkoQ2FyZCksIHtcbiAgICAgICAgICBwcm9tcHQ6IFwiQ2hvb3NlIGEgY2FyZCB0byBzd2FwIHdpdGggdGhlIGRyYXduIGNhcmRcIixcbiAgICAgICAgICBudW1iZXI6IDEsXG4gICAgICAgIH0pXG4gICAgICAgIC5zd2FwKFwiY2hvc2VuLWNhcmRcIiwgXCJkcmF3bi1jYXJkXCIpLFxuICAgIGRyYXdGcm9tRGlzY2FyZDogKHBsYXllcikgPT5cbiAgICAgIGFjdGlvbih7XG4gICAgICAgIHByb21wdDogXCJUYWtlIHRoZSB0b3AgY2FyZCBmcm9tIHRoZSBkaXNjYXJkIHBpbGVcIixcbiAgICAgIH0pLFxuICB9KTtcblxuICAvKiogRGVmaW5lIHRoZSBnYW1lIGZsb3csIHN0YXJ0aW5nIHdpdGggYm9hcmQgc2V0dXAgYW5kIHByb2dyZXNzaW5nIHRocm91Z2ggYWxsIHBoYXNlcyBhbmQgdHVybnMuICovXG4gIGdhbWUuZGVmaW5lRmxvdyhcbiAgICAoKSA9PiAkLmRlY2suc2h1ZmZsZSgpLFxuXG4gICAgLy8gZGVhbCA0IGNhcmRzIGZvciBlYWNoIHBsYXllclxuICAgIGZvckVhY2goe1xuICAgICAgbmFtZTogXCJwbGF5ZXJcIixcbiAgICAgIGNvbGxlY3Rpb246ICgpID0+IGdhbWUucGxheWVycyxcbiAgICAgIGRvOiAoeyBwbGF5ZXIgfSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVhbGluZyBjYXJkcyB0byBwbGF5ZXIgJHtwbGF5ZXJ9YCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgJC5kZWNrLmZpcnN0KENhcmQpIS5wdXRJbnRvKHBsYXllci5teShcImNhcmRzXCIpISk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBnZXQgZXZlcnkgcGxheWVyIHRvIGxvb2sgYXQgdHdvIG9mIHRoZWlyIGNhcmRzXG4gICAgZXZlcnlQbGF5ZXIoeyBkbzogcGxheWVyQWN0aW9ucyh7IGFjdGlvbnM6IFtcImxvb2tBdE93bkNhcmRzXCJdIH0pIH0pLFxuXG4gICAgLy8gZ2V0IHRoZSBmaXJzdCBwbGF5ZXJcblxuICAgIC8vIGxvb3AgdW50aWwgc29tZW9uZSBjYWxscyBjYWJvIGFuZCB0aGVuIGVuZCBnYW1lIHdoZW4gYmFjayB0byBwZXJzb24gdGhhdCBjYWxsZWQgY2Fib1xuICAgIGxvb3AoXG4gICAgICBlYWNoUGxheWVyKHtcbiAgICAgICAgbmFtZTogXCJwbGF5XCIsXG4gICAgICAgIGRvOiBwbGF5ZXJBY3Rpb25zKHsgYWN0aW9uczogW1wiZHJhd0Zyb21EZWNrXCJdIH0pLFxuICAgICAgfSlcbiAgICApXG4gICk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUEsT0FBQyxXQUFVO0FBRVQsWUFDRSxLQUNBLFNBQVMsR0FDVCxXQUFXLENBQUMsR0FDWjtBQUlGLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQ3hCLG1CQUFTLENBQUMsS0FBSyxJQUFJLEtBQU8sU0FBUyxFQUFFLEVBQUUsT0FBTyxDQUFDO0FBQUEsUUFDakQ7QUFLQSxRQUFBQSxNQUFLLGNBQWM7QUFHbkIsUUFBQUEsTUFBSyxNQUFNO0FBR1gsUUFBQUEsTUFBSyxjQUFjLFdBQVc7QUFDNUIsZ0JBQU07QUFDTixtQkFBUztBQUFBLFFBQ1g7QUFHQSxRQUFBQSxNQUFLLE9BQU8sU0FBU0EsT0FBTTtBQUN6QixjQUFJLE9BQU9BLFVBQVMsVUFBVTtBQUM1QixtQkFBTyx5RUFBeUUsS0FBS0EsS0FBSTtBQUFBLFVBQzNG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LEtBQUssTUFBTSxJQUFJLEVBQUcsUUFBUSxPQUFPLEdBQUcsT0FBTyxDQUFFO0FBQUEsVUFDakQ7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQSxNQUdELFlBQVksRUFBRSxJQUFJLGNBQWMsRUFBRSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQTtBQUFBO0FBQUEsTUFLbEU7QUFBQSxRQUNFLFdBQVc7QUFBQSxVQUNULE1BQU07QUFBQSxVQUNOLElBQUksY0FBYyxFQUFFLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUFBLFFBQ2pELENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQzs7O0F6QjdIRCxNQUFPLHlCQUFRLGdCQUFnQkMsYUFBSzsiLAogICJuYW1lcyI6IFsidXVpZCIsICJuIiwgImkiLCAibiIsICJyYW5kb20iLCAicmFuZ2UiLCAiaSIsICJzIiwgInNlZWQiLCAibiIsICJyYW5kb20iLCAibiIsICJuIiwgInV1aWQiLCAiYXJncyIsICJJbnRlcnJ1cHRDb250cm9sIiwgIkZsb3dDb250cm9sIiwgImJsb2NrIiwgIm4iLCAiaW50ZXJydXB0IiwgInJhbmRvbSIsICJpbXBvcnRfcmFuZG9tX3NlZWQiLCAicmFuZG9tIiwgImFyZ3MiLCAiZ2FtZV9kZWZhdWx0IiwgImdhbWVfZGVmYXVsdCJdCn0K
