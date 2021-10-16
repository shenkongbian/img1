/* 
 * Lazy Load - jQuery plugin for lazy loading images Version: 1.9.0
 * ====================================================
*/
!function (a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j)) ; else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1
                } else c.trigger("appear"), b = 0
            })
        }

        var h, i = this, j = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this, c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.attr("src", j.placeholder), c.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function () {
                        var d = c.data(j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function (a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.data(j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {threshold: 0})
        }, "above-the-top": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-screen": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-screen": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }, "in-viewport": function (b) {
            return a.inviewport(b, {threshold: 0})
        }, "above-the-fold": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-fold": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-fold": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }
    })
}(jQuery, window, document);

!function () {
    var a = jQuery.event.special, b = "D" + +new Date, c = "D" + (+new Date + 1);
    a.scrollstart = {
        setup: function () {
            var c, d = function (b) {
                var d = this, e = arguments;
                c ? clearTimeout(c) : (b.type = "scrollstart", jQuery.event.dispatch.apply(d, e)), c = setTimeout(function () {
                    c = null
                }, a.scrollstop.latency)
            };
            jQuery(this).bind("scroll", d).data(b, d)
        }, teardown: function () {
            jQuery(this).unbind("scroll", jQuery(this).data(b))
        }
    }, a.scrollstop = {
        latency: 300, setup: function () {
            var b, d = function (c) {
                var d = this, e = arguments;
                b && clearTimeout(b), b = setTimeout(function () {
                    b = null, c.type = "scrollstop", jQuery.event.dispatch.apply(d, e)
                }, a.scrollstop.latency)
            };
            jQuery(this).bind("scroll", d).data(c, d)
        }, teardown: function () {
            jQuery(this).unbind("scroll", jQuery(this).data(c))
        }
    }
}();


