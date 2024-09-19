import { Component, OnInit } from '@angular/core';
import { Book } from '../../@types/book-types';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importando o FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionando FormsModule
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  books: Book[] = [];
  book: any = {}; // Livro que será editado
  isModalOpen = false; // Controle para abrir/fechar o modal
  currentRating: number = 0; // Para armazenar a nota do livro

  constructor(
    private readonly bookService: BooksService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const result = this.bookService.getFavorite();
    this.books = result;
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  removeFavorite(id: string) {
    const newList = this.bookService.removeFavorite(id);
    this.books = newList;
  }

  // Abre o modal e carrega as informações do livro
  editBook(book: any) {
    this.book = { ...book }; // Clonando o objeto do livro para edição
    this.currentRating = this.book.rating || 0; // Definindo a nota atual
    this.isModalOpen = true; // Abre o modal
  }

  // Define a nota de 1 a 5 estrelas
  setRating(rating: number) {
    this.currentRating = rating;
  }

  // Salva as alterações feitas no modal
  saveBookChanges() {
    // Atualizando os dados do livro com as informações do modal
    this.book.rating = this.currentRating; // Salvando a nota
    this.book.tags = this.book.tags ? this.book.tags.split(',').map((tag: string) => tag.trim()) : []; // Salvando as tags

    const index = this.books.findIndex(b => b.id === this.book.id);
    
    if (index !== -1) {
      this.books[index] = { ...this.book }; // Atualiza o livro no array
    }

    // Atualizando nos favoritos
    this.bookService.updateFavorite(this.book);

    this.closeModal(); // Fecha o modal após salvar
  }

  // Fecha o modal
  closeModal() {
    this.isModalOpen = false; // Fecha o modal
  }
}
