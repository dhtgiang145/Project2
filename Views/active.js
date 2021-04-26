$(".nav-item").click(function () {
  var navlist = $(".nav-item");
  for (let i = 0; i < navlist.length; i++) {
    navlist[i].classList.remove("active");
  }
  this.classList.add("active");
});