(function (r) {
    r.fn.qrcode = function (h) {
        var s;

        function u(a) {
            this.mode = s;
            this.data = a
        }

        function o(a, c) {
            this.typeNumber = a;
            this.errorCorrectLevel = c;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = []
        }

        function q(a, c) {
            if (void 0 == a.length) throw Error(a.length + "/" + c);
            for (var d = 0; d < a.length && 0 == a[d];) d++;
            this.num = Array(a.length - d + c);
            for (var b = 0; b < a.length - d; b++) this.num[b] = a[b + d]
        }

        function p(a, c) {
            this.totalCount = a;
            this.dataCount = c
        }

        function t() {
            this.buffer = [];
            this.length = 0
        }

        u.prototype = {
            getLength: function () {
                return this.data.length
            },
            write: function (a) {
                for (var c = 0; c < this.data.length; c++) a.put(this.data.charCodeAt(c), 8)
            }
        };
        o.prototype = {
            addData: function (a) {
                this.dataList.push(new u(a));
                this.dataCache = null
            }, isDark: function (a, c) {
                if (0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c) throw Error(a + "," + c);
                return this.modules[a][c]
            }, getModuleCount: function () {
                return this.moduleCount
            }, make: function () {
                if (1 > this.typeNumber) {
                    for (var a = 1, a = 1; 40 > a; a++) {
                        for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t, b = 0, e = 0; e < c.length; e++) b += c[e].dataCount;
                        for (e = 0; e < this.dataList.length; e++) c = this.dataList[e], d.put(c.mode, 4), d.put(c.getLength(), j.getLengthInBits(c.mode, a)), c.write(d);
                        if (d.getLengthInBits() <= 8 * b) break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            }, makeImpl: function (a, c) {
                this.moduleCount = 4 * this.typeNumber + 17;
                this.modules = Array(this.moduleCount);
                for (var d = 0; d < this.moduleCount; d++) {
                    this.modules[d] = Array(this.moduleCount);
                    for (var b = 0; b < this.moduleCount; b++) this.modules[d][b] = null
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount -
                    7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(a, c);
                7 <= this.typeNumber && this.setupTypeNumber(a);
                null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                this.mapData(this.dataCache, c)
            }, setupPositionProbePattern: function (a, c) {
                for (var d = -1; 7 >= d; d++) if (!(-1 >= a + d || this.moduleCount <= a + d)) for (var b = -1; 7 >= b; b++) -1 >= c + b || this.moduleCount <= c + b || (this.modules[a + d][c + b] =
                    0 <= d && 6 >= d && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == d || 6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1)
            }, getBestMaskPattern: function () {
                for (var a = 0, c = 0, d = 0; 8 > d; d++) {
                    this.makeImpl(!0, d);
                    var b = j.getLostPoint(this);
                    if (0 == d || a > b) a = b, c = d
                }
                return c
            }, createMovieClip: function (a, c, d) {
                a = a.createEmptyMovieClip(c, d);
                this.make();
                for (c = 0; c < this.modules.length; c++) for (var d = 1 * c, b = 0; b < this.modules[c].length; b++) {
                    var e = 1 * b;
                    this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
                }
                return a
            },
            setupTimingPattern: function () {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            }, setupPositionAdjustPattern: function () {
                for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++) for (var d = 0; d < a.length; d++) {
                    var b = a[c], e = a[d];
                    if (null == this.modules[b][e]) for (var f = -2; 2 >= f; f++) for (var i = -2; 2 >= i; i++) this.modules[b + f][e + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                }
            }, setupTypeNumber: function (a) {
                for (var c =
                    j.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                    var b = !a && 1 == (c >> d & 1);
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
                }
                for (d = 0; 18 > d; d++) b = !a && 1 == (c >> d & 1), this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
            }, setupTypeInfo: function (a, c) {
                for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; 15 > b; b++) {
                    var e = !a && 1 == (d >> b & 1);
                    6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
                }
                for (b = 0; 15 > b; b++) e = !a && 1 == (d >> b & 1), 8 > b ? this.modules[8][this.moduleCount -
                b - 1] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e;
                this.modules[this.moduleCount - 8][8] = !a
            }, mapData: function (a, c) {
                for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; 0 < i; i -= 2) for (6 == i && i--; ;) {
                    for (var g = 0; 2 > g; g++) if (null == this.modules[b][i - g]) {
                        var n = !1;
                        f < a.length && (n = 1 == (a[f] >>> e & 1));
                        j.getMask(c, b, i - g) && (n = !n);
                        this.modules[b][i - g] = n;
                        e--;
                        -1 == e && (f++, e = 7)
                    }
                    b += d;
                    if (0 > b || this.moduleCount <= b) {
                        b -= d;
                        d = -d;
                        break
                    }
                }
            }
        };
        o.PAD0 = 236;
        o.PAD1 = 17;
        o.createData = function (a, c, d) {
            for (var c = p.getRSBlocks(a,
                c), b = new t, e = 0; e < d.length; e++) {
                var f = d[e];
                b.put(f.mode, 4);
                b.put(f.getLength(), j.getLengthInBits(f.mode, a));
                f.write(b)
            }
            for (e = a = 0; e < c.length; e++) a += c[e].dataCount;
            if (b.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * a + ")");
            for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); 0 != b.getLengthInBits() % 8;) b.putBit(!1);
            for (; !(b.getLengthInBits() >= 8 * a);) {
                b.put(o.PAD0, 8);
                if (b.getLengthInBits() >= 8 * a) break;
                b.put(o.PAD1, 8)
            }
            return o.createBytes(b, c)
        };
        o.createBytes = function (a, c) {
            for (var d =
                0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) {
                var n = c[g].dataCount, h = c[g].totalCount - n, b = Math.max(b, n), e = Math.max(e, h);
                f[g] = Array(n);
                for (var k = 0; k < f[g].length; k++) f[g][k] = 255 & a.buffer[k + d];
                d += n;
                k = j.getErrorCorrectPolynomial(h);
                n = (new q(f[g], k.getLength() - 1)).mod(k);
                i[g] = Array(k.getLength() - 1);
                for (k = 0; k < i[g].length; k++) h = k + n.getLength() - i[g].length, i[g][k] = 0 <= h ? n.get(h) : 0
            }
            for (k = g = 0; k < c.length; k++) g += c[k].totalCount;
            d = Array(g);
            for (k = n = 0; k < b; k++) for (g = 0; g < c.length; g++) k < f[g].length &&
            (d[n++] = f[g][k]);
            for (k = 0; k < e; k++) for (g = 0; g < c.length; g++) k < i[g].length && (d[n++] = i[g][k]);
            return d
        };
        s = 4;
        for (var j = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52,
                78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (a) {
                for (var c = a << 10; 0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G15);) c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15);
                return (a << 10 | c) ^ j.G15_MASK
            },
            getBCHTypeNumber: function (a) {
                for (var c = a << 12; 0 <= j.getBCHDigit(c) -
                j.getBCHDigit(j.G18);) c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18);
                return a << 12 | c
            },
            getBCHDigit: function (a) {
                for (var c = 0; 0 != a;) c++, a >>>= 1;
                return c
            },
            getPatternPosition: function (a) {
                return j.PATTERN_POSITION_TABLE[a - 1]
            },
            getMask: function (a, c, d) {
                switch (a) {
                    case 0:
                        return 0 == (c + d) % 2;
                    case 1:
                        return 0 == c % 2;
                    case 2:
                        return 0 == d % 3;
                    case 3:
                        return 0 == (c + d) % 3;
                    case 4:
                        return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                    case 5:
                        return 0 == c * d % 2 + c * d % 3;
                    case 6:
                        return 0 == (c * d % 2 + c * d % 3) % 2;
                    case 7:
                        return 0 == (c * d % 3 + (c + d) % 2) % 2;
                    default:
                        throw Error("bad maskPattern:" +
                            a);
                }
            },
            getErrorCorrectPolynomial: function (a) {
                for (var c = new q([1], 0), d = 0; d < a; d++) c = c.multiply(new q([1, l.gexp(d)], 0));
                return c
            },
            getLengthInBits: function (a, c) {
                if (1 <= c && 10 > c) switch (a) {
                    case 1:
                        return 10;
                    case 2:
                        return 9;
                    case s:
                        return 8;
                    case 8:
                        return 8;
                    default:
                        throw Error("mode:" + a);
                } else if (27 > c) switch (a) {
                    case 1:
                        return 12;
                    case 2:
                        return 11;
                    case s:
                        return 16;
                    case 8:
                        return 10;
                    default:
                        throw Error("mode:" + a);
                } else if (41 > c) switch (a) {
                    case 1:
                        return 14;
                    case 2:
                        return 13;
                    case s:
                        return 16;
                    case 8:
                        return 12;
                    default:
                        throw Error("mode:" +
                            a);
                } else throw Error("type:" + c);
            },
            getLostPoint: function (a) {
                for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++) for (var e = 0; e < c; e++) {
                    for (var f = 0, i = a.isDark(b, e), g = -1; 1 >= g; g++) if (!(0 > b + g || c <= b + g)) for (var h = -1; 1 >= h; h++) 0 > e + h || c <= e + h || 0 == g && 0 == h || i == a.isDark(b + g, e + h) && f++;
                    5 < f && (d += 3 + f - 5)
                }
                for (b = 0; b < c - 1; b++) for (e = 0; e < c - 1; e++) if (f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3;
                for (b = 0; b < c; b++) for (e = 0; e < c - 6; e++) a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e +
                    2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40);
                for (e = 0; e < c; e++) for (b = 0; b < c - 6; b++) a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40);
                for (e = f = 0; e < c; e++) for (b = 0; b < c; b++) a.isDark(b, e) && f++;
                a = Math.abs(100 * f / c / c - 50) / 5;
                return d + 10 * a
            }
        }, l = {
            glog: function (a) {
                if (1 > a) throw Error("glog(" + a + ")");
                return l.LOG_TABLE[a]
            }, gexp: function (a) {
                for (; 0 > a;) a += 255;
                for (; 256 <= a;) a -= 255;
                return l.EXP_TABLE[a]
            }, EXP_TABLE: Array(256),
            LOG_TABLE: Array(256)
        }, m = 0; 8 > m; m++) l.EXP_TABLE[m] = 1 << m;
        for (m = 8; 256 > m; m++) l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8];
        for (m = 0; 255 > m; m++) l.LOG_TABLE[l.EXP_TABLE[m]] = m;
        q.prototype = {
            get: function (a) {
                return this.num[a]
            }, getLength: function () {
                return this.num.length
            }, multiply: function (a) {
                for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++) for (var b = 0; b < a.getLength(); b++) c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b)));
                return new q(c, 0)
            }, mod: function (a) {
                if (0 >
                    this.getLength() - a.getLength()) return this;
                for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b);
                for (b = 0; b < a.getLength(); b++) d[b] ^= l.gexp(l.glog(a.get(b)) + c);
                return (new q(d, 0)).mod(a)
            }
        };
        p.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27],
            [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146,
                116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15,
                43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45,
                3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19,
                55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10,
                45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        p.getRSBlocks = function (a, c) {
            var d = p.getRsBlockTable(a, c);
            if (void 0 == d) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
            for (var b = d.length / 3, e = [], f = 0; f < b; f++) for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++) e.push(new p(g, j));
            return e
        };
        p.getRsBlockTable = function (a, c) {
            switch (c) {
                case 1:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                case 0:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                case 3:
                    return p.RS_BLOCK_TABLE[4 *
                    (a - 1) + 2];
                case 2:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
            }
        };
        t.prototype = {
            get: function (a) {
                return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
            }, put: function (a, c) {
                for (var d = 0; d < c; d++) this.putBit(1 == (a >>> c - d - 1 & 1))
            }, getLengthInBits: function () {
                return this.length
            }, putBit: function (a) {
                var c = Math.floor(this.length / 8);
                this.buffer.length <= c && this.buffer.push(0);
                a && (this.buffer[c] |= 128 >>> this.length % 8);
                this.length++
            }
        };
        "string" === typeof h && (h = {text: h});
        h = r.extend({}, {
            render: "canvas", width: 256, height: 256, typeNumber: -1,
            correctLevel: 2, background: "#ffffff", foreground: "#000000"
        }, h);
        return this.each(function () {
            var a;
            if ("canvas" == h.render) {
                a = new o(h.typeNumber, h.correctLevel);
                a.addData(h.text);
                a.make();
                var c = document.createElement("canvas");
                c.width = h.width;
                c.height = h.height;
                for (var d = c.getContext("2d"), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0; f < a.getModuleCount(); f++) for (var i = 0; i < a.getModuleCount(); i++) {
                    d.fillStyle = a.isDark(f, i) ? h.foreground : h.background;
                    var g = Math.ceil((i + 1) * b) - Math.floor(i * b),
                        j = Math.ceil((f + 1) * b) - Math.floor(f * b);
                    d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
                }
            } else {
                a = new o(h.typeNumber, h.correctLevel);
                a.addData(h.text);
                a.make();
                c = r("<table></table>").css("width", h.width + "px").css("height", h.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", h.background);
                d = h.width / a.getModuleCount();
                b = h.height / a.getModuleCount();
                for (e = 0; e < a.getModuleCount(); e++) {
                    f = r("<tr></tr>").css("height", b + "px").appendTo(c);
                    for (i = 0; i < a.getModuleCount(); i++) r("<td></td>").css("width",
                        d + "px").css("background-color", a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
                }
            }
            a = c;
            jQuery(a).appendTo(this)
        })
    }
})(jQuery);


