import homePage from "./pages/home-page.cmp.js";
import bookApp from "./pages/book-app.cmp.js";
import bookDetails from "./pages/book-details.cmp.js";
import bookFind from "./pages/find-book.cmp.js";
// import carEdit from './pages/car-edit.cmp.js';

// const aboutUs = {
//     template: `
//         <section class="about-us app-main">
//             <h2>About {{$route.params.who}}</h2>
//         </section>
//     `
// }

const myRoutes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/book",
    component: bookApp,
  },
  {
    path: "/find",
    component: bookFind,
  },
  {
    path: "/book/:bookId",
    component: bookDetails,
  },
  // {
  //     path: '/about/:who',
  //     component: aboutUs
  // }
];

export const myRouter = new VueRouter({ routes: myRoutes });
