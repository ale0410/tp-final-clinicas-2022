export class Encuesta {
    muy_buena:number;
    buena:number;
    regular:number;
    mala:number;
    muy_mala:number;
    fecha:any;

    constructor(muyBueno:number, bueno:number, reg:number, mal:number, muyMal:number){
        this.muy_buena=muyBueno;
        this.buena=bueno;
        this.regular=reg;
        this.mala=mal;
        this.muy_mala=muyMal;
    }
}
