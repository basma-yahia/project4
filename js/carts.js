let ProductsInCart = localStorage.getItem("cart");
let allProductss = document.querySelector(".productscart");
let total_price= document.getElementById('total_price')

if (ProductsInCart) {
  let items = JSON.parse(ProductsInCart);
  drawCartProducts(items);
  showNotationbadge()

}

function drawCartProducts(products) {
  // Create a structure for rows with two products each
  let content = "";
  products.forEach((item, index) => {
    // Start a new row for every two products
    if (index % 2 === 0) {
      content += `<div class="row g-2">`;
    }

    // Add the product
    content += `
      <div class="col-6 d-flex justify-content-center card-div">
        <div class="card ratio card-pro ratio-16x9" style="max-height: 190px;">
          <div class="d-flex justify-content-between gap-2">
            <div class="flex-shrink-0">
              <img width="150" height="150" src="${item.img}" alt="${item.productName}">
            </div>
            <div class="flex-grow-1">
              <h3>Product: ${item.productName}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>
                <span onClick="increaseProductCartUpdata(${item.id})" class="p-2 btn-success btn border product_plus">+</span>
                ${item.quantity} 
                <span onClick="decreaseProductCartUpdata(${item.id})" class="btn-danger p-2 btn border bg-danger product_min">-</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Close the row after every two products
    if (index % 2 === 1 || index === products.length - 1) {
      content += `</div>`;
    }

    totalPrice();
});


  allProductss.innerHTML = content;
}

function increaseProductCartUpdata(id){
    let ProductsInCartupdate = JSON.parse(localStorage.getItem("cart"));

    increaseProductCart(id)
    drawCartProducts(ProductsInCartupdate)
    totalPrice()

}
function decreaseProductCartUpdata(id){
    let ProductsInCartupdate = JSON.parse(localStorage.getItem("cart"));

    decreaseProductCart(id)
    drawCartProducts(ProductsInCartupdate)
    totalPrice()

}

  var total
function totalPrice(){
    total_price.innerHTML= ''
 
    
    let ProductsInCart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
    
    ProductsInCart.forEach(item => {
         let price = parseFloat(item.price.replace(" EGP", ""));
        
         total += price * item.quantity;
    });
    
    // Update the total price in the DOM
    total_price.innerHTML +=  'Total Price is:' +  total.toFixed(2) + " EGP"; // Format to 2 decimal places and add currency
    

}


// ################slider 


let slider= document.getElementById('sliders')


function displayFav(){
    let fav = JSON.parse(localStorage.getItem("favorite"));

    let content = '';
    console.log(fav);
    
    fav.forEach(item => {
        content += `
        <div class=" item " >
        <div class = "product_item_desc card ">
                 <div class="  mt-3 mx-2 ">
                   <img height="150" width="150"  class=" " src="${item.imageUrl}" alt="">
                <h3>Product: ${item.Product}</h3>
                 <p>Price: ${item.Price}</p>
                 <p>Category: ${item.Category}</p></div>
                 <div class="product_item_action">
               <button class="btn btn-primary add_to_cart" onClick = "addToCart(this, ${item.id})">Add To Cart</button>
              <i data-id='${item.id}' class="fas fa-heart fav add_to_fav " onClick = "addToFav(this, ${item.id})"></i>
            </div>
            </div>
            
        </div>
        
        `

    })
     
    
    slider.innerHTML = content

    $('.owl-carousel').owlCarousel({
        loop: true,               // Infinite loop
        margin: 10,               // Margin between items
        nav: true,                // Show navigation buttons
        autoplay: true,           // Enable autoplay
        autoplayTimeout: 1500,    // Time interval between slides in milliseconds (2 seconds)
        autoplayHoverPause: true, // Pause autoplay when mouse hovers over the carousel
        responsive: {
            0: {
                items: 1          // Display 1 item on small screens
            },
            600: {
                items: 2          // Display 3 items on medium screens
            },
            1000: {
                items: 3          // Display 5 items on large screens
            }
        }
    });
}
 



 displayFav()