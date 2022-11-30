async function fetchWishlistData() {
    await fetch(
      `https://obscure-dawn-66198.herokuapp.com/wishlisted`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((result) => {
        arr = result;
        wishlistdata(arr);
      })
      .catch((error) => console.log("error", error));
  }
  fetchWishlistData();
  let id;
  function wishlistdata(arr) {
      let wishlist = document.getElementById("wishlist");
      wishlist.innerHTML = null;
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
        var desc = document.createElement("p");
        desc.innerText = `Description: ${e.Description}`;
        var pricebox= document.createElement("div")
        pricebox.setAttribute("class", "pricebox");
        var strike= document.createElement("strike")
         strike.innerText = (e.Price+25*100)
        var price= document.createElement("p");
        price.innerText = `Price: ${e.Price}`;
        var btndiv= document.createElement("div");
        btndiv.setAttribute("class","btndiv")
        var delete1=document.createElement("button");
         delete1.setAttribute("id","delete")
          delete1.addEventListener("click", () => {
           deteteWishlistData(e);
        });
        div1.append(img);
        btndiv.append(delete1)
        pricebox.append(price,strike)
        div.append(div1, type, year, desc, pricebox,btndiv);
        wishlist.append(div);
      });
    }
    //Delete data from Wishlist
  function deteteWishlistData(el) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(
      `https://obscure-dawn-66198.herokuapp.com/wishlisted/${el.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        alert("Delete SuccessFull")
        fetchWishlistData();
      })
      .catch((error) => console.log("error", error));
  }