_varKr.body = $("body");
_varKr.nav = $(".nav");

if ($('.avatar:eq(0)').data('src') || $('.news-list .thumb:first').data('src')) {
    $('.avatar').lazyload({
        data_attribute: 'src',
        placeholder: _varKr.static + '/img/avatar.png',
        threshold: 400
    });

    $('.widget-author .avatar').lazyload({
        data_attribute: 'src',
        placeholder: _varKr.static + '/img/avatar.png',
        threshold: 400
    });

    $('.news-list .thumb').lazyload({
        data_attribute: 'src',
        placeholder: _varKr.static + '/img/thumbnail.png',
        threshold: 400
    });
}

/*
 * header
 * ====================================================
*/

_varKr.nav.find(".nav-follow-toggle").on("click touchstart", function (a) {
    _varKr.body.toggleClass("is-showNavFollow"),
        a.preventDefault()
});

_varKr.nav.find(".nav-mob-toggle").on("click touchstart", function (a) {
    _varKr.body.toggleClass("is-showNavMob"),
        a.preventDefault()
});

_varKr.nav.find("#search-open").on("click touchstart", function (a) {
    _varKr.body.toggleClass("show-search"),
        a.preventDefault()
});
$("#search-close").on("click touchstart", function (a) {
    _varKr.body.toggleClass("show-search"),
        a.preventDefault()
});


/*
 * scroll
 * ====================================================
*/
$(window).scroll(function () {
    if ($(window).scrollTop() > 32) {
        _varKr.body.addClass("is-navSticky");
    } else {
        // _varKr.body.removeClass("is-navSticky");
    }
});


/*
 * footer
 * ====================================================
*/

$(".subscribe-loader").on("click", function () {
    _varKr.body.addClass("has-modal");
    $("#subscribe-modal").addClass("is-visible");
});

$(".subscribe-close").on("click", function () {
    _varKr.body.removeClass("has-modal");
    $("#subscribe-modal").removeClass("is-visible");
});

$(".weixin-loader").on("click", function () {
    _varKr.body.addClass("has-modal");
    $("#weixin-modal").addClass("is-visible");
});

$(".weixin-close").on("click", function () {
    _varKr.body.removeClass("has-modal");
    $("#weixin-modal").removeClass("is-visible");
});


$(".article-shang").on("click", function () {
    _varKr.body.addClass("has-modal");
    $("#shang-modal").addClass("is-visible");
});

$(".shang-close").on("click", function () {
    _varKr.body.removeClass("has-modal");
    $("#shang-modal").removeClass("is-visible");
});

$('.btn-weixin').hover(function () {
    if (!$('#wx-share canvas').length) {
        $('#wx-share').qrcode({
            width: 80,
            height: 80,
            text: $(this).data('url')
        });
    }
});

$('.btn-weixin-img').click(function () {
    var i = $(this).data("s-id");
    $("body").append('<div class="mobile-share-bg"><div class="top_tips">请长按图片，将内容推荐给好友</div></div><div class="mobile-share-wrap"></div>'),
        popup.showToast({
            type: "icon",
            time: 1e5
        }),
        utils.ajax({
            url: _varKr.ajaxUrl,
            data: {
                id: i,
                action: "mbt_mobile_share"
            },
            type: "POST",
            timeout: 1e4,
            success: function (t) {
                //console.log(t);
                popup.hideToast();
                $('#wx-thumb-qrcode').html('').qrcode({
                    width: 195,
                    height: 195,
                    text: $('#wx-thumb-qrcode').data('url')
                });
                t.callback = function (e) {
                    $(".mobile-share-wrap").html('<img src="' + e + '"><div class="mobile-share-close">×</div>'),
                        $(".mobile-share-bg .top_tips").show();
                    $('.mobile-share-close').click(function () {
                        $(".mobile-share-bg,.mobile-share-wrap").remove();
                        $('#wx-thumb-qrcode').html('')
                    })
                };
                var o = $("#wx-thumb-qrcode");
                t.qrcode = o.find("canvas")[0].toDataURL(),
                    t.head && t.logo && t.qrcode ? utils.textToImage(t) : (popup.showToast({
                        type: "text",
                        text: "获取分享图片失败！"
                    }), $(".mobile-share-bg,.mobile-share-wrap").remove())
            },
            error: function () {
                popup.showToast({
                    type: "text",
                    text: "获取分享图片失败！"
                });
                $(".mobile-share-bg,.mobile-share-wrap").remove()
            }
        });
});

