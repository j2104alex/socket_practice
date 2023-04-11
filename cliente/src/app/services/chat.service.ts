import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //cada vez que se cambien los datos del servidor esa variable se modifica en el component
  conectadosService = new BehaviorSubject<any[]>([]);
  MensajeService = new BehaviorSubject<any[]>([])

  constructor(private socket: SocketService, private toastr:ToastrService) {
    this.socket.io.on('mensaje', (mensajeChat: any) => {
      //todo lo que ya tenia en el arreglo mas este nuevo contenido
      //next funciona como un push
      this.MensajeService.next([...this.MensajeService.getValue(), mensajeChat]);
    });

    this.socket.io.on('usuarios-conectados', (usuariosConectados: any) => {
      this.conectadosService.next(usuariosConectados);
    });

    this.socket.io.on('mensaje-sistema', (mensajeSistema: any) => {
      this.toastr.success(mensajeSistema.usuario,mensajeSistema.mensaje);
     
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
