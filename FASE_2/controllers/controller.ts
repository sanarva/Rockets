//Declaro la varible rocket como si fuera de tipo clase (que es la que hemos creado en el fichero rocket.ts)
let rocket: Rocket;

//Declaro un array para meter los dos objetos cohete que vamos a dar de alta
let rockets: Rocket[] = new Array();

//Declaramos la variable divPrintInfo para poder mostrar y ocultar la información de los cohetes creados
let divPrintInfo:any = document.getElementById("idDivPrintInfo");

//Declaramos la constante rocketForm que recogerá la información de todos los campos del formulario principal. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
const rocketForm:any = document.getElementById("idRocketForm");

 //Creo este array para ir metiendo las potencias y luego llamar a la función join para meterlas en un sólo campo, 
 //separadas por coma (, ).
 let powerArray: number[] = new Array();

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
    let errorCounter:number = checkInfo(rocketCode, thrusterNumber);

    if (errorCounter == 0){
        //Creo el objeto cohete llamando a la clase Rocket y los voy metiendo en un array para tenerlos guardados y poder mostrarlos
        rocket= new Rocket(rocketCode.value.toUpperCase(), Number(thrusterNumber.value));
        rockets.push(rocket);
        
        //Deshabilito los campos principales del formulario y el botón de crear cohete para que no puedan ser
        // modificados mientras se añade la potencia de cada propulsor para ese cohete creado
        rocketCode.disabled = true;
        thrusterNumber.disabled = true;
        btnCreateRocket.disabled = true;

        //Muestro el div que contiene el campo del formulario para añadir la potencia de cada propulsor
        powerForm.classList.remove("d-none"); 
    }
} 

function checkInfo(rocketCode: HTMLInputElement, thrusterNumber: HTMLInputElement){
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


//Con esta función añadiremos la potencia de cada propulsor
function  createPower(){
    let thrusterPower: HTMLInputElement = <HTMLInputElement>document.getElementById("idThrusterPower");
    
    let thrusterPowerNumberic:number = Number(thrusterPower.value);

    if (thrusterPowerNumberic >= 0){
        let power:Power = new Power(Number(thrusterPower.value));
        rocket.addPower(power);

        //Voy metiendo las potencias introducidas en este array para luego pintarlas por pantalla
        powerArray.push(thrusterPowerNumberic);
        
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
        
    } else {
        let errorThrusterPower: HTMLElement = <HTMLElement>document.getElementById("errorThrusterPower");
        thrusterPower.classList.add("is-invalid");
        errorThrusterPower.textContent = "Thruster power should be numeric";
         
    } 
}

//Con esta función muestro la información que vamos dando de
function showInfo(){
    let rocketInfo  = document.getElementById("idDivPrintInfo") as HTMLDivElement;
    let divInfo = document.createElement("div");


    //Al llamar a la función join, meto   
    let infoPower: string = powerArray.join(", ") ; 
    //rocket.powers[i].power

    divInfo.innerHTML = (rocketCode.value + ": " + infoPower  + "<br>");

    rocketInfo.append(divInfo);
 
    //Una vez creados los cohetes, y rellena la información, mostraremos el div con la información de los mismos
    divPrintInfo.classList.remove("d-none"); 

    //Limpio los campos del formulario para que el usuario pueda introducir nuevos datos sin tener que borrar manualmente los anteriores
    let rocketForm: any = document.getElementById("idRocketForm");
    rocketForm.reset();

    //Limpio el array con las potencias del cohete creado para inicializarlo para guardar la info del siguiente cohete
    powerArray = new Array();

    //console.log(rocket);
    console.log(rockets);
    
}

//Con el if, comprobamos si existe el objeto rocketForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (rocketForm){
    rocketForm.addEventListener('blur', (event:any) => {
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
}

//Con el if, comprobamos si existe el objeto powerForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (powerForm){
    powerForm.addEventListener('blur', (event:any) => {
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
}
