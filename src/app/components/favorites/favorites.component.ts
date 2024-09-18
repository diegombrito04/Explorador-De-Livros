import { Component, OnInit } from '@angular/core';
import { Book } from '../../@types/book-types';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private readonly bookService: BooksService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
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
}
