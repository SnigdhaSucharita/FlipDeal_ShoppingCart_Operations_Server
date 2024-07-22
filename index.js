let express = require("express");
let cors = require("cors");
let app = express();
let Port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

function AddItem(cart, newItem) {
  let product = cart.find(item => item.productId === newItem.productId);
  if(product) {
    product.quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }
  return cart;
}

app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let newItem = { productId, name, price, quantity };
  let result = AddItem(cart, newItem);
  res.json(result);
})

function editQuantity(cart, productId, quantity) {
  let product = cart.find(item => item.productId === productId);
  if(product) {
    product.quantity = quantity;
  }
  return cart;
}

app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(cart, productId, quantity);
  res.json(result);
})

function deleteItem(cart, productId) {
  cart = cart.filter(item => item.productId !== productId);
  return cart;
}

app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteItem(cart, productId);
  res.json(result);
})

app.get("/cart", (req, res) => {
  res.json({ cartItems: cart });
})

function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for(let item of cart) {
    totalQuantity += item.quantity;
  }
  return totalQuantity;
}

app.get("/cart/total-quantity", (req, res) => {
  let totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity });
})

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for(let item of cart) {
    totalPrice += item.price * item.quantity;
  }
  return totalPrice;
}

app.get("/cart/total-price", (req, res) => {
  let totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
})


app.listen(Port, () => {
  console.log("Server is running on https://localhost:" + Port);
})