//Declaro la varible rocket[i] como si fuera de tipo clase (que es la que hemos creado en el fichero rocket.ts)
let rocket: Rocket;

//Declaro un array (tupple) para meter los dos objetos cohete que vamos a dar de alta
let rocketArray: any[] = new Array();

//Declaramos la constante divPrintInfo para poder mostrar y ocultar la información de los cohetes creados
const divPrintInfo:any = document.getElementById("idDivPrintInfo");

//Declaramos la constante rocketForm que recogerá la información de todos los campos del formulario principal. 
//Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo
const rocketForm:any = document.getElementById("idRocketForm");


let rocketCode: HTMLInputElement = <HTMLInputElement>document.getElementById("idRocketCode");
let thrusterNumber: HTMLInputElement = <HTMLInputElement>document.getElementById("idThrusterNumber");
 



function createRocket(){
    //Comprobamos si la infomación que está introduciendo el usuario, es coherente.
    let errorCounter:number = checkInfo(rocketCode, thrusterNumber);

    if (errorCounter == 0){
        //Creo el objeto cohete llamando a la clase Rocket y los voy metiendo en un array para tenerlos guardados y poder mostrarlos
        rocket= new Rocket(rocketCode.value.toUpperCase(), Number(thrusterNumber.value));
        rocketArray.push(rocket);
        
        console.log(rocketArray);

        //Llamo a la función que mostrará por pantalla la información de los cohetes creados
        showInfo();
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

    if (thrusterNumber.value < 1 ){
        thrusterNumber.classList.add("is-invalid");
        errorThrusterNumber.textContent = "Thruster number must be greather than 0";
        errorCounter++;
    }

    return errorCounter;
}



function showInfo(){
    let rocketInfo  = document.getElementById("idDivPrintInfo") as HTMLDivElement;
    let divInfo = document.createElement("div");

    divInfo.innerHTML = ("Rocket: " + rocketCode.value + " has " +  thrusterNumber.value + " thrusters." + "<br>");

    rocketInfo.append(divInfo);
 
    //Una vez creados los cohetes, y rellena la información, mostraremos el div con la información de los mismos
    divPrintInfo.classList.remove("d-none"); 

    //Limpio los campos del formulario para que el usuario pueda introducir nuevos datos sin tener que borrar manualmente los anteriores
    let rocketForm: any = document.getElementById("idRocketForm");
    rocketForm.reset();
}  


//Con esta función validamos que el código del cohete contenga 8 caracteres(alfanuméricos)
function validateRocketCode(rocketCode: HTMLInputElement): boolean{
    var regex = /^[0-9a-zA-Z]{8}$/;
    return regex.test(rocketCode.value) ? true : false;
}


//Con el if, comprobamos si existe el objeto carForm. Si existe, creamos el evento blur que es el que tiene lugar 
//cuando se aleja el foco de un campo 
if (rocketForm){
    rocketForm.addEventListener('blur', (event:any) => {
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
}