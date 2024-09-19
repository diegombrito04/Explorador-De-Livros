import { Injectable } from '@angular/core';
import { Book } from '../@types/book-types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor() {}

  async get() {
    const response = await fetch(`${this.apiURL}science&maxResults=20`);
    const data = await response.json();

    return data;
  }

  async search(query: string) {
    const response = await fetch(`${this.apiURL}${query}&maxResults=20`);
    console.log(`${this.apiURL}${query}`);
    const data = await response.json();

    return data;
  }

  getFavorite(): Book[] {
    const favorites = localStorage.getItem('favorites') || '[]';

    if (!favorites) {
      console.log('Não tem nenhum livro nos favoritos');
    }

    return JSON.parse(favorites);
  }

  addFavorite(book: Book) {
    const favorites = this.getFavorite();
    const exists = favorites.findIndex((item) => item.id === book.id);

    if (exists === -1) {
      return localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, book])
      );
    }

    alert('O livro já está nos favoritos!');
  }

  removeFavorite(id: string) {
    const favorites = this.getFavorite();
    const filterData = favorites.filter((item) => item.id !== id);

    localStorage.setItem('favorites', JSON.stringify(filterData));
    return filterData;
  }

  updateFavorite(updatedBook: Book) {
    const favorites = this.getFavorite();
    const index = favorites.findIndex(book => book.id === updatedBook.id);
  
    if (index !== -1) {
      favorites[index] = { ...updatedBook }; // Atualiza o livro com as novas informações
      localStorage.setItem('favorites', JSON.stringify(favorites)); // Persiste no localStorage
    }
  }
  
}
