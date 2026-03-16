import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  email: string;
  senha?: string;
}

export interface Post {
  id?: number;
  conteudo: string;
  dataCriacao?: string;
  autor: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // POSTS
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`);
  }

  criarPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}/posts`, post);
  }

  // USUARIOS
  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios/cadastrar`, usuario);
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios/login`, usuario);
  }
}
