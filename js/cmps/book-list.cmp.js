import bookPreview from "./book-preview.cmp.js";

export default {
  props: ['books'],
  template: `
    <ul class="book-list grid">
        <book-preview v-for="book in books" :book="book" :key="book.id"/>
    </ul>
    `,
    components: {
        bookPreview
    }
};
