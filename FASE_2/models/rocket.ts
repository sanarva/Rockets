class Rocket{
    rocketCode:string;
    thrusterNumber:number;
    powers:Power[]=new Array();
     
    constructor(rocketCode:string,thrusterNumber:number){
        this.rocketCode=rocketCode;
        this.thrusterNumber=thrusterNumber;
    }

    addPower(power:Power):void{
        this.powers.push(power);
    }
}