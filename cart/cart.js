onload = ()=>{
    if(!sessionStorage.getItem('currentUser')){
        location.href = "../login/login.html";
    }
}


let cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log(cart);

// // DOM elements
const cartList = document.querySelector(".cart-items");
let billList = document.querySelector(".bill-list");
const totalBill = document.querySelector(".total-price");

// Render cart list

function renderCart() {
    cartList.innerHTML = '';
    billList.innerHTML = '';
    let count = 1;

	cart.forEach((list)=>{
		const div = document.createElement("div");
        const billDiv = document.createElement('div');
        billDiv.className = 'bill-item';
        div.className = 'item-card';
        div.id = list.id;
		div.innerHTML = `
            <img src="${list.image}" alt="img">
            <div class="product-details">
                <div class="bill-item-name">    
                    <b>Title :</b>
                    <div class="title product-name"> ${list.title}</div>
                </div>
                <div class="title price-tag"><b>Price :</b> ₹ ${list.price}</div>
            </div>
            <div class="remove-btn" <button onclick="removeFromCart(${list.id})">Remove Item</div>`;
		
        billDiv.innerHTML = `
            <p>${count++}. </p>
            <p id="bill-title"> ${list.title}</p>
            <p>₹ ${list.price}</p>`;
        
        billList.appendChild(billDiv);
        cartList.appendChild(div);
	});	
}

renderCart();


// // Remove item from cart
// 	console.log(cart);
function removeFromCart(productId) {
  	
	const indexToRemove = cart.findIndex(product => product.id === productId);
	if (indexToRemove !== -1) {
	  cart.splice(indexToRemove, 1);
	}
	
	localStorage.setItem('cart', JSON.stringify(cart));
    (()=>{
        let sum=0;
        cart.forEach((list)=>{
            sum += (list.price);
        })
    
        totalBill.innerHTML = `₹ ${sum.toFixed(2)}`;
    })();
	renderCart();
    setTimeout(()=>{
        if(cart.length === 0){
            alert('No Items Added');
            location.href = "../shop/shop.html";
        }
    },900)
}

let sum=0;

(()=>{
    cart.forEach((list)=>{
        sum += list.price;
    })

    totalBill.innerHTML = `₹ ${sum.toFixed(2)}`;
})();

// clearList.addEventListener("click",clearCart);

// // Clear cart
// function clearCart() {
// 	sessionStorage.clear();
// 	cartList.innerHTML = "";
// 	cart = [];
// }

setTimeout(()=>{
    if(cart.length === 0){
        alert('No Items Added');
        location.href = "../shop/shop.html";
    }
},900)

//  razorpay function

document.getElementById("check-out").onclick = function (e) {

    var options = {
      key: "rzp_test_81kE6HM2VyJ3KN", // Enter the Key ID generated from the Dashboard
      amount: Math.floor(sum*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MeShop Checkout",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#000",
      },
      image:
        "https://img.freepik.com/free-vector/infinity-colorful-logo-gradient_343694-1513.jpg?w=740&t=st=1685602251~exp=1685602851~hmac=264544a959c264f1ccae4f6dd55b77243d27ade18a20d14ad5fa777f99c6b370",
    };
  
    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    // clear mycart - localStorage
    localStorage.removeItem("cart");
    
    e.preventDefault();

  };

