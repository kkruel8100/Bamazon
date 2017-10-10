lvar keys = require("./keys.js");

var mysql = require("mysql");
var inquirer = require("inquirer");
var n = require("num-ber");

var stockArray = [];
var managerChoiceId = 0;
var addQuantity = 0;
var stockQuantity = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.password,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  managerSearch();
});

function managerSearch() {
  inquirer.prompt([{
    name: "choice",
    type: "list",
    message: "Menu options",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function(response) {
    if (response.choice === "View Products for Sale") {
      viewProducts();
    } else if (response.choice === "View Low Inventory") {
      viewLowQuantity();
    } else if (response.choice === "Add to Inventory") {
      updateQuantity();
    } else {
      newProduct();
    }
  });
}

function viewProducts() {
  connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(("ID: " + res[i].item_id + " Product Name: " + res[i].product_name + " Quantity: " + res[i].stock_quantity + " Price: $" + n.format(res[i].price, 2)));
    }
  });

  connection.end();
}

function viewLowQuantity() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(("ID: " + res[i].item_id + " Product Name: " + res[i].product_name + " Quantity: " + res[i].stock_quantity + " Price: $" + n.format(res[i].price, 2)));
    }
  });

  connection.end();
}

function updateQuantity() {
  connection.query("SELECT * FROM products", function(err, res) {
    stockArray = [];
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      stockArray.push(("ID: " + res[i].item_id + " Product Name: " + res[i].product_name + " Quantity: " + res[i].stock_quantity));
    }
    inquirer
      .prompt([{
          name: "product",
          type: "list",
          message: "Select product you want to add inventory to:",
          choices: stockArray
        },
        {
          name: "quantity",
          type: "input",
          message: "What quantity do you want to add?"
        }
      ])
      .then(function(answer) {
        var result = (answer.product).split(" ");
        managerChoiceId = result[1];
        addQuantity = parseInt(answer.quantity);
        var index = (result.length - 1);
        var stock = result.splice(index, 1);
        var quantity = stock.toString();
        stockQuantity = parseInt(quantity);
        var query = connection.query(
          "UPDATE products SET ? WHERE ?", [{
              stock_quantity: stockQuantity + addQuantity
            },
            {
              item_id: managerChoiceId
            }
          ],
          function(err, res) {
            console.log(res.affectedRows + " product updated!\n");
            connection.end();
          }
        );
      });
  });
}

function newProduct() {
  inquirer
    .prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the product you want to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department do you want to add it too?"
      },
      {
        name: "price",
        type: "input",
        message: "What price do you want to sell it at?"
      },
      {
        name: "quantity",
        type: "input",
        message: "What quantity do you want to add?"
      }
    ])
    .then(function(answer) {
      console.log("Inserting a new product...\n");
      var query = connection.query(
        "INSERT INTO products SET ?", {
          product_name: answer.name,
          department_name: answer.department,
          price: parseFloat(answer.price),
          stock_quantity: parseInt(answer.quantity)
        },
        function(err, res) {
          console.log(res.affectedRows + " product inserted!\n");
          connection.end();
        }
      );
    });
}