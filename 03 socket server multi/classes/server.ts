
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';
import { configurarUsuario } from '../sockets/socket';



export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }


    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // console.log('Cliente conectado');
            console.log( cliente.id )

            // Configuración de mapas
            socket.mapaSockets( cliente, this.io );

            // conectar cliente 
            socket.conectarCliente( cliente, this.io );

            // configurar usuario
            socket.configurarUsuario( cliente, this.io );

            // OBTENER usuarios activos
            socket.obtenerUsuarios( cliente, this.io );

            // Mensajes
            socket.mensaje( cliente, this.io );
            

            // Desconectar
            socket.desconectar( cliente , this.io );      
            


        });

    }


    start( callback: Function ) {

        this.httpServer.listen( this.port, callback );

    }

}