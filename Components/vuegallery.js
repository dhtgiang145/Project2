Vue.component("portrait", {
  props: ["portraits"],
  template: `
    <h3> Portrait Photo Gallery </h3>
    <ul>
        <li v-for="portrait in portraits" :key="portrait.id">  
            <img src="{{portrait.image}}" alt="{{portrait.title}}">
            <h4> {{portrait.title}} </h4>
        </li>
    </ul>
    `,
});
var portrait = new Vue({
  el: "#portrait",
  data: {
    portraits: [
      {
        id: 1,
        image: "../images/portrait1.jpg",
        title: "Portrait 1",
      },
      {
        id: 2,
        image: "../images/portrait2.jpg",
        title: "Portrait 2",
      },
      {
        id: 3,
        image: "../images/portrait3.jpg",
        title: "Portrait 3",
      },
      {
        id: 4,
        image: "../images/portrait4.jpg",
        title: "Portrait 4",
      },
    ],
  },
});

// Vue.component("daily", {
//   props: ["dailys"],
//   template: `
//       <h3> Daily Life Gallery </h3>
//       <ul class="daily">
//           <li v-for="daily in dailys" :key="daily.id">
//               <img src="{{daily.image}}" alt="{{daily.title}}">
//           </li>
//       </ul>
//       `,
// });

// var daily = new Vue({
//   el: "#daily",
//   data: {
//     dailys: [
//       {
//         id: 1,
//         image: "/images/daily1.jpg",
//         title: "Daily Life 1",
//       },
//       {
//         id: 2,
//         image: "/images/daily2.jpg",
//         title: "Daily Life 2",
//       },
//       {
//         id: 3,
//         image: "/images/daily3.jpg",
//         title: "Daily Life 3",
//       },
//       {
//         id: 4,
//         image: "/images/daily4.jpg",
//         title: "Daily Life 4",
//       },
//     ],
//   },
// });

// Vue.component("wedding", {
//   props: ["weddings"],
//   template: `
//         <h3> Wedding Photos Gallery </h3>
//         <ul class="wedding">
//             <li v-for="wedding in weddings" :key="wedding.id">
//                 <img src="{{wedding.image}}" alt="{{wedding.title}}">
//             </li>
//         </ul>
//         `,
// });

// var daily = new Vue({
//   el: "#wedding",
//   data: {
//     weddings: [
//       {
//         id: 1,
//         image: "/images/wedding1.jpg",
//         title: "Wedding Photo 1",
//       },
//       {
//         id: 2,
//         image: "/images/wedding2.jpg",
//         title: "Wedding Photo 2",
//       },
//       {
//         id: 3,
//         image: "/images/wedding3.jpg",
//         title: "Wedding Photo 3",
//       },
//       {
//         id: 4,
//         image: "/images/wedding4.jpg",
//         title: "Wedding Photo 4",
//       },
//       {
//         id: 5,
//         image: "/images/wedding5.jpg",
//         title: "Wedding Photo 5",
//       },
//       {
//         id: 6,
//         image: "/images/wedding6.jpg",
//         title: "Wedding Photo 6",
//       },
//       {
//         id: 7,
//         image: "/images/wedding7.jpg",
//         title: "Wedding Photo 7",
//       },
//       {
//         id: 8,
//         image: "/images/wedding8.jpg",
//         title: "Wedding Photo 8",
//       },
//     ],
//   },
// });
