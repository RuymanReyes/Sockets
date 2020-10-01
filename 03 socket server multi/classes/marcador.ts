

export class Marcador {


    // ========================================================================
    //  Podemos mandarlo como hicimos en el usuario, pero también 
    //  según TS podemos hacerlo de esta manera que es más corta 
    // ========================================================================
    constructor(
        public id: string,
        public nombre: string, 
        public lng: number,
        public lat: number,
        public color?: string

    ) {}

    
}