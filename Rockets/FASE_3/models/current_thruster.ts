class CurrentPower{
    public currentPower:number;
     
    constructor(currentPower:number){
        this.currentPower=currentPower;
    }
   
    //Añadimos los métodos acelerar y frenar para modificar la potencia actual de los propulsores
    acelerateThruster(){
        this.currentPower += 10;
    }

    breakThruster(){
        this.currentPower -= 10;
    }
}
