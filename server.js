var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

  function start(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }
                
            ])
            .then(function(answer) {
                var query = "SELECT position, song, year FROM top5000 WHERE ?";
                console.log(answer.choice)
                console.log(answer.quantity)
                
                

                // connection.query(queryStr,)
                
                // for (var i = 0; i < res.length; i++) {
                //     if (res[i].stock_quantity === answer.quantity) {
                //       quantityItems = res[i];
                //     }
                //   }
                
                //   console.log(res[i].stock_quantity)
                // console.log(answer)
                // if (result[i].stock_quantity <= 0){
                //     console.log
                // }

            })
        })
  }