//返回顶部
$(window).scroll(function () {
    if (!_varKr.body.hasClass("is-read")) {
        if ($(this).scrollTop() > 100) {
            $('.roller-bar').fadeIn();
        } else {
            $('.roller-bar').fadeOut();
        }
    }
});
$('.return-top').click(function () {
    $("html, body").animate({
            scrollTop: 0
        },
        600);
    return false;
});

// 二维码
var timer2;
$(".qr-code").hover(function () {
        clearTimeout(timer2);
        setTimeout(function () {
                $(".code-img").stop().fadeIn();
            },
            100);
    },
    function () {
        clearTimeout(timer2);
        timer2 = setTimeout(function () {
                $(".code-img").stop().fadeOut();
            },
            600);
    });


/*
 * archive
 * ====================================================
*/

$('.news-paging > a, .news-list-nav > li > a').on('click', function () {
    var next_url = $(this).attr("href");
    var next_text = $(this).text();
    if (next_text == '加载更多') {
        $(this).text('加载中...');
    } else {
        $('.news-list-nav > li').removeClass('current-menu-item');
        $(this).parent().addClass('current-menu-item');
        $(".news-loading").show();
        $("#news-list, .news-paging").hide();
    }

    $.ajax({
        type: 'get',
        url: next_url + '#news-list',
        success: function (data) {
            result = $(data).find("#news-list .list-item");
            next_link = $(data).find(".news-paging > a").attr("href");
            if (next_link != undefined) {
                $('.news-paging > a').attr("href", next_link);
                $('.news-paging > a').text('加载更多');
                $(".news-paging").show();
            } else {
                $(".news-paging").hide();
            }

            $(function () {
                if (next_url.indexOf("page") < 1) {
                    $("#news-list").html('');
                }
                $("#news-list").append(result.fadeIn(100));
                $('.avatar').lazyload({
                    data_attribute: 'src',
                    placeholder: _varKr.static + '/img/avatar.png',
                    threshold: 400
                });
                $('.news-list .thumb').lazyload({
                    data_attribute: 'src',
                    placeholder: _varKr.static + '/img/thumbnail.png',
                    threshold: 400
                });
                if (next_text != '加载更多') {
                    $(".news-loading").hide();
                    $("#news-list").show();
                }
            });
        }
    });

    return false;
});

/*
 * wire list
 * ====================================================
*/
if ($(".wire-lists").length) {
    $(".wire-lists").children().first().addClass("show").find(".preview").show();
    $(".wire-lists .wire").on("click", function () {
        $(this).hasClass("show") ? $(this).removeClass("show").find(".preview").slideUp(300) : $(this).addClass("show").find(".preview").slideDown(300)
    });

}


/*
 * single
 * ====================================================
*/

if ($("body").hasClass("single-post")) {
    $('.nav-varkr .menu-item.menu-item-home').addClass('current-menu-item');

    $(window).scroll(function () {
        var top = $(this).scrollTop();
        var this_top = $(".post-con").offset().top;
        var height = $(".post-con").height();
        var this_bottom = this_top + height;
        var percent = 0;
        if (top >= this_top && top <= this_bottom) {
            percent = ((top - this_top) / height) * 100;
            if (percent >= 100) {
                percent = 100;
            } else {
                /*$(".top-progress-bar").css("background", "#f42")*/
            }
        } else if (top > this_bottom) {
            percent = 100;
        }
        $(".top-progress-bar").css("width", percent + "%")

    });


    if (!_varKr.mobile && _varKr.singleLoad == 1) {
        var next_url = $("link[rel=prev]").attr("href");
        var curscrolltop = -1;
        var isgeting = 0;

        if (next_url != undefined) {
            $(window).scroll(function () {

                invisiblezone();

                if ($(window).scrollTop() + $(window).height() + 600 > $(document).height() && !isgeting && next_url != '') {

                    $.ajax({
                        type: 'get',
                        url: next_url,
                        beforeSend: function () {
                            isgeting = 1;
                        },
                        success: function (data) {
                            isgeting = 0;
                            result = $(data).filter("#single-container");
                            nurl = $(data).filter("#single-container").attr('nurl');

                            if (nurl != undefined) {
                                next_url = nurl;
                            } else {
                                next_url = '';
                            }

                            result.find('.content').css({"border-top": "2px solid #f42", "padding-top": "30px"});
                            result.find('.post-comments-wrap').remove();
                            $(".footer-wrap").before(result);

                            if ($('.avatar:eq(0)').data('src')) {
                                $('.avatar').lazyload({
                                    data_attribute: 'src',
                                    placeholder: _varKr.static + '/img/avatar.png',
                                    threshold: 400
                                });

                                $('.widget-author .avatar').lazyload({
                                    data_attribute: 'src',
                                    placeholder: _varKr.static + '/img/avatar.png',
                                    threshold: 400
                                });
                            }

                            $('.return-top').click(function () {
                                $("html, body").animate({
                                        scrollTop: 0
                                    },
                                    600);
                                return false;
                            });

                            $(".read-clean").bind("click", function () {
                                if (_varKr.body.hasClass("is-read")) {
                                    _varKr.body.removeClass("is-read");
                                    $(".read-clean i").removeClass("icon2-read2").addClass("icon2-read").attr("title", "阅读模式");
                                } else {
                                    _varKr.body.addClass("is-read");
                                    $(".read-clean i").removeClass("icon2-read").addClass("icon2-read2").attr("title", "普通模式");
                                }
                                $("html, body").animate({
                                        scrollTop: 0
                                    },
                                    600);
                            });

                        },
                        error: function (xhr, textStatus, errorThrown) {
                            //console.log(errorThrown);
                        }
                    });

                    if (isgeting)
                        return;

                }

            });
        }

        function invisiblezone() {
            var wintop = jQuery(window).scrollTop();
            var winheight = jQuery(window).height();
            if (Math.abs(wintop - curscrolltop) < 20)
                return 0;
            var d = 0;
            if ((wintop - curscrolltop) > 0) {
                d = 1;
            } else if ((wintop - curscrolltop) < 0) {
                d = 2;
            }
            var winbottom = jQuery(window).scrollTop() + jQuery(window).height();
            if (curscrolltop > -1) {
                jQuery(".container-main").each(function () {
                    var url = jQuery(this).attr("purl");
                    var title = jQuery(this).find(".single-head").find("h1").text();
                    var posttop = jQuery(this).offset().top;
                    var postbottom = posttop + jQuery(this).outerHeight();

                    if (d == 1) {
                        if ((posttop > wintop) && (posttop < (wintop + winheight / 3))) {

                            if (window.location.href != url) {
                                var state = {
                                    title: title,
                                    url: window.location.href
                                };
                                window.history.pushState(state, document.title, url);
                                document.title = title;
                            }
                        }
                    } else if (d == 2) {

                        if ((postbottom < (wintop + winheight)) && (postbottom > (wintop + winheight * 2 / 3))) {
                            if (window.location.href != url) {
                                var state = {
                                    title: title,
                                    url: window.location.href
                                };
                                window.history.pushState(state, document.title, url);
                                document.title = title;

                            }
                        }
                    }
                });
            }
            curscrolltop = wintop;
        }

    }

    if ($('.read-number').length) {
        strToViews($('.read-number span').text());
    }

    $(".read-clean").bind("click", function () {
        if (_varKr.body.hasClass("is-read")) {
            _varKr.body.removeClass("is-read");
            $(".read-clean i").removeClass("icon2-read2").addClass("icon2-read").attr("title", "阅读模式");
        } else {
            _varKr.body.addClass("is-read");
            $(".read-clean i").removeClass("icon2-read").addClass("icon2-read2").attr("title", "普通模式");
        }
        $("html, body").animate({
                scrollTop: 0
            },
            600);
    });

}

