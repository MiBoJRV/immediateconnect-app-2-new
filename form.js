(function (Et) {
    typeof define == "function" && define.amd ? define(Et) : Et()
})(function () {
    "use strict";

    function Et(e, t) {
        const n = Object.create(null), r = e.split(",");
        for (let o = 0; o < r.length; o++) n[r[o]] = !0;
        return t ? o => !!n[o.toLowerCase()] : o => !!n[o]
    }

    const wa = Et("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

    function Ao(e) {
        return !!e || e === ""
    }

    function ln(e) {
        if (F(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) {
                const r = e[n], o = ie(r) ? Pa(r) : ln(r);
                if (o) for (const s in o) t[s] = o[s]
            }
            return t
        } else {
            if (ie(e)) return e;
            if (Y(e)) return e
        }
    }

    const Ea = /;(?![^(]*\))/g, Ca = /:(.+)/;

    function Pa(e) {
        const t = {};
        return e.split(Ea).forEach(n => {
            if (n) {
                const r = n.split(Ca);
                r.length > 1 && (t[r[0].trim()] = r[1].trim())
            }
        }), t
    }

    function $e(e) {
        let t = "";
        if (ie(e)) t = e; else if (F(e)) for (let n = 0; n < e.length; n++) {
            const r = $e(e[n]);
            r && (t += r + " ")
        } else if (Y(e)) for (const n in e) e[n] && (t += n + " ");
        return t.trim()
    }

    function Sa(e, t) {
        if (e.length !== t.length) return !1;
        let n = !0;
        for (let r = 0; n && r < e.length; r++) n = ut(e[r], t[r]);
        return n
    }

    function ut(e, t) {
        if (e === t) return !0;
        let n = ko(e), r = ko(t);
        if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
        if (n = Vt(e), r = Vt(t), n || r) return e === t;
        if (n = F(e), r = F(t), n || r) return n && r ? Sa(e, t) : !1;
        if (n = Y(e), r = Y(t), n || r) {
            if (!n || !r) return !1;
            const o = Object.keys(e).length, s = Object.keys(t).length;
            if (o !== s) return !1;
            for (const i in e) {
                const a = e.hasOwnProperty(i), d = t.hasOwnProperty(i);
                if (a && !d || !a && d || !ut(e[i], t[i])) return !1
            }
        }
        return String(e) === String(t)
    }

    function Qn(e, t) {
        return e.findIndex(n => ut(n, t))
    }

    const ee = e => ie(e) ? e : e == null ? "" : F(e) || Y(e) && (e.toString === wo || !j(e.toString)) ? JSON.stringify(e, xo, 2) : String(e),
        xo = (e, t) => t && t.__v_isRef ? xo(e, t.value) : Pt(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})} : St(t) ? {[`Set(${t.size})`]: [...t.values()]} : Y(t) && !F(t) && !Eo(t) ? String(t) : t,
        V = {}, Ct = [], Te = () => {
        }, _a = () => !1, Ta = /^on[^a-z]/, cn = e => Ta.test(e), Xn = e => e.startsWith("onUpdate:"), se = Object.assign,
        er = (e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }, Na = Object.prototype.hasOwnProperty, z = (e, t) => Na.call(e, t), F = Array.isArray,
        Pt = e => Wt(e) === "[object Map]", St = e => Wt(e) === "[object Set]", ko = e => Wt(e) === "[object Date]",
        j = e => typeof e == "function", ie = e => typeof e == "string", Vt = e => typeof e == "symbol",
        Y = e => e !== null && typeof e == "object", tr = e => Y(e) && j(e.then) && j(e.catch),
        wo = Object.prototype.toString, Wt = e => wo.call(e), Oa = e => Wt(e).slice(8, -1),
        Eo = e => Wt(e) === "[object Object]",
        nr = e => ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
        un = Et(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
        fn = e => {
            const t = Object.create(null);
            return n => t[n] || (t[n] = e(n))
        }, Ma = /-(\w)/g, Qe = fn(e => e.replace(Ma, (t, n) => n ? n.toUpperCase() : "")), Ia = /\B([A-Z])/g,
        ze = fn(e => e.replace(Ia, "-$1").toLowerCase()), Co = fn(e => e.charAt(0).toUpperCase() + e.slice(1)),
        rr = fn(e => e ? `on${Co(e)}` : ""), Zt = (e, t) => !Object.is(e, t), $n = (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t)
        }, mn = (e, t, n) => {
            Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
        }, ft = e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t
        };
    let Po;
    const Ra = () => Po || (Po = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
    let Fe;

    class Fa {
        constructor(t = !1) {
            this.active = !0, this.effects = [], this.cleanups = [], !t && Fe && (this.parent = Fe, this.index = (Fe.scopes || (Fe.scopes = [])).push(this) - 1)
        }

        run(t) {
            if (this.active) {
                const n = Fe;
                try {
                    return Fe = this, t()
                } finally {
                    Fe = n
                }
            }
        }

        on() {
            Fe = this
        }

        off() {
            Fe = this.parent
        }

        stop(t) {
            if (this.active) {
                let n, r;
                for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
                for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
                if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
                if (this.parent && !t) {
                    const o = this.parent.scopes.pop();
                    o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index)
                }
                this.active = !1
            }
        }
    }

    function Ba(e, t = Fe) {
        t && t.active && t.effects.push(e)
    }

    const or = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    }, So = e => (e.w & Xe) > 0, _o = e => (e.n & Xe) > 0, La = ({deps: e}) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Xe
    }, Da = e => {
        const {deps: t} = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const o = t[r];
                So(o) && !_o(o) ? o.delete(e) : t[n++] = o, o.w &= ~Xe, o.n &= ~Xe
            }
            t.length = n
        }
    }, sr = new WeakMap;
    let qt = 0, Xe = 1;
    const ir = 30;
    let Ne;
    const $t = Symbol(""), ar = Symbol("");

    class dr {
        constructor(t, n = null, r) {
            this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ba(this, r)
        }

        run() {
            if (!this.active) return this.fn();
            let t = Ne, n = et;
            for (; t;) {
                if (t === this) return;
                t = t.parent
            }
            try {
                return this.parent = Ne, Ne = this, et = !0, Xe = 1 << ++qt, qt <= ir ? La(this) : To(this), this.fn()
            } finally {
                qt <= ir && Da(this), Xe = 1 << --qt, Ne = this.parent, et = n, this.parent = void 0, this.deferStop && this.stop()
            }
        }

        stop() {
            Ne === this ? this.deferStop = !0 : this.active && (To(this), this.onStop && this.onStop(), this.active = !1)
        }
    }

    function To(e) {
        const {deps: t} = e;
        if (t.length) {
            for (let n = 0; n < t.length; n++) t[n].delete(e);
            t.length = 0
        }
    }

    let et = !0;
    const No = [];

    function _t() {
        No.push(et), et = !1
    }

    function Tt() {
        const e = No.pop();
        et = e === void 0 ? !0 : e
    }

    function be(e, t, n) {
        if (et && Ne) {
            let r = sr.get(e);
            r || sr.set(e, r = new Map);
            let o = r.get(n);
            o || r.set(n, o = or()), Oo(o)
        }
    }

    function Oo(e, t) {
        let n = !1;
        qt <= ir ? _o(e) || (e.n |= Xe, n = !So(e)) : n = !e.has(Ne), n && (e.add(Ne), Ne.deps.push(e))
    }

    function Ge(e, t, n, r, o, s) {
        const i = sr.get(e);
        if (!i) return;
        let a = [];
        if (t === "clear") a = [...i.values()]; else if (n === "length" && F(e)) i.forEach((d, l) => {
            (l === "length" || l >= r) && a.push(d)
        }); else switch (n !== void 0 && a.push(i.get(n)), t) {
            case"add":
                F(e) ? nr(n) && a.push(i.get("length")) : (a.push(i.get($t)), Pt(e) && a.push(i.get(ar)));
                break;
            case"delete":
                F(e) || (a.push(i.get($t)), Pt(e) && a.push(i.get(ar)));
                break;
            case"set":
                Pt(e) && a.push(i.get($t));
                break
        }
        if (a.length === 1) a[0] && lr(a[0]); else {
            const d = [];
            for (const l of a) l && d.push(...l);
            lr(or(d))
        }
    }

    function lr(e, t) {
        const n = F(e) ? e : [...e];
        for (const r of n) r.computed && Mo(r);
        for (const r of n) r.computed || Mo(r)
    }

    function Mo(e, t) {
        (e !== Ne || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
    }

    const ja = Et("__proto__,__v_isRef,__isVue"),
        Io = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Vt)),
        Ua = cr(), za = cr(!1, !0), Ga = cr(!0), Ro = Ha();

    function Ha() {
        const e = {};
        return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
            e[t] = function (...n) {
                const r = G(this);
                for (let s = 0, i = this.length; s < i; s++) be(r, "get", s + "");
                const o = r[t](...n);
                return o === -1 || o === !1 ? r[t](...n.map(G)) : o
            }
        }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
            e[t] = function (...n) {
                _t();
                const r = G(this)[t].apply(this, n);
                return Tt(), r
            }
        }), e
    }

    function cr(e = !1, t = !1) {
        return function (r, o, s) {
            if (o === "__v_isReactive") return !e;
            if (o === "__v_isReadonly") return e;
            if (o === "__v_isShallow") return t;
            if (o === "__v_raw" && s === (e ? t ? id : Ho : t ? Go : zo).get(r)) return r;
            const i = F(r);
            if (!e && i && z(Ro, o)) return Reflect.get(Ro, o, s);
            const a = Reflect.get(r, o, s);
            return (Vt(o) ? Io.has(o) : ja(o)) || (e || be(r, "get", o), t) ? a : ae(a) ? i && nr(o) ? a : a.value : Y(a) ? e ? Ko(a) : mt(a) : a
        }
    }

    const Ka = Fo(), Va = Fo(!0);

    function Fo(e = !1) {
        return function (n, r, o, s) {
            let i = n[r];
            if (Ot(i) && ae(i) && !ae(o)) return !1;
            if (!e && (!An(o) && !Ot(o) && (i = G(i), o = G(o)), !F(n) && ae(i) && !ae(o))) return i.value = o, !0;
            const a = F(n) && nr(r) ? Number(r) < n.length : z(n, r), d = Reflect.set(n, r, o, s);
            return n === G(s) && (a ? Zt(o, i) && Ge(n, "set", r, o) : Ge(n, "add", r, o)), d
        }
    }

    function Wa(e, t) {
        const n = z(e, t);
        e[t];
        const r = Reflect.deleteProperty(e, t);
        return r && n && Ge(e, "delete", t, void 0), r
    }

    function Za(e, t) {
        const n = Reflect.has(e, t);
        return (!Vt(t) || !Io.has(t)) && be(e, "has", t), n
    }

    function qa(e) {
        return be(e, "iterate", F(e) ? "length" : $t), Reflect.ownKeys(e)
    }

    const Bo = {get: Ua, set: Ka, deleteProperty: Wa, has: Za, ownKeys: qa}, Ja = {
        get: Ga, set(e, t) {
            return !0
        }, deleteProperty(e, t) {
            return !0
        }
    }, Ya = se({}, Bo, {get: za, set: Va}), ur = e => e, gn = e => Reflect.getPrototypeOf(e);

    function hn(e, t, n = !1, r = !1) {
        e = e.__v_raw;
        const o = G(e), s = G(t);
        n || (t !== s && be(o, "get", t), be(o, "get", s));
        const {has: i} = gn(o), a = r ? ur : n ? mr : Jt;
        if (i.call(o, t)) return a(e.get(t));
        if (i.call(o, s)) return a(e.get(s));
        e !== o && e.get(t)
    }

    function pn(e, t = !1) {
        const n = this.__v_raw, r = G(n), o = G(e);
        return t || (e !== o && be(r, "has", e), be(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o)
    }

    function vn(e, t = !1) {
        return e = e.__v_raw, !t && be(G(e), "iterate", $t), Reflect.get(e, "size", e)
    }

    function Lo(e) {
        e = G(e);
        const t = G(this);
        return gn(t).has.call(t, e) || (t.add(e), Ge(t, "add", e, e)), this
    }

    function Do(e, t) {
        t = G(t);
        const n = G(this), {has: r, get: o} = gn(n);
        let s = r.call(n, e);
        s || (e = G(e), s = r.call(n, e));
        const i = o.call(n, e);
        return n.set(e, t), s ? Zt(t, i) && Ge(n, "set", e, t) : Ge(n, "add", e, t), this
    }

    function jo(e) {
        const t = G(this), {has: n, get: r} = gn(t);
        let o = n.call(t, e);
        o || (e = G(e), o = n.call(t, e)), r && r.call(t, e);
        const s = t.delete(e);
        return o && Ge(t, "delete", e, void 0), s
    }

    function Uo() {
        const e = G(this), t = e.size !== 0, n = e.clear();
        return t && Ge(e, "clear", void 0, void 0), n
    }

    function bn(e, t) {
        return function (r, o) {
            const s = this, i = s.__v_raw, a = G(i), d = t ? ur : e ? mr : Jt;
            return !e && be(a, "iterate", $t), i.forEach((l, u) => r.call(o, d(l), d(u), s))
        }
    }

    function yn(e, t, n) {
        return function (...r) {
            const o = this.__v_raw, s = G(o), i = Pt(s), a = e === "entries" || e === Symbol.iterator && i,
                d = e === "keys" && i, l = o[e](...r), u = n ? ur : t ? mr : Jt;
            return !t && be(s, "iterate", d ? ar : $t), {
                next() {
                    const {value: $, done: m} = l.next();
                    return m ? {value: $, done: m} : {value: a ? [u($[0]), u($[1])] : u($), done: m}
                }, [Symbol.iterator]() {
                    return this
                }
            }
        }
    }

    function tt(e) {
        return function (...t) {
            return e === "delete" ? !1 : this
        }
    }

    function Qa() {
        const e = {
            get(s) {
                return hn(this, s)
            }, get size() {
                return vn(this)
            }, has: pn, add: Lo, set: Do, delete: jo, clear: Uo, forEach: bn(!1, !1)
        }, t = {
            get(s) {
                return hn(this, s, !1, !0)
            }, get size() {
                return vn(this)
            }, has: pn, add: Lo, set: Do, delete: jo, clear: Uo, forEach: bn(!1, !0)
        }, n = {
            get(s) {
                return hn(this, s, !0)
            }, get size() {
                return vn(this, !0)
            }, has(s) {
                return pn.call(this, s, !0)
            }, add: tt("add"), set: tt("set"), delete: tt("delete"), clear: tt("clear"), forEach: bn(!0, !1)
        }, r = {
            get(s) {
                return hn(this, s, !0, !0)
            }, get size() {
                return vn(this, !0)
            }, has(s) {
                return pn.call(this, s, !0)
            }, add: tt("add"), set: tt("set"), delete: tt("delete"), clear: tt("clear"), forEach: bn(!0, !0)
        };
        return ["keys", "values", "entries", Symbol.iterator].forEach(s => {
            e[s] = yn(s, !1, !1), n[s] = yn(s, !0, !1), t[s] = yn(s, !1, !0), r[s] = yn(s, !0, !0)
        }), [e, n, t, r]
    }

    const [Xa, ed, td, nd] = Qa();

    function fr(e, t) {
        const n = t ? e ? nd : td : e ? ed : Xa;
        return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(z(n, o) && o in r ? n : r, o, s)
    }

    const rd = {get: fr(!1, !1)}, od = {get: fr(!1, !0)}, sd = {get: fr(!0, !1)}, zo = new WeakMap, Go = new WeakMap,
        Ho = new WeakMap, id = new WeakMap;

    function ad(e) {
        switch (e) {
            case"Object":
            case"Array":
                return 1;
            case"Map":
            case"Set":
            case"WeakMap":
            case"WeakSet":
                return 2;
            default:
                return 0
        }
    }

    function dd(e) {
        return e.__v_skip || !Object.isExtensible(e) ? 0 : ad(Oa(e))
    }

    function mt(e) {
        return Ot(e) ? e : $r(e, !1, Bo, rd, zo)
    }

    function ld(e) {
        return $r(e, !1, Ya, od, Go)
    }

    function Ko(e) {
        return $r(e, !0, Ja, sd, Ho)
    }

    function $r(e, t, n, r, o) {
        if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
        const s = o.get(e);
        if (s) return s;
        const i = dd(e);
        if (i === 0) return e;
        const a = new Proxy(e, i === 2 ? r : n);
        return o.set(e, a), a
    }

    function Nt(e) {
        return Ot(e) ? Nt(e.__v_raw) : !!(e && e.__v_isReactive)
    }

    function Ot(e) {
        return !!(e && e.__v_isReadonly)
    }

    function An(e) {
        return !!(e && e.__v_isShallow)
    }

    function Vo(e) {
        return Nt(e) || Ot(e)
    }

    function G(e) {
        const t = e && e.__v_raw;
        return t ? G(t) : e
    }

    function Wo(e) {
        return mn(e, "__v_skip", !0), e
    }

    const Jt = e => Y(e) ? mt(e) : e, mr = e => Y(e) ? Ko(e) : e;

    function Zo(e) {
        et && Ne && (e = G(e), Oo(e.dep || (e.dep = or())))
    }

    function qo(e, t) {
        e = G(e), e.dep && lr(e.dep)
    }

    function ae(e) {
        return !!(e && e.__v_isRef === !0)
    }

    function de(e) {
        return cd(e, !1)
    }

    function cd(e, t) {
        return ae(e) ? e : new ud(e, t)
    }

    class ud {
        constructor(t, n) {
            this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : G(t), this._value = n ? t : Jt(t)
        }

        get value() {
            return Zo(this), this._value
        }

        set value(t) {
            const n = this.__v_isShallow || An(t) || Ot(t);
            t = n ? t : G(t), Zt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Jt(t), qo(this))
        }
    }

    function te(e) {
        return ae(e) ? e.value : e
    }

    const fd = {
        get: (e, t, n) => te(Reflect.get(e, t, n)), set: (e, t, n, r) => {
            const o = e[t];
            return ae(o) && !ae(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r)
        }
    };

    function Jo(e) {
        return Nt(e) ? e : new Proxy(e, fd)
    }

    var Yo;

    class $d {
        constructor(t, n, r, o) {
            this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Yo] = !1, this._dirty = !0, this.effect = new dr(t, () => {
                this._dirty || (this._dirty = !0, qo(this))
            }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r
        }

        get value() {
            const t = G(this);
            return Zo(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
        }

        set value(t) {
            this._setter(t)
        }
    }

    Yo = "__v_isReadonly";

    function md(e, t, n = !1) {
        let r, o;
        const s = j(e);
        return s ? (r = e, o = Te) : (r = e.get, o = e.set), new $d(r, o, s || !o, n)
    }

    function nt(e, t, n, r) {
        let o;
        try {
            o = r ? e(...r) : e()
        } catch (s) {
            Yt(s, t, n)
        }
        return o
    }

    function Ee(e, t, n, r) {
        if (j(e)) {
            const s = nt(e, t, n, r);
            return s && tr(s) && s.catch(i => {
                Yt(i, t, n)
            }), s
        }
        const o = [];
        for (let s = 0; s < e.length; s++) o.push(Ee(e[s], t, n, r));
        return o
    }

    function Yt(e, t, n, r = !0) {
        const o = t ? t.vnode : null;
        if (t) {
            let s = t.parent;
            const i = t.proxy, a = n;
            for (; s;) {
                const l = s.ec;
                if (l) {
                    for (let u = 0; u < l.length; u++) if (l[u](e, i, a) === !1) return
                }
                s = s.parent
            }
            const d = t.appContext.config.errorHandler;
            if (d) {
                nt(d, null, 10, [e, i, a]);
                return
            }
        }
        gd(e, n, o, r)
    }

    function gd(e, t, n, r = !0) {
        console.error(e)
    }

    let Qt = !1, gr = !1;
    const fe = [];
    let Be = 0;
    const Mt = [];
    let He = null, gt = 0;
    const Qo = Promise.resolve();
    let hr = null;

    function pr(e) {
        const t = hr || Qo;
        return e ? t.then(this ? e.bind(this) : e) : t
    }

    function hd(e) {
        let t = Be + 1, n = fe.length;
        for (; t < n;) {
            const r = t + n >>> 1;
            Xt(fe[r]) < e ? t = r + 1 : n = r
        }
        return t
    }

    function vr(e) {
        (!fe.length || !fe.includes(e, Qt && e.allowRecurse ? Be + 1 : Be)) && (e.id == null ? fe.push(e) : fe.splice(hd(e.id), 0, e), Xo())
    }

    function Xo() {
        !Qt && !gr && (gr = !0, hr = Qo.then(rs))
    }

    function pd(e) {
        const t = fe.indexOf(e);
        t > Be && fe.splice(t, 1)
    }

    function es(e) {
        F(e) ? Mt.push(...e) : (!He || !He.includes(e, e.allowRecurse ? gt + 1 : gt)) && Mt.push(e), Xo()
    }

    function ts(e, t = Qt ? Be + 1 : 0) {
        for (; t < fe.length; t++) {
            const n = fe[t];
            n && n.pre && (fe.splice(t, 1), t--, n())
        }
    }

    function ns(e) {
        if (Mt.length) {
            const t = [...new Set(Mt)];
            if (Mt.length = 0, He) {
                He.push(...t);
                return
            }
            for (He = t, He.sort((n, r) => Xt(n) - Xt(r)), gt = 0; gt < He.length; gt++) He[gt]();
            He = null, gt = 0
        }
    }

    const Xt = e => e.id == null ? 1 / 0 : e.id, vd = (e, t) => {
        const n = Xt(e) - Xt(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

    function rs(e) {
        gr = !1, Qt = !0, fe.sort(vd);
        const t = Te;
        try {
            for (Be = 0; Be < fe.length; Be++) {
                const n = fe[Be];
                n && n.active !== !1 && nt(n, null, 14)
            }
        } finally {
            Be = 0, fe.length = 0, ns(), Qt = !1, hr = null, (fe.length || Mt.length) && rs()
        }
    }

    function bd(e, t, ...n) {
        if (e.isUnmounted) return;
        const r = e.vnode.props || V;
        let o = n;
        const s = t.startsWith("update:"), i = s && t.slice(7);
        if (i && i in r) {
            const u = `${i === "modelValue" ? "model" : i}Modifiers`, {number: $, trim: m} = r[u] || V;
            m && (o = n.map(g => g.trim())), $ && (o = n.map(ft))
        }
        let a, d = r[a = rr(t)] || r[a = rr(Qe(t))];
        !d && s && (d = r[a = rr(ze(t))]), d && Ee(d, e, 6, o);
        const l = r[a + "Once"];
        if (l) {
            if (!e.emitted) e.emitted = {}; else if (e.emitted[a]) return;
            e.emitted[a] = !0, Ee(l, e, 6, o)
        }
    }

    function os(e, t, n = !1) {
        const r = t.emitsCache, o = r.get(e);
        if (o !== void 0) return o;
        const s = e.emits;
        let i = {}, a = !1;
        if (!j(e)) {
            const d = l => {
                const u = os(l, t, !0);
                u && (a = !0, se(i, u))
            };
            !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d)
        }
        return !s && !a ? (Y(e) && r.set(e, null), null) : (F(s) ? s.forEach(d => i[d] = null) : se(i, s), Y(e) && r.set(e, i), i)
    }

    function xn(e, t) {
        return !e || !cn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), z(e, t[0].toLowerCase() + t.slice(1)) || z(e, ze(t)) || z(e, t))
    }

    let Oe = null, kn = null;

    function wn(e) {
        const t = Oe;
        return Oe = e, kn = e && e.type.__scopeId || null, t
    }

    function yd(e) {
        kn = e
    }

    function Ad() {
        kn = null
    }

    function ss(e, t = Oe, n) {
        if (!t || e._n) return e;
        const r = (...o) => {
            r._d && Ms(-1);
            const s = wn(t), i = e(...o);
            return wn(s), r._d && Ms(1), i
        };
        return r._n = !0, r._c = !0, r._d = !0, r
    }

    function t2() {
    }

    function br(e) {
        const {
            type: t,
            vnode: n,
            proxy: r,
            withProxy: o,
            props: s,
            propsOptions: [i],
            slots: a,
            attrs: d,
            emit: l,
            render: u,
            renderCache: $,
            data: m,
            setupState: g,
            ctx: y,
            inheritAttrs: x
        } = e;
        let S, P;
        const E = wn(e);
        try {
            if (n.shapeFlag & 4) {
                const N = o || r;
                S = Me(u.call(N, N, $, s, g, m, y)), P = d
            } else {
                const N = t;
                S = Me(N.length > 1 ? N(s, {attrs: d, slots: a, emit: l}) : N(s, null)), P = t.props ? d : kd(d)
            }
        } catch (N) {
            nn.length = 0, Yt(N, e, 1), S = ge(ye)
        }
        let p = S;
        if (P && x !== !1) {
            const N = Object.keys(P), {shapeFlag: T} = p;
            N.length && T & 7 && (i && N.some(Xn) && (P = wd(P, i)), p = rt(p, P))
        }
        return n.dirs && (p = rt(p), p.dirs = p.dirs ? p.dirs.concat(n.dirs) : n.dirs), n.transition && (p.transition = n.transition), S = p, wn(E), S
    }

    function xd(e) {
        let t;
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            if (Fs(r)) {
                if (r.type !== ye || r.children === "v-if") {
                    if (t) return;
                    t = r
                }
            } else return
        }
        return t
    }

    const kd = e => {
        let t;
        for (const n in e) (n === "class" || n === "style" || cn(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    }, wd = (e, t) => {
        const n = {};
        for (const r in e) (!Xn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n
    };

    function Ed(e, t, n) {
        const {props: r, children: o, component: s} = e, {props: i, children: a, patchFlag: d} = t, l = s.emitsOptions;
        if (t.dirs || t.transition) return !0;
        if (n && d >= 0) {
            if (d & 1024) return !0;
            if (d & 16) return r ? is(r, i, l) : !!i;
            if (d & 8) {
                const u = t.dynamicProps;
                for (let $ = 0; $ < u.length; $++) {
                    const m = u[$];
                    if (i[m] !== r[m] && !xn(l, m)) return !0
                }
            }
        } else return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? is(r, i, l) : !0 : !!i;
        return !1
    }

    function is(e, t, n) {
        const r = Object.keys(t);
        if (r.length !== Object.keys(e).length) return !0;
        for (let o = 0; o < r.length; o++) {
            const s = r[o];
            if (t[s] !== e[s] && !xn(n, s)) return !0
        }
        return !1
    }

    function yr({vnode: e, parent: t}, n) {
        for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
    }

    const Cd = e => e.__isSuspense, Pd = {
        name: "Suspense", __isSuspense: !0, process(e, t, n, r, o, s, i, a, d, l) {
            e == null ? Sd(t, n, r, o, s, i, a, d, l) : _d(e, t, n, r, o, i, a, d, l)
        }, hydrate: Td, create: Ar, normalize: Nd
    };

    function en(e, t) {
        const n = e.props && e.props[t];
        j(n) && n()
    }

    function Sd(e, t, n, r, o, s, i, a, d) {
        const {p: l, o: {createElement: u}} = d, $ = u("div"), m = e.suspense = Ar(e, o, r, t, $, n, s, i, a, d);
        l(null, m.pendingBranch = e.ssContent, $, null, r, m, s, i), m.deps > 0 ? (en(e, "onPending"), en(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, s, i), It(m, e.ssFallback)) : m.resolve()
    }

    function _d(e, t, n, r, o, s, i, a, {p: d, um: l, o: {createElement: u}}) {
        const $ = t.suspense = e.suspense;
        $.vnode = t, t.el = e.el;
        const m = t.ssContent, g = t.ssFallback, {
            activeBranch: y,
            pendingBranch: x,
            isInFallback: S,
            isHydrating: P
        } = $;
        if (x) $.pendingBranch = m, Le(m, x) ? (d(x, m, $.hiddenContainer, null, o, $, s, i, a), $.deps <= 0 ? $.resolve() : S && (d(y, g, n, r, o, null, s, i, a), It($, g))) : ($.pendingId++, P ? ($.isHydrating = !1, $.activeBranch = x) : l(x, o, $), $.deps = 0, $.effects.length = 0, $.hiddenContainer = u("div"), S ? (d(null, m, $.hiddenContainer, null, o, $, s, i, a), $.deps <= 0 ? $.resolve() : (d(y, g, n, r, o, null, s, i, a), It($, g))) : y && Le(m, y) ? (d(y, m, n, r, o, $, s, i, a), $.resolve(!0)) : (d(null, m, $.hiddenContainer, null, o, $, s, i, a), $.deps <= 0 && $.resolve())); else if (y && Le(m, y)) d(y, m, n, r, o, $, s, i, a), It($, m); else if (en(t, "onPending"), $.pendingBranch = m, $.pendingId++, d(null, m, $.hiddenContainer, null, o, $, s, i, a), $.deps <= 0) $.resolve(); else {
            const {timeout: E, pendingId: p} = $;
            E > 0 ? setTimeout(() => {
                $.pendingId === p && $.fallback(g)
            }, E) : E === 0 && $.fallback(g)
        }
    }

    function Ar(e, t, n, r, o, s, i, a, d, l, u = !1) {
        const {p: $, m, um: g, n: y, o: {parentNode: x, remove: S}} = l, P = ft(e.props && e.props.timeout), E = {
            vnode: e,
            parent: t,
            parentComponent: n,
            isSVG: i,
            container: r,
            hiddenContainer: o,
            anchor: s,
            deps: 0,
            pendingId: 0,
            timeout: typeof P == "number" ? P : -1,
            activeBranch: null,
            pendingBranch: null,
            isInFallback: !0,
            isHydrating: u,
            isUnmounted: !1,
            effects: [],
            resolve(p = !1) {
                const {
                    vnode: N,
                    activeBranch: T,
                    pendingBranch: L,
                    pendingId: W,
                    effects: M,
                    parentComponent: Z,
                    container: H
                } = E;
                if (E.isHydrating) E.isHydrating = !1; else if (!p) {
                    const _e = T && L.transition && L.transition.mode === "out-in";
                    _e && (T.transition.afterLeave = () => {
                        W === E.pendingId && m(L, H, Je, 0)
                    });
                    let {anchor: Je} = E;
                    T && (Je = y(T), g(T, Z, E, !0)), _e || m(L, H, Je, 0)
                }
                It(E, L), E.pendingBranch = null, E.isInFallback = !1;
                let Q = E.parent, ke = !1;
                for (; Q;) {
                    if (Q.pendingBranch) {
                        Q.effects.push(...M), ke = !0;
                        break
                    }
                    Q = Q.parent
                }
                ke || es(M), E.effects = [], en(N, "onResolve")
            },
            fallback(p) {
                if (!E.pendingBranch) return;
                const {vnode: N, activeBranch: T, parentComponent: L, container: W, isSVG: M} = E;
                en(N, "onFallback");
                const Z = y(T), H = () => {
                    !E.isInFallback || ($(null, p, W, Z, L, null, M, a, d), It(E, p))
                }, Q = p.transition && p.transition.mode === "out-in";
                Q && (T.transition.afterLeave = H), E.isInFallback = !0, g(T, L, null, !0), Q || H()
            },
            move(p, N, T) {
                E.activeBranch && m(E.activeBranch, p, N, T), E.container = p
            },
            next() {
                return E.activeBranch && y(E.activeBranch)
            },
            registerDep(p, N) {
                const T = !!E.pendingBranch;
                T && E.deps++;
                const L = p.vnode.el;
                p.asyncDep.catch(W => {
                    Yt(W, p, 0)
                }).then(W => {
                    if (p.isUnmounted || E.isUnmounted || E.pendingId !== p.suspenseId) return;
                    p.asyncResolved = !0;
                    const {vnode: M} = p;
                    Dr(p, W, !1), L && (M.el = L);
                    const Z = !L && p.subTree.el;
                    N(p, M, x(L || p.subTree.el), L ? null : y(p.subTree), E, i, d), Z && S(Z), yr(p, M.el), T && --E.deps === 0 && E.resolve()
                })
            },
            unmount(p, N) {
                E.isUnmounted = !0, E.activeBranch && g(E.activeBranch, n, p, N), E.pendingBranch && g(E.pendingBranch, n, p, N)
            }
        };
        return E
    }

    function Td(e, t, n, r, o, s, i, a, d) {
        const l = t.suspense = Ar(t, r, n, e.parentNode, document.createElement("div"), null, o, s, i, a, !0),
            u = d(e, l.pendingBranch = t.ssContent, n, l, s, i);
        return l.deps === 0 && l.resolve(), u
    }

    function Nd(e) {
        const {shapeFlag: t, children: n} = e, r = t & 32;
        e.ssContent = as(r ? n.default : n), e.ssFallback = r ? as(n.fallback) : ge(ye)
    }

    function as(e) {
        let t;
        if (j(e)) {
            const n = Rt && e._c;
            n && (e._d = !1, ne()), e = e(), n && (e._d = !0, t = Se, Os())
        }
        return F(e) && (e = xd(e)), e = Me(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter(n => n !== e)), e
    }

    function Od(e, t) {
        t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : es(e)
    }

    function It(e, t) {
        e.activeBranch = t;
        const {vnode: n, parentComponent: r} = e, o = n.el = t.el;
        r && r.subTree === n && (r.vnode.el = o, yr(r, o))
    }

    function Md(e, t) {
        if (ce) {
            let n = ce.provides;
            const r = ce.parent && ce.parent.provides;
            r === n && (n = ce.provides = Object.create(r)), n[e] = t
        }
    }

    function xr(e, t, n = !1) {
        const r = ce || Oe;
        if (r) {
            const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
            if (o && e in o) return o[e];
            if (arguments.length > 1) return n && j(t) ? t.call(r.proxy) : t
        }
    }

    const ds = {};

    function kr(e, t, n) {
        return ls(e, t, n)
    }

    function ls(e, t, {immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i} = V) {
        const a = ce;
        let d, l = !1, u = !1;
        if (ae(e) ? (d = () => e.value, l = An(e)) : Nt(e) ? (d = () => e, r = !0) : F(e) ? (u = !0, l = e.some(P => Nt(P) || An(P)), d = () => e.map(P => {
            if (ae(P)) return P.value;
            if (Nt(P)) return ht(P);
            if (j(P)) return nt(P, a, 2)
        })) : j(e) ? t ? d = () => nt(e, a, 2) : d = () => {
            if (!(a && a.isUnmounted)) return $ && $(), Ee(e, a, 3, [m])
        } : d = Te, t && r) {
            const P = d;
            d = () => ht(P())
        }
        let $, m = P => {
            $ = S.onStop = () => {
                nt(P, a, 4)
            }
        };
        if (rn) return m = Te, t ? n && Ee(t, a, 3, [d(), u ? [] : void 0, m]) : d(), Te;
        let g = u ? [] : ds;
        const y = () => {
            if (!!S.active) if (t) {
                const P = S.run();
                (r || l || (u ? P.some((E, p) => Zt(E, g[p])) : Zt(P, g))) && ($ && $(), Ee(t, a, 3, [P, g === ds ? void 0 : g, m]), g = P)
            } else S.run()
        };
        y.allowRecurse = !!t;
        let x;
        o === "sync" ? x = y : o === "post" ? x = () => pe(y, a && a.suspense) : (y.pre = !0, a && (y.id = a.uid), x = () => vr(y));
        const S = new dr(d, x);
        return t ? n ? y() : g = S.run() : o === "post" ? pe(S.run.bind(S), a && a.suspense) : S.run(), () => {
            S.stop(), a && a.scope && er(a.scope.effects, S)
        }
    }

    function Id(e, t, n) {
        const r = this.proxy, o = ie(e) ? e.includes(".") ? cs(r, e) : () => r[e] : e.bind(r, r);
        let s;
        j(t) ? s = t : (s = t.handler, n = t);
        const i = ce;
        it(this);
        const a = ls(o, s.bind(r), n);
        return i ? it(i) : at(), a
    }

    function cs(e, t) {
        const n = t.split(".");
        return () => {
            let r = e;
            for (let o = 0; o < n.length && r; o++) r = r[n[o]];
            return r
        }
    }

    function ht(e, t) {
        if (!Y(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
        if (t.add(e), ae(e)) ht(e.value, t); else if (F(e)) for (let n = 0; n < e.length; n++) ht(e[n], t); else if (St(e) || Pt(e)) e.forEach(n => {
            ht(n, t)
        }); else if (Eo(e)) for (const n in e) ht(e[n], t);
        return e
    }

    function Rd() {
        const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
        return Pr(() => {
            e.isMounted = !0
        }), gs(() => {
            e.isUnmounting = !0
        }), e
    }

    const Ce = [Function, Array], Fd = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Ce,
            onEnter: Ce,
            onAfterEnter: Ce,
            onEnterCancelled: Ce,
            onBeforeLeave: Ce,
            onLeave: Ce,
            onAfterLeave: Ce,
            onLeaveCancelled: Ce,
            onBeforeAppear: Ce,
            onAppear: Ce,
            onAfterAppear: Ce,
            onAppearCancelled: Ce
        },
        setup(e, {slots: t}) {
            const n = Ds(), r = Rd();
            let o;
            return () => {
                const s = t.default && $s(t.default(), !0);
                if (!s || !s.length) return;
                let i = s[0];
                if (s.length > 1) {
                    for (const x of s) if (x.type !== ye) {
                        i = x;
                        break
                    }
                }
                const a = G(e), {mode: d} = a;
                if (r.isLeaving) return Er(i);
                const l = fs(i);
                if (!l) return Er(i);
                const u = wr(l, a, r, n);
                Cr(l, u);
                const $ = n.subTree, m = $ && fs($);
                let g = !1;
                const {getTransitionKey: y} = l.type;
                if (y) {
                    const x = y();
                    o === void 0 ? o = x : x !== o && (o = x, g = !0)
                }
                if (m && m.type !== ye && (!Le(l, m) || g)) {
                    const x = wr(m, a, r, n);
                    if (Cr(m, x), d === "out-in") return r.isLeaving = !0, x.afterLeave = () => {
                        r.isLeaving = !1, n.update()
                    }, Er(i);
                    d === "in-out" && l.type !== ye && (x.delayLeave = (S, P, E) => {
                        const p = us(r, m);
                        p[String(m.key)] = m, S._leaveCb = () => {
                            P(), S._leaveCb = void 0, delete u.delayedLeave
                        }, u.delayedLeave = E
                    })
                }
                return i
            }
        }
    };

    function us(e, t) {
        const {leavingVNodes: n} = e;
        let r = n.get(t.type);
        return r || (r = Object.create(null), n.set(t.type, r)), r
    }

    function wr(e, t, n, r) {
        const {
            appear: o,
            mode: s,
            persisted: i = !1,
            onBeforeEnter: a,
            onEnter: d,
            onAfterEnter: l,
            onEnterCancelled: u,
            onBeforeLeave: $,
            onLeave: m,
            onAfterLeave: g,
            onLeaveCancelled: y,
            onBeforeAppear: x,
            onAppear: S,
            onAfterAppear: P,
            onAppearCancelled: E
        } = t, p = String(e.key), N = us(n, e), T = (M, Z) => {
            M && Ee(M, r, 9, Z)
        }, L = (M, Z) => {
            const H = Z[1];
            T(M, Z), F(M) ? M.every(Q => Q.length <= 1) && H() : M.length <= 1 && H()
        }, W = {
            mode: s, persisted: i, beforeEnter(M) {
                let Z = a;
                if (!n.isMounted) if (o) Z = x || a; else return;
                M._leaveCb && M._leaveCb(!0);
                const H = N[p];
                H && Le(e, H) && H.el._leaveCb && H.el._leaveCb(), T(Z, [M])
            }, enter(M) {
                let Z = d, H = l, Q = u;
                if (!n.isMounted) if (o) Z = S || d, H = P || l, Q = E || u; else return;
                let ke = !1;
                const _e = M._enterCb = Je => {
                    ke || (ke = !0, Je ? T(Q, [M]) : T(H, [M]), W.delayedLeave && W.delayedLeave(), M._enterCb = void 0)
                };
                Z ? L(Z, [M, _e]) : _e()
            }, leave(M, Z) {
                const H = String(e.key);
                if (M._enterCb && M._enterCb(!0), n.isUnmounting) return Z();
                T($, [M]);
                let Q = !1;
                const ke = M._leaveCb = _e => {
                    Q || (Q = !0, Z(), _e ? T(y, [M]) : T(g, [M]), M._leaveCb = void 0, N[H] === e && delete N[H])
                };
                N[H] = e, m ? L(m, [M, ke]) : ke()
            }, clone(M) {
                return wr(M, t, n, r)
            }
        };
        return W
    }

    function Er(e) {
        if (Cn(e)) return e = rt(e), e.children = null, e
    }

    function fs(e) {
        return Cn(e) ? e.children ? e.children[0] : void 0 : e
    }

    function Cr(e, t) {
        e.shapeFlag & 6 && e.component ? Cr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
    }

    function $s(e, t = !1, n) {
        let r = [], o = 0;
        for (let s = 0; s < e.length; s++) {
            let i = e[s];
            const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
            i.type === Pe ? (i.patchFlag & 128 && o++, r = r.concat($s(i.children, t, a))) : (t || i.type !== ye) && r.push(a != null ? rt(i, {key: a}) : i)
        }
        if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
        return r
    }

    function tn(e) {
        return j(e) ? {setup: e, name: e.name} : e
    }

    const En = e => !!e.type.__asyncLoader, Cn = e => e.type.__isKeepAlive;

    function Bd(e, t) {
        ms(e, "a", t)
    }

    function Ld(e, t) {
        ms(e, "da", t)
    }

    function ms(e, t, n = ce) {
        const r = e.__wdc || (e.__wdc = () => {
            let o = n;
            for (; o;) {
                if (o.isDeactivated) return;
                o = o.parent
            }
            return e()
        });
        if (Pn(t, r, n), n) {
            let o = n.parent;
            for (; o && o.parent;) Cn(o.parent.vnode) && Dd(r, t, n, o), o = o.parent
        }
    }

    function Dd(e, t, n, r) {
        const o = Pn(t, e, r, !0);
        hs(() => {
            er(r[t], o)
        }, n)
    }

    function Pn(e, t, n = ce, r = !1) {
        if (n) {
            const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
                if (n.isUnmounted) return;
                _t(), it(n);
                const a = Ee(t, n, e, i);
                return at(), Tt(), a
            });
            return r ? o.unshift(s) : o.push(s), s
        }
    }

    const Ke = e => (t, n = ce) => (!rn || e === "sp") && Pn(e, (...r) => t(...r), n), jd = Ke("bm"), Pr = Ke("m"),
        Ud = Ke("bu"), zd = Ke("u"), gs = Ke("bum"), hs = Ke("um"), Gd = Ke("sp"), Hd = Ke("rtg"), Kd = Ke("rtc");

    function Vd(e, t = ce) {
        Pn("ec", e, t)
    }

    function Sr(e, t) {
        const n = Oe;
        if (n === null) return e;
        const r = On(n) || n.proxy, o = e.dirs || (e.dirs = []);
        for (let s = 0; s < t.length; s++) {
            let [i, a, d, l = V] = t[s];
            j(i) && (i = {mounted: i, updated: i}), i.deep && ht(a), o.push({
                dir: i,
                instance: r,
                value: a,
                oldValue: void 0,
                arg: d,
                modifiers: l
            })
        }
        return e
    }

    function pt(e, t, n, r) {
        const o = e.dirs, s = t && t.dirs;
        for (let i = 0; i < o.length; i++) {
            const a = o[i];
            s && (a.oldValue = s[i].value);
            let d = a.dir[r];
            d && (_t(), Ee(d, n, 8, [e.el, a, e, t]), Tt())
        }
    }

    const Wd = Symbol();

    function ps(e, t, n, r) {
        let o;
        const s = n && n[r];
        if (F(e) || ie(e)) {
            o = new Array(e.length);
            for (let i = 0, a = e.length; i < a; i++) o[i] = t(e[i], i, void 0, s && s[i])
        } else if (typeof e == "number") {
            o = new Array(e);
            for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i])
        } else if (Y(e)) if (e[Symbol.iterator]) o = Array.from(e, (i, a) => t(i, a, void 0, s && s[a])); else {
            const i = Object.keys(e);
            o = new Array(i.length);
            for (let a = 0, d = i.length; a < d; a++) {
                const l = i[a];
                o[a] = t(e[l], l, a, s && s[a])
            }
        } else o = [];
        return n && (n[r] = o), o
    }

    const _r = e => e ? js(e) ? On(e) || e.proxy : _r(e.parent) : null, Sn = se(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => _r(e.parent),
        $root: e => _r(e.root),
        $emit: e => e.emit,
        $options: e => Nr(e),
        $forceUpdate: e => e.f || (e.f = () => vr(e.update)),
        $nextTick: e => e.n || (e.n = pr.bind(e.proxy)),
        $watch: e => Id.bind(e)
    }), Zd = {
        get({_: e}, t) {
            const {ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: d} = e;
            let l;
            if (t[0] !== "$") {
                const g = i[t];
                if (g !== void 0) switch (g) {
                    case 1:
                        return r[t];
                    case 2:
                        return o[t];
                    case 4:
                        return n[t];
                    case 3:
                        return s[t]
                } else {
                    if (r !== V && z(r, t)) return i[t] = 1, r[t];
                    if (o !== V && z(o, t)) return i[t] = 2, o[t];
                    if ((l = e.propsOptions[0]) && z(l, t)) return i[t] = 3, s[t];
                    if (n !== V && z(n, t)) return i[t] = 4, n[t];
                    Tr && (i[t] = 0)
                }
            }
            const u = Sn[t];
            let $, m;
            if (u) return t === "$attrs" && be(e, "get", t), u(e);
            if (($ = a.__cssModules) && ($ = $[t])) return $;
            if (n !== V && z(n, t)) return i[t] = 4, n[t];
            if (m = d.config.globalProperties, z(m, t)) return m[t]
        }, set({_: e}, t, n) {
            const {data: r, setupState: o, ctx: s} = e;
            return o !== V && z(o, t) ? (o[t] = n, !0) : r !== V && z(r, t) ? (r[t] = n, !0) : z(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0)
        }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s}}, i) {
            let a;
            return !!n[i] || e !== V && z(e, i) || t !== V && z(t, i) || (a = s[0]) && z(a, i) || z(r, i) || z(Sn, i) || z(o.config.globalProperties, i)
        }, defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : z(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };
    let Tr = !0;

    function qd(e) {
        const t = Nr(e), n = e.proxy, r = e.ctx;
        Tr = !1, t.beforeCreate && vs(t.beforeCreate, e, "bc");
        const {
            data: o,
            computed: s,
            methods: i,
            watch: a,
            provide: d,
            inject: l,
            created: u,
            beforeMount: $,
            mounted: m,
            beforeUpdate: g,
            updated: y,
            activated: x,
            deactivated: S,
            beforeDestroy: P,
            beforeUnmount: E,
            destroyed: p,
            unmounted: N,
            render: T,
            renderTracked: L,
            renderTriggered: W,
            errorCaptured: M,
            serverPrefetch: Z,
            expose: H,
            inheritAttrs: Q,
            components: ke,
            directives: _e,
            filters: Je
        } = t;
        if (l && Jd(l, r, null, e.appContext.config.unwrapInjectedRef), i) for (const X in i) {
            const q = i[X];
            j(q) && (r[X] = q.bind(n))
        }
        if (o) {
            const X = o.call(n, n);
            Y(X) && (e.data = mt(X))
        }
        if (Tr = !0, s) for (const X in s) {
            const q = s[X], kt = j(q) ? q.bind(n, n) : j(q.get) ? q.get.bind(n, n) : Te,
                Jn = !j(q) && j(q.set) ? q.set.bind(n) : Te, wt = Gs({get: kt, set: Jn});
            Object.defineProperty(r, X, {
                enumerable: !0,
                configurable: !0,
                get: () => wt.value,
                set: je => wt.value = je
            })
        }
        if (a) for (const X in a) bs(a[X], r, n, X);
        if (d) {
            const X = j(d) ? d.call(n) : d;
            Reflect.ownKeys(X).forEach(q => {
                Md(q, X[q])
            })
        }
        u && vs(u, e, "c");

        function he(X, q) {
            F(q) ? q.forEach(kt => X(kt.bind(n))) : q && X(q.bind(n))
        }

        if (he(jd, $), he(Pr, m), he(Ud, g), he(zd, y), he(Bd, x), he(Ld, S), he(Vd, M), he(Kd, L), he(Hd, W), he(gs, E), he(hs, N), he(Gd, Z), F(H)) if (H.length) {
            const X = e.exposed || (e.exposed = {});
            H.forEach(q => {
                Object.defineProperty(X, q, {get: () => n[q], set: kt => n[q] = kt})
            })
        } else e.exposed || (e.exposed = {});
        T && e.render === Te && (e.render = T), Q != null && (e.inheritAttrs = Q), ke && (e.components = ke), _e && (e.directives = _e)
    }

    function Jd(e, t, n = Te, r = !1) {
        F(e) && (e = Or(e));
        for (const o in e) {
            const s = e[o];
            let i;
            Y(s) ? "default" in s ? i = xr(s.from || o, s.default, !0) : i = xr(s.from || o) : i = xr(s), ae(i) && r ? Object.defineProperty(t, o, {
                enumerable: !0,
                configurable: !0,
                get: () => i.value,
                set: a => i.value = a
            }) : t[o] = i
        }
    }

    function vs(e, t, n) {
        Ee(F(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
    }

    function bs(e, t, n, r) {
        const o = r.includes(".") ? cs(n, r) : () => n[r];
        if (ie(e)) {
            const s = t[e];
            j(s) && kr(o, s)
        } else if (j(e)) kr(o, e.bind(n)); else if (Y(e)) if (F(e)) e.forEach(s => bs(s, t, n, r)); else {
            const s = j(e.handler) ? e.handler.bind(n) : t[e.handler];
            j(s) && kr(o, s, e)
        }
    }

    function Nr(e) {
        const t = e.type, {mixins: n, extends: r} = t, {
            mixins: o,
            optionsCache: s,
            config: {optionMergeStrategies: i}
        } = e.appContext, a = s.get(t);
        let d;
        return a ? d = a : !o.length && !n && !r ? d = t : (d = {}, o.length && o.forEach(l => _n(d, l, i, !0)), _n(d, t, i)), Y(t) && s.set(t, d), d
    }

    function _n(e, t, n, r = !1) {
        const {mixins: o, extends: s} = t;
        s && _n(e, s, n, !0), o && o.forEach(i => _n(e, i, n, !0));
        for (const i in t) if (!(r && i === "expose")) {
            const a = Yd[i] || n && n[i];
            e[i] = a ? a(e[i], t[i]) : t[i]
        }
        return e
    }

    const Yd = {
        data: ys,
        props: vt,
        emits: vt,
        methods: vt,
        computed: vt,
        beforeCreate: me,
        created: me,
        beforeMount: me,
        mounted: me,
        beforeUpdate: me,
        updated: me,
        beforeDestroy: me,
        beforeUnmount: me,
        destroyed: me,
        unmounted: me,
        activated: me,
        deactivated: me,
        errorCaptured: me,
        serverPrefetch: me,
        components: vt,
        directives: vt,
        watch: Xd,
        provide: ys,
        inject: Qd
    };

    function ys(e, t) {
        return t ? e ? function () {
            return se(j(e) ? e.call(this, this) : e, j(t) ? t.call(this, this) : t)
        } : t : e
    }

    function Qd(e, t) {
        return vt(Or(e), Or(t))
    }

    function Or(e) {
        if (F(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
            return t
        }
        return e
    }

    function me(e, t) {
        return e ? [...new Set([].concat(e, t))] : t
    }

    function vt(e, t) {
        return e ? se(se(Object.create(null), e), t) : t
    }

    function Xd(e, t) {
        if (!e) return t;
        if (!t) return e;
        const n = se(Object.create(null), e);
        for (const r in t) n[r] = me(e[r], t[r]);
        return n
    }

    function el(e, t, n, r = !1) {
        const o = {}, s = {};
        mn(s, Tn, 1), e.propsDefaults = Object.create(null), As(e, t, o, s);
        for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
        n ? e.props = r ? o : ld(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s
    }

    function tl(e, t, n, r) {
        const {props: o, attrs: s, vnode: {patchFlag: i}} = e, a = G(o), [d] = e.propsOptions;
        let l = !1;
        if ((r || i > 0) && !(i & 16)) {
            if (i & 8) {
                const u = e.vnode.dynamicProps;
                for (let $ = 0; $ < u.length; $++) {
                    let m = u[$];
                    if (xn(e.emitsOptions, m)) continue;
                    const g = t[m];
                    if (d) if (z(s, m)) g !== s[m] && (s[m] = g, l = !0); else {
                        const y = Qe(m);
                        o[y] = Mr(d, a, y, g, e, !1)
                    } else g !== s[m] && (s[m] = g, l = !0)
                }
            }
        } else {
            As(e, t, o, s) && (l = !0);
            let u;
            for (const $ in a) (!t || !z(t, $) && ((u = ze($)) === $ || !z(t, u))) && (d ? n && (n[$] !== void 0 || n[u] !== void 0) && (o[$] = Mr(d, a, $, void 0, e, !0)) : delete o[$]);
            if (s !== a) for (const $ in s) (!t || !z(t, $) && !0) && (delete s[$], l = !0)
        }
        l && Ge(e, "set", "$attrs")
    }

    function As(e, t, n, r) {
        const [o, s] = e.propsOptions;
        let i = !1, a;
        if (t) for (let d in t) {
            if (un(d)) continue;
            const l = t[d];
            let u;
            o && z(o, u = Qe(d)) ? !s || !s.includes(u) ? n[u] = l : (a || (a = {}))[u] = l : xn(e.emitsOptions, d) || (!(d in r) || l !== r[d]) && (r[d] = l, i = !0)
        }
        if (s) {
            const d = G(n), l = a || V;
            for (let u = 0; u < s.length; u++) {
                const $ = s[u];
                n[$] = Mr(o, d, $, l[$], e, !z(l, $))
            }
        }
        return i
    }

    function Mr(e, t, n, r, o, s) {
        const i = e[n];
        if (i != null) {
            const a = z(i, "default");
            if (a && r === void 0) {
                const d = i.default;
                if (i.type !== Function && j(d)) {
                    const {propsDefaults: l} = o;
                    n in l ? r = l[n] : (it(o), r = l[n] = d.call(null, t), at())
                } else r = d
            }
            i[0] && (s && !a ? r = !1 : i[1] && (r === "" || r === ze(n)) && (r = !0))
        }
        return r
    }

    function xs(e, t, n = !1) {
        const r = t.propsCache, o = r.get(e);
        if (o) return o;
        const s = e.props, i = {}, a = [];
        let d = !1;
        if (!j(e)) {
            const u = $ => {
                d = !0;
                const [m, g] = xs($, t, !0);
                se(i, m), g && a.push(...g)
            };
            !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
        }
        if (!s && !d) return Y(e) && r.set(e, Ct), Ct;
        if (F(s)) for (let u = 0; u < s.length; u++) {
            const $ = Qe(s[u]);
            ks($) && (i[$] = V)
        } else if (s) for (const u in s) {
            const $ = Qe(u);
            if (ks($)) {
                const m = s[u], g = i[$] = F(m) || j(m) ? {type: m} : m;
                if (g) {
                    const y = Cs(Boolean, g.type), x = Cs(String, g.type);
                    g[0] = y > -1, g[1] = x < 0 || y < x, (y > -1 || z(g, "default")) && a.push($)
                }
            }
        }
        const l = [i, a];
        return Y(e) && r.set(e, l), l
    }

    function ks(e) {
        return e[0] !== "$"
    }

    function ws(e) {
        const t = e && e.toString().match(/^\s*function (\w+)/);
        return t ? t[1] : e === null ? "null" : ""
    }

    function Es(e, t) {
        return ws(e) === ws(t)
    }

    function Cs(e, t) {
        return F(t) ? t.findIndex(n => Es(n, e)) : j(t) && Es(t, e) ? 0 : -1
    }

    const Ps = e => e[0] === "_" || e === "$stable", Ir = e => F(e) ? e.map(Me) : [Me(e)], nl = (e, t, n) => {
        if (t._n) return t;
        const r = ss((...o) => Ir(t(...o)), n);
        return r._c = !1, r
    }, Ss = (e, t, n) => {
        const r = e._ctx;
        for (const o in e) {
            if (Ps(o)) continue;
            const s = e[o];
            if (j(s)) t[o] = nl(o, s, r); else if (s != null) {
                const i = Ir(s);
                t[o] = () => i
            }
        }
    }, _s = (e, t) => {
        const n = Ir(t);
        e.slots.default = () => n
    }, rl = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = G(t), mn(t, "_", n)) : Ss(t, e.slots = {})
        } else e.slots = {}, t && _s(e, t);
        mn(e.slots, Tn, 1)
    }, ol = (e, t, n) => {
        const {vnode: r, slots: o} = e;
        let s = !0, i = V;
        if (r.shapeFlag & 32) {
            const a = t._;
            a ? n && a === 1 ? s = !1 : (se(o, t), !n && a === 1 && delete o._) : (s = !t.$stable, Ss(t, o)), i = t
        } else t && (_s(e, t), i = {default: 1});
        if (s) for (const a in o) !Ps(a) && !(a in i) && delete o[a]
    };

    function Ts() {
        return {
            app: null,
            config: {
                isNativeTag: _a,
                performance: !1,
                globalProperties: {},
                optionMergeStrategies: {},
                errorHandler: void 0,
                warnHandler: void 0,
                compilerOptions: {}
            },
            mixins: [],
            components: {},
            directives: {},
            provides: Object.create(null),
            optionsCache: new WeakMap,
            propsCache: new WeakMap,
            emitsCache: new WeakMap
        }
    }

    let sl = 0;

    function il(e, t) {
        return function (r, o = null) {
            j(r) || (r = Object.assign({}, r)), o != null && !Y(o) && (o = null);
            const s = Ts(), i = new Set;
            let a = !1;
            const d = s.app = {
                _uid: sl++,
                _component: r,
                _props: o,
                _container: null,
                _context: s,
                _instance: null,
                version: xl,
                get config() {
                    return s.config
                },
                set config(l) {
                },
                use(l, ...u) {
                    return i.has(l) || (l && j(l.install) ? (i.add(l), l.install(d, ...u)) : j(l) && (i.add(l), l(d, ...u))), d
                },
                mixin(l) {
                    return s.mixins.includes(l) || s.mixins.push(l), d
                },
                component(l, u) {
                    return u ? (s.components[l] = u, d) : s.components[l]
                },
                directive(l, u) {
                    return u ? (s.directives[l] = u, d) : s.directives[l]
                },
                mount(l, u, $) {
                    if (!a) {
                        const m = ge(r, o);
                        return m.appContext = s, u && t ? t(m, l) : e(m, l, $), a = !0, d._container = l, l.__vue_app__ = d, On(m.component) || m.component.proxy
                    }
                },
                unmount() {
                    a && (e(null, d._container), delete d._container.__vue_app__)
                },
                provide(l, u) {
                    return s.provides[l] = u, d
                }
            };
            return d
        }
    }

    function Rr(e, t, n, r, o = !1) {
        if (F(e)) {
            e.forEach((m, g) => Rr(m, t && (F(t) ? t[g] : t), n, r, o));
            return
        }
        if (En(r) && !o) return;
        const s = r.shapeFlag & 4 ? On(r.component) || r.component.proxy : r.el, i = o ? null : s, {i: a, r: d} = e,
            l = t && t.r, u = a.refs === V ? a.refs = {} : a.refs, $ = a.setupState;
        if (l != null && l !== d && (ie(l) ? (u[l] = null, z($, l) && ($[l] = null)) : ae(l) && (l.value = null)), j(d)) nt(d, a, 12, [i, u]); else {
            const m = ie(d), g = ae(d);
            if (m || g) {
                const y = () => {
                    if (e.f) {
                        const x = m ? u[d] : d.value;
                        o ? F(x) && er(x, s) : F(x) ? x.includes(s) || x.push(s) : m ? (u[d] = [s], z($, d) && ($[d] = u[d])) : (d.value = [s], e.k && (u[e.k] = d.value))
                    } else m ? (u[d] = i, z($, d) && ($[d] = i)) : g && (d.value = i, e.k && (u[e.k] = i))
                };
                i ? (y.id = -1, pe(y, n)) : y()
            }
        }
    }

    const pe = Od;

    function al(e) {
        return dl(e)
    }

    function dl(e, t) {
        const n = Ra();
        n.__VUE__ = !0;
        const {
                insert: r,
                remove: o,
                patchProp: s,
                createElement: i,
                createText: a,
                createComment: d,
                setText: l,
                setElementText: u,
                parentNode: $,
                nextSibling: m,
                setScopeId: g = Te,
                insertStaticContent: y
            } = e, x = (c, f, h, b = null, v = null, w = null, _ = !1, k = null, C = !!f.dynamicChildren) => {
                if (c === f) return;
                c && !Le(c, f) && (b = Yn(c), je(c, v, w, !0), c = null), f.patchFlag === -2 && (C = !1, f.dynamicChildren = null);
                const {type: A, ref: I, shapeFlag: O} = f;
                switch (A) {
                    case Fr:
                        S(c, f, h, b);
                        break;
                    case ye:
                        P(c, f, h, b);
                        break;
                    case Br:
                        c == null && E(f, h, b, _);
                        break;
                    case Pe:
                        ke(c, f, h, b, v, w, _, k, C);
                        break;
                    default:
                        O & 1 ? T(c, f, h, b, v, w, _, k, C) : O & 6 ? _e(c, f, h, b, v, w, _, k, C) : (O & 64 || O & 128) && A.process(c, f, h, b, v, w, _, k, C, Ht)
                }
                I != null && v && Rr(I, c && c.ref, w, f || c, !f)
            }, S = (c, f, h, b) => {
                if (c == null) r(f.el = a(f.children), h, b); else {
                    const v = f.el = c.el;
                    f.children !== c.children && l(v, f.children)
                }
            }, P = (c, f, h, b) => {
                c == null ? r(f.el = d(f.children || ""), h, b) : f.el = c.el
            }, E = (c, f, h, b) => {
                [c.el, c.anchor] = y(c.children, f, h, b, c.el, c.anchor)
            }, p = ({el: c, anchor: f}, h, b) => {
                let v;
                for (; c && c !== f;) v = m(c), r(c, h, b), c = v;
                r(f, h, b)
            }, N = ({el: c, anchor: f}) => {
                let h;
                for (; c && c !== f;) h = m(c), o(c), c = h;
                o(f)
            }, T = (c, f, h, b, v, w, _, k, C) => {
                _ = _ || f.type === "svg", c == null ? L(f, h, b, v, w, _, k, C) : Z(c, f, v, w, _, k, C)
            }, L = (c, f, h, b, v, w, _, k) => {
                let C, A;
                const {type: I, props: O, shapeFlag: R, transition: D, dirs: U} = c;
                if (C = c.el = i(c.type, w, O && O.is, O), R & 8 ? u(C, c.children) : R & 16 && M(c.children, C, null, b, v, w && I !== "foreignObject", _, k), U && pt(c, null, b, "created"), O) {
                    for (const K in O) K !== "value" && !un(K) && s(C, K, null, O[K], w, c.children, b, v, Ye);
                    "value" in O && s(C, "value", null, O.value), (A = O.onVnodeBeforeMount) && De(A, b, c)
                }
                W(C, c, c.scopeId, _, b), U && pt(c, null, b, "beforeMount");
                const J = (!v || v && !v.pendingBranch) && D && !D.persisted;
                J && D.beforeEnter(C), r(C, f, h), ((A = O && O.onVnodeMounted) || J || U) && pe(() => {
                    A && De(A, b, c), J && D.enter(C), U && pt(c, null, b, "mounted")
                }, v)
            }, W = (c, f, h, b, v) => {
                if (h && g(c, h), b) for (let w = 0; w < b.length; w++) g(c, b[w]);
                if (v) {
                    let w = v.subTree;
                    if (f === w) {
                        const _ = v.vnode;
                        W(c, _, _.scopeId, _.slotScopeIds, v.parent)
                    }
                }
            }, M = (c, f, h, b, v, w, _, k, C = 0) => {
                for (let A = C; A < c.length; A++) {
                    const I = c[A] = k ? st(c[A]) : Me(c[A]);
                    x(null, I, f, h, b, v, w, _, k)
                }
            }, Z = (c, f, h, b, v, w, _) => {
                const k = f.el = c.el;
                let {patchFlag: C, dynamicChildren: A, dirs: I} = f;
                C |= c.patchFlag & 16;
                const O = c.props || V, R = f.props || V;
                let D;
                h && bt(h, !1), (D = R.onVnodeBeforeUpdate) && De(D, h, f, c), I && pt(f, c, h, "beforeUpdate"), h && bt(h, !0);
                const U = v && f.type !== "foreignObject";
                if (A ? H(c.dynamicChildren, A, k, h, b, U, w) : _ || q(c, f, k, null, h, b, U, w, !1), C > 0) {
                    if (C & 16) Q(k, f, O, R, h, b, v); else if (C & 2 && O.class !== R.class && s(k, "class", null, R.class, v), C & 4 && s(k, "style", O.style, R.style, v), C & 8) {
                        const J = f.dynamicProps;
                        for (let K = 0; K < J.length; K++) {
                            const re = J[K], Re = O[re], Kt = R[re];
                            (Kt !== Re || re === "value") && s(k, re, Re, Kt, v, c.children, h, b, Ye)
                        }
                    }
                    C & 1 && c.children !== f.children && u(k, f.children)
                } else !_ && A == null && Q(k, f, O, R, h, b, v);
                ((D = R.onVnodeUpdated) || I) && pe(() => {
                    D && De(D, h, f, c), I && pt(f, c, h, "updated")
                }, b)
            }, H = (c, f, h, b, v, w, _) => {
                for (let k = 0; k < f.length; k++) {
                    const C = c[k], A = f[k], I = C.el && (C.type === Pe || !Le(C, A) || C.shapeFlag & 70) ? $(C.el) : h;
                    x(C, A, I, null, b, v, w, _, !0)
                }
            }, Q = (c, f, h, b, v, w, _) => {
                if (h !== b) {
                    if (h !== V) for (const k in h) !un(k) && !(k in b) && s(c, k, h[k], null, _, f.children, v, w, Ye);
                    for (const k in b) {
                        if (un(k)) continue;
                        const C = b[k], A = h[k];
                        C !== A && k !== "value" && s(c, k, A, C, _, f.children, v, w, Ye)
                    }
                    "value" in b && s(c, "value", h.value, b.value)
                }
            }, ke = (c, f, h, b, v, w, _, k, C) => {
                const A = f.el = c ? c.el : a(""), I = f.anchor = c ? c.anchor : a("");
                let {patchFlag: O, dynamicChildren: R, slotScopeIds: D} = f;
                D && (k = k ? k.concat(D) : D), c == null ? (r(A, h, b), r(I, h, b), M(f.children, h, I, v, w, _, k, C)) : O > 0 && O & 64 && R && c.dynamicChildren ? (H(c.dynamicChildren, R, h, v, w, _, k), (f.key != null || v && f === v.subTree) && Ns(c, f, !0)) : q(c, f, h, I, v, w, _, k, C)
            }, _e = (c, f, h, b, v, w, _, k, C) => {
                f.slotScopeIds = k, c == null ? f.shapeFlag & 512 ? v.ctx.activate(f, h, b, _, C) : Je(f, h, b, v, w, _, C) : va(c, f, C)
            }, Je = (c, f, h, b, v, w, _) => {
                const k = c.component = gl(c, b, v);
                if (Cn(c) && (k.ctx.renderer = Ht), hl(k), k.asyncDep) {
                    if (v && v.registerDep(k, he), !c.el) {
                        const C = k.subTree = ge(ye);
                        P(null, C, f, h)
                    }
                    return
                }
                he(k, c, f, h, v, w, _)
            }, va = (c, f, h) => {
                const b = f.component = c.component;
                if (Ed(c, f, h)) if (b.asyncDep && !b.asyncResolved) {
                    X(b, f, h);
                    return
                } else b.next = f, pd(b.update), b.update(); else f.el = c.el, b.vnode = f
            }, he = (c, f, h, b, v, w, _) => {
                const k = () => {
                    if (c.isMounted) {
                        let {next: I, bu: O, u: R, parent: D, vnode: U} = c, J = I, K;
                        bt(c, !1), I ? (I.el = U.el, X(c, I, _)) : I = U, O && $n(O), (K = I.props && I.props.onVnodeBeforeUpdate) && De(K, D, I, U), bt(c, !0);
                        const re = br(c), Re = c.subTree;
                        c.subTree = re, x(Re, re, $(Re.el), Yn(Re), c, v, w), I.el = re.el, J === null && yr(c, re.el), R && pe(R, v), (K = I.props && I.props.onVnodeUpdated) && pe(() => De(K, D, I, U), v)
                    } else {
                        let I;
                        const {el: O, props: R} = f, {bm: D, m: U, parent: J} = c, K = En(f);
                        if (bt(c, !1), D && $n(D), !K && (I = R && R.onVnodeBeforeMount) && De(I, J, f), bt(c, !0), O && yo) {
                            const re = () => {
                                c.subTree = br(c), yo(O, c.subTree, c, v, null)
                            };
                            K ? f.type.__asyncLoader().then(() => !c.isUnmounted && re()) : re()
                        } else {
                            const re = c.subTree = br(c);
                            x(null, re, h, b, c, v, w), f.el = re.el
                        }
                        if (U && pe(U, v), !K && (I = R && R.onVnodeMounted)) {
                            const re = f;
                            pe(() => De(I, J, re), v)
                        }
                        (f.shapeFlag & 256 || J && En(J.vnode) && J.vnode.shapeFlag & 256) && c.a && pe(c.a, v), c.isMounted = !0, f = h = b = null
                    }
                }, C = c.effect = new dr(k, () => vr(A), c.scope), A = c.update = () => C.run();
                A.id = c.uid, bt(c, !0), A()
            }, X = (c, f, h) => {
                f.component = c;
                const b = c.vnode.props;
                c.vnode = f, c.next = null, tl(c, f.props, b, h), ol(c, f.children, h), _t(), ts(), Tt()
            }, q = (c, f, h, b, v, w, _, k, C = !1) => {
                const A = c && c.children, I = c ? c.shapeFlag : 0, O = f.children, {patchFlag: R, shapeFlag: D} = f;
                if (R > 0) {
                    if (R & 128) {
                        Jn(A, O, h, b, v, w, _, k, C);
                        return
                    } else if (R & 256) {
                        kt(A, O, h, b, v, w, _, k, C);
                        return
                    }
                }
                D & 8 ? (I & 16 && Ye(A, v, w), O !== A && u(h, O)) : I & 16 ? D & 16 ? Jn(A, O, h, b, v, w, _, k, C) : Ye(A, v, w, !0) : (I & 8 && u(h, ""), D & 16 && M(O, h, b, v, w, _, k, C))
            }, kt = (c, f, h, b, v, w, _, k, C) => {
                c = c || Ct, f = f || Ct;
                const A = c.length, I = f.length, O = Math.min(A, I);
                let R;
                for (R = 0; R < O; R++) {
                    const D = f[R] = C ? st(f[R]) : Me(f[R]);
                    x(c[R], D, h, null, v, w, _, k, C)
                }
                A > I ? Ye(c, v, w, !0, !1, O) : M(f, h, b, v, w, _, k, C, O)
            }, Jn = (c, f, h, b, v, w, _, k, C) => {
                let A = 0;
                const I = f.length;
                let O = c.length - 1, R = I - 1;
                for (; A <= O && A <= R;) {
                    const D = c[A], U = f[A] = C ? st(f[A]) : Me(f[A]);
                    if (Le(D, U)) x(D, U, h, null, v, w, _, k, C); else break;
                    A++
                }
                for (; A <= O && A <= R;) {
                    const D = c[O], U = f[R] = C ? st(f[R]) : Me(f[R]);
                    if (Le(D, U)) x(D, U, h, null, v, w, _, k, C); else break;
                    O--, R--
                }
                if (A > O) {
                    if (A <= R) {
                        const D = R + 1, U = D < I ? f[D].el : b;
                        for (; A <= R;) x(null, f[A] = C ? st(f[A]) : Me(f[A]), h, U, v, w, _, k, C), A++
                    }
                } else if (A > R) for (; A <= O;) je(c[A], v, w, !0), A++; else {
                    const D = A, U = A, J = new Map;
                    for (A = U; A <= R; A++) {
                        const we = f[A] = C ? st(f[A]) : Me(f[A]);
                        we.key != null && J.set(we.key, A)
                    }
                    let K, re = 0;
                    const Re = R - U + 1;
                    let Kt = !1, Aa = 0;
                    const dn = new Array(Re);
                    for (A = 0; A < Re; A++) dn[A] = 0;
                    for (A = D; A <= O; A++) {
                        const we = c[A];
                        if (re >= Re) {
                            je(we, v, w, !0);
                            continue
                        }
                        let Ue;
                        if (we.key != null) Ue = J.get(we.key); else for (K = U; K <= R; K++) if (dn[K - U] === 0 && Le(we, f[K])) {
                            Ue = K;
                            break
                        }
                        Ue === void 0 ? je(we, v, w, !0) : (dn[Ue - U] = A + 1, Ue >= Aa ? Aa = Ue : Kt = !0, x(we, f[Ue], h, null, v, w, _, k, C), re++)
                    }
                    const xa = Kt ? ll(dn) : Ct;
                    for (K = xa.length - 1, A = Re - 1; A >= 0; A--) {
                        const we = U + A, Ue = f[we], ka = we + 1 < I ? f[we + 1].el : b;
                        dn[A] === 0 ? x(null, Ue, h, ka, v, w, _, k, C) : Kt && (K < 0 || A !== xa[K] ? wt(Ue, h, ka, 2) : K--)
                    }
                }
            }, wt = (c, f, h, b, v = null) => {
                const {el: w, type: _, transition: k, children: C, shapeFlag: A} = c;
                if (A & 6) {
                    wt(c.component.subTree, f, h, b);
                    return
                }
                if (A & 128) {
                    c.suspense.move(f, h, b);
                    return
                }
                if (A & 64) {
                    _.move(c, f, h, Ht);
                    return
                }
                if (_ === Pe) {
                    r(w, f, h);
                    for (let O = 0; O < C.length; O++) wt(C[O], f, h, b);
                    r(c.anchor, f, h);
                    return
                }
                if (_ === Br) {
                    p(c, f, h);
                    return
                }
                if (b !== 2 && A & 1 && k) if (b === 0) k.beforeEnter(w), r(w, f, h), pe(() => k.enter(w), v); else {
                    const {leave: O, delayLeave: R, afterLeave: D} = k, U = () => r(w, f, h), J = () => {
                        O(w, () => {
                            U(), D && D()
                        })
                    };
                    R ? R(w, U, J) : J()
                } else r(w, f, h)
            }, je = (c, f, h, b = !1, v = !1) => {
                const {type: w, props: _, ref: k, children: C, dynamicChildren: A, shapeFlag: I, patchFlag: O, dirs: R} = c;
                if (k != null && Rr(k, null, h, c, !0), I & 256) {
                    f.ctx.deactivate(c);
                    return
                }
                const D = I & 1 && R, U = !En(c);
                let J;
                if (U && (J = _ && _.onVnodeBeforeUnmount) && De(J, f, c), I & 6) X0(c.component, h, b); else {
                    if (I & 128) {
                        c.suspense.unmount(h, b);
                        return
                    }
                    D && pt(c, null, f, "beforeUnmount"), I & 64 ? c.type.remove(c, f, h, v, Ht, b) : A && (w !== Pe || O > 0 && O & 64) ? Ye(A, f, h, !1, !0) : (w === Pe && O & 384 || !v && I & 16) && Ye(C, f, h), b && ba(c)
                }
                (U && (J = _ && _.onVnodeUnmounted) || D) && pe(() => {
                    J && De(J, f, c), D && pt(c, null, f, "unmounted")
                }, h)
            }, ba = c => {
                const {type: f, el: h, anchor: b, transition: v} = c;
                if (f === Pe) {
                    Q0(h, b);
                    return
                }
                if (f === Br) {
                    N(c);
                    return
                }
                const w = () => {
                    o(h), v && !v.persisted && v.afterLeave && v.afterLeave()
                };
                if (c.shapeFlag & 1 && v && !v.persisted) {
                    const {leave: _, delayLeave: k} = v, C = () => _(h, w);
                    k ? k(c.el, w, C) : C()
                } else w()
            }, Q0 = (c, f) => {
                let h;
                for (; c !== f;) h = m(c), o(c), c = h;
                o(f)
            }, X0 = (c, f, h) => {
                const {bum: b, scope: v, update: w, subTree: _, um: k} = c;
                b && $n(b), v.stop(), w && (w.active = !1, je(_, c, f, h)), k && pe(k, f), pe(() => {
                    c.isUnmounted = !0
                }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve())
            }, Ye = (c, f, h, b = !1, v = !1, w = 0) => {
                for (let _ = w; _ < c.length; _++) je(c[_], f, h, b, v)
            },
            Yn = c => c.shapeFlag & 6 ? Yn(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : m(c.anchor || c.el),
            ya = (c, f, h) => {
                c == null ? f._vnode && je(f._vnode, null, null, !0) : x(f._vnode || null, c, f, null, null, null, h), ts(), ns(), f._vnode = c
            }, Ht = {p: x, um: je, m: wt, r: ba, mt: Je, mc: M, pc: q, pbc: H, n: Yn, o: e};
        let bo, yo;
        return t && ([bo, yo] = t(Ht)), {render: ya, hydrate: bo, createApp: il(ya, bo)}
    }

    function bt({effect: e, update: t}, n) {
        e.allowRecurse = t.allowRecurse = n
    }

    function Ns(e, t, n = !1) {
        const r = e.children, o = t.children;
        if (F(r) && F(o)) for (let s = 0; s < r.length; s++) {
            const i = r[s];
            let a = o[s];
            a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = st(o[s]), a.el = i.el), n || Ns(i, a))
        }
    }

    function ll(e) {
        const t = e.slice(), n = [0];
        let r, o, s, i, a;
        const d = e.length;
        for (r = 0; r < d; r++) {
            const l = e[r];
            if (l !== 0) {
                if (o = n[n.length - 1], e[o] < l) {
                    t[r] = o, n.push(r);
                    continue
                }
                for (s = 0, i = n.length - 1; s < i;) a = s + i >> 1, e[n[a]] < l ? s = a + 1 : i = a;
                l < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r)
            }
        }
        for (s = n.length, i = n[s - 1]; s-- > 0;) n[s] = i, i = t[i];
        return n
    }

    const cl = e => e.__isTeleport, Pe = Symbol(void 0), Fr = Symbol(void 0), ye = Symbol(void 0), Br = Symbol(void 0),
        nn = [];
    let Se = null;

    function ne(e = !1) {
        nn.push(Se = e ? null : [])
    }

    function Os() {
        nn.pop(), Se = nn[nn.length - 1] || null
    }

    let Rt = 1;

    function Ms(e) {
        Rt += e
    }

    function Is(e) {
        return e.dynamicChildren = Rt > 0 ? Se || Ct : null, Os(), Rt > 0 && Se && Se.push(e), e
    }

    function le(e, t, n, r, o, s) {
        return Is(B(e, t, n, r, o, s, !0))
    }

    function Rs(e, t, n, r, o) {
        return Is(ge(e, t, n, r, o, !0))
    }

    function Fs(e) {
        return e ? e.__v_isVNode === !0 : !1
    }

    function Le(e, t) {
        return e.type === t.type && e.key === t.key
    }

    const Tn = "__vInternal", Bs = ({key: e}) => e != null ? e : null,
        Nn = ({ref: e, ref_key: t, ref_for: n}) => e != null ? ie(e) || ae(e) || j(e) ? {
            i: Oe,
            r: e,
            k: t,
            f: !!n
        } : e : null;

    function B(e, t = null, n = null, r = 0, o = null, s = e === Pe ? 0 : 1, i = !1, a = !1) {
        const d = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e,
            props: t,
            key: t && Bs(t),
            ref: t && Nn(t),
            scopeId: kn,
            slotScopeIds: null,
            children: n,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag: s,
            patchFlag: r,
            dynamicProps: o,
            dynamicChildren: null,
            appContext: null
        };
        return a ? (Lr(d, n), s & 128 && e.normalize(d)) : n && (d.shapeFlag |= ie(n) ? 8 : 16), Rt > 0 && !i && Se && (d.patchFlag > 0 || s & 6) && d.patchFlag !== 32 && Se.push(d), d
    }

    const ge = ul;

    function ul(e, t = null, n = null, r = 0, o = null, s = !1) {
        if ((!e || e === Wd) && (e = ye), Fs(e)) {
            const a = rt(e, t, !0);
            return n && Lr(a, n), Rt > 0 && !s && Se && (a.shapeFlag & 6 ? Se[Se.indexOf(e)] = a : Se.push(a)), a.patchFlag |= -2, a
        }
        if (yl(e) && (e = e.__vccOpts), t) {
            t = fl(t);
            let {class: a, style: d} = t;
            a && !ie(a) && (t.class = $e(a)), Y(d) && (Vo(d) && !F(d) && (d = se({}, d)), t.style = ln(d))
        }
        const i = ie(e) ? 1 : Cd(e) ? 128 : cl(e) ? 64 : Y(e) ? 4 : j(e) ? 2 : 0;
        return B(e, t, n, r, o, i, s, !0)
    }

    function fl(e) {
        return e ? Vo(e) || Tn in e ? se({}, e) : e : null
    }

    function rt(e, t, n = !1) {
        const {props: r, ref: o, patchFlag: s, children: i} = e, a = t ? Ls(r || {}, t) : r;
        return {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: a,
            key: a && Bs(a),
            ref: t && t.ref ? n && o ? F(o) ? o.concat(Nn(t)) : [o, Nn(t)] : Nn(t) : o,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: i,
            target: e.target,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== Pe ? s === -1 ? 16 : s | 16 : s,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: e.transition,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && rt(e.ssContent),
            ssFallback: e.ssFallback && rt(e.ssFallback),
            el: e.el,
            anchor: e.anchor
        }
    }

    function ot(e = " ", t = 0) {
        return ge(Fr, null, e, t)
    }

    function Ve(e = "", t = !1) {
        return t ? (ne(), Rs(ye, null, e)) : ge(ye, null, e)
    }

    function Me(e) {
        return e == null || typeof e == "boolean" ? ge(ye) : F(e) ? ge(Pe, null, e.slice()) : typeof e == "object" ? st(e) : ge(Fr, null, String(e))
    }

    function st(e) {
        return e.el === null && e.patchFlag !== -1 || e.memo ? e : rt(e)
    }

    function Lr(e, t) {
        let n = 0;
        const {shapeFlag: r} = e;
        if (t == null) t = null; else if (F(t)) n = 16; else if (typeof t == "object") if (r & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1), Lr(e, o()), o._c && (o._d = !0));
            return
        } else {
            n = 32;
            const o = t._;
            !o && !(Tn in t) ? t._ctx = Oe : o === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        } else j(t) ? (t = {default: t, _ctx: Oe}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ot(t)]) : n = 8);
        e.children = t, e.shapeFlag |= n
    }

    function Ls(...e) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            for (const o in r) if (o === "class") t.class !== r.class && (t.class = $e([t.class, r.class])); else if (o === "style") t.style = ln([t.style, r.style]); else if (cn(o)) {
                const s = t[o], i = r[o];
                i && s !== i && !(F(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i)
            } else o !== "" && (t[o] = r[o])
        }
        return t
    }

    function De(e, t, n, r = null) {
        Ee(e, t, 7, [n, r])
    }

    const $l = Ts();
    let ml = 0;

    function gl(e, t, n) {
        const r = e.type, o = (t ? t.appContext : e.appContext) || $l, s = {
            uid: ml++,
            vnode: e,
            type: r,
            parent: t,
            appContext: o,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Fa(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(o.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: xs(r, o),
            emitsOptions: os(r, o),
            emit: null,
            emitted: null,
            propsDefaults: V,
            inheritAttrs: r.inheritAttrs,
            ctx: V,
            data: V,
            props: V,
            attrs: V,
            slots: V,
            refs: V,
            setupState: V,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
        return s.ctx = {_: s}, s.root = t ? t.root : s, s.emit = bd.bind(null, s), e.ce && e.ce(s), s
    }

    let ce = null;
    const Ds = () => ce || Oe, it = e => {
        ce = e, e.scope.on()
    }, at = () => {
        ce && ce.scope.off(), ce = null
    };

    function js(e) {
        return e.vnode.shapeFlag & 4
    }

    let rn = !1;

    function hl(e, t = !1) {
        rn = t;
        const {props: n, children: r} = e.vnode, o = js(e);
        el(e, n, o, t), rl(e, r);
        const s = o ? pl(e, t) : void 0;
        return rn = !1, s
    }

    function pl(e, t) {
        const n = e.type;
        e.accessCache = Object.create(null), e.proxy = Wo(new Proxy(e.ctx, Zd));
        const {setup: r} = n;
        if (r) {
            const o = e.setupContext = r.length > 1 ? bl(e) : null;
            it(e), _t();
            const s = nt(r, e, 0, [e.props, o]);
            if (Tt(), at(), tr(s)) {
                if (s.then(at, at), t) return s.then(i => {
                    Dr(e, i, t)
                }).catch(i => {
                    Yt(i, e, 0)
                });
                e.asyncDep = s
            } else Dr(e, s, t)
        } else zs(e, t)
    }

    function Dr(e, t, n) {
        j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = Jo(t)), zs(e, n)
    }

    let Us;

    function zs(e, t, n) {
        const r = e.type;
        if (!e.render) {
            if (!t && Us && !r.render) {
                const o = r.template || Nr(e).template;
                if (o) {
                    const {isCustomElement: s, compilerOptions: i} = e.appContext.config, {
                        delimiters: a,
                        compilerOptions: d
                    } = r, l = se(se({isCustomElement: s, delimiters: a}, i), d);
                    r.render = Us(o, l)
                }
            }
            e.render = r.render || Te
        }
        it(e), _t(), qd(e), Tt(), at()
    }

    function vl(e) {
        return new Proxy(e.attrs, {
            get(t, n) {
                return be(e, "get", "$attrs"), t[n]
            }
        })
    }

    function bl(e) {
        const t = r => {
            e.exposed = r || {}
        };
        let n;
        return {
            get attrs() {
                return n || (n = vl(e))
            }, slots: e.slots, emit: e.emit, expose: t
        }
    }

    function On(e) {
        if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Jo(Wo(e.exposed)), {
            get(t, n) {
                if (n in t) return t[n];
                if (n in Sn) return Sn[n](e)
            }
        }))
    }

    function yl(e) {
        return j(e) && "__vccOpts" in e
    }

    const Gs = (e, t) => md(e, t, rn);

    function Al(e) {
        const t = Ds();
        let n = e();
        return at(), tr(n) && (n = n.catch(r => {
            throw it(t), r
        })), [n, () => it(t)]
    }

    const xl = "3.2.40", kl = "http://www.w3.org/2000/svg", yt = typeof document != "undefined" ? document : null,
        Hs = yt && yt.createElement("template"), wl = {
            insert: (e, t, n) => {
                t.insertBefore(e, n || null)
            },
            remove: e => {
                const t = e.parentNode;
                t && t.removeChild(e)
            },
            createElement: (e, t, n, r) => {
                const o = t ? yt.createElementNS(kl, e) : yt.createElement(e, n ? {is: n} : void 0);
                return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o
            },
            createText: e => yt.createTextNode(e),
            createComment: e => yt.createComment(e),
            setText: (e, t) => {
                e.nodeValue = t
            },
            setElementText: (e, t) => {
                e.textContent = t
            },
            parentNode: e => e.parentNode,
            nextSibling: e => e.nextSibling,
            querySelector: e => yt.querySelector(e),
            setScopeId(e, t) {
                e.setAttribute(t, "")
            },
            insertStaticContent(e, t, n, r, o, s) {
                const i = n ? n.previousSibling : t.lastChild;
                if (o && (o === s || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling));) ; else {
                    Hs.innerHTML = r ? `<svg>${e}</svg>` : e;
                    const a = Hs.content;
                    if (r) {
                        const d = a.firstChild;
                        for (; d.firstChild;) a.appendChild(d.firstChild);
                        a.removeChild(d)
                    }
                    t.insertBefore(a, n)
                }
                return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
            }
        };

    function El(e, t, n) {
        const r = e._vtc;
        r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
    }

    function Cl(e, t, n) {
        const r = e.style, o = ie(n);
        if (n && !o) {
            for (const s in n) jr(r, s, n[s]);
            if (t && !ie(t)) for (const s in t) n[s] == null && jr(r, s, "")
        } else {
            const s = r.display;
            o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = s)
        }
    }

    const Ks = /\s*!important$/;

    function jr(e, t, n) {
        if (F(n)) n.forEach(r => jr(e, t, r)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
            const r = Pl(e, t);
            Ks.test(n) ? e.setProperty(ze(r), n.replace(Ks, ""), "important") : e[r] = n
        }
    }

    const Vs = ["Webkit", "Moz", "ms"], Ur = {};

    function Pl(e, t) {
        const n = Ur[t];
        if (n) return n;
        let r = Qe(t);
        if (r !== "filter" && r in e) return Ur[t] = r;
        r = Co(r);
        for (let o = 0; o < Vs.length; o++) {
            const s = Vs[o] + r;
            if (s in e) return Ur[t] = s
        }
        return t
    }

    const Ws = "http://www.w3.org/1999/xlink";

    function Sl(e, t, n, r, o) {
        if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Ws, t.slice(6, t.length)) : e.setAttributeNS(Ws, t, n); else {
            const s = wa(t);
            n == null || s && !Ao(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n)
        }
    }

    function _l(e, t, n, r, o, s, i) {
        if (t === "innerHTML" || t === "textContent") {
            r && i(r, o, s), e[t] = n == null ? "" : n;
            return
        }
        if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
            e._value = n;
            const d = n == null ? "" : n;
            (e.value !== d || e.tagName === "OPTION") && (e.value = d), n == null && e.removeAttribute(t);
            return
        }
        let a = !1;
        if (n === "" || n == null) {
            const d = typeof e[t];
            d === "boolean" ? n = Ao(n) : n == null && d === "string" ? (n = "", a = !0) : d === "number" && (n = 0, a = !0)
        }
        try {
            e[t] = n
        } catch {
        }
        a && e.removeAttribute(t)
    }

    const [Zs, Tl] = (() => {
        let e = Date.now, t = !1;
        if (typeof window != "undefined") {
            Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
            const n = navigator.userAgent.match(/firefox\/(\d+)/i);
            t = !!(n && Number(n[1]) <= 53)
        }
        return [e, t]
    })();
    let zr = 0;
    const Nl = Promise.resolve(), Ol = () => {
        zr = 0
    }, Ml = () => zr || (Nl.then(Ol), zr = Zs());

    function We(e, t, n, r) {
        e.addEventListener(t, n, r)
    }

    function Il(e, t, n, r) {
        e.removeEventListener(t, n, r)
    }

    function Rl(e, t, n, r, o = null) {
        const s = e._vei || (e._vei = {}), i = s[t];
        if (r && i) i.value = r; else {
            const [a, d] = Fl(t);
            if (r) {
                const l = s[t] = Bl(r, o);
                We(e, a, l, d)
            } else i && (Il(e, a, i, d), s[t] = void 0)
        }
    }

    const qs = /(?:Once|Passive|Capture)$/;

    function Fl(e) {
        let t;
        if (qs.test(e)) {
            t = {};
            let r;
            for (; r = e.match(qs);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
        }
        return [e[2] === ":" ? e.slice(3) : ze(e.slice(2)), t]
    }

    function Bl(e, t) {
        const n = r => {
            const o = r.timeStamp || Zs();
            (Tl || o >= n.attached - 1) && Ee(Ll(r, n.value), t, 5, [r])
        };
        return n.value = e, n.attached = Ml(), n
    }

    function Ll(e, t) {
        if (F(t)) {
            const n = e.stopImmediatePropagation;
            return e.stopImmediatePropagation = () => {
                n.call(e), e._stopped = !0
            }, t.map(r => o => !o._stopped && r && r(o))
        } else return t
    }

    const Js = /^on[a-z]/, Dl = (e, t, n, r, o = !1, s, i, a, d) => {
        t === "class" ? El(e, r, o) : t === "style" ? Cl(e, n, r) : cn(t) ? Xn(t) || Rl(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : jl(e, t, r, o)) ? _l(e, t, r, s, i, a, d) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Sl(e, t, r, o))
    };

    function jl(e, t, n, r) {
        return r ? !!(t === "innerHTML" || t === "textContent" || t in e && Js.test(t) && j(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Js.test(t) && ie(n) ? !1 : t in e
    }

    function Ys(e, t) {
        const n = tn(e);

        class r extends Gr {
            constructor(s) {
                super(n, s, t)
            }
        }

        return r.def = n, r
    }

    const Ul = typeof HTMLElement != "undefined" ? HTMLElement : class {
    };

    class Gr extends Ul {
        constructor(t, n = {}, r) {
            super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : this.attachShadow({mode: "open"})
        }

        connectedCallback() {
            this._connected = !0, this._instance || this._resolveDef()
        }

        disconnectedCallback() {
            this._connected = !1, pr(() => {
                this._connected || (ri(null, this.shadowRoot), this._instance = null)
            })
        }

        _resolveDef() {
            if (this._resolved) return;
            this._resolved = !0;
            for (let r = 0; r < this.attributes.length; r++) this._setAttr(this.attributes[r].name);
            new MutationObserver(r => {
                for (const o of r) this._setAttr(o.attributeName)
            }).observe(this, {attributes: !0});
            const t = r => {
                const {props: o, styles: s} = r, i = !F(o), a = o ? i ? Object.keys(o) : o : [];
                let d;
                if (i) for (const l in this._props) {
                    const u = o[l];
                    (u === Number || u && u.type === Number) && (this._props[l] = ft(this._props[l]), (d || (d = Object.create(null)))[l] = !0)
                }
                this._numberProps = d;
                for (const l of Object.keys(this)) l[0] !== "_" && this._setProp(l, this[l], !0, !1);
                for (const l of a.map(Qe)) Object.defineProperty(this, l, {
                    get() {
                        return this._getProp(l)
                    }, set(u) {
                        this._setProp(l, u)
                    }
                });
                this._applyStyles(s), this._update()
            }, n = this._def.__asyncLoader;
            n ? n().then(t) : t(this._def)
        }

        _setAttr(t) {
            let n = this.getAttribute(t);
            this._numberProps && this._numberProps[t] && (n = ft(n)), this._setProp(Qe(t), n, !1)
        }

        _getProp(t) {
            return this._props[t]
        }

        _setProp(t, n, r = !0, o = !0) {
            n !== this._props[t] && (this._props[t] = n, o && this._instance && this._update(), r && (n === !0 ? this.setAttribute(ze(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ze(t), n + "") : n || this.removeAttribute(ze(t))))
        }

        _update() {
            ri(this._createVNode(), this.shadowRoot)
        }

        _createVNode() {
            const t = ge(this._def, se({}, this._props));
            return this._instance || (t.ce = n => {
                this._instance = n, n.isCE = !0, n.emit = (o, ...s) => {
                    this.dispatchEvent(new CustomEvent(o, {detail: s}))
                };
                let r = this;
                for (; r = r && (r.parentNode || r.host);) if (r instanceof Gr) {
                    n.parent = r._instance;
                    break
                }
            }), t
        }

        _applyStyles(t) {
            t && t.forEach(n => {
                const r = document.createElement("style");
                r.textContent = n, this.shadowRoot.appendChild(r)
            })
        }
    }

    const zl = {
        name: String,
        type: String,
        css: {type: Boolean, default: !0},
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    };
    Fd.props;
    const dt = e => {
        const t = e.props["onUpdate:modelValue"] || !1;
        return F(t) ? n => $n(t, n) : t
    };

    function Gl(e) {
        e.target.composing = !0
    }

    function Qs(e) {
        const t = e.target;
        t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
    }

    const Mn = {
        created(e, {modifiers: {lazy: t, trim: n, number: r}}, o) {
            e._assign = dt(o);
            const s = r || o.props && o.props.type === "number";
            We(e, t ? "change" : "input", i => {
                if (i.target.composing) return;
                let a = e.value;
                n && (a = a.trim()), s && (a = ft(a)), e._assign(a)
            }), n && We(e, "change", () => {
                e.value = e.value.trim()
            }), t || (We(e, "compositionstart", Gl), We(e, "compositionend", Qs), We(e, "change", Qs))
        }, mounted(e, {value: t}) {
            e.value = t == null ? "" : t
        }, beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: r, number: o}}, s) {
            if (e._assign = dt(s), e.composing || document.activeElement === e && e.type !== "range" && (n || r && e.value.trim() === t || (o || e.type === "number") && ft(e.value) === t)) return;
            const i = t == null ? "" : t;
            e.value !== i && (e.value = i)
        }
    }, Hl = {
        deep: !0, created(e, t, n) {
            e._assign = dt(n), We(e, "change", () => {
                const r = e._modelValue, o = Ft(e), s = e.checked, i = e._assign;
                if (F(r)) {
                    const a = Qn(r, o), d = a !== -1;
                    if (s && !d) i(r.concat(o)); else if (!s && d) {
                        const l = [...r];
                        l.splice(a, 1), i(l)
                    }
                } else if (St(r)) {
                    const a = new Set(r);
                    s ? a.add(o) : a.delete(o), i(a)
                } else i(ti(e, s))
            })
        }, mounted: Xs, beforeUpdate(e, t, n) {
            e._assign = dt(n), Xs(e, t, n)
        }
    };

    function Xs(e, {value: t, oldValue: n}, r) {
        e._modelValue = t, F(t) ? e.checked = Qn(t, r.props.value) > -1 : St(t) ? e.checked = t.has(r.props.value) : t !== n && (e.checked = ut(t, ti(e, !0)))
    }

    const Kl = {
        created(e, {value: t}, n) {
            e.checked = ut(t, n.props.value), e._assign = dt(n), We(e, "change", () => {
                e._assign(Ft(e))
            })
        }, beforeUpdate(e, {value: t, oldValue: n}, r) {
            e._assign = dt(r), t !== n && (e.checked = ut(t, r.props.value))
        }
    }, Vl = {
        deep: !0, created(e, {value: t, modifiers: {number: n}}, r) {
            const o = St(t);
            We(e, "change", () => {
                const s = Array.prototype.filter.call(e.options, i => i.selected).map(i => n ? ft(Ft(i)) : Ft(i));
                e._assign(e.multiple ? o ? new Set(s) : s : s[0])
            }), e._assign = dt(r)
        }, mounted(e, {value: t}) {
            ei(e, t)
        }, beforeUpdate(e, t, n) {
            e._assign = dt(n)
        }, updated(e, {value: t}) {
            ei(e, t)
        }
    };

    function ei(e, t) {
        const n = e.multiple;
        if (!(n && !F(t) && !St(t))) {
            for (let r = 0, o = e.options.length; r < o; r++) {
                const s = e.options[r], i = Ft(s);
                if (n) F(t) ? s.selected = Qn(t, i) > -1 : s.selected = t.has(i); else if (ut(Ft(s), t)) {
                    e.selectedIndex !== r && (e.selectedIndex = r);
                    return
                }
            }
            !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
        }
    }

    function Ft(e) {
        return "_value" in e ? e._value : e.value
    }

    function ti(e, t) {
        const n = t ? "_trueValue" : "_falseValue";
        return n in e ? e[n] : t
    }

    const Wl = {
        created(e, t, n) {
            In(e, t, n, null, "created")
        }, mounted(e, t, n) {
            In(e, t, n, null, "mounted")
        }, beforeUpdate(e, t, n, r) {
            In(e, t, n, r, "beforeUpdate")
        }, updated(e, t, n, r) {
            In(e, t, n, r, "updated")
        }
    };

    function Zl(e, t) {
        switch (e) {
            case"SELECT":
                return Vl;
            case"TEXTAREA":
                return Mn;
            default:
                switch (t) {
                    case"checkbox":
                        return Hl;
                    case"radio":
                        return Kl;
                    default:
                        return Mn
                }
        }
    }

    function In(e, t, n, r, o) {
        const i = Zl(e.tagName, n.props && n.props.type)[o];
        i && i(e, t, n, r)
    }

    const ql = ["ctrl", "shift", "alt", "meta"], Jl = {
        stop: e => e.stopPropagation(),
        prevent: e => e.preventDefault(),
        self: e => e.target !== e.currentTarget,
        ctrl: e => !e.ctrlKey,
        shift: e => !e.shiftKey,
        alt: e => !e.altKey,
        meta: e => !e.metaKey,
        left: e => "button" in e && e.button !== 0,
        middle: e => "button" in e && e.button !== 1,
        right: e => "button" in e && e.button !== 2,
        exact: (e, t) => ql.some(n => e[`${n}Key`] && !t.includes(n))
    }, Yl = (e, t) => (n, ...r) => {
        for (let o = 0; o < t.length; o++) {
            const s = Jl[t[o]];
            if (s && s(n, t)) return
        }
        return e(n, ...r)
    }, Ql = se({patchProp: Dl}, wl);
    let ni;

    function Xl() {
        return ni || (ni = al(Ql))
    }

    const ri = (...e) => {
        Xl().render(...e)
    };

    function oi(e, t, n = "modelValue") {
        return Gs({get: () => e[n], set: r => t(`update:${n}`, r)})
    }

    const ec = {class: "form-group-fx"}, tc = {class: "input-group"}, nc = ["type", "name", "id", "placeholder"],
        rc = {key: 0, class: "error-message"}, Hr = tn({
            __name: "FxInput",
            props: {
                name: null,
                placeholder: {default: ""},
                type: {default: "text"},
                message: {default: "Please enter a valid value"},
                error: {default: ""},
                modelValue: null
            },
            setup(e, {emit: t}) {
                const r = oi(e, t, "modelValue");
                return (o, s) => (ne(), le("div", ec, [B("div", tc, [Sr(B("input", Ls({
                    type: e.type,
                    name: e.name,
                    id: e.name,
                    placeholder: e.placeholder,
                    "onUpdate:modelValue": s[0] || (s[0] = i => ae(r) ? r.value = i : null),
                    class: "form-control-fx"
                }, o.$attrs, {
                    class: e.error ? "is-invalid" : "",
                    required: ""
                }), null, 16, nc), [[Wl, te(r)]]), e.error ? (ne(), le("div", rc, ee(e.message), 1)) : Ve("", !0)])]))
            }
        });
    var Kr = [{
        name: "Afghanistan",
        code: "+93",
        iso: "AF",
        flag: "/countries/af.svg",
        mask: "##-###-####"
    }, {
        name: "Aland Islands",
        code: "+358",
        iso: "AX",
        flag: "/countries/ax.svg",
        mask: "(###)###-##-##"
    }, {name: "Albania", code: "+355", iso: "AL", flag: "/countries/al.svg", mask: "(###)###-###"}, {
        name: "Algeria",
        code: "+213",
        iso: "DZ",
        flag: "/countries/dz.svg",
        mask: "##-###-####"
    }, {
        name: "American Samoa",
        code: "+1",
        iso: "AS",
        flag: "/countries/as.svg",
        mask: "(684)###-####"
    }, {name: "Andorra", code: "+376", iso: "AD", flag: "/countries/ad.svg", mask: "###-###"}, {
        name: "Angola",
        code: "+244",
        iso: "AO",
        flag: "/countries/ao.svg",
        mask: "(###)###-###"
    }, {name: "Anguilla", code: "+1", iso: "AI", flag: "/countries/ai.svg", mask: "(264)###-####"}, {
        name: "Antarctica",
        code: "+672",
        iso: "AQ",
        flag: "/countries/aq.svg",
        mask: "1##-###"
    }, {
        name: "Antigua and Barbuda",
        code: "+1",
        iso: "AG",
        flag: "/countries/ag.svg",
        mask: "(268)###-####"
    }, {name: "Argentina", code: "+54", iso: "AR", flag: "/countries/ar.svg", mask: "(###)###-####"}, {
        name: "Armenia",
        code: "+374",
        iso: "AM",
        flag: "/countries/am.svg",
        mask: "##-###-###"
    }, {name: "Aruba", code: "+297", iso: "AW", flag: "/countries/aw.svg", mask: "###-####"}, {
        name: "Ascension Island",
        code: "+247",
        iso: "AC",
        flag: "/countries/sh.svg",
        mask: "####"
    }, {name: "Australia", code: "+61", iso: "AU", flag: "/countries/au.svg", mask: "#-####-####"}, {
        name: "Austria",
        code: "+43",
        iso: "AT",
        flag: "/countries/at.svg",
        mask: "(###)###-####"
    }, {name: "Azerbaijan", code: "+994", iso: "AZ", flag: "/countries/az.svg", mask: "##-###-##-##"}, {
        name: "Bahamas",
        code: "+1",
        iso: "BS",
        flag: "/countries/bs.svg",
        mask: "(242)###-####"
    }, {name: "Bahrain", code: "+973", iso: "BH", flag: "/countries/bh.svg", mask: "####-####"}, {
        name: "Bangladesh",
        code: "+880",
        iso: "BD",
        flag: "/countries/bd.svg",
        mask: "1###-######"
    }, {name: "Barbados", code: "+1", iso: "BB", flag: "/countries/bb.svg", mask: "(246)###-####"}, {
        name: "Belarus",
        code: "+375",
        iso: "BY",
        flag: "/countries/by.svg",
        mask: "(##)###-##-##"
    }, {name: "Belgium", code: "+32", iso: "BE", flag: "/countries/be.svg", mask: "(###)###-###"}, {
        name: "Belize",
        code: "+501",
        iso: "BZ",
        flag: "/countries/bz.svg",
        mask: "###-####"
    }, {name: "Benin", code: "+229", iso: "BJ", flag: "/countries/bj.svg", mask: "##-##-####"}, {
        name: "Bermuda",
        code: "+1",
        iso: "BM",
        flag: "/countries/bm.svg",
        mask: "(441)###-####"
    }, {
        name: "Bhutan",
        code: "+975",
        iso: "BT",
        flag: "/countries/bt.svg",
        mask: ["17-###-###", "77-###-###", "#-###-###"]
    }, {
        name: "Bolivia",
        code: "+591",
        iso: "BO",
        flag: "/countries/bo.svg",
        mask: "#-###-####"
    }, {
        name: "Bosnia and Herzegovina",
        code: "+387",
        iso: "BA",
        flag: "/countries/ba.svg",
        mask: ["##-####", "##-#####"]
    }, {name: "Botswana", code: "+267", iso: "BW", flag: "/countries/bw.svg", mask: "##-###-###"}, {
        name: "Brazil",
        code: "+55",
        iso: "BR",
        flag: "/countries/br.svg",
        mask: ["(##)####-####", "(##)#####-####"]
    }, {
        name: "British Indian Ocean Territory",
        code: "+246",
        iso: "IO",
        flag: "/countries/io.svg",
        mask: "###-####"
    }, {
        name: "Brunei Darussalam",
        code: "+673",
        iso: "BN",
        flag: "/countries/bn.svg",
        mask: "###-####"
    }, {
        name: "Bulgaria",
        code: "+359",
        iso: "BG",
        flag: "/countries/bg.svg",
        mask: "(###)###-###"
    }, {name: "Burkina Faso", code: "+226", iso: "BF", flag: "/countries/bf.svg", mask: "##-##-####"}, {
        name: "Burundi",
        code: "+257",
        iso: "BI",
        flag: "/countries/bi.svg",
        mask: "##-##-####"
    }, {name: "Cambodia", code: "+855", iso: "KH", flag: "/countries/kh.svg", mask: "##-###-###"}, {
        name: "Cameroon",
        code: "+237",
        iso: "CM",
        flag: "/countries/cm.svg",
        mask: "####-####"
    }, {name: "Canada", code: "+1", iso: "CA", flag: "/countries/ca.svg", mask: "(###)###-####"}, {
        name: "Cape Verde",
        code: "+238",
        iso: "CV",
        flag: "/countries/cv.svg",
        mask: "(###)##-##"
    }, {
        name: "Cayman Islands",
        code: "+1",
        iso: "KY",
        flag: "/countries/ky.svg",
        mask: "(345)###-####"
    }, {
        name: "Central African Republic",
        code: "+236",
        iso: "CF",
        flag: "/countries/cf.svg",
        mask: "##-##-####"
    }, {name: "Chad", code: "+235", iso: "TD", flag: "/countries/td.svg", mask: "##-##-##-##"}, {
        name: "Chile",
        code: "+56",
        iso: "CL",
        flag: "/countries/cl.svg",
        mask: "#-####-####"
    }, {
        name: "China",
        code: "+86",
        iso: "CN",
        flag: "/countries/cn.svg",
        mask: ["(###)####-###", "(###)####-####", "##-#####-#####"]
    }, {
        name: "Christmas Island",
        code: "+61",
        iso: "CX",
        flag: "/countries/cx.svg",
        mask: "#-####-####"
    }, {
        name: "Cocos (Keeling) Islands",
        code: "+61",
        iso: "CC",
        flag: "/countries/cc.svg",
        mask: "#-####-####"
    }, {name: "Colombia", code: "+57", iso: "CO", flag: "/countries/co.svg", mask: "(###)###-####"}, {
        name: "Comoros",
        code: "+269",
        iso: "KM",
        flag: "/countries/km.svg",
        mask: "##-#####"
    }, {name: "Congo", code: "+242", iso: "CG", flag: "/countries/cg.svg", mask: "##-#####"}, {
        name: "Cook Islands",
        code: "+682",
        iso: "CK",
        flag: "/countries/ck.svg",
        mask: "##-###"
    }, {name: "Costa Rica", code: "+506", iso: "CR", flag: "/countries/cr.svg", mask: "####-####"}, {
        name: "Croatia",
        code: "+385",
        iso: "HR",
        flag: "/countries/hr.svg",
        mask: "##-###-###"
    }, {name: "Cuba", code: "+53", iso: "CU", flag: "/countries/cu.svg", mask: "#-###-####"}, {
        name: "Cyprus",
        code: "+357",
        iso: "CY",
        flag: "/countries/cy.svg",
        mask: "##-###-###"
    }, {
        name: "Czech Republic",
        code: "+420",
        iso: "CZ",
        flag: "/countries/cz.svg",
        mask: "(###)###-###"
    }, {
        name: "Democratic Republic of the Congo",
        code: "+243",
        iso: "CD",
        flag: "/countries/cd.svg",
        mask: "(###)###-###"
    }, {name: "Denmark", code: "+45", iso: "DK", flag: "/countries/dk.svg", mask: "##-##-##-##"}, {
        name: "Djibouti",
        code: "+253",
        iso: "DJ",
        flag: "/countries/dj.svg",
        mask: "##-##-##-##"
    }, {
        name: "Dominica",
        code: "+1",
        iso: "DM",
        flag: "/countries/dm.svg",
        mask: "(767)###-####"
    }, {
        name: "Dominican Republic",
        code: "+1",
        iso: "DO",
        flag: "/countries/do.svg",
        mask: ["(809)###-####", "(829)###-####", "(849)###-####"]
    }, {
        name: "Ecuador",
        code: "+593",
        iso: "EC",
        flag: "/countries/ec.svg",
        mask: ["#-###-####", "##-###-####"]
    }, {name: "Egypt", code: "+20", iso: "EG", flag: "/countries/eg.svg", mask: "(###)###-####"}, {
        name: "El Salvador",
        code: "+503",
        iso: "SV",
        flag: "/countries/sv.svg",
        mask: "##-##-####"
    }, {
        name: "Equatorial Guinea",
        code: "+240",
        iso: "GQ",
        flag: "/countries/gq.svg",
        mask: "##-###-####"
    }, {name: "Eritrea", code: "+291", iso: "ER", flag: "/countries/er.svg", mask: "#-###-###"}, {
        name: "Estonia",
        code: "+372",
        iso: "EE",
        flag: "/countries/ee.svg",
        mask: ["###-####", "####-####"]
    }, {name: "Eswatini", code: "+268", iso: "SZ", flag: "/countries/sz.svg", mask: "##-##-####"}, {
        name: "Ethiopia",
        code: "+251",
        iso: "ET",
        flag: "/countries/et.svg",
        mask: "##-###-####"
    }, {
        name: "Falkland Islands (Malvinas)",
        code: "+500",
        iso: "FK",
        flag: "/countries/fk.svg",
        mask: "#####"
    }, {name: "Faroe Islands", code: "+298", iso: "FO", flag: "/countries/fo.svg", mask: "###-###"}, {
        name: "Fiji",
        code: "+679",
        iso: "FJ",
        flag: "/countries/fj.svg",
        mask: "##-#####"
    }, {name: "Finland", code: "+358", iso: "FI", flag: "/countries/fi.svg", mask: "(###)###-##-##"}, {
        name: "France",
        code: "+33",
        iso: "FR",
        flag: "/countries/fr.svg",
        mask: "(###)###-###"
    }, {
        name: "French Guiana",
        code: "+594",
        iso: "GF",
        flag: "/countries/gf.svg",
        mask: "#####-####"
    }, {name: "French Polynesia", code: "+689", iso: "PF", flag: "/countries/pf.svg", mask: "##-##-##"}, {
        name: "Gabon",
        code: "+241",
        iso: "GA",
        flag: "/countries/ga.svg",
        mask: "#-##-##-##"
    }, {name: "Gambia", code: "+220", iso: "GM", flag: "/countries/gm.svg", mask: "(###)##-##"}, {
        name: "Georgia",
        code: "+995",
        iso: "GE",
        flag: "/countries/ge.svg",
        mask: "(###)###-###"
    }, {
        name: "Germany",
        code: "+49",
        iso: "DE",
        flag: "/countries/de.svg",
        mask: ["###-###", "(###)##-##", "(###)##-###", "(###)##-####", "(###)###-####", "(####)###-####"]
    }, {name: "Ghana", code: "+233", iso: "GH", flag: "/countries/gh.svg", mask: "(###)###-###"}, {
        name: "Gibraltar",
        code: "+350",
        iso: "GI",
        flag: "/countries/gi.svg",
        mask: "###-#####"
    }, {name: "Greece", code: "+30", iso: "GR", flag: "/countries/gr.svg", mask: "(###)###-####"}, {
        name: "Greenland",
        code: "+299",
        iso: "GL",
        flag: "/countries/gl.svg",
        mask: "##-##-##"
    }, {name: "Grenada", code: "+1", iso: "GD", flag: "/countries/gd.svg", mask: "(473)###-####"}, {
        name: "Guadeloupe",
        code: "+590",
        iso: "GP",
        flag: "/countries/gp.svg",
        mask: "(###)###-###"
    }, {name: "Guam", code: "+1", iso: "GU", flag: "/countries/gu.svg", mask: "(671)###-####"}, {
        name: "Guatemala",
        code: "+502",
        iso: "GT",
        flag: "/countries/gt.svg",
        mask: "#-###-####"
    }, {name: "Guernsey", code: "+44", iso: "GG", flag: "/countries/gg.svg", mask: "(####)######"}, {
        name: "Guinea",
        code: "+224",
        iso: "GN",
        flag: "/countries/gn.svg",
        mask: "##-###-###"
    }, {name: "Guinea-Bissau", code: "+245", iso: "GW", flag: "/countries/gw.svg", mask: "#-######"}, {
        name: "Guyana",
        code: "+592",
        iso: "GY",
        flag: "/countries/gy.svg",
        mask: "###-####"
    }, {
        name: "Haiti",
        code: "+509",
        iso: "HT",
        flag: "/countries/ht.svg",
        mask: "##-##-####"
    }, {
        name: "Holy See (Vatican City State)",
        code: "+39",
        iso: "VA",
        flag: "/countries/va.svg",
        mask: "06 698#####"
    }, {name: "Honduras", code: "+504", iso: "HN", flag: "/countries/hn.svg", mask: "####-####"}, {
        name: "Hong Kong",
        code: "+852",
        iso: "HK",
        flag: "/countries/hk.svg",
        mask: "####-####"
    }, {name: "Hungary", code: "+36", iso: "HU", flag: "/countries/hu.svg", mask: "(###)###-###"}, {
        name: "Iceland",
        code: "+354",
        iso: "IS",
        flag: "/countries/is.svg",
        mask: "###-####"
    }, {name: "India", code: "+91", iso: "IN", flag: "/countries/in.svg", mask: "(####)###-###"}, {
        name: "Indonesia",
        code: "+62",
        iso: "ID",
        flag: "/countries/id.svg",
        mask: ["##-###-##", "##-###-###", "##-###-####", "(8##)###-###", "(8##)###-##-###"]
    }, {name: "Iran", code: "+98", iso: "IR", flag: "/countries/ir.svg", mask: "(###)###-####"}, {
        name: "Iraq",
        code: "+924",
        iso: "IQ",
        flag: "/countries/iq.svg",
        mask: "(###)###-####"
    }, {
        name: "Ireland",
        code: "+353",
        iso: "IE",
        flag: "/countries/ie.svg",
        mask: "(###)###-###"
    }, {name: "Isle of Man", code: "+44", iso: "IM", flag: "/countries/im.svg", mask: "(####)######"}, {
        name: "Israel",
        code: "+972",
        iso: "IL",
        flag: "/countries/il.svg",
        mask: ["#-###-####", "5#-###-####"]
    }, {
        name: "Italy",
        code: "+39",
        iso: "IT",
        flag: "/countries/it.svg",
        mask: "(###)####-###"
    }, {
        name: "Ivory Coast / Cote d'Ivoire",
        code: "+225",
        iso: "CI",
        flag: "/countries/ci.svg",
        mask: "##-###-###"
    }, {name: "Jamaica", code: "+1", iso: "JM", flag: "/countries/jm.svg", mask: "(876)###-####"}, {
        name: "Japan",
        code: "+81",
        iso: "JP",
        flag: "/countries/jp.svg",
        mask: ["(###)###-###", "##-####-####"]
    }, {name: "Jersey", code: "+44", iso: "JE", flag: "/countries/je.svg", mask: "(####)####-######"}, {
        name: "Jordan",
        code: "+962",
        iso: "JO",
        flag: "/countries/jo.svg",
        mask: "#-####-####"
    }, {
        name: "Kazakhstan",
        code: "+77",
        iso: "KZ",
        flag: "/countries/kz.svg",
        mask: ["(6##)###-##-##", "(7##)###-##-##"]
    }, {name: "Kenya", code: "+254", iso: "KE", flag: "/countries/ke.svg", mask: "###-######"}, {
        name: "Kiribati",
        code: "+686",
        iso: "KI",
        flag: "/countries/ki.svg",
        mask: "##-###"
    }, {
        name: "Korea, Democratic People's Republic of Korea",
        code: "+850",
        iso: "KP",
        flag: "/countries/kp.svg",
        mask: ["###-###", "####-####", "##-###-###", "###-####-###", "191-###-####", "####-#############"]
    }, {
        name: "Korea, Republic of South Korea",
        code: "+82",
        iso: "KR",
        flag: "/countries/kr.svg",
        mask: "##-###-####"
    }, {
        name: "Kosovo",
        code: "+383",
        iso: "XK",
        flag: "/countries/xk.svg",
        mask: ["##-###-###", "###-###-###"]
    }, {name: "Kuwait", code: "+965", iso: "KW", flag: "/countries/kw.svg", mask: "####-####"}, {
        name: "Kyrgyzstan",
        code: "+996",
        iso: "KG",
        flag: "/countries/kg.svg",
        mask: "(###)###-###"
    }, {
        name: "Laos",
        code: "+856",
        iso: "LA",
        flag: "/countries/la.svg",
        mask: ["##-###-###", "(20##)###-###"]
    }, {name: "Latvia", code: "+371", iso: "LV", flag: "/countries/lv.svg", mask: "##-###-###"}, {
        name: "Lebanon",
        code: "+961",
        iso: "LB",
        flag: "/countries/lb.svg",
        mask: ["#-###-###", "##-###-###"]
    }, {name: "Lesotho", code: "+266", iso: "LS", flag: "/countries/ls.svg", mask: "#-###-####"}, {
        name: "Liberia",
        code: "+231",
        iso: "LR",
        flag: "/countries/lr.svg",
        mask: "##-###-###"
    }, {
        name: "Libya",
        code: "+218",
        iso: "LY",
        flag: "/countries/ly.svg",
        mask: ["##-###-###", "21-###-####"]
    }, {
        name: "Liechtenstein",
        code: "+423",
        iso: "LI",
        flag: "/countries/li.svg",
        mask: "(###)###-####"
    }, {
        name: "Lithuania",
        code: "+370",
        iso: "LT",
        flag: "/countries/lt.svg",
        mask: "(###)##-###"
    }, {name: "Luxembourg", code: "+352", iso: "LU", flag: "/countries/lu.svg", mask: "(###)###-###"}, {
        name: "Macau",
        code: "+853",
        iso: "MO",
        flag: "/countries/mo.svg",
        mask: "####-####"
    }, {name: "Madagascar", code: "+261", iso: "MG", flag: "/countries/mg.svg", mask: "##-##-#####"}, {
        name: "Malawi",
        code: "+265",
        iso: "MW",
        flag: "/countries/mw.svg",
        mask: ["1-###-###", "#-####-####"]
    }, {
        name: "Malaysia",
        code: "+60",
        iso: "MY",
        flag: "/countries/my.svg",
        mask: ["#-###-###", "##-###-###", "(###)###-###", "##-###-####"]
    }, {name: "Maldives", code: "+960", iso: "MV", flag: "/countries/mv.svg", mask: "###-####"}, {
        name: "Mali",
        code: "+223",
        iso: "ML",
        flag: "/countries/ml.svg",
        mask: "##-##-####"
    }, {
        name: "Malta",
        code: "+356",
        iso: "MT",
        flag: "/countries/mt.svg",
        mask: "####-####"
    }, {
        name: "Marshall Islands",
        code: "+692",
        iso: "MH",
        flag: "/countries/mh.svg",
        mask: "###-####"
    }, {
        name: "Martinique",
        code: "+596",
        iso: "MQ",
        flag: "/countries/mq.svg",
        mask: "(###)##-##-##"
    }, {name: "Mauritania", code: "+222", iso: "MR", flag: "/countries/mr.svg", mask: "##-##-####"}, {
        name: "Mauritius",
        code: "+230",
        iso: "MU",
        flag: "/countries/mu.svg",
        mask: "###-####"
    }, {name: "Mayotte", code: "+262", iso: "YT", flag: "/countries/yt.svg", mask: "#####-####"}, {
        name: "Mexico",
        code: "+52",
        iso: "MX",
        flag: "/countries/mx.svg",
        mask: ["##-##-####", "(###)###-####"]
    }, {
        name: "Micronesia, Federated States of Micronesia",
        code: "+691",
        iso: "FM",
        flag: "/countries/fm.svg",
        mask: "###-####"
    }, {name: "Moldova", code: "+373", iso: "MD", flag: "/countries/md.svg", mask: "####-####"}, {
        name: "Monaco",
        code: "+377",
        iso: "MC",
        flag: "/countries/mc.svg",
        mask: ["##-###-###", "(###)###-###"]
    }, {name: "Mongolia", code: "+976", iso: "MN", flag: "/countries/mn.svg", mask: "##-##-####"}, {
        name: "Montenegro",
        code: "+382",
        iso: "ME",
        flag: "/countries/me.svg",
        mask: "##-###-###"
    }, {name: "Montserrat", code: "+1", iso: "MS", flag: "/countries/ms.svg", mask: "(664)###-####"}, {
        name: "Morocco",
        code: "+212",
        iso: "MA",
        flag: "/countries/ma.svg",
        mask: "##-####-###"
    }, {name: "Mozambique", code: "+258", iso: "MZ", flag: "/countries/mz.svg", mask: "##-###-###"}, {
        name: "Myanmar",
        code: "+95",
        iso: "MM",
        flag: "/countries/mm.svg",
        mask: ["###-###", "#-###-###", "##-###-###"]
    }, {name: "Namibia", code: "+224", iso: "NA", flag: "/countries/na.svg", mask: "##-###-####"}, {
        name: "Nauru",
        code: "+674",
        iso: "NR",
        flag: "/countries/nr.svg",
        mask: "###-####"
    }, {name: "Nepal", code: "+977", iso: "NP", flag: "/countries/np.svg", mask: "##-###-###"}, {
        name: "Netherlands",
        code: "+31",
        iso: "NL",
        flag: "/countries/nl.svg",
        mask: "##-###-####"
    }, {
        name: "Netherlands Antilles",
        code: "+599",
        iso: "AN",
        flag: "/countries/an.svg",
        mask: ["###-####", "9###-####"]
    }, {
        name: "New Caledonia",
        code: "+687",
        iso: "NC",
        flag: "/countries/nc.svg",
        mask: "##-####"
    }, {
        name: "New Zealand",
        code: "+24",
        iso: "NZ",
        flag: "/countries/nz.svg",
        mask: ["#-###-###", "(###)###-###", "(###)###-####"]
    }, {name: "Nicaragua", code: "+505", iso: "NI", flag: "/countries/ni.svg", mask: "####-####"}, {
        name: "Niger",
        code: "+227",
        iso: "NE",
        flag: "/countries/ne.svg",
        mask: "##-##-####"
    }, {
        name: "Nigeria",
        code: "+234",
        iso: "NG",
        flag: "/countries/ng.svg",
        mask: ["##-###-##", "##-###-###", "(###)###-####"]
    }, {name: "Niue", code: "+683", iso: "NU", flag: "/countries/nu.svg", mask: "####"}, {
        name: "Norfolk Island",
        code: "+672",
        iso: "NF",
        flag: "/countries/nf.svg",
        mask: "3##-###"
    }, {
        name: "North Macedonia",
        code: "+389",
        iso: "MK",
        flag: "/countries/mk.svg",
        mask: "##-###-###"
    }, {
        name: "Northern Mariana Islands",
        code: "+1",
        iso: "MP",
        flag: "/countries/mp.svg",
        mask: "(670)###-####"
    }, {name: "Norway", code: "+47", iso: "NO", flag: "/countries/no.svg", mask: "(###)##-###"}, {
        name: "Oman",
        code: "+968",
        iso: "OM",
        flag: "/countries/om.svg",
        mask: "##-###-###"
    }, {name: "Pakistan", code: "+92", iso: "PK", flag: "/countries/pk.svg", mask: "(###)###-####"}, {
        name: "Palau",
        code: "+680",
        iso: "PW",
        flag: "/countries/pw.svg",
        mask: "###-####"
    }, {name: "Palestine", code: "+970", iso: "PS", flag: "/countries/ps.svg", mask: "##-###-####"}, {
        name: "Panama",
        code: "+507",
        iso: "PA",
        flag: "/countries/pa.svg",
        mask: "###-####"
    }, {
        name: "Papua New Guinea",
        code: "+675",
        iso: "PG",
        flag: "/countries/pg.svg",
        mask: "(###)##-###"
    }, {name: "Paraguay", code: "+595", iso: "PY", flag: "/countries/py.svg", mask: "(###)###-###"}, {
        name: "Peru",
        code: "+51",
        iso: "PE",
        flag: "/countries/pe.svg",
        mask: "(###)###-###"
    }, {
        name: "Philippines",
        code: "+63",
        iso: "PH",
        flag: "/countries/ph.svg",
        mask: "(###)###-####"
    }, {name: "Pitcairn", code: "+870", iso: "PN", flag: "/countries/pn.svg", mask: "###-###-###"}, {
        name: "Poland",
        code: "+48",
        iso: "PL",
        flag: "/countries/pl.svg",
        mask: "(###)###-###"
    }, {
        name: "Portugal",
        code: "+351",
        iso: "PT",
        flag: "/countries/pt.svg",
        mask: "##-###-####"
    }, {
        name: "Puerto Rico",
        code: "+1",
        iso: "PR",
        flag: "/countries/pr.svg",
        mask: ["(787) ### ####", "(939) ### ####"]
    }, {name: "Qatar", code: "+974", iso: "QA", flag: "/countries/qa.svg", mask: "####-####"}, {
        name: "Reunion",
        code: "+262",
        iso: "RE",
        flag: "/countries/re.svg",
        mask: "#####-####"
    }, {name: "Romania", code: "+40", iso: "RO", flag: "/countries/ro.svg", mask: "##-###-####"}, {
        name: "Russia",
        code: "+7",
        iso: "RU",
        flag: "/countries/ru.svg",
        mask: "(###)###-##-##"
    }, {
        name: "Rwanda",
        code: "+250",
        iso: "RW",
        flag: "/countries/rw.svg",
        mask: "(###)###-###"
    }, {
        name: "Saint Barthelemy",
        code: "+590",
        iso: "BL",
        flag: "/countries/bl.svg",
        mask: "###-##-##-##"
    }, {
        name: "Saint Helena, Ascension and Tristan Da Cunha",
        code: "+290",
        iso: "SH",
        flag: "/countries/sh.svg",
        mask: "####"
    }, {
        name: "Saint Kitts and Nevis",
        code: "+1",
        iso: "KN",
        flag: "/countries/kn.svg",
        mask: "(869)###-####"
    }, {
        name: "Saint Lucia",
        code: "+1",
        iso: "LC",
        flag: "/countries/lc.svg",
        mask: "(758)###-####"
    }, {
        name: "Saint Martin",
        code: "+590",
        iso: "MF",
        flag: "/countries/mf.svg",
        mask: "(###)###-###"
    }, {
        name: "Saint Pierre and Miquelon",
        code: "+508",
        iso: "PM",
        flag: "/countries/pm.svg",
        mask: "##-####"
    }, {
        name: "Saint Vincent and the Grenadines",
        code: "+1",
        iso: "VC",
        flag: "/countries/vc.svg",
        mask: "(784)###-####"
    }, {name: "Samoa", code: "+685", iso: "WS", flag: "/countries/ws.svg", mask: "##-####"}, {
        name: "San Marino",
        code: "+378",
        iso: "SM",
        flag: "/countries/sm.svg",
        mask: "####-######"
    }, {
        name: "Sao Tome and Principe",
        code: "+239",
        iso: "ST",
        flag: "/countries/st.svg",
        mask: "##-#####"
    }, {
        name: "Saudi Arabia",
        code: "+966",
        iso: "SA",
        flag: "/countries/sa.svg",
        mask: ["#-###-####", "5#-####-####"]
    }, {name: "Senegal", code: "+221", iso: "SN", flag: "/countries/sn.svg", mask: "##-###-####"}, {
        name: "Serbia",
        code: "+381",
        iso: "RS",
        flag: "/countries/rs.svg",
        mask: "##-###-####"
    }, {
        name: "Seychelles",
        code: "+248",
        iso: "SC",
        flag: "/countries/sc.svg",
        mask: "#-###-###"
    }, {
        name: "Sierra Leone",
        code: "+232",
        iso: "SL",
        flag: "/countries/sl.svg",
        mask: "##-######"
    }, {name: "Singapore", code: "+65", iso: "SG", flag: "/countries/sg.svg", mask: "####-####"}, {
        name: "Sint Maarten",
        code: "+1",
        iso: "SX",
        flag: "/countries/sx.svg",
        mask: "(721)###-####"
    }, {name: "Slovakia", code: "+421", iso: "SK", flag: "/countries/sk.svg", mask: "(###)###-###"}, {
        name: "Slovenia",
        code: "+386",
        iso: "SI",
        flag: "/countries/si.svg",
        mask: "##-###-###"
    }, {
        name: "Solomon Islands",
        code: "+677",
        iso: "SB",
        flag: "/countries/sb.svg",
        mask: ["#####", "###-####"]
    }, {
        name: "Somalia",
        code: "+252",
        iso: "SO",
        flag: "/countries/so.svg",
        mask: ["#-###-###", "##-###-###"]
    }, {
        name: "South Africa",
        code: "+27",
        iso: "ZA",
        flag: "/countries/za.svg",
        mask: "##-###-####"
    }, {
        name: "South Georgia and the South Sandwich Islands",
        code: "+500",
        iso: "GS",
        flag: "/countries/gs.svg",
        mask: "#####"
    }, {name: "South Sudan", code: "+211", iso: "SS", flag: "/countries/ss.svg", mask: "##-###-####"}, {
        name: "Spain",
        code: "+34",
        iso: "ES",
        flag: "/countries/es.svg",
        mask: "(###)###-###"
    }, {name: "Sri Lanka", code: "+94", iso: "LK", flag: "/countries/lk.svg", mask: "##-###-####"}, {
        name: "Sudan",
        code: "+249",
        iso: "SD",
        flag: "/countries/sd.svg",
        mask: "##-###-####"
    }, {
        name: "Suriname",
        code: "+597",
        iso: "SR",
        flag: "/countries/sr.svg",
        mask: ["###-###", "###-####"]
    }, {
        name: "Svalbard and Jan Mayen",
        code: "+47",
        iso: "SJ",
        flag: "/countries/sj.svg",
        mask: "(###)##-###"
    }, {name: "Sweden", code: "+46", iso: "SE", flag: "/countries/se.svg", mask: "##-###-####"}, {
        name: "Switzerland",
        code: "+41",
        iso: "CH",
        flag: "/countries/ch.svg",
        mask: "##-###-####"
    }, {
        name: "Syrian Arab Republic",
        code: "+963",
        iso: "SY",
        flag: "/countries/sy.svg",
        mask: "##-####-###"
    }, {
        name: "Taiwan",
        code: "+886",
        iso: "TW",
        flag: "/countries/tw.svg",
        mask: ["####-####", "#-####-####"]
    }, {
        name: "Tajikistan",
        code: "+992",
        iso: "TJ",
        flag: "/countries/tj.svg",
        mask: "##-###-####"
    }, {
        name: "Tanzania, United Republic of Tanzania",
        code: "+255",
        iso: "TZ",
        flag: "/countries/tz.svg",
        mask: "##-###-####"
    }, {
        name: "Thailand",
        code: "+66",
        iso: "TH",
        flag: "/countries/th.svg",
        mask: ["##-###-###", "##-###-####"]
    }, {
        name: "Timor-Leste",
        code: "+670",
        iso: "TL",
        flag: "/countries/tl.svg",
        mask: ["###-####", "77#-#####", "78#-#####"]
    }, {name: "Togo", code: "+228", iso: "TG", flag: "/countries/tg.svg", mask: "##-###-###"}, {
        name: "Tokelau",
        code: "+690",
        iso: "TK",
        flag: "/countries/tk.svg",
        mask: "####"
    }, {name: "Tonga", code: "+676", iso: "TO", flag: "/countries/to.svg", mask: "#####"}, {
        name: "Trinidad and Tobago",
        code: "+1",
        iso: "TT",
        flag: "/countries/tt.svg",
        mask: "(868)###-####"
    }, {name: "Tunisia", code: "+216", iso: "TN", flag: "/countries/tn.svg", mask: "##-###-###"}, {
        name: "Turkey",
        code: "+90",
        iso: "TR",
        flag: "/countries/tr.svg",
        mask: "(###)###-####"
    }, {
        name: "Turkmenistan",
        code: "+993",
        iso: "TM",
        flag: "/countries/tm.svg",
        mask: "#-###-####"
    }, {
        name: "Turks and Caicos Islands",
        code: "+1",
        iso: "TC",
        flag: "/countries/tc.svg",
        mask: "(249)###-###"
    }, {name: "Tuvalu", code: "+688", iso: "TV", flag: "/countries/tv.svg", mask: ["2####", "90####"]}, {
        name: "Uganda",
        code: "+256",
        iso: "UG",
        flag: "/countries/ug.svg",
        mask: "(###)###-###"
    }, {
        name: "Ukraine",
        code: "+380",
        iso: "UA",
        flag: "/countries/ua.svg",
        mask: "(##)###-##-##"
    }, {
        name: "United Arab Emirates",
        code: "+971",
        iso: "AE",
        flag: "/countries/ae.svg",
        mask: ["#-###-####", "5#-###-####"]
    }, {
        name: "United Kingdom",
        code: "+44",
        iso: "GB",
        flag: "/countries/gb.svg",
        mask: "##-####-####"
    }, {
        name: "United States",
        code: "+1",
        iso: "US",
        flag: "/countries/us.svg",
        mask: "(###)###-####"
    }, {name: "Uruguay", code: "+598", iso: "UY", flag: "/countries/uy.svg", mask: "#-###-##-##"}, {
        name: "Uzbekistan",
        code: "+998",
        iso: "UZ",
        flag: "/countries/uz.svg",
        mask: "##-###-####"
    }, {
        name: "Vanuatu",
        code: "+678",
        iso: "VU",
        flag: "/countries/vu.svg",
        mask: ["#####", "##-#####"]
    }, {
        name: "Venezuela, Bolivarian Republic of Venezuela",
        code: "+58",
        iso: "VE",
        flag: "/countries/ve.svg",
        mask: "(###)###-####"
    }, {
        name: "Vietnam",
        code: "+84",
        iso: "VN",
        flag: "/countries/vn.svg",
        mask: ["##-####-###", "(###)####-###"]
    }, {
        name: "Virgin Islands, British",
        code: "+1",
        iso: "VG",
        flag: "/countries/vg.svg",
        mask: "(284)###-####"
    }, {
        name: "Virgin Islands, U.S.",
        code: "+1",
        iso: "VI",
        flag: "/countries/vi.svg",
        mask: "(340)###-####"
    }, {name: "Wallis and Futuna", code: "+681", iso: "WF", flag: "/countries/wf.svg", mask: "##-####"}, {
        name: "Yemen",
        code: "+967",
        iso: "YE",
        flag: "/countries/ye.svg",
        mask: ["#-###-###", "##-###-###", "###-###-###"]
    }, {name: "Zambia", code: "+260", iso: "ZM", flag: "/countries/zm.svg", mask: "##-###-####"}, {
        name: "Zimbabwe",
        code: "+263",
        iso: "ZW",
        flag: "/countries/zw.svg",
        mask: "#-######"
    }], oc = {
        AC: "40123",
        AD: "312345",
        AE: "501234567",
        AF: "701234567",
        AG: "2684641234",
        AI: "2642351234",
        AL: "672123456",
        AM: "77123456",
        AO: "923123456",
        AR: "91123456789",
        AS: "6847331234",
        AT: "664123456",
        AU: "412345678",
        AW: "5601234",
        AX: "412345678",
        AZ: "401234567",
        BA: "61123456",
        BB: "2462501234",
        BD: "1812345678",
        BE: "470123456",
        BF: "70123456",
        BG: "48123456",
        BH: "36001234",
        BI: "79561234",
        BJ: "90011234",
        BL: "690001234",
        BM: "4413701234",
        BN: "7123456",
        BO: "71234567",
        BQ: "3181234",
        BR: "11961234567",
        BS: "2423591234",
        BT: "17123456",
        BW: "71123456",
        BY: "294911911",
        BZ: "6221234",
        CA: "5062345678",
        CC: "412345678",
        CD: "991234567",
        CF: "70012345",
        CG: "061234567",
        CH: "781234567",
        CI: "01234567",
        CK: "71234",
        CL: "221234567",
        CM: "671234567",
        CN: "13123456789",
        CO: "3211234567",
        CR: "83123456",
        CU: "51234567",
        CV: "9911234",
        CW: "95181234",
        CX: "412345678",
        CY: "96123456",
        CZ: "601123456",
        DE: "15123456789",
        DJ: "77831001",
        DK: "32123456",
        DM: "7672251234",
        DO: "8092345678",
        DZ: "551234567",
        EC: "991234567",
        EE: "51234567",
        EG: "1001234567",
        EH: "650123456",
        ER: "7123456",
        ES: "612345678",
        ET: "911234567",
        FI: "412345678",
        FJ: "7012345",
        FK: "51234",
        FM: "3501234",
        FO: "211234",
        FR: "612345678",
        GA: "06031234",
        GB: "7400123456",
        GD: "4734031234",
        GE: "555123456",
        GF: "694201234",
        GG: "7781123456",
        GH: "231234567",
        GI: "57123456",
        GL: "221234",
        GM: "3012345",
        GN: "601123456",
        GP: "690001234",
        GQ: "222123456",
        GR: "6912345678",
        GT: "51234567",
        GU: "6713001234",
        GW: "955012345",
        GY: "6091234",
        HK: "51234567",
        HN: "91234567",
        HR: "921234567",
        HT: "34101234",
        HU: "201234567",
        ID: "812345678",
        IE: "850123456",
        IL: "502345678",
        IM: "7924123456",
        IN: "8123456789",
        IO: "3801234",
        IQ: "7912345678",
        IR: "9123456789",
        IS: "6111234",
        IT: "3123456789",
        JE: "7797712345",
        JM: "8762101234",
        JO: "790123456",
        JP: "9012345678",
        KE: "712123456",
        KG: "700123456",
        KH: "91234567",
        KI: "72001234",
        KM: "3212345",
        KN: "8697652917",
        KP: "1921234567",
        KR: "1020000000",
        KW: "50012345",
        KY: "3453231234",
        KZ: "7710009998",
        LA: "2023123456",
        LB: "71123456",
        LC: "7582845678",
        LI: "660234567",
        LK: "712345678",
        LR: "770123456",
        LS: "50123456",
        LT: "61234567",
        LU: "628123456",
        LV: "21234567",
        LY: "912345678",
        MA: "650123456",
        MC: "612345678",
        MD: "62112345",
        ME: "67622901",
        MF: "690001234",
        MG: "321234567",
        MH: "2351234",
        MK: "72345678",
        ML: "65012345",
        MM: "92123456",
        MN: "88123456",
        MO: "66123456",
        MP: "6702345678",
        MQ: "696201234",
        MR: "22123456",
        MS: "6644923456",
        MT: "96961234",
        MU: "52512345",
        MV: "7712345",
        MW: "991234567",
        MX: "12221234567",
        MY: "123456789",
        MZ: "821234567",
        NA: "811234567",
        NC: "751234",
        NE: "93123456",
        NF: "381234",
        NG: "8021234567",
        NI: "81234567",
        NL: "612345678",
        NO: "40612345",
        NP: "9841234567",
        NR: "5551234",
        NU: "8884012",
        NZ: "211234567",
        OM: "92123456",
        PA: "61234567",
        PE: "912345678",
        PF: "87123456",
        PG: "70123456",
        PH: "9051234567",
        PK: "3012345678",
        PL: "512345678",
        PM: "551234",
        PR: "7872345678",
        PS: "599123456",
        PT: "912345678",
        PW: "6201234",
        PY: "961456789",
        QA: "33123456",
        RE: "692123456",
        RO: "712034567",
        RS: "601234567",
        RU: "9123456789",
        RW: "720123456",
        SA: "512345678",
        SB: "7421234",
        SC: "2510123",
        SD: "911231234",
        SE: "701234567",
        SG: "81234567",
        SH: "51234",
        SI: "31234567",
        SJ: "41234567",
        SK: "912123456",
        SL: "25123456",
        SM: "66661212",
        SN: "701234567",
        SO: "71123456",
        SR: "7412345",
        SS: "977123456",
        ST: "9812345",
        SV: "70123456",
        SX: "7215205678",
        SY: "944567890",
        SZ: "76123456",
        TA: "8999",
        TC: "6492311234",
        TD: "63012345",
        TG: "90112345",
        TH: "812345678",
        TJ: "917123456",
        TK: "7290",
        TL: "77212345",
        TM: "66123456",
        TN: "20123456",
        TO: "7715123",
        TR: "5012345678",
        TT: "8682911234",
        TV: "901234",
        TW: "912345678",
        TZ: "621234567",
        UA: "501234567",
        UG: "712345678",
        US: "2015550123",
        UY: "94231234",
        UZ: "912345678",
        VA: "3123456789",
        VC: "7844301234",
        VE: "4121234567",
        VG: "2843001234",
        VI: "3406421234",
        VN: "912345678",
        VU: "5912345",
        WF: "501234",
        WS: "7212345",
        XK: "43201234",
        YE: "712345678",
        YT: "639012345",
        ZA: "711234567",
        ZM: "955123456",
        ZW: "712345678"
    }, sc = {
        version: 4, country_calling_codes: {
            1: ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"],
            7: ["RU", "KZ"],
            20: ["EG"],
            27: ["ZA"],
            30: ["GR"],
            31: ["NL"],
            32: ["BE"],
            33: ["FR"],
            34: ["ES"],
            36: ["HU"],
            39: ["IT", "VA"],
            40: ["RO"],
            41: ["CH"],
            43: ["AT"],
            44: ["GB", "GG", "IM", "JE"],
            45: ["DK"],
            46: ["SE"],
            47: ["NO", "SJ"],
            48: ["PL"],
            49: ["DE"],
            51: ["PE"],
            52: ["MX"],
            53: ["CU"],
            54: ["AR"],
            55: ["BR"],
            56: ["CL"],
            57: ["CO"],
            58: ["VE"],
            60: ["MY"],
            61: ["AU", "CC", "CX"],
            62: ["ID"],
            63: ["PH"],
            64: ["NZ"],
            65: ["SG"],
            66: ["TH"],
            81: ["JP"],
            82: ["KR"],
            84: ["VN"],
            86: ["CN"],
            90: ["TR"],
            91: ["IN"],
            92: ["PK"],
            93: ["AF"],
            94: ["LK"],
            95: ["MM"],
            98: ["IR"],
            211: ["SS"],
            212: ["MA", "EH"],
            213: ["DZ"],
            216: ["TN"],
            218: ["LY"],
            220: ["GM"],
            221: ["SN"],
            222: ["MR"],
            223: ["ML"],
            224: ["GN"],
            225: ["CI"],
            226: ["BF"],
            227: ["NE"],
            228: ["TG"],
            229: ["BJ"],
            230: ["MU"],
            231: ["LR"],
            232: ["SL"],
            233: ["GH"],
            234: ["NG"],
            235: ["TD"],
            236: ["CF"],
            237: ["CM"],
            238: ["CV"],
            239: ["ST"],
            240: ["GQ"],
            241: ["GA"],
            242: ["CG"],
            243: ["CD"],
            244: ["AO"],
            245: ["GW"],
            246: ["IO"],
            247: ["AC"],
            248: ["SC"],
            249: ["SD"],
            250: ["RW"],
            251: ["ET"],
            252: ["SO"],
            253: ["DJ"],
            254: ["KE"],
            255: ["TZ"],
            256: ["UG"],
            257: ["BI"],
            258: ["MZ"],
            260: ["ZM"],
            261: ["MG"],
            262: ["RE", "YT"],
            263: ["ZW"],
            264: ["NA"],
            265: ["MW"],
            266: ["LS"],
            267: ["BW"],
            268: ["SZ"],
            269: ["KM"],
            290: ["SH", "TA"],
            291: ["ER"],
            297: ["AW"],
            298: ["FO"],
            299: ["GL"],
            350: ["GI"],
            351: ["PT"],
            352: ["LU"],
            353: ["IE"],
            354: ["IS"],
            355: ["AL"],
            356: ["MT"],
            357: ["CY"],
            358: ["FI", "AX"],
            359: ["BG"],
            370: ["LT"],
            371: ["LV"],
            372: ["EE"],
            373: ["MD"],
            374: ["AM"],
            375: ["BY"],
            376: ["AD"],
            377: ["MC"],
            378: ["SM"],
            380: ["UA"],
            381: ["RS"],
            382: ["ME"],
            383: ["XK"],
            385: ["HR"],
            386: ["SI"],
            387: ["BA"],
            389: ["MK"],
            420: ["CZ"],
            421: ["SK"],
            423: ["LI"],
            500: ["FK"],
            501: ["BZ"],
            502: ["GT"],
            503: ["SV"],
            504: ["HN"],
            505: ["NI"],
            506: ["CR"],
            507: ["PA"],
            508: ["PM"],
            509: ["HT"],
            590: ["GP", "BL", "MF"],
            591: ["BO"],
            592: ["GY"],
            593: ["EC"],
            594: ["GF"],
            595: ["PY"],
            596: ["MQ"],
            597: ["SR"],
            598: ["UY"],
            599: ["CW", "BQ"],
            670: ["TL"],
            672: ["NF"],
            673: ["BN"],
            674: ["NR"],
            675: ["PG"],
            676: ["TO"],
            677: ["SB"],
            678: ["VU"],
            679: ["FJ"],
            680: ["PW"],
            681: ["WF"],
            682: ["CK"],
            683: ["NU"],
            685: ["WS"],
            686: ["KI"],
            687: ["NC"],
            688: ["TV"],
            689: ["PF"],
            690: ["TK"],
            691: ["FM"],
            692: ["MH"],
            850: ["KP"],
            852: ["HK"],
            853: ["MO"],
            855: ["KH"],
            856: ["LA"],
            880: ["BD"],
            886: ["TW"],
            960: ["MV"],
            961: ["LB"],
            962: ["JO"],
            963: ["SY"],
            964: ["IQ"],
            965: ["KW"],
            966: ["SA"],
            967: ["YE"],
            968: ["OM"],
            970: ["PS"],
            971: ["AE"],
            972: ["IL"],
            973: ["BH"],
            974: ["QA"],
            975: ["BT"],
            976: ["MN"],
            977: ["NP"],
            992: ["TJ"],
            993: ["TM"],
            994: ["AZ"],
            995: ["GE"],
            996: ["KG"],
            998: ["UZ"]
        }, countries: {
            AC: ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6]],
            AD: ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]]],
            AE: ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0"],
            AF: ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0"],
            AG: ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([457]\\d{6})$", "268$1", 0, "268"],
            AI: ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2457]\\d{6})$", "264$1", 0, "264"],
            AL: ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0"],
            AM: ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0"],
            AO: ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]]],
            AR: ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1"],
            AS: ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "1|([267]\\d{6})$", "684$1", 0, "684"],
            AT: ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0"],
            AU: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "0|(183[12])", 0, 0, 0, [["(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8]))\\d{3}|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4]))|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}", [9]], ["4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, ["163\\d{2,6}", [5, 6, 7, 8, 9]], ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"],
            AW: ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]]],
            AX: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", 0, "00"],
            AZ: ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0"],
            BA: ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0"],
            BB: ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "246$1", 0, "246"],
            BD: ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|22"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0"],
            BE: ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0"],
            BF: ["226", "00", "[025-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]]],
            BG: ["359", "00", "[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0"],
            BH: ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[047]"]]]],
            BI: ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]]],
            BJ: ["229", "00", "(?:[25689]\\d|40)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]]]],
            BL: ["590", "00", "(?:590|(?:69|80)\\d|976)\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:2[7-9]|5[12]|87)\\d{4}"], ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["976[01]\\d{5}"]]],
            BM: ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "441$1", 0, "441"],
            BN: ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]]],
            BO: ["591", "00(?:1\\d)?", "(?:[2-467]\\d\\d|8001)\\d{5}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"]], ["(\\d{8})", "$1", ["[67]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?"],
            BQ: ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"],
            BR: ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2"],
            BS: ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([3-8]\\d{6})$", "242$1", 0, "242"],
            BT: ["975", "00", "[17]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]]],
            BW: ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-79]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]]],
            BY: ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, 0, "8~10"],
            BZ: ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]]],
            CA: ["1", "011", "(?:[2-8]\\d|90)\\d{8}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [["(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|6[578])|4(?:03|1[68]|3[178]|50|68|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", [10]], ["", [10]], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]], ["900[2-9]\\d{6}", [10]], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:00|2[125-7]|33|44|66|77|88)|622)[2-9]\\d{6}", [10]], 0, ["310\\d{4}", [7]], 0, ["600[2-9]\\d{6}", [10]]]],
            CC: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "0|([59]\\d{7})$", "8$1", 0, 0, [["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]], ["4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"],
            CD: ["243", "00", "[189]\\d{8}|[1-68]\\d{6}", [7, 9], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"]], "0"],
            CF: ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]]],
            CG: ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]]],
            CH: ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0"],
            CI: ["225", "00", "[02]\\d{9}", [10], [["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]]],
            CK: ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]]],
            CL: ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]]],
            CM: ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]]],
            CN: ["86", "00|1(?:[12]\\d|79)\\d\\d00", "1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "(?:10|2[0-57-9])(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "0|(1(?:[12]\\d|79)\\d\\d)", 0, 0, 0, 0, "00"],
            CO: ["57", "00(?:4(?:[14]4|56)|[579])", "(?:60\\d\\d|9101)\\d{6}|(?:1\\d|3)\\d{9}", [10, 11], [["(\\d{3})(\\d{7})", "$1 $2", ["6"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["[39]"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0(4(?:[14]4|56)|[579])?"],
            CR: ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))"],
            CU: ["53", "119", "[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0"],
            CV: ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]]],
            CW: ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]"],
            CX: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "0|([59]\\d{7})$", "8$1", 0, 0, [["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]], ["4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"],
            CY: ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]]],
            CZ: ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]]],
            DE: ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[02-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|[23]1|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0"],
            DJ: ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]]],
            DK: ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]]],
            DM: ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "767$1", 0, "767"],
            DO: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9"],
            DZ: ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0"],
            EC: ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0"],
            EE: ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]],
            EG: ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[189]"], "0$1"]], "0"],
            EH: ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]"],
            ER: ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0"],
            ES: ["34", "00", "[5-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]]],
            ET: ["251", "00", "(?:11|[2-579]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-579]"], "0$1"]], "0"],
            FI: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d)(\\d{4,9})", "$1 $2", ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[12]00|[368]|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[1245]|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", 0, "00"],
            FJ: ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            FK: ["500", "00", "[2-7]\\d{4}", [5]],
            FM: ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]]],
            FO: ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))"],
            FR: ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0"],
            GA: ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1"],
            GB: ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0235])|4(?:[0-5]\\d\\d|69[7-9]|70[01359])|(?:5[0-26-9]|[78][0-49])\\d\\d|6(?:[0-4]\\d\\d|50[0-79]))|2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d\\d|1(?:[0-7]\\d\\d|8(?:[02]\\d|1[0-26-9])))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]], ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]], 0, " x"],
            GD: ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "473$1", 0, "473"],
            GE: ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0"],
            GF: ["594", "00", "(?:[56]94|80\\d|976)\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
            GG: ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "0|([25-9]\\d{5})$", "1481$1", 0, 0, [["1481[25-9]\\d{5}", [10]], ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]]],
            GH: ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], "0"],
            GI: ["350", "00", "(?:[25]\\d\\d|606)\\d{5}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]]],
            GL: ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]]],
            GM: ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]],
            GN: ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]]],
            GP: ["590", "00", "(?:590|(?:69|80)\\d|976)\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [["590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1289]|5[3-579]|6[0-289]|7[08]|8[0-689]|9\\d)\\d{4}"], ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["976[01]\\d{5}"]]],
            GQ: ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]]],
            GR: ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]]],
            GT: ["502", "00", "(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]],
            GU: ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "1|([3-9]\\d{6})$", "671$1", 0, "671"],
            GW: ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]]],
            GY: ["592", "001", "9008\\d{3}|(?:[2-467]\\d\\d|862)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46-9]"]]]],
            HK: ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            HN: ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]]],
            HR: ["385", "00", "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", [6, 7, 8, 9], [["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0"],
            HT: ["509", "00", "[2-489]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-489]"]]]],
            HU: ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], "06"],
            ID: ["62", "00[89]", "(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0"],
            IE: ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
            IL: ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0"],
            IM: ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "0|([25-8]\\d{5})$", "1624$1", 0, "74576|(?:16|7[56])24"],
            IN: ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0"],
            IO: ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]]],
            IQ: ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"],
            IR: ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0"],
            IS: ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            IT: ["39", "00", "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"], ["3[1-9]\\d{8}|3[2-9]\\d{7}", [9, 10]], ["80(?:0\\d{3}|3)\\d{3}", [6, 9]], ["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [6, 8, 9, 10]], ["1(?:78\\d|99)\\d{6}", [9, 10]], 0, 0, 0, ["55\\d{8}", [10]], ["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]]],
            JE: ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "0|([0-24-8]\\d{5})$", "1534$1", 0, 0, [["1534[0-24-8]\\d{5}"], ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"], ["80(?:07(?:35|81)|8901)\\d{4}"], ["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"], ["701511\\d{4}"], 0, ["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"], ["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"], ["56\\d{8}"]]],
            JM: ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"],
            JO: ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"],
            JP: ["81", "010", "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9]|636)|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9]|636[457-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[27-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|51|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"]], "0"],
            KE: ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0"],
            KG: ["996", "00", "8\\d{9}|(?:[235-8]\\d|99)\\d{7}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
            KH: ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"],
            KI: ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"],
            KM: ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]]],
            KN: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "869$1", 0, "869"],
            KP: ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0"],
            KR: ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?"],
            KW: ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]]],
            KY: ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "345$1", 0, "345"],
            KZ: ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33|7", 0, "8~10"],
            LA: ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[013-9]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0"],
            LB: ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], "0"],
            LC: ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "758$1", 0, "758"],
            LI: ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "0|(1001)"],
            LK: ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0"],
            LR: ["231", "00", "(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3578]"], "0$1"]], "0"],
            LS: ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]]],
            LT: ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(8-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(8-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", 1]], "8", 0, "[08]"],
            LU: ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"],
            LV: ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]]],
            LY: ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0"],
            MA: ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{5})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29[89]|389)", "5(?:29[89]|389)0"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], ["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9]|9)|892", "5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["5(?:29(?:[189][05]|2[29]|3[01])|389[05])\\d{4}|5(?:2(?:[0-25-7]\\d|3[1-578]|4[02-46-8]|8[0235-7]|90)|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[08]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"], ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[017]\\d|2[0-2]|6[0-8]))\\d{6}"], ["80\\d{7}"], ["89\\d{7}"], 0, 0, 0, 0, ["592(?:4[0-2]|93)\\d{4}"]]],
            MC: ["377", "00", "(?:[3489]|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], "0"],
            MD: ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0"],
            ME: ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0"],
            MF: ["590", "00", "(?:590|(?:69|80)\\d|976)\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"], ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["976[01]\\d{5}"]]],
            MG: ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "0|([24-9]\\d{6})$", "20$1"],
            MH: ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1"],
            MK: ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0"],
            ML: ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]]],
            MM: ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0"],
            MN: ["976", "001", "[12]\\d{7,9}|[5-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0"],
            MO: ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8], [["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]]],
            MP: ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "670$1", 0, "670"],
            MQ: ["596", "00", "(?:69|80)\\d{7}|(?:59|97)6\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
            MR: ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]]],
            MS: ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "1|([34]\\d{6})$", "664$1", 0, "664"],
            MT: ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]]],
            MU: ["230", "0(?:0|[24-7]0|3[03])", "(?:5|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["5"]], ["(\\d{5})(\\d{5})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, 0, "020"],
            MV: ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9[13-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            MW: ["265", "00", "(?:[129]\\d|31|77|88)\\d{7}|1\\d{6}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], "0"],
            MX: ["52", "0[09]", "1(?:(?:44|99)[1-9]|65[0-689])\\d{7}|(?:1(?:[017]\\d|[235][1-9]|4[0-35-9]|6[0-46-9]|8[1-79]|9[1-8])|[2-9]\\d)\\d{8}", [10, 11], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], 0, 1], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], 0, 1], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], 0, 1]], "01", 0, "0(?:[12]|4[45])|1", 0, 0, 0, 0, "00"],
            MY: ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0"],
            MZ: ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]],
            NA: ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"],
            NC: ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]]],
            NE: ["227", "00", "[027-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[04]"]]]],
            NF: ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1"],
            NG: ["234", "009", "(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}", [7, 8, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-7]|8[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0"],
            NI: ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]]],
            NL: ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], ["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], "0"],
            NO: ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]|59"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]"],
            NP: ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0"],
            NR: ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]]],
            NU: ["683", "00", "(?:[47]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]]],
            NZ: ["64", "0(?:0|161)", "[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-579]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|[89]0", "50(?:[0367]|88)|[89]0"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[59]|80"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7|86"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "00"],
            OM: ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]]],
            PA: ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]]],
            PE: ["51", "00|19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, 0, "00", " Anexo "],
            PF: ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]],
            PG: ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            PH: ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0"],
            PK: ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0"],
            PL: ["48", "00", "6\\d{5}(?:\\d{2})?|8\\d{9}|[1-9]\\d{6}(?:\\d{2})?", [6, 7, 8, 9, 10], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]]],
            PM: ["508", "00", "(?:[45]|80\\d\\d)\\d{5}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
            PR: ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"],
            PS: ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"],
            PT: ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]]],
            PW: ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]],
            PY: ["595", "00", "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-6])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], "0"],
            QA: ["974", "00", "[2-7]\\d{7}|800\\d{4}(?:\\d{2})?|2\\d{6}", [7, 8, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["2[126]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]]]],
            RE: ["262", "00", "976\\d{6}|(?:26|[68]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"], "0$1"]], "0", 0, 0, 0, 0, "26[23]|69|[89]"],
            RO: ["40", "00", "(?:[2378]\\d|90)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[237-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, " int "],
            RS: ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0"],
            RU: ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1], ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], "8", 0, 0, 0, 0, "3[04-689]|[489]", 0, "8~10"],
            RW: ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]]], "0"],
            SA: ["966", "00", "92\\d{7}|(?:[15]|8\\d)\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0"],
            SB: ["677", "0[01]", "(?:[1-6]|[7-9]\\d\\d)\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]]],
            SC: ["248", "010|0[0-2]", "800\\d{4}|(?:[249]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            SD: ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0"],
            SE: ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0"],
            SG: ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-5]|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]],
            SH: ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"],
            SI: ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, 0, "00"],
            SJ: ["47", "00", "0\\d{4}|(?:[489]\\d|[57]9)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"],
            SK: ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], "0"],
            SL: ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0"],
            SM: ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1"],
            SN: ["221", "00", "(?:[378]\\d|93)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]]],
            SO: ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d)(\\d{7})", "$1 $2", ["24|[67]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3478]|64|90"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6(?:0[5-7]|[1-35-9])|9[2-9]"]]], "0"],
            SR: ["597", "00", "(?:[2-5]|68|[78]\\d)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]]],
            SS: ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0"],
            ST: ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]]],
            SV: ["503", "00", "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]]],
            SX: ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|(5\\d{6})$", "721$1", 0, "721"],
            SY: ["963", "00", "[1-39]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", 1]], "0"],
            SZ: ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]]],
            TA: ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"],
            TC: ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "1|([2-479]\\d{6})$", "649$1", 0, "649"],
            TD: ["235", "00|16", "(?:22|[69]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
            TG: ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]]],
            TH: ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"],
            TJ: ["992", "810", "(?:00|[1-57-9]\\d)\\d{7}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"]], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]], 0, 0, 0, 0, 0, 0, 0, "8~10"],
            TK: ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]],
            TL: ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]]],
            TM: ["993", "810", "[1-6]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"],
            TN: ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]]],
            TO: ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]]],
            TR: ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]], "0"],
            TT: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-46-8]\\d{6})$", "868$1", 0, "868"],
            TV: ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]],
            TW: ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, "#"],
            TZ: ["255", "00[056]", "(?:[26-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0"],
            UA: ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "0~0"],
            UG: ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], "0"],
            US: ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10], [["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [["5(?:05(?:[2-57-9]\\d\\d|6(?:[0-35-9]\\d|44))|82(?:2(?:0[0-3]|[268]2)|3(?:0[02]|22|33)|4(?:00|4[24]|65|82)|5(?:00|29|58|83)|6(?:00|66|82)|7(?:58|77)|8(?:00|42|5[25]|88)|9(?:00|9[89])))\\d{4}|(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[0-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-289]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"], [""], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"], ["900[2-9]\\d{6}"], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-7]|33|44|66|77|88)[2-9]\\d{6}"]]],
            UY: ["598", "0(?:0|1[3-9]\\d)", "4\\d{9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["405|8|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["4"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "00", " int. "],
            UZ: ["998", "810", "(?:33|55|[679]\\d|88)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[35-9]"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"],
            VA: ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11], 0, 0, 0, 0, 0, 0, "06698"],
            VC: ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "784$1", 0, "784"],
            VE: ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0"],
            VG: ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-578]\\d{6})$", "284$1", 0, "284"],
            VI: ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "340$1", 0, "340"],
            VN: ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1], ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[69]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0"],
            VU: ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]]],
            WF: ["681", "00", "(?:40|72)\\d{4}|8\\d{5}(?:\\d{3})?", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[478]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]],
            WS: ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]],
            XK: ["383", "00", "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"]], "0"],
            YE: ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0"],
            YT: ["262", "00", "80\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, "269|63"],
            ZA: ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"],
            ZM: ["260", "00", "800\\d{6}|(?:21|63|[79]\\d)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]], "0"],
            ZW: ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], "0"]
        }, nonGeographic: {
            800: ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]],
            808: ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]],
            870: ["870", 0, "7\\d{11}|[35-7]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"]]],
            878: ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]],
            881: ["881", 0, "[0-36-9]\\d{8}", [9], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-36-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[0-36-9]\\d{8}"]]],
            882: ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|(?:[19]\\d|49)\\d{6}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{6})", "$1 $2", ["4"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[19]"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-3]"]]], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|3(?:2|47|7\\d{3})\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, 0, 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}"]]],
            883: ["883", 0, "(?:210|370\\d\\d)\\d{7}|51\\d{7}(?:\\d{3})?", [9, 10, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[35]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:210|(?:370[1-9]|51[013]0)\\d)\\d{7}|5100\\d{5}"]]],
            888: ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]],
            979: ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]]
        }
    };

    function si(e, t) {
        var n = Array.prototype.slice.call(t);
        return n.push(sc), e.apply(this, n)
    }

    function Vr(e) {
        return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
            return typeof t
        } : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, Vr(e)
    }

    function ii(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function ic(e, t, n) {
        return t && ii(e.prototype, t), n && ii(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
    }

    function ac(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function dc(e, t) {
        if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(e, "prototype", {writable: !1}), t && on(e, t)
    }

    function lc(e) {
        var t = di();
        return function () {
            var r = sn(e), o;
            if (t) {
                var s = sn(this).constructor;
                o = Reflect.construct(r, arguments, s)
            } else o = r.apply(this, arguments);
            return cc(this, o)
        }
    }

    function cc(e, t) {
        if (t && (Vr(t) === "object" || typeof t == "function")) return t;
        if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
        return ai(e)
    }

    function ai(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Wr(e) {
        var t = typeof Map == "function" ? new Map : void 0;
        return Wr = function (r) {
            if (r === null || !uc(r)) return r;
            if (typeof r != "function") throw new TypeError("Super expression must either be null or a function");
            if (typeof t != "undefined") {
                if (t.has(r)) return t.get(r);
                t.set(r, o)
            }

            function o() {
                return Rn(r, arguments, sn(this).constructor)
            }

            return o.prototype = Object.create(r.prototype, {
                constructor: {
                    value: o,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), on(o, r)
        }, Wr(e)
    }

    function Rn(e, t, n) {
        return di() ? Rn = Reflect.construct : Rn = function (o, s, i) {
            var a = [null];
            a.push.apply(a, s);
            var d = Function.bind.apply(o, a), l = new d;
            return i && on(l, i.prototype), l
        }, Rn.apply(null, arguments)
    }

    function di() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
            })), !0
        } catch {
            return !1
        }
    }

    function uc(e) {
        return Function.toString.call(e).indexOf("[native code]") !== -1
    }

    function on(e, t) {
        return on = Object.setPrototypeOf || function (r, o) {
            return r.__proto__ = o, r
        }, on(e, t)
    }

    function sn(e) {
        return sn = Object.setPrototypeOf ? Object.getPrototypeOf : function (n) {
            return n.__proto__ || Object.getPrototypeOf(n)
        }, sn(e)
    }

    var At = function (e) {
            dc(n, e);
            var t = lc(n);

            function n(r) {
                var o;
                return ac(this, n), o = t.call(this, r), Object.setPrototypeOf(ai(o), n.prototype), o.name = o.constructor.name, o
            }

            return ic(n)
        }(Wr(Error)), Zr = 2, fc = 17, $c = 3, lt = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9",
        mc = "-\u2010-\u2015\u2212\u30FC\uFF0D", gc = "\uFF0F/", hc = "\uFF0E.", pc = " \xA0\xAD\u200B\u2060\u3000",
        vc = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]", bc = "~\u2053\u223C\uFF5E",
        Fn = "".concat(mc).concat(gc).concat(hc).concat(pc).concat(vc).concat(bc), qr = "+\uFF0B";

    function li(e, t) {
        e = e.split("-"), t = t.split("-");
        for (var n = e[0].split("."), r = t[0].split("."), o = 0; o < 3; o++) {
            var s = Number(n[o]), i = Number(r[o]);
            if (s > i) return 1;
            if (i > s) return -1;
            if (!isNaN(s) && isNaN(i)) return 1;
            if (isNaN(s) && !isNaN(i)) return -1
        }
        return e[1] && t[1] ? e[1] > t[1] ? 1 : e[1] < t[1] ? -1 : 0 : !e[1] && t[1] ? 1 : e[1] && !t[1] ? -1 : 0
    }

    function Bn(e) {
        return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
            return typeof t
        } : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, Bn(e)
    }

    function Ln(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function ci(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Dn(e, t, n) {
        return t && ci(e.prototype, t), n && ci(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
    }

    var yc = "1.2.0", Ac = "1.7.35", ui = " ext. ", xc = /^\d+$/, Ae = function () {
        function e(t) {
            Ln(this, e), Cc(t), this.metadata = t, mi.call(this, t)
        }

        return Dn(e, [{
            key: "getCountries", value: function () {
                return Object.keys(this.metadata.countries).filter(function (n) {
                    return n !== "001"
                })
            }
        }, {
            key: "getCountryMetadata", value: function (n) {
                return this.metadata.countries[n]
            }
        }, {
            key: "nonGeographic", value: function () {
                if (!(this.v1 || this.v2 || this.v3)) return this.metadata.nonGeographic || this.metadata.nonGeographical
            }
        }, {
            key: "hasCountry", value: function (n) {
                return this.getCountryMetadata(n) !== void 0
            }
        }, {
            key: "hasCallingCode", value: function (n) {
                if (this.getCountryCodesForCallingCode(n)) return !0;
                if (this.nonGeographic()) {
                    if (this.nonGeographic()[n]) return !0
                } else {
                    var r = this.countryCallingCodes()[n];
                    if (r && r.length === 1 && r[0] === "001") return !0
                }
            }
        }, {
            key: "isNonGeographicCallingCode", value: function (n) {
                return this.nonGeographic() ? !!this.nonGeographic()[n] : !this.getCountryCodesForCallingCode(n)
            }
        }, {
            key: "country", value: function (n) {
                return this.selectNumberingPlan(n)
            }
        }, {
            key: "selectNumberingPlan", value: function (n, r) {
                if (n && xc.test(n) && (r = n, n = null), n && n !== "001") {
                    if (!this.hasCountry(n)) throw new Error("Unknown country: ".concat(n));
                    this.numberingPlan = new fi(this.getCountryMetadata(n), this)
                } else if (r) {
                    if (!this.hasCallingCode(r)) throw new Error("Unknown calling code: ".concat(r));
                    this.numberingPlan = new fi(this.getNumberingPlanMetadata(r), this)
                } else this.numberingPlan = void 0;
                return this
            }
        }, {
            key: "getCountryCodesForCallingCode", value: function (n) {
                var r = this.countryCallingCodes()[n];
                if (r) return r.length === 1 && r[0].length === 3 ? void 0 : r
            }
        }, {
            key: "getCountryCodeForCallingCode", value: function (n) {
                var r = this.getCountryCodesForCallingCode(n);
                if (r) return r[0]
            }
        }, {
            key: "getNumberingPlanMetadata", value: function (n) {
                var r = this.getCountryCodeForCallingCode(n);
                if (r) return this.getCountryMetadata(r);
                if (this.nonGeographic()) {
                    var o = this.nonGeographic()[n];
                    if (o) return o
                } else {
                    var s = this.countryCallingCodes()[n];
                    if (s && s.length === 1 && s[0] === "001") return this.metadata.countries["001"]
                }
            }
        }, {
            key: "countryCallingCode", value: function () {
                return this.numberingPlan.callingCode()
            }
        }, {
            key: "IDDPrefix", value: function () {
                return this.numberingPlan.IDDPrefix()
            }
        }, {
            key: "defaultIDDPrefix", value: function () {
                return this.numberingPlan.defaultIDDPrefix()
            }
        }, {
            key: "nationalNumberPattern", value: function () {
                return this.numberingPlan.nationalNumberPattern()
            }
        }, {
            key: "possibleLengths", value: function () {
                return this.numberingPlan.possibleLengths()
            }
        }, {
            key: "formats", value: function () {
                return this.numberingPlan.formats()
            }
        }, {
            key: "nationalPrefixForParsing", value: function () {
                return this.numberingPlan.nationalPrefixForParsing()
            }
        }, {
            key: "nationalPrefixTransformRule", value: function () {
                return this.numberingPlan.nationalPrefixTransformRule()
            }
        }, {
            key: "leadingDigits", value: function () {
                return this.numberingPlan.leadingDigits()
            }
        }, {
            key: "hasTypes", value: function () {
                return this.numberingPlan.hasTypes()
            }
        }, {
            key: "type", value: function (n) {
                return this.numberingPlan.type(n)
            }
        }, {
            key: "ext", value: function () {
                return this.numberingPlan.ext()
            }
        }, {
            key: "countryCallingCodes", value: function () {
                return this.v1 ? this.metadata.country_phone_code_to_countries : this.metadata.country_calling_codes
            }
        }, {
            key: "chooseCountryByCountryCallingCode", value: function (n) {
                return this.selectNumberingPlan(n)
            }
        }, {
            key: "hasSelectedNumberingPlan", value: function () {
                return this.numberingPlan !== void 0
            }
        }]), e
    }(), fi = function () {
        function e(t, n) {
            Ln(this, e), this.globalMetadataObject = n, this.metadata = t, mi.call(this, n.metadata)
        }

        return Dn(e, [{
            key: "callingCode", value: function () {
                return this.metadata[0]
            }
        }, {
            key: "getDefaultCountryMetadataForRegion", value: function () {
                return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode())
            }
        }, {
            key: "IDDPrefix", value: function () {
                if (!(this.v1 || this.v2)) return this.metadata[1]
            }
        }, {
            key: "defaultIDDPrefix", value: function () {
                if (!(this.v1 || this.v2)) return this.metadata[12]
            }
        }, {
            key: "nationalNumberPattern", value: function () {
                return this.v1 || this.v2 ? this.metadata[1] : this.metadata[2]
            }
        }, {
            key: "possibleLengths", value: function () {
                if (!this.v1) return this.metadata[this.v2 ? 2 : 3]
            }
        }, {
            key: "_getFormats", value: function (n) {
                return n[this.v1 ? 2 : this.v2 ? 3 : 4]
            }
        }, {
            key: "formats", value: function () {
                var n = this,
                    r = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
                return r.map(function (o) {
                    return new kc(o, n)
                })
            }
        }, {
            key: "nationalPrefix", value: function () {
                return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5]
            }
        }, {
            key: "_getNationalPrefixFormattingRule", value: function (n) {
                return n[this.v1 ? 4 : this.v2 ? 5 : 6]
            }
        }, {
            key: "nationalPrefixFormattingRule", value: function () {
                return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion())
            }
        }, {
            key: "_nationalPrefixForParsing", value: function () {
                return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7]
            }
        }, {
            key: "nationalPrefixForParsing", value: function () {
                return this._nationalPrefixForParsing() || this.nationalPrefix()
            }
        }, {
            key: "nationalPrefixTransformRule", value: function () {
                return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8]
            }
        }, {
            key: "_getNationalPrefixIsOptionalWhenFormatting", value: function () {
                return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9]
            }
        }, {
            key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat", value: function () {
                return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion())
            }
        }, {
            key: "leadingDigits", value: function () {
                return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10]
            }
        }, {
            key: "types", value: function () {
                return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11]
            }
        }, {
            key: "hasTypes", value: function () {
                return this.types() && this.types().length === 0 ? !1 : !!this.types()
            }
        }, {
            key: "type", value: function (n) {
                if (this.hasTypes() && $i(this.types(), n)) return new Ec($i(this.types(), n), this)
            }
        }, {
            key: "ext", value: function () {
                return this.v1 || this.v2 ? ui : this.metadata[13] || ui
            }
        }]), e
    }(), kc = function () {
        function e(t, n) {
            Ln(this, e), this._format = t, this.metadata = n
        }

        return Dn(e, [{
            key: "pattern", value: function () {
                return this._format[0]
            }
        }, {
            key: "format", value: function () {
                return this._format[1]
            }
        }, {
            key: "leadingDigitsPatterns", value: function () {
                return this._format[2] || []
            }
        }, {
            key: "nationalPrefixFormattingRule", value: function () {
                return this._format[3] || this.metadata.nationalPrefixFormattingRule()
            }
        }, {
            key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat", value: function () {
                return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat()
            }
        }, {
            key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat", value: function () {
                return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat()
            }
        }, {
            key: "usesNationalPrefix", value: function () {
                return !!(this.nationalPrefixFormattingRule() && !wc.test(this.nationalPrefixFormattingRule()))
            }
        }, {
            key: "internationalFormat", value: function () {
                return this._format[5] || this.format()
            }
        }]), e
    }(), wc = /^\(?\$1\)?$/, Ec = function () {
        function e(t, n) {
            Ln(this, e), this.type = t, this.metadata = n
        }

        return Dn(e, [{
            key: "pattern", value: function () {
                return this.metadata.v1 ? this.type : this.type[0]
            }
        }, {
            key: "possibleLengths", value: function () {
                if (!this.metadata.v1) return this.type[1] || this.metadata.possibleLengths()
            }
        }]), e
    }();

    function $i(e, t) {
        switch (t) {
            case"FIXED_LINE":
                return e[0];
            case"MOBILE":
                return e[1];
            case"TOLL_FREE":
                return e[2];
            case"PREMIUM_RATE":
                return e[3];
            case"PERSONAL_NUMBER":
                return e[4];
            case"VOICEMAIL":
                return e[5];
            case"UAN":
                return e[6];
            case"PAGER":
                return e[7];
            case"VOIP":
                return e[8];
            case"SHARED_COST":
                return e[9]
        }
    }

    function Cc(e) {
        if (!e) throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
        if (!Jr(e) || !Jr(e.countries)) throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(Jr(e) ? "an object of shape: { " + Object.keys(e).join(", ") + " }" : "a " + Pc(e) + ": " + e, "."))
    }

    var Jr = function (t) {
        return Bn(t) === "object"
    }, Pc = function (t) {
        return Bn(t)
    };

    function Yr(e, t) {
        if (t = new Ae(t), t.hasCountry(e)) return t.country(e).countryCallingCode();
        throw new Error("Unknown country: ".concat(e))
    }

    function mi(e) {
        var t = e.version;
        typeof t == "number" ? (this.v1 = t === 1, this.v2 = t === 2, this.v3 = t === 3, this.v4 = t === 4) : t ? li(t, yc) === -1 ? this.v2 = !0 : li(t, Ac) === -1 ? this.v3 = !0 : this.v4 = !0 : this.v1 = !0
    }

    var Sc = ";ext=", Bt = function (t) {
        return "([".concat(lt, "]{1,").concat(t, "})")
    };

    function gi(e) {
        var t = "20", n = "15", r = "9", o = "6", s = "[ \xA0\\t,]*", i = "[:\\.\uFF0E]?[ \xA0\\t,-]*", a = "#?",
            d = "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)",
            l = "(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)", u = "[- ]+", $ = "[ \xA0\\t]*", m = "(?:,{2}|;)",
            g = Sc + Bt(t), y = s + d + i + Bt(t) + a, x = s + l + i + Bt(r) + a, S = u + Bt(o) + "#",
            P = $ + m + i + Bt(n) + a, E = $ + "(?:,)+" + i + Bt(r) + a;
        return g + "|" + y + "|" + x + "|" + S + "|" + P + "|" + E
    }

    var _c = "[" + lt + "]{" + Zr + "}", Tc = "[" + qr + "]{0,1}(?:[" + Fn + "]*[" + lt + "]){3,}[" + Fn + lt + "]*",
        Nc = new RegExp("^[" + qr + "]{0,1}(?:[" + Fn + "]*[" + lt + "]){1,2}$", "i"), Oc = Tc + "(?:" + gi() + ")?",
        Mc = new RegExp("^" + _c + "$|^" + Oc + "$", "i");

    function hi(e) {
        return e.length >= Zr && Mc.test(e)
    }

    function Ic(e) {
        return Nc.test(e)
    }

    var pi = new RegExp("(?:" + gi() + ")$", "i");

    function Rc(e) {
        var t = e.search(pi);
        if (t < 0) return {};
        for (var n = e.slice(0, t), r = e.match(pi), o = 1; o < r.length;) {
            if (r[o]) return {number: n, ext: r[o]};
            o++
        }
    }

    var Fc = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        "\uFF10": "0",
        "\uFF11": "1",
        "\uFF12": "2",
        "\uFF13": "3",
        "\uFF14": "4",
        "\uFF15": "5",
        "\uFF16": "6",
        "\uFF17": "7",
        "\uFF18": "8",
        "\uFF19": "9",
        "\u0660": "0",
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u06F0": "0",
        "\u06F1": "1",
        "\u06F2": "2",
        "\u06F3": "3",
        "\u06F4": "4",
        "\u06F5": "5",
        "\u06F6": "6",
        "\u06F7": "7",
        "\u06F8": "8",
        "\u06F9": "9"
    };

    function Bc(e) {
        return Fc[e]
    }

    function Lc(e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = Dc(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function Dc(e, t) {
        if (!!e) {
            if (typeof e == "string") return vi(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return vi(e, t)
        }
    }

    function vi(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function bi(e) {
        for (var t = "", n = Lc(e.split("")), r; !(r = n()).done;) {
            var o = r.value;
            t += jc(o, t) || ""
        }
        return t
    }

    function jc(e, t) {
        return e === "+" ? t ? void 0 : "+" : Bc(e)
    }

    function Uc(e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = zc(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function zc(e, t) {
        if (!!e) {
            if (typeof e == "string") return yi(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return yi(e, t)
        }
    }

    function yi(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function Gc(e, t) {
        for (var n = e.slice(), r = Uc(t), o; !(o = r()).done;) {
            var s = o.value;
            e.indexOf(s) < 0 && n.push(s)
        }
        return n.sort(function (i, a) {
            return i - a
        })
    }

    function Qr(e, t) {
        return Ai(e, void 0, t)
    }

    function Ai(e, t, n) {
        var r = n.type(t), o = r && r.possibleLengths() || n.possibleLengths();
        if (!o) return "IS_POSSIBLE";
        if (t === "FIXED_LINE_OR_MOBILE") {
            if (!n.type("FIXED_LINE")) return Ai(e, "MOBILE", n);
            var s = n.type("MOBILE");
            s && (o = Gc(o, s.possibleLengths()))
        } else if (t && !r) return "INVALID_LENGTH";
        var i = e.length, a = o[0];
        return a === i ? "IS_POSSIBLE" : a > i ? "TOO_SHORT" : o[o.length - 1] < i ? "TOO_LONG" : o.indexOf(i, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH"
    }

    function Hc(e, t, n) {
        if (t === void 0 && (t = {}), n = new Ae(n), t.v2) {
            if (!e.countryCallingCode) throw new Error("Invalid phone number object passed");
            n.selectNumberingPlan(e.countryCallingCode)
        } else {
            if (!e.phone) return !1;
            if (e.country) {
                if (!n.hasCountry(e.country)) throw new Error("Unknown country: ".concat(e.country));
                n.country(e.country)
            } else {
                if (!e.countryCallingCode) throw new Error("Invalid phone number object passed");
                n.selectNumberingPlan(e.countryCallingCode)
            }
        }
        if (n.possibleLengths()) return xi(e.phone || e.nationalNumber, n);
        if (e.countryCallingCode && n.isNonGeographicCallingCode(e.countryCallingCode)) return !0;
        throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.')
    }

    function xi(e, t) {
        switch (Qr(e, t)) {
            case"IS_POSSIBLE":
                return !0;
            default:
                return !1
        }
    }

    function Kc(e, t) {
        return Zc(e) || Wc(e, t) || ki(e, t) || Vc()
    }

    function Vc() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function Wc(e, t) {
        var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n != null) {
            var r = [], o = !0, s = !1, i, a;
            try {
                for (n = n.call(e); !(o = (i = n.next()).done) && (r.push(i.value), !(t && r.length === t)); o = !0) ;
            } catch (d) {
                s = !0, a = d
            } finally {
                try {
                    !o && n.return != null && n.return()
                } finally {
                    if (s) throw a
                }
            }
            return r
        }
    }

    function Zc(e) {
        if (Array.isArray(e)) return e
    }

    function qc(e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = ki(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function ki(e, t) {
        if (!!e) {
            if (typeof e == "string") return wi(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return wi(e, t)
        }
    }

    function wi(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function Jc(e) {
        var t, n;
        e = e.replace(/^tel:/, "tel=");
        for (var r = qc(e.split(";")), o; !(o = r()).done;) {
            var s = o.value, i = s.split("="), a = Kc(i, 2), d = a[0], l = a[1];
            switch (d) {
                case"tel":
                    t = l;
                    break;
                case"ext":
                    n = l;
                    break;
                case"phone-context":
                    l[0] === "+" && (t = l + t);
                    break
            }
        }
        if (!hi(t)) return {};
        var u = {number: t};
        return n && (u.ext = n), u
    }

    function Yc(e) {
        var t = e.number, n = e.ext;
        if (!t) return "";
        if (t[0] !== "+") throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
        return "tel:".concat(t).concat(n ? ";ext=" + n : "")
    }

    function Ze(e, t) {
        return e = e || "", new RegExp("^(?:" + t + ")$").test(e)
    }

    function Qc(e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = Xc(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function Xc(e, t) {
        if (!!e) {
            if (typeof e == "string") return Ei(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ei(e, t)
        }
    }

    function Ei(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    var eu = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];

    function Xr(e, t, n) {
        if (t = t || {}, !!e.country) {
            n = new Ae(n), n.selectNumberingPlan(e.country, e.countryCallingCode);
            var r = t.v2 ? e.nationalNumber : e.phone;
            if (!!Ze(r, n.nationalNumberPattern())) {
                if (eo(r, "FIXED_LINE", n)) return n.type("MOBILE") && n.type("MOBILE").pattern() === "" || !n.type("MOBILE") || eo(r, "MOBILE", n) ? "FIXED_LINE_OR_MOBILE" : "FIXED_LINE";
                for (var o = Qc(eu), s; !(s = o()).done;) {
                    var i = s.value;
                    if (eo(r, i, n)) return i
                }
            }
        }
    }

    function eo(e, t, n) {
        return t = n.type(t), !t || !t.pattern() || t.possibleLengths() && t.possibleLengths().indexOf(e.length) < 0 ? !1 : Ze(e, t.pattern())
    }

    function tu(e, t, n) {
        if (t = t || {}, n = new Ae(n), !e.country) return !1;
        if (n.selectNumberingPlan(e.country, e.countryCallingCode), n.hasTypes()) return Xr(e, t, n.metadata) !== void 0;
        var r = t.v2 ? e.nationalNumber : e.phone;
        return Ze(r, n.nationalNumberPattern())
    }

    function nu(e) {
        return e.replace(new RegExp("[".concat(Fn, "]+"), "g"), " ").trim()
    }

    var ru = /(\$\d)/;

    function ou(e, t, n) {
        var r = n.useInternationalFormat, o = n.withNationalPrefix;
        n.carrierCode, n.metadata;
        var s = e.replace(new RegExp(t.pattern()), r ? t.internationalFormat() : o && t.nationalPrefixFormattingRule() ? t.format().replace(ru, t.nationalPrefixFormattingRule()) : t.format());
        return r ? nu(s) : s
    }

    var su = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;

    function iu(e, t, n) {
        var r = new Ae(n);
        if (r.selectNumberingPlan(e, t), r.defaultIDDPrefix()) return r.defaultIDDPrefix();
        if (su.test(r.IDDPrefix())) return r.IDDPrefix()
    }

    function au(e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = du(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function du(e, t) {
        if (!!e) {
            if (typeof e == "string") return Ci(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ci(e, t)
        }
    }

    function Ci(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function Pi(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function (o) {
                return Object.getOwnPropertyDescriptor(e, o).enumerable
            })), n.push.apply(n, r)
        }
        return n
    }

    function Si(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t] != null ? arguments[t] : {};
            t % 2 ? Pi(Object(n), !0).forEach(function (r) {
                lu(e, r, n[r])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pi(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
            })
        }
        return e
    }

    function lu(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    var _i = {
        formatExtension: function (t, n, r) {
            return "".concat(t).concat(r.ext()).concat(n)
        }
    };

    function cu(e, t, n, r) {
        if (n ? n = Si(Si({}, _i), n) : n = _i, r = new Ae(r), e.country && e.country !== "001") {
            if (!r.hasCountry(e.country)) throw new Error("Unknown country: ".concat(e.country));
            r.country(e.country)
        } else if (e.countryCallingCode) r.selectNumberingPlan(e.countryCallingCode); else return e.phone || "";
        var o = r.countryCallingCode(), s = n.v2 ? e.nationalNumber : e.phone, i;
        switch (t) {
            case"NATIONAL":
                return s ? (i = jn(s, e.carrierCode, "NATIONAL", r, n), to(i, e.ext, r, n.formatExtension)) : "";
            case"INTERNATIONAL":
                return s ? (i = jn(s, null, "INTERNATIONAL", r, n), i = "+".concat(o, " ").concat(i), to(i, e.ext, r, n.formatExtension)) : "+".concat(o);
            case"E.164":
                return "+".concat(o).concat(s);
            case"RFC3966":
                return Yc({number: "+".concat(o).concat(s), ext: e.ext});
            case"IDD":
                if (!n.fromCountry) return;
                var a = fu(s, e.carrierCode, o, n.fromCountry, r);
                return to(a, e.ext, r, n.formatExtension);
            default:
                throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(t, '"'))
        }
    }

    function jn(e, t, n, r, o) {
        var s = uu(r.formats(), e);
        return s ? ou(e, s, {
            useInternationalFormat: n === "INTERNATIONAL",
            withNationalPrefix: !(s.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && o && o.nationalPrefix === !1),
            carrierCode: t,
            metadata: r
        }) : e
    }

    function uu(e, t) {
        for (var n = au(e), r; !(r = n()).done;) {
            var o = r.value;
            if (o.leadingDigitsPatterns().length > 0) {
                var s = o.leadingDigitsPatterns()[o.leadingDigitsPatterns().length - 1];
                if (t.search(s) !== 0) continue
            }
            if (Ze(t, o.pattern())) return o
        }
    }

    function to(e, t, n, r) {
        return t ? r(e, t, n) : e
    }

    function fu(e, t, n, r, o) {
        var s = Yr(r, o.metadata);
        if (s === n) {
            var i = jn(e, t, "NATIONAL", o);
            return n === "1" ? n + " " + i : i
        }
        var a = iu(r, void 0, o.metadata);
        if (a) return "".concat(a, " ").concat(n, " ").concat(jn(e, null, "INTERNATIONAL", o))
    }

    function Ti(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function (o) {
                return Object.getOwnPropertyDescriptor(e, o).enumerable
            })), n.push.apply(n, r)
        }
        return n
    }

    function Ni(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t] != null ? arguments[t] : {};
            t % 2 ? Ti(Object(n), !0).forEach(function (r) {
                $u(e, r, n[r])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ti(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
            })
        }
        return e
    }

    function $u(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function mu(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Oi(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function gu(e, t, n) {
        return t && Oi(e.prototype, t), n && Oi(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
    }

    var Mi = function () {
        function e(t, n, r) {
            if (mu(this, e), !t) throw new TypeError("`country` or `countryCallingCode` not passed");
            if (!n) throw new TypeError("`nationalNumber` not passed");
            if (!r) throw new TypeError("`metadata` not passed");
            var o = new Ae(r);
            hu(t) && (this.country = t, o.country(t), t = o.countryCallingCode()), this.countryCallingCode = t, this.nationalNumber = n, this.number = "+" + this.countryCallingCode + this.nationalNumber, this.metadata = r
        }

        return gu(e, [{
            key: "setExt", value: function (n) {
                this.ext = n
            }
        }, {
            key: "isPossible", value: function () {
                return Hc(this, {v2: !0}, this.metadata)
            }
        }, {
            key: "isValid", value: function () {
                return tu(this, {v2: !0}, this.metadata)
            }
        }, {
            key: "isNonGeographic", value: function () {
                var n = new Ae(this.metadata);
                return n.isNonGeographicCallingCode(this.countryCallingCode)
            }
        }, {
            key: "isEqual", value: function (n) {
                return this.number === n.number && this.ext === n.ext
            }
        }, {
            key: "getType", value: function () {
                return Xr(this, {v2: !0}, this.metadata)
            }
        }, {
            key: "format", value: function (n, r) {
                return cu(this, n, r ? Ni(Ni({}, r), {}, {v2: !0}) : {v2: !0}, this.metadata)
            }
        }, {
            key: "formatNational", value: function (n) {
                return this.format("NATIONAL", n)
            }
        }, {
            key: "formatInternational", value: function (n) {
                return this.format("INTERNATIONAL", n)
            }
        }, {
            key: "getURI", value: function (n) {
                return this.format("RFC3966", n)
            }
        }]), e
    }(), hu = function (t) {
        return /^[A-Z]{2}$/.test(t)
    }, pu = new RegExp("([" + lt + "])");

    function vu(e, t, n, r) {
        if (!!t) {
            var o = new Ae(r);
            o.selectNumberingPlan(t, n);
            var s = new RegExp(o.IDDPrefix());
            if (e.search(s) === 0) {
                e = e.slice(e.match(s)[0].length);
                var i = e.match(pu);
                if (!(i && i[1] != null && i[1].length > 0 && i[1] === "0")) return e
            }
        }
    }

    function bu(e, t) {
        if (e && t.numberingPlan.nationalPrefixForParsing()) {
            var n = new RegExp("^(?:" + t.numberingPlan.nationalPrefixForParsing() + ")"), r = n.exec(e);
            if (r) {
                var o, s, i = r.length - 1, a = i > 0 && r[i];
                if (t.nationalPrefixTransformRule() && a) o = e.replace(n, t.nationalPrefixTransformRule()), i > 1 && (s = r[1]); else {
                    var d = r[0];
                    o = e.slice(d.length), a && (s = r[1])
                }
                var l;
                if (a) {
                    var u = e.indexOf(r[1]), $ = e.slice(0, u);
                    $ === t.numberingPlan.nationalPrefix() && (l = t.numberingPlan.nationalPrefix())
                } else l = r[0];
                return {nationalNumber: o, nationalPrefix: l, carrierCode: s}
            }
        }
        return {nationalNumber: e}
    }

    function no(e, t) {
        var n = bu(e, t), r = n.carrierCode, o = n.nationalNumber;
        if (o !== e) {
            if (!yu(e, o, t)) return {nationalNumber: e};
            if (t.possibleLengths() && !Au(o, t)) return {nationalNumber: e}
        }
        return {nationalNumber: o, carrierCode: r}
    }

    function yu(e, t, n) {
        return !(Ze(e, n.nationalNumberPattern()) && !Ze(t, n.nationalNumberPattern()))
    }

    function Au(e, t) {
        switch (Qr(e, t)) {
            case"TOO_SHORT":
            case"INVALID_LENGTH":
                return !1;
            default:
                return !0
        }
    }

    function xu(e, t, n, r) {
        var o = t ? Yr(t, r) : n;
        if (e.indexOf(o) === 0) {
            r = new Ae(r), r.selectNumberingPlan(t, n);
            var s = e.slice(o.length), i = no(s, r), a = i.nationalNumber, d = no(e, r), l = d.nationalNumber;
            if (!Ze(l, r.nationalNumberPattern()) && Ze(a, r.nationalNumberPattern()) || Qr(l, r) === "TOO_LONG") return {
                countryCallingCode: o,
                number: s
            }
        }
        return {number: e}
    }

    function ku(e, t, n, r) {
        if (!e) return {};
        if (e[0] !== "+") {
            var o = vu(e, t, n, r);
            if (o && o !== e) e = "+" + o; else {
                if (t || n) {
                    var s = xu(e, t, n, r), i = s.countryCallingCode, a = s.number;
                    if (i) return {countryCallingCode: i, number: a}
                }
                return {number: e}
            }
        }
        if (e[1] === "0") return {};
        r = new Ae(r);
        for (var d = 2; d - 1 <= $c && d <= e.length;) {
            var l = e.slice(1, d);
            if (r.hasCallingCode(l)) return r.selectNumberingPlan(l), {countryCallingCode: l, number: e.slice(d)};
            d++
        }
        return {}
    }

    function wu(e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = Eu(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function Eu(e, t) {
        if (!!e) {
            if (typeof e == "string") return Ii(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ii(e, t)
        }
    }

    function Ii(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    var Cu = !1;

    function Pu(e, t, n) {
        if (Cu && n.isNonGeographicCallingCode(e)) return "001";
        var r = n.getCountryCodesForCallingCode(e);
        if (!!r) return r.length === 1 ? r[0] : Su(r, t, n.metadata)
    }

    function Su(e, t, n) {
        n = new Ae(n);
        for (var r = wu(e), o; !(o = r()).done;) {
            var s = o.value;
            if (n.country(s), n.leadingDigits()) {
                if (t && t.search(n.leadingDigits()) === 0) return s
            } else if (Xr({phone: t, country: s}, void 0, n.metadata)) return s
        }
    }

    var _u = 250, Tu = new RegExp("[" + qr + lt + "]"), Nu = new RegExp("[^" + lt + "#]+$");

    function Ou(e, t, n) {
        if (t = t || {}, n = new Ae(n), t.defaultCountry && !n.hasCountry(t.defaultCountry)) throw t.v2 ? new At("INVALID_COUNTRY") : new Error("Unknown country: ".concat(t.defaultCountry));
        var r = Iu(e, t.v2, t.extract), o = r.number, s = r.ext, i = r.error;
        if (!o) {
            if (t.v2) throw i === "TOO_SHORT" ? new At("TOO_SHORT") : new At("NOT_A_NUMBER");
            return {}
        }
        var a = Fu(o, t.defaultCountry, t.defaultCallingCode, n), d = a.country, l = a.nationalNumber,
            u = a.countryCallingCode, $ = a.carrierCode;
        if (!n.hasSelectedNumberingPlan()) {
            if (t.v2) throw new At("INVALID_COUNTRY");
            return {}
        }
        if (!l || l.length < Zr) {
            if (t.v2) throw new At("TOO_SHORT");
            return {}
        }
        if (l.length > fc) {
            if (t.v2) throw new At("TOO_LONG");
            return {}
        }
        if (t.v2) {
            var m = new Mi(u, l, n.metadata);
            return d && (m.country = d), $ && (m.carrierCode = $), s && (m.ext = s), m
        }
        var g = (t.extended ? n.hasSelectedNumberingPlan() : d) ? Ze(l, n.nationalNumberPattern()) : !1;
        return t.extended ? {
            country: d,
            countryCallingCode: u,
            carrierCode: $,
            valid: g,
            possible: g ? !0 : !!(t.extended === !0 && n.possibleLengths() && xi(l, n)),
            phone: l,
            ext: s
        } : g ? Ru(d, l, s) : {}
    }

    function Mu(e, t, n) {
        if (!!e) {
            if (e.length > _u) {
                if (n) throw new At("TOO_LONG");
                return
            }
            if (t === !1) return e;
            var r = e.search(Tu);
            if (!(r < 0)) return e.slice(r).replace(Nu, "")
        }
    }

    function Iu(e, t, n) {
        if (e && e.indexOf("tel:") === 0) return Jc(e);
        var r = Mu(e, n, t);
        if (!r) return {};
        if (!hi(r)) return Ic(r) ? {error: "TOO_SHORT"} : {};
        var o = Rc(r);
        return o.ext ? o : {number: r}
    }

    function Ru(e, t, n) {
        var r = {country: e, phone: t};
        return n && (r.ext = n), r
    }

    function Fu(e, t, n, r) {
        var o = ku(bi(e), t, n, r.metadata), s = o.countryCallingCode, i = o.number, a;
        if (s) r.selectNumberingPlan(s); else if (i && (t || n)) r.selectNumberingPlan(t, n), t && (a = t), s = n || Yr(t, r.metadata); else return {};
        if (!i) return {countryCallingCode: s};
        var d = no(bi(i), r), l = d.nationalNumber, u = d.carrierCode, $ = Pu(s, l, r);
        return $ && (a = $, $ === "001" || r.country(a)), {
            country: a,
            countryCallingCode: s,
            nationalNumber: l,
            carrierCode: u
        }
    }

    function Ri(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function (o) {
                return Object.getOwnPropertyDescriptor(e, o).enumerable
            })), n.push.apply(n, r)
        }
        return n
    }

    function Fi(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t] != null ? arguments[t] : {};
            t % 2 ? Ri(Object(n), !0).forEach(function (r) {
                Bu(e, r, n[r])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ri(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
            })
        }
        return e
    }

    function Bu(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function Lu(e, t, n) {
        return Ou(e, Fi(Fi({}, t), {}, {v2: !0}), n)
    }

    function ro(e) {
        return ro = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
            return typeof t
        } : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, ro(e)
    }

    function Bi(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function (o) {
                return Object.getOwnPropertyDescriptor(e, o).enumerable
            })), n.push.apply(n, r)
        }
        return n
    }

    function Du(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t] != null ? arguments[t] : {};
            t % 2 ? Bi(Object(n), !0).forEach(function (r) {
                ju(e, r, n[r])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Bi(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
            })
        }
        return e
    }

    function ju(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function Uu(e, t) {
        return Ku(e) || Hu(e, t) || Gu(e, t) || zu()
    }

    function zu() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }

    function Gu(e, t) {
        if (!!e) {
            if (typeof e == "string") return Li(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Li(e, t)
        }
    }

    function Li(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function Hu(e, t) {
        var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (n != null) {
            var r = [], o = !0, s = !1, i, a;
            try {
                for (n = n.call(e); !(o = (i = n.next()).done) && (r.push(i.value), !(t && r.length === t)); o = !0) ;
            } catch (d) {
                s = !0, a = d
            } finally {
                try {
                    !o && n.return != null && n.return()
                } finally {
                    if (s) throw a
                }
            }
            return r
        }
    }

    function Ku(e) {
        if (Array.isArray(e)) return e
    }

    function Vu() {
        var e = Wu(arguments), t = e.text, n = e.options, r = e.metadata;
        return Lu(t, n, r)
    }

    function Wu(e) {
        var t = Array.prototype.slice.call(e), n = Uu(t, 4), r = n[0], o = n[1], s = n[2], i = n[3], a, d, l;
        if (typeof r == "string") a = r; else throw new TypeError("A text for parsing must be a string.");
        if (!o || typeof o == "string") i ? (d = s, l = i) : (d = void 0, l = s), o && (d = Du({defaultCountry: o}, d)); else if (Zu(o)) s ? (d = o, l = s) : l = o; else throw new Error("Invalid second argument: ".concat(o));
        return {text: a, options: d, metadata: l}
    }

    var Zu = function (t) {
        return ro(t) === "object"
    };

    function qu(e, t, n) {
        if (t[e]) return new Mi(e, t[e], n)
    }

    function Ju() {
        return si(Vu, arguments)
    }

    function Yu() {
        return si(qu, arguments)
    }

    var Qu = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
        oo = {exports: {}}, Di = function (t, n) {
            return function () {
                for (var o = new Array(arguments.length), s = 0; s < o.length; s++) o[s] = arguments[s];
                return t.apply(n, o)
            }
        }, Xu = Di, so = Object.prototype.toString, io = function (e) {
            return function (t) {
                var n = so.call(t);
                return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
            }
        }(Object.create(null));

    function xt(e) {
        return e = e.toLowerCase(), function (n) {
            return io(n) === e
        }
    }

    function ao(e) {
        return Array.isArray(e)
    }

    function Un(e) {
        return typeof e == "undefined"
    }

    function e1(e) {
        return e !== null && !Un(e) && e.constructor !== null && !Un(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e)
    }

    var ji = xt("ArrayBuffer");

    function t1(e) {
        var t;
        return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ji(e.buffer), t
    }

    function n1(e) {
        return typeof e == "string"
    }

    function r1(e) {
        return typeof e == "number"
    }

    function Ui(e) {
        return e !== null && typeof e == "object"
    }

    function zn(e) {
        if (io(e) !== "object") return !1;
        var t = Object.getPrototypeOf(e);
        return t === null || t === Object.prototype
    }

    var o1 = xt("Date"), s1 = xt("File"), i1 = xt("Blob"), a1 = xt("FileList");

    function lo(e) {
        return so.call(e) === "[object Function]"
    }

    function d1(e) {
        return Ui(e) && lo(e.pipe)
    }

    function l1(e) {
        var t = "[object FormData]";
        return e && (typeof FormData == "function" && e instanceof FormData || so.call(e) === t || lo(e.toString) && e.toString() === t)
    }

    var c1 = xt("URLSearchParams");

    function u1(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
    }

    function f1() {
        return typeof navigator != "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window != "undefined" && typeof document != "undefined"
    }

    function co(e, t) {
        if (!(e === null || typeof e == "undefined")) if (typeof e != "object" && (e = [e]), ao(e)) for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
    }

    function uo() {
        var e = {};

        function t(o, s) {
            zn(e[s]) && zn(o) ? e[s] = uo(e[s], o) : zn(o) ? e[s] = uo({}, o) : ao(o) ? e[s] = o.slice() : e[s] = o
        }

        for (var n = 0, r = arguments.length; n < r; n++) co(arguments[n], t);
        return e
    }

    function $1(e, t, n) {
        return co(t, function (o, s) {
            n && typeof o == "function" ? e[s] = Xu(o, n) : e[s] = o
        }), e
    }

    function m1(e) {
        return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e
    }

    function g1(e, t, n, r) {
        e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, n && Object.assign(e.prototype, n)
    }

    function h1(e, t, n) {
        var r, o, s, i = {};
        t = t || {};
        do {
            for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0;) s = r[o], i[s] || (t[s] = e[s], i[s] = !0);
            e = Object.getPrototypeOf(e)
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t
    }

    function p1(e, t, n) {
        e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
        var r = e.indexOf(t, n);
        return r !== -1 && r === n
    }

    function v1(e) {
        if (!e) return null;
        var t = e.length;
        if (Un(t)) return null;
        for (var n = new Array(t); t-- > 0;) n[t] = e[t];
        return n
    }

    var b1 = function (e) {
        return function (t) {
            return e && t instanceof e
        }
    }(typeof Uint8Array != "undefined" && Object.getPrototypeOf(Uint8Array)), ue = {
        isArray: ao,
        isArrayBuffer: ji,
        isBuffer: e1,
        isFormData: l1,
        isArrayBufferView: t1,
        isString: n1,
        isNumber: r1,
        isObject: Ui,
        isPlainObject: zn,
        isUndefined: Un,
        isDate: o1,
        isFile: s1,
        isBlob: i1,
        isFunction: lo,
        isStream: d1,
        isURLSearchParams: c1,
        isStandardBrowserEnv: f1,
        forEach: co,
        merge: uo,
        extend: $1,
        trim: u1,
        stripBOM: m1,
        inherits: g1,
        toFlatObject: h1,
        kindOf: io,
        kindOfTest: xt,
        endsWith: p1,
        toArray: v1,
        isTypedArray: b1,
        isFileList: a1
    }, Lt = ue;

    function zi(e) {
        return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }

    var Gi = function (t, n, r) {
        if (!n) return t;
        var o;
        if (r) o = r(n); else if (Lt.isURLSearchParams(n)) o = n.toString(); else {
            var s = [];
            Lt.forEach(n, function (d, l) {
                d === null || typeof d == "undefined" || (Lt.isArray(d) ? l = l + "[]" : d = [d], Lt.forEach(d, function ($) {
                    Lt.isDate($) ? $ = $.toISOString() : Lt.isObject($) && ($ = JSON.stringify($)), s.push(zi(l) + "=" + zi($))
                }))
            }), o = s.join("&")
        }
        if (o) {
            var i = t.indexOf("#");
            i !== -1 && (t = t.slice(0, i)), t += (t.indexOf("?") === -1 ? "?" : "&") + o
        }
        return t
    }, y1 = ue;

    function Gn() {
        this.handlers = []
    }

    Gn.prototype.use = function (t, n, r) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: r ? r.synchronous : !1,
            runWhen: r ? r.runWhen : null
        }), this.handlers.length - 1
    }, Gn.prototype.eject = function (t) {
        this.handlers[t] && (this.handlers[t] = null)
    }, Gn.prototype.forEach = function (t) {
        y1.forEach(this.handlers, function (r) {
            r !== null && t(r)
        })
    };
    var A1 = Gn, x1 = ue, k1 = function (t, n) {
        x1.forEach(t, function (o, s) {
            s !== n && s.toUpperCase() === n.toUpperCase() && (t[n] = o, delete t[s])
        })
    }, Hi = ue;

    function Dt(e, t, n, r, o) {
        Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o)
    }

    Hi.inherits(Dt, Error, {
        toJSON: function () {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code,
                status: this.response && this.response.status ? this.response.status : null
            }
        }
    });
    var Ki = Dt.prototype, Vi = {};
    ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach(function (e) {
        Vi[e] = {value: e}
    }), Object.defineProperties(Dt, Vi), Object.defineProperty(Ki, "isAxiosError", {value: !0}), Dt.from = function (e, t, n, r, o, s) {
        var i = Object.create(Ki);
        return Hi.toFlatObject(e, i, function (d) {
            return d !== Error.prototype
        }), Dt.call(i, e.message, t, n, r, o), i.name = e.name, s && Object.assign(i, s), i
    };
    var jt = Dt, Wi = {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1}, Ie = ue;

    function w1(e, t) {
        t = t || new FormData;
        var n = [];

        function r(s) {
            return s === null ? "" : Ie.isDate(s) ? s.toISOString() : Ie.isArrayBuffer(s) || Ie.isTypedArray(s) ? typeof Blob == "function" ? new Blob([s]) : Buffer.from(s) : s
        }

        function o(s, i) {
            if (Ie.isPlainObject(s) || Ie.isArray(s)) {
                if (n.indexOf(s) !== -1) throw Error("Circular reference detected in " + i);
                n.push(s), Ie.forEach(s, function (d, l) {
                    if (!Ie.isUndefined(d)) {
                        var u = i ? i + "." + l : l, $;
                        if (d && !i && typeof d == "object") {
                            if (Ie.endsWith(l, "{}")) d = JSON.stringify(d); else if (Ie.endsWith(l, "[]") && ($ = Ie.toArray(d))) {
                                $.forEach(function (m) {
                                    !Ie.isUndefined(m) && t.append(u, r(m))
                                });
                                return
                            }
                        }
                        o(d, u)
                    }
                }), n.pop()
            } else t.append(i, r(s))
        }

        return o(e), t
    }

    var Zi = w1, fo = jt, E1 = function (t, n, r) {
            var o = r.config.validateStatus;
            !r.status || !o || o(r.status) ? t(r) : n(new fo("Request failed with status code " + r.status, [fo.ERR_BAD_REQUEST, fo.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r))
        }, Hn = ue, C1 = Hn.isStandardBrowserEnv() ? function () {
            return {
                write: function (n, r, o, s, i, a) {
                    var d = [];
                    d.push(n + "=" + encodeURIComponent(r)), Hn.isNumber(o) && d.push("expires=" + new Date(o).toGMTString()), Hn.isString(s) && d.push("path=" + s), Hn.isString(i) && d.push("domain=" + i), a === !0 && d.push("secure"), document.cookie = d.join("; ")
                }, read: function (n) {
                    var r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
                    return r ? decodeURIComponent(r[3]) : null
                }, remove: function (n) {
                    this.write(n, "", Date.now() - 864e5)
                }
            }
        }() : function () {
            return {
                write: function () {
                }, read: function () {
                    return null
                }, remove: function () {
                }
            }
        }(), P1 = function (t) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
        }, S1 = function (t, n) {
            return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t
        }, _1 = P1, T1 = S1, qi = function (t, n) {
            return t && !_1(n) ? T1(t, n) : n
        }, $o = ue,
        N1 = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
        O1 = function (t) {
            var n = {}, r, o, s;
            return t && $o.forEach(t.split(`
`), function (a) {
                if (s = a.indexOf(":"), r = $o.trim(a.substr(0, s)).toLowerCase(), o = $o.trim(a.substr(s + 1)), r) {
                    if (n[r] && N1.indexOf(r) >= 0) return;
                    r === "set-cookie" ? n[r] = (n[r] ? n[r] : []).concat([o]) : n[r] = n[r] ? n[r] + ", " + o : o
                }
            }), n
        }, Ji = ue, M1 = Ji.isStandardBrowserEnv() ? function () {
            var t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a"), r;

            function o(s) {
                var i = s;
                return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
                    href: n.href,
                    protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                    host: n.host,
                    search: n.search ? n.search.replace(/^\?/, "") : "",
                    hash: n.hash ? n.hash.replace(/^#/, "") : "",
                    hostname: n.hostname,
                    port: n.port,
                    pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
                }
            }

            return r = o(window.location.href), function (i) {
                var a = Ji.isString(i) ? o(i) : i;
                return a.protocol === r.protocol && a.host === r.host
            }
        }() : function () {
            return function () {
                return !0
            }
        }(), mo = jt, I1 = ue;

    function Yi(e) {
        mo.call(this, e == null ? "canceled" : e, mo.ERR_CANCELED), this.name = "CanceledError"
    }

    I1.inherits(Yi, mo, {__CANCEL__: !0});
    var Kn = Yi, R1 = function (t) {
            var n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
            return n && n[1] || ""
        }, an = ue, F1 = E1, B1 = C1, L1 = Gi, D1 = qi, j1 = O1, U1 = M1, z1 = Wi, qe = jt, G1 = Kn, H1 = R1,
        Qi = function (t) {
            return new Promise(function (r, o) {
                var s = t.data, i = t.headers, a = t.responseType, d;

                function l() {
                    t.cancelToken && t.cancelToken.unsubscribe(d), t.signal && t.signal.removeEventListener("abort", d)
                }

                an.isFormData(s) && an.isStandardBrowserEnv() && delete i["Content-Type"];
                var u = new XMLHttpRequest;
                if (t.auth) {
                    var $ = t.auth.username || "",
                        m = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
                    i.Authorization = "Basic " + btoa($ + ":" + m)
                }
                var g = D1(t.baseURL, t.url);
                u.open(t.method.toUpperCase(), L1(g, t.params, t.paramsSerializer), !0), u.timeout = t.timeout;

                function y() {
                    if (!!u) {
                        var P = "getAllResponseHeaders" in u ? j1(u.getAllResponseHeaders()) : null,
                            E = !a || a === "text" || a === "json" ? u.responseText : u.response, p = {
                                data: E,
                                status: u.status,
                                statusText: u.statusText,
                                headers: P,
                                config: t,
                                request: u
                            };
                        F1(function (T) {
                            r(T), l()
                        }, function (T) {
                            o(T), l()
                        }, p), u = null
                    }
                }

                if ("onloadend" in u ? u.onloadend = y : u.onreadystatechange = function () {
                    !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(y)
                }, u.onabort = function () {
                    !u || (o(new qe("Request aborted", qe.ECONNABORTED, t, u)), u = null)
                }, u.onerror = function () {
                    o(new qe("Network Error", qe.ERR_NETWORK, t, u, u)), u = null
                }, u.ontimeout = function () {
                    var E = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded",
                        p = t.transitional || z1;
                    t.timeoutErrorMessage && (E = t.timeoutErrorMessage), o(new qe(E, p.clarifyTimeoutError ? qe.ETIMEDOUT : qe.ECONNABORTED, t, u)), u = null
                }, an.isStandardBrowserEnv()) {
                    var x = (t.withCredentials || U1(g)) && t.xsrfCookieName ? B1.read(t.xsrfCookieName) : void 0;
                    x && (i[t.xsrfHeaderName] = x)
                }
                "setRequestHeader" in u && an.forEach(i, function (E, p) {
                    typeof s == "undefined" && p.toLowerCase() === "content-type" ? delete i[p] : u.setRequestHeader(p, E)
                }), an.isUndefined(t.withCredentials) || (u.withCredentials = !!t.withCredentials), a && a !== "json" && (u.responseType = t.responseType), typeof t.onDownloadProgress == "function" && u.addEventListener("progress", t.onDownloadProgress), typeof t.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", t.onUploadProgress), (t.cancelToken || t.signal) && (d = function (P) {
                    !u || (o(!P || P && P.type ? new G1 : P), u.abort(), u = null)
                }, t.cancelToken && t.cancelToken.subscribe(d), t.signal && (t.signal.aborted ? d() : t.signal.addEventListener("abort", d))), s || (s = null);
                var S = H1(g);
                if (S && ["http", "https", "file"].indexOf(S) === -1) {
                    o(new qe("Unsupported protocol " + S + ":", qe.ERR_BAD_REQUEST, t));
                    return
                }
                u.send(s)
            })
        }, K1 = null, oe = ue, Xi = k1, ea = jt, V1 = Wi, W1 = Zi,
        Z1 = {"Content-Type": "application/x-www-form-urlencoded"};

    function ta(e, t) {
        !oe.isUndefined(e) && oe.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
    }

    function q1() {
        var e;
        return (typeof XMLHttpRequest != "undefined" || typeof process != "undefined" && Object.prototype.toString.call(process) === "[object process]") && (e = Qi), e
    }

    function J1(e, t, n) {
        if (oe.isString(e)) try {
            return (t || JSON.parse)(e), oe.trim(e)
        } catch (r) {
            if (r.name !== "SyntaxError") throw r
        }
        return (n || JSON.stringify)(e)
    }

    var Vn = {
        transitional: V1,
        adapter: q1(),
        transformRequest: [function (t, n) {
            if (Xi(n, "Accept"), Xi(n, "Content-Type"), oe.isFormData(t) || oe.isArrayBuffer(t) || oe.isBuffer(t) || oe.isStream(t) || oe.isFile(t) || oe.isBlob(t)) return t;
            if (oe.isArrayBufferView(t)) return t.buffer;
            if (oe.isURLSearchParams(t)) return ta(n, "application/x-www-form-urlencoded;charset=utf-8"), t.toString();
            var r = oe.isObject(t), o = n && n["Content-Type"], s;
            if ((s = oe.isFileList(t)) || r && o === "multipart/form-data") {
                var i = this.env && this.env.FormData;
                return W1(s ? {"files[]": t} : t, i && new i)
            } else if (r || o === "application/json") return ta(n, "application/json"), J1(t);
            return t
        }],
        transformResponse: [function (t) {
            var n = this.transitional || Vn.transitional, r = n && n.silentJSONParsing, o = n && n.forcedJSONParsing,
                s = !r && this.responseType === "json";
            if (s || o && oe.isString(t) && t.length) try {
                return JSON.parse(t)
            } catch (i) {
                if (s) throw i.name === "SyntaxError" ? ea.from(i, ea.ERR_BAD_RESPONSE, this, null, this.response) : i
            }
            return t
        }],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {FormData: K1},
        validateStatus: function (t) {
            return t >= 200 && t < 300
        },
        headers: {common: {Accept: "application/json, text/plain, */*"}}
    };
    oe.forEach(["delete", "get", "head"], function (t) {
        Vn.headers[t] = {}
    }), oe.forEach(["post", "put", "patch"], function (t) {
        Vn.headers[t] = oe.merge(Z1)
    });
    var go = Vn, Y1 = ue, Q1 = go, X1 = function (t, n, r) {
        var o = this || Q1;
        return Y1.forEach(r, function (i) {
            t = i.call(o, t, n)
        }), t
    }, na = function (t) {
        return !!(t && t.__CANCEL__)
    }, ra = ue, ho = X1, e0 = na, t0 = go, n0 = Kn;

    function po(e) {
        if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new n0
    }

    var r0 = function (t) {
        po(t), t.headers = t.headers || {}, t.data = ho.call(t, t.data, t.headers, t.transformRequest), t.headers = ra.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), ra.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (o) {
            delete t.headers[o]
        });
        var n = t.adapter || t0.adapter;
        return n(t).then(function (o) {
            return po(t), o.data = ho.call(t, o.data, o.headers, t.transformResponse), o
        }, function (o) {
            return e0(o) || (po(t), o && o.response && (o.response.data = ho.call(t, o.response.data, o.response.headers, t.transformResponse))), Promise.reject(o)
        })
    }, xe = ue, oa = function (t, n) {
        n = n || {};
        var r = {};

        function o(u, $) {
            return xe.isPlainObject(u) && xe.isPlainObject($) ? xe.merge(u, $) : xe.isPlainObject($) ? xe.merge({}, $) : xe.isArray($) ? $.slice() : $
        }

        function s(u) {
            if (xe.isUndefined(n[u])) {
                if (!xe.isUndefined(t[u])) return o(void 0, t[u])
            } else return o(t[u], n[u])
        }

        function i(u) {
            if (!xe.isUndefined(n[u])) return o(void 0, n[u])
        }

        function a(u) {
            if (xe.isUndefined(n[u])) {
                if (!xe.isUndefined(t[u])) return o(void 0, t[u])
            } else return o(void 0, n[u])
        }

        function d(u) {
            if (u in n) return o(t[u], n[u]);
            if (u in t) return o(void 0, t[u])
        }

        var l = {
            url: i,
            method: i,
            data: i,
            baseURL: a,
            transformRequest: a,
            transformResponse: a,
            paramsSerializer: a,
            timeout: a,
            timeoutMessage: a,
            withCredentials: a,
            adapter: a,
            responseType: a,
            xsrfCookieName: a,
            xsrfHeaderName: a,
            onUploadProgress: a,
            onDownloadProgress: a,
            decompress: a,
            maxContentLength: a,
            maxBodyLength: a,
            beforeRedirect: a,
            transport: a,
            httpAgent: a,
            httpsAgent: a,
            cancelToken: a,
            socketPath: a,
            responseEncoding: a,
            validateStatus: d
        };
        return xe.forEach(Object.keys(t).concat(Object.keys(n)), function ($) {
            var m = l[$] || s, g = m($);
            xe.isUndefined(g) && m !== d || (r[$] = g)
        }), r
    }, sa = {version: "0.27.2"}, o0 = sa.version, ct = jt, vo = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function (e, t) {
        vo[e] = function (r) {
            return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
        }
    });
    var ia = {};
    vo.transitional = function (t, n, r) {
        function o(s, i) {
            return "[Axios v" + o0 + "] Transitional option '" + s + "'" + i + (r ? ". " + r : "")
        }

        return function (s, i, a) {
            if (t === !1) throw new ct(o(i, " has been removed" + (n ? " in " + n : "")), ct.ERR_DEPRECATED);
            return n && !ia[i] && (ia[i] = !0, console.warn(o(i, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(s, i, a) : !0
        }
    };

    function s0(e, t, n) {
        if (typeof e != "object") throw new ct("options must be an object", ct.ERR_BAD_OPTION_VALUE);
        for (var r = Object.keys(e), o = r.length; o-- > 0;) {
            var s = r[o], i = t[s];
            if (i) {
                var a = e[s], d = a === void 0 || i(a, s, e);
                if (d !== !0) throw new ct("option " + s + " must be " + d, ct.ERR_BAD_OPTION_VALUE);
                continue
            }
            if (n !== !0) throw new ct("Unknown option " + s, ct.ERR_BAD_OPTION)
        }
    }

    var i0 = {assertOptions: s0, validators: vo}, aa = ue, a0 = Gi, da = A1, la = r0, Wn = oa, d0 = qi, ca = i0,
        Ut = ca.validators;

    function zt(e) {
        this.defaults = e, this.interceptors = {request: new da, response: new da}
    }

    zt.prototype.request = function (t, n) {
        typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Wn(this.defaults, n), n.method ? n.method = n.method.toLowerCase() : this.defaults.method ? n.method = this.defaults.method.toLowerCase() : n.method = "get";
        var r = n.transitional;
        r !== void 0 && ca.assertOptions(r, {
            silentJSONParsing: Ut.transitional(Ut.boolean),
            forcedJSONParsing: Ut.transitional(Ut.boolean),
            clarifyTimeoutError: Ut.transitional(Ut.boolean)
        }, !1);
        var o = [], s = !0;
        this.interceptors.request.forEach(function (g) {
            typeof g.runWhen == "function" && g.runWhen(n) === !1 || (s = s && g.synchronous, o.unshift(g.fulfilled, g.rejected))
        });
        var i = [];
        this.interceptors.response.forEach(function (g) {
            i.push(g.fulfilled, g.rejected)
        });
        var a;
        if (!s) {
            var d = [la, void 0];
            for (Array.prototype.unshift.apply(d, o), d = d.concat(i), a = Promise.resolve(n); d.length;) a = a.then(d.shift(), d.shift());
            return a
        }
        for (var l = n; o.length;) {
            var u = o.shift(), $ = o.shift();
            try {
                l = u(l)
            } catch (m) {
                $(m);
                break
            }
        }
        try {
            a = la(l)
        } catch (m) {
            return Promise.reject(m)
        }
        for (; i.length;) a = a.then(i.shift(), i.shift());
        return a
    }, zt.prototype.getUri = function (t) {
        t = Wn(this.defaults, t);
        var n = d0(t.baseURL, t.url);
        return a0(n, t.params, t.paramsSerializer)
    }, aa.forEach(["delete", "get", "head", "options"], function (t) {
        zt.prototype[t] = function (n, r) {
            return this.request(Wn(r || {}, {method: t, url: n, data: (r || {}).data}))
        }
    }), aa.forEach(["post", "put", "patch"], function (t) {
        function n(r) {
            return function (s, i, a) {
                return this.request(Wn(a || {}, {
                    method: t,
                    headers: r ? {"Content-Type": "multipart/form-data"} : {},
                    url: s,
                    data: i
                }))
            }
        }

        zt.prototype[t] = n(), zt.prototype[t + "Form"] = n(!0)
    });
    var l0 = zt, c0 = Kn;

    function Gt(e) {
        if (typeof e != "function") throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function (o) {
            t = o
        });
        var n = this;
        this.promise.then(function (r) {
            if (!!n._listeners) {
                var o, s = n._listeners.length;
                for (o = 0; o < s; o++) n._listeners[o](r);
                n._listeners = null
            }
        }), this.promise.then = function (r) {
            var o, s = new Promise(function (i) {
                n.subscribe(i), o = i
            }).then(r);
            return s.cancel = function () {
                n.unsubscribe(o)
            }, s
        }, e(function (o) {
            n.reason || (n.reason = new c0(o), t(n.reason))
        })
    }

    Gt.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason
    }, Gt.prototype.subscribe = function (t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }, Gt.prototype.unsubscribe = function (t) {
        if (!!this._listeners) {
            var n = this._listeners.indexOf(t);
            n !== -1 && this._listeners.splice(n, 1)
        }
    }, Gt.source = function () {
        var t, n = new Gt(function (o) {
            t = o
        });
        return {token: n, cancel: t}
    };
    var u0 = Gt, f0 = function (t) {
        return function (r) {
            return t.apply(null, r)
        }
    }, $0 = ue, m0 = function (t) {
        return $0.isObject(t) && t.isAxiosError === !0
    }, ua = ue, g0 = Di, Zn = l0, h0 = oa, p0 = go;

    function fa(e) {
        var t = new Zn(e), n = g0(Zn.prototype.request, t);
        return ua.extend(n, Zn.prototype, t), ua.extend(n, t), n.create = function (o) {
            return fa(h0(e, o))
        }, n
    }

    var ve = fa(p0);
    ve.Axios = Zn, ve.CanceledError = Kn, ve.CancelToken = u0, ve.isCancel = na, ve.VERSION = sa.version, ve.toFormData = Zi, ve.AxiosError = jt, ve.Cancel = ve.CanceledError, ve.all = function (t) {
        return Promise.all(t)
    }, ve.spread = f0, ve.isAxiosError = m0, oo.exports = ve, oo.exports.default = ve;
    var qn = oo.exports;
    const v0 = {class: "fx-phone"}, b0 = {class: "fx-phone-field"}, y0 = {class: "fx-phone__code"},
        A0 = {class: "fx-phone__codeflag"}, x0 = ["src"], k0 = B("span", {class: "fx-phone__icon"}, "\u25BC", -1),
        w0 = {key: 0, class: "fx-phone__list"}, E0 = {class: "fx-phone__list-search"}, C0 = ["onClick"], P0 = ["src"],
        S0 = ["placeholder"], _0 = {key: 0, class: "error-message"}, T0 = tn({
            __name: "FxPhone",
            props: {
                error: {default: ""},
                modelValue: null,
                placeholder: {default: ""},
                message: {default: "Please enter a valid number"}
            },
            async setup(e, {emit: t}) {
                let n, r;
                const o = e, s = oi(o, t, "modelValue"), i = de(""), a = de(""), d = de(null),
                    l = ([n, r] = Al(() => S()), n = await n, r(), n), u = Kr.find(L => L.iso === "GB"),
                    $ = Kr.find(L => L.iso === l) || u;
                de($.mask);
                const m = de(!1), g = mt($), y = de(""), x = de("");

                async function S() {
                    try {
                        const L = await qn.get("/");
                        return Promise.resolve(L.headers["x-geoip"])
                    } catch {
                        return Promise.resolve("GB")
                    }
                }

                const P = () => {
                    if (i.value.length > 1) {
                        const L = Ju(i.value, g.iso);
                        i.value = L.formatNational(), s.value = L.formatInternational(), y.value = L.isValid() ? "valid" : "invalid"
                    } else y.value = "invalid"
                }, E = () => {
                    m.value = !m.value, pr(() => {
                        m.value ? d.value.focus() : a.value = ""
                    })
                }, p = () => {
                    let L = Kr;
                    return a.value != "" && a.value && (L = L.filter(W => W.name.toUpperCase().includes(a.value.toUpperCase()))), L
                }, N = (L, W) => {
                    Object.assign(g, W), m.value = !1, a.value = "", t("select", W), T(W.iso)
                }, T = L => {
                    x.value = Yu(L, oc).formatNational()
                };
                return T($.iso), (L, W) => (ne(), le("div", v0, [B("div", b0, [B("div", y0, [B("div", {
                    class: $e(["fx-phone__selected", m.value ? "active" : ""]),
                    onClick: E
                }, [B("div", A0, [B("img", {
                    src: g.flag,
                    loading: "eager",
                    width: "25",
                    alt: ""
                }, null, 8, x0), B("span", null, ee(g.code), 1)]), k0], 2), m.value ? (ne(), le("div", w0, [B("div", E0, [Sr(B("input", {
                    type: "text",
                    ref_key: "searchInput",
                    ref: d,
                    "onUpdate:modelValue": W[0] || (W[0] = M => a.value = M)
                }, null, 512), [[Mn, a.value]])]), B("ul", null, [(ne(!0), le(Pe, null, ps(p(), M => (ne(), le("li", {onClick: Z => N(Z, M)}, [B("img", {
                    src: M.flag,
                    loading: "lazy",
                    width: "25",
                    alt: ""
                }, null, 8, P0), ot(" " + ee(M.code) + " " + ee(M.name), 1)], 8, C0))), 256))])])) : Ve("", !0)]), B("div", {class: $e(["fx-phone__input", y.value])}, [Sr(B("input", {
                    "onUpdate:modelValue": W[1] || (W[1] = M => i.value = M),
                    placeholder: `${o.placeholder} ${x.value}`,
                    onInput: P
                }, null, 40, S0), [[Mn, i.value]])], 2)]), e.error ? (ne(), le("div", _0, ee(e.message), 1)) : Ve("", !0)]))
            }
        });
    var $a = {
        en: {
            title: "Create an account",
            firstnameMessage: "Please enter your first name (No numbers)",
            firstnamePlaceholder: "First name",
            lastnameMessage: "Please enter your last name (No numbers)",
            lastnamePlaceholder: "Last name",
            emailMessage: "Please enter your email. Example: joe@bloggs.com",
            emailPlaceholder: "Email",
            phoneMessage: "Please enter valid telephone number",
            phonePlaceholder: "Telephone, e.g. ",
            buttonText: "Learn More",
            buttonSuccess: "Success! Redirecting you now...",
            note1: '* By submitting you confirm that you\u2019ve read and accepted the <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">privacy policy</a> and <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">terms of conditions.</a>',
            note2: "** By submitting this form, I agree to receive all marketing material by email, SMS and telephone.",
            note3: "*** All Trading carries risk.",
            error: "Unable to find a broker, please try again later."
        },
        nl: {
            title: "Maak een account aan",
            firstnameMessage: "Voer uw voornaam in (geen cijfers)",
            firstnamePlaceholder: "Voornaam",
            lastnameMessage: "Voer uw achternaam in (geen cijfers)",
            lastnamePlaceholder: "Achternaam",
            emailMessage: "Voer uw e-mailadres in. Voorbeeld: joe@bloggs.com",
            emailPlaceholder: "E-mail",
            phoneMessage: "Voer een geldig telefoonnummer in",
            phonePlaceholder: "Telefoon, bijv. ",
            buttonText: "Kom meer te weten",
            buttonSuccess: "Succes! U wordt nu omgeleid...",
            note1: '* * Door te verzenden bevestigt u dat u het <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">privacybeleid</a> en de <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">voorwaarden</a> hebt gelezen en geaccepteerd.',
            note2: "** Door dit formulier in te dienen, ga ik ermee akkoord al het marketingmateriaal per e-mail, sms en telefoon te ontvangen.",
            note3: "*** Alle handel brengt risico's met zich mee.",
            error: "Kan geen makelaar vinden, probeer het later opnieuw."
        },
        de: {
            title: "Konto erstellen",
            firstnameMessage: "Bitte geben Sie Ihren Vornamen ein (keine Zahlen)",
            firstnamePlaceholder: "Vorname",
            lastnameMessage: "Bitte geben Sie Ihren Nachnamen ein (keine Zahlen)",
            lastnamePlaceholder: "Nachname",
            emailMessage: "Bitte geben Sie Ihre E-Mail-Adresse ein. Beispiel: joe@bloggs.com",
            emailPlaceholder: "E-Mail",
            phoneMessage: "Bitte geben Sie eine g\xFCltige Telefonnummer ein",
            phonePlaceholder: "Telefon, z. B. ",
            buttonText: "Erfahren Sie mehr",
            buttonSuccess: "Erfolg! Leite dich jetzt weiter...",
            note1: '* Mit dem Absenden best\xE4tigen Sie, dass Sie die <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">Datenschutzerkl\xE4rung</a> und <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">Bedingungen</a> gelesen und akzeptiert haben.',
            note2: "** Durch das Absenden dieses Formulars stimme ich zu, alle Marketingmaterialien per E-Mail, SMS und Telefon zu erhalten.",
            note3: "*** Jeder Handel birgt Risiken.",
            error: "Es konnte kein Broker gefunden werden, bitte versuchen Sie es sp\xE4ter erneut."
        },
        fi: {
            title: "Luo tili",
            firstnameMessage: "Anna etunimesi (ei numeroita)",
            firstnamePlaceholder: "Etunimi",
            lastnameMessage: "Anna sukunimesi (ei numeroita)",
            lastnamePlaceholder: "Sukunimi",
            emailMessage: "Anna s\xE4hk\xF6postiosoitteesi. Esimerkki: joe@bloggs.com",
            emailPlaceholder: "S\xE4hk\xF6posti",
            phoneMessage: "Anna kelvollinen puhelinnumero",
            phonePlaceholder: "Puhelin, esim. ",
            buttonText: "Lis\xE4tietoja",
            buttonSuccess: "Onnistui! Ohjataan sinut nyt...",
            note1: '* L\xE4hett\xE4m\xE4ll\xE4 vahvistat, ett\xE4 olet lukenut ja hyv\xE4ksynyt <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">tietosuojak\xE4yt\xE4nt\xF6</a> ja <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">ehdot.</a>',
            note2: "** L\xE4hett\xE4m\xE4ll\xE4 t\xE4m\xE4n lomakkeen suostun vastaanottamaan kaiken markkinointimateriaalin s\xE4hk\xF6postitse, tekstiviestin\xE4 ja puhelimitse.",
            note3: "*** Kaikkeen kaupank\xE4yntiin liittyy riski.",
            error: "Ei l\xF6ydy v\xE4litt\xE4j\xE4\xE4, yrit\xE4 my\xF6hemmin uudelleen."
        },
        fr: {
            title: "Cr\xE9er un compte",
            firstnameMessage: "Veuillez entrer votre pr\xE9nom (pas de chiffres)",
            firstnamePlaceholder: "Pr\xE9nom",
            lastnameMessage: "Veuillez entrer votre nom de famille (pas de chiffres)",
            lastnamePlaceholder: "Nom de famille",
            emailMessage: "Veuillez entrer votre email. Exemple\xA0: joe@bloggs.com",
            emailPlaceholder: "E-mail",
            phoneMessage: "Veuillez entrer un num\xE9ro de t\xE9l\xE9phone valide",
            phonePlaceholder: "T\xE9l\xE9phone, par exemple ",
            buttonText: "Apprendre encore plus",
            buttonSuccess: "Succ\xE8s\xA0! Je vous redirige maintenant...",
            note1: '* En soumettant, vous confirmez que vous avez lu et accept\xE9 le <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">politique de confidentialit\xE9</a> et <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">conditions g\xE9n\xE9rales.</a>',
            note2: "** En soumettant ce formulaire, j'accepte de recevoir tout le mat\xE9riel marketing par e-mail, SMS et t\xE9l\xE9phone.",
            note3: "*** Tous les \xE9changes comportent des risques.",
            error: "Impossible de trouver un courtier, veuillez r\xE9essayer plus tard."
        },
        it: {
            title: "Crea un account",
            firstnameMessage: "Inserisci il tuo nome (senza numeri)",
            firstnamePlaceholder: "Nome",
            lastnameMessage: "Inserisci il tuo cognome (senza numeri)",
            lastnamePlaceholder: "Cognome",
            emailMessage: "Per favore inserisci la tua email. Esempio: joe@bloggs.com",
            emailPlaceholder: "Email",
            phoneMessage: "Si prega di inserire un numero di telefono valido",
            phonePlaceholder: "Telefono, es. ",
            buttonText: "Saperne di pi\xF9",
            buttonSuccess: "Success! Reindirizzamento ora...",
            note1: '* Inviando confermi di aver letto e accettato il <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">informativa sulla privacy</a> e <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">termini delle condizioni.</a>',
            note2: "** Inviando questo modulo, accetto di ricevere tutto il materiale di marketing tramite e-mail, SMS e telefono.",
            note3: "*** Tutto il trading comporta dei rischi.",
            error: "Impossibile trovare un broker, riprova pi\xF9 tardi."
        },
        no: {
            title: "Opprett en konto",
            firstnameMessage: "Vennligst skriv inn fornavnet ditt (ingen tall)",
            firstnamePlaceholder: "Fornavn",
            lastnameMessage: "Vennligst skriv inn etternavnet ditt (ingen tall)",
            lastnamePlaceholder: "Etternavn",
            emailMessage: "Vennligst skriv inn e-posten din. Eksempel: joe@bloggs.com",
            emailPlaceholder: "E-post",
            phoneMessage: "Vennligst skriv inn et gyldig telefonnummer",
            phonePlaceholder: "Telefon, f.eks. ",
            buttonText: "L\xE6re mer",
            buttonSuccess: "Suksess! Omdirigerer deg n\xE5...",
            note1: '* Ved \xE5 sende bekrefter du at du har lest og godtatt <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">personvernregler</a> og <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">vilk\xE5r for vilk\xE5r.</a>',
            note2: "** Ved \xE5 sende inn dette skjemaet godtar jeg \xE5 motta alt markedsf\xF8ringsmateriell p\xE5 e-post, SMS og telefon.",
            note3: "*** All handel medf\xF8rer risiko.",
            error: "Kan ikke finne en megler, pr\xF8v igjen senere."
        },
        pl: {
            title: "Utw\xF3rz konto",
            firstnameMessage: "Prosz\u0119 poda\u0107 swoje imi\u0119 (bez numer\xF3w)",
            firstnamePlaceholder: "Imi\u0119",
            lastnameMessage: "Prosz\u0119 poda\u0107 swoje nazwisko (bez numer\xF3w)",
            lastnamePlaceholder: "Nazwisko",
            emailMessage: "Podaj sw\xF3j adres e-mail. Przyk\u0142ad: joe@bloggs.com",
            emailPlaceholder: "E-mail",
            phoneMessage: "Prosz\u0119 poda\u0107 poprawny numer telefonu",
            phonePlaceholder: "Telefon, np. ",
            buttonText: "Ucz si\u0119 wi\u0119cej",
            buttonSuccess: "Sukces! Przekierowuj\u0119 Ci\u0119 teraz...",
            note1: '* Przesy\u0142aj\u0105c, potwierdzasz, \u017Ce przeczyta\u0142e\u015B i zaakceptowa\u0142e\u015B <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">polityka prywatno\u015Bci</a> i <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">warunki.</a>',
            note2: "** Przesy\u0142aj\u0105c ten formularz, wyra\u017Cam zgod\u0119 na otrzymywanie wszelkich materia\u0142\xF3w marketingowych poczt\u0105 elektroniczn\u0105, SMS-em i telefonicznie.",
            note3: "*** Wszystkie transakcje nios\u0105 ze sob\u0105 ryzyko.",
            error: "Nie mo\u017Cna znale\u017A\u0107 brokera, spr\xF3buj ponownie p\xF3\u017Aniej."
        },
        pt: {
            title: "Criar uma conta",
            firstnameMessage: "Por favor, digite seu primeiro nome (sem n\xFAmeros)",
            firstnamePlaceholder: "Primeiro nome",
            lastnameMessage: "Por favor, digite seu sobrenome (sem n\xFAmeros)",
            lastnamePlaceholder: "Sobrenome",
            emailMessage: "Por favor, digite seu e-mail. Exemplo: joe@bloggs.com",
            emailPlaceholder: "E-mail",
            phoneMessage: "Por favor, insira um n\xFAmero de telefone v\xE1lido",
            phonePlaceholder: "Telefone, por exemplo, ",
            buttonText: "Saber mais",
            buttonSuccess: "Sucesso! Redirecionando voc\xEA agora...",
            note1: '* Ao enviar, voc\xEA confirma que leu e aceitou o <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">pol\xEDtica de privacidade</a> e <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">termos de condi\xE7\xF5es.</a>',
            note2: "** Ao enviar este formul\xE1rio, concordo em receber todo o material de marketing por e-mail, SMS e telefone.",
            note3: "*** Todas as negocia\xE7\xF5es acarretam risco.",
            error: "N\xE3o foi poss\xEDvel encontrar um corretor, tente novamente mais tarde."
        },
        es: {
            title: "Crear una cuenta",
            firstnameMessage: "Por favor ingrese su primer nombre (sin n\xFAmeros)",
            firstnamePlaceholder: "Nombre",
            lastnameMessage: "Ingrese su apellido (sin n\xFAmeros)",
            lastnamePlaceholder: "Apellido",
            emailMessage: "Por favor ingrese su correo electr\xF3nico. Ejemplo: joe@bloggs.com",
            emailPlaceholder: "Correo electr\xF3nico",
            phoneMessage: "Por favor, introduzca un n\xFAmero de tel\xE9fono v\xE1lido",
            phonePlaceholder: "Tel\xE9fono, por ejemplo, ",
            buttonText: "Aprende m\xE1s",
            buttonSuccess: "\xA1\xC9xito! Redirigi\xE9ndolo ahora...",
            note1: '* Al enviar, confirmas que has le\xEDdo y aceptado el <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">pol\xEDtica de privacidad</a> y <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">t\xE9rminos de las condiciones.</a>',
            note2: "** Al enviar este formulario, acepto recibir todo el material de marketing por correo electr\xF3nico, SMS y tel\xE9fono.",
            note3: "*** Todas las operaciones conllevan riesgos.",
            error: "No se pudo encontrar un corredor, int\xE9ntelo de nuevo m\xE1s tarde."
        },
        ru: {
            title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442",
            firstnameMessage: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F (\u0431\u0435\u0437 \u0446\u0438\u0444\u0440)",
            firstnamePlaceholder: "\u0418\u043C\u044F",
            lastnameMessage: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0443 \u0444\u0430\u043C\u0438\u043B\u0438\u044E (\u0431\u0435\u0437 \u0446\u0438\u0444\u0440)",
            lastnamePlaceholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F",
            emailMessage: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B. \u041F\u0440\u0438\u043C\u0435\u0440: joe@bloggs.com",
            emailPlaceholder: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430",
            phoneMessage: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
            phonePlaceholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 ",
            buttonText: "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
            buttonSuccess: "\u0423\u0441\u043F\u0435\u0445! \u041F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u044F\u044E \u0432\u0430\u0441 \u0441\u0435\u0439\u0447\u0430\u0441...",
            note1: '* \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044F \u0437\u0430\u044F\u0432\u043A\u0443, \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435, \u0447\u0442\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B\u0438 \u0438 \u043F\u0440\u0438\u043D\u044F\u043B\u0438 <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438</a> \u0438 <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">\u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F.</a>',
            note2: "** \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044F \u044D\u0442\u0443 \u0444\u043E\u0440\u043C\u0443, \u044F \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u044E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0432\u0441\u0435 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435, SMS \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443.",
            note3: "*** \u0412\u0441\u044F \u0442\u043E\u0440\u0433\u043E\u0432\u043B\u044F \u0441\u043E\u043F\u0440\u044F\u0436\u0435\u043D\u0430 \u0441 \u0440\u0438\u0441\u043A\u043E\u043C.",
            error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u0431\u0440\u043E\u043A\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043F\u043E\u0437\u0436\u0435."
        },
        sv: {
            title: "Skapa ett konto",
            firstnameMessage: "Ange ditt f\xF6rnamn (inga nummer)",
            firstnamePlaceholder: "F\xF6rnamn",
            lastnameMessage: "Ange ditt efternamn (inga nummer)",
            lastnamePlaceholder: "Efternamn",
            emailMessage: "Ange din e-postadress. Exempel: joe@bloggs.com",
            emailPlaceholder: "E-post",
            phoneMessage: "V\xE4nligen ange ett giltigt telefonnummer",
            phonePlaceholder: "Telefon, t.ex. ",
            buttonText: "L\xE4s mer",
            buttonSuccess: "Framg\xE5ng! Omdirigerar dig nu...",
            note1: '* Genom att skicka in bekr\xE4ftar du att du har l\xE4st och accepterat <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">integritetspolicyn</a> och <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">villkoren</a>.',
            note2: "** Genom att skicka in detta formul\xE4r godk\xE4nner jag att ta emot allt marknadsf\xF6ringsmaterial via e-post, SMS och telefon.",
            note3: "*** All handel medf\xF6r risk.",
            error: "Det gick inte att hitta en m\xE4klare, f\xF6rs\xF6k igen senare."
        },
        tr: {
            title: "Hesap olu\u015Ftur",
            firstnameMessage: "L\xFCtfen adinizi girin (Sayi yok)",
            firstnamePlaceholder: "\u0130lk adi",
            lastnameMessage: "L\xFCtfen soyadinizi giriniz (Sayi yok)",
            lastnamePlaceholder: "Soy isim",
            emailMessage: "L\xFCtfen e-postanizi girin. \xD6rnek: joe@bloggs.com",
            emailPlaceholder: "E-posta",
            phoneMessage: "L\xFCtfen ge\xE7erli bir telefon numarasi giriniz",
            phonePlaceholder: "Telefon, \xF6r. ",
            buttonText: "Daha fazla bilgi edin",
            buttonSuccess: "Ba\u015Farili! \u015Eimdi y\xF6nlendiriliyorsunuz...",
            note1: '* G\xF6ndererek, s\xF6zle\u015Fmesini okuyup kabul etti\u011Finizi onayliyorsunuz <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">gizlilik politikasi</a> ve <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">\u015Fartlar ve ko\u015Fullar.</a>',
            note2: "** Bu formu g\xF6ndererek, t\xFCm pazarlama materyallerini e-posta, SMS ve telefon yoluyla almayi kabul ediyorum.",
            note3: "*** T\xFCm \u0130\u015Flemler risk ta\u015Fir.",
            error: "Araci bulunamadi, l\xFCtfen daha sonra tekrar deneyin."
        },
        da: {
            title: "Opret en konto",
            firstnameMessage: "Indtast venligst dit fornavn (ingen tal)",
            firstnamePlaceholder: "Fornavn",
            lastnameMessage: "Indtast venligst dit efternavn (ingen tal)",
            lastnamePlaceholder: "Efternavn",
            emailMessage: "Indtast venligst din e-mail. Eksempel: joe@bloggs.com",
            emailPlaceholder: "E-mail",
            phoneMessage: "Indtast venligst et gyldigt telefonnummer",
            phonePlaceholder: "Telefon, f.eks. ",
            buttonText: "L\xE6r mere",
            buttonSuccess: "Succes! Omdirigerer dig nu...",
            note1: '* Ved at indsende bekr\xE6fter du, at du har l\xE6st og accepteret <a rel="nofollow" href="https://jupiter-e.bstcorlon.care/terms/privacy.html" target="_blank" class="term-link">privatlivspolitik</a> og <a rel="nofollow" class="term-link" href="https://jupiter-e.bstcorlon.care/terms/tandcs.html" target="_blank">vilk\xE5r og betingelser.</a>',
            note2: "** Ved at indsende denne formular accepterer jeg at modtage alt marketingmateriale via e-mail, SMS og telefon.",
            note3: "*** Al handel medf\xF8rer risiko.",
            error: "Kan ikke finde en m\xE6gler, pr\xF8v venligst igen senere."
        }
    }, N0 = `.fx-selected,.fx-option{display:flex;justify-content:flex-start;align-items:center}.fx-selected-flag,.fx-option-flag{width:25px;margin-right:5px}.fx-selected-flag img,.fx-option-flag img{max-width:100%;vertical-align:middle}.signup-form-fx{font-family:sans-serif;font-size:16px;background:#001132;padding:20px;color:#fff;width:100%;margin:auto;position:relative;box-sizing:border-box;box-shadow:5px 10px 15px #001132cc}.signup-form-fx *{font-family:sans-serif}.signup-form-fx.rounded-fx{border-radius:8px}.signup-form-fx h3{color:#fff;margin:0;text-align:center;font-size:26px;font-weight:500;padding:10px 0}.signup-form-fx .alert{font-size:15px;color:#fff;line-height:1.2;text-align:center;font-weight:600;background:red;padding:5px}.signup-form-fx input{caret-color:#fff}.signup-form-fx input::placeholder{color:#d4d6dc}.signup-form-fx .form-group-fx{position:relative;margin-bottom:20px}.signup-form-fx .form-group-fx .input-group{width:100%}.signup-form-fx .form-group-fx .input-group input{box-sizing:border-box;background:transparent;border:1px solid white;border-radius:5px;width:100%;position:relative;outline:none;padding:10px;color:#fff;font-size:18px}.signup-form-fx .form-group-fx .input-group input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #001132 inset;-webkit-text-fill-color:white}.signup-form-fx .form-group-fx .input-group input:focus{transition:.1s}.signup-form-fx .form-group-fx .error-message{display:none;width:100%;margin-top:.25rem;font-size:90%;color:#e76e55}.signup-form-fx .form-group-fx.last{margin-bottom:15px}.signup-form-fx .was-validated:invalid~.error-message{display:block}.signup-form-fx .was-validated .form-control-fx:valid{border-color:#28a745;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.signup-form-fx .was-validated .form-control-fx input:invalid{border-color:#e76e55;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e76e55' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");margin:0;background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.signup-form-fx .is-invalid~.error-message{display:block}.signup-form-fx .form-control-fx.is-valid{border-color:#28a745;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.signup-form-fx input.form-control-fx.is-invalid{border-color:#e76e55;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e76e55' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");margin:0;background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.signup-form-fx .register{-webkit-font-smoothing:antialiased;word-break:break-word;word-wrap:break-word;-webkit-box-sizing:border-box;font-family:Inter var,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;line-height:1.25;opacity:1;text-align:center;text-decoration:none;-webkit-appearance:none;letter-spacing:0;display:block;font-size:20px;font-weight:700;position:relative;color:#fff;padding:0;border-radius:5px;text-transform:uppercase;width:100%;height:64px;border:none;cursor:pointer;background-color:#e2ae60;outline:none;margin-bottom:10px;transition:.3s}.signup-form-fx .register:hover{transition:.1s;opacity:.9}.signup-form-fx .register:after{content:"";display:block;width:1.2em;height:1.2em;position:absolute;left:calc(50% - .75em);top:calc(50% - .75em);border:.15em solid transparent;border-right-color:#fff;border-radius:50%;animation:button-anim .7s linear infinite;opacity:0}.signup-form-fx .tnc_text p{font-size:11px;text-align:center;margin:0;line-height:1.5}.signup-form-fx .fx-phone{margin-bottom:20px}.signup-form-fx .fx-phone .error-message{width:100%;margin-top:.25rem;font-size:90%;color:#e76e55}.signup-form-fx .fx-phone .fx-phone-field{display:flex;align-items:center;justify-content:flex-start}.signup-form-fx .fx-phone__input{width:100%}.signup-form-fx .fx-phone__input input{box-sizing:border-box;background:transparent;border:1px solid #ccc;border-radius:5px;width:100%;position:relative;outline:none;padding:10px;color:#fff;font-size:18px}.signup-form-fx .fx-phone__input input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #001132 inset;-webkit-text-fill-color:white}.signup-form-fx .fx-phone__input input:focus{transition:.1s}.signup-form-fx .fx-phone__input.valid input{border-color:#32cd32}.signup-form-fx .fx-phone__input.invalid input{border-color:#ff4500}.signup-form-fx .fx-phone__selected{cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:0 5px 0 2px;box-sizing:border-box;min-width:95px}.signup-form-fx .fx-phone__selected .fx-phone__codeflag{display:flex;margin-right:5px}.signup-form-fx .fx-phone__selected .fx-phone__icon{opacity:.8}.signup-form-fx .fx-phone__selected.active .fx-phone__icon{transform:rotate(180deg)}.signup-form-fx .fx-phone__selected img{margin-right:5px}.signup-form-fx .fx-phone__list{position:absolute;color:#333;background:#fff;z-index:9999;width:250px;padding:0;max-width:100%}.signup-form-fx .fx-phone__list-search{padding:10px 10px 0}.signup-form-fx .fx-phone__list-search input{width:100%;height:30px;outline:none;box-sizing:border-box;font-size:14px;caret-color:#000}.signup-form-fx .fx-phone__list ul{padding:0;margin:0;list-style:none;overflow:auto;max-height:300px}.signup-form-fx .fx-phone__list li{padding:10px;list-style:none;cursor:pointer;display:flex}.signup-form-fx .fx-phone__list li img{margin-right:5px}.theme-light,.theme-white{background:#f5f7fa;color:#000;box-shadow:none}.theme-light h3,.theme-white h3{color:#000}.theme-light input,.theme-white input{caret-color:#000}.theme-light input::placeholder,.theme-white input::placeholder{color:#2d2d2d}.theme-light .fx-phone input,.theme-white .fx-phone input{color:#000!important}.theme-light .fx-phone__list,.theme-white .fx-phone__list{box-shadow:0 0 5px #0000004d}.theme-light .form-group-fx input,.theme-white .form-group-fx input{background:#fff;border:1px solid #ccc!important;padding:10px;color:#000!important}.theme-light .form-group-fx input:-webkit-autofill,.theme-white .form-group-fx input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #001132 inset;-webkit-text-fill-color:black}.theme-light .form-group-fx input:focus,.theme-white .form-group-fx input:focus{transition:.1s;border-color:#7a7a7a}.theme-light .form-group-fx input:valid,.theme-white .form-group-fx input:valid{transition:.1s;border-color:#28a745}.theme-light .form-group-fx .error-message,.theme-white .form-group-fx .error-message{color:#e84927}.theme-light .was-validated .form-control-fx:valid,.theme-white .was-validated .form-control-fx:valid{border-color:#28a745;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.theme-light .was-validated .form-control-fx input:invalid,.theme-white .was-validated .form-control-fx input:invalid{border-color:#e84927;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e76e55' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");margin:0;background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.theme-light .is-invalid~.error-message,.theme-white .is-invalid~.error-message{display:block}.theme-light .form-control-fx.is-valid,.theme-white .form-control-fx.is-valid{border-color:#28a745;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.theme-light input.form-control-fx.is-invalid,.theme-white input.form-control-fx.is-invalid{border-color:#e84927}.theme-light .register,.theme-white .register{color:#fff;background-color:#6797a8}.theme-light .register:hover,.theme-white .register:hover{transition:.1s}.theme-light .tnc_text p,.theme-white .tnc_text p{font-size:10px;text-align:center;margin:0;line-height:1.5}.theme-white{background:#fff}.theme-white .register{background-color:#ffc107}@keyframes button-anim{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.signup-form-fx .register.loading{color:transparent}.signup-form-fx .register.loading:after{opacity:1}.signup-form-fx a.term-link{color:#2379f7;text-decoration:none}.icon.delete{display:flex;justify-content:center;align-items:center;padding:0;margin:0;border:none;background:none;height:8px;width:8px;min-height:8px;min-width:8px;max-height:8px;max-width:8px;cursor:pointer}.icon.arrow-downward{color:#999;border-style:solid;border-width:4px 4px 0;content:"";transition:transform .2s linear;cursor:pointer}.icon.arrow-downward.active{transform:rotate(180deg)}.fx-flex{display:flex;align-items:center;justify-content:space-between}
`, ma = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [r, o] of t) n[r] = o;
        return n
    };
    const O0 = {class: "form-box"}, M0 = ["onSubmit"], I0 = {class: "form-group-fx last"}, R0 = ["disabled"],
        F0 = {class: "tnc_text"}, B0 = ["innerHTML"], L0 = ["innerHTML"], D0 = ["innerHTML"],
        j0 = {key: 0, class: "alert alert-danger"};
    var U0 = ma(tn({
            __name: "Signup.ce",
            props: {
                lang: {default: "en"},
                theme: {default: "default"},
                buttonbg: {default: null},
                buttoncolor: {default: null},
                corner: {default: "rounded"}
            },
            setup(e) {
                const t = e, n = mt({color: t.buttoncolor + " !important", backgroundColor: t.buttonbg + " !important"}),
                    r = mt({
                        "rounded-fx": t.corner !== "straight",
                        "theme-white": t.theme === "white",
                        "theme-light": t.theme === "light",
                        "theme-default": t.theme === "default"
                    }), o = $a[t.lang] || $a.en, s = de(o.buttonText), i = de(!1), a = de({});
                de();
                const d = de(!1), l = mt({firstname: "", lastname: "", email: "", telephone: "", internalClickId: ""}),
                    u = async () => {
                        var m, g, y, x, S, P;
                        i.value = !0, a.value = {}, d.value = !1;
                        try {
                            const E = await qn.post("/action/submit", l, {headers: {"Content-Type": "application/json"}}),
                                p = ((m = E.data.data) == null ? void 0 : m.redirectUrl) || ((g = E.data.data) == null ? void 0 : g.redirect_url);
                            p ? (window.location.href = p, s.value = o.buttonSuccess) : d.value = !0
                        } catch (E) {
                            const p = (x = (y = E.response.data) == null ? void 0 : y.data) == null ? void 0 : x.cause,
                                N = (P = (S = E.response.data) == null ? void 0 : S.data) == null ? void 0 : P.error;
                            p ? a.value = p : N && N === "Invalid Phone" ? a.value = {telephone: N} : d.value = !0
                        }
                        i.value = !1
                    };
                return (async () => {
                    var m, g;
                    try {
                        const y = await qn.post("/action/click", {}, {headers: {"Content-Type": "application/json"}}),
                            x = ((m = y.data.data) == null ? void 0 : m.internalClickId) || ((g = y.data.data) == null ? void 0 : g.clickId);
                        x && (l.internalClickId = x)
                    } catch {
                    }
                })(), (m, g) => (ne(), le("div", {class: $e(["signup-form-fx", r])}, [B("h3", null, ee(te(o).title), 1), B("div", O0, [B("form", {
                    class: "offer-lander-form",
                    action: "/submit",
                    method: "post",
                    onSubmit: Yl(u, ["prevent"])
                }, [ge(Hr, {
                    modelValue: l.firstname,
                    "onUpdate:modelValue": g[0] || (g[0] = y => l.firstname = y),
                    name: "firstname",
                    type: "text",
                    placeholder: te(o).firstnamePlaceholder,
                    message: te(o).firstnameMessage,
                    pattern: "[a-zA-Z ]+",
                    error: a.value.firstname
                }, null, 8, ["modelValue", "placeholder", "message", "error"]), ge(Hr, {
                    modelValue: l.lastname,
                    "onUpdate:modelValue": g[1] || (g[1] = y => l.lastname = y),
                    name: "lastname",
                    type: "text",
                    placeholder: te(o).lastnamePlaceholder,
                    message: te(o).lastnameMessage,
                    pattern: "[a-zA-Z ]+",
                    error: a.value.lastname
                }, null, 8, ["modelValue", "placeholder", "message", "error"]), ge(Hr, {
                    modelValue: l.email,
                    "onUpdate:modelValue": g[2] || (g[2] = y => l.email = y),
                    name: "email",
                    type: "email",
                    placeholder: te(o).emailPlaceholder,
                    message: te(o).emailMessage,
                    error: a.value.email
                }, null, 8, ["modelValue", "placeholder", "message", "error"]), (ne(), Rs(Pd, null, {
                    default: ss(() => [ge(T0, {
                        modelValue: l.telephone,
                        "onUpdate:modelValue": g[3] || (g[3] = y => l.telephone = y),
                        placeholder: te(o).phonePlaceholder,
                        message: te(o).phoneMessage,
                        error: a.value.telephone
                    }, null, 8, ["modelValue", "placeholder", "message", "error"])]), _: 1
                })), B("div", I0, [B("button", {
                    type: "submit",
                    disabled: i.value,
                    class: $e(["register", i.value ? "loading" : ""]),
                    style: ln(n)
                }, ee(s.value), 15, R0), B("div", F0, [B("p", {innerHTML: te(o).note1}, null, 8, B0), B("p", {innerHTML: te(o).note2}, null, 8, L0), B("p", {innerHTML: te(o).note3}, null, 8, D0)])]), d.value ? (ne(), le("div", j0, ee(te(o).error), 1)) : Ve("", !0)], 40, M0)])], 2))
            }
        }), [["styles", [N0]]]),
        ga = {en: {coin: "Coin", change24: "24h Change", volume24: "24h Volume", cap: "Market Cap", price: "Price"}},
        ha = {exports: {}};
    (function (e, t) {
        (function (n, r) {
            e.exports = r()
        })(Qu, function () {
            return (() => {
                var n = {
                    d: (g, y) => {
                        for (var x in y) n.o(y, x) && !n.o(g, x) && Object.defineProperty(g, x, {
                            enumerable: !0,
                            get: y[x]
                        })
                    }, o: (g, y) => Object.prototype.hasOwnProperty.call(g, y)
                }, r = {};
                n.d(r, {default: () => m});
                const o = (...g) => {
                }, s = g => g !== null && g.constructor.name === "Object";
                let i;
                const a = () => {
                        if (i !== void 0) return i;
                        i = !0;
                        try {
                            localStorage || (i = !1)
                        } catch {
                            i = !1
                        }
                        return $(), i
                    }, d = String.fromCharCode(0),
                    l = (g, y, x = !0) => x ? [...JSON.stringify(g)].map(S => String.fromCharCode(S.charCodeAt(0) + y)).join("") : JSON.parse([...g].map(S => String.fromCharCode(S.charCodeAt(0) - y)).join("")),
                    u = {ttl: null, encrypt: !1, encrypter: l, decrypter: (g, y) => l(g, y, !1), secret: 75},
                    $ = (g = !1) => {
                        if (!a()) return !1;
                        Object.keys(localStorage).forEach(y => {
                            const x = localStorage.getItem(y);
                            if (!x) return;
                            let S;
                            try {
                                S = JSON.parse(x)
                            } catch {
                                return
                            }
                            s(S) && d in S && (Date.now() > S.ttl || g) && localStorage.removeItem(y)
                        })
                    }, m = {
                        config: u, set: (g, y, x = {}) => {
                            if (!a()) return !1;
                            const S = Object.assign(Object.assign(Object.assign({}, u), x), {
                                encrypt: x.encrypt !== !1 && (x.encrypt || u.encrypt),
                                ttl: x.ttl === null ? null : x.ttl || u.ttl
                            });
                            try {
                                const P = S.ttl && !isNaN(S.ttl) && S.ttl > 0;
                                let E = P ? {[d]: y, ttl: Date.now() + 1e3 * S.ttl} : y;
                                S.encrypt && (P ? E[d] = (S.encrypter || o)(E[d], S.secret) : E = (S.encrypter || o)(E, S.secret)), localStorage.setItem(g, JSON.stringify(E))
                            } catch {
                                return !1
                            }
                        }, get: (g, y = {}) => {
                            if (!a()) return null;
                            const x = localStorage.getItem(g);
                            if (!x) return null;
                            const S = Object.assign(Object.assign(Object.assign({}, u), y), {
                                encrypt: y.encrypt !== !1 && (y.encrypt || u.encrypt),
                                ttl: y.ttl === null ? null : y.ttl || u.ttl
                            });
                            let P = JSON.parse(x);
                            const E = s(P) && d in P;
                            if (S.decrypt || S.encrypt) try {
                                E ? P[d] = (S.decrypter || o)(P[d], S.secret) : P = (S.decrypter || o)(P, S.secret)
                            } catch {
                            }
                            return E ? Date.now() > P.ttl ? (localStorage.removeItem(g), null) : P[d] : P
                        }, flush: $, clear: () => {
                            if (!a()) return !1;
                            localStorage.clear()
                        }, remove: g => {
                            if (!a()) return !1;
                            localStorage.removeItem(g)
                        }
                    };
                return r.default
            })()
        })
    })(ha);
    var pa = ha.exports, z0 = `.crypto-prices[data-v-621c106a]{border:none;width:100%;border-spacing:0;border-collapse:collapse}.crypto-prices tr[data-v-621c106a]{border-left:1px solid rgb(224,224,224);border-right:1px solid rgb(224,224,224)}.crypto-prices thead tr[data-v-621c106a]:first-child{border-top:1px solid rgb(224,224,224)}.crypto-prices td[data-v-621c106a],.crypto-prices th[data-v-621c106a]{color:#000000de;font-size:.875rem;box-sizing:border-box;font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:400;line-height:1.43;letter-spacing:.01071em;background-color:#fafafa;border-bottom:1px solid rgb(224,224,224);text-align:right}.crypto-prices th[data-v-621c106a]:first-child,.crypto-prices td[data-v-621c106a]:first-child{text-align:center}.crypto-prices th[data-v-621c106a]:nth-child(2),.crypto-prices td[data-v-621c106a]:nth-child(2){text-align:left}.crypto-prices th[data-v-621c106a]{padding:16px;color:#7c7c7c!important;width:19%;font-size:12px}.crypto-prices th[data-v-621c106a]:first-child{width:5%}.crypto-prices td[data-v-621c106a]{padding:8px 16px;font-size:15px;line-height:15px}.crypto-prices .name[data-v-621c106a]{display:flex;align-items:center}.crypto-prices .name-image[data-v-621c106a]{width:24px;height:24px}.crypto-prices .name-image img[data-v-621c106a]{max-width:100%}.crypto-prices .name-title[data-v-621c106a]{margin-left:16px}.crypto-prices .name-title span[data-v-621c106a]{display:block;color:#7c7c7c;font-size:12px}.crypto-prices .name-title span[data-v-621c106a]:first-child{text-transform:uppercase;color:#2a2a2a;font-size:15px;margin-top:8px;line-height:15px}.crypto-prices .counter[data-v-621c106a]{position:relative}.crypto-prices .counter .arrow[data-v-621c106a]{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid orangered;position:absolute;transform-origin:50% 50%;transform:rotate(180deg);bottom:20%}.crypto-prices .counter .arrow.green[data-v-621c106a]{border-bottom-color:#9bc655;transform:none;top:20%;bottom:auto}.crypto-prices .change24[data-v-621c106a]{font-weight:600;font-size:15px;line-height:15px}.crypto-prices .change24.green[data-v-621c106a]{color:#9bc655}.crypto-prices .change24.red[data-v-621c106a]{color:red}.theme-blue tr[data-v-621c106a],.theme-blue thead tr[data-v-621c106a]:first-child{border-color:#8d8a8a}.theme-blue td[data-v-621c106a],.theme-blue th[data-v-621c106a]{color:#fff!important;background-color:#174684;border-color:#8d8a8a}.theme-blue .change24.red[data-v-621c106a]{color:#fb7331}.theme-blue .name-title span[data-v-621c106a]{color:#ccc}.theme-blue .name-title span[data-v-621c106a]:first-child{color:#fff}
`;
    const G0 = (e => (yd("data-v-621c106a"), e = e(), Ad(), e))(() => B("th", null, null, -1)), H0 = {class: "counter"},
        K0 = {class: "name"}, V0 = {class: "name-image"}, W0 = ["src"], Z0 = {class: "name-title"};
    var q0 = ma(tn({
        __name: "CryptoPrice.ce", props: {lang: {default: "en"}, theme: {default: "default"}}, setup(e) {
            const t = e, n = {
                    bitcoin: {
                        code: "BTC",
                        title: "Bitcoin",
                        image: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAADAFBMVEVHcEz/fwD2kxr/AAD2khr0dQD3kxr//wD/qgD2kxr2khr2khr1khr2khr6lhr1khr2khn6lRn4kxr1khb2khn3kxr3kBi/fwD3kxr4khn3kxn3kRjzkBf4khr/VQD6lRn6lhr7lxv6lRr9mBv4lRn2khn6lhrMmQD5lRn4kxr3kxr3kxn3kxn2khn3kxn5lBn4lBn3kxn3lBr4lBkAZwD6lhr1khj5lRr4lBn5kRj3lBn3kxr2khr3kxn4lBn3khn1kRqqVQD8lhr3kxr3kxr2kBr0jxr7lhr3khn7lhr4lBn5lRr3kxr1kRv7lRr2kxn5lBn3khrykRj2kRj3lBn4khr2khn6lxr4lBj5lBrykhn2khn3kxr//////v33lBz///73lR33lB33kxv/nRz3lR7/mRv//fv//fz/nhz//vz2jAr3jQz//v73khj3lBv/mxv3jhD3kRX3kxn3kBT4lBr7lRr3jAz3jQ7//Pn3kRb/nxz/mBv+lxv5lBr3jxH//fr3jg/2iwr2jQz4njH80p/3khf+mRv/nBz3kBP/+/f816v//Pj5lRv7lhv/+vX5s137zpb4liH3jAr5qEf806H6t2b/+/b81ab6t2f82K34nS/7zJH4oTj4nC33iwn7wn3/mxz6w3/937r2jAz96M75tWH7zpj97Nf958z2iQX82rH7yo33lR/4myv+8N/4mCT6lRr6u2/+6tP3jg7969T4ojn5sFf+7tr++PD6v3j4ozz+9u36uWr2igb+69T82rD6uWz+8+b2iwj+7tz6vXL5pD72jQ75slr4pUD+797/+PD5sFj3liD96dD94sL4nzT+79z95sv//Pr3jxD5tmP+8+X948P93LX3myr7yo/5rlL94sP4qUj94L34pUH5tF/7wn/+7dj7xYX81KP/+fL5qkr6uGn81qj2hQD97Nj///37x4n6xYT95cf3mSf96tL7zZb2hwD+8eH5q03/mhv5rlT6wHn3lyP95cj8z5r7yYz+9Oj4oTf3hwD83LSsdU1lAAAAXHRSTlMABP4B/gL7AQP9/Pv++vX89476GJDqFgT9KI4pLWIDbfz9/v532NMFQY/W1fhe912nqa3sAeeHhu0V97m6zo2oawO/xGthYMLH6++F/BzqeHjqPz/QutHnKq0oz5+pmtMAAAbWSURBVFjDpVcHVFNXGL4hiUkIIMhQcOBEwL31oNZZ955tc9/Le8nLTiAJK2GDrIKjdQIKWPesWvfeq+Kuo9bW7l21u7Xrvhc85r1cxHP6nxzO4+XeP//97vd///8D4GNSEfsnskdIQnx4sF9K8LQug0N6zBWjlyIZaNxkcgDksXEzu+uSdFk7U1SqlJ1Z6LH7kLjY5uibRl2g7ZM6xmRqddkKf0ULPxUyvxboMVtnzIyZGsoteI5JZSB0wDhjZoBSwe19Zn4KZUCmdvKECNBX+ryfF0fPMaYqFSqsKZSp2jnRUtC8ge1iOWg1QrtAKVE1aBLlAu2YVkAuxqInA62Dkp633eMiKag1uxazXxxSMr+pqlHzn18yVOzrQSoT9crwl6hewCRNMnqKZAIoZdLhvY2BmNUanItA4ytyfgwyuewloxK31kkyib5vlcZeMh6nRCAqIxAbL5lnLtWoSFIQSWBGGBB53/9obTNc/EW/X//34CE3abfbSP5XzbSjn5GyDZgb1DYAc3bSfh9C+L7Z9uvP23L43we0DYoE0qcEko9dLbg/p42iSA1jrrWWE/fynPvhT48d/FP4rx4pbSOuP8AorQBAJ8UsNuc4627egfDwXfuq5QSsNFMCILXDPIeQyQb1acdnP21ZdnrFrrNkjfsWhB8U5VVAl3pZmsBBQLs+EdxdysEAYQCUuRCdndi/dCtBwNp/agoh4VpVSvrcZX82BBmIGNhewECn5m34ei5kjYBl+6oeQbiRJH0Y2X58KMJRBKYIA9C4H155F0I1oTdxTpYTBlj4tZtK9AmhI0uGzp06+OS/01F9/jK0srtNuQYIrepbT/amOQQoTOzQqTMCYUZxCxyFNq9ablVzAUCTgYujcHs6LVCY4ukIxChsEpBF8xZC1sGa2wdYKNTIycl76ZTgJuPQJbymwykYbVmPAFTD8uq06vWVueyzHrq+sPNiUOhmi0DLrtl+GAdM/gaoR9seqUi3Je3sJhYQPfxGoLTZXSNBN2wAKo1jHdquh4VmJpFm8piN6D/02ceHQVHcDYQl+WP2JyZzEJigh4B1pw5CBIJBXZvP8BIiKQzMwkZAWR5wENzYm8wSiDl3AjnzdaDQJYAuWTghZMxvcBCsO1XqJGlas/k4GwEBH1h4R5BkxYPwVD/sEa6j5QT8pOIQZU/fbas1ESw1F1Y5eHSUpIaD4BTcfoeHBeijP31ly52LLJPULlhoEVApJRhglZC2LGJRR5ZL1OcUa+veLBKqtB/AHQBB8BhBAGH5QpbJLj27X31t5Q6HT0qq8EfQJG9CqBvgZw/f23DME4BVXVZqZ5wqnyOEp0oaYoEBVmy+abYtKczlPMD984Si4odAjMdcI8VBoIauVcnbGFXO4gt74Lcsky/bBJVKktUFJPgSiaor8LBgj41LzG1p20+qCdbDkbX8dFToZvlS2WZbvLZmE5cISxd7eFd3dCuLqcFaJpBmlsrdinkRoFryTuGy7/SIASZ4osCzningUsEE1+SRggi6gVf56UyZV3hkCEGw8K6FpBmKZpijx7lUgJUFlCCdWwLRbG8QEP4HXOWcmFrVhyuu2tLy11rMNV/msvpogG/xj6DQDUG6HuctypT5e454eo8cLj/21ae7jny8pj4m00c5JF+Wo5AmTvcGQWOrOr/yh8+59VbCBL3NAD+08yFoUTwDFRYk6xO9Xjos5uSqRY8Pc6JOEAa9yeQpDyaCWMJ3oECyzvYWHXmyrKGpREea/Rq0/rXHk0cGvcFkYNPhjEUoylPQdikIHS8sbUzyfSTjTyx7r9SnIWsbF1lIQWkbGIEqI6qP/YWVgTH/Bm/AS+l5f6Ac3Fe7oWzLiieXSGFZUWq54orKe0Sfdvz+hE6rJKwHqu1/l1vhih8L8i27C/LTncKy1K7PIE+rJgfD+OVV496BauttR/p66IK7ztUxNE0ztFBKlNpR9V2SuI10JC8hNO7tZdfgSsvuPw2u3EOlJFa0mq4eK3/aM0tBJL/J0tgs9JKrbvdlCC820GuiJmsu6s4abPNoWw7S3wtntqzMwwfQrORl79lDBMIEjaaGRPqdY04vwvfLgRlR3o0m2+r2wlR5kqKx8aMkeInf6qK7lOObbfzvG3sPl8p82v2eGU1erN33x7T73MAxtGS+f+P7m84vCRHjR5b/N/J4hq4xjQ9dIxoaupA1B9LoftrnjX3GftF9Gxz7WCj7gogJk7UNDZ7GcQNCgUza2OgbOjUm08iNvgrv0VebGdNxUmOjb/3w3Tw2akh33S+6rNRnw/fMuFj5iwzfrAuWo+KWPUIGd5kWrJIEh8cnhPSIZAMXYaL/Dwzi2FkgVOlzAAAAAElFTkSuQmCC"
                    },
                    ethereum: {
                        code: "ETH",
                        title: "Ethereum",
                        image: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcWx7bP///+zv8Ovu7+vu7////////+vu7////+zv8L+/v+vu7+rt7urt7uzv8Ozv7/L19u3v8Ovt7u3w8eru7uvu7+zw8e3w8aFk/+7y9Ozv8Ozu8O/y8uzv8PL19sCqquns7PD09e7u7uvv7+ft7fDy9O7y8uvu7uzu7+ru78zMzOvr7+/z8+rs7u7x8+zv8evu8O3w8e7w8uzu7+jo6+Xn5/L19vH19vL19uvu7/Dz9e7y9Ovu7+/y8/Hz9e/z9PH19vDz9Ozs7Ovw8Ovy8u3w8n////D09fH09e7x8e3w8e3w8evv7+vv8Ozv8O3x8evv7+vw8PL19e7x9Ovt7uzw8evv8O7x8u7y8+3w8uzv8C8wMIKDhBMTEzQ1NTU2Nuvu7+rt7oSFhjEyMu/y8/X4+RERES0uLoOEhfb5+jIzM/Dz9O7x8nx9fens7TAxMfP29/L19v3//+3w8fL19/z//xUVFXt8fYGCg/j8/Dc4OPT4+CQlJRQUFP7//4WGh3x9ficoKP////r9/3+AgYeJifr9/i4vLzM0NCssLPf6++nr7PT3+Hp7fCkqKiIjI35/gH1+fyorKzY3N9bY2dfa2xcXF+Xo6fn8/fv//4mKi4CBgsfJyufp6vj7/fT4+QwNDAQEBPDz9LO1tT0+PtHT1CEhIR8fH6utriMkJF1eXiYnJ0NEREVGRvX5+ra4uY+QkcHDxN7h4oyPj6WnqFNVVQcHB/Dz9WxtbpWWl8zOz77AwaGjpEtMTBsbG3d4eZyen3R2duPm53h5eujq6+Hk5ZiZmsTHyNve3rCys6msrdPV1oKEhWRlZert7xgZGZucnfj7/N3g4VpcXJKUlWZoaKChosjLzLq9vqyur/H19s3Q0TU1Nvb6+25wcGlra8rNzkFCQicnJ9nb3ODi4/L291FSU2BiYkdJSbu+vz9BQSMjI8HExezw8VdZWe/y9Kiqq7CysqSmp0xNTjo7O5aYmc3P0E5OTvT29/H09VZXWHFzc56goGJjY7i6u4a+3GEAAABbdFJOUwABAvz9+wQB/gP4BPr8/v269Nb7+hiOKe0BjuteqGLnA2H8FocVd46Q+NgFKEE/ralr74/qLiy/wv3EbW3H/oaG6+oceCh3AtPSXffQkNHOrahr9V3Pztb+/oaqvdwxAAAHE0lEQVRYw41Xd1wTZxj+wAt3AVEcQKm0bhFXW0W7696r2z8uMckll5DkIlmFpGkgCWUTCCNSFFw/91bcow7c1Vaptq6qHXbv3XR+dwG9+y5gvz8gv7t7n3vXPe/zAiA6KTHwT/TkGfcndM+IJeyxGd0T0l5MxuHFGBzc++BSAKTDR82K1bYYLLSdJO20xdCinfly2vA4eOeeENB84qDpWpvBhGFYV4KEh+gKf5oMNu20QYncAx2caBwkjh1v83eRYJwtPCoV94/AJF202RPG9gd4dEevj3qyt42WYOSdo6JpVdtvTMJk934qCsS1H/2YR7MZCUHy7EPB4LU7CCQBIR4b3U4mcBw82K1FYE6SlHbbLS3Fu0BI6rs9yD4bwR4f9TodTwrtrR8eK11Xn8W/Fk8XpaWIEaLwuAfyMeHrYQmXbKvQbFpiUvEvEp3yH4jDo5D3p/R5KK8zYk5S/jPeatcaj9AFkuyc95BU6AMuxR/OixfZhxY2qL21xZmNyyjhnfi8h3FBJmNAUr7o/bCEF7yeBUrzxg0hFXKrc/5gEMOvf99FPUX2lGW7Q69eoMw0fn0QDYLsuajv3absA5Jf6NdF/P7mxQ1yFsBcuupdBvGhS79uw0B0WwKkT78aL3bg07ccag5AZgwcbkFdiK9/Iro1DVLwfLZEnADr6iq9PAwgM1ceMCB5JCXZj4SDwPGBvR7vSorPvuo7ABrfZ3b0NsH06s/VUgoGRHCA8l+pUMvbAGAQ++rLkUd62AawLuBg4H0MIc5gk8cpvwtgzlQGrUgQxDMjE8FUWM1JtggZCB10qHkAMuP6veIs2KawzTB0iB8Tt8CHbAJ4ADLNxpVoJTr5hwyFSRihFdmT9vJtBShA5RfHTchjmHYETGJSnkScwZVcBvkAspLAYrQfJbYkWISXDJgoAZ/I247e0QYAz36/MA3YljkxIDnWhNZAxRzxhgNwygsLatvMje7PLe8I62BKHwZSt2CiDJ7iKuB06gvlezev/disaUVYvxMJAtOmgsFLEQCV6Y3FDXpori4seHuTJjNXd95drDGzzVDz1W1a8FFhS2eDBDQFlOWqQ+10egorLq6SaWqNOTqdrm5NKYQoNgYWCEuJGRJAdwuBZPBslVPu8Rzd5So2KpVKTY5u/nydLndtDRtJzTdCjrbOAxmiPt5XtVi9902FrESpVCjCAPDo5h/yyUp8uwS9QNAZINaODIIDDXIYukwBrRU8ANaN826j+8IifhD2dIB+RKcLNsDQlWFzAQALURdQXLfy80gAAu3BErfC1WaOAMzPydm9/P0yQTeBdGEIqu8vv1dTfBeBD5Bbt3z376eu8R2wx4IMWuiD3W/98Xef0SUGqNOt0Oy0GmgBK2WAeVYBgOkExRiOX/rFp6wVAuTkrjikX3JjWdZCXh0IS3e0keimH4Ihuix4tLiUi6MVgA3+n7NLQ2WNfwV5DM820mxhK1P+xuozzcw17faLlWYIwQHA4Fd89G+Z1dB0buMPRRS/lQeDVIRPKO2Zozu2k7Tf9NNmX4mLBcjRrfCdpLUW8u+Pcs5lZwm+51QwLF30OZ90eH9dzdBlJwo/qHSV1OXuzj18uyXkv7LLHfiTtKv4n3NsMoiZg3zPKua0Wl9VtbMpxJRdv1Vaunz3rsstIcPZmz6fpuQ3v8ABw1zI60koKbND1aN3eLYeZ6x/bP259uoyy7LmHYr1ZkXgoHA4SPIgpUUgVVVop0Otd1ZsazTRZc3NZa8wb20OZBpL1t9EmJ0jVRzSeieUUpbsgKSsLvAeCYYYq/bUBneN0ayp3NyM0AmkdVZbTBENFsq6uoAlVL23YV3z6YpSt9HM8tGBG1kIKU+C5lNB4shnCBGvb+V4XS93FG5aw3Gicc2OonJkut43EE5GdrjaeohGi+mCl5sMnmPs21lK3rCHVCHznRuucLz378WImb2p0MlSu7q6lhuupS50uHZ9vNfAsFSTgkfE852yNHKzoXUyadzrWsrbERhQ4kQ/US/WeNZ17HQIAxgDx9DJGl//tLRN6UWDyd3EIsuedQlqnLBG8v1cLlSrrMhKhuqsI5lHhYLOsAfm4uJGbVYHMo9thsH5EYTul606MXASqSAUmkl8odmO1FUx7zugUtW43/OrUKn7nFDqwlpKxWKblZpOr6ty1buI1O2c92yfKDyC3O9EoLXcX1Dt2rhVWAECiyD3WR9S0opEC4dl5eHKc0WihSMq8soCV556ZOUhmcLvvhWQULsrD7d0jX4MWbooa3C1heKZ78l+dEz762ccu/ZBCP7axzDU3bWPtnW09oUXz/7jJmRrIy+er9nGj0vscPEMr76Jg6ZFXn2nD5p4r9W3dfmOGz577kzh8h07a9Rw6f9ZvlkItkfx5BlpCfMy0kkiPWNeQlrqMNbxmBTx0/8BsP8D5OWd4s8AAAAASUVORK5CYII="
                    },
                    solana: {
                        code: "SOL",
                        title: "Solana",
                        image: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAABArJoh/0Q4uJQMDBQEAAAIBAwACAgEAAgEDBDMVPSVMUi7WujzIvkDEvzjLvAwxJCodOyLgtjA+Vplz2ZV210E/Z1Kywi9QYDTRuzbOu0TBwCvYuCjauC0bPUq8wky4wq9f37Fc36xh3h3ktaRp3ChHU6Bs27pU4jcTP5CN4Wafxz1DZZeF43iMzZB811isxAYJDTRMYl+mxjQ6V36Jz4WG04mU31ayxUPLxDAYPDXYwDHbvybdt0fHxUOgpixDVEi/wleOrKlk3qVm27Na4LZY4Z1v2nui23WRzBIpKJlw13CVy3eTz2SkyXKXzpJ31W+bzWhIj2NNjV1Si3Cs1zhIZFZZiY191H+e3Guv1l2IroiD1F2qx2my1oKE0IaX34CHz1Beh0tihRMoKzmroz6mpD/OwjrUwcBa6VCUqzHSurlg6EW/wDOvoaVz4qtt5Bzwt8ZW7Bn9v5944Hel2qBq2ahj3H+M0mqbyXyN0GCoyc1Q7nSo2W2YyaZ46FG9yla5y6xy6bNs65WJ44KK0l+zzsBO45N711y80lIkY8RJ44yR4J5/5meiy1XEz2GixVuoxVK1xVSwwykjPWar0IGb3YOZ3ggPEYyB1GS31Vmvxg8OGVerwinjuiXnuDzRxC3fvUadqEzDyD/Gv1u1zUuYqiHrubRk5rBo5h12YxTqsRrotBR5XXqQ0E64xGG501nB0b1Q4kmapmmgzGuezLln61pVimxEjkU7Z5yD5UQgU89J7AQDBk20wtNK8Y5500/AySQfN4SD0C0lRFqtx4Cz63lrsw8SHFOuu06yu3uY1zLTuzK5pTvSwCFuYlG3xDXmyQ5sTwstH8lR7CvsxRjztSXywhbzsw5jRww1JU7FyJZ82q1d208rZHFGmEs9bmKuz2MjbwoUFb1S48Bf7aJ85d9J/CAsOjxUbSVTVGK21EyRoo+B11CIn42D2A0dH4eR3EpIc1HL0ZiZ7k98mRQZIjJibUyytUFWcmbK4o6L3nR1tm98tGd+sSsXNwCSID0AAANSSURBVFjDY2AYBaNgFAxjwMqODxDUzUBACSsrAXlOBkMvIGCEAWYIEICAW5cJGcDJ8Nj+tqOdnaVlevq5cxnW1jY2CxfOmzd//vLlhYWF124UXwJagcf9bAwzNvcryDvmSvPx8fLy80tJZvPwyMja2goJqaisWbN6dfFNBnwGsDDMeNMpPmm9gry8I9CIJRAjzvDIAM0AGaFSvJYVTxixcjAYvns9d7aFxaQLQDMcpaWBRgDNkJQ8A3aGkNB1oH48YcDBavg1aoJxrIHBZHHxfQoK8rloPrm6igGffqDnXh7rmzp16sO2tqVLGxsbGg4uXgwOzgULgKFpbXNxFT7/AwE7w4toIHACgqysrGXLNi9aZG9vn5aWlpqampeXd/Y8AzsHoXTEvpcFG+AEAhYW/O6H6GcDAg42DnZ2NnZ2Dg7kJMzBzslJcS4h5AEODkMTEBAGAwcwUFNT44aCVx8I5RM2hk9fPponJEyfFunhUVpaGxoaFRUXN2vDhs7OjRv7+z//SCEQC2wMh5hi4uMTTav09Dw9fXzqKiu1tScYG0+cCEkZB08RNmHKzPdMZmatrRVV63x9/f0DA7du6fPzq66OPQpMn+INxJjw9i1TTIxZawWaEbEgIyY3nkwBqsGfm4906DMxMR0GesQU6pE6oEfAPpk7d+6kkyms+EOSheHInV26ui0tWlo9Peag8AQFaC0oQIHhOavt13cCngBKH3qwc+dOMRDQAYEwIDACAQkwmMHKQWFqIZicGVj24gNsBM0nqAK/EzhYGHbf37EjCAiCgSAECLZvDweCJCBIBoJv+P0ALBXvbdvW3Nzc1NRUX1//rLcXFCVawCgxB0fJ6WM/8RaqQPu7nroq3VUuL3dxKStz9/b2Fg0IOBARAUsZp/+d4GDFa39XkYabm6uSoqKys7Oqqrq6u4iIqGiHvn7EzBgzs8SPf0/gjSU2hq6a9k1PNDRgRriAjICaETGT6fefOXiTERvD7v3d3d3tmzaBjVACGlHuolqmDvSJCMgnusfx6wcm40fP9+zfU3PlSlFRZmZmTk7OihUrVxYUFOTn55eUlPQS0g+Mw71cmiDABQFWQCAHBoIgMMWQkH7CZR7BVMbAhg+wMoyCUTAKhjEAAMlsOjpU5C44AAAAAElFTkSuQmCC"
                    },
                    cardano: {
                        code: "ADA",
                        title: "Cardano",
                        image: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcX9/f4et/4KVyYW5uXZ//0xXqf///wAA/wAAAAAAfwD//z9/wyRFwf////Ly8gM0rvf7/////AAurPz8/Pz8+wk7ugAhlQAwrQE0uAArq/n8+P///yRHqAExrff38vPz9f////z89QAsrBZHwQEzrsDO5tPb5qe53Nzm7cvX5rC/3GaEzcjP3WaDyf///3SNyv////n7+EFlvVh4wwAorD9kvzBXugAurq7A34SaxGSBxGaEzXeSznqTz3iSzUdrwHCMy3KMx5Go0rbE31R0wXiUzLPC3eXr8mSAxrjG4QArq4ig0kdqvo6iz5uy2o+k0am84Kq52TxiwCJMt4Ca1sTO2E9wvQAcpjZbtr3P7NTe70tsvVR0wlZ3yFl3xeTq7tXf59Xj9Km42y5Wu3ONy5ux3QArrIGYy32Xxp+y3Iif0HCMyld2wb7H2CdRvMfR4VV0wVJ0wytUuJis1nmTzdPa5muIzCBIsoKczIKXzFd4xpeq1QAmqo+l1DhewWyKygEzrKKz2EZouT9lw199xqG111Z2xEdrw6q524Oe2Vl2vlp8z0xuv0RovidSvSdVvGWDxUhpvzVcuU15sktrw22Hw0hrvbnI3AAnqmuIyDNYuDFXwEdmvMXS6TZbuXuTy6y+6A86rD5csytTtUFkvg87rVl0uh9Gozleuk9uv3qa4Ag1tzpjxyZMsp+y2HqRy01txX+Pr2uHyoad0UZrx3qSyTFWs3aQyUJiyDFZuTBUsVZ30IufyyBJuzNXsTNXsIyl1hM5qpem0jlguUBltzxetC5Sr156xOPp3mGAzqq85Zmo1nmFtklwy32Y1W2KymOCxwEzrgAxtwAtswE0rg9BwgM0rgM4uwAorRVEwAAmqgEvsAAyrQArrAAutQQ1uwAwtRFAuxxJxCFOwytWvyNLuxpJvgg7vjNcwx1KvQApsBZEtStXxilSuyRQvwk8xUFnwzZgyRRGxgs+vgAysgw9uwIwwSBOxj9oy0hqwAc0tBdEvDpjxgE3ww07r3ZDsYcAAADSdFJOUwACAwQCAgIBAQECAQQEAgX+Awb7ER3+A/v9+CsVBvgPFAgK+/77NSdTNE9P1x2oDJQZIqK3+vD9/VwamsSEYbPioItgL9dtSDd+PP6l0Dw+USdC/v28DYr7z10+ub77jigtNziua1fyaituiXTGE/ghl+Dchowil/FHU9gw/GnKYvZKm/TeXvLrcISDmuj97i7A2eAS9z7vTfay1fpwRv6cfe9s88b7KnjqyI7r5s9Qd7UQuZJ7ounE2+2O4Wijx4xy0UXAj6qjlC+4jpYVnZ/Ni4r3VkQAAAamSURBVFjD7Vd3VFNXGP9e8l7ue1kvGEIYAQmyQSLIqAIKLlAEBffee++9sY5qrXvvqrV779buPZMQmbKnOKii1Grb+/IeQWWFntNz+ke/k3Puu+/d+83fNwLwP/3bhBQKqs2XHMjmvijFqI3ykeOwzr2AELaMfZcgcBQIguTwlKUgmaVp4UvASC9oTQcR+D+oOYQXjhQQffvqQhasDEgmbEtdvPCleZJDN0vdNhALJujeCO4HvBuV4FZzNxy0rVpgiH1V35SitBL8t3cE+9yoBanAjxHkg8T6s8uLcqw/a/OJWMbLBxaBSI7sDF70h52UFH8PrEpLYGbcqkm2gLbmx763cso/wiumAQNZkOEIJA7KMu1pZx8SFPBBwTSX/qCQUfplVfeTNTIkhsBrh6++Y2BaNEEi5zFM0Kvfvz92IkOS0O/aGlfLEpAjmeHdstLZgkMJrRY1GcCGp44DxmPzRZB2I8KjohM2hgaHAZNaVpyAA28lCF4irFxIsdgxvMjpoq9YLEYce6ng46Uh8Tr0uA4kkzav4GkNIygpIvnj+vV9O1rfYEcKSSqFMZm3l2FPPUpieLJueKkftpJQKPijvU7P1HCr18bvR+o48ykpI+EY9DZnHmkEaVqmD9nfn5XUJ67UIfq69/30nuDut6rKu2RPVyBkvCYUSgiOmQBNFQ2d9cD8L79eCQrUyZKkVudUnoDNhR3U6vyjBgn4hp/rhjWhG3D6CDFSrmLQXnEFphsp4PjsEyqj0SczPqCqw2XjZfX9laA5aDLfWIFFU8AQzWQijtyhKtcNLs/BvjO1Ro7BT/7e6gyj0dmpP1z4S73BpTtnfAtwIhi/KPOV7PXgyWvg8s2oEqxBhrpoOiw9aTYXT+cR3jxRsHbR8gUGd4cjma7OPjm/BSmTTc7OzlcjPRm259HP4vUItVpR2umscBlT7HRn3nYWAuKKnLIjJzSJWRvJrFVPolAwfNlICAke9+3U48dTudNe3c72cZuyObiPF0i5JJCD1HqcbshN5rG6+mnlH7kVu2bwdcgq7wtLbm72aIPEumEbq9Jez0Wmz8efsIwMwfyoJB+Vh/liex6SyJ0NqXBVqbi8FAHD9niv81AaAdpXL1kEM3eNGIpg9XXTzU2gFcPsImcjdnz5VKE4A+zNVeXlqa7sdGTEcKAqq2IYuMOCF8d40ogvl0P+rO4KsNJpWuEl0OJucgczMKq9F9uawKJaHFNV0sFQzKDbncPmOZjB8zfHangjKNpvSCxLIseFxaVrQSSCqSWuqjxVh+u9hAQklavyfYwZHqbdoKWRY++ymo1YtxMv+D9aIxHoTvtyLKXsVwVJeUmWEGyjknek/2BzUpL5QSAi8QHHiePrM9CGHqlW2GKvEAp3h03zzkctMyS6cS9oCE0MG7Bu8ODkIHCXcOnGHyXljbocEtlydP6F0ISFUSdjJmLox0ZeH/RzWGqqUhCKSLJFIGpiF2zEDyvKsNb5Y8Pg7eyspDWWcPzK79dNKSBrBckS/RyLy7EUiX5EoU/GZY/MHprKCFWGyrV8IGHofdul9HMgW7xPQ9fzai6dfzyTa60HnYO8nTOMeVw6r67u4MGnc3OXKQIrOHd5lmvmWbwIDALL+XqwBJZG5URY3sSpwIjlTQvnPCyCWQ/KNusk7GiTB0av92LdvSwflU9EaS9APwwqi9HRqFnlX3+moxXcAb46jBPfdFNtbdEvobB2sKm2sKQHBwc3X15OnymN5yWKnrA3N86ToYUugGD8jnXnZhvwJu27da/15C7yrVoC0dnefRsNC2LoUjf82kgufUgSCd0Jk8btIdApSdraF67mz2nkS4bQjz6220DwFkq0CkRppVr9rPRBp1itVCoGUqvluxYJXbZuDWocTRqQTvkoTHB3rsxZUzLQdrge+47tm+wLthKDoO/kHrh6krCi2sPD6RSOHAVdJk9Oa+i9TfYFGsmECWWKt7l4MchxnkcWZv0eCCICNPtNBTt1woDRSmWWw7iKaabuuP9SMCkmeBteSEisjFhT4wZKe0Ycgk5d9EdkP5p6qGoitnt1dSc7hywscS7GlNVjFGMrazNmAC2y5zrNtwZhviTFDT6W2jnks3gkp4hGTYMSQftRdshnur78Upd6vRGkDLR5gmgXfm1Yq/MuHnVu3ZwlNASSWX+jSphZMZvQe3cvtTqtM8hr3BA3RAkjZ+f84VtYQQUCeu4Igjb9hRKhV9IfTLfFwb5BF5CWoRpKbFjAwwwVZFv/wTEPdY9/RhQJ/3X6G7QOp3zrYZyQAAAAAElFTkSuQmCC"
                    }
                }, r = ga[t.lang] || ga.en, o = ["bitcoin", "ethereum", "cardano", "solana"], s = "eur", i = de(!1),
                a = de(""), d = de([]), l = de(!0), u = de({}), $ = async () => {
                    try {
                        let p = pa.get("crypto-prices-5min");
                        const N = {};
                        if (!p) {
                            const T = {
                                ids: "bitcoin,ethereum,cardano,solana",
                                vs_currencies: "eur",
                                include_market_cap: !0,
                                include_24hr_vol: !0,
                                include_24hr_change: !0,
                                include_last_updated_at: !0
                            };
                            p = (await qn.get("https://api.coingecko.com/api/v3/simple/price", {
                                headers: {"Content-Type": "application/json"},
                                params: T
                            })).data, pa.set("crypto-prices-5min", p, {ttl: 60 * 5})
                        }
                        for (let T in p) p.hasOwnProperty(T) && (N[T] = g(p[T]));
                        u.value = N, d.value = o.map(T => (u.value[T][s].name = T, u.value[T][s]))
                    } catch (p) {
                        console.log(p)
                    }
                    l.value = !1
                }, m = p => Math.round(p * 100) / 100;

            function g(p) {
                const N = {eur: {}};
                return N.eur.price = m(p.eur), N.eur.change24 = m(p.eur_24h_change), N.eur.volume24 = m(p.eur_24h_vol), N.eur.cap = m(p.eur_market_cap), N
            }

            const y = p => {
                }, x = p => `${p >= 0 ? "+" : "-"}${p}%`,
                S = p => "\u20AC" + p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                P = p => "\u20AC" + m(p / 1e9) + "B", E = p => ++p;
            return Pr(async () => {
                await $()
            }), (p, N) => (ne(), le("table", {class: $e(["crypto-prices", `theme-${t.theme}`])}, [B("thead", null, [B("tr", null, [G0, B("th", {
                onClick: N[0] || (N[0] = T => y(p.col)),
                class: "text-left"
            }, [ot(ee(te(r).coin) + " ", 1), a.value && p.col.id === a.value ? (ne(), le("div", {
                key: 0,
                class: $e(["arrow", i.value ? "arrow_up" : "arrow_down"])
            }, null, 2)) : Ve("", !0)]), B("th", {onClick: N[1] || (N[1] = T => y(p.col))}, [ot(ee(te(r).price) + " ", 1), a.value && p.col.id === a.value ? (ne(), le("div", {
                key: 0,
                class: $e(["arrow", i.value ? "arrow_up" : "arrow_down"])
            }, null, 2)) : Ve("", !0)]), B("th", {onClick: N[2] || (N[2] = T => y(p.col))}, [ot(ee(te(r).change24) + " ", 1), a.value && p.col.id === a.value ? (ne(), le("div", {
                key: 0,
                class: $e(["arrow", i.value ? "arrow_up" : "arrow_down"])
            }, null, 2)) : Ve("", !0)]), B("th", {onClick: N[3] || (N[3] = T => y(p.col))}, [ot(ee(te(r).cap) + " ", 1), a.value && p.col.id === a.value ? (ne(), le("div", {
                key: 0,
                class: $e(["arrow", i.value ? "arrow_up" : "arrow_down"])
            }, null, 2)) : Ve("", !0)]), B("th", {onClick: N[4] || (N[4] = T => y(p.col))}, [ot(ee(te(r).volume24) + " ", 1), a.value && p.col.id === a.value ? (ne(), le("div", {
                key: 0,
                class: $e(["arrow", i.value ? "arrow_up" : "arrow_down"])
            }, null, 2)) : Ve("", !0)])])]), B("tbody", null, [(ne(!0), le(Pe, null, ps(d.value, (T, L) => (ne(), le("tr", {key: L}, [B("td", H0, [B("span", {class: $e(["arrow", T.change24 >= 0 ? "green" : "red"])}, null, 2), ot(" " + ee(E(L)), 1)]), B("td", null, [B("div", K0, [B("div", V0, [B("img", {
                src: `data:image/png;base64,${n[T.name].image}`,
                alt: "coin image"
            }, null, 8, W0)]), B("div", Z0, [B("span", null, ee(n[T.name].code), 1), B("span", null, ee(n[T.name].title), 1)])])]), B("td", null, ee(S(T.price)), 1), B("td", null, [B("span", {class: $e(["change24", T.change24 >= 0 ? "green" : "red"])}, ee(x(T.change24)), 3)]), B("td", null, ee(P(T.cap)), 1), B("td", null, ee(P(T.volume24)), 1)]))), 128))])], 2))
        }
    }), [["styles", [z0]], ["__scopeId", "data-v-621c106a"]]);
    const J0 = Ys(U0), Y0 = Ys(q0);
    customElements.define("signup-form", J0), customElements.define("crypto-price", Y0)
});
