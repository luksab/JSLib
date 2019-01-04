jsLib.fraq = {};

class Fraq {
	constructor(numerator, denominator, sign) {
		if (numerator == null) {//randomize init
			numerator = jsLib.math.randI(0, 100);
			denominator = jsLib.math.randI(1, 100);
			sign = Math.random() >= 0.5;
		}
		if (sign == null)
			if (denominator == null) this.sign = numerator >= 0;
			else this.sign = (numerator * denominator) >= 0;
		else this.sign = sign;
		if (numerator % 1 === 0) this.numerator = numerator;
		if (denominator == null) this.denominator = 1;
		else this.denominator = denominator;
		this.simplify();
	}
	toFrac = function (x) {
		for (var i = 0; i < 31; i++) {
			if ((x * (1 << i)) % 1 == 0) {
				var sign = numerator >= 0;
				var numerator = x * (1 << i);
				var denominator = 1 << i;
				return new Fraq(numerator, denominator, sign).simplify();
			}
		}
	}
	fq = this.toFrac;

	simplify = function (fraqToSimplyfy) {//simplify
		function gcd(a, b) {
			if (!(a % 1 === 0 && b % 1 === 0))
				return 1;
			if (b === 0) return a;
			return gcd(b, a % b);
		}
		if (fraqToSimplyfy == null) {
			this.numerator = Math.abs(this.numerator);
			this.denominator = Math.abs(this.denominator);
			var denom = gcd(this.numerator, this.denominator)
			this.numerator /= denom;
			this.denominator /= denom;
			return this;
		}
		fraqToSimplyfy.numerator = Math.abs(fraqToSimplyfy.numerator);
		fraqToSimplyfy.denominator = Math.abs(fraqToSimplyfy.denominator);
		var denom = gcd(fraqToSimplyfy.numerator, fraqToSimplyfy.denominator)
		fraqToSimplyfy.numerator /= denom;
		fraqToSimplyfy.denominator /= denom;
		return fraqToSimplyfy;
	}
	s = this.simplify;

	r = function (fraqToInvert) {//1/x
		if (fraqToInvert == null) {
			fraqToInvert = this;
		}
		return new Fraq(fraqToInvert.denominator, fraqToInvert.numerator,fraqToInvert.sign);
	}
	recipricoal = this.r;
	inverse = this.r;
	i = this.r;

	multiply = function (a, b) {//multiplication
		if (b == null)
			if (a instanceof Fraq)
				return this.simplify(new Fraq(a.numerator * this.numerator, a.denominator * this.denominator,a.sign===this.sign));
			else
				return this.toFrac(a).m(this);
		if (a instanceof Fraq && b instanceof Fraq)
			return this.simplify(new Fraq(a.numerator * b.numerator, a.denominator * b.denominator,a.sign===b.sign));
	}
	mult = this.multiply;
	m = this.multiply;

	divide = function (a, b) {
		if(a == null){
			a = this.toFrac(a);
			b = this.toFrac(b);
		}
		if (b == null)
			if (a instanceof Fraq)
				b = this;
			else{
				b = this.toFrac(a);
				a = this;
			}
		return this.multiply(a.r(), b);
	}
	d = this.divide;

	add = function (a, b) {//addition
		if (b == null)
			return this.simplify(new Fraq(a.numerator * this.denominator + this.numerator * a.denominator, a.denominator * this.denominator));
		return this.simplify(new Fraq(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator));
	}
	a = this.add;

	string = function (fraqToPrint) {//fraction to string
		if (fraqToPrint == null) {
			fraqToPrint = this;
		}
		this.simplify(fraqToPrint);
		if (fraqToPrint.denominator == 1)
			return (fraqToPrint.sign ? "" : "-") + fraqToPrint.numerator;
		return (fraqToPrint.sign ? "" : "-") + fraqToPrint.numerator + "/" + fraqToPrint.denominator;
	}
	toString = this.string;
}
jsLib.fraq = Fraq;

