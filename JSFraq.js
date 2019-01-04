jsLib.fraq = {};
class Fraq {
	constructor(numerator, denominator, sign) {
		if (sign == null) this.sign = (numerator * denominator) >= 0;
		else this.sign = sign;
		if (numerator % 1 === 0) this.numerator = numerator;
		if (denominator == null) this.denominator = 1;
		else this.denominator = denominator;
	}
	toFrac = function (x) {
		for (var i = 0; i < 31; i++) {
			if ((x * (1 << i)) % 1 == 0) {
				var numerator = x * (1 << i);
				var denominator = 1 << i;
				return new Fraq(numerator,denominator).simplify();
			}
		}
	}
	fq = this.toFrac;

	simplify = function (fraqToSimplyfy) {//simplify
		gcd = function(a,b){
			if(b===0) return a;
			return gcd(b,a%b);
		}
		if (fraqToSimplyfy == null) {
			this.numerator = Math.abs(this.numerator);
			this.denominator = Math.abs(this.denominator);
			for (var i = 2; i <= this.denominator; i++) {
				if (this.numerator % i == 0 && this.denominator % i == 0) {
					this.numerator /= i;
					this.denominator /= i;
					i--;
				}
			}
			return this;
		}
		fraqToSimplyfy.numerator = Math.abs(fraqToSimplyfy.numerator);
		fraqToSimplyfy.denominator = Math.abs(fraqToSimplyfy.denominator);
		for (var i = 2; i <= fraqToSimplyfy.denominator; i++) {
			if (fraqToSimplyfy.numerator % i == 0 && fraqToSimplyfy.denominator % i == 0) {
				fraqToSimplyfy.numerator /= i;
				fraqToSimplyfy.denominator /= i;
				i--;
			}
		}
		return fraqToSimplyfy;
	}
	s = this.simplify;

	r = function (fraqToInvert) {//1/x
		if (fraqToInvert == null) {
			var numerator = this.denominator;
			this.denominator = this.numerator;
			this.numerator = numerator
			return this;

		}
		return new Fraq(fraqToInvert.denominator,fraqToInvert.numerator);
	}
	recipricoal = this.r;
	inverse = this.r;
	i = this.r;

	multiply = function (a, b) {//multiplication
		if (b == null)
			return this.simplify(new Fraq(a.numerator * this.numerator, a.denominator * this.denominator));
		return this.simplify(new Fraq(a.numerator * b.numerator, a.denominator * b.denominator));
	}
	mult = this.multiply;
	m = this.multiply;

	add = function (a, b) {//addition
		if (b == null)
			return this.simplify(new Fraq(a.numerator * this.denominator + this.numerator * a.denominator, a.denominator * this.denominator));
		return this.simplify(new Fraq(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator));
	}
	a = this.add;

	string = function (fraqToPrint) {//fraction to string
		if (fraqToPrint == null) {
			this.simplify();
			if (this.denominator == 1)
				return "" + this.numerator;
			return "" + this.numerator + "/" + this.denominator;
		}
		this.simplify(fraqToPrint);
		if (fraqToPrint.denominator == 1)
			return "" + fraqToPrint.numerator;
		return "" + fraqToPrint.numerator + "/" + fraqToPrint.denominator;
	}
	toString = this.string;
}
jsLib.fraq = Fraq;