// 视频自适应
$(".post-con iframe, .post-con embed, .post-con object, .post-con video").each(function () {
    $(this).width("100%");
    $(this).height($(this).width() * 9 / 16);
});

$(window).resize(function () {
    $(".post-con iframe, .post-con embed, .post-con object, .post-con video").each(function () {
        $(this).height($(this).width() * 9 / 16);
    });
});


$.extend({
    tipsBox: function (options) {
        options = $.extend({
            obj: null,
            str: "+1",
            startSize: "12px",
            endSize: "30px",
            interval: 600,
            color: "red",
            callback: function () {
            }
        }, options);
        $("body").append("<span class='num'>" + options.str + "</span>");
        var box = $(".num");
        var left = options.obj.offset().left + options.obj.width() / 2;
        var top = options.obj.offset().top - options.obj.height() + 50;
        box.css({
            "position": "absolute",
            "left": left + "px",
            "top": top + "px",
            "z-index": 9999,
            "font-size": options.startSize,
            "line-height": options.endSize,
            "color": options.color
        });
        box.animate({
            "font-size": options.endSize,
            "opacity": "0",
            "top": top - parseInt(options.endSize) + "px"
        }, options.interval, function () {
            box.remove();
            options.callback();
        });
    }
});


//文章点赞
$('body').on('click', '.article-zan', function () {
    var vote_btn = $(this);
    if (vote_btn.hasClass('active')) {
        return false;
    }
    var pid = vote_btn.data('id');
    if (checkZan(pid)) {
        alert("您已赞过！");
        return false;
    }
    $.ajax({
        url: _varKr.uri + '/api/vote/article',
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'post',
            id: pid
        },
        success: function (data) {
            if (data.code == '200') {
                vote_btn.addClass('active').html('<i class="icon-thumbs-o-up"></i><span itemprop="rating">' + data.data.vote_number + '</span>');
                vote_btn.find('i').addClass('niceIn');
                setTimeout(function () {
                    vote_btn.find('i').removeClass('niceIn');
                }, 1000);
                $.tipsBox({
                    obj: $(vote_btn),
                    str: "+1",
                    callback: function () {
                    }
                });
                addZan(pid);
            }
        }
    });
});

function checkZan(pid) {
    zanIds = getCookie('zanIds')
    if (zanIds != null && zanIds != "") {
        comArr = zanIds.split(",");
        for (i = 0; i < comArr.length; i++) {
            if (comArr[i] == pid) {
                return true;
            }
        }
    }
    return false;
}

function addZan(pid) {
    zanIds = getCookie('zanIds')
    if (zanIds != null && zanIds != "") {
        zanIds = zanIds + ',' + pid;
        setCookie('zanIds', zanIds, 30);
    } else {
        setCookie('zanIds', pid, 30);
    }
}

//评论点赞
function checkVote(cmid) {
    comIds = getCookie('comIds')
    if (comIds != null && comIds != "") {
        comArr = comIds.split(",");
        for (i = 0; i < comArr.length; i++) {
            if (comArr[i] == cmid) {
                return true;
            }
        }
    }
    return false;
}

function addVote(cmid) {
    comIds = getCookie('comIds')
    if (comIds != null && comIds != "") {
        comIds = comIds + ',' + cmid;
        setCookie('comIds', comIds, 30);
    } else {
        setCookie('comIds', cmid, 30);
    }
}

function checkView(cmid) {
    comIds = getCookie('viewIds')
    if (comIds != null && comIds != "") {
        comArr = comIds.split(",");
        for (i = 0; i < comArr.length; i++) {
            if (comArr[i] == cmid) {
                return true;
            }
        }
    }
    return false;
}

function addView(cmid) {
    comIds = getCookie('viewIds')
    if (comIds != null && comIds != "") {
        comIds = comIds + ',' + cmid;
        setCookie('viewIds', comIds, 1);
    } else {
        setCookie('viewIds', cmid, 1);
    }
}

// 文章评论点赞
$('body').on('click', '.article-comment-vote', function () {
    var vote_btn = $(this);
    if (vote_btn.hasClass('active')) {
        return false;
    }
    var li_id = vote_btn.parent().parent().parent().parent().attr('id');
    var cid = li_id.substr(8);
    if (checkVote(cid)) {
        alert("您已赞过！");
        return false;
    }
    $.ajax({
        url: _varKr.uri + '/api/vote/comment',
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'comment',
            id: cid
        },
        success: function (data) {
            if (data.code == 200) {
                vote_btn.addClass('active').html('<i class="icon-thumbs-o-up"></i><span itemprop="rating">' + data.data.vote_number + '</span>');
                addVote(cid);
            }
        }
    });
});

