import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket,
              private router: Router ) {
    this.cargarUsuarioStorage();
    this.ckeckStatus();
  }

  ckeckStatus(): any {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarUsuarioStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  // EMITE CUALQUIER EVENTO
  emit(evento: string, payload?: any, callback?: Function): any {
    console.log('Emitiendo mensaje');
    this.socket.emit(evento, payload, callback);
  }

  // ESCUCHA CUALQUIER EVENTO

  listen(evento: string): any {
    return this.socket.fromEvent(evento);
  }

  // LOGIN WS

  loginWS(nombre: string): any {
    // podemos mandar un token de JWT y comprobar que tiene ese token en el lado del server

    // this.socket.emit( 'cofigurar-usuario', { nombre }, ( resp ) => {
    //   console.log(resp);
    // });

    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp) => {

        this.usuario = new Usuario(  nombre );

        this.guardarStorageUsuario();

        resolve();

      });
    });
  }

  // ========================
  //  LOGOUT SOCKET
  // ========================

  logoutWS() {

    this.usuario = null;
    localStorage.removeItem( 'usuario' );

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => {} );
    this.router.navigateByUrl('/');

  }

  getUsuario(): any {
    return this.usuario;
  }

  guardarStorageUsuario(): any {

    localStorage.setItem('usuario', JSON.stringify( this.usuario ));
  }

  cargarUsuarioStorage(): any {
    if ( localStorage.getItem( 'usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem( 'usuario') );

      this.loginWS( this.usuario.nombre );
    }
  }
}
