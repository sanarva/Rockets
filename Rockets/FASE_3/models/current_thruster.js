"use strict";
var CurrentPower = /** @class */ (function () {
    function CurrentPower(currentPower) {
        this.currentPower = currentPower;
    }
    //Añadimos los métodos acelerar y frenar para modificar la potencia actual de los propulsores
    CurrentPower.prototype.acelerateThruster = function () {
        this.currentPower += 10;
    };
    CurrentPower.prototype.breakThruster = function () {
        this.currentPower -= 10;
    };
    return CurrentPower;
}());
