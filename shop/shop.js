onload = ()=>{
    if(!sessionStorage.getItem('currentUser')){
        location.href = "../login/login.html";
    }
}

let mensDiv = document.getElementById("mens-1");
let womensDiv = document.getElementById("womens-2");
let electronicsDiv = document.getElementById('electronics-4');
let jewelleryDiv = document.getElementById('jewellery-3');

// fetching data and storing in local storage
async function fetchData(){
    try{

        let res = await fetch('https://fakestoreapi.com/products');
        let products = await res.json();

        let allProducts = products.map((product)=>{
            product.color = randomColor();
            product.size = randomSize();
            return product;
        })

        console.log(allProducts);

        localStorage.setItem("products",JSON.stringify(allProducts));

    }
    catch (error) {
        console.log(`${error}`);
    }
}

fetchData();

// random function for getting random color
function randomColor(){
    let colors = ["red","green","blue","black","white"];
    let index = Math.floor(Math.random() * colors.length);
    let res = colors[index];
    return res;
}

// random function for getting random size
function randomSize(){
    let sizes = ["S","M","L","XL"];
    let index = Math.floor(Math.random() * sizes.length);
    let res = sizes[index];
    return res;
}

function renderData(products, divTag){

    products.forEach(product => {
        
        let span = document.createElement('span');
        let productImg =  product.image;
        // console.log(productImg);
        let card = `
        <div class="item-card" id="${product.id}">
        <img src="${productImg}" alt="img" id="product-image">
        <div class="product-details">
            <div class="title price-tag"><p><b>Price :</b> ₹ ${product.price}</p><p id="size-tag"><b>Size :</b> ${product.size}</p></div>
            <div class="title" id="colors-tag"><b>Color :</b> <p id="c1" style="background-color: ${product.color};"></p></div>
            <div class="title" id="star-rating-tag"><b>Rating :</b> 
                <div id="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
        </div>
        <div class="add-to-cart" onclick="addToCart(${product.id})">Add To Cart</div>
    </div>`;

    span.innerHTML = card;

    // console.log(divTag);
        divTag.append(span);

    });
}


// getting products data from local storage 

let products = JSON.parse(localStorage.getItem('products'))

// console.log(mensDiv);
let mensProducts = products.filter((product)=>{
        return product.category === "men's clothing";
})

let womensProducts = products.filter((product)=>{
    return product.category === "women's clothing";
})

let jewelleryProducts = products.filter((product)=>{
    return product.category === "jewelery";
})

let electronicsProducts = products.filter((product)=>{
    return product.category === "electronics";
})
console.log(mensProducts);

renderData(mensProducts, mensDiv);
renderData(womensProducts, womensDiv);
renderData(jewelleryProducts, electronicsDiv);
renderData(electronicsProducts, jewelleryDiv);



 // for chaning star-rating 
 const stars = document.querySelectorAll("#stars i");
 stars.forEach((star, index1) => {
 star.addEventListener("click", () => {
     stars.forEach((star, index2) => {
     index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
     });
 });
 });


 let hideMens = document.getElementById('hide-mens');
 let hideWomens = document.getElementById('hide-womens');
 let hideelectronics = document.getElementById('hide-electronics');
 let hidejewellery = document.getElementById('hide-jewellery');

let allTag = document.querySelector(".all");
let mensTag = document.querySelector(".mens-tag");
let womensTag = document.querySelector(".womens-tag");
let jewelleryTag = document.querySelector(".jewellery-tag");
let electronicsTag = document.querySelector(".electronics-tag");

//  console.log(allTag, mensTag, womensTag, jewelleryTag,electronicsTag)

//   all tag event to remove toggle button ALL
allTag.addEventListener('click',()=>{
    hideMens.style.display = "block";
    hideWomens.style.display = "block";
    hideelectronics.style.display = "block";
    hidejewellery.style.display = "block";

    allTag.classList = 'all';
    mensTag.classList.remove("all");
    womensTag.classList.remove("all");
    jewelleryTag.classList.remove("all");
    electronicsTag.classList.remove("all");

})

//   mens tag event to remove toggle button MENS

mensTag.addEventListener('click',()=>{
    hideMens.style.display = "block";
    hideWomens.style.display = "none";
    hideelectronics.style.display = "none";
    hidejewellery.style.display = "none";

    allTag.classList.remove("all");
    mensTag.classList = 'all';
    womensTag.classList.remove("all");
    jewelleryTag.classList.remove("all");
    electronicsTag.classList.remove("all");

})

//   womens tag event to remove toggle button WOMENS

womensTag.addEventListener('click',()=>{
    hideMens.style.display = "none";
    hideWomens.style.display = "block";
    hideelectronics.style.display = "none";
    hidejewellery.style.display = "none";

    allTag.classList.remove("all");
    mensTag.classList.remove("all");
    womensTag.classList = 'all';
    jewelleryTag.classList.remove("all");
    electronicsTag.classList.remove("all");
})

//   jewellery tag event to remove toggle button JEWELLERY

jewelleryTag.addEventListener('click',()=>{
    hideMens.style.display = "none";
    hideWomens.style.display = "none";
    hideelectronics.style.display = "block";
    hidejewellery.style.display = "none";

    allTag.classList.remove("all");
    mensTag.classList.remove("all");
    womensTag.classList.remove("all");
    jewelleryTag.classList = 'all';
    electronicsTag.classList.remove("all");
})

//   electronics tag event to remove toggle button ELECTRONICS

electronicsTag.addEventListener('click',()=>{
    hideMens.style.display = "none";
    hideWomens.style.display = "none";
    hideelectronics.style.display = "none";
    hidejewellery.style.display = "block";

    allTag.classList.remove("all");
    mensTag.classList.remove("all");
    womensTag.classList.remove("all");
    jewelleryTag.classList.remove("all");
    electronicsTag.classList = 'all';
})



let cart = JSON.parse(localStorage.getItem('cart')) || [];
// adding into cart

let itemAdded = document.getElementById('item-added');  

function addToCart(productId) {
	products.forEach((product)=>{
		if(product.id === productId){
			cart.push(product);
		    localStorage.setItem('cart', JSON.stringify(cart));

            itemAdded.style.display = 'block';
		}

        setTimeout(()=>{
            itemAdded.style.display = 'none';
        },900);

	});
}






