import { bookService } from "../services/book.service.js";

export default {
  props: ["bookId"],
  template: `
    <form @submit.prevent="onSubmit(bookId)">
        <h4>Please add a review</h4>
        <input v-model="userName" ref="userName" type="text"/>
        <input v-model="rate" type="range" min="1" max="5">
        <input v-model="date" type="date" value="localTime"/>
        <div>
            <textarea v-model="txt"></textarea>
        </div>
        <button>Submit</button>
    </form>
    `,
  data() {
    return {
      userName: "Books Reader",
      rate: 1,
      date: Date.now(),
      txt: null,
    };
  },
  methods: {
    setFocus() {
      this.$refs.userName.focus();
    },

    onSubmit(id) {
      const reviewObj = {
        userName: this.userName,
        rate: this.rate,
        date: this.date,
        txt: this.txt,
      };
      bookService.addReview(id, reviewObj);
      this.userName = "Books Reader";
      this.rate = 1;
      this.date = Date.now();
      this.txt = null;
      this.$emit("onReview");
    },
  },
  computed: {
    localTime() {
      return this.date.toISOString().substring(0, 10);;
    },
  },
  mounted() {
    this.setFocus();
  },
  created() {
    // console.log('id: ', this.bookId);
  },
};