if ($('body').hasClass("single")) {
    var pageCount = 1;
    var pages = 0;
    $('body').on('click', '.more-trigger a', function () {
        $containerList = $(this).parent().parent().find('.comment-list');
        $moreTrigger = $(this).parent();

        var pid = $containerList.attr('pid');
        if (parseInt($containerList.attr('count')) > parseInt($containerList.attr('perpage'))) {
            pages = parseInt($containerList.attr('count') / $containerList.attr('perpage')) + 1;
        }

        pageCount++;
        if (pageCount <= pages) {
            $.ajax({
                url: _varKr.uri + '/action/more_comment.php',
                type: 'POST',
                dataType: 'html',
                data: {
                    action: 'more_post_comment',
                    page: pageCount,
                    postid: pid
                },
                beforeSend: function (XMLHttpRequest) {
                    $moreTrigger.before('<div class="loader-trigger"><div class="pagination-loading"><div class="loading-wave"><div class="loading-rect loading-rect1"></div><div class="loading-rect loading-rect2"></div><div class="loading-rect loading-rect3"></div><div class="loading-rect loading-rect4"></div><div class="loading-rect loading-rect5"></div></div></div></div>');
                    $moreTrigger.remove();
                },
                success: function (data) {
                    $containerList.html(data);
                    if (pageCount < pages) {
                        $containerList.next('.loader-trigger').after('<div class="more-trigger"><a href="javascript:;" class="button">显示更多评论</a></div>');
                    }
                    $containerList.next('.loader-trigger').remove();

                    $('.avatar').lazyload({
                        data_attribute: 'src',
                        placeholder: _varKr.uri + '/static/img/avatar.png',
                        threshold: 400
                    })
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pageCount--;
                    $containerList.next('.loader-trigger').after('<div class="more-trigger"><a href="javascript:;" class="button">显示更多评论</a></div>');
                    $containerList.next('.loader-trigger').remove();
                }
            });
        }
    });


    $('img.comment-captcha-clk').bind('click', function () {
        var captcha = _varKr.uri + '/do/captcha?' + Math.random();
        $(this).attr('src', captcha);
    });

    $(".must-login").click(function () {
        $(".post-comments-wrap").find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>请先登录</p>").next().show(500).delay(2000).fadeOut(1000, function () {
            $(this).remove();
        });
        return;
    });

    //ajax 评论
    $(".post-comments-wrap .form-submit #submit").bind("click", function () {
        //var commcon = $(".post-comments-wrap");
        var commcon = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent();
        var content = commcon.find("#comment-content").val();
        if (content.length < 2) {
            commcon.find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>这观点也太短了吧！</p>").next().show(500).delay(2000).fadeOut(1000, function () {
                $(this).remove();
            });
            return false;
        }
        var comment_post_ID = commcon.find("#comment_post_ID").val();
        var comment_parent = commcon.find("#comment_parent").val();
        var captcha = commcon.find("#captcha").val();
        var email = commcon.find("#email").val();
        var author = commcon.find("#author").val();
        var url = commcon.find("#url").val();
        var obj = {
            action: 'varkr_submit_comment',
            comment_post_ID: comment_post_ID,
            comment_parent: comment_parent,
            comment: content,
            captcha: captcha,
            email: email,
            url: url,
            author: author,
        }
        $.post(
            _varKr.uri + '/comment',
            obj,
            function (data) {

                if (data == 'captcha_error') {
                    commcon.find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>验证码错误！</p>").next().show(500).delay(2000).fadeOut(1000, function () {
                        $(this).remove();
                    });
                    return false;
                } else if (data == 'content_error') {
                    commcon.find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>说好的观点呢？</p>").next().show(500).delay(2000).fadeOut(1000, function () {
                        $(this).remove();
                    });
                    return false;
                } else if (data == 'email_error') {
                    commcon.find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>请输入有效邮箱！</p>").next().show(500).delay(2000).fadeOut(1000, function () {
                        $(this).remove();
                    });
                    return false;
                } else if (data == 'login_error') {
                    commcon.find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>请先登录！</p>").next().show(500).delay(2000).fadeOut(1000, function () {
                        $(this).remove();
                    });
                    return false;
                } else if (data == 'info_error') {
                    commcon.find("#comment-content").after("<p style='color:red;font-size:12px;display:none'>请输入昵称！</p>").next().show(500).delay(2000).fadeOut(1000, function () {
                        $(this).remove();
                    });
                    return false;
                } else {
                    if (comment_parent == 0) {
                        if (commcon.find("ul#mkid").length > 0) {
                            commcon.find("#mkid").prepend(data).find("li").fadeIn(1000);
                        } else {
                            commcon.find('h2').after('<ul id="mkid">' + data + '</ul>');
                            commcon.find("#mkid").find("li").fadeIn(1000);
                        }
                    } else {
                        commcon.find("#comment-" + comment_parent).append('<ul class="children">' + data + '</ul>').find("li").fadeIn(1000);
                    }
                    commcon.find("#cancel-comment-reply-link").trigger("click");
                    commcon.find("#comment-content").val("");
                    commcon.find("#captcha").val("");
                }
            }
        );
        return false;
    });

}


weixinShareApi = {
    init: function () {
        var that = this;
        if (that.openInWeixin()) {
            var e, i = location.href.split("#")[0],
                o = document.querySelector("body").classList,
                s = 0;
            if (o.contains("page")) for (var r = 0; r < o.length; r++) (e = o[r].match(/page-id-(\d+)$/)) && (s = e[1]);
            else if (o.contains("single")) for (var r = 0; r < o.length; r++) (e = o[r].match(/postid-(\d+)$/)) && (s = e[1]);
            $.ajax({
                url: _varKr.ajaxUrl,
                type: "POST",
                data: {
                    action: "moshou_wx_config",
                    url: encodeURIComponent(i),
                    ID: s
                },
                dataType: "json",
                success: function (e) {
                    if (e.signature) {
                        var n = e.thumb,
                            o = document.title,
                            s = $("meta[name=description]").attr("content");
                        s = s || e.desc;
                        var r = document.createElement("script");
                        r.src = "//res.wx.qq.com/open/js/jweixin-1.2.0.js",
                            r.onload = function () {
                                window.wx.config({
                                    debug: !1,
                                    appId: e.appId,
                                    timestamp: e.timestamp,
                                    nonceStr: e.noncestr,
                                    signature: e.signature,
                                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
                                }),
                                    wx.ready(function () {
                                        var e = {
                                                imgUrl: n,
                                                link: i,
                                                desc: s,
                                                title: o
                                            },
                                            r = {
                                                imgUrl: n,
                                                link: i,
                                                title: o
                                            };
                                        wx.onMenuShareAppMessage(e),
                                            wx.onMenuShareTimeline(r),
                                            wx.onMenuShareQQ(e),
                                            wx.onMenuShareWeibo(e)
                                    }),
                                    wx.error(function (t) {
                                        console.log(t)
                                    })
                            },
                            document.body.appendChild(r)
                    }
                }
            })
        }
    },
    openInWeixin: function () {
        return /MicroMessenger/i.test(navigator.userAgent)
    }
};
weixinShareApi.init();


