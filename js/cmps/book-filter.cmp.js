export default {
    template: `
    <div class="book-filter flex col">
        <input type="text" placeholder="filter By Book Name" v-model="filterBy.name" @input="onFilter"/>
        <input type="number" placeholder="From Price" v-model.number="filterBy.fromPrice" @input="onFilter" />
        <input type="number" placeholder="To Price" v-model.number="filterBy.toPrice" @input="onFilter" />
    </div>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: 0
            }
        }
    },
    methods: {
        onFilter() {
            this.$emit('filter', this.filterBy)
        }
    }
};