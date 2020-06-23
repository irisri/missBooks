import { bookService } from "../services/book.service.js";

import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";

export default {
  template: `
    <main class="book-app">
        <book-filter class="flex" @filter="setFilter"/>
        <book-list v-bind:books="booksToShow"/>
    </main>
    `,
  data() {
    return {
      books: [],
      filterBy: {
        name: "",
        fromPrice: "",
        toPrice: "",
      },
    };
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    booksToShow() {
      var filterBy = this.filterBy;
      if (!filterBy) return this.books;
      var filteredBooks = this.books.filter((book) => {
        return book.title.toLowerCase().includes(filterBy.name.toLowerCase());
      });
      filteredBooks = filteredBooks.filter((book) => {
        if (!filterBy.toPrice || !filterBy.toPrice) return true;
        var price = book.listPrice.amount;
        return price >= filterBy.fromPrice && price <= filterBy.toPrice;
      });
      return filteredBooks;
    },
  },
  components: {
    bookList,
    bookFilter
  },
  created() {
    bookService.getBooks().then(books => this.books = books);
  },
};