window.popup = {
    element: {
        body: "body",
        head: "head",
        toast: "#toast",
        modal: "#modal",
        customModal: "#customModal",
        scrollBodyStyle: "#scrollBodyStyle"
    },
    addEvent: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "body",
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = this,
            a = null !== e ? '*[data-popup-action="' + e + '"]' : "*[data-popup-action]";
        $(this.element[t]).on("click", a,
            function (t) {
                var e = $(this).data("popup-action");
                n[e]($(this), t)
            })
    },
    removeEvent: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "body",
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = null !== e ? '*[data-popup-action="' + e + '"]' : "*[data-popup-action]";
        $(this.element[t]).off("click", n)
    },
    showToast: function () {
        var t = this,
            e = arguments,
            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            a = n.type,
            s = void 0 === a ? "icon" : a,
            o = n.icon,
            i = void 0 === o ? "icon-loading" : o,
            c = n.text,
            l = void 0 === c ? "加载中..." : c,
            d = n.display,
            p = void 0 === d ? "fs" : d,
            m = n.el,
            u = void 0 === m ? "" : m,
            r = n.time,
            h = void 0 === r ? 1500 : r,
            v = n.callback;
        $(this.element.body).find(this.element.toast).length <= 0 ? ("el" === p ? (u = "string" == typeof u ? $(u) : u, u.append(popupTemplate.toast({
            type: s,
            icon: i,
            text: l,
            display: p
        }))) : $(this.element.body).append(popupTemplate.toast({
            type: s,
            icon: i,
            text: l,
            display: p
        })), $(this.element.toast).animate({
                opacity: 1
            },
            300), this.toastTimer = setTimeout(function () {
                $(t.element.toast).animate({
                        opacity: 0
                    },
                    300,
                    function () {
                        $(t.element.toast).remove(),
                        "function" == typeof v && v()
                    })
            },
            h)) : this.hideToast(function () {
            t.showToast.call(t, e[0])
        })
    },
    hideToast: function (t) {
        var e = this;
        $(this.element.toast).animate({
                opacity: 0
            },
            300,
            function () {
                $(e.element.toast).remove(),
                    clearTimeout(e.toastTimer),
                    e.toastTimer = null,
                    "function" == typeof t ? t() : void 0
            })
    },
    showModal: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.title,
            n = void 0 === e ? "提示" : e,
            a = t.content,
            s = void 0 === a ? "" : a,
            o = t.showCancel,
            i = void 0 === o ? !0 : o,
            c = t.btnText,
            l = void 0 === c ? ["确定", "取消"] : c,
            d = (t.multiple, t.layerClose),
            p = void 0 === d ? !1 : d,
            m = (t.success, t.fail, arguments),
            u = this,
            r = $(this.element.body).find(this.element.modal).length,
            h = "modal_" + r;
        $(this.element.body).find("#" + h).length <= 0 && (utils.disabledScroll(), $(this.element.body).append(popupTemplate.modal({
            title: n,
            content: s,
            showCancel: i,
            btnText: l,
            id: h
        })), $("#" + h).on("click", "*[data-callback]",
            function () {
                var t = $(this).data("callback");
                m.length > 0 && m[0] && ("function" == typeof m[0][t] && m[0][t] ? m[0][t](h) : "")
            }), p && $("#" + h).on("click",
            function (t) {
                u.layerClose($(this), t)
            }))
    },
    showCustomModal: function (t) {
        var e = t.template,
            n = void 0 === e ? "" : e,
            a = t.data,
            s = void 0 === a ? {} : a,
            o = t.callback,
            i = t.layerClose,
            c = void 0 === i ? !1 : i,
            l = this;
        $(this.element.body).find(this.element.customModal).length <= 0 && ($(this.element.body).append(popupTemplate.customModal(customModalTemplate[n](s))), utils.disabledScroll(), this.addEvent("body", "customModalClose"), customModalFunc.addEvent(), c && $(this.element.customModal).on("click",
            function (t) {
                l.layerClose($(this), t)
            }), $(this.element.customModal).find("*[data-custom-submit]").length > 0 && $(this.element.customModal).on("click", "*[data-custom-submit]",
            function () {
                var t = {};
                $(l.element.customModal).find("*[name]").each(function () {
                    var e = $(this).attr("name");
                    t[e] = $(this).val() || ""
                }),
                    "function" == typeof o ? o($(this), t) : function () {
                    }
            }))
    },
    hideModal: function (t) {
        $("#" + t).remove(),
            this.commonHide()
    },
    customModalClose: function (t) {
        t.parents("" + this.element.customModal).remove(),
            this.commonHide()
    },
    layerClose: function (t, e) {
        var n = e.target,
            a = t.data("layer");
        n.id && n.id === a && ($("#" + a).off("click").remove(), this.commonHide())
    },
    commonHide: function () {
        var t = $(this.element.body).find("*[data-lib]").length;
        0 >= t && (this.removeEvent(), utils.enabledScroll()),
            $(this.element.body).off("click", '*[data-popup-action="customModalClose"]'),
            customModalFunc.removeEvent(),
            $(this.element.customModal).off("click", "*[data-custom-submit]")
    }
};

