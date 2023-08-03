const currentUser=JSON.parse(localStorage.getItem("currentUser"))
document.getElementById("rzp-button1").onclick = function (e) {

    var options = {
      key: "rzp_test_81kE6HM2VyJ3KN", // Enter the Key ID generated from the Dashboard
      amount: Math.round(currentUser.total * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
    e.preventDefault();
  };