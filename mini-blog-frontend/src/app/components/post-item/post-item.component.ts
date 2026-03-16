import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Post } from '../../services/api.service';
import { ResumoPipe } from '../../pipes/resumo.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-post-item', // É com esse nome que vamos chamar ele no HTML!
  standalone: true,
  // Nós importamos aqui as coisas que esse *pequeno bloco* vai precisar pra funcionar
  imports: [CommonModule, CardModule, ButtonModule, ResumoPipe, HighlightDirective],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  
  // @Input significa "Porta de Entrada".
  // Quem for chamar o <app-post-item> VAI TER QUE mandar um Post pra cá via atributo.
  @Input() post!: Post;

  // @Output significa "Alto Falante / Megafone".
  // Nosso botão vai disparar um som aqui que o componente pai pode ou não ficar ouvindo.
  @Output() curtir = new EventEmitter<Post>();

  onCurtirClick() {
    // Quando o usuário clica no botão curtir dentro desse post, nós disparamos o megafone:
    // "Aee, alguém clicou aqui! O post que foi clicado é esse aqui: this.post"
    this.curtir.emit(this.post);
  }
}
