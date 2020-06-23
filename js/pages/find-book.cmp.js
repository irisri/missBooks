import {googleBookService} from "../services/googleBook.service.js";
import listOfSearch from "../cmps/list-of-search.cmp.js";

export default {
  template: `
    <section>
        <form @submit.prevent="onSubmit()">
            <h4>Find book</h4>
            <input v-model="searchPrem" ref="search" type="text"/>
            <button>Submit</button>
        </form>
        <ul v-if="isFound">
            <list-of-search v-for="book in searchBooks" :book="book" :key="book.id"></list-of-search>
        </ul>
    </section>
    `,
  data() {
    return {
      searchPrem: null,
      searchBooks: [],
      isFound: false,
    };
  },
  methods: {
    onSubmit() {
      //searchApi
      googleBookService.searchGooleBooks(this.searchPrem).then((res) => {
        this.searchBooks = res;
      });
      this.isFound = !this.isFound;
    },
  },
  components: {
    listOfSearch,
  },
  //   watch: {
  //     searchBooks() {
  //         console.log('updated');
  //     }
  //   }
};
