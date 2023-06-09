(() => {
    "use strict";
    var t = {
            666: t => {
                var e, r = "object" == typeof Reflect ? Reflect : null,
                    i = r && "function" == typeof r.apply ? r.apply : function(t, e, r) {
                        return Function.prototype.apply.call(t, e, r)
                    };
                e = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function(t) {
                    return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
                } : function(t) {
                    return Object.getOwnPropertyNames(t)
                };
                var o = Number.isNaN || function(t) {
                    return t != t
                };

                function s() {
                    s.init.call(this)
                }
                t.exports = s, t.exports.once = function(t, e) {
                    return new Promise((function(r, i) {
                        function o(r) {
                            t.removeListener(e, s), i(r)
                        }

                        function s() {
                            "function" == typeof t.removeListener && t.removeListener("error", o), r([].slice.call(arguments))
                        }
                        v(t, e, s, {
                            once: !0
                        }), "error" !== e && function(t, e, r) {
                            "function" == typeof t.on && v(t, "error", e, r)
                        }(t, o, {
                            once: !0
                        })
                    }))
                }, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
                var n = 10;

                function a(t) {
                    if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
                }

                function h(t) {
                    return void 0 === t._maxListeners ? s.defaultMaxListeners : t._maxListeners
                }

                function l(t, e, r, i) {
                    var o, s, n, l;
                    if (a(r), void 0 === (s = t._events) ? (s = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== s.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), s = t._events), n = s[e]), void 0 === n) n = s[e] = r, ++t._eventsCount;
                    else if ("function" == typeof n ? n = s[e] = i ? [r, n] : [n, r] : i ? n.unshift(r) : n.push(r), (o = h(t)) > 0 && n.length > o && !n.warned) {
                        n.warned = !0;
                        var c = new Error("Possible EventEmitter memory leak detected. " + n.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                        c.name = "MaxListenersExceededWarning", c.emitter = t, c.type = e, c.count = n.length, l = c, console && console.warn && console.warn(l)
                    }
                    return t
                }

                function c() {
                    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
                }

                function d(t, e, r) {
                    var i = {
                            fired: !1,
                            wrapFn: void 0,
                            target: t,
                            type: e,
                            listener: r
                        },
                        o = c.bind(i);
                    return o.listener = r, i.wrapFn = o, o
                }

                function u(t, e, r) {
                    var i = t._events;
                    if (void 0 === i) return [];
                    var o = i[e];
                    return void 0 === o ? [] : "function" == typeof o ? r ? [o.listener || o] : [o] : r ? function(t) {
                        for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
                        return e
                    }(o) : w(o, o.length)
                }

                function p(t) {
                    var e = this._events;
                    if (void 0 !== e) {
                        var r = e[t];
                        if ("function" == typeof r) return 1;
                        if (void 0 !== r) return r.length
                    }
                    return 0
                }

                function w(t, e) {
                    for (var r = new Array(e), i = 0; i < e; ++i) r[i] = t[i];
                    return r
                }

                function v(t, e, r, i) {
                    if ("function" == typeof t.on) i.once ? t.once(e, r) : t.on(e, r);
                    else {
                        if ("function" != typeof t.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
                        t.addEventListener(e, (function o(s) {
                            i.once && t.removeEventListener(e, o), r(s)
                        }))
                    }
                }
                Object.defineProperty(s, "defaultMaxListeners", {
                    enumerable: !0,
                    get: function() {
                        return n
                    },
                    set: function(t) {
                        if ("number" != typeof t || t < 0 || o(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                        n = t
                    }
                }), s.init = function() {
                    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
                }, s.prototype.setMaxListeners = function(t) {
                    if ("number" != typeof t || t < 0 || o(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                    return this._maxListeners = t, this
                }, s.prototype.getMaxListeners = function() {
                    return h(this)
                }, s.prototype.emit = function(t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
                    var o = "error" === t,
                        s = this._events;
                    if (void 0 !== s) o = o && void 0 === s.error;
                    else if (!o) return !1;
                    if (o) {
                        var n;
                        if (e.length > 0 && (n = e[0]), n instanceof Error) throw n;
                        var a = new Error("Unhandled error." + (n ? " (" + n.message + ")" : ""));
                        throw a.context = n, a
                    }
                    var h = s[t];
                    if (void 0 === h) return !1;
                    if ("function" == typeof h) i(h, this, e);
                    else {
                        var l = h.length,
                            c = w(h, l);
                        for (r = 0; r < l; ++r) i(c[r], this, e)
                    }
                    return !0
                }, s.prototype.addListener = function(t, e) {
                    return l(this, t, e, !1)
                }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(t, e) {
                    return l(this, t, e, !0)
                }, s.prototype.once = function(t, e) {
                    return a(e), this.on(t, d(this, t, e)), this
                }, s.prototype.prependOnceListener = function(t, e) {
                    return a(e), this.prependListener(t, d(this, t, e)), this
                }, s.prototype.removeListener = function(t, e) {
                    var r, i, o, s, n;
                    if (a(e), void 0 === (i = this._events)) return this;
                    if (void 0 === (r = i[t])) return this;
                    if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || e));
                    else if ("function" != typeof r) {
                        for (o = -1, s = r.length - 1; s >= 0; s--)
                            if (r[s] === e || r[s].listener === e) {
                                n = r[s].listener, o = s;
                                break
                            } if (o < 0) return this;
                        0 === o ? r.shift() : function(t, e) {
                            for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                            t.pop()
                        }(r, o), 1 === r.length && (i[t] = r[0]), void 0 !== i.removeListener && this.emit("removeListener", t, n || e)
                    }
                    return this
                }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(t) {
                    var e, r, i;
                    if (void 0 === (r = this._events)) return this;
                    if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
                    if (0 === arguments.length) {
                        var o, s = Object.keys(r);
                        for (i = 0; i < s.length; ++i) "removeListener" !== (o = s[i]) && this.removeAllListeners(o);
                        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                    }
                    if ("function" == typeof(e = r[t])) this.removeListener(t, e);
                    else if (void 0 !== e)
                        for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
                    return this
                }, s.prototype.listeners = function(t) {
                    return u(this, t, !0)
                }, s.prototype.rawListeners = function(t) {
                    return u(this, t, !1)
                }, s.listenerCount = function(t, e) {
                    return "function" == typeof t.listenerCount ? t.listenerCount(e) : p.call(t, e)
                }, s.prototype.listenerCount = p, s.prototype.eventNames = function() {
                    return this._eventsCount > 0 ? e(this._events) : []
                }
            }
        },
        e = {};

    function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i](s, s.exports, r), s.exports
    }(() => {
        var t = r(666);
        const e = class {
            #t;
            #e;
            constructor(t = {}, e = null, r = null) {
                this.#t = !1, this.#e = null, this.data = t, this.target = e, this.that = r
            }
            get intercepted() {
                return this.#t
            }
            get returnValue() {
                return this.#e
            }
            respondWith(t) {
                this.#e = t, this.#t = !0
            }
        };
        const i = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.document = this.window.document, this.Document = this.window.Document || {}, this.DOMParser = this.window.DOMParser || {}, this.docProto = this.Document.prototype || {}, this.domProto = this.DOMParser.prototype || {}, this.title = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "title"), this.cookie = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "cookie"), this.referrer = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "referrer"), this.domain = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "domain"), this.documentURI = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "documentURI"), this.write = this.docProto.write, this.writeln = this.docProto.writeln, this.querySelector = this.docProto.querySelector, this.querySelectorAll = this.docProto.querySelectorAll, this.parseFromString = this.domProto.parseFromString, this.URL = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "URL")
            }
            overrideParseFromString() {
                this.ctx.override(this.domProto, "parseFromString", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        string: o,
                        type: s
                    }, t, r);
                    return this.emit("parseFromString", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.string, n.data.type)
                }))
            }
            overrideQuerySelector() {
                this.ctx.override(this.docProto, "querySelector", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        selectors: o
                    }, t, r);
                    return this.emit("querySelector", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.selectors)
                }))
            }
            overrideDomain() {
                this.ctx.overrideDescriptor(this.docProto, "domain", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getDomain", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        return this.emit("setDomain", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
            overrideReferrer() {
                this.ctx.overrideDescriptor(this.docProto, "referrer", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("referrer", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
            overrideCreateTreeWalker() {
                this.ctx.override(this.docProto, "createTreeWalker", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o, s = 4294967295, n, a] = i;
                    const h = new e({
                        root: o,
                        show: s,
                        filter: n,
                        expandEntityReferences: a
                    }, t, r);
                    return this.emit("createTreeWalker", h), h.intercepted ? h.returnValue : h.target.call(h.that, h.data.root, h.data.show, h.data.filter, h.data.expandEntityReferences)
                }))
            }
            overrideWrite() {
                this.ctx.override(this.docProto, "write", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [...o] = i;
                    const s = new e({
                        html: o
                    }, t, r);
                    return this.emit("write", s), s.intercepted ? s.returnValue : s.target.apply(s.that, s.data.html)
                })), this.ctx.override(this.docProto, "writeln", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [...o] = i;
                    const s = new e({
                        html: o
                    }, t, r);
                    return this.emit("writeln", s), s.intercepted ? s.returnValue : s.target.apply(s.that, s.data.html)
                }))
            }
            overrideDocumentURI() {
                this.ctx.overrideDescriptor(this.docProto, "documentURI", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("documentURI", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
            overrideURL() {
                this.ctx.overrideDescriptor(this.docProto, "URL", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("url", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
            overrideCookie() {
                this.ctx.overrideDescriptor(this.docProto, "cookie", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getCookie", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        return this.emit("setCookie", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
            overrideTitle() {
                this.ctx.overrideDescriptor(this.docProto, "title", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getTitle", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        return this.emit("setTitle", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
        };
        const o = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.Audio = this.window.Audio, this.Element = this.window.Element, this.elemProto = this.Element ? this.Element.prototype : {}, this.innerHTML = t.nativeMethods.getOwnPropertyDescriptor(this.elemProto, "innerHTML"), this.outerHTML = t.nativeMethods.getOwnPropertyDescriptor(this.elemProto, "outerHTML"), this.setAttribute = this.elemProto.setAttribute, this.getAttribute = this.elemProto.getAttribute, this.removeAttribute = this.elemProto.removeAttribute, this.hasAttribute = this.elemProto.hasAttribute, this.querySelector = this.elemProto.querySelector, this.querySelectorAll = this.elemProto.querySelectorAll, this.insertAdjacentHTML = this.elemProto.insertAdjacentHTML, this.insertAdjacentText = this.elemProto.insertAdjacentText
            }
            overrideQuerySelector() {
                this.ctx.override(this.elemProto, "querySelector", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        selectors: o
                    }, t, r);
                    return this.emit("querySelector", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.selectors)
                }))
            }
            overrideAttribute() {
                this.ctx.override(this.elemProto, "getAttribute", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, r);
                    return this.emit("getAttribute", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.elemProto, "setAttribute", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        name: o,
                        value: s
                    }, t, r);
                    return this.emit("setAttribute", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                })), this.ctx.override(this.elemProto, "hasAttribute", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, r);
                    return this.emit("hasAttribute", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.elemProto, "removeAttribute", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, r);
                    return this.emit("removeAttribute", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }))
            }
            overrideAudio() {
                this.ctx.override(this.window, "Audio", ((t, r, i) => {
                    if (!i.length) return new t(...i);
                    let [o] = i;
                    const s = new e({
                        url: o
                    }, t, r);
                    return this.emit("audio", s), s.intercepted ? s.returnValue : new s.target(s.data.url)
                }), !0)
            }
            overrideHtml() {
                this.hookProperty(this.Element, "innerHTML", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getInnerHTML", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        if (this.emit("setInnerHTML", o), o.intercepted) return o.returnValue;
                        t.call(r, o.data.value)
                    }
                }), this.hookProperty(this.Element, "outerHTML", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getOuterHTML", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        if (this.emit("setOuterHTML", o), o.intercepted) return o.returnValue;
                        t.call(r, o.data.value)
                    }
                })
            }
            overrideInsertAdjacentHTML() {
                this.ctx.override(this.elemProto, "insertAdjacentHTML", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        position: o,
                        html: s
                    }, t, r);
                    return this.emit("insertAdjacentHTML", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.position, n.data.html)
                }))
            }
            overrideInsertAdjacentText() {
                this.ctx.override(this.elemProto, "insertAdjacentText", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        position: o,
                        text: s
                    }, t, r);
                    return this.emit("insertAdjacentText", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.position, n.data.text)
                }))
            }
            hookProperty(t, e, r) {
                if (!t) return !1;
                if (this.ctx.nativeMethods.isArray(t)) {
                    for (const i of t) this.hookProperty(i, e, r);
                    return !0
                }
                const i = t.prototype;
                return this.ctx.overrideDescriptor(i, e, r), !0
            }
        };
        const s = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.Node = t.window.Node || {}, this.nodeProto = this.Node.prototype || {}, this.compareDocumentPosition = this.nodeProto.compareDocumentPosition, this.contains = this.nodeProto.contains, this.insertBefore = this.nodeProto.insertBefore, this.replaceChild = this.nodeProto.replaceChild, this.append = this.nodeProto.append, this.appendChild = this.nodeProto.appendChild, this.removeChild = this.nodeProto.removeChild, this.textContent = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "textContent"), this.parentNode = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "parentNode"), this.parentElement = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "parentElement"), this.childNodes = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "childNodes"), this.baseURI = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "baseURI"), this.previousSibling = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "previousSibling"), this.ownerDocument = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "ownerDocument")
            }
            overrideTextContent() {
                this.ctx.overrideDescriptor(this.nodeProto, "textContent", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getTextContent", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        if (this.emit("setTextContent", o), o.intercepted) return o.returnValue;
                        t.call(r, o.data.value)
                    }
                })
            }
            overrideAppend() {
                this.ctx.override(this.nodeProto, "append", ((t, r, [...i]) => {
                    const o = new e({
                        nodes: i
                    }, t, r);
                    return this.emit("append", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.nodes)
                })), this.ctx.override(this.nodeProto, "appendChild", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        node: o
                    }, t, r);
                    return this.emit("appendChild", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.node)
                }))
            }
            overrideBaseURI() {
                this.ctx.overrideDescriptor(this.nodeProto, "baseURI", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("baseURI", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
            overrideParent() {
                this.ctx.overrideDescriptor(this.nodeProto, "parentNode", {
                    get: (t, r) => {
                        const i = new e({
                            node: t.call(r)
                        }, t, r);
                        return this.emit("parentNode", i), i.intercepted ? i.returnValue : i.data.node
                    }
                }), this.ctx.overrideDescriptor(this.nodeProto, "parentElement", {
                    get: (t, r) => {
                        const i = new e({
                            element: t.call(r)
                        }, t, r);
                        return this.emit("parentElement", i), i.intercepted ? i.returnValue : i.data.node
                    }
                })
            }
            overrideOwnerDocument() {
                this.ctx.overrideDescriptor(this.nodeProto, "ownerDocument", {
                    get: (t, r) => {
                        const i = new e({
                            document: t.call(r)
                        }, t, r);
                        return this.emit("ownerDocument", i), i.intercepted ? i.returnValue : i.data.document
                    }
                })
            }
            overrideCompareDocumentPosit1ion() {
                this.ctx.override(this.nodeProto, "compareDocumentPosition", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        node: o
                    }, t, r);
                    return s.intercepted ? s.returnValue : s.target.call(s.that, s.data.node)
                }))
            }
            overrideChildMethods() {
                this.ctx.override(this.nodeProto, "removeChild")
            }
        };
        const n = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.Attr = this.window.Attr || {}, this.attrProto = this.Attr.prototype || {}, this.value = t.nativeMethods.getOwnPropertyDescriptor(this.attrProto, "value"), this.name = t.nativeMethods.getOwnPropertyDescriptor(this.attrProto, "name"), this.getNamedItem = this.attrProto.getNamedItem || null, this.setNamedItem = this.attrProto.setNamedItem || null, this.removeNamedItem = this.attrProto.removeNamedItem || null, this.getNamedItemNS = this.attrProto.getNamedItemNS || null, this.setNamedItemNS = this.attrProto.setNamedItemNS || null, this.removeNamedItemNS = this.attrProto.removeNamedItemNS || null, this.item = this.attrProto.item || null
            }
            overrideNameValue() {
                this.ctx.overrideDescriptor(this.attrProto, "name", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("name", i), i.intercepted ? i.returnValue : i.data.value
                    }
                }), this.ctx.overrideDescriptor(this.attrProto, "value", {
                    get: (t, r) => {
                        const i = new e({
                            name: this.name.get.call(r),
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getValue", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            name: this.name.get.call(r),
                            value: i
                        }, t, r);
                        if (this.emit("setValue", o), o.intercepted) return o.returnValue;
                        o.target.call(o.that, o.data.value)
                    }
                })
            }
            overrideItemMethods() {
                this.ctx.override(this.attrProto, "getNamedItem", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, r);
                    return this.emit("getNamedItem", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.attrProto, "setNamedItem", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        name: o,
                        value: s
                    }, t, r);
                    return this.emit("setNamedItem", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                })), this.ctx.override(this.attrProto, "removeNamedItem", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, r);
                    return this.emit("removeNamedItem", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.attrProto, "item", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        index: o
                    }, t, r);
                    return this.emit("item", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.attrProto, "getNamedItemNS", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        namespace: o,
                        localName: s
                    }, t, r);
                    return this.emit("getNamedItemNS", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.namespace, n.data.localName)
                })), this.ctx.override(this.attrProto, "setNamedItemNS", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        attr: o
                    }, t, r);
                    return this.emit("setNamedItemNS", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.attrProto, "removeNamedItemNS", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        namespace: o,
                        localName: s
                    }, t, r);
                    return this.emit("removeNamedItemNS", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.namespace, n.data.localName)
                }))
            }
        };
        const a = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.Function = this.window.Function, this.fnProto = this.Function.prototype, this.toString = this.fnProto.toString, this.fnStrings = t.fnStrings, this.call = this.fnProto.call, this.apply = this.fnProto.apply, this.bind = this.fnProto.bind
            }
            overrideFunction() {
                this.ctx.override(this.window, "Function", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let o = i[i.length - 1],
                        s = [];
                    for (let t = 0; t < i.length - 1; t++) s.push(i[t]);
                    const n = new e({
                        script: o,
                        args: s
                    }, t, r);
                    return this.emit("function", n), n.intercepted ? n.returnValue : n.target.call(n.that, ...n.data.args, n.data.script)
                }), !0)
            }
            overrideToString() {
                this.ctx.override(this.fnProto, "toString", ((t, r) => {
                    const i = new e({
                        fn: r
                    }, t, r);
                    return this.emit("toString", i), i.intercepted ? i.returnValue : i.target.call(i.data.fn)
                }))
            }
        };
        const h = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.Object = this.window.Object, this.getOwnPropertyDescriptors = this.Object.getOwnPropertyDescriptors, this.getOwnPropertyDescriptor = this.Object.getOwnPropertyDescriptor, this.getOwnPropertyNames = this.Object.getOwnPropertyNames
            }
            overrideGetPropertyNames() {
                this.ctx.override(this.Object, "getOwnPropertyNames", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        names: t.call(r, o)
                    }, t, r);
                    return this.emit("getOwnPropertyNames", s), s.intercepted ? s.returnValue : s.data.names
                }))
            }
            overrideGetOwnPropertyDescriptors() {
                this.ctx.override(this.Object, "getOwnPropertyDescriptors", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        descriptors: t.call(r, o)
                    }, t, r);
                    return this.emit("getOwnPropertyDescriptors", s), s.intercepted ? s.returnValue : s.data.descriptors
                }))
            }
        };
        const l = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.fetch = this.window.fetch, this.Request = this.window.Request, this.Response = this.window.Response, this.Headers = this.window.Headers, this.reqProto = this.Request ? this.Request.prototype : {}, this.resProto = this.Response ? this.Response.prototype : {}, this.headersProto = this.Headers ? this.Headers.prototype : {}, this.reqUrl = t.nativeMethods.getOwnPropertyDescriptor(this.reqProto, "url"), this.resUrl = t.nativeMethods.getOwnPropertyDescriptor(this.resProto, "url"), this.reqHeaders = t.nativeMethods.getOwnPropertyDescriptor(this.reqProto, "headers"), this.resHeaders = t.nativeMethods.getOwnPropertyDescriptor(this.resProto, "headers")
            }
            override() {
                return this.overrideRequest(), this.overrideUrl(), this.overrideHeaders(), !0
            }
            overrideRequest() {
                return !!this.fetch && (this.ctx.override(this.window, "fetch", ((t, r, i) => {
                    if (!i.length || i[0] instanceof this.Request) return t.apply(r, i);
                    let [o, s = {}] = i;
                    const n = new e({
                        input: o,
                        options: s
                    }, t, r);
                    return this.emit("request", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.input, n.data.options)
                })), this.ctx.override(this.window, "Request", ((t, r, i) => {
                    if (!i.length) return new t(...i);
                    let [o, s = {}] = i;
                    const n = new e({
                        input: o,
                        options: s
                    }, t);
                    return this.emit("request", n), n.intercepted ? n.returnValue : new n.target(n.data.input, n.data.options)
                }), !0), !0)
            }
            overrideUrl() {
                return this.ctx.overrideDescriptor(this.reqProto, "url", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("requestUrl", i), i.intercepted ? i.returnValue : i.data.value
                    }
                }), this.ctx.overrideDescriptor(this.resProto, "url", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("responseUrl", i), i.intercepted ? i.returnValue : i.data.value
                    }
                }), !0
            }
            overrideHeaders() {
                return !!this.Headers && (this.ctx.overrideDescriptor(this.reqProto, "headers", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("requestHeaders", i), i.intercepted ? i.returnValue : i.data.value
                    }
                }), this.ctx.overrideDescriptor(this.resProto, "headers", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("responseHeaders", i), i.intercepted ? i.returnValue : i.data.value
                    }
                }), this.ctx.override(this.headersProto, "get", ((t, r, [i]) => {
                    if (!i) return t.call(r);
                    const o = new e({
                        name: i,
                        value: t.call(r, i)
                    }, t, r);
                    return this.emit("getHeader", o), o.intercepted ? o.returnValue : o.data.value
                })), this.ctx.override(this.headersProto, "set", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        name: o,
                        value: s
                    }, t, r);
                    return this.emit("setHeader", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                })), this.ctx.override(this.headersProto, "has", ((t, r, i) => {
                    if (!i.length) return t.call(r);
                    let [o] = i;
                    const s = new e({
                        name: o,
                        value: t.call(r, o)
                    }, t, r);
                    return this.emit("hasHeader", s), s.intercepted ? s.returnValue : s.data
                })), this.ctx.override(this.headersProto, "append", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        name: o,
                        value: s
                    }, t, r);
                    return this.emit("appendHeader", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                })), this.ctx.override(this.headersProto, "delete", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, r);
                    return this.emit("deleteHeader", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), !0)
            }
        };
        const c = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.XMLHttpRequest = this.window.XMLHttpRequest, this.xhrProto = this.window.XMLHttpRequest ? this.window.XMLHttpRequest.prototype : {}, this.open = this.xhrProto.open, this.abort = this.xhrProto.abort, this.send = this.xhrProto.send, this.overrideMimeType = this.xhrProto.overrideMimeType, this.getAllResponseHeaders = this.xhrProto.getAllResponseHeaders, this.getResponseHeader = this.xhrProto.getResponseHeader, this.setRequestHeader = this.xhrProto.setRequestHeader, this.responseURL = t.nativeMethods.getOwnPropertyDescriptor(this.xhrProto, "responseURL"), this.responseText = t.nativeMethods.getOwnPropertyDescriptor(this.xhrProto, "responseText")
            }
            override() {
                this.overrideOpen(), this.overrideSend(), this.overrideMimeType(), this.overrideGetResHeader(), this.overrideGetResHeaders(), this.overrideSetReqHeader()
            }
            overrideOpen() {
                this.ctx.override(this.xhrProto, "open", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s, n = !0, a = null, h = null] = i;
                    const l = new e({
                        method: o,
                        input: s,
                        async: n,
                        user: a,
                        password: h
                    }, t, r);
                    return this.emit("open", l), l.intercepted ? l.returnValue : l.target.call(l.that, l.data.method, l.data.input, l.data.async, l.data.user, l.data.password)
                }))
            }
            overrideResponseUrl() {
                this.ctx.overrideDescriptor(this.xhrProto, "responseURL", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("responseUrl", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
            overrideSend() {
                this.ctx.override(this.xhrProto, "send", ((t, r, [i = null]) => {
                    const o = new e({
                        body: i
                    }, t, r);
                    return this.emit("send", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.body)
                }))
            }
            overrideSetReqHeader() {
                this.ctx.override(this.xhrProto, "setRequestHeader", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        name: o,
                        value: s
                    }, t, r);
                    return this.emit("setReqHeader", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }))
            }
            overrideGetResHeaders() {
                this.ctx.override(this.xhrProto, "getAllResponseHeaders", ((t, r) => {
                    const i = new e({
                        value: t.call(r)
                    }, t, r);
                    return this.emit("getAllResponseHeaders", i), i.intercepted ? i.returnValue : i.data.value
                }))
            }
            overrideGetResHeader() {
                this.ctx.override(this.xhrProto, "getResponseHeader", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        name: o,
                        value: t.call(r, o)
                    }, t, r);
                    return s.intercepted ? s.returnValue : s.data.value
                }))
            }
        };
        const d = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.EventSource = this.window.EventSource || {}, this.esProto = this.EventSource.prototype || {}, this.url = t.nativeMethods.getOwnPropertyDescriptor(this.esProto, "url"), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2
            }
            overrideConstruct() {
                this.ctx.override(this.window, "EventSource", ((t, r, i) => {
                    if (!i.length) return new t(...i);
                    let [o, s = {}] = i;
                    const n = new e({
                        url: o,
                        config: s
                    }, t, r);
                    return this.emit("construct", n), n.intercepted ? n.returnValue : new n.target(n.data.url, n.data.config)
                }), !0), "EventSource" in this.window && (this.window.EventSource.CONNECTING = this.CONNECTING, this.window.EventSource.OPEN = this.OPEN, this.window.EventSource.CLOSED = this.CLOSED)
            }
            overrideUrl() {
                this.ctx.overrideDescriptor(this.esProto, "url", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("url", i), i.data.value
                    }
                })
            }
        };
        const u = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = this.ctx.window, this.History = this.window.History, this.history = this.window.history, this.historyProto = this.History ? this.History.prototype : {}, this.pushState = this.historyProto.pushState, this.replaceState = this.historyProto.replaceState, this.go = this.historyProto.go, this.back = this.historyProto.back, this.forward = this.historyProto.forward
            }
            override() {
                this.overridePushState(), this.overrideReplaceState(), this.overrideGo(), this.overrideForward(), this.overrideBack()
            }
            overridePushState() {
                this.ctx.override(this.historyProto, "pushState", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s, n = ""] = i;
                    const a = new e({
                        state: o,
                        title: s,
                        url: n
                    }, t, r);
                    return this.emit("pushState", a), a.intercepted ? a.returnValue : a.target.call(a.that, a.data.state, a.data.title, a.data.url)
                }))
            }
            overrideReplaceState() {
                this.ctx.override(this.historyProto, "replaceState", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s, n = ""] = i;
                    const a = new e({
                        state: o,
                        title: s,
                        url: n
                    }, t, r);
                    return this.emit("replaceState", a), a.intercepted ? a.returnValue : a.target.call(a.that, a.data.state, a.data.title, a.data.url)
                }))
            }
            overrideGo() {
                this.ctx.override(this.historyProto, "go", ((t, r, [i]) => {
                    const o = new e({
                        delta: i
                    }, t, r);
                    return this.emit("go", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.delta)
                }))
            }
            overrideForward() {
                this.ctx.override(this.historyProto, "forward", ((t, r) => {
                    const i = new e(null, t, r);
                    return this.emit("forward", i), i.intercepted ? i.returnValue : i.target.call(i.that)
                }))
            }
            overrideBack() {
                this.ctx.override(this.historyProto, "back", ((t, r) => {
                    const i = new e(null, t, r);
                    return this.emit("back", i), i.intercepted ? i.returnValue : i.target.call(i.that)
                }))
            }
        };
        const p = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.location = this.window.location, this.WorkerLocation = this.ctx.worker ? this.window.WorkerLocation : null, this.workerLocProto = this.WorkerLocation ? this.WorkerLocation.prototype : {}, this.keys = ["href", "protocol", "host", "hostname", "port", "pathname", "search", "hash", "origin"], this.HashChangeEvent = this.window.HashChangeEvent || null, this.href = this.WorkerLocation ? t.nativeMethods.getOwnPropertyDescriptor(this.workerLocProto, "href") : t.nativeMethods.getOwnPropertyDescriptor(this.location, "href")
            }
            overrideWorkerLocation(t) {
                if (!this.WorkerLocation) return !1;
                const e = this;
                for (const r of this.keys) this.ctx.overrideDescriptor(this.workerLocProto, r, {
                    get: () => t(e.href.get.call(this.location))[r]
                });
                return !0
            }
            emulate(t, e) {
                const r = {},
                    i = this;
                for (const o of i.keys) this.ctx.nativeMethods.defineProperty(r, o, {
                    get: () => t(i.href.get.call(i.location))[o],
                    set: "origin" !== o ? function(t) {
                        switch (o) {
                            case "href":
                                i.location.href = e(t);
                                break;
                            case "hash":
                                i.emit("hashchange", r.href, t.trim().startsWith("#") ? new URL(t.trim(), r.href).href : new URL("#" + t.trim(), r.href).href, i);
                                break;
                            default: {
                                const s = new URL(r.href);
                                s[o] = t, i.location.href = e(s.href)
                            }
                        }
                    } : void 0,
                    configurable: !1,
                    enumerable: !0
                });
                return "reload" in this.location && this.ctx.nativeMethods.defineProperty(r, "reload", {
                    value: this.ctx.wrap(this.location, "reload", ((t, e) => t.call(e === r ? this.location : e))),
                    writable: !1,
                    enumerable: !0
                }), "replace" in this.location && this.ctx.nativeMethods.defineProperty(r, "replace", {
                    value: this.ctx.wrap(this.location, "assign", ((t, i, o) => {
                        o.length && i === r || t.call(i), i = this.location;
                        let [s] = o;
                        const n = new URL(s, r.href);
                        return t.call(i === r ? this.location : i, e(n.href))
                    })),
                    writable: !1,
                    enumerable: !0
                }), "assign" in this.location && this.ctx.nativeMethods.defineProperty(r, "assign", {
                    value: this.ctx.wrap(this.location, "assign", ((t, i, o) => {
                        o.length && i === r || t.call(i), i = this.location;
                        let [s] = o;
                        const n = new URL(s, r.href);
                        return t.call(i === r ? this.location : i, e(n.href))
                    })),
                    writable: !1,
                    enumerable: !0
                }), "ancestorOrigins" in this.location && this.ctx.nativeMethods.defineProperty(r, "ancestorOrigins", {
                    get() {
                        const t = [];
                        return i.window.DOMStringList && i.ctx.nativeMethods.setPrototypeOf(t, i.window.DOMStringList.prototype), t
                    },
                    set: void 0,
                    enumerable: !0
                }), this.ctx.nativeMethods.defineProperty(r, "toString", {
                    value: this.ctx.wrap(this.location, "toString", (() => r.href)),
                    enumerable: !0,
                    writable: !1
                }), this.ctx.nativeMethods.defineProperty(r, Symbol.toPrimitive, {
                    value: () => r.href,
                    writable: !1,
                    enumerable: !1
                }), this.ctx.window.Location && this.ctx.nativeMethods.setPrototypeOf(r, this.ctx.window.Location.prototype), r
            }
        };
        const w = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = this.ctx.window, this.postMessage = this.window.postMessage, this.MessageEvent = this.window.MessageEvent || {}, this.MessagePort = this.window.MessagePort || {}, this.mpProto = this.MessagePort.prototype || {}, this.mpPostMessage = this.mpProto.postMessage, this.messageProto = this.MessageEvent.prototype || {}, this.messageData = t.nativeMethods.getOwnPropertyDescriptor(this.messageProto, "data"), this.messageOrigin = t.nativeMethods.getOwnPropertyDescriptor(this.messageProto, "origin")
            }
            overridePostMessage() {
                this.ctx.override(this.window, "postMessage", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let o, s, n;
                    this.ctx.worker ? [o, n = []] = i : [o, s, n = []] = i;
                    const a = new e({
                        message: o,
                        origin: s,
                        transfer: n,
                        worker: this.ctx.worker
                    }, t, r);
                    return this.emit("postMessage", a), a.intercepted ? a.returnValue : this.ctx.worker ? a.target.call(a.that, a.data.message, a.data.transfer) : a.target.call(a.that, a.data.message, a.data.origin, a.data.transfer)
                }))
            }
            wrapPostMessage(t, r, i = !1) {
                return this.ctx.wrap(t, r, ((r, o, s) => {
                    if (this.ctx.worker ? !s.length : 2 > s) return r.apply(o, s);
                    let n, a, h;
                    i ? ([n, h = []] = s, a = null) : [n, a, h = []] = s;
                    const l = new e({
                        message: n,
                        origin: a,
                        transfer: h,
                        worker: this.ctx.worker
                    }, r, t);
                    return this.emit("postMessage", l), l.intercepted ? l.returnValue : i ? l.target.call(l.that, l.data.message, l.data.transfer) : l.target.call(l.that, l.data.message, l.data.origin, l.data.transfer)
                }))
            }
            overrideMessageOrigin() {
                this.ctx.overrideDescriptor(this.messageProto, "origin", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("origin", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
            overrideMessageData() {
                this.ctx.overrideDescriptor(this.messageProto, "data", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("data", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
        };
        const v = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.navigator = this.window.navigator, this.Navigator = this.window.Navigator || {}, this.navProto = this.Navigator.prototype || {}, this.sendBeacon = this.navProto.sendBeacon
            }
            overrideSendBeacon() {
                this.ctx.override(this.navProto, "sendBeacon", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o, s = ""] = i;
                    const n = new e({
                        url: o,
                        data: s
                    }, t, r);
                    return this.emit("sendBeacon", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.url, n.data.data)
                }))
            }
        };
        const m = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.Worker = this.window.Worker || {}, this.Worklet = this.window.Worklet || {}, this.workletProto = this.Worklet.prototype || {}, this.workerProto = this.Worker.prototype || {}, this.postMessage = this.workerProto.postMessage, this.terminate = this.workerProto.terminate, this.addModule = this.workletProto.addModule
            }
            overrideWorker() {
                this.ctx.override(this.window, "Worker", ((t, r, i) => {
                    if (!i.length) return new t(...i);
                    let [o, s = {}] = i;
                    const n = new e({
                        url: o,
                        options: s
                    }, t, r);
                    return this.emit("worker", n), n.intercepted ? n.returnValue : new n.target(...[n.data.url, n.data.options])
                }), !0)
            }
            overrideAddModule() {
                this.ctx.override(this.workletProto, "addModule", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o, s = {}] = i;
                    const n = new e({
                        url: o,
                        options: s
                    }, t, r);
                    return this.emit("addModule", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.url, n.data.options)
                }))
            }
            overridePostMessage() {
                this.ctx.override(this.workerProto, "postMessage", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o, s = []] = i;
                    const n = new e({
                        message: o,
                        transfer: s
                    }, t, r);
                    return this.emit("postMessage", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.message, n.data.transfer)
                }))
            }
            overrideImportScripts() {
                this.ctx.override(this.window, "importScripts", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    const o = new e({
                        scripts: i
                    }, t, r);
                    return this.emit("importScripts", o), o.intercepted ? o.returnValue : o.target.apply(o.that, o.data.scripts)
                }))
            }
        };
        const g = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = this.ctx.window, this.URL = this.window.URL || {}, this.createObjectURL = this.URL.createObjectURL, this.revokeObjectURL = this.URL.revokeObjectURL
            }
            overrideObjectURL() {
                this.ctx.override(this.URL, "createObjectURL", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        object: o
                    }, t, r);
                    return this.emit("createObjectURL", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.object)
                })), this.ctx.override(this.URL, "revokeObjectURL", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        url: o
                    }, t, r);
                    return this.emit("revokeObjectURL", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.url)
                }))
            }
        };
        const y = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.localStorage = this.window.localStorage || null, this.sessionStorage = this.window.sessionStorage || null, this.Storage = this.window.Storage || {}, this.storeProto = this.Storage.prototype || {}, this.getItem = this.storeProto.getItem || null, this.setItem = this.storeProto.setItem || null, this.removeItem = this.storeProto.removeItem || null, this.clear = this.storeProto.clear || null, this.key = this.storeProto.key || null, this.methods = ["key", "getItem", "setItem", "removeItem", "clear"], this.wrappers = new t.nativeMethods.Map
            }
            overrideMethods() {
                this.ctx.override(this.storeProto, "getItem", ((t, r, i) => {
                    if (!i.length) return t.apply(this.wrappers.get(r) || r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, this.wrappers.get(r) || r);
                    return this.emit("getItem", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.storeProto, "setItem", ((t, r, i) => {
                    if (2 > i.length) return t.apply(this.wrappers.get(r) || r, i);
                    let [o, s] = i;
                    const n = new e({
                        name: o,
                        value: s
                    }, t, this.wrappers.get(r) || r);
                    return this.emit("setItem", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                })), this.ctx.override(this.storeProto, "removeItem", ((t, r, i) => {
                    if (!i.length) return t.apply(this.wrappers.get(r) || r, i);
                    let [o] = i;
                    const s = new e({
                        name: o
                    }, t, this.wrappers.get(r) || r);
                    return this.emit("removeItem", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                })), this.ctx.override(this.storeProto, "clear", ((t, r) => {
                    const i = new e(null, t, this.wrappers.get(r) || r);
                    return this.emit("clear", i), i.intercepted ? i.returnValue : i.target.call(i.that)
                })), this.ctx.override(this.storeProto, "key", ((t, r, i) => {
                    if (!i.length) return t.apply(this.wrappers.get(r) || r, i);
                    let [o] = i;
                    const s = new e({
                        index: o
                    }, t, this.wrappers.get(r) || r);
                    return this.emit("key", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.index)
                }))
            }
            overrideLength() {
                this.ctx.overrideDescriptor(this.storeProto, "length", {
                    get: (t, r) => {
                        const i = new e({
                            length: t.call(this.wrappers.get(r) || r)
                        }, t, this.wrappers.get(r) || r);
                        return this.emit("length", i), i.intercepted ? i.returnValue : i.data.length
                    }
                })
            }
            emulate(t, r = {}) {
                this.ctx.nativeMethods.setPrototypeOf(r, this.storeProto);
                const i = new this.ctx.window.Proxy(r, {
                    get: (r, i) => {
                        if (i in this.storeProto || "symbol" == typeof i) return t[i];
                        const o = new e({
                            name: i
                        }, null, t);
                        return this.emit("get", o), o.intercepted ? o.returnValue : t[o.data.name]
                    },
                    set: (r, i, o) => {
                        if (i in this.storeProto || "symbol" == typeof i) return t[i] = o;
                        const s = new e({
                            name: i,
                            value: o
                        }, null, t);
                        return this.emit("set", s), s.intercepted ? s.returnValue : t[s.data.name] = s.data.value
                    },
                    deleteProperty: (r, i) => {
                        if ("symbol" == typeof i) return delete t[i];
                        const o = new e({
                            name: i
                        }, null, t);
                        return this.emit("delete", o), o.intercepted ? o.returnValue : delete t[o.data.name]
                    }
                });
                return this.wrappers.set(i, t), this.ctx.nativeMethods.setPrototypeOf(i, this.storeProto), i
            }
        };
        const f = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = t.window, this.CSSStyleDeclaration = this.window.CSSStyleDeclaration || {}, this.cssStyleProto = this.CSSStyleDeclaration.prototype || {}, this.getPropertyValue = this.cssStyleProto.getPropertyValue || null, this.setProperty = this.cssStyleProto.setProperty || null, this.cssText, t.nativeMethods.getOwnPropertyDescriptors(this.cssStyleProto, "cssText"), this.urlProps = ["background", "backgroundImage", "borderImage", "borderImageSource", "listStyle", "listStyleImage", "cursor"], this.dashedUrlProps = ["background", "background-image", "border-image", "border-image-source", "list-style", "list-style-image", "cursor"], this.propToDashed = {
                    background: "background",
                    backgroundImage: "background-image",
                    borderImage: "border-image",
                    borderImageSource: "border-image-source",
                    listStyle: "list-style",
                    listStyleImage: "list-style-image",
                    cursor: "cursor"
                }
            }
            overrideSetGetProperty() {
                this.ctx.override(this.cssStyleProto, "getPropertyValue", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    let [o] = i;
                    const s = new e({
                        property: o
                    }, t, r);
                    return this.emit("getPropertyValue", s), s.intercepted ? s.returnValue : s.target.call(s.that, s.data.property)
                })), this.ctx.override(this.cssStyleProto, "setProperty", ((t, r, i) => {
                    if (2 > i.length) return t.apply(r, i);
                    let [o, s] = i;
                    const n = new e({
                        property: o,
                        value: s
                    }, t, r);
                    return this.emit("setProperty", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.property, n.data.value)
                }))
            }
            overrideCssText() {
                this.ctx.overrideDescriptor(this.cssStyleProto, "cssText", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("getCssText", i), i.intercepted ? i.returnValue : i.data.value
                    },
                    set: (t, r, [i]) => {
                        const o = new e({
                            value: i
                        }, t, r);
                        return this.emit("setCssText", o), o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
        };
        const P = class extends t {
            constructor(t) {
                super(), this.ctx = t, this.window = this.ctx.window, this.IDBDatabase = this.window.IDBDatabase || {}, this.idbDatabaseProto = this.IDBDatabase.prototype || {}, this.IDBFactory = this.window.IDBFactory || {}, this.idbFactoryProto = this.IDBFactory.prototype || {}, this.open = this.idbFactoryProto.open
            }
            overrideOpen() {
                this.ctx.override(this.IDBFactory.prototype, "open", ((t, r, i) => {
                    if (!i.length) return t.apply(r, i);
                    if (!i.length) return t.apply(r, i);
                    const [o, s] = i, n = new e({
                        name: o,
                        version: s
                    }, t, r);
                    return this.emit("idbFactoryOpen", n), n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.version)
                }))
            }
            overrideName() {
                this.ctx.overrideDescriptor(this.idbDatabaseProto, "name", {
                    get: (t, r) => {
                        const i = new e({
                            value: t.call(r)
                        }, t, r);
                        return this.emit("idbFactoryName", i), i.intercepted ? i.returnValue : i.data.value
                    }
                })
            }
        };
        class x extends t {
            constructor(t = self, e = !t.window) {
                super(), this.window = t, this.nativeMethods = {
                    fnToString: this.window.Function.prototype.toString,
                    defineProperty: this.window.Object.defineProperty,
                    getOwnPropertyDescriptor: this.window.Object.getOwnPropertyDescriptor,
                    getOwnPropertyDescriptors: this.window.Object.getOwnPropertyDescriptors,
                    getOwnPropertyNames: this.window.Object.getOwnPropertyNames,
                    keys: this.window.Object.keys,
                    getOwnPropertySymbols: this.window.Object.getOwnPropertySymbols,
                    isArray: this.window.Array.isArray,
                    setPrototypeOf: this.window.Object.setPrototypeOf,
                    isExtensible: this.window.Object.isExtensible,
                    Map: this.window.Map,
                    Proxy: this.window.Proxy
                }, this.worker = e, this.fetch = new l(this), this.xhr = new c(this), this.idb = new P(this), this.history = new u(this), this.element = new o(this), this.node = new s(this), this.document = new i(this), this.function = new a(this), this.object = new h(this), this.message = new w(this), this.navigator = new v(this), this.eventSource = new d(this), this.attribute = new n(this), this.url = new g(this), this.workers = new m(this), this.location = new p(this), this.storage = new y(this), this.style = new f(this)
            }
            initLocation(t, e) {
                this.location = new p(this, e, t, this.worker)
            }
            override(t, e, r, i) {
                const o = this.wrap(t, e, r, i);
                return t[e] = o, o
            }
            overrideDescriptor(t, e, r = {}) {
                const i = this.wrapDescriptor(t, e, r);
                return i ? (this.nativeMethods.defineProperty(t, e, i), i) : {}
            }
            wrap(t, e, r, i) {
                const o = t[e];
                if (!o) return o;
                const s = "prototype" in o ? function() {
                    return r(o, this, [...arguments])
                } : {
                    attach() {
                        return r(o, this, [...arguments])
                    }
                }.attach;
                return i && (s.prototype = o.prototype, s.prototype.constructor = s), this.emit("wrap", o, s, !!i), s
            }
            wrapDescriptor(t, e, r = {}) {
                const i = this.nativeMethods.getOwnPropertyDescriptor(t, e);
                if (!i) return !1;
                for (let t in r) t in i && (i[t] = "get" === t || "set" === t ? this.wrap(i, t, r[t]) : "function" == typeof r[t] ? r[t](i[t]) : r[t]);
                return i
            }
        }
        "object" == typeof self && (self.UVClient = x)
    })()
})();
