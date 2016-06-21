/*
jquery.animate-enhanced plugin v1.02
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
function isIE() {
    var e = -1;
    if (navigator.appName == "Microsoft Internet Explorer") {
        var t = navigator.userAgent,
            n = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        n.exec(t) != null && (e = parseFloat(RegExp.$1))
    } else if (navigator.appName == "Netscape") {
        var t = navigator.userAgent,
            n = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
        n.exec(t) != null && (e = parseFloat(RegExp.$1))
    }
    return e == -1 ? !1 : !0
}(function(e, t, n) {
    function r(e, t, n, r, i, s, o, u, a) {
        var f = !1;
        o = !0 === o && !0 === u, t = t || {}, t.original || (t.original = {}, f = !0), t.properties = t.properties || {}, t.secondary = t.secondary || {}, u = t.meta;
        for (var c = t.original, h = t.properties, p = t.secondary, d = l.length - 1; 0 <= d; d--) {
            var v = l[d] + "transition-property",
                m = l[d] + "transition-duration",
                g = l[d] + "transition-timing-function";
            n = o ? l[d] + "transform" : n, f && (c[v] = e.css(v) || "", c[m] = e.css(m) || "", c[g] = e.css(g) || ""), p[n] = o ? !0 === a || !0 === w && !1 !== a && b ? "translate3d(" + u.left + "px, " + u.top + "px, 0)" : "translate(" + u.left + "px," + u.top + "px)" : s, h[v] = (h[v] ? h[v] + "," : "") + n, h[m] = (h[m] ? h[m] + "," : "") + r + "ms", h[g] = (h[g] ? h[g] + "," : "") + i
        }
        return t
    }

    function i(e) {
        for (var t in e) return !1;
        return !0
    }

    function s(e) {
        e = e.toUpperCase();
        var t = { LI: "list-item", TR: "table-row", TD: "table-cell", TH: "table-cell", CAPTION: "table-caption", COL: "table-column", COLGROUP: "table-column-group", TFOOT: "table-footer-group", THEAD: "table-header-group", TBODY: "table-row-group" };
        return "string" == typeof t[e] ? t[e] : "block"
    }

    function o(e) {
        return parseFloat(e.replace(e.match(/\D+$/), ""))
    }

    function u(e) {
        var t = !0;
        return e.each(function(e, n) {
            return t = t && n.ownerDocument
        }), t
    }
    var a = "top right bottom left opacity height width".split(" "),
        f = ["top", "right", "bottom", "left"],
        l = ["-webkit-", "-moz-", "-o-", ""],
        c = ["avoidTransforms", "useTranslate3d", "leaveTransforms"],
        h = /^([+-]=)?([\d+-.]+)(.*)$/,
        p = /([A-Z])/g,
        d = { secondary: {}, meta: { top: 0, right: 0, bottom: 0, left: 0 } },
        v = null,
        m = !1,
        g = (document.body || document.documentElement).style,
        y = void 0 !== g.WebkitTransition || void 0 !== g.MozTransition || void 0 !== g.OTransition || void 0 !== g.transition,
        b = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix,
        w = b;
    e.expr && e.expr.filters && (v = e.expr.filters.animated, e.expr.filters.animated = function(t) {
        return e(t).data("events") && e(t).data("events")["webkitTransitionEnd oTransitionEnd transitionend"] ? !0 : v.call(this, t)
    }), e.extend({
        toggle3DByDefault: function() {
            return w = !w
        },
        toggleDisabledByDefault: function() {
            return m = !m
        },
        setDisabledByDefault: function(e) {
            return m = e
        }
    }), e.fn.translation = function() {
        if (!this[0]) return null;
        var e = window.getComputedStyle(this[0], null),
            t = { x: 0, y: 0 };
        if (e)
            for (var n = l.length - 1; 0 <= n; n--) {
                var r = e.getPropertyValue(l[n] + "transform");
                if (r && /matrix/i.test(r)) {
                    e = r.replace(/^matrix\(/i, "").split(/, |\)$/g), t = { x: parseInt(e[4], 10), y: parseInt(e[5], 10) };
                    break
                }
            }
        return t
    }, e.fn.animate = function(n, p, v, g) {
        n = n || {};
        var b = "undefined" == typeof n.bottom && "undefined" == typeof n.right,
            w = e.speed(p, v, g),
            E = this,
            x = 0,
            N = function() { x--, 0 === x && "function" == typeof w.complete && w.complete.apply(E, arguments) },
            k;
        if (!(k = !0 === ("undefined" != typeof n.avoidCSSTransitions ? n.avoidCSSTransitions : m)) && !(k = !y) && !(k = i(n))) {
            var L;
            e: {
                for (L in n)
                    if (("width" == L || "height" == L) && ("show" == n[L] || "hide" == n[L] || "toggle" == n[L])) {
                        L = !0;
                        break e
                    }
                L = !1
            }
            k = L || 0 >= w.duration
        }
        return k ? t.apply(this, arguments) : this[!0 === w.queue ? "queue" : "each"](function() {
            var p = e(this),
                v = e.extend({}, w),
                m = function(t) {
                    var r = p.data("jQe") || { original: {} },
                        i = {};
                    if (2 == t.eventPhase) {
                        if (!0 !== n.leaveTransforms) {
                            for (t = l.length - 1; 0 <= t; t--) i[l[t] + "transform"] = "";
                            if (b && "undefined" != typeof r.meta) {
                                t = 0;
                                for (var s; s = f[t]; ++t) i[s] = r.meta[s + "_o"] + "px", e(this).css(s, i[s])
                            }
                        }
                        p.unbind("webkitTransitionEnd oTransitionEnd transitionend").css(r.original).css(i).data("jQe", null), "hide" === n.opacity && p.css({ display: "none", opacity: "" }), N.call(this)
                    }
                },
                g = { bounce: "cubic-bezier(0.0, 0.35, .5, 1.3)", linear: "linear", swing: "ease-in-out", easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)", easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)", easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)", easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)", easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)", easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)", easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)", easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)", easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)", easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)", easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)", easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)", easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)", easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)", easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)", easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)", easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)", easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)", easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)", easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)", easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)", easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)", easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)" },
                y = {},
                g = g[v.easing || "swing"] ? g[v.easing || "swing"] : v.easing || "swing",
                E;
            for (E in n)
                if (-1 === e.inArray(E, c)) {
                    var C = -1 < e.inArray(E, f),
                        k, L = p,
                        A = n[E],
                        O = E,
                        _ = C && !0 !== n.avoidTransforms;
                    if ("d" == O) k = void 0;
                    else if (u(L)) {
                        var D = h.exec(A);
                        k = "auto" === L.css(O) ? 0 : L.css(O), k = "string" == typeof k ? o(k) : k, "string" == typeof A && o(A);
                        var _ = !0 === _ ? 0 : k,
                            F = L.is(":hidden"),
                            z = L.translation();
                        "left" == O && (_ = parseInt(k, 10) + z.x), "right" == O && (_ = parseInt(k, 10) + z.x), "top" == O && (_ = parseInt(k, 10) + z.y), "bottom" == O && (_ = parseInt(k, 10) + z.y), !D && "show" == A ? (_ = 1, F && L.css({ display: s(L.context.tagName), opacity: 0 })) : !D && "hide" == A && (_ = 0), D ? (L = parseFloat(D[2]), D[1] && (L = ("-=" === D[1] ? -1 : 1) * L + parseInt(_, 10)), k = L) : k = _
                    } else k = void 0;
                    D = E, L = k, A = p, u(A) ? (O = -1 < e.inArray(D, a), ("width" == D || "height" == D || "opacity" == D) && parseFloat(L) === parseFloat(A.css(D)) && (O = !1), D = O) : D = !1;
                    if (D) {
                        var D = p,
                            L = E,
                            A = v.duration,
                            O = g,
                            C = C && !0 !== n.avoidTransforms,
                            _ = b,
                            F = n.useTranslate3d,
                            z = (z = D.data("jQe")) && !i(z) ? z : e.extend(!0, {}, d),
                            X = k;
                        if (-1 < e.inArray(L, f)) {
                            var V = z.meta,
                                $ = o(D.css(L)) || 0,
                                K = L + "_o",
                                X = k - $;
                            V[L] = X, V[K] = "auto" == D.css(L) ? 0 + X : $ + X || 0, z.meta = V, _ && 0 === X && (X = 0 - V[K], V[L] = X, V[K] = 0)
                        }
                        D.data("jQe", r(D, z, L, A, O, X, C, _, F))
                    } else y[E] = n[E]
                }
            p.unbind("webkitTransitionEnd oTransitionEnd transitionend");
            if ((E = p.data("jQe")) && !i(E) && !i(E.secondary)) {
                x++, p.css(E.properties);
                var Q = E.secondary;
                setTimeout(function() { p.bind("webkitTransitionEnd oTransitionEnd transitionend", m).css(Q) })
            } else v.queue = !1;
            return i(y) || (x++, t.apply(p, [y, { duration: v.duration, easing: e.easing[v.easing] ? v.easing : e.easing.swing ? "swing" : "linear", complete: N, queue: v.queue }])), !0
        })
    }, e.fn.animate.defaults = {}, e.fn.stop = function(t, r, s) {
        return y ? (t && this.queue([]), this.each(function() {
            var o = e(this),
                u = o.data("jQe");
            if (u && !i(u)) {
                var a, f = {};
                if (r) {
                    if (f = u.secondary, !s && void 0 !== typeof u.meta.left_o || void 0 !== typeof u.meta.top_o) {
                        f.left = void 0 !== typeof u.meta.left_o ? u.meta.left_o : "auto", f.top = void 0 !== typeof u.meta.top_o ? u.meta.top_o : "auto";
                        for (a = l.length - 1; 0 <= a; a--) f[l[a] + "transform"] = ""
                    }
                } else if (!i(u.secondary)) {
                    var c = window.getComputedStyle(o[0], null);
                    if (c)
                        for (var h in u.secondary)
                            if (u.secondary.hasOwnProperty(h) && (h = h.replace(p, "-$1").toLowerCase(), f[h] = c.getPropertyValue(h), !s && /matrix/i.test(f[h]))) {
                                a = f[h].replace(/^matrix\(/i, "").split(/, |\)$/g), f.left = parseFloat(a[4]) + parseFloat(o.css("left")) + "px" || "auto", f.top = parseFloat(a[5]) + parseFloat(o.css("top")) + "px" || "auto";
                                for (a = l.length - 1; 0 <= a; a--) f[l[a] + "transform"] = ""
                            }
                }
                o.unbind("webkitTransitionEnd oTransitionEnd transitionend"), o.css(u.original).css(f).data("jQe", null)
            } else n.apply(o, [t, r])
        }), this) : n.apply(this, [t, r])
    }
})(jQuery, jQuery.fn.animate, jQuery.fn.stop), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, t, n, r, i) {
            return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
        },
        easeInQuad: function(e, t, n, r, i) {
            return r * (t /= i) * t + n
        },
        easeOutQuad: function(e, t, n, r, i) {
            return -r * (t /= i) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, r, i) {
            return r * (t /= i) * t * t + n
        },
        easeOutCubic: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, r, i) {
            return -r * ((t = t / i - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, r, i) {
            return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
        },
        easeOutSine: function(e, t, n, r, i) {
            return r * Math.sin(t / i * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, r, i) {
            return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
        },
        easeInExpo: function(e, t, n, r, i) {
            return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
        },
        easeOutExpo: function(e, t, n, r, i) {
            return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
        },
        easeInOutExpo: function(e, t, n, r, i) {
            return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, r, i) {
            return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, r, i) {
            return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            o || (o = i * .3);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
        },
        easeOutElastic: function(e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            o || (o = i * .3);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
        },
        easeInOutElastic: function(e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i / 2) == 2) return n + r;
            o || (o = i * .3 * 1.5);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
        },
        easeInBack: function(e, t, n, r, i, s) {
            return s == undefined && (s = 1.70158), r * (t /= i) * t * ((s + 1) * t - s) + n
        },
        easeOutBack: function(e, t, n, r, i, s) {
            return s == undefined && (s = 1.70158), r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
        },
        easeInOutBack: function(e, t, n, r, i, s) {
            return s == undefined && (s = 1.70158), (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
        },
        easeInBounce: function(e, t, n, r, i) {
            return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
        },
        easeOutBounce: function(e, t, n, r, i) {
            return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function(e, t, n, r, i) {
            return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n : jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
        }
    }),
    function(e) { typeof define == "function" && define.amd ? define(["jquery"], e) : typeof exports == "object" ? e(require("jquery")) : e(window.jQuery || window.Zepto) }(function(e) {
        var t = "Close",
            n = "BeforeClose",
            r = "AfterClose",
            i = "BeforeAppend",
            s = "MarkupParse",
            o = "Open",
            u = "Change",
            a = "mfp",
            f = "." + a,
            l = "mfp-ready",
            c = "mfp-removing",
            h = "mfp-prevent-close",
            p, d = function() {},
            v = !!window.jQuery,
            m, g = e(window),
            y, b, w, E, S = function(e, t) { p.ev.on(a + e + f, t) },
            x = function(t, n, r, i) {
                var s = document.createElement("div");
                return s.className = "mfp-" + t, r && (s.innerHTML = r), i ? n && n.appendChild(s) : (s = e(s), n && s.appendTo(n)), s
            },
            T = function(t, n) { p.ev.triggerHandler(a + t, n), p.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), p.st.callbacks[t] && p.st.callbacks[t].apply(p, e.isArray(n) ? n : [n])) },
            N = function(t) {
                if (t !== E || !p.currTemplate.closeBtn) p.currTemplate.closeBtn = e(p.st.closeMarkup.replace("%title%", p.st.tClose)), E = t;
                return p.currTemplate.closeBtn
            },
            C = function() { e.magnificPopup.instance || (p = new d, p.init(), e.magnificPopup.instance = p) },
            k = function() {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (e.transition !== undefined) return !0;
                while (t.length)
                    if (t.pop() + "Transition" in e) return !0;
                return !1
            };
        d.prototype = {
            constructor: d,
            init: function() {
                var t = navigator.appVersion;
                p.isIE7 = t.indexOf("MSIE 7.") !== -1, p.isIE8 = t.indexOf("MSIE 8.") !== -1, p.isLowIE = p.isIE7 || p.isIE8, p.isAndroid = /android/gi.test(t), p.isIOS = /iphone|ipad|ipod/gi.test(t), p.supportsTransition = k(), p.probablyMobile = p.isAndroid || p.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), y = e(document), p.popupsCache = {}
            },
            open: function(t) {
                var n;
                if (t.isObj === !1) {
                    p.items = t.items.toArray(), p.index = 0;
                    var r = t.items,
                        i;
                    for (n = 0; n < r.length; n++) {
                        i = r[n], i.parsed && (i = i.el[0]);
                        if (i === t.el[0]) {
                            p.index = n;
                            break
                        }
                    }
                } else p.items = e.isArray(t.items) ? t.items : [t.items], p.index = t.index || 0;
                if (p.isOpen) {
                    p.updateItemHTML();
                    return
                }
                p.types = [], w = "", t.mainEl && t.mainEl.length ? p.ev = t.mainEl.eq(0) : p.ev = y, t.key ? (p.popupsCache[t.key] || (p.popupsCache[t.key] = {}), p.currTemplate = p.popupsCache[t.key]) : p.currTemplate = {}, p.st = e.extend(!0, {}, e.magnificPopup.defaults, t), p.fixedContentPos = p.st.fixedContentPos === "auto" ? !p.probablyMobile : p.st.fixedContentPos, p.st.modal && (p.st.closeOnContentClick = !1, p.st.closeOnBgClick = !1, p.st.showCloseBtn = !1, p.st.enableEscapeKey = !1), p.bgOverlay || (p.bgOverlay = x("bg").on("click" + f, function() { p.close() }), p.wrap = x("wrap").attr("tabindex", -1).on("click" + f, function(e) { p._checkIfClose(e.target) && p.close() }), p.container = x("container", p.wrap)), p.contentContainer = x("content"), p.st.preloader && (p.preloader = x("preloader", p.container, p.st.tLoading));
                var u = e.magnificPopup.modules;
                for (n = 0; n < u.length; n++) {
                    var a = u[n];
                    a = a.charAt(0).toUpperCase() + a.slice(1), p["init" + a].call(p)
                }
                T("BeforeOpen"), p.st.showCloseBtn && (p.st.closeBtnInside ? (S(s, function(e, t, n, r) { n.close_replaceWith = N(r.type) }), w += " mfp-close-btn-in") : p.wrap.append(N())), p.st.alignTop && (w += " mfp-align-top"), p.fixedContentPos ? p.wrap.css({ overflow: p.st.overflowY, overflowX: "hidden", overflowY: p.st.overflowY }) : p.wrap.css({ top: g.scrollTop(), position: "absolute" }), (p.st.fixedBgPos === !1 || p.st.fixedBgPos === "auto" && !p.fixedContentPos) && p.bgOverlay.css({ height: y.height(), position: "absolute" }), p.st.enableEscapeKey && y.on("keyup" + f, function(e) { e.keyCode === 27 && p.close() }), g.on("resize" + f, function() { p.updateSize() }), p.st.closeOnContentClick || (w += " mfp-auto-cursor"), w && p.wrap.addClass(w);
                var c = p.wH = g.height(),
                    h = {};
                if (p.fixedContentPos && p._hasScrollBar(c)) {
                    var d = p._getScrollbarSize();
                    d && (h.marginRight = d)
                }
                p.fixedContentPos && (p.isIE7 ? e("body, html").css("overflow", "hidden") : h.overflow = "hidden");
                var v = p.st.mainClass;
                return p.isIE7 && (v += " mfp-ie7"), v && p._addClassToMFP(v), p.updateItemHTML(), T("BuildControls"), e("html").css(h), p.bgOverlay.add(p.wrap).prependTo(p.st.prependTo || e(document.body)), p._lastFocusedEl = document.activeElement, setTimeout(function() { p.content ? (p._addClassToMFP(l), p._setFocus()) : p.bgOverlay.addClass(l), y.on("focusin" + f, p._onFocusIn) }, 16), p.isOpen = !0, p.updateSize(c), T(o), t
            },
            close: function() {
                if (!p.isOpen) return;
                T(n), p.isOpen = !1, p.st.removalDelay && !p.isLowIE && p.supportsTransition ? (p._addClassToMFP(c), setTimeout(function() { p._close() }, p.st.removalDelay)) : p._close()
            },
            _close: function() {
                T(t);
                var n = c + " " + l + " ";
                p.bgOverlay.detach(), p.wrap.detach(), p.container.empty(), p.st.mainClass && (n += p.st.mainClass + " "), p._removeClassFromMFP(n);
                if (p.fixedContentPos) {
                    var i = { marginRight: "" };
                    p.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
                }
                y.off("keyup" + f + " focusin" + f), p.ev.off(f), p.wrap.attr("class", "mfp-wrap").removeAttr("style"), p.bgOverlay.attr("class", "mfp-bg"), p.container.attr("class", "mfp-container"), p.st.showCloseBtn && (!p.st.closeBtnInside || p.currTemplate[p.currItem.type] === !0) && p.currTemplate.closeBtn && p.currTemplate.closeBtn.detach(), p._lastFocusedEl && e(p._lastFocusedEl).focus(), p.currItem = null, p.content = null, p.currTemplate = null, p.prevHeight = 0, T(r)
            },
            updateSize: function(e) {
                if (p.isIOS) {
                    var t = document.documentElement.clientWidth / window.innerWidth,
                        n = window.innerHeight * t;
                    p.wrap.css("height", n), p.wH = n
                } else p.wH = e || g.height();
                p.fixedContentPos || p.wrap.css("height", p.wH), T("Resize")
            },
            updateItemHTML: function() {
                var t = p.items[p.index];
                p.contentContainer.detach(), p.content && p.content.detach(), t.parsed || (t = p.parseEl(p.index));
                var n = t.type;
                T("BeforeChange", [p.currItem ? p.currItem.type : "", n]), p.currItem = t;
                if (!p.currTemplate[n]) {
                    var r = p.st[n] ? p.st[n].markup : !1;
                    T("FirstMarkupParse", r), r ? p.currTemplate[n] = e(r) : p.currTemplate[n] = !0
                }
                b && b !== t.type && p.container.removeClass("mfp-" + b + "-holder");
                var i = p["get" + n.charAt(0).toUpperCase() + n.slice(1)](t, p.currTemplate[n]);
                p.appendContent(i, n), t.preloaded = !0, T(u, t), b = t.type, p.container.prepend(p.contentContainer), T("AfterChange")
            },
            appendContent: function(e, t) { p.content = e, e ? p.st.showCloseBtn && p.st.closeBtnInside && p.currTemplate[t] === !0 ? p.content.find(".mfp-close").length || p.content.append(N()) : p.content = e : p.content = "", T(i), p.container.addClass("mfp-" + t + "-holder"), p.contentContainer.append(p.content) },
            parseEl: function(t) {
                var n = p.items[t],
                    r;
                n.tagName ? n = { el: e(n) } : (r = n.type, n = { data: n, src: n.src });
                if (n.el) {
                    var i = p.types;
                    for (var s = 0; s < i.length; s++)
                        if (n.el.hasClass("mfp-" + i[s])) {
                            r = i[s];
                            break
                        }
                    n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
                }
                return n.type = r || p.st.type || "inline", n.index = t, n.parsed = !0, p.items[t] = n, T("ElementParse", n), p.items[t]
            },
            addGroup: function(e, t) {
                var n = function(n) { n.mfpEl = this, p._openClick(n, e, t) };
                t || (t = {});
                var r = "click.magnificPopup";
                t.mainEl = e, t.items ? (t.isObj = !0, e.off(r).on(r, n)) : (t.isObj = !1, t.delegate ? e.off(r).on(r, t.delegate, n) : (t.items = e, e.off(r).on(r, n)))
            },
            _openClick: function(t, n, r) {
                var i = r.midClick !== undefined ? r.midClick : e.magnificPopup.defaults.midClick;
                if (!i && (t.which === 2 || t.ctrlKey || t.metaKey)) return;
                var s = r.disableOn !== undefined ? r.disableOn : e.magnificPopup.defaults.disableOn;
                if (s)
                    if (e.isFunction(s)) {
                        if (!s.call(p)) return !0
                    } else if (g.width() < s) return !0;
                t.type && (t.preventDefault(), p.isOpen && t.stopPropagation()), r.el = e(t.mfpEl), r.delegate && (r.items = n.find(r.delegate)), p.open(r)
            },
            updateStatus: function(e, t) {
                if (p.preloader) {
                    m !== e && p.container.removeClass("mfp-s-" + m), !t && e === "loading" && (t = p.st.tLoading);
                    var n = { status: e, text: t };
                    T("UpdateStatus", n), e = n.status, t = n.text, p.preloader.html(t), p.preloader.find("a").on("click", function(e) { e.stopImmediatePropagation() }), p.container.addClass("mfp-s-" + e), m = e
                }
            },
            _checkIfClose: function(t) {
                if (e(t).hasClass(h)) return;
                var n = p.st.closeOnContentClick,
                    r = p.st.closeOnBgClick;
                if (n && r) return !0;
                if (!p.content || e(t).hasClass("mfp-close") || p.preloader && t === p.preloader[0]) return !0;
                if (t !== p.content[0] && !e.contains(p.content[0], t)) {
                    if (e(t).closest(".mfp-arrow").hasClass("mfp-prevent-close")) return;
                    if (r && e.contains(document, t)) return !0
                } else if (n) return !0;
                return !1
            },
            _addClassToMFP: function(e) { p.bgOverlay.addClass(e), p.wrap.addClass(e) },
            _removeClassFromMFP: function(e) { this.bgOverlay.removeClass(e), p.wrap.removeClass(e) },
            _hasScrollBar: function(e) {
                return (p.isIE7 ? y.height() : document.body.scrollHeight) > (e || g.height())
            },
            _setFocus: function() {
                (p.st.focus ? p.content.find(p.st.focus).eq(0) : p.wrap).focus()
            },
            _onFocusIn: function(t) {
                if (t.target !== p.wrap[0] && !e.contains(p.wrap[0], t.target)) return p._setFocus(), !1
            },
            _parseMarkup: function(t, n, r) {
                var i;
                r.data && (n = e.extend(r.data, n)), T(s, [t, n, r]), e.each(n, function(e, n) {
                    if (n === undefined || n === !1) return !0;
                    i = e.split("_");
                    if (i.length > 1) {
                        var r = t.find(f + "-" + i[0]);
                        if (r.length > 0) {
                            var s = i[1];
                            s === "replaceWith" ? r[0] !== n[0] && r.replaceWith(n) : s === "img" ? r.is("img") ? r.attr("src", n) : r.replaceWith('<img src="' + n + '" class="' + r.attr("class") + '" />') : r.attr(i[1], n)
                        }
                    } else t.find(f + "-" + e).html(n)
                })
            },
            _getScrollbarSize: function() {
                if (p.scrollbarSize === undefined) {
                    var e = document.createElement("div");
                    e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), p.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
                }
                return p.scrollbarSize
            }
        }, e.magnificPopup = {
            instance: null,
            proto: d.prototype,
            modules: [],
            open: function(t, n) {
                return C(), t ? t = e.extend(!0, {}, t) : t = {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
            },
            close: function() {
                return e.magnificPopup.instance && e.magnificPopup.instance.close()
            },
            registerModule: function(t, n) { n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t) },
            defaults: { disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, prependTo: null, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close"><svg xmlns="http://www.w3.org/2000/svg" width="425.25" height="425.25" viewBox="646.375 172.375 425.25 425.25" enable-background="new 646.375 172.375 425.25 425.25"><path d="M892.075 385l172.462-172.462c9.45-9.45 9.45-23.625 0-33.075-9.449-9.45-23.625-9.45-33.074 0l-172.463 172.462-172.463-172.463c-9.449-9.45-23.625-9.45-33.074 0-9.45 9.45-9.45 23.625 0 33.075l172.462 172.463-172.462 172.463c-9.45 9.449-9.45 23.625 0 33.074 4.725 4.726 9.449 7.088 16.537 7.088s11.812-2.362 16.537-7.088l172.463-172.462 172.463 172.462c4.725 4.726 11.812 7.088 16.537 7.088s11.812-2.362 16.537-7.088c9.45-9.449 9.45-23.625 0-33.074l-172.462-172.463z"/></svg></button>', tClose: "Close (Esc)", tLoading: "Loading..." }
        }, e.fn.magnificPopup = function(t) {
            C();
            var n = e(this);
            if (typeof t == "string")
                if (t === "open") {
                    var r, i = v ? n.data("magnificPopup") : n[0].magnificPopup,
                        s = parseInt(arguments[1], 10) || 0;
                    i.items ? r = i.items[s] : (r = n, i.delegate && (r = r.find(i.delegate)), r = r.eq(s)), p._openClick({ mfpEl: r }, n, i)
                } else p.isOpen && p[t].apply(p, Array.prototype.slice.call(arguments, 1));
            else t = e.extend(!0, {}, t), v ? n.data("magnificPopup", t) : n[0].magnificPopup = t, p.addGroup(n, t);
            return n
        };
        var L = "inline",
            A, O, M, _ = function() { M && (O.after(M.addClass(A)).detach(), M = null) };
        e.magnificPopup.registerModule(L, {
            options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
            proto: {
                initInline: function() { p.types.push(L), S(t + "." + L, function() { _() }) },
                getInline: function(t, n) {
                    _();
                    if (t.src) {
                        var r = p.st.inline,
                            i = e(t.src);
                        if (i.length) {
                            var s = i[0].parentNode;
                            s && s.tagName && (O || (A = r.hiddenClass, O = x(A), A = "mfp-" + A), M = i.after(O).detach().removeClass(A)), p.updateStatus("ready")
                        } else p.updateStatus("error", r.tNotFound), i = e("<div>");
                        return t.inlineElement = i, i
                    }
                    return p.updateStatus("ready"), p._parseMarkup(n, {}, t), n
                }
            }
        });
        var D = "ajax",
            P, H = function() { P && e(document.body).removeClass(P) },
            B = function() { H(), p.req && p.req.abort() };
        e.magnificPopup.registerModule(D, {
            options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
            proto: {
                initAjax: function() { p.types.push(D), P = p.st.ajax.cursor, S(t + "." + D, B), S("BeforeChange." + D, B) },
                getAjax: function(t) {
                    P && e(document.body).addClass(P), p.updateStatus("loading");
                    var n = e.extend({
                        url: t.src,
                        success: function(n, r, i) {
                            var s = { data: n, xhr: i };
                            T("ParseAjax", s), p.appendContent(e(s.data), D), t.finished = !0, H(), p._setFocus(), setTimeout(function() { p.wrap.addClass(l) }, 16), p.updateStatus("ready"), T("AjaxContentAdded")
                        },
                        error: function() { H(), t.finished = t.loadError = !0, p.updateStatus("error", p.st.ajax.tError.replace("%url%", t.src)) }
                    }, p.st.ajax.settings);
                    return p.req = e.ajax(n), ""
                }
            }
        });
        var j, F = function(t) {
            if (t.data && t.data.title !== undefined) return t.data.title;
            var n = p.st.image.titleSrc;
            if (n) {
                if (e.isFunction(n)) return n.call(p, t);
                if (t.el) return t.el.attr(n) || ""
            }
            return ""
        };
        e.magnificPopup.registerModule("image", {
            options: { markup: '<div class="mfp-figure"><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div><div class="mfp-close"></div><figure><div class="mfp-img"></div></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' },
            proto: {
                initImage: function() {
                    var n = p.st.image,
                        r = ".image";
                    p.types.push("image"), S(o + r, function() { p.currItem.type === "image" && n.cursor && e(document.body).addClass(n.cursor) }), S(t + r, function() { n.cursor && e(document.body).removeClass(n.cursor), g.off("resize" + f) }), S("Resize" + r, p.resizeImage), p.isLowIE && S("AfterChange", p.resizeImage)
                },
                resizeImage: function() {
                    var e = p.currItem;
                    if (!e || !e.img) return;
                    if (p.st.image.verticalFit) {
                        var t = 0;
                        p.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", p.wH - t)
                    }
                },
                _onImageHasSize: function(e) { e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (p.content && p.content.removeClass("mfp-loading"), e.imgHidden = !1)) },
                findImageSize: function(e) {
                    var t = 0,
                        n = e.img[0],
                        r = function(i) {
                            j && clearInterval(j), j = setInterval(function() {
                                if (n.naturalWidth > 0) {
                                    p._onImageHasSize(e);
                                    return
                                }
                                t > 200 && clearInterval(j), t++, t === 3 ? r(10) : t === 40 ? r(50) : t === 100 && r(500)
                            }, i)
                        };
                    r(1)
                },
                getImage: function(t, n) {
                    var r = 0,
                        i = function() { t && (t.img[0].complete ? (t.img.off(".mfploader"), t === p.currItem && (p._onImageHasSize(t), p.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, T("ImageLoadComplete")) : (r++, r < 200 ? setTimeout(i, 100) : s())) },
                        s = function() { t && (t.img.off(".mfploader"), t === p.currItem && (p._onImageHasSize(t), p.updateStatus("error", o.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0) },
                        o = p.st.image,
                        u = n.find(".mfp-img");
                    if (u.length) {
                        var a = document.createElement("img");
                        a.className = "mfp-img", t.el && t.el.find("img").length && (a.alt = t.el.find("img").attr("alt")), t.img = e(a).on("load.mfploader", i).on("error.mfploader", s), a.src = t.src, u.is("img") && (t.img = t.img.clone()), a = t.img[0], a.naturalWidth > 0 ? t.hasSize = !0 : a.width || (t.hasSize = !1)
                    }
                    return p._parseMarkup(n, { title: F(t), img_replaceWith: t.img }, t), p.resizeImage(), t.hasSize ? (j && clearInterval(j), t.loadError ? (n.addClass("mfp-loading"), p.updateStatus("error", o.tError.replace("%url%", t.src))) : (n.removeClass("mfp-loading"), p.updateStatus("ready")), n) : (p.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, n.addClass("mfp-loading"), p.findImageSize(t)), n)
                }
            }
        });
        var I, q = function() {
            return I === undefined && (I = document.createElement("p").style.MozTransform !== undefined), I
        };
        e.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(e) {
                    return e.is("img") ? e : e.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var e = p.st.zoom,
                        r = ".zoom",
                        i;
                    if (!e.enabled || !p.supportsTransition) return;
                    var s = e.duration,
                        o = function(t) {
                            var n = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                r = "all " + e.duration / 1e3 + "s " + e.easing,
                                i = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                s = "transition";
                            return i["-webkit-" + s] = i["-moz-" + s] = i["-o-" + s] = i[s] = r, n.css(i), n
                        },
                        u = function() { p.content.css("visibility", "visible") },
                        a, f;
                    S("BuildControls" + r, function() {
                        if (p._allowZoom()) {
                            clearTimeout(a), p.content.css("visibility", "hidden"), i = p._getItemToZoom();
                            if (!i) {
                                u();
                                return
                            }
                            f = o(i), f.css(p._getOffset()), p.wrap.append(f), a = setTimeout(function() { f.css(p._getOffset(!0)), a = setTimeout(function() { u(), setTimeout(function() { f.remove(), i = f = null, T("ZoomAnimationEnded") }, 16) }, s) }, 16)
                        }
                    }), S(n + r, function() {
                        if (p._allowZoom()) {
                            clearTimeout(a), p.st.removalDelay = s;
                            if (!i) {
                                i = p._getItemToZoom();
                                if (!i) return;
                                f = o(i)
                            }
                            f.css(p._getOffset(!0)), p.wrap.append(f), p.content.css("visibility", "hidden"), setTimeout(function() { f.css(p._getOffset()) }, 16)
                        }
                    }), S(t + r, function() { p._allowZoom() && (u(), f && f.remove(), i = null) })
                },
                _allowZoom: function() {
                    return p.currItem.type === "image"
                },
                _getItemToZoom: function() {
                    return p.currItem.hasSize ? p.currItem.img : !1
                },
                _getOffset: function(t) {
                    var n;
                    t ? n = p.currItem.img : n = p.st.zoom.opener(p.currItem.el || p.currItem);
                    var r = n.offset(),
                        i = parseInt(n.css("padding-top"), 10),
                        s = parseInt(n.css("padding-bottom"), 10);
                    r.top -= e(window).scrollTop() - i;
                    var o = { width: n.width(), height: (v ? n.innerHeight() : n[0].offsetHeight) - s - i };
                    return q() ? o["-moz-transform"] = o.transform = "translate(" + r.left + "px," + r.top + "px)" : (o.left = r.left, o.top = r.top), o
                }
            }
        });
        var R = "iframe",
            U = "//about:blank",
            z = function(e) {
                if (p.currTemplate[R]) {
                    var t = p.currTemplate[R].find("iframe");
                    t.length && (e || (t[0].src = U), p.isIE8 && t.css("display", e ? "block" : "none"))
                }
            };
        e.magnificPopup.registerModule(R, {
            options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction: "iframe_src", patterns: { youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index: "//maps.google.", src: "%id%&output=embed" } } },
            proto: {
                initIframe: function() { p.types.push(R), S("BeforeChange", function(e, t, n) { t !== n && (t === R ? z() : n === R && z(!0)) }), S(t + "." + R, function() { z() }) },
                getIframe: function(t, n) {
                    var r = t.src,
                        i = p.st.iframe;
                    e.each(i.patterns, function() {
                        if (r.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? r = r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : r = this.id.call(this, r)), r = this.src.replace("%id%", r), !1
                    });
                    var s = {};
                    return i.srcAction && (s[i.srcAction] = r), p._parseMarkup(n, s, t), p.updateStatus("ready"), n
                }
            }
        });
        var W = function(e) {
                var t = p.items.length;
                return e > t - 1 ? e - t : e < 0 ? t + e : e
            },
            X = function(e, t, n) {
                return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
            };
        e.magnificPopup.registerModule("gallery", {
            options: { enabled: !1, arrowMarkup: '<a title="%title%" class="mfp-arrow mfp-arrow-%dir%"></a>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" },
            proto: {
                initGallery: function() {
                    var n = p.st.gallery,
                        r = ".mfp-gallery",
                        i = Boolean(e.fn.mfpFastClick);
                    p.direction = !0;
                    if (!n || !n.enabled) return !1;
                    w += " mfp-gallery", S(o + r, function() {
                        n.navigateByImgClick && p.wrap.on("click" + r, ".mfp-img", function() {
                            if (p.items.length > 1) return p.next(), !1
                        }), y.on("keydown" + r, function(e) { e.keyCode === 37 ? p.prev() : e.keyCode === 39 && p.next() })
                    }), S("UpdateStatus" + r, function(e, t) { t.text && (t.text = X(t.text, p.currItem.index, p.items.length)) }), S(s + r, function(e, t, r, i) {
                        var s = p.items.length;
                        r.counter = s > 1 ? X(n.tCounter, i.index, s) : ""
                    }), S("BuildControls" + r, function() {
                        if (p.items.length > 1 && n.arrows && !p.arrowLeft) {
                            var t = n.arrowMarkup,
                                r = p.arrowLeft = e(t.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(h).html('<svg xmlns="http://www.w3.org/2000/svg" class="mfp-prevent-close" width="614.25" height="472.5" viewBox="531.875 148.75 614.25 472.5" enable-background="new 531.875 148.75 614.25 472.5"><path class="mfp-prevent-close" d="M1122.5 361.375h-510.3l172.462-172.462c9.45-9.45 9.45-23.625 0-33.075-9.449-9.45-23.625-9.45-33.074 0l-212.625 212.625c-9.45 9.449-9.45 23.625 0 33.074l212.625 212.625c4.725 4.726 11.812 7.088 16.537 7.088s11.812-2.362 16.537-7.088c9.45-9.449 9.45-23.625 0-33.074l-172.462-172.463h510.3c14.175 0 23.625-9.45 23.625-23.625s-9.45-23.625-23.625-23.625z"/></svg>'),
                                s = p.arrowRight = e(t.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(h).html('<svg xmlns="http://www.w3.org/2000/svg" class="mfp-prevent-close" width="614.25" height="472.5" viewBox="531.875 148.75 614.25 472.5" enable-background="new 531.875 148.75 614.25 472.5"><path class="mfp-prevent-close" d="M531.875 385c0 14.175 9.45 23.625 23.625 23.625h510.3l-172.462 172.463c-9.45 9.449-9.45 23.625 0 33.074 4.725 4.726 11.812 7.088 16.537 7.088s11.812-2.362 16.537-7.088l212.625-212.625c9.45-9.449 9.45-23.625 0-33.074l-212.625-212.626c-9.449-9.45-23.625-9.45-33.074 0-9.45 9.45-9.45 23.625 0 33.075l172.462 172.463h-510.3c-14.175 0-23.625 9.45-23.625 23.625z"/></svg>'),
                                o = i ? "mfpFastClick" : "click";
                            r[o](function() { p.prev() }), s[o](function() { p.next() }), p.isIE7 && (x("b", r[0], !1, !0), x("a", r[0], !1, !0), x("b", s[0], !1, !0), x("a", s[0], !1, !0)), p.container.append(r.add(s))
                        }
                    }), S(u + r, function() { p._preloadTimeout && clearTimeout(p._preloadTimeout), p._preloadTimeout = setTimeout(function() { p.preloadNearbyImages(), p._preloadTimeout = null }, 16) }), S(t + r, function() { y.off(r), p.wrap.off("click" + r), p.arrowLeft && i && p.arrowLeft.add(p.arrowRight).destroyMfpFastClick(), p.arrowRight = p.arrowLeft = null })
                },
                next: function() { p.direction = !0, p.index = W(p.index + 1), p.updateItemHTML() },
                prev: function() { p.direction = !1, p.index = W(p.index - 1), p.updateItemHTML() },
                goTo: function(e) { p.direction = e >= p.index, p.index = e, p.updateItemHTML() },
                preloadNearbyImages: function() {
                    var e = p.st.gallery.preload,
                        t = Math.min(e[0], p.items.length),
                        n = Math.min(e[1], p.items.length),
                        r;
                    for (r = 1; r <= (p.direction ? n : t); r++) p._preloadItem(p.index + r);
                    for (r = 1; r <= (p.direction ? t : n); r++) p._preloadItem(p.index - r)
                },
                _preloadItem: function(t) {
                    t = W(t);
                    if (p.items[t].preloaded) return;
                    var n = p.items[t];
                    n.parsed || (n = p.parseEl(t)), T("LazyLoad", n), n.type === "image" && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() { n.hasSize = !0 }).on("error.mfploader", function() { n.hasSize = !0, n.loadError = !0, T("LazyLoadError", n) }).attr("src", n.src)), n.preloaded = !0
                }
            }
        });
        var V = "retina";
        e.magnificPopup.registerModule(V, {
                options: {
                    replaceSrc: function(e) {
                        return e.src.replace(/\.\w+$/, function(e) {
                            return "@2x" + e
                        })
                    },
                    ratio: 1
                },
                proto: {
                    initRetina: function() {
                        if (window.devicePixelRatio > 1) {
                            var e = p.st.retina,
                                t = e.ratio;
                            t = isNaN(t) ? t() : t, t > 1 && (S("ImageHasSize." + V, function(e, n) { n.img.css({ "max-width": n.img[0].naturalWidth / t, width: "100%" }) }), S("ElementParse." + V, function(n, r) { r.src = e.replaceSrc(r, t) }))
                        }
                    }
                }
            }),
            function() {
                var t = 1e3,
                    n = "ontouchstart" in window,
                    r = function() { g.off("touchmove" + s + " touchend" + s) },
                    i = "mfpFastClick",
                    s = "." + i;
                e.fn.mfpFastClick = function(i) {
                    return e(this).each(function() {
                        var o = e(this),
                            u;
                        if (n) {
                            var a, f, l, c, h, p;
                            o.on("touchstart" + s, function(e) {
                                c = !1, p = 1, h = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], f = h.clientX, l = h.clientY, g.on("touchmove" + s, function(e) {
                                    h = e.originalEvent ? e.originalEvent.touches : e.touches, p = h.length, h = h[0];
                                    if (Math.abs(h.clientX - f) > 10 || Math.abs(h.clientY - l) > 10) c = !0, r()
                                }).on("touchend" + s, function(e) {
                                    r();
                                    if (c || p > 1) return;
                                    u = !0, e.preventDefault(), clearTimeout(a), a = setTimeout(function() { u = !1 }, t), i()
                                })
                            })
                        }
                        o.on("click" + s, function() { u || i() })
                    })
                }, e.fn.destroyMfpFastClick = function() { e(this).off("touchstart" + s + " click" + s), n && g.off("touchmove" + s + " touchend" + s) }
            }(), C()
    }),
    function(e, t) {
        var n, r = "superslides";
        n = function(n, r) {
            this.options = t.extend({ play: !1, animation_speed: 600, animation_easing: "swing", animation: "slide", inherit_width_from: e, inherit_height_from: e, pagination: !0, hashchange: !1, scrollable: !0, elements: { preserve: ".preserve", nav: ".slides-navigation", container: ".slides-container", pagination: ".slides-pagination" } }, r);
            var i = this,
                s = t("<div>", { "class": "slides-control" }),
                o = 1;
            this.$el = t(n), this.$container = this.$el.find(this.options.elements.container);
            var u = function() {
                    return o = i._findMultiplier(), i.$el.on("click", i.options.elements.nav + " a", function(e) { e.preventDefault(), i.stop(), t(this).hasClass("next") ? i.animate("next", function() { i.start() }) : i.animate("prev", function() { i.start() }) }), t(document).on("keyup", function(e) { e.keyCode === 37 && i.animate("prev"), e.keyCode === 39 && i.animate("next") }), t(e).on("resize", function() {
                        setTimeout(function() {
                            var e = i.$container.children();
                            i.width = i._findWidth(), i.height = i._findHeight(), e.css({ width: i.width, left: i.width }), i.css.containers(), i.css.images()
                        }, 10)
                    }), i.options.hashchange && t(e).on("hashchange", function() {
                        var e = i._parseHash(),
                            t;
                        t = i._upcomingSlide(e), t >= 0 && t !== i.current && i.animate(t)
                    }), i.pagination._events(), i.start(), i
                },
                a = {
                    containers: function() { i.init ? (i.$el.css({ height: i.height }), i.$control.css({ width: i.width * o, left: -i.width }), i.$container.css({})) : (t("body").css({ margin: 0 }), i.$el.css({ position: "relative", overflow: "hidden", width: "100%", height: i.height }), i.$control.css({ position: "relative", transform: "translate3d(0)", height: "100%", width: i.width * o, left: -i.width }), i.$container.css({ display: "none", margin: "0", padding: "0", listStyle: "none", position: "relative", height: "100%" })), i.size() === 1 && i.$el.find(i.options.elements.nav).hide() },
                    images: function() {
                        var e = i.$container.find("img").not(i.options.elements.preserve);
                        e.removeAttr("width").removeAttr("height").css({ "-webkit-backface-visibility": "hidden", "-ms-interpolation-mode": "bicubic", position: "absolute", left: "0", top: "0", "z-index": "-1", "max-width": "none" }), e.each(function() {
                            var e = i.image._aspectRatio(this),
                                n = this;
                            if (!t.data(this, "processed")) {
                                var r = new Image;
                                r.onload = function() { i.image._scale(n, e), i.image._center(n, e), t.data(n, "processed", !0) }, r.src = this.src
                            } else i.image._scale(n, e), i.image._center(n, e)
                        })
                    },
                    children: function() {
                        var e = i.$container.children();
                        e.is("img") && (e.each(function() {
                            if (t(this).is("img")) {
                                t(this).wrap("<div>");
                                var e = t(this).attr("id");
                                t(this).removeAttr("id"), t(this).parent().attr("id", e)
                            }
                        }), e = i.$container.children()), i.init || e.css({ display: "none", left: i.width * 2 }), e.css({ position: "absolute", overflow: "hidden", height: "100%", width: i.width, top: 0, zIndex: 0 })
                    }
                },
                f = {
                    slide: function(e, t) {
                        var n = i.$container.children(),
                            r = n.eq(e.upcoming_slide);
                        r.css({ left: e.upcoming_position, display: "block" }), i.$control.animate({ left: e.offset }, i.options.animation_speed, i.options.animation_easing, function() { i.size() > 1 && (i.$control.css({ left: -i.width }), n.eq(e.upcoming_slide).css({ left: i.width, zIndex: 2 }), e.outgoing_slide >= 0 && n.eq(e.outgoing_slide).css({ left: i.width, display: "none", zIndex: 0 })), t() })
                    },
                    fade: function(e, t) {
                        var n = this,
                            r = n.$container.children(),
                            i = r.eq(e.outgoing_slide),
                            s = r.eq(e.upcoming_slide);
                        s.css({ left: this.width, opacity: 0, display: "block" }).animate({ opacity: 1 }, n.options.animation_speed, n.options.animation_easing), e.outgoing_slide >= 0 ? i.animate({ opacity: 0 }, n.options.animation_speed, n.options.animation_easing, function() { n.size() > 1 && (r.eq(e.upcoming_slide).css({ zIndex: 2 }), e.outgoing_slide >= 0 && r.eq(e.outgoing_slide).css({ opacity: 1, display: "none", zIndex: 0 })), t() }) : (s.css({ zIndex: 2 }), t())
                    }
                };
            f = t.extend(f, t.fn.superslides.fx);
            var l = {
                    _centerY: function(e) {
                        var n = t(e);
                        n.css({ top: (i.height - n.height()) / 2 })
                    },
                    _centerX: function(e) {
                        var n = t(e);
                        n.css({ left: (i.width - n.width()) / 2 })
                    },
                    _center: function(e) { i.image._centerX(e), i.image._centerY(e) },
                    _aspectRatio: function(e) {
                        if (!e.naturalHeight && !e.naturalWidth) {
                            var t = new Image;
                            t.src = e.src, e.naturalHeight = t.height, e.naturalWidth = t.width
                        }
                        return e.naturalHeight / e.naturalWidth
                    },
                    _scale: function(e, n) {
                        n = n || i.image._aspectRatio(e);
                        var r = i.height / i.width,
                            s = t(e);
                        r > n ? s.css({ height: i.height, width: i.height / n }) : s.css({ height: i.width * n, width: i.width })
                    }
                },
                c = {
                    _setCurrent: function(e) {
                        if (!i.$pagination) return;
                        var t = i.$pagination.children();
                        t.removeClass("current"), t.eq(e).addClass("current")
                    },
                    _addItem: function(e) {
                        var n = e + 1,
                            r = n,
                            s = i.$container.children().eq(e),
                            o = s.attr("id");
                        o && (r = o);
                        var u = t("<a>", { href: "#" + r, text: r });
                        u.appendTo(i.$pagination)
                    },
                    _setup: function() {
                        if (!i.options.pagination || i.size() === 1) return;
                        var e = t("<nav>", { "class": i.options.elements.pagination.replace(/^\./, "") });
                        i.$pagination = e.appendTo(i.$el);
                        for (var n = 0; n < i.size(); n++) i.pagination._addItem(n)
                    },
                    _events: function() {
                        i.$el.on("click", i.options.elements.pagination + " a", function(e) {
                            e.preventDefault();
                            var t = i._parseHash(this.hash),
                                n;
                            n = i._upcomingSlide(t, !0), n !== i.current && i.animate(n, function() { i.start() })
                        })
                    }
                };
            return this.css = a, this.image = l, this.pagination = c, this.fx = f, this.animation = this.fx[this.options.animation], this.$control = this.$container.wrap(s).parent(".slides-control"), i._findPositions(), i.width = i._findWidth(), i.height = i._findHeight(), this.css.children(), this.css.containers(), this.css.images(), this.pagination._setup(), u()
        }, n.prototype = {
            _findWidth: function() {
                return t(this.options.inherit_width_from).width()
            },
            _findHeight: function() {
                return t(this.options.inherit_height_from).height()
            },
            _findMultiplier: function() {
                return this.size() === 1 ? 1 : 3
            },
            _upcomingSlide: function(e, t) {
                t && !isNaN(e) && (e -= 1);
                if (/next/.test(e)) return this._nextInDom();
                if (/prev/.test(e)) return this._prevInDom();
                if (/\d/.test(e)) return +e;
                if (e && /\w/.test(e)) {
                    var n = this._findSlideById(e);
                    return n >= 0 ? n : 0
                }
                return 0
            },
            _findSlideById: function(e) {
                return this.$container.find("#" + e).index()
            },
            _findPositions: function(e, t) { t = t || this, e === undefined && (e = -1), t.current = e, t.next = t._nextInDom(), t.prev = t._prevInDom() },
            _nextInDom: function() {
                var e = this.current + 1;
                return e === this.size() && (e = 0), e
            },
            _prevInDom: function() {
                var e = this.current - 1;
                return e < 0 && (e = this.size() - 1), e
            },
            _parseHash: function(t) {
                return t = t || e.location.hash, t = t.replace(/^#/, ""), t && !isNaN(+t) && (t = +t), t
            },
            size: function() {
                return this.$container.children().length
            },
            destroy: function() {
                return this.$el.removeData()
            },
            update: function() { this.css.children(), this.css.containers(), this.css.images(), this.pagination._addItem(this.size()), this._findPositions(this.current), this.$el.trigger("updated.slides") },
            stop: function() { clearInterval(this.play_id), delete this.play_id, this.$el.trigger("stopped.slides") },
            start: function() {
                var n = this;
                n.options.hashchange ? t(e).trigger("hashchange") : this.animate(), this.options.play && (this.play_id && this.stop(), this.play_id = setInterval(function() { n.animate() }, this.options.play)), this.$el.trigger("started.slides")
            },
            animate: function(t, n) {
                var r = this,
                    i = {};
                if (this.animating) return;
                this.animating = !0, t === undefined && (t = "next"), i.upcoming_slide = this._upcomingSlide(t);
                if (i.upcoming_slide >= this.size()) return;
                i.outgoing_slide = this.current, i.upcoming_position = this.width * 2, i.offset = -i.upcoming_position;
                if (t === "prev" || t < i.outgoing_slide) i.upcoming_position = 0, i.offset = 0;
                r.size() > 1 && r.pagination._setCurrent(i.upcoming_slide);
                if (r.options.hashchange) {
                    var s = i.upcoming_slide + 1,
                        o = r.$container.children(":eq(" + i.upcoming_slide + ")").attr("id");
                    o ? e.location.hash = o : e.location.hash = s
                }
                r.size() === 1 && (r.stop(), r.options.play = 0, r.options.animation_speed = 0, i.upcoming_slide = 0, i.outgoing_slide = -1), r.$el.trigger("animating.slides", [i]), r.animation(i, function() { r._findPositions(i.upcoming_slide, r), typeof n == "function" && n(), r.animating = !1, r.$el.trigger("animated.slides"), r.init || (r.$el.trigger("init.slides"), r.init = !0, r.$container.fadeIn("fast")) })
            }
        }, t.fn[r] = function(e, i) {
            var s = [];
            return this.each(function() {
                var o, u, a;
                o = t(this), u = o.data(r), a = typeof e == "object" && e, u || (s = o.data(r, u = new n(this, a)));
                if (typeof e == "string") {
                    s = u[e];
                    if (typeof s == "function") return s = s.call(u, i)
                }
            }), s
        }, t.fn[r].fx = {}
    }(this, jQuery),
    function() {
        "use strict";

        function n(r) {
            if (!r) throw new Error("No options passed to Waypoint constructor");
            if (!r.element) throw new Error("No element option passed to Waypoint constructor");
            if (!r.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + e, this.options = n.Adapter.extend({}, n.defaults, r), this.element = this.options.element, this.adapter = new n.Adapter(this.element), this.callback = r.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = n.Group.findOrCreate({ name: this.options.group, axis: this.axis }), this.context = n.Context.findOrCreateByElement(this.options.context), n.offsetAliases[this.options.offset] && (this.options.offset = n.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), t[this.key] = this, e += 1
        }
        var e = 0,
            t = {};
        n.prototype.queueTrigger = function(e) { this.group.queueTrigger(this, e) }, n.prototype.trigger = function(e) {
            if (!this.enabled) return;
            this.callback && this.callback.apply(this, e)
        }, n.prototype.destroy = function() { this.context.remove(this), this.group.remove(this), delete t[this.key] }, n.prototype.disable = function() {
            return this.enabled = !1, this
        }, n.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, n.prototype.next = function() {
            return this.group.next(this)
        }, n.prototype.previous = function() {
            return this.group.previous(this)
        }, n.invokeAll = function(e) {
            var n = [];
            for (var r in t) n.push(t[r]);
            for (var i = 0, s = n.length; i < s; i++) n[i][e]()
        }, n.destroyAll = function() { n.invokeAll("destroy") }, n.disableAll = function() { n.invokeAll("disable") }, n.enableAll = function() { n.invokeAll("enable") }, n.refreshAll = function() { n.Context.refreshAll() }, n.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, n.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, n.adapters = [], n.defaults = { context: window, continuous: !0, enabled: !0, group: "default", horizontal: !1, offset: 0 }, n.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = n
    }(),
    function() {
        "use strict";

        function e(e) { window.setTimeout(e, 1e3 / 60) }

        function s(e) { this.element = e, this.Adapter = r.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + t, this.didScroll = !1, this.didResize = !1, this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }, this.waypoints = { vertical: {}, horizontal: {} }, e.waypointContextKey = this.key, n[e.waypointContextKey] = this, t += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler() }
        var t = 0,
            n = {},
            r = window.Waypoint,
            i = window.onload;
        s.prototype.add = function(e) {
            var t = e.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[t][e.key] = e, this.refresh()
        }, s.prototype.checkEmpty = function() {
            var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                t = this.Adapter.isEmptyObject(this.waypoints.vertical);
            e && t && (this.adapter.off(".waypoints"), delete n[this.key])
        }, s.prototype.createThrottledResizeHandler = function() {
            function t() { e.handleResize(), e.didResize = !1 }
            var e = this;
            this.adapter.on("resize.waypoints", function() { e.didResize || (e.didResize = !0, r.requestAnimationFrame(t)) })
        }, s.prototype.createThrottledScrollHandler = function() {
            function t() { e.handleScroll(), e.didScroll = !1 }
            var e = this;
            this.adapter.on("scroll.waypoints", function() {
                if (!e.didScroll || r.isTouch) e.didScroll = !0, r.requestAnimationFrame(t)
            })
        }, s.prototype.handleResize = function() { r.Context.refreshAll() }, s.prototype.handleScroll = function() {
            var e = {},
                t = { horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" }, vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" } };
            for (var n in t) {
                var r = t[n],
                    i = r.newScroll > r.oldScroll,
                    s = i ? r.forward : r.backward;
                for (var o in this.waypoints[n]) {
                    var u = this.waypoints[n][o],
                        a = r.oldScroll < u.triggerPoint,
                        f = r.newScroll >= u.triggerPoint,
                        l = a && f,
                        c = !a && !f;
                    if (l || c) u.queueTrigger(s), e[u.group.id] = u.group
                }
            }
            for (var h in e) e[h].flushTriggers();
            this.oldScroll = { x: t.horizontal.newScroll, y: t.vertical.newScroll }
        }, s.prototype.innerHeight = function() {
            return this.element == this.element.window ? r.viewportHeight() : this.adapter.innerHeight()
        }, s.prototype.remove = function(e) { delete this.waypoints[e.axis][e.key], this.checkEmpty() }, s.prototype.innerWidth = function() {
            return this.element == this.element.window ? r.viewportWidth() : this.adapter.innerWidth()
        }, s.prototype.destroy = function() {
            var e = [];
            for (var t in this.waypoints)
                for (var n in this.waypoints[t]) e.push(this.waypoints[t][n]);
            for (var r = 0, i = e.length; r < i; r++) e[r].destroy()
        }, s.prototype.refresh = function() {
            var e = this.element == this.element.window,
                t = e ? undefined : this.adapter.offset(),
                n = {},
                i;
            this.handleScroll(), i = { horizontal: { contextOffset: e ? 0 : t.left, contextScroll: e ? 0 : this.oldScroll.x, contextDimension: this.innerWidth(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" }, vertical: { contextOffset: e ? 0 : t.top, contextScroll: e ? 0 : this.oldScroll.y, contextDimension: this.innerHeight(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" } };
            for (var s in i) {
                var o = i[s];
                for (var u in this.waypoints[s]) {
                    var a = this.waypoints[s][u],
                        f = a.options.offset,
                        l = a.triggerPoint,
                        c = 0,
                        h = l == null,
                        p, d, v, m, g;
                    a.element !== a.element.window && (c = a.adapter.offset()[o.offsetProp]), typeof f == "function" ? f = f.apply(a) : typeof f == "string" && (f = parseFloat(f), a.options.offset.indexOf("%") > -1 && (f = Math.ceil(o.contextDimension * f / 100))), p = o.contextScroll - o.contextOffset, a.triggerPoint = c + p - f, d = l < o.oldScroll, v = a.triggerPoint >= o.oldScroll, m = d && v, g = !d && !v, !h && m ? (a.queueTrigger(o.backward), n[a.group.id] = a.group) : !h && g ? (a.queueTrigger(o.forward), n[a.group.id] = a.group) : h && o.oldScroll >= a.triggerPoint && (a.queueTrigger(o.forward), n[a.group.id] = a.group)
                }
            }
            return r.requestAnimationFrame(function() {
                for (var e in n) n[e].flushTriggers()
            }), this
        }, s.findOrCreateByElement = function(e) {
            return s.findByElement(e) || new s(e)
        }, s.refreshAll = function() {
            for (var e in n) n[e].refresh()
        }, s.findByElement = function(e) {
            return n[e.waypointContextKey]
        }, window.onload = function() { i && i(), s.refreshAll() }, r.requestAnimationFrame = function(t) {
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e;
            n.call(window, t)
        }, r.Context = s
    }(),
    function() {
        "use strict";

        function e(e, t) {
            return e.triggerPoint - t.triggerPoint
        }

        function t(e, t) {
            return t.triggerPoint - e.triggerPoint
        }

        function i(e) { this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this }
        var n = { vertical: {}, horizontal: {} },
            r = window.Waypoint;
        i.prototype.add = function(e) { this.waypoints.push(e) }, i.prototype.clearTriggerQueues = function() { this.triggerQueues = { up: [], down: [], left: [], right: [] } }, i.prototype.flushTriggers = function() {
            for (var n in this.triggerQueues) {
                var r = this.triggerQueues[n],
                    i = n === "up" || n === "left";
                r.sort(i ? t : e);
                for (var s = 0, o = r.length; s < o; s += 1) {
                    var u = r[s];
                    (u.options.continuous || s === r.length - 1) && u.trigger([n])
                }
            }
            this.clearTriggerQueues()
        }, i.prototype.next = function(t) {
            this.waypoints.sort(e);
            var n = r.Adapter.inArray(t, this.waypoints),
                i = n === this.waypoints.length - 1;
            return i ? null : this.waypoints[n + 1]
        }, i.prototype.previous = function(t) {
            this.waypoints.sort(e);
            var n = r.Adapter.inArray(t, this.waypoints);
            return n ? this.waypoints[n - 1] : null
        }, i.prototype.queueTrigger = function(e, t) { this.triggerQueues[t].push(e) }, i.prototype.remove = function(e) {
            var t = r.Adapter.inArray(e, this.waypoints);
            t > -1 && this.waypoints.splice(t, 1)
        }, i.prototype.first = function() {
            return this.waypoints[0]
        }, i.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, i.findOrCreate = function(e) {
            return n[e.axis][e.name] || new i(e)
        }, r.Group = i
    }(),
    function() {
        "use strict";

        function n(t) { this.$element = e(t) }
        var e = window.jQuery,
            t = window.Waypoint;
        e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, t) {
            n.prototype[t] = function() {
                var e = Array.prototype.slice.call(arguments);
                return this.$element[t].apply(this.$element, e)
            }
        }), e.each(["extend", "inArray", "isEmptyObject"], function(t, r) { n[r] = e[r] }), t.adapters.push({ name: "jquery", Adapter: n }), t.Adapter = n
    }(),
    function() {
        "use strict";

        function t(t) {
            return function() {
                var n = [],
                    r = arguments[0];
                return t.isFunction(arguments[0]) && (r = t.extend({}, arguments[1]), r.handler = arguments[0]), this.each(function() {
                    var i = t.extend({}, r, { element: this });
                    typeof i.context == "string" && (i.context = t(this).closest(i.context)[0]), n.push(new e(i))
                }), n
            }
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
    }(), $(document).ready(function() {
        $(".image_gallery").magnificPopup({ delegate: "a", type: "image", tLoading: "Loading...", mainClass: "mfp-img-mobile", gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] }, image: { tError: '<a href="%url%">The image </a> could not be loaded.' } });
        if ($(".featured").length) var e = new Waypoint({
            element: $(".featured"),
            handler: function(e) {
                var t = Waypoint.viewportWidth();
                t > 800 && (e === "down" ? $(".featured").animate({ opacity: 0 }) : $(".featured").animate({ opacity: 1 }))
            },
            offset: 120
        });
        if ($(".content").length) var e = new Waypoint({
            element: $(".content"),
            handler: function(e) {
                var t = Waypoint.viewportWidth();
                $(".slideshow").length && t > 800 && (e === "down" ? $("header").addClass("overlay") : $("header").removeClass("overlay"))
            },
            offset: 88
        });
        this.inPreview = /\/admin\/design/.test(top.location.pathname), this.inPreview && (setTimeout(function() { Waypoint.refreshAll() }, 800), $(".slideshow ul li img").css("-webkit-transform", "translate3d(0,0,0)")), searchForm = $("form.search"), searchForm.length && ($("body").on("click", "a[href=#search]", function(e) { e.preventDefault(), searchForm.fadeIn(150), isIE() || searchForm.find("input[type=text]").focus() }), $("body").on("click", ".close_search", function(e) { e.preventDefault(), searchForm.fadeOut(150) })), mobileNav = $(".mobile_nav"), $("body").on("click", ".nav_trigger", function(e) { e.preventDefault(), mobileNav.fadeIn(150) }), $("select").change(function(e) { e.preventDefault(), $(this).blur() }), $("body").on("click", ".close_nav", function(e) { e.preventDefault(), mobileNav.fadeOut(150) }), $("#cart input[id$=_qty]").blur(function(e) { e.preventDefault(), $(this).closest("form").submit() }), $("#cart .remove").click(function(e) { e.preventDefault(), $(this).closest("li").find("input[id$=_qty]").val(0).closest("form").submit() })
    }), $(document).keyup(function(e) { e.keyCode == 27 && (searchForm.length && searchForm.fadeOut(150), mobileNav.length && mobileNav.fadeOut(150)) });
