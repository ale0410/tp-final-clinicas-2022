export class Comentario {
    preg1;
    preg2;
    preg3;
    preg4:[boolean, boolean, boolean];
    comentario:string;
    fecha:string;

    constructor(preg1:any, preg2:any, preg3:any, preg4:[boolean, boolean, boolean], comentario:string, fecha:string){
        this.preg1=preg1;
        this.preg2=preg2;
        this.preg3=preg3;
        this.preg4=preg4;
        this.comentario=comentario;
        this.fecha=fecha;
    }
}
