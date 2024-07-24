const express = require("express")
const app = express()
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const serverless = require('serverless-http');

const bcrypt = require("bcryptjs")
const port = process.env.PORT || 5990;

const corsOptions = {
    origin: ['https://todo-backend-mu-two.vercel.app', 'http://localhost:5990','http://localhost:5173','https://todo-frontend-gamma-five.vercel.app'],
}
app.use(cors(corsOptions))
app.use(express.json())

const uri = process.env.URI;
//console.log(uri)
const client = new MongoClient(uri)

app.get("/", (req,res)=> { 
    res.send("Hello World!")
})

async function run(){
    try{
        const db = await client.connect();
        console.log("Mongo DB connected successfully!");

        const users = client.db("TODO").collection("users");

        app.post("/register-user",async (req,res) => {
            try{
                const {username,email,password} = req.body;
                const existingUser = users.findOne({email});
                if(existingUser){
                    return res.status(403).json("Existing user, Please login!")
                }
                const hpassword = await bcrypt.hash(password,10);
                const userData = {username,email,password:hpassword,tasks:[]};
                console.log(userData);
                const newUser = await users.insertOne(userData);
                res.status(200).json(newUser);
            }catch(error){
                console.log("Error creating user :",error)
                res.status(500).json({message : "Internal server error!"})
            }
        })
        app.post("/login",async (req,res) => {
            try{
                const {email,password} = req.body;
                const User = await users.findOne({email});
                if(!User){
                    return res.status(404).json({error:"User not found! Please Create an account and try again..."})
                }
                const passwordMatch = await bcrypt.compare(password,User.password);
                if(!passwordMatch){
                    return res.status(401).json("Password was incorrect!")
                }else{
                    console.log(User)
                    return res.status(200).json(User);
                }
            }catch(error){
                console.log("Error creating user :",error)
                res.status(500).json({message : "Internal server error!"})
            }
        })

        app.post("/addtask", async (req,res) => {
            try {
                const {id,username,taskTitle,dateScheduled,description} = req.body;
                const response = await users.updateOne(
                    {username},
                    {$addToSet:{tasks:{id,taskTitle,dateScheduled,description}}},
                    {new : true}
                )
                if(!response){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json(response);
            } catch (error) {
                console.log("Error creating user :",error)
                res.status(500).json("Internal server error!")
            }
        })

        app.get("/gettasks/:username", async (req,res) => {
            try {
                const username = req.params.username;
                const user = {username:username};
                const response = await users.findOne(user);
                if(!response){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json(response.tasks);
            } catch (error) {
                console.log("Error creating user :",error)
                res.status(500).json("Internal server error!")
            }
        })
    }
    catch(error){}
}
run().catch(error => {
    console.log("Error :",error)
})
app.listen(port,() => {
    console.log("App listening on the port : ",port)
})

module.exports = app;
module.exports.handler = serverless(app);


// const express = require("express");
// const app = express();
// const cors = require("cors");
// const MongoClient = require("mongodb").MongoClient;
// const bcrypt = require("bcryptjs");
// require("dotenv").config();
// const serverless = require('serverless-http');

// const port = process.env.PORT || 5990;

// // Configure CORS
// const corsOptions = {
//     origin: ['https://todo-backend-mu-two.vercel.app', 'http://localhost:5990','http://localhost:5173','https://todo-frontend-gamma-five.vercel.app'],
   
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// const uri = process.env.URI;
// const client = new MongoClient(uri);

// // MongoDB connection
// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log("MongoDB connected successfully!");
//         return client.db("TODO").collection("users");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error; // Rethrow the error to handle it elsewhere
//     }
// }

// // Register routes and start server
// async function startServer() {
//     try {
//         const users = await connectToDatabase();

//         // Route to register a new user
//         app.post("/register-user", async (req, res) => {
//             try {
//                 const { username, email, password } = req.body;
//                 const existingUser = await users.findOne({ email });
//                 if (existingUser) {
//                     return res.status(403).json({ message: "Existing user, Please login!" });
//                 }
//                 const hashedPassword = await bcrypt.hash(password, 10);
//                 const userData = { username, email, password: hashedPassword, tasks: [] };
//                 const newUser = await users.insertOne(userData);
//                 res.status(200).json(newUser);
//             } catch (error) {
//                 console.error("Error creating user:", error);
//                 res.status(500).json({ message: "Internal server error!" });
//             }
//         });

//         // Route to handle user login
//         app.post("/login", async (req, res) => {
//             try {
//                 const { email, password } = req.body;
//                 const user = await users.findOne({ email });
//                 if (!user) {
//                     return res.status(404).json({ error: "User not found! Please create an account and try again..." });
//                 }
//                 const passwordMatch = await bcrypt.compare(password, user.password);
//                 if (!passwordMatch) {
//                     return res.status(401).json({ error: "Password was incorrect!" });
//                 }
//                 res.status(200).json(user);
//             } catch (error) {
//                 console.error("Error logging in:", error);
//                 res.status(500).json({ message: "Internal server error!" });
//             }
//         });

//         // Route to add a task for a user
//         app.post("/addtask", async (req, res) => {
//             try {
//                 const { username, taskTitle, dateScheduled, description } = req.body;
//                 const response = await users.updateOne(
//                     { username },
//                     { $addToSet: { tasks: { taskTitle, dateScheduled, description } } }
//                 );
//                 res.status(200).json(response);
//             } catch (error) {
//                 console.error("Error adding task:", error);
//                 res.status(500).json({ message: "Internal server error!" });
//             }
//         });

//         // Route to get tasks for a specific user
//         app.get("/gettasks/:username", async (req, res) => {
//             try {
//                 const username = req.params.username;
//                 const user = await users.findOne({ username });
//                 if (!user) {
//                     return res.status(404).json({ message: "User not found!" });
//                 }
//                 res.status(200).json(user.tasks);
//             } catch (error) {
//                 console.error("Error retrieving tasks:", error);
//                 res.status(500).json({ message: "Internal server error!" });
//             }
//         });

//         return app;
//     } catch (error) {
//         console.error("Error starting server:", error);
//         throw error; // Rethrow the error to handle it elsewhere
//     }
// }

// // Start the server
// startServer().then(app => {
//     app.listen(port, () => {
//         console.log("App listening on port:", port);
//     });
// });

// // Handle serverless deployment
// module.exports.handler = serverless(app);
