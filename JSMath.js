jsLib.math = {};
jsLib.math.randI = function (max, min) {
    if (min == null)
        return Math.floor(Math.random() * (max + 1));
    else
        return Math.floor(Math.random() * (max - min + 1)) + min;

}

jsLib.math.rand = function (max, min) {
    if (min == null)
        return (Math.random() * max);
    else
        return (Math.random() * (max - min)) + min;
}

class polynomial {
    constructor(polynomial) {
        this.polynomial = polynomial;
        this.normalPolinomialDivision = this.PolDivNormal;
        this.polinomialDivision = this.PolDiv;
        this.toString = this.PoltoString;
    }

    PolDivNormal (Zähler, Nenner) {
        if (Nenner == null) {
            Nenner = Zähler;
            Zähler = this;
        }
        var Quotient = new Array();
        var Rest = new Array();
        var GradZ = Zähler.length - 1;
        var GradN = Nenner.length - 1;
        for (var i = GradZ - GradN; i >= 0; i--) {
            Quotient[i] = Zähler[i + GradN] / Nenner[GradN]
            for (var j = GradN; j >= 0; j--) {
                Zähler[i + j] -= Nenner[j] * Quotient[i]
            }
        }
        for (j = GradN - 1; j >= 0; j--)
            Rest[j] = Zähler[j]
        return [Quotient, Rest];
    }
    

    integrate (pol) {
        if (pol == null)
            pol = this.polynomial;
        else if (pol.polynomial == null) {
            pol = pol.polynomial;
        }
        var ret = new Array();
        if(pol instanceof jsLib.fraq){
            for (let i = 0; i < pol.length; i++) {
                ret[i+1] = pol[i].m(1/(i+1));
            }
        }
        for (let i = 0; i < pol.length; i++) {
            ret[i+1] =(1/(i+1))*pol[i];
        }
        return ret;
    }

    PolDiv (Zähler, Nenner) {
        if (Nenner == null) {
            Nenner = Zähler;
            Zähler = this;
        }
        var Quotient = new Array();
        var Rest = new Array();
        var GradZ = Zähler.length - 1;
        var GradN = Nenner.length - 1;
        for (var i = GradZ - GradN; i >= 0; i--) {
            Quotient[i] = math.divide(Zähler[i + GradN], Nenner[GradN]);
            for (var j = GradN; j >= 0; j--) {
                Zähler[i + j] = math.subtract(Zähler[i + j], math.multiply(Nenner[j], Quotient[i]));
            }
        }
        for (j = GradN - 1; j >= 0; j--)
            Rest[j] = Zähler[j]
        return [Quotient, Rest]
    }

    PoltoString (Pol) {
        if (Pol == null) {
            Pol = this.polynomial;
        }
        var str = "";
        for (let i = Pol.length - 1; i >= 0; i--) {
            if (Pol[i] != 0) {
                if (Pol[i] > 0 && str != "") str += "+";
                if (Pol[i] != 1 && Pol[i] != -1) str += Pol[i].toString();
                else if (Pol[i] == -1) str += "-";
                if (i > 0) {
                    str += "x";
                    if (i != 1) str += "^" + i;
                }
            }
        }
        return str+""+Pol[0];
    }

    randPol (maxGrad) {
        var grad = jsLib.math.randI(maxGrad, 1);
        if (grad < 1) grad = 1;
        var pol = new Array();
        for (let i = 0; i < grad; i++) {
            pol.push(math.fraction(jsLib.math.randI(10)));
        }
        return new polynomial(pol);
    }

    printPolDiv (Zähler, Nenner) {
        var res = PolDiv(Zähler, Nenner);
        var Quotient = res[0];
        var Rest = res[1];
        var str = "<br>Quotient:";
        str += PoltoString(Quotient);
        body.innerHTML += str;
        console.log(str);
        str = "Rest:";
        str += PoltoString(Rest);
        body.innerHTML += "<br>";
        body.innerHTML += str;
        console.log(str);
    }
}
jsLib.poly = polynomial;
jsLib.polynomialsss = polynomial;