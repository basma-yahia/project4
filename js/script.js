let userInfo = document.getElementById("user_info");

let userD = document.querySelector("#user");
let links = document.querySelector("#links");
const f_name = localStorage.getItem("first_name");

let logOutBtn = document.querySelector("#logout");
let allProducts = document.querySelector(".products");
let serachselection = document.querySelector("#Search");
let searchInput = document.querySelector("#searchInput");
let products = [
  {
    id: 1,
    Product: "EarPods",
    Price: "649.48 EGP",
    Category: "Phone Accessories",
    imageUrl: "imgs/arepod1.avif",
  },
  {
    id: 2,
    Product: "Head Phone",
    Price: "340.00 EGP",
    Category: "Phone Accessories",
    imageUrl: "imgs/headphone1.avif",
  },
  {
    id: 3,
    Product: "Redmi Note3",
    Price: "10600.00 EGP",
    Category: "Smart Phones",
    imageUrl: "imgs/redmiNote3.jpg",
  },
  {
    id: 4,
    Product: "Iphone15 Pro",
    Price: "35000.00 EGP",
    Category: "Smart Phones",
    imageUrl: "imgs/ipone1.avif",
  },
  {
    id: 5,
    Product: "Adidas Shoes",
    Price: "420.00 EGP",
    Category: "Shoes",
    imageUrl: "imgs/shoes4.avif",
  },
  {
    id: 6,
    Product: "NIKE Shoes",
    Price: "360.00 EGP",
    Category: "Shoes",
    imageUrl: "imgs/shoes2.avif",
  },
  {
    id: 7,
    Product: "Sun Glasses",
    Price: "150.00 EGP",
    Category: "Glasses",
    imageUrl: "imgs/sunglasses.avif",
  },
  {
    id: 8,
    Product: "T-Shirt H&M",
    Price: "350.00 EGP",
    Category: "fashion",
    imageUrl: "imgs/t-shirt2.jpg",
  },
  {
    id: 9,
    Product: "T-Shirt Addidas",
    Price: "420.00 EGP",
    Category: "fashion",
    imageUrl: "imgs/t-shirt1.jpg",
  },
];

///////////////////////////////////////////////////////////////////////////////////////////

if (f_name) {
  links.remove();
  userInfo.style.display = "flex";
  userD.innerHTML += `welcome ${f_name}`;
} else {
  userInfo.style.display = "none";
  userInfo.remove();
}

logOutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});
/////////////////////////////////////////////////////////////////////////////////////

function drawItems(prductshow) {
  let y = prductshow.map((item) => {
    return `
        <div class="product_item col-md-4 col-12">
           <div class = "product_item_desc">
                <img class="product_item_img" src="${item.imageUrl}" alt="">
                <div class="product_item_info mt-3">
                <h3>Product: ${item.Product}</h3>
                 <p>Price: ${item.Price}</p>
                 <p>Category: ${item.Category}</p></div>
            </div>
            <div class="product_item_action">
               <button class="btn btn-primary add_to_cart" onClick = "addToCart(this, ${item.id})">Add To Cart</button>
              <i data-id='${item.id}' class="fa-solid fa-heart  fav add_to_fav" onClick = "addToFav(this, ${item.id})"></i>
            </div>
        </div>       
        `;
  });
  allProducts.innerHTML = y.join("");
}
drawItems(products);

// search ###############
searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();

  if (serachselection.value == "Search By Category") {
    console.log(e.target.value);
    console.log(products);

    const filteredProducts = products.filter((items) => {
      return items.Category.toLocaleLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });
    drawItems(filteredProducts);
  } else if (serachselection.value == "Search By Name") {
    console.log(e.target.value);

    const filteredProducts = products.filter((product) =>
      product.Product.toLocaleLowerCase().includes(
        e.target.value.toLowerCase().trim()
      )
    );
    drawItems(filteredProducts);
  } else {
    drawItems(products);
  }
});



