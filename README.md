# Bamazon

## Overview

This is an Amazon-like storefront utilizing node and MySQL database. The app is a CLI (command-line interface).  It presents two views.
1.  The customer view that will take in orders from customers and deplete stock from the store's inventory.  It notifies the customer of either insufficient stock levels or a order total based on quantity purchased and item price.
2.  The manager view allows the manager to view all stock, view low quantity stock, add product to current stock levels, and add new products to the database.

The app requires MySQL, Inquirer, and Num-ber npm packages.

## Database Setup and Population

1.  Setup

This is the coding for the setup of the database in MySQL:

![Image of Schema1](https://github.com/kkruel8100/Bamazon/blob/master/images/schema1.PNG)

This is the success of the setup of the database.

![Image of Schema2](https://github.com/kkruel8100/Bamazon/blob/master/images/schema2.PNG)

2.  Data Population

This is the coding for the initial data population of the database in MySQL:

![Image of Mock1](https://github.com/kkruel8100/Bamazon/blob/master/images/mock1.PNG)

This is the success data population of the database in MySQL:

![Image of Mock2](https://github.com/kkruel8100/Bamazon/blob/master/images/mock2.PNG)

![Image of Mock3](https://github.com/kkruel8100/Bamazon/blob/master/images/mock3.PNG)

## Customer View

### The entry point is bamazonCustomer.js from the node command line.

1.  Starting the app from the command line.

![Image of Customer Entry](https://github.com/kkruel8100/Bamazon/blob/master/images/entryCustomer.PNG)

2.  Customer is prompted to enter a selection from the list of inventory items that they wish to purchase.

![Image of Customer Prompt](https://github.com/kkruel8100/Bamazon/blob/master/images/customerPrompt1.PNG)

3.  Customer is then shown the item selected and is prompted for the quantity they wish to purchase.

![Image of Customer Quantity](https://github.com/kkruel8100/Bamazon/blob/master/images/customerRequestedQuantity.PNG)

4.  The requested quantity is compared to the stock level on-hand.  If sufficient stock, the customer is given the order total and prompted if they wish to shop again.

![Image of Customer Success](https://github.com/kkruel8100/Bamazon/blob/master/images/customerOrderSuccessNext.PNG)

	1. The stock levels are updated.  Below are before and after stock levels for the order.

	Before:

	![Image of Database Start](https://github.com/kkruel8100/Bamazon/blob/master/images/databaseStart.PNG)

	After:

	![Image of Database After](https://github.com/kkruel8100/Bamazon/blob/master/images/databaseAfter.PNG)

5.  If the stock levels are insufficient, the customer is notified that the order was unable to be fulfilled and they are asked if they wish to shop again. 

![Image of Customer Reject](https://github.com/kkruel8100/Bamazon/blob/master/images/customerOrderRejectNext.PNG)

*Note the image of inventory in 4a shows that quantities were not sufficient.*

6.  If the customer chooses to not shop again, they are displayed the message to please come again.

![Image of No Shop](https://github.com/kkruel8100/Bamazon/blob/master/images/noShopAgain.PNG)

## Manager View

### The entry point is bamazonManager.js from the node command line.

![Image of Schema](https://github.com/kkruel8100/Bamazon/blob/master/images/Schema.PNG)


![Image of Mock Data](https://github.com/kkruel8100/Bamazon/blob/master/images/MockData.PNG)