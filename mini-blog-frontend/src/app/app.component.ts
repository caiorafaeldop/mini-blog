import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PostListComponent, HttpClientModule, ToastModule],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>
    <div class="layout-wrapper" style="background-color: #f8f9fa; min-height: 100vh;">
      <div class="p-4" style="max-width: 800px; margin: 0 auto;">
         <app-post-list></app-post-list>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'mini-blog-frontend';
}