/////////////////////////////////////////////////////////////////////////////////////////
let shoppingCartIcon = document.querySelector(".shopping_cart_icon");
let cartsProducts = document.querySelector(".carts_products");

shoppingCartIcon.addEventListener("click", opencart);
function opencart(e) {
  e.preventDefault();
  //  if(cartProductDiv.innerHTML !=""){
  cartsProducts.classList.toggle("d-none");
  //   if(cartProductDiv.innerHTML !="")
}
// }

// استرجاع السلة من localStorage أو تهيئتها إذا لم تكن موجودة

let counter = document.getElementsByClassName("badge");
// AddCart?.addEventListener("click",addToCart)

let itemCount = 1;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// let products = JSON.parse(localStorage.getItem('products')) || [];


// ###### add to cart
let checkCart = JSON.parse(localStorage.getItem("cart")) || [];
if (checkCart.length > 0) {
  showCartProduct()
  showNotationbadge()
}
function addToCart(e, id) {
  console.log(e.innerHTML);
  console.log(id);

  if (localStorage.getItem("first_name")) {

    if (e.innerHTML == "Add To Cart") {
      e.innerHTML = "Remove From Cart"
      e.style.color = "red";
      let ProductsInCart = cart.find((item) => item.id === id);
      if (ProductsInCart) {
        ProductsInCart.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart.push({
          id: id,
          quantity: 1,
          price: products[id].Price,
          productName: products[id].Product,
          img: products[id].imageUrl
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      showCartProduct();
      showNotationbadge()
    } else {
      e.innerHTML = "Add To Cart"
      e.style.color = "white";
      let ProductsInCart = cart.find((item) => item.id === id);
      if (ProductsInCart) {


        cart.splice(cart.indexOf(ProductsInCart), 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        showCartProduct()
        showNotationbadge()


      }
    }



  } else {
    window.location = "login.html";
  }
}

// ###### add fav to cart  
let AddFav = document.getElementsByClassName("add_to_fav");

Array.from(AddFav).forEach((elelment) => {
  elelment.addEventListener("click", addToFav);
});
let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

function addToFav(e) {
  if (localStorage.getItem("first_name")) {
    console.log(e.target);

    const productId = e.target.dataset.id;


    const product = products.find((item) => item.id == productId)

    const productIndex = favorite.findIndex((item) => item?.id == productId)

    if (productIndex === -1) {
      favorite.push(product);
      e.target.classList.add("fav-color"); // Toggle the visual indicator (like changing heart color)
    } else {
      favorite.splice(productIndex, 1);
      e.target.classList.remove("fav-color"); // Remove the visual indicator

    }

    localStorage.setItem("favorite", JSON.stringify(favorite));

  } else {
    window.location = "login.html";
  }
}

// serach function by name or category

//  ##### show cart product

function showCartProduct() {
  let AddCart = document.querySelector(".add_to_cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  AddCart.innerHTML = "";
  cart.map((product) => {
    return (AddCart.innerHTML += `
            <div class =' d-flex justify-content-between '>
             <span>${product.productName} </span>
               <p>
               <span onClick='increaseProductCart(${product.id})' class='p-1 bg-success  border product_plus '>+</span> ${product.quantity} <span onClick='decreaseProductCart(${product.id})' class='p-1 border bg-danger product_min ' >-</span>
                </p>
            
            
            </div>
              
            `);
  });
}
// ####### update cart quantity by increase or decrease
function increaseProductCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemupdate = cart.find((item) => item.id == id);
  itemupdate.quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));
  showCartProduct();
  showNotationbadge()
}
function decreaseProductCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemupdate = cart.find((item) => item.id == id);
  itemupdate.quantity--;
  if (itemupdate.quantity < 1) {
    cart.splice(cart.indexOf(itemupdate), 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showCartProduct();
  showNotationbadge()
}

function showNotationbadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let badge = document.getElementById('badge')

  badge.classList.remove('d-none')
  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
  badge.textContent = totalItems;
}
