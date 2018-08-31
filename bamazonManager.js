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
        "Add New Product",
        "Quit Inventory Management"
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products in Stock":
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
      case  "Quit Inventory Management":
        console.log("Time for Coffee! See ya later!"); 
        process.exit(0);      
        break;
      
      }
    });
}

// function to display products in stock
// function not running 

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res){
    // console.log(res);
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

// function to add a more of a specific item to the stock


function addInventory() {
  // query the database for all products in the inventory
  connection.query("SELECT * FROM products", function(err, results) {
    // console.log(results);
    if (err) throw err;
  //prompt user for item to restock
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          pageSize: 20,
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to restock?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many units would you like to add?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        var quantity =  parseInt(answer.quantity);
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            // console.log(answer.choice);
            // console.log(answer.product);
            // console.log(results[i]);
            chosenItem = results[i];
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [{
                stock_quantity: chosenItem.stock_quantity + quantity,
              },
              {
                item_id: chosenItem.item_id
              }
              ], function(error) {
                if (error) throw error;
                console.log("Congratulations! \n You have updated '" + answer.choice + "' successfully");
                console.log("  You have added " + answer.quantity + " units to BOH");
                console.log("-----------------------------------------------");
                chosenItem.stock_quantity = chosenItem.stock_quantity + quantity;
                printUpdatedProduct(chosenItem);
                managerOptions();
               
              }
            );
          }
        };
      });
    });
  }   //semi colons only on lines of code that actually run.
   function printUpdatedProduct(product){
      console.log("Updated BAMAZON Product Catalog (for BOH)");
      console.log(product.product_name);
      console.log(product.department_name);
      console.log("$" + product.price.toFixed(2));
      console.log(product.stock_quantity + "  units");
      console.log("----------------------------------------------");  
   }
           
       

//function to add a new product to the store


function addNewProduct() {
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
          // console.log(value);
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
            // console.log(value);
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
        });    
    });
  }

     
//PSEUDOCODE FINAL LEVEL
// NEW TABLE: departments with department_id, department_name, over_head_costs,

//modify bamazonCustomer.js and products table
//add product_sales column
//in js, multiply quantity purchased by product_sales column (upon customer purchase)
//update the products column

//New Node app: bamazonSuperviser.js
//give menu options: view product sales by department, create new department
//commands: view product sales by department
//total_profit = difference b/w over_head_costs and product_sales; total_profit not stored (use alias)

//hints:
//check aliases in MySQL, look into GROUP BYs, look into JOINS







