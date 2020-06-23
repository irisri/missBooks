import { myRouter } from "./routes.js";
import appHeader from "./cmps/app-header.cmp.js";

new Vue({
  el: "#App",
  router: myRouter,
  template: `
    <div class="text-center">
        <app-header />
        <main>
            <router-view />
        </main>

        <footer>
                coffeerights 2020
        </footer>
    </div>
    `,
  components: {
    appHeader,
  },
});
