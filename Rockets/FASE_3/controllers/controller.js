"use strict";
//Declaro la varible rocket como si fuera de tipo clase (que es la que hemos creado en el fichero rocket.ts)
var rocket;
//Declaro un array para meter los dos objetos cohete que vamos a dar de alta
var rockets = new Array();
//Declaro un array para meter la potencia actual
var currentPowers = new Array();
//Declaramos la variable divPrintInfo para poder mostrar y ocultar la información de los cohetes creados
var divPrintInfo = document.getElementById("idDivPrintInfo");
//Declaramos la variable divButtons para poder mostrar y ocultar los botones de acelerar y frenar
var divButtons = document.getElementById("idDivButtons");
//Declaramos la constante rocketForm que recogerá la información de todos los campos del formulario principal. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
var rocketForm = document.getElementById("idRocketForm");
//Creo este array para ir metiendo las potencias y luego llamar a la función join para meterlas en un sólo campo, 
//separadas por coma (, ).
var ArrayManimunPower = new Array();
//Declaro una variable donde se guardará la suma de las potencias actuales
var totalCurrentPower;
//Declaro una variable donde se guardará la suma de las potencias actuales
var maxPower;
//Declaro una variable para meter el código del cohete que se ha seleccionado mediante el radio button
var rocketChecked;
//Declaro una variable para tratar el mensaje de error en caso de que se de a los botones "Acelerate" o "Break" sin haber 
//seleccionado ningún cochete
var errorNoRocketSelected = document.getElementById("idErrorNoRocketSelected");
//Declaro una variable para tratar el mensaje de error en caso de que se llegue a la máxima potencia del propulsor
var messagePower = document.getElementById("idMessagePower");
//Declaramos la constante powerForm que recogerá la información del campo de potencia del propulsor. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
var powerForm = document.getElementById("idPowerForm");
//Declaro una constante para poder habilitar/deshabilitar el botón de crear cohete 
var btnCreateRocket = document.getElementById("btnCreateRocket");
//Declaro una constante para poder habilitar/deshabilitar el botón de añadir potencia 
var btnPower = document.getElementById("btnPower");
var rocketCode = document.getElementById("idRocketCode");
var thrusterNumber = document.getElementById("idThrusterNumber");
function createRocket() {
    //Comprobamos si la infomación que está introduciendo el usuario, es coherente.
    var errorCounter = checkRocketInfo(rocketCode, thrusterNumber);
    //Comprobamos si el cohete que se quiere crear ya existe
    var errorDuplicateRocket = findRocket(rocketCode);
    if (errorCounter == 0 && errorDuplicateRocket == false) {
        //Creo el objeto cohete llamando a la clase Rocket y los voy metiendo en un array para tenerlos guardados y poder mostrarlos
        rocket = new Rocket(rocketCode.value.toUpperCase(), Number(thrusterNumber.value));
        rockets.push(rocket);
        //Inicializo a 0 las potencias actuales 
        var i = void 0;
        var currentPower = void 0;
        for (i = 0; i < Number(thrusterNumber.value); i++) {
            currentPower = new CurrentPower(0);
            rocket.addCurrentPower(currentPower);
            //Voy metiendo las potencias actuales en este array para luego hacer la suma y pintarla por pantalla
            currentPowers.push(currentPower);
        }
        //Deshabilito los campos principales del formulario y el botón de crear cohete para que no puedan ser
        // modificados mientras se añade la potencia de cada propulsor para ese cohete creado
        rocketCode.disabled = true;
        thrusterNumber.disabled = true;
        btnCreateRocket.disabled = true;
        //Muestro el div que contiene el campo del formulario para añadir la potencia de cada propulsor
        powerForm.classList.remove("d-none");
    }
}
function checkRocketInfo(rocketCode, thrusterNumber) {
    var errorRocketCode = document.getElementById("errorRocketCode");
    var errorThrusterNumber = document.getElementById("errorThrusterNumber");
    var errorCounter = 0;
    if (!validateRocketCode(rocketCode)) {
        rocketCode.classList.add("is-invalid");
        errorRocketCode.textContent = "Code Rocket must contain 8 characters";
        errorCounter++;
    }
    if (Number(thrusterNumber.value) < 1) {
        thrusterNumber.classList.add("is-invalid");
        errorThrusterNumber.textContent = "Thruster number must be greather than 0";
        errorCounter++;
    }
    return errorCounter;
}
//Con esta función validamos que el código del cohete contenga 8 caracteres(alfanuméricos)
function validateRocketCode(rocketCode) {
    var regex = /^[0-9a-zA-Z]{8}$/;
    return regex.test(rocketCode.value) ? true : false;
}
//Con esta función comprobaremos si el cohete existe antes de darlo de alta y si existe, mostraremos un error al usuario
function findRocket(rocketCode) {
    var errorRocketCode = document.getElementById("errorRocketCode");
    var errorDuplicateRocket = false;
    var i = 0;
    while (i < rockets.length && errorDuplicateRocket == false) {
        if (rocketCode.value == rockets[i].rocketCode) {
            errorDuplicateRocket = true;
            rocketCode.classList.add("is-invalid");
            errorRocketCode.textContent = "This rocket already exists. Please, enter another rocket code.";
        }
        else {
            i++;
        }
    }
    return errorDuplicateRocket;
}
//Con esta función añadiremos la potencia de cada propulsor
function createPower() {
    var maximumThrusterPower = document.getElementById("idThrusterPower");
    var maximumThrusterPowerNumberic = Number(maximumThrusterPower.value);
    var errorThrusterPowerModulo = checkThrusterPowerModulo(maximumThrusterPowerNumberic);
    if (maximumThrusterPowerNumberic >= 0 && maximumThrusterPowerNumberic <= 120 && errorThrusterPowerModulo == false) {
        var power = new Power(Number(maximumThrusterPower.value));
        rocket.addPower(power);
        //Voy metiendo las potencias introducidas en este array para luego pintarlas por pantalla
        ArrayManimunPower.push(maximumThrusterPowerNumberic);
        //Reseteo los campos del formulario de potencias
        powerForm.reset();
        //Una vez que hemos añadido todas las potencias para el número de propulsores indicados:
        if (rocket.powers.length == Number(thrusterNumber.value)) {
            //Escondo el formulario de potencias
            powerForm.classList.add("d-none");
            //Llamo a la función que mostrará por pantalla la información de los cohetes creados
            showInfo();
            //Habilito los campos principales del formulario y el botón de crear cohete para que dar crear nuevos cohetes 
            rocketCode.disabled = false;
            thrusterNumber.disabled = false;
            btnCreateRocket.disabled = false;
        }
    }
    else if (maximumThrusterPowerNumberic < 0 || maximumThrusterPowerNumberic > 120 || isNaN(maximumThrusterPowerNumberic)) {
        var errorThrusterPower = document.getElementById("errorThrusterPower");
        maximumThrusterPower.classList.add("is-invalid");
        errorThrusterPower.textContent = "Thruster power must be a value between 0 and 120";
    }
}
function checkThrusterPowerModulo(maximumThrusterPowerNumberic) {
    var maximumThrusterPower = document.getElementById("idThrusterPower");
    var errorThrusterPower = document.getElementById("errorThrusterPower");
    var errorThrusterPowerModulo = false;
    if (maximumThrusterPowerNumberic % 10 != 0) {
        maximumThrusterPower.classList.add("is-invalid");
        errorThrusterPower.textContent = "Thruster power must be multiple of 10";
        errorThrusterPowerModulo = true;
    }
    return errorThrusterPowerModulo;
}
//Con esta función muestro la información de los cohetes y propulsores que vamos creando y modificando
function showInfo() {
    //Este será nuestro div padre que tenemos creado ya en el HTML
    var divInfo = document.getElementById("idDivPrintInfo");
    //Creamos un componente de tipo "div"
    var rocketInfo = document.createElement("div");
    //Al llamar a la función join, meto todo lo que hay en el array de potencia máxima, en un string, separado por coma y espacio en este caso   
    var infoPower = ArrayManimunPower.join(", ");
    //rocket.powers[i].power
    //Calculamos la suma de la potencia actual
    totalCurrentPower = calculateTotalCurrentPower();
    var rocketIconId = "i" + rocketCode.value;
    //Montamos el texto que se irá añadiendo cada vez que se cree un cohete 
    rocketInfo.innerHTML = "\n        <div class=\"rocketPrinted\"> \n            <input type=\"radio\" name=\"radioButtonRocket\" onclick=\"hiddeErrorRadio()\" value= \"" + rocketCode.value + "\">\n            Rocket " + rocketCode.value + " has " + thrusterNumber.value + " thrusters. Maximum power: " + infoPower + ". \n            Total current power: <span id= \"" + rocketCode.value + "\">" + totalCurrentPower + "</span>. <br>\n            <i class=\"fas fa-rocket\" id=\"" + rocketIconId + "\"></i>\n        </div>\n    ";
    //Añadimos el elemento al padre
    divInfo.appendChild(rocketInfo);
    //Una vez creados los cohetes, y rellena la información, mostraremos el div con la información de los mismos ...
    divPrintInfo.classList.remove("d-none");
    //...y también mostraremos los botones para poder acelerar o frenar
    divButtons.classList.remove("d-none");
    //Limpio los campos del formulario para que el usuario pueda introducir nuevos datos sin tener que borrar manualmente los anteriores
    var rocketForm = document.getElementById("idRocketForm");
    rocketForm.reset();
    //Limpio el array con las potencias del cohete creado para inicializarlo para guardar la info del siguiente cohete
    ArrayManimunPower = new Array();
    //Limpio el array con las potencias actuales del cohete para inicializarlo para guardar la info siguiente 
    currentPowers = new Array();
    console.log(rockets);
}
function calculateTotalCurrentPower() {
    var i = 0;
    totalCurrentPower = 0;
    for (i; i < currentPowers.length; i++) {
        totalCurrentPower += currentPowers[i].currentPower;
    }
    return totalCurrentPower;
}
//Recuperamos la información del cohete seleccionado y damos error si no hay ninguno seleccionado
function retrieveInfoRocketChecked(action) {
    //Inicializo la variable
    rocketChecked = "";
    //Con este código, recuperamos el valor (código del cohete) que tiene el radio button que hemos seleccionado
    var radioButtonRockets = document.getElementsByName("radioButtonRocket");
    var i = 0;
    while (i < radioButtonRockets.length && rocketChecked == "") {
        if (radioButtonRockets[i].checked) {
            rocketChecked = radioButtonRockets[i].value;
        }
        else {
            i++;
        }
    }
    //Devolvemos un error si no se ha selecionado ningún cohete
    if (rocketChecked === "") {
        errorNoRocketSelected.classList.add("d-block");
        return rocketChecked;
    }
    //Calculamos la potencia total máxima
    maxPower = 0;
    for (var j = 0; j < rockets[i].powers.length; j++) {
        maxPower += rockets[i].powers[j].power;
    }
    //Calculamos la potencia total actual
    totalCurrentPower = 0;
    for (var j = 0; j < rockets[i].currentPowers.length; j++) {
        totalCurrentPower += rockets[i].currentPowers[j].currentPower;
    }
    //Comprobamos que no se haya llegado a la potencia máxima y se esté intentado acelerar 
    if (totalCurrentPower == maxPower && action == "acelerate") {
        messagePower.textContent = "This rocket has reached its maximum power: " + maxPower;
        messagePower.classList.add("d-block");
        //Ocultamos el error a los 3 segundos
        setTimeout(function () {
            messagePower.classList.remove("d-block");
        }, 3000);
    }
    //Comprobamos que no se haya llegado a la potencia mínima y se esté intentado frenar
    if (totalCurrentPower == 0 && action == "toBreak") {
        messagePower.textContent = "This rocket has reached its minimum power: 0";
        messagePower.classList.add("d-block");
        //Ocultamos el error a los 3 segundos
        setTimeout(function () {
            messagePower.classList.remove("d-block");
        }, 3000);
    }
    //Recuperamos la potencia actual del cohete seleccionado, hacemos comprobaciones y llamamos al método correspondiente
    for (var j = 0; j < rockets[i].currentPowers.length; j++) {
        //Si la potencia actual parcial es menor que la potencia máxima parcial y se ha pulsado el botón de acelerar, 
        if ((rockets[i].currentPowers[j].currentPower < rockets[i].powers[j].power) && action == "acelerate") {
            //Llamamos al método acelerateThruster() para acelerar
            rockets[i].currentPowers[j].acelerateThruster();
        }
        //Si la potencia actual parcial es mayor que cero y se ha pulsado el botón de frenar,
        if ((rockets[i].currentPowers[j].currentPower > 0) && action == "toBreak") {
            //Llamamos al método breakThruster() para frenar
            rockets[i].currentPowers[j].breakThruster();
        }
    }
    //Calculamos la potencia total actual
    totalCurrentPower = 0;
    for (var j = 0; j < rockets[i].currentPowers.length; j++) {
        totalCurrentPower += rockets[i].currentPowers[j].currentPower;
    }
    updateInfo(rocketChecked, totalCurrentPower);
    var rocketIconId = "i" + rocketChecked;
    moveRocket(rocketIconId, totalCurrentPower);
}
function updateInfo(rocketChecked, totalCurrentPower) {
    //Actualizamos la potencia total actual
    var childDiv = document.getElementById(rocketChecked);
    childDiv.innerHTML = totalCurrentPower;
}
function moveRocket(rocketIconId, totalCurrentPower) {
    var rocketIcon = document.getElementById(rocketIconId);
    var movementRocket = totalCurrentPower + "px";
    rocketIcon.style.paddingLeft = movementRocket;
}
//Con el if, comprobamos si existe el objeto rocketForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (rocketForm) {
    rocketForm.addEventListener("blur", function (event) {
        if (event.target.value != "")
            event.target.classList.remove("is-invalid");
    }, true);
}
//Con el if, comprobamos si existe el objeto powerForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (powerForm) {
    powerForm.addEventListener("blur", function (event) {
        if (event.target.value != "")
            event.target.classList.remove("is-invalid");
    }, true);
}
//Con esta función, eliminaremos el error de que no se ha seleccionado ningun cohete, el cuál aparece cuando aceleramos
//o frenamos y no hay ningún radio button seleccionado
function hiddeErrorRadio() {
    errorNoRocketSelected.classList.remove("d-block");
}
