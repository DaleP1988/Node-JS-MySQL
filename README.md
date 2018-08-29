#  **BAMAZON App**

BAMAZON App is a command line app that uses Node.js and MySQL. The app allows the user to query, view, update and modify data stored in a MySQL database. The database holds dummy data modeled after items sold by Amazon.com. 

## **How to use BAMAZON App**

**Bamazon Customer**

The Bamazon Customer View allows users to read the BAMAZON "Product Catalog," which appears on the page upon connection with the database. The customer can then select an item to purchase, as well as indicate the quantity of the item they are interested to buy. The app then checks if there are enough in stock to fill the order. If there are enough units, the app will return the purchase total and an "Enjoy!" message. If there are too few units to fill the order, the customer will be notified with an "Insufficient Quantity" message and redirected to a new "transaction prompt." 

**Bamazon Manager BOH**

The Bamazon Manager Back of House (BOH) allows the user to view and check items in stock, as well as restock or add new product. Upon connection to the database, the app prompts the user with 4 options: "View Products for Sale," "View Low Inventory," "Add to Inventory," or "Add New Product." These options are displayed in a list format; users can select an option by entering a number. The "View Products for Sale" command displays all items in stock along with quantity, price and department for each. "View Low Inventory" returns all items, but specifies the items with a stock quantity of less than 5 units. When running the "Add to Inventory" command, the user is asked which item they would like to restock and how many units they would like to add. The database is then modified according to the input and the user receives "Successfully Updated" message. With "Add to Inventory" the user is aked to add an item, as well as a price, quantity and department for the item. The app then takes the input and updates the database and the user receives a "Product Added Successfully" message.
