"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(rocketCode, thrusterNumber) {
        this.powers = new Array();
        this.rocketCode = rocketCode;
        this.thrusterNumber = thrusterNumber;
    }
    Rocket.prototype.addPower = function (power) {
        this.powers.push(power);
    };
    return Rocket;
}());
