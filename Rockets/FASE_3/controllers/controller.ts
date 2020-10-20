//Declaro la varible rocket como si fuera de tipo clase (que es la que hemos creado en el fichero rocket.ts)
let rocket: Rocket;

//Declaro un array para meter los dos objetos cohete que vamos a dar de alta
let rockets: Rocket[] = new Array();

//Declaro un array para meter la potencia actual
let currentPowers: CurrentPower[] = new Array();

//Declaramos la variable divPrintInfo para poder mostrar y ocultar la información de los cohetes creados
let divPrintInfo:any = document.getElementById("idDivPrintInfo");

//Declaramos la variable divButtons para poder mostrar y ocultar los botones de acelerar y frenar
let divButtons:any = document.getElementById("idDivButtons");

//Declaramos la constante rocketForm que recogerá la información de todos los campos del formulario principal. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
const rocketForm:any = document.getElementById("idRocketForm");

//Creo este array para ir metiendo las potencias y luego llamar a la función join para meterlas en un sólo campo, 
//separadas por coma (, ).
let ArrayManimunPower: number[] = new Array();

//Declaro una variable donde se guardará la suma de las potencias actuales
let totalCurrentPower:number;

//Declaro una variable donde se guardará la suma de las potencias actuales
let maxPower:number;

//Declaro una variable para meter el código del cohete que se ha seleccionado mediante el radio button
let rocketChecked: any;

//Declaro una variable para tratar el mensaje de error en caso de que se de a los botones "Acelerate" o "Break" sin haber 
//seleccionado ningún cochete
let errorNoRocketSelected: HTMLInputElement = <HTMLInputElement>document.getElementById("idErrorNoRocketSelected");

//Declaro una variable para tratar el mensaje de error en caso de que se llegue a la máxima potencia del propulsor
let messagePower: HTMLInputElement = <HTMLInputElement>document.getElementById("idMessagePower");

//Declaramos la constante powerForm que recogerá la información del campo de potencia del propulsor. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
const powerForm:any = document.getElementById("idPowerForm");

//Declaro una constante para poder habilitar/deshabilitar el botón de crear cohete 
const btnCreateRocket:any = document.getElementById("btnCreateRocket");

//Declaro una constante para poder habilitar/deshabilitar el botón de añadir potencia 
const btnPower:any = document.getElementById("btnPower");


let rocketCode: HTMLInputElement = <HTMLInputElement>document.getElementById("idRocketCode");
let thrusterNumber: HTMLInputElement = <HTMLInputElement>document.getElementById("idThrusterNumber");
 

