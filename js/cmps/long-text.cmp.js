export default {
    props: ["txt"],
    template: `
          <section class="long-text">
              <p v-if="isShowMore">Description: {{getRestOfWords}}</p>
              <p v-else>Description: {{showDescription}}</p>
              <button @click="toggel()">Read more</button>
          </section>
      `,
    data () {
        return {
            isShowMore: false
        }
    },
    computed: {
        showDescription() {
            return this.txt.substring(0, 100);
        },
        getRestOfWords() {
            if (this.txt.length < 100) console.log ('less then 100')
            return this.txt;
        }
    },
    methods: {
        toggel() {
            this.isShowMore = !this.isShowMore;
        }
    }
  };