import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Post, Usuario } from '../../services/api.service';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { LoginModalComponent } from '../login-modal/login-modal';
import { MessageService } from 'primeng/api';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  // Removi coisas que fomos pro post-item, e coloquei o próprio post-item nos imports:
  imports: [CommonModule, ButtonModule, MessagesModule, InputTextareaModule, FormsModule, LoginModalComponent, PostItemComponent],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.scss']
})
export class PostListComponent implements OnInit {

  @ViewChild('loginModal') loginModal!: LoginModalComponent;

  posts: Post[] = [];
  usuarioLogado: Usuario | null = null;
  novoConteudo: string = '';

  constructor(private api: ApiService, private msgs: MessageService) {
    // Check localStorage (simulando estado global)
    const storedUser = localStorage.getItem('miniblog_user');
    if (storedUser) {
      this.usuarioLogado = JSON.parse(storedUser);
    }
  }

  ngOnInit() {
    this.carregarPosts();
  }

  carregarPosts() {
    this.api.getPosts().subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error(err)
    });
  }

  mostrarLogin() {
    this.loginModal.abrir();
  }

  onLoginSucesso(user: Usuario) {
    this.usuarioLogado = user;
    localStorage.setItem('miniblog_user', JSON.stringify(user));
    this.msgs.add({severity:'success', summary:'Logado', detail:`Bem-vindo(a) ${user.email}!`});
  }

  logout() {
    this.usuarioLogado = null;
    localStorage.removeItem('miniblog_user');
    this.msgs.add({severity:'info', summary:'Deslogado', detail:'Você saiu do sistema'});
  }

  publicarPost() {
    if (!this.usuarioLogado || !this.novoConteudo.trim()) return;

    const novoPost: Post = {
      conteudo: this.novoConteudo,
      autor: this.usuarioLogado
    };

    this.api.criarPost(novoPost).subscribe({
      next: (post) => {
        this.msgs.add({severity:'success', summary:'Sucesso', detail:'Post publicado!'});
        this.novoConteudo = ''; // limpa form
        this.carregarPosts(); // atualiza lista
      },
      error: (e) => this.msgs.add({severity:'error', summary:'Erro', detail:'Não foi possível publicar.'})
    });
  }

  // O <app-post-item> vai avisar a gente que alguém curtiu o post. 
  // Nós escutamos aquele Output e fazemos alguma coisa na nossa lista mestra!
  onCurtirPost(postFoiCurtido: Post) {
    if(!this.usuarioLogado) {
       this.msgs.add({severity:'warn', summary:'Ops', detail:'Você precisa estar logado para curtir!'});
       return;
    }
    this.msgs.add({severity:'info', summary:'Curtida', detail:`Você curtiu o post de ${postFoiCurtido.autor.email}!`});
  }
}
