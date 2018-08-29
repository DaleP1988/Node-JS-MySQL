

var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "top_songsDB"
});
connection.connect(function(err) {
  if (err) throw err;
  managerOptions();
});
function managerOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Hey there Manager! What would you like to do?",
      choices: [
        "View Products for Sale",
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
function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    console.log("BAMAZON Management BOH");  //console log items in more attractive format
    console.log("--------------------------------------------\n");
    console.log("Product | Department | Price | Quantity Available \n");
    for (var i = 0; i < res.length;i++){
      console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    manageOptions();
    // connection.end();
  
    });
}

function checkInventory() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;

    for (var i = 0; i < res.length;i++){
      console.log(res);
      if (res[i].stock_quantity < 5){
      console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    // connection.end();
      }
      manageOptions();
    });
}
function addInventory() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;

    for (var i = 0; i < res.length;i++){
      console.log(res);
      if (res[i].stock_quantity < 5){
      console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    // connection.end();
      }
      manageOptions();
    });
}

function addProduct() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;

    for (var i = 0; i < res.length;i++){
      console.log(res);
      if (res[i].stock_quantity < 5){
      console.log(res[i].product_name + " " + "|" + " " + res[i].department_name + " " + "|" + " " + res[i].price + " " + "|" + " " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------\n"); //NEED TO CLEAN THIS UP...
    // console.log("Item:" + res.product_name + "Department:" + res.department_name + "Price:" + res.price + "Quantity Available" + res.department_name);
    // connection.end();
      }
      manageOptions();
    });
}

function addInventory() {
connection.query("SELECT * FROM products", function(err, results) {
  if (err) throw err;
  // once you have the items, prompt the user for which they'd like to bid on
  inquirer
    .prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
          }
          return choiceArray;
        },
        message: "What product would you like to restock?"
      },
      {
        name: "product",
        type: "input",
        message: "How much would you like to add?"
      }
    ])
    .then(function(answer) {
      // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_name === answer.choice) {  //check to make sure item.name is referencing the database
          chosenItem = results[i];
        }
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity:  answer.input,                //this needs the correct stock-quantity
            },
            {
              product_name:  answer.product,
            }
          ],
          function(err, res) {
            console.log(res.affectedRows + " Product Updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            // deleteProduct();
          }
          manageOptions();
        });
      }
    
      function addProduct() {
        connection.query("SELECT * FROM products", function(err, results) {
          if (err) throw err;
          // once you have the items, prompt the user for which they'd like to bid on
          inquirer
            .prompt([
              {
                name:    "product_name",
                type:    "input",
                message: "What Product would you like to add?"
              },
              {
                name:    "department_name",
                type:    "input",
                message: "What Department does this go in?"
              },
              {
                name:    "price",
                type:    "input",
                message: "What is the cost per item?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }
            ])
              },
              {
                name:    "stock_quantity",
                type:    "input",
                message: "How many of this item would you like to stock?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }
            ])
        
            .then(function(answer) {

              console.log("Inserting a new product...\n");
              var query = connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answer.product_name,
                  department_name: answer.department_name,
                  price: answer.price,
                  stock_quantity:  answer.stock_quantity,

                },
                function(err, res) {
                  console.log(res.affectedRows + " product inserted!\n");
                  // Call updateProduct AFTER the INSERT completes
                  manageOptions();
                }
              );
      


























// function multiSearch() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// }
// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }
// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }
// function songAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";
//       connection.query(query, [answer.artist, answer.artist], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }