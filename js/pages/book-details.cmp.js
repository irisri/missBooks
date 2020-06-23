import longText from "../cmps/long-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";
import { bookService } from "../services/book.service.js";

export default {
  template: `
        <section class="book-details" v-if="book">
            <button @click="close">X</button>
            <div>
                <img v-bind:src="book.thumbnail" />
                <h3>{{book.title}}</h3>
                <p :class="{red: isExpensive, green: isCheap}">Price: {{showCurrency}}</p>
                <p>Pages: {{book.pageCount}} {{showReading}}</p>
                <p>Published at: {{book.publishedDate}} {{showNewOrOld}}</p>
                <long-text :txt="book.description" />
                <div class="sale" v-if="book.listPrice.isOnSale">
                    <p>Sale</p>
                </div>
                <div :reviews="book.reviews" v-if="book.reviews" class="reviews">
                  <div v-for="review in reviewsWithDate" :review="review" :key="review.id">
                    <h4>Book reviews</h4>
                    <button>X</button>
                    <p>Review by: {{review.userName}} from the {{review.date}}</p>
                    <p>Rated: {{review.rate}}</p>
                    <p>{{review.txt}}</p>
                  </div>
                </div>
                <review-add :bookId="book.id" @onReview="setReview"/>
            </div>
        </section>
    `,
  data() {
    return {
      book: null,
      isSale: null,
    };
  },
  computed: {
    showReading() {
      const pageAmount = this.book.pageCount;
      if (pageAmount > 500) return "- Decent Reading";
      else if (pageAmount > 200) return "- Long reading";
      else return "- Light Reading";
    },

    reviewsWithDate() {
      return this.book.reviews.map(review => {
        review.date = this.localTime(review.date);
        return review;
      }) 
    },

    isCheap() {
      return this.book.listPrice.amount < 20;
    },

    isExpensive() {
      return this.book.listPrice.amount > 150;
    },

    showCurrency() {
      const currency = this.book.listPrice.currencyCode;
      if (currency === "EUR")
        return (this.price = this.book.listPrice.amount + "€");
      else if (currency === "ILS")
        return (this.price = "₪" + this.book.listPrice.amount);
      else return (this.price = "$" + this.book.listPrice.amount);
    },

    showNewOrOld() {
      const publishedYear = this.book.publishedDate;
      let now = new Date();
      now = now.getFullYear();
      if (now - publishedYear > 10) return "- Veteran Book";
      if (now - publishedYear < 1) return "- New!";
    },
  },

  methods: {
    close() {
      this.$router.push("/book");
    },
    
    localTime(date) {
      return new Date(date).toLocaleDateString("en-US");
    },
    
    setReview() {
      const { bookId } = this.$route.params;
      bookService.getBookById(bookId).then((book) => (this.book = book));
    },
  },

  created() {
    const { bookId } = this.$route.params;
    bookService.getBookById(bookId).then((book) => {
      bookService.createReviews(book);
      this.book = book;
    });
  },
  components: {
    longText,
    reviewAdd,
  },
};
