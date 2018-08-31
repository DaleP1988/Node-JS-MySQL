var mysql = require('mysql')
var inquirer = require('inquirer')
var consoleTable = require('console.table')
// var orders = [];

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Caryophyllus1415%&#',
    database: 'bamazon_db',
    port: 3306
});

connection.connect(function (err) {
    if(err) throw err;
    // console.log("connected as id" + connection.threadId);  //establishing connection with server
    displayItems();
    // messageCustomer();
});

//display all items >>> change formatting with a loop, add a number before each row, so you aren't just sending an object.
function displayItems() {
    connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    console.log("BAMAZON Product Catalog");  //console log items in more attractive format
    console.log("--------------------------------------------\n");
    console.log("Product | Department | Price | Quantity Available \n");
    for (var i = 0; i < res.length;i++){
      console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    pointOfSale();
    // connection.end(); 
    });
}

   //Ask what item they want
   
   
function pointOfSale() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.log(results);
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "product",
          type: "rawlist",
          pageSize: 21,
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {    
              choiceArray.push(results[i].product_name);
            }
            choiceArray.push(" <Quit Transaction>")
            return choiceArray;
          },
          message: "What item would you like to buy?"   //prompt: what item?
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"  //prompt: how many?
        }
      ])
      .then(function(answer) {                       //this will have a product and quantity field
        // get the information of the chosen item
        var chosenItem;
        if (answer.product === "<Quit Transaction>"){
            process.exit(0);
        }
        // console.log(results.length);
        for (var i = 0; i < results.length; i++) {
          
          // console.log(results[i]);
          // console.log(answer);
          if (results[i].product_name === answer.product) {
            chosenItem = results[i];
  
          }
        }
         if (!chosenItem){
          console.log("Please select a valid product number");
          pointOfSale();
          return;                                 // DISCOVERY: return has to go after function is called, otherwise function wont be called   
         }
        // determine if there is enough in stock
        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {  //check stock
          // if enough in stock, 
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - answer.quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw error;
              console.log("Looks like we have enough to fill your order! \n");
              console.log("One moment please....")
              console.log("---------------------------------------------\n");
              // start();   //this was the start over function
              purchaseTotal = chosenItem.price * answer.quantity;
              console.log("Your Purchase Total is: $" + purchaseTotal.toFixed(2));
              inquirer
              .prompt([
              {
                name: "continue",
                type: "confirm",
                message: "Would you like to buy another product?" //prompt how many?
              }
              ])
              .then(function(answer){
                if (answer.continue) {
                  console.log("Okay! Happy Shopping!");
                  pointOfSale();  
                }else{
                  console.log("Please Come Again Soon!");
                }     

              })             
            },
          );
        }
        else {
          // don't have enough, start over at pointOfSale...
          console.log("INSUFFICIENT QUANTITY")
          console.log("Sorry, we don't have enough of that item to fill your order.");
          console.log("Please select another item.");
          pointOfSale();
          // start();    this was the start over function
        }
      });
  });
}

//END BAMAZON CUSTOMER TRANSACTION


