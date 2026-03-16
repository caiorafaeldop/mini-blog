import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // É assim que chamaremos no HTML
  standalone: true
})
export class HighlightDirective {
  // @HostBinding permite grudar uma variável nossa diretamente em uma propriedade do HTML (DOM)
  // Neste caso, se a variável 'isHovered' for true, ele vai adicionar a classe CSS 'surface-hover'
  @HostBinding('class.surface-hover') isHovered = false;

  // Precisamos injetar o ElementRef só se fossemos mexer no estilo diretamente via JS
  // ex: this.el.nativeElement.style.backgroundColor = 'yellow';
  constructor(private el: ElementRef) { }

  // @HostListener é o "ouvido" da diretiva. Ele escuta eventos do navegador naquele elemento.
  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true; // Quando o mouse entra, liga o hover
    
    // Bônus: Mudando o cursor pra mostrar que é clicável (opcional)
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.transition = 'all 0.2s';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false; // Quando o mouse sai, desliga o hover
  }
}
