import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../@types/book-types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  books: Book[] = [];
  query: string = '';
  book: any = {}; // Armazena o livro que está sendo editado
  isModalOpen = false;
  currentRating: number = 0; // Para armazenar a nota do livro

  constructor(
    private readonly bookService: BooksService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const result = await this.bookService.get();
    this.books = result.items;
  }

  async searchBooks() {
    const result = await this.bookService.search(this.query.trim());
    this.books = result.items;
  }

  addFavorite(book: Book) {
    this.bookService.addFavorite(book);
  }

  navigateFavorites() {
    this.router.navigate(['/favorites']);
  }

  navigateHome() {
    this.router.navigate(['/']);
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

    // Atualiza nos favoritos, se necessário
    this.bookService.updateFavorite(this.book); 

    this.closeModal(); // Fecha o modal após salvar
  }

  // Fecha o modal
  closeModal() {
    this.isModalOpen = false; // Fecha o modal
  }
}
