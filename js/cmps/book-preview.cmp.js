

export default {
    props: ['book'],
    template: `
        <li class="book-preview clean-list align-center text-center">
            <img v-bind:src="book.thumbnail" />
            <h3>{{book.title}}</h3>
            <p>{{showCurrency}}</p>
            <router-link :to="'/book/' + book.id">Details</router-link>
        </li>
    `,
    data() {
        return{
            currency: null,
            price: null
        }
    },

    computed: {
        showCurrency() {
            const currency = this.book.listPrice.currencyCode;
            if (currency === 'EUR') return this.book.listPrice.amount +'€';
            else if (currency === 'ILS') return '₪' + this.book.listPrice.amount;
            else return '$' + this.book.listPrice.amount
        }
    },
};
