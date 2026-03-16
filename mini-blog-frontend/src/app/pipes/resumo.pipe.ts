import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo',
  standalone: true
})
export class ResumoPipe implements PipeTransform {
  // O método 'transform' é onde a mágica acontece.
  // 'value' é o texto original que o Angular nos envia do HTML.
  // 'tamanhoMaximo' é um parâmetro opcional (ex: 50 caracteres).
  transform(value: string | undefined, tamanhoMaximo: number = 50): string {
    // Se não tiver texto, retorna vazio
    if (!value) {
      return '';
    }

    // Se o texto já for pequeno o suficiente, retorna ele inteiro
    if (value.length <= tamanhoMaximo) {
      return value;
    }

    // Caso contrário, corta o texto e adiciona "..." no final
    return value.substring(0, tamanhoMaximo) + '...';
  }
}
