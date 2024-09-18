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
    console.log(result);
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
}
