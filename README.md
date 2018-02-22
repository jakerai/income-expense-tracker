# income-expense-tracker
Income expense tracking application
1. To run this application, clone the project to your computer
2. Navigate inside the project and open a terminal or a commandline. On the commandline enter the following 
   $npm install
3. This will install all the dependencies required by the project. 
4. The project uses bcrypt, bootstrap, jquery, jsonwebtoken, mongoose, pug template, mongodb hosted on https://mlab.com/, nodejs, css, etc.
5. To run the project go inside the project folder where your app.js file is located and hit npm start on the commandline.

Project structure description:

backend folder consists of three directories 
 1. authentication : authentication.js file inside this directory is used to encrypt password before storing it in the database. It     also has method for verifying the password
 2. config folder fi : config file contains jsonwebtoken secret key value and mlab database url link
 3. userStates folder: this file contains user states
 4. model folder: contains mongoose schema and model use for interacting with mongodb.

middlewares foler consists file for verifying token

javascripts  folder inside public folder contains all the validations, functions for calling server methods.

routes folder contains all the request mapping files

views contains pug template file
