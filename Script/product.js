let arr = [];
async function fetchProductData() {
  await fetch(
    `https://obscure-dawn-66198.herokuapp.com/furniture/`,
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((result) => {
      arr = result;
     data(arr);
    })
    .catch((error) => console.log("error", error));
}
fetchProductData();
function data(arr) {
    let product = document.getElementById("product");
    product.innerHTML = null;
     arr.map((e) => {
      var div = document.createElement("div");
      div.setAttribute("class", "div");
      var div1 = document.createElement("div");
      div1.setAttribute("class", "div1");
      var img = document.createElement("img");
      img.src = "https://ii1.pepperfry.com/media/catalog/product/r/o/800x880/royal-wing-chair-in-blue-colour-by-dreamzz-furniture-royal-wing-chair-in-blue-colour-by-dreamzz-furn-pitcjr.jpg";
      img.setAttribute("class", "img");
      var type = document.createElement("p");
      type.innerText = `Type:${e.type}`;
      var year = document.createElement("p");
      year.innerText = `Year: ${e.year}`;
      var pricebox= document.createElement("div")
      pricebox.setAttribute("class", "pricebox");
      var strike= document.createElement("strike")
      strike.innerText = (e.Price+25*100)
      var desc = document.createElement("p");
      desc.innerText = `Description: ${e.Description}`;
      var price= document.createElement("p");
      price.innerText = `Price: ${e.Price}`;
      var btndiv= document.createElement("div");
      btndiv.setAttribute("class","btndiv")
      var delete1=document.createElement("button");
      delete1.setAttribute("id","delete")
      delete1.addEventListener("click", () => {
        deteteproductData(e);
      });
      var edit=document.createElement("button");
      edit.setAttribute("id","edit")
      edit.addEventListener("click", () => {
        openModal(e);
        id=e.id;
      });
      var wishlist=document.createElement("button")
      wishlist.setAttribute("id","wishlist")
      wishlist.addEventListener("click", () => {
        wishlistadd(e);
      });
      btndiv.append(delete1,edit)
      div1.append(img,wishlist);
      pricebox.append(price,strike)
      div.append(div1, type, year, desc,pricebox,btndiv);
      product.append(div);
    });
  }
  //Delete data from product
  function deteteproductData(el) {
    fetch(
      `https://obscure-dawn-66198.herokuapp.com/furniture/${el.id}`,
      { method: 'DELETE' }
    )
      .then((response) => response.json())
      .then((result) => {
        alert("Delete SuccessFull")
        fetchProductData();
      })
      .catch((error) => console.log("error", error));
  }
  //Open Modal For Edit with prefield Data
function openModal(e) {
    document.getElementById("type").value= e.type;
    document.getElementById("year").value = e.year;
    document.getElementById("desc").value = e.Description;
    document.getElementById("price").value = e.Price;
  var modal = document.getElementById("productModal");
  modal.style.display = "block";
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
var modal = document.getElementById("productModal");
modal.style.display = "none";
};
window.onclick = function (event) {
var modal = document.getElementById("productModal");
if (event.target == modal) {
  modal.style.display = "none";
}
};
document.getElementById("submission").addEventListener("click", editproductmodal);
function editproductmodal(e){
    let type =  document.getElementById("type").value;
    let year =  document.getElementById("year").value;
    let desc =  document.getElementById("desc").value;
    let price = document.getElementById("price").value;
  let modal = document.getElementById("productModal");
  var Obj = {
      type: type,
      year: (+year),
      Description: desc,
      Price: (+price),
  };
  fetch(`https://obscure-dawn-66198.herokuapp.com/furniture/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(Obj),
    headers: {
        "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(result => {
      alert("Data Update SuccessFull")
      fetchProductData()
    })
    .catch(error => console.log('error', error));

  modal.style.display = "none";
}

//Add data in Wishlist
function wishlistadd(e){
    let Obj = {
        type: e.type,
        year: (+e.year),
        Description: e.Description,
        Price: (+e.Price),
      }
    fetch("https://obscure-dawn-66198.herokuapp.com/wishlisted", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
         },
        body: JSON.stringify(Obj),
        })
    .then((response) => response.json())
    .then((res) => {
      alert("Wishlist added SuccessFull");
    })
    .catch((e) => {
      console.log("err", e);
    })
}

let filterSort=[]
document
  .getElementById("filterByType")
  .addEventListener("change", Filterbytype);
function Filterbytype() {
  let filter=document.getElementById("filterByType").value
  if(filter=="Table"){
    const table= arr.filter(e => e.type === 'Table')
    filterSort=table
    data(filterSort)
  }else if(filter=="Bed"){
    const bed = arr.filter(e => e.type === 'Bed')
    filterSort=bed
    data(filterSort)
  }
  else if(filter=="Chair"){
    const chair = arr.filter(e => e.type === 'Chair')
    filterSort=chair
    data(filterSort)
  }
  else if(filter=="Sofa"){
    const sofa = arr.filter(e => e.type === 'Sofa')
    filterSort=sofa
    data(filterSort)
  }else{
    filterSort=[]
    data(arr)
  }
}


//Sort by price
document.getElementById("sortByPrice").addEventListener("change", sortByPrice);
function sortByPrice() {
  let selected = document.getElementById("sortByPrice").value;
  if (selected == "lth") {
    if(filterSort.length!=0){
    filterSort.sort((a, b) => a.Price- b.Price)
      data(filterSort)
    }else{
    arr.sort((a, b) => a.Price- b.Price);
    data(arr);
    }
  }
  if (selected == "htl") {
    if(filterSort.length!=0){
        filterSort.sort((a, b) => b.Price- a.Price)
    data(filterSort)
    }else{
        arr.sort((a, b) => b.Price- a.Price);
        data(arr);
    }
  }
}
