import { Injectable } from '@angular/core';
/** un "observable" es una fuente de datos que emite valores a 
 * lo largo del tiempo. Puedes pensar en un observable como una 
 * corriente de datos que fluye continuamente. Los observables 
 * son muy útiles para trabajar con eventos asíncronos en Angular, 
 * como las respuestas de una API o las interacciones del usuario. 
 * Puedes suscribirte a un observable para recibir sus valores y actuar 
 * en consecuencia, ya sea actualizando la vista o realizando otras tareas.
 * En resumen, los observables son una herramienta fundamental para manejar 
 * datos asíncronos en aplicaciones Angular. */
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: SocketService) { }

  public userConnection(nombreUsuario: String): void {
    this.socket.io.emit('usuario-conectado', nombreUsuario)
  }
  public userMessage(mensaje: String): void {
    this.socket.io.emit('nuevo-mensaje', mensaje)
  }
  public onUserConection(): Observable<any> {
    return new Observable(observer => {
      this.socket.io.on('userConected', data => {
        observer.next(data)
      })
    })
  }
}