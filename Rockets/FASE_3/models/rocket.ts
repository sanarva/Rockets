class Rocket{
    rocketCode:string;
    thrusterNumber:number;
    powers:Power[]=new Array();
    currentPowers:CurrentPower[]=new Array();
     
    constructor(rocketCode:string,thrusterNumber:number){
        this.rocketCode=rocketCode;
        this.thrusterNumber=thrusterNumber;
    }

    get _rocketCode():string {
        return this.rocketCode;
    }

    get _powers():Power[] {
        return this.powers;
    }

    get _currentPowers():CurrentPower[] {
        return this.currentPowers;
    } 

    set _currentPowers(currentPowers) {
        this.currentPowers = currentPowers;
    }




    addPower(power:Power):void{
        this.powers.push(power);
    }

    addCurrentPower(currentPower:CurrentPower):void{
        this.currentPowers.push(currentPower);
    }

}