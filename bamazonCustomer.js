var keys = require("./keys.js");

var mysql = require("mysql");
var inquirer = require("inquirer");
var n = require("num-ber");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.password,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  searchProducts();
});

var productArray = [];
var userQuantity = 0;
var userChoiceId = 0;
var stockQuantity = 0;
var stockPrice = 0;

function searchProducts() {
  productArray = [];
  connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productArray.push(("ID: " + res[i].item_id + " Product Name: " + res[i].product_name + " Price: $" + n.format(res[i].price, 2)));
    }

    inquirer
      .prompt([{
          name: "product",
          type: "list",
          message: "Select the ID of the product you wish to purchase",
          choices: productArray
        },
        {
          name: "quantity",
          type: "input",
          message: "How many products would you like?"
        }
      ])
      .then(function(answer) {
        var result = (answer.product).split(" ", 2);
        var userChoiceId = result[1];
        var userQuantity = answer.quantity;
        var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: userChoiceId }, function(err, response) {
          if (err) throw err;
          var stockQuantity = response[0].stock_quantity;
          var stockPrice = response[0].price;
          if (stockQuantity >= userQuantity) {
            updateProduct(stockQuantity, userQuantity, userChoiceId, stockPrice);
          } else {
            console.log("The in-stock quantity is " + stockQuantity + ". There is insufficient quantity. Please shop again.");
            shopAgain();
          }
        });
      });
  });
}

function updateProduct(stockQuantity, userQuantity, userChoiceId, stockPrice) {

  var query = connection.query(
    "UPDATE products SET ? WHERE ?", [{
        stock_quantity: (stockQuantity - userQuantity)
      },
      {
        item_id: userChoiceId
      }
    ],
    function(err, res) {
      console.log("Your order total is: $" + n.format((stockPrice * userQuantity), 2) + ".");
      shopAgain();
    }
  );
}

function shopAgain() {
  inquirer.prompt([{
    name: "confirm",
    type: "confirm",
    message: "Would you like to shop again?"
  }]).then(function(answer) {
    if (answer.confirm === true) {
      searchProducts();
    } else {
      console.log("Please come back soon.  Thank you for shopping with Bamazon.");
      connection.end();
    }
  });
}