import {googleBookService} from "../services/googleBook.service.js";


export default {
  props: ["book"],
  template: `
        <li class="list-of-search flex space-between">
            <p>{{book.volumeInfo.title}}</p>
            <button @click="onAddFromGoogle()">+</button>
        </li>
    `,
  methods: {
    onAddFromGoogle() {
      googleBookService.addGoogleBook(this.book)
    }
  }
};
