package com.miniblog.backend.controller;

import com.miniblog.backend.entity.Post;
import com.miniblog.backend.entity.Usuario;
import com.miniblog.backend.repository.PostRepository;
import com.miniblog.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    private final PostRepository postRepository;
    private final UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Post> listarPosts() {
        return postRepository.findAllByOrderByDataCriacaoDesc();
    }

    @PostMapping
    public ResponseEntity<Post> criarPost(@RequestBody Post request) {
        if (request.getAutor() == null || request.getAutor().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Usuario autor = usuarioRepository.findById(request.getAutor().getId()).orElse(null);
        if (autor == null) {
            return ResponseEntity.badRequest().build();
        }

        request.setAutor(autor);
        Post postSalvo = postRepository.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(postSalvo);
    }
}
