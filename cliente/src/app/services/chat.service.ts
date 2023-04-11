import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //cada vez que se cambien los datos del servidor esa variable se modifica en el component
  conectadosService = new BehaviorSubject<any[]>([]);
  MensajeService = new BehaviorSubject<any[]>([])

  constructor(private socket: SocketService) {
    this.socket.io.on('mensaje', (mensajeChat: any) => {
      //todo lo que ya tenia en el arreglo mas este nuevo contenido
      this.MensajeService.next([...this.MensajeService.getValue(), mensajeChat]);
    });

    this.socket.io.on('usuarios-conectados', (usuariosConectados: any) => {
      this.conectadosService.next(usuariosConectados);
    });

    this.socket.io.on('mensaje-sistema', (mensajeSistema: any) => {
      console.log(mensajeSistema);
    })
  }
public verUsuarios(){
  this.socket.io.emit('verUsuarios')
}

  public userConnection(nombreUsuario: String) {
    this.socket.io.emit('usuario-conectado', nombreUsuario)
  }
  public userMessage(mensaje: String) {
    this.socket.io.emit('nuevo-mensaje', mensaje)
  }
}