function createRocket(){
    //Comprobamos si la infomación que está introduciendo el usuario, es coherente.
    let errorCounter:number = checkRocketInfo(rocketCode, thrusterNumber);
    //Comprobamos si el cohete que se quiere crear ya existe
    let errorDuplicateRocket: boolean = findRocket(rocketCode);

    if (errorCounter == 0 && errorDuplicateRocket == false){
        //Creo el objeto cohete llamando a la clase Rocket y los voy metiendo en un array para tenerlos guardados y poder mostrarlos
        rocket= new Rocket(rocketCode.value.toUpperCase(), Number(thrusterNumber.value));
        rockets.push(rocket);

        //Inicializo a 0 las potencias actuales 
        let i:number;
        let currentPower:CurrentPower;

        for (i = 0; i < Number(thrusterNumber.value); i++){
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

function checkRocketInfo(rocketCode: HTMLInputElement, thrusterNumber: HTMLInputElement){
    let errorRocketCode: HTMLElement = <HTMLElement>document.getElementById("errorRocketCode");
    let errorThrusterNumber: HTMLElement = <HTMLElement>document.getElementById("errorThrusterNumber");

    let errorCounter:number = 0;

    if (!validateRocketCode(rocketCode)){
        rocketCode.classList.add("is-invalid");
        errorRocketCode.textContent = "Code Rocket must contain 8 characters";
        errorCounter++;
    }

    if (Number(thrusterNumber.value) < 1 ){
        thrusterNumber.classList.add("is-invalid");
        errorThrusterNumber.textContent = "Thruster number must be greather than 0";
        errorCounter++;
    }

    return errorCounter;
}

//Con esta función validamos que el código del cohete contenga 8 caracteres(alfanuméricos)
function validateRocketCode(rocketCode: HTMLInputElement): boolean{
    var regex = /^[0-9a-zA-Z]{8}$/;
    return regex.test(rocketCode.value) ? true : false;
}

//Con esta función comprobaremos si el cohete existe antes de darlo de alta y si existe, mostraremos un error al usuario
function findRocket(rocketCode:HTMLInputElement){
    let errorRocketCode: HTMLElement = <HTMLElement>document.getElementById("errorRocketCode");
    let errorDuplicateRocket: boolean = false;
    let i: number = 0;

    while (i < rockets.length && errorDuplicateRocket == false){
        if (rocketCode.value == rockets[i].rocketCode){
            errorDuplicateRocket = true;
            rocketCode.classList.add("is-invalid");
            errorRocketCode.textContent = "This rocket already exists. Please, enter another rocket code.";
        } else {
            i++;
        }
    }
    return errorDuplicateRocket;
}

//Con esta función añadiremos la potencia de cada propulsor
function  createPower(){
    let maximumThrusterPower: HTMLInputElement = <HTMLInputElement>document.getElementById("idThrusterPower");
    let maximumThrusterPowerNumberic:number = Number(maximumThrusterPower.value);
    let errorThrusterPowerModulo: boolean = checkThrusterPowerModulo(maximumThrusterPowerNumberic);

    if (maximumThrusterPowerNumberic >= 0 && maximumThrusterPowerNumberic <= 120 && errorThrusterPowerModulo == false){
        let power:Power = new Power(Number(maximumThrusterPower.value));
        rocket.addPower(power);

        //Voy metiendo las potencias introducidas en este array para luego pintarlas por pantalla
        ArrayManimunPower.push(maximumThrusterPowerNumberic);
        
        //Reseteo los campos del formulario de potencias
        powerForm.reset();
        
        //Una vez que hemos añadido todas las potencias para el número de propulsores indicados:
        if (rocket.powers.length == Number(thrusterNumber.value)){

            //Escondo el formulario de potencias
            powerForm.classList.add("d-none"); 

            //Llamo a la función que mostrará por pantalla la información de los cohetes creados
            showInfo();

            //Habilito los campos principales del formulario y el botón de crear cohete para que dar crear nuevos cohetes 
            rocketCode.disabled = false;
            thrusterNumber.disabled = false;
            btnCreateRocket.disabled = false;
        }
        
    } else if (maximumThrusterPowerNumberic < 0 || maximumThrusterPowerNumberic > 120 || isNaN(maximumThrusterPowerNumberic)){
        let errorThrusterPower: HTMLElement = <HTMLElement>document.getElementById("errorThrusterPower");
        maximumThrusterPower.classList.add("is-invalid");
        errorThrusterPower.textContent = "Thruster power must be a value between 0 and 120";   
    } 
}


function checkThrusterPowerModulo(maximumThrusterPowerNumberic:number){
    let maximumThrusterPower: HTMLInputElement = <HTMLInputElement>document.getElementById("idThrusterPower");
    let errorThrusterPower: HTMLElement = <HTMLElement>document.getElementById("errorThrusterPower");
    let errorThrusterPowerModulo: boolean = false;

    if (maximumThrusterPowerNumberic % 10 != 0){  
        maximumThrusterPower.classList.add("is-invalid");
        errorThrusterPower.textContent = "Thruster power must be multiple of 10";
        errorThrusterPowerModulo = true;    
    }

    return errorThrusterPowerModulo;
}

//Con esta función muestro la información de los cohetes y propulsores que vamos creando y modificando
function showInfo(){
    //Este será nuestro div padre que tenemos creado ya en el HTML
    let divInfo  = document.getElementById("idDivPrintInfo") as HTMLDivElement;

    //Creamos un componente de tipo "div"
    let rocketInfo = document.createElement("div");

    //Al llamar a la función join, meto todo lo que hay en el array de potencia máxima, en un string, separado por coma y espacio en este caso   
    let infoPower: string = ArrayManimunPower.join(", ") ; 
    //rocket.powers[i].power

    //Calculamos la suma de la potencia actual
    totalCurrentPower = calculateTotalCurrentPower();

    let rocketIconId: string = "i" + rocketCode.value;
     
    //Montamos el texto que se irá añadiendo cada vez que se cree un cohete 
    rocketInfo.innerHTML = `
        <div class="rocketPrinted"> 
            <input type="radio" name="radioButtonRocket" onclick="hiddeErrorRadio()" value= "${rocketCode.value}">
            Rocket ${rocketCode.value} has ${thrusterNumber.value} thrusters. Maximum power: ${infoPower}. 
            Total current power: <span id= "${rocketCode.value}">${totalCurrentPower}</span>. <br>
            <i class="fas fa-rocket" id="${rocketIconId}"></i>
        </div>
    `;

    //Añadimos el elemento al padre
    divInfo.appendChild(rocketInfo);
    
 
    //Una vez creados los cohetes, y rellena la información, mostraremos el div con la información de los mismos ...
    divPrintInfo.classList.remove("d-none"); 

    //...y también mostraremos los botones para poder acelerar o frenar
    divButtons.classList.remove("d-none");
    

    //Limpio los campos del formulario para que el usuario pueda introducir nuevos datos sin tener que borrar manualmente los anteriores
    let rocketForm: any = document.getElementById("idRocketForm");
    rocketForm.reset();

    //Limpio el array con las potencias del cohete creado para inicializarlo para guardar la info del siguiente cohete
    ArrayManimunPower = new Array();

    //Limpio el array con las potencias actuales del cohete para inicializarlo para guardar la info siguiente 
    currentPowers = new Array();

    console.log(rockets);
    
}

function calculateTotalCurrentPower(){
    let i: number = 0;
    totalCurrentPower = 0;
    for (i; i < currentPowers.length; i++){
        totalCurrentPower += currentPowers[i].currentPower;
    }
    return totalCurrentPower;
}


//Recuperamos la información del cohete seleccionado y damos error si no hay ninguno seleccionado
function retrieveInfoRocketChecked(action: string){
    //Inicializo la variable
    rocketChecked = "";
    
    //Con este código, recuperamos el valor (código del cohete) que tiene el radio button que hemos seleccionado
    let radioButtonRockets:any= document.getElementsByName("radioButtonRocket");
    let i: number = 0;

    while (i < radioButtonRockets.length  && rocketChecked == ""){
        if (radioButtonRockets[i].checked) { 
            rocketChecked = radioButtonRockets[i].value;   
        } else {
            i++;
        }
    }

    //Devolvemos un error si no se ha selecionado ningún cohete
    if (rocketChecked === ""){
        errorNoRocketSelected.classList.add("d-block");
        return rocketChecked;
    } 
    
    //Calculamos la potencia total máxima
    maxPower = 0;
    for (let j = 0; j < rockets[i].powers.length; j++){
        maxPower += rockets[i].powers[j].power;
    }

    //Calculamos la potencia total actual
    totalCurrentPower = 0;
    for (let j = 0; j < rockets[i].currentPowers.length; j++){
        totalCurrentPower += rockets[i].currentPowers[j].currentPower;
    }
    
    //Comprobamos que no se haya llegado a la potencia máxima y se esté intentado acelerar 
    if (totalCurrentPower == maxPower && action == "acelerate"){
        messagePower.textContent = "This rocket has reached its maximum power: " + maxPower;
        messagePower.classList.add("d-block");
        //Ocultamos el error a los 3 segundos
        setTimeout(function() {
            messagePower.classList.remove("d-block"); 
        },3000);
    }

    //Comprobamos que no se haya llegado a la potencia mínima y se esté intentado frenar
    if (totalCurrentPower == 0 && action == "toBreak"){
        messagePower.textContent = "This rocket has reached its minimum power: 0";
        messagePower.classList.add("d-block");
        //Ocultamos el error a los 3 segundos
        setTimeout(function() {
            messagePower.classList.remove("d-block"); 
        },3000);
        
    }

    //Recuperamos la potencia actual del cohete seleccionado, hacemos comprobaciones y llamamos al método correspondiente
    for (let j = 0; j < rockets[i].currentPowers.length; j++){
        //Si la potencia actual parcial es menor que la potencia máxima parcial y se ha pulsado el botón de acelerar, 
        if((rockets[i].currentPowers[j].currentPower < rockets[i].powers[j].power) && action == "acelerate"){  
            //Llamamos al método acelerateThruster() para acelerar
            rockets[i].currentPowers[j].acelerateThruster();        
        }
        //Si la potencia actual parcial es mayor que cero y se ha pulsado el botón de frenar,
        if((rockets[i].currentPowers[j].currentPower > 0) && action == "toBreak"){  
            //Llamamos al método breakThruster() para frenar
            rockets[i].currentPowers[j].breakThruster();        
        }
    }

    //Calculamos la potencia total actual
    totalCurrentPower = 0;
    for (let j = 0; j < rockets[i].currentPowers.length; j++){
        totalCurrentPower += rockets[i].currentPowers[j].currentPower;
    }

    updateInfo(rocketChecked, totalCurrentPower);
    
    let rocketIconId ="i"+rocketChecked;
    moveRocket(rocketIconId, totalCurrentPower);


}
    
function updateInfo(rocketChecked:string, totalCurrentPower:number ){
    //Actualizamos la potencia total actual
    let childDiv: any = document.getElementById(rocketChecked);
    childDiv.innerHTML = totalCurrentPower;
}


function moveRocket(rocketIconId:string, totalCurrentPower:number ){
    let rocketIcon: any = document.getElementById(rocketIconId);
    let movementRocket: string = totalCurrentPower + "px"
    rocketIcon.style.paddingLeft = movementRocket;
}

//Con el if, comprobamos si existe el objeto rocketForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (rocketForm){
    rocketForm.addEventListener("blur", (event:any) => {
    if (event.target.value != "") event.target.classList.remove("is-invalid");
    },  true); 
}


//Con el if, comprobamos si existe el objeto powerForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (powerForm){
    powerForm.addEventListener("blur", (event:any) => {
    if (event.target.value != "") event.target.classList.remove("is-invalid");
    },  true); 
}


//Con esta función, eliminaremos el error de que no se ha seleccionado ningun cohete, el cuál aparece cuando aceleramos
//o frenamos y no hay ningún radio button seleccionado
function hiddeErrorRadio() {
    errorNoRocketSelected.classList.remove("d-block");
} 