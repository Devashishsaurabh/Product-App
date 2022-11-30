document.getElementById("form").addEventListener("submit", otp);

function otp() {
  event.preventDefault();
  openModal();
}
function openModal(e) {
  var modal = document.getElementById("otpModal");
  modal.style.display = "block";
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  var modal = document.getElementById("otpModal");
  modal.style.display = "none";
};
window.onclick = function (event) {
  var modal = document.getElementById("otpModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.getElementById("submission").addEventListener("click", otpEnterModal);

document.getElementById("1").addEventListener("input", () => {
  document.getElementById("2").focus();
});
document.getElementById("2").addEventListener("input", () => {
  document.getElementById("3").focus();
});
document.getElementById("3").addEventListener("input", () => {
  document.getElementById("4").focus();
});
function otpEnterModal(e) {
  let otp1 = document.getElementById("1").value;
  let otp2 = document.getElementById("2").value;
  let otp3 = document.getElementById("3").value;
  let otp4 = document.getElementById("4").value;
  let otp = otp1 + otp2 + otp3 + otp4;
  let type = document.getElementById("type").value;
  let year = document.getElementById("year").value;
  let desc = document.getElementById("desc").value;
  let price = document.getElementById("price").value;
  let modal = document.getElementById("otpModal");
  let Obj = {
    type: type,
    year: +year,
    Description: desc,
    Price: +price,
  };
  if (otp == "1234") {
    fetch("https://obscure-dawn-66198.herokuapp.com/furniture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Obj),
    })
      .then((response) => response.json())
      .then((res) => {
        alert("successfully registered");
        document.getElementById("type").value = "";
        document.getElementById("year").value = "";
        document.getElementById("desc").value = null;
        document.getElementById("price").value = null;
        document.getElementById("1").value = null;
        document.getElementById("2").value = null;
        document.getElementById("3").value = null;
        document.getElementById("4").value = null;
      })
      .catch((e) => {
        console.log("err", e);
      });
  } else {
    alert("Password Wrong");
    document.getElementById("1").value = null;
    document.getElementById("2").value = null;
    document.getElementById("3").value = null;
    document.getElementById("4").value = null;
  }
  modal.style.display = "none";
}
