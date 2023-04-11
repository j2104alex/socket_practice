import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  active: Boolean = true;
  usuariosConectados: any;
  mensajes: any = [];
  nombreUsuario: String = "";
  mensaje: String = '';

  constructor(private chat: ChatService) {
    this.chat.conectadosService.subscribe(conectadosService => {
      this.usuariosConectados = conectadosService;
    })

    this.chat.MensajeService.subscribe(MensajeService => {
      console.log(MensajeService)
      this.mensajes = MensajeService;
    })
  }

  conectar() {
    if (this.nombreUsuario != '') {
      this.chat.userConnection(this.nombreUsuario);
      this.active = false;
    }
    else (
      alert('Ingrese un nombre')
    )
  }

  enviarMensaje() {
    if (this.mensaje.trim() != '') {
      this.chat.userMessage(this.mensaje);
      this.mensaje = '';
    }
  }
}