popupTemplate = {
    toast: function (t) {
        var e = t.type,
            n = t.icon,
            a = t.text,
            s = t.display;
        return '\n            <section class="toast ' + e + " " + s + '" id="toast">\n                ' + (n && "text" !== e ? "\n                    " + ("icon-loading" === n ? '\n                        <section class="icon">\n                            <svg class="circular" viewBox="25 25 50 50">\n                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>\n                            </svg>\n                        </section>\n                    ' : '\n                    <section class="icon">\n                        <i class="modia ' + n + '"></i>\n                    </section>\n                    ') + "\n                " : "") + "\n                " + (a && "icon" !== e ? '\n                    <section class="text">\n                        <p>' + a + "</p>\n                    </section>\n                " : "") + "\n            </section>\n        "
    },
    modal: function (t) {
        var e = t.title,
            n = t.content,
            a = t.showCancel,
            s = t.btnText,
            o = t.id,
            i = void 0 === o ? "modal" : o;
        return '\n            <section class="modal-box" data-lib="popup" data-popup-action="layerClose" data-layer="' + i + '" id="' + i + '">\n                <section class="modal">\n                    <p class="title">' + e + '</p>\n                    <section class="content">\n                        <p>' + n + '</p>\n                    </section>\n                    <section class="options-btns">\n                        <a href="javascript:;" data-callback="success" class="yes">' + s[0] + "</a>\n                        " + (a ? '\n                            <a href="javascript:;" data-callback="fail" class="close">' + s[1] + "</a>\n                        " : "") + "\n                    </section>\n                </section>\n            </section>\n        "
    }
};

utils = {
    ajax: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.url,
            i = void 0 === t ? "" : t,
            a = e.data,
            o = void 0 === a ? {} : a,
            n = e.type,
            s = void 0 === n ? "GET" : n,
            r = e.success,
            c = e.fail;
        $.ajax({
            type: s,
            url: i,
            data: o,
            dataType: 'json',
            success: function (e) {
                "function" == typeof r && r(e)
            },
            fail: c
        })
    },
    textToImage: function (t) {
        function e(t, e, i, n, o) {
            for (var a = 0,
                     s = 0,
                     r = 0,
                     l = 0; l < t.length; l++) r = o.measureText(t[l]).width,
                a += r,
            a > 560 && (o.fillText(t.substring(s, l), e, i), i += n, a = 0, s = l),
            l == t.length - 1 && (o.fillText(t.substring(s, l + 1), e, i), i += n);
            return i
        }

        !
            function () {
                var i = document.createElement("canvas"),
                    n = i.getContext("2d");
                i.width = 640,
                    i.height = 1e4;
                var o = 0;
                n.fillStyle = "#fff",
                    n.fillRect(0, 0, i.width, i.height);
                var a = new Image;
                a.src = t.head,
                    a.onerror = function (t) {
                        popup.showToast({
                            type: "text",
                            text: "获取分享图片失败！"
                        });
                        $(".mobile-share-bg,.mobile-share-wrap").remove()
                    },
                    a.onload = function () {
                        o += 640 / a.width * a.height,
                            n.drawImage(this, 0, 0, a.width, a.height, 0, 0, 640, 640 / a.width * a.height);
                        var s = new Date(1e3 * t.timestamp),
                            r = s.getDate(),
                            l = s.getFullYear(),
                            d = s.getMonth() + 1;
                        r = r < 10 ? "0" + r : "" + r,
                            d = d < 10 ? "0" + d : "" + d,
                            d = l + "/" + d;
                        var c = 0,
                            u = 0;
                        n.fillStyle = "#fff",
                            n.textAlign = "center",
                            n.font = "68px PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,sans-serif";
                        for (var h = 0; h < r.length; h++) c += n.measureText(r[h]).width;
                        n.fillText(r, 80, o - 72),
                            n.fillStyle = "#fff",
                            n.textAlign = "center",
                            n.font = "30px PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,sans-serif";
                        for (var h = 0; h < d.length; h++) u += n.measureText(d[h]).width;
                        n.fillText(d, 80, o - 28);
                        var p = parseInt(u > c ? u : c);
                        n.moveTo(80 - p / 2, o - 60),
                            n.lineTo(80 - p / 2 + p, o - 60),
                            n.lineWidth = 1,
                            n.strokeStyle = "rgba(255,255,255, 1)",
                            n.stroke(),
                            n.fillStyle = "#000",
                            n.textAlign = "center",
                            n.font = "600 36px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,sans-serif",
                            o += 80,
                            o = e(jQuery("<div>").html(t.title).text(), 320, o, 50, n),
                            n.textAlign = "left",
                            n.fillStyle = "#333",
                            n.font = "300 26px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,sans-serif",
                            o += 30,
                            o = e(jQuery("<div>").html(t.excerpt).text(), 30, o, 42, n),
                            o += 100,
                            n.lineWidth = 1,
                            n.beginPath(),
                            n.setLineDash([7, 7]),
                            n.strokeStyle = "#ccc",
                            n.moveTo(0, o),
                            n.lineTo(640, o),
                            n.stroke();
                        var f = new Image;
                        f.src = t.logo,
                            f.onerror = function (t) {
                                popup.showToast({
                                    type: "text",
                                    text: "获取分享图片失败！"
                                });
                                $(".mobile-share-bg,.mobile-share-wrap").remove()
                            },
                            f.onload = function () {
                                o += 40;
                                var e = 400 / f.width * f.height;
                                e = e > 100 ? 100 : e;
                                var a = f.width / (f.height / e);
                                a = a > 400 ? 400 : a,
                                    e = a / f.width * f.height,
                                    n.drawImage(this, 0, 0, f.width, f.height, 30, o + (100 - e) / 2, a, e);
                                var s = new Image;
                                s.src = t.qrcode,
                                    s.onerror = function (t) {
                                        popup.showToast({
                                            type: "text",
                                            text: "获取分享图片失败！"
                                        });
                                        $(".mobile-share-bg,.mobile-share-wrap").remove()
                                    },
                                    s.onload = function () {
                                        n.drawImage(this, 0, 0, s.width, s.height, 510, o, 100, 100 / s.width * s.height);
                                        var a = 100 / s.width * s.height;
                                        o += a > e ? a : e,
                                            o += 40;
                                        var r = n.getImageData(0, 0, 640, o);
                                        i.height = o,
                                            n.putImageData(r, 0, 0);
                                        var l = i.toDataURL("image/jpeg", 1);
                                        t.callback(l)
                                    }
                            }
                    }
            }()
    }

}


/*
 * functions
 * ====================================================
*/

function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function is_name(str) {
    return /^[\w]{3,16}$/.test(str)
}

function is_url(str) {
    return /^((http|https)\:\/\/)([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(str)
}

function is_qq(str) {
    return /^[1-9]\d{4,13}$/.test(str)
}

function is_mail(str) {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(str)
}

function strToViews(n) {
    var len = Number(n.length);
    if (len > 4) {
        n = Math.round((n / 10000) * 100) / 100;
        n = n + "万";
    }
    $(".read-number span").text(n);
}