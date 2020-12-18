# Welcome to my Groupomania social network project

## About the project

This is the last project I made for my [Web Developer program at OpenClassrooms](https://openclassrooms.com/fr/paths/185-developpeur-web). :mortar_board:

The goal was to fully develop (backend, frontend and DB) a social network for a company, where **users can share posts with images (png/jpg/gif), and like/comment them**.


I used / developed : 
* A [Node.js](https://nodejs.org/en/) server
* The Model-View-Controller framework [Express](https://expressjs.com/)
* A MySQL database
    * Database operations are performed thanks to [Sequelize ORM](https://sequelize.org/)
* A REST API
* The frontend JS framework [Vue.js](https://vuejs.org/) with [Vuex](https://vuex.vuejs.org/)
* The material Design component framework for Vue.js [Vuetify](https://vuetifyjs.com/en/)


* Security measures in compliance with [GDPR](https://www.cnil.fr/en/gdpr-developers-guide) / [OWASP](https://owasp.org/www-project-top-ten/) guidelines : 
    * Hashed passwords thanks to [bcrypt](https://www.npmjs.com/package/bcrypt)
    * A custom token-base authentication middleware thanks to [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [vue-cookies](https://www.npmjs.com/package/vue-cookies)
    * Various secured HTTP headers set thanks to [helmet](https://www.npmjs.com/package/helmet)
    * Only strong password validation at signup thanks to [password-validator](https://www.npmjs.com/package/password-validator)
    * Email syntax and uniqueness validation thanks to [sequelize](https://sequelize.org/)
    * Different request number limitations for logging in, signing up and all other actions thanks to [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)      
    * Separated sensitive environment variables thanks to [dotenv](https://www.npmjs.com/package/dotenv)      


## How to test the app

### Prerequesites 
*  [Node.js](https://nodejs.org/en/)
*  [Vue CLI](https://cli.vuejs.org/) -> run _npm install -g @vue/cli_  in the terminal in your dev projects directory
*  [Nodemon](https://nodemon.io/) ->  run _npm install -g nodemon_  in the terminal in your dev projects directory


### To enjoy the app for the first time
1. **Clone this repo** and open the project. 

2. In the **front directory** :
    * Install dependencies : _npm install_ (on the terminal)
    * Builds and serves the app : _npm run serve_ (on the terminal)

3. **Create the 'groupomania' MySQL database** (encoded in utf8mb4_general_ci). Your MySQL server should run on the **3306 port**.
    * If you want to **load the data I predefined** : import in your 'groupomania' DB the **data_groupomania.sql dump** you'll find in the **project back/database directory**.
    
      I predefined 3 users and created posts and comments with these accounts :
      * An **Admin user** called Stéphanie Debray whose email is '**stephanie.debray@groupomania.com**' and password is '**aBh712etO**'
      * A user called Marc Doubs whose email is '**marc.doubs@groupomania.com**' and password is '**sdHkk23I6**'
      * A user called Pomme Dumarbre whose email is '**pomme.dumarbre@groupomania.com**' and password is '**dK458Her8**'

4. **Add a config file named '.env'** to the root of **the back directory**. In this file, define 5 secret environment variables :
    * DB_NAME = 'groupomania'
    * DB_HOST = 'localhost'
    * DB_USER = '[your_db_user_name]'
    * DB_PASSWORD = '[your_db_user_password]'
    * TOKEN_KEY = '[a_random_string_to_encode_tokens]'

5. In the **back directory** : 
    * Install dependencies : _npm install_ (on the terminal)
    * Start the node server : _nodemon server_ (on the terminal)
    
6. You can **enjoy the app at the following address** : http://localhost:8080/


### To enjoy the app the following times
1. In the **front directory** :
    * Builds and serves the app : _npm run serve_ (on the terminal)

2. In the **back directory** : 
    * Start the node server : _nodemon server_ (on the terminal)

3. You can **enjoy the app at the following address** : http://localhost:8080/

### To create an Admin user 

1. Create the user account thanks to the signup functionality in the app

2. Thanks to your DB manager (phpMyAdmin for instance), go to the users table and change the 'role' column value from 'user' to 'admin' for the user concerned.

The Admin can **modify/delete every post, comment and account**.


## About me 

I am a 26 years old who decided to turn over a new leaf after several years spent in the world of marine biology research. :octopus: :microscope:

I am currently working as a Junior Web Developer at [Superprof](https://www.superprof.fr/). :heart:


[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cdesurmo.svg?style=social&label=Follow%20%40cdesurmo)](https://twitter.com/cdesurmo)

