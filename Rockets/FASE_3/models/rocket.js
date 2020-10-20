"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(rocketCode, thrusterNumber) {
        this.powers = new Array();
        this.currentPowers = new Array();
        this.rocketCode = rocketCode;
        this.thrusterNumber = thrusterNumber;
    }
    Object.defineProperty(Rocket.prototype, "_rocketCode", {
        get: function () {
            return this.rocketCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "_powers", {
        get: function () {
            return this.powers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "_currentPowers", {
        get: function () {
            return this.currentPowers;
        },
        set: function (currentPowers) {
            this.currentPowers = currentPowers;
        },
        enumerable: false,
        configurable: true
    });
    Rocket.prototype.addPower = function (power) {
        this.powers.push(power);
    };
    Rocket.prototype.addCurrentPower = function (currentPower) {
        this.currentPowers.push(currentPower);
    };
    return Rocket;
}());
