import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ApiService, Usuario } from '../../services/api.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, InputTextModule, ButtonModule, MessagesModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.scss']
})
export class LoginModalComponent {

  @Output() loginSucesso = new EventEmitter<Usuario>();

  display: boolean = false;

  email = '';
  senha = '';
  erroMsg = '';

  constructor(private api: ApiService) {}

  abrir() {
    this.email = '';
    this.senha = '';
    this.erroMsg = '';
    this.display = true;
  }

  fechar() {
    this.display = false;
  }

  cadastrar() {
    if (!this.validarCampos()) return;

    this.api.cadastrarUsuario({ email: this.email, senha: this.senha }).subscribe({
      next: (user) => {
        this.loginSucesso.emit(user);
        this.fechar();
      },
      error: (err) => {
        this.erroMsg = err.error || 'Erro ao cadastrar.';
      }
    });
  }

  logar() {
    if (!this.validarCampos()) return;

    this.api.login({ email: this.email, senha: this.senha }).subscribe({
      next: (user) => {
        this.loginSucesso.emit(user);
        this.fechar();
      },
      error: (err) => {
        this.erroMsg = typeof err.error === 'string' ? err.error : 'E-mail ou senha inválidos.';
      }
    });
  }

  private validarCampos(): boolean {
    if (!this.email || !this.senha) {
      this.erroMsg = 'Preencha todos os campos';
      return false;
    }
    this.erroMsg = '';
    return true;
  }
}
