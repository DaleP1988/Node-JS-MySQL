

var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Caryophyllus1415%&#",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected!");
  managerOptions();
});
function managerOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Hey there Manager! What would you like to do?",
      choices: [
        "View Products in Stock",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        checkInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addNewProduct();
        break;
      }
    });
}

// function to display products in stock
// function not running 

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res){
    console.log(res);
    if (err) throw err;
    console.log("BAMAZON Management BOH");  //console log items in more attractive format
    console.log("--------------------------------------------\n");
    console.log("Product | Department | Price | Quantity Available \n");
    for (var i = 0; i < res.length;i++){
      console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    managerOptions();
    // connection.end();  
    });
}

//function check if stock is < 5 for a specific item
//function working. 

function checkInventory() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;

    for (var i = 0; i < res.length;i++){
      console.log(res[i].product_name);
      console.log(res[i].department_name);
      console.log("$" + res[i].price.toFixed(2));
      console.log(res[i].stock_quantity + "  units");
      if (res[i].stock_quantity < 5){
        console.log("--------------------------------------------\n");
        console.log("Time to Restock:  " + res[i].product_name + "!");
        // console.log(lowCount);
      // console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    // connection.end();
      }
      managerOptions();      
    });
}

//function to add a more of a specific item to the stock
//function not running

// function addInventory() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM products", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].product_name);
//             }
//             return choiceArray;
//           },
//           message: "What item would you like to restock?"
//         },
//         {
//           name: "product",
//           type: "input",
//           message: "How many units would you like to add?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].product_name === answer.choice) {
//             chosenItem = results[i];
//             connection.query(
//               "UPDATE auctions SET ? WHERE ?",
//               [{
//                 stock_quantity: answer.product,
//               },
//               {
//                 id: chosenItem.id
//               }

//               ],
//               function(error) {
//                 if (error) throw err;
//                 console.log(answer.product + "updated successfully!");
//                 // managerOptions();
//               }
//             };
//           }      
//     });
//   }







//function to add a new product to the store
//function not running

function addProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the name of the new product?"
      },
      {
        name: "department",
        type: "input",
        message: "What department will stock the product?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to stock?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
        {
          name: "price",
          type: "input",
          message: "What is the price per unit of the new product?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          stock_quantity: answer.quantity,
          price: answer.price
        },
        function(err) {
          if (err) throw err;
          console.log("New product has been added successfully!");
          // re-prompt the user for if they want to bid or post
          managerOptions();
        }
      );
    });

     








