const req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    const user = JSON.parse(req.response).user;
    document.getElementById(
      "userwelcome"
    ).innerText = `${user.name}!`;
  }
};
req.open("GET","http://localhost:5000/yourstatus",true);
req.send();