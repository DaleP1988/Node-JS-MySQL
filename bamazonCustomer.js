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
    console.log("connected as id" + connection.threadId);  /// <<<<<<< COMMENT THIS OUT BEFORE SUMITTING
    displayItems();
    // messageCustomer();
});

//display all items //change the formatting with a loop. add a number before each row, so you aren't sending an object only.
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
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {    //FIND AND CHANGE ITEM_NAME BELOW!!!!!!
              choiceArray.push(results[i].product_name);
            }
            // console.log(choiceArray);
            return choiceArray;
          },
          message: "What item would you like to buy?"   //prompt what item?
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"  //prompt how many?
        }
      ])
      .then(function(answer) {                       //this will have a product and quantity field
        // get the information of the chosen item
        var chosenItem;
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
          return;                           // return has to go after the function is called, otherwise the function wont be called   
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




//

//











//check to see if there are enough
//update the database CRUD -
//give total














//updating the table based on the selection

// function updateProduct() {
//     console.log("Updating all Rocky Road quantities...\n");
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           quantity: 100
//         },
//         {
//           flavor: "Rocky Road"
//         }
//       ],
//       function(err, res) {
//         console.log(res.affectedRows + " products updated!\n");
//         // Call deleteProduct AFTER the UPDATE completes
//         deleteProduct();
//       }
//     );
  







    



// function messageCustomer() {
//     inquirer
//       .prompt({
//         name: "product",
//         type: "input",
//         message: "What item are you interested to buy? Enter 'Quit' to Exit.",
//         validate: function(value) {
//             if (value.toLowerCase() === "quit") {
//               return false;
//             }
//             return true;
//         }
//       },
//       {  
//         name: "quantity",
//         type: "input",
//         message: "How many would you like?",
//         validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             if (value > 0){
//               return true;
//             }
//               return false;
//         }
       
//       }).then(function(answer) {
//         // get the information of the chosen item
//         var order = {
//             product: answer.product,
//             quantity: answer.quantity
//         }
//         if (answer.product.toLowerCase() === "quit"){
//             console.log("Bye!");
//             return;
//         }

//         if (!checkStock(order)){
//             messageCustomer(); 
//         };
          
//     });      
// }

// function checkStock(order){
//     var orderSuccess = false;    // this result will be false until true.
//     connection.query("SELECT * FROM products WHERE product_name =?", [order.product], function (err, results){
//         if (err) throw err;
//         if (results.length === 0 ){
//             console.log("We can't find a product named " + order.product);  //leaving an error condition until order item is done on line 87
//             return;  
//         }

//         var product = results[0];
//         if (product.stock_quantity >= order.quantity){
//             console.log("We don't have enough of that item");
//             return;  //with return 'else' not needed here. because there is only one other option.
//         }  
//         orderItem(order, product);
//         orderSuccess = true;
//     });
//     return orderSuccess;
// }

// function orderItem(order, product){

//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",  //product.stock_quantity where product.item_id. question marks are variables in the query
//         [
//           {
//             stock_quantity: product.stock_quantity - order.quantity
//           },
//           {
//             item_id: product.item_id
//           }
//         ],
//         function(err,res) {
//           console.log( "Total Cost:" + order.quantity * product.price);
         
//         }
//       );

// }










    


  
    
      









//id, units, check stock (message) or update and total





//process argv for the data
// var params = process.argv(2)

//function to take order
//id of product
//check table at row
//switch statements (with the entry names for products)
//functions for each possible (product selection)
//store specified quantity in a variable
//if === certain amount () else log insufficient quanitity
//else update SQL database
//+ show the total cost of purchase (qty * product price)

 






// connection.query("SELECT * FROM products WHERE product_name = ?", ["MSFT"],
//     function(err, rows){
//         if (err){
//             console.log(err);
//             return;
//         }
//     rows.forEach(function(result){
//         console.log(result.product_name, result.department_name, result.stock_quantity, "at", result.price,);

//     })
//     });

//what is the id of the product you would like to buy?

//how many units of the product would you like to buy?


//if else statement:
//application checks amount of product

//if enough (____ === ) then update MySQL to reflect new quantity, give customer total (price * qty)

//else log Insufficient quantity! and break out of function



//Challenge 2

//bamazonManager.js

//List a set of menu options
//View Products for Sale
//Add to Inventory
//Add New Product
//"View Products for Sale": list all available (item ids, names, prices, quanitites)
//"View Low Inventory": all items with inventory lower than 5
//"Add to Inventory": display prompt that will let manager "add more"
//"Add New Product": add a new product to the store