# Order-eatz
## Description

 OrderEatz is an application that takes pride in delivering its customers delicious food, diverse cuisine, and quality tastes that can make any food enthusiast's mouth water. Established in 2024, order-eatz makes ordering food fun, easy, and seamless! You may go directly to the order page if you want to order your food ASAP, but if you make an account, you may save your orders to reference for next time. You may also upload your own photo to make a more personalized order eatz experience! Look through 71+ items in our menu, leave reviews for your favorite foods, and gush over the wide varied selection at our disposal! 

## Screenshots
<img width="1790" alt="Screenshot 2024-04-27 at 1 08 09 AM" src="https://github.com/psantos2107/order-eatz-frontend/assets/146752384/22064c3e-ccb9-412a-b569-7661ce837ae7">
<img width="1782" alt="Screenshot 2024-04-27 at 1 09 32 AM" src="https://github.com/psantos2107/order-eatz-frontend/assets/146752384/9a42dd82-a69a-4479-a114-cf7bb21fe43d">
<img width="1783" alt="Screenshot 2024-04-27 at 1 08 57 AM" src="https://github.com/psantos2107/order-eatz-frontend/assets/146752384/0a134144-ee19-4385-b18b-010b0dfcadaa">
<img width="1783" alt="Screenshot 2024-04-27 at 1 08 21 AM" src="https://github.com/psantos2107/order-eatz-frontend/assets/146752384/6282a8d6-b129-4308-9438-dcf93ab2f679">

## Technologies Used
* FRONT-END: React, scaffolded from Vite
* STYLING: Tailwind CSS
* BACK-END: NodeJS
* Authorization: JSON Web Tokens
* Back-end Dependencies: bcrypt, cors, dotenv, express, jswonwebtoken, mongoose, multer
* Front-end Dependencies (non-dev dependencies): axios, jwt-decode, react, react-dom, react-router-dom
* Back-end Deployment: Heroku
* Front-end Deployment: Netlify

## Installation Instructions

### Backend
Navigate to the backend rep: https://github.com/psantos2107/order-eatz-backend
Fork and clone the repo.

Ensure you have a mongoDB account (https://www.mongodb.com/), and connect a database to this repo. Store the database connection URI to your .env file in a variable called MONGODBURI.

In your .env file, also ensure you specify a variable called PORT and a JWT_SECRET.

Run 'npm install' in the command line for this repo to install all necessary node modules
```
npm install
```

Run 'npm run seed' to seed the database with users, exercises, and exercise programs.
```
npm run seed
```

### Frontend
Fork and clone this specific repo.

Create a .env file, and create a variable called VITE_API_URL, where you will store the URL that will fetch data from the backend.

Run 'npm install' in the command line for this repo to install all necessary node modules and dependences.
```
npm install
```

## Route Table for Backend

|       **URL**           | **REST Route** | **HTTP Verb** | **CRUD Action** |   
| ----------------------- | -------------- | ------------- | --------------- | 
| /api/reviews/food/:id   | index          | GET           | read            | 
| /api/reviews/user/:id   | index          | GET           | read            | 
| /api/reviews/:id        | show           | GET           | read            | 
| /api/reviews/:id        | update         | PATCH         | update          | 
| /api/reviews            | create         | POST          | create          |   
| /api/reviews/:id        | delete         | DELETE        | delete          | 
| /api/food/:id           | show           | GET           | create          |          
| /api/food               | show           | GET           | read            |                    
| /api/user/:id           | show           | GET           | read            |                   
| /api/user/:id           | update         | PATCH         | update          |         
| /api/user               | create         | POST          | create          |        
| /api/user/:id           | delete         | DELETE        | delete          |          
| /api/login              | create         | POST          | authentication  |                    
| /api/orders/:id         | delete         | DELETE        | delete          |                   
| /api/orders/:id         | show           | SHOW          | read            |         
| /api/orders/            | create         | POST          | create          |   
| /api/orders/:id         | update         | PATCH          | update          |                   
| /api/orders/user/:id    | index          | GET           | read            | 

## Unsolved Problems

We were not able to focus and adapt our application to be adjustable for mobile devices. We also were not able to tackle all of our stretch goals, which is outlined in our Trello board. We aim to make our application more robust, incorporating more realistic features similar to a mobile food ordering application.

https://trello.com/b/JPtKdUE6/project-3-trello

## Contact

For any inquiries or feedback, please contact the project maintainers:

- **Paul Santos, Evonte Bennett, Sinan Yilmaz, Brandon Alvarado**
- Emails:@, @Evontebennett14@gmail.com,@snn.ylmz9804@gmail.com,@

Project Link: https://order-eatz.netlify.app/

Feel free to reach out if you have questions, suggestions, or just want to chat!


## Acknowledgements

- https://imgur.com/ : For image URL retrieval

- https://chat.openai.com/ : For Questions & debugging

- https://www.google.com/ : For all database images

