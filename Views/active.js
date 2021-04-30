$(document).ready(function () {
    $(".nav-item").click(function () {
      var navlist = $(".nav-item");
      for (let i = 0; i < navlist.length; i++) {
        navlist[i].classList.remove("active");
      }
      this.classList.add("active");
    });
});

// var navItems = document.getElementsByClassName("nav-item");
// for (var i = 0; i < navItems.length; i++) {
//   navItems[i].addEventListener("click", function () {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }

// $(document).ready(function () {
//   $("navbar-nav li a").click(function () {
//     $("navbar-nav li").removeClass("active");
//     $(this).parent().addClass("active");
//   });
// });