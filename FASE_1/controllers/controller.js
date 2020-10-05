"use strict";
//Declaro la varible rocket[i] como si fuera de tipo clase (que es la que hemos creado en el fichero rocket.ts)
var rocket;
//Declaro un array (tupple) para meter los dos objetos cohete que vamos a dar de alta
var rocketArray = new Array();
//Declaramos la constante divPrintInfo para poder mostrar y ocultar la información de los cohetes creados
var divPrintInfo = document.getElementById("idDivPrintInfo");
//Declaramos la constante rocketForm que recogerá la información de todos los campos del formulario principal. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
var rocketForm = document.getElementById("idRocketForm");
var rocketCode = document.getElementById("idRocketCode");
var thrusterNumber = document.getElementById("idThrusterNumber");
function createRocket() {
    //Comprobamos si la infomación que está introduciendo el usuario, es coherente.
    var errorCounter = checkInfo(rocketCode, thrusterNumber);
    if (errorCounter == 0) {
        //Creo el objeto cohete llamando a la clase Rocket y los voy metiendo en un array para tenerlos guardados y poder mostrarlos
        rocket = new Rocket(rocketCode.value.toUpperCase(), Number(thrusterNumber.value));
        rocketArray.push(rocket);
        console.log(rocketArray);
        //Llamo a la función que mostrará por pantalla la información de los cohetes creados
        showInfo();
    }
}
function checkInfo(rocketCode, thrusterNumber) {
    var errorRocketCode = document.getElementById("errorRocketCode");
    var errorThrusterNumber = document.getElementById("errorThrusterNumber");
    var errorCounter = 0;
    if (!validateRocketCode(rocketCode)) {
        rocketCode.classList.add("is-invalid");
        errorRocketCode.textContent = "Code Rocket must contain 8 characters";
        errorCounter++;
    }
    if (thrusterNumber.value < 1) {
        thrusterNumber.classList.add("is-invalid");
        errorThrusterNumber.textContent = "Thruster number must be greather than 0";
        errorCounter++;
    }
    return errorCounter;
}
function showInfo() {
    var rocketInfo = document.getElementById("idDivPrintInfo");
    var divInfo = document.createElement("div");
    divInfo.innerHTML = ("Rocket: " + rocketCode.value + " has " + thrusterNumber.value + " thrusters." + "<br>");
    rocketInfo.append(divInfo);
    //Una vez creados los cohetes, y rellena la información, mostraremos el div con la información de los mismos
    divPrintInfo.classList.remove("d-none");
    //Limpio los campos del formulario para que el usuario pueda introducir nuevos datos sin tener que borrar manualmente los anteriores
    var rocketForm = document.getElementById("idRocketForm");
    rocketForm.reset();
}
//Con esta función validamos que el código del cohete contenga 8 caracteres(alfanuméricos)
function validateRocketCode(rocketCode) {
    var regex = /^[0-9a-zA-Z]{8}$/;
    return regex.test(rocketCode.value) ? true : false;
}
//Con el if, comprobamos si existe el objeto carForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (rocketForm) {
    rocketForm.addEventListener('blur', function (event) {
        if (event.target.value != '')
            event.target.classList.remove('is-invalid');
    }, true);
}
