export class Dias {
    dia: string;
    fecha: Date;
    fotoUrl!: string;

    constructor(dia: string, fecha: Date) {
        this.dia = dia;
        this.fecha = fecha;
    }
}
