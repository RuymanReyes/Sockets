import { Usuario } from './usuario';
// ========================
//  En este lugar tendrá toda la lógica centralizada para agregar, mandar mensaje... 
// ========================



export class UsuarioLista {
    private lista: Usuario[] = []

    constructor() {}

    // ========================
    //  Agregar Usuarios 
    // ========================

    public agregar( usuario: Usuario) {
        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    // ========================
    //  Actualizar usuarios 
    // ========================
    public actualizarNombre ( id: string, nombre: string ) {


    // ================================================================================================
    //  Si esto lo hicieramos en una BD sería diferente habría que buscar en la _BD a ese usuario 
    //  Aquí como lo tenemos guardado en una constante lo hacemos de esta manera. 
    // ================================================================================================

        for( let usuario of this.lista ) {
            if( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }


        console.log('===== Actualizando usuario =======');
        console.log(this.lista);
    }

    // ==========================
    //  OBTENER LISTA DE USUARIO
    // ========================== 

    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' ); 
    }

    public getUsuario ( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    // =========================================
    //  obtener usuarios de una sala particular 
    // ==========================================


    public getUsuariosSala( sala: string ){
        return this.lista.filter( usuario => usuario.sala === sala )
    }

    // ========================
    //  borrar usuario
    // ========================

    public borrarUsuario( id: string ) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id;
        })

        return tempUsuario;
    }
}