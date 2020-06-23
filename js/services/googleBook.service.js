import utilService from './util.service.js';
import { bookService } from "../services/book.service.js";

const API_KEY = 'AIzaSyAR9rcf1rA0DhN1LfaBkRzlI3AtruzWcMQ';
const SAVE_KEY = 'googleSearch'

export const googleBookService = {
    searchGooleBooks,
    addGoogleBook
}

function searchGooleBooks(searchPram) {
    var api = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchPram}&key=${API_KEY}`;
    return axios.get(api)
        .then(resolve => {
            utilService.saveToStorage(SAVE_KEY, resolve.data.items);
            return resolve.data.items;
        })
}

function addGoogleBook(googleBooke) {
    let book = {
        'id': googleBooke.id,
        'title': googleBooke.volumeInfo.title,
        'subtitle': googleBooke.volumeInfo.subtitle,
        'authors': googleBooke.volumeInfo.authors,
        'publishedDate': googleBooke.volumeInfo.publishedDate,
        'description': googleBooke.volumeInfo.description,
        'pageCount': googleBooke.volumeInfo.pageCount,
        'categories': googleBooke.volumeInfo.categories,
        'thumbnail': googleBooke.volumeInfo.imageLinks.thumbnail,
        'language': googleBooke.volumeInfo.language,
    }
    if (googleBooke.saleInfo.listPrice) {
        book.listPrice = googleBooke.saleInfo.listPrice;
        book.listPrice.isOnSale = false;
    } else console.log('no sale info');
    bookService.addBookFromGoogle(book);
}

// https://www.googleapis.com/books/v1/volumes?printType=books&q=harry%20potter&key=AIzaSyAR9rcf1rA0DhN1LfaBkRzlI3AtruzWcMQ
// https://www.googleapis.com/books/v1/volumes?q=harry%20potter&key=AIzaSyAR9rcf1rA0DhN1LfaBkRzlI3AtruzWcMQ