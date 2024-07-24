const express = require("express")
const app = express()
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const serverless = require('serverless-http');

const bcrypt = require("bcryptjs")
const port = process.env.PORT || 5990;
const corsOptions = {
    origin: 'https://todo-backend-mu-two.vercel.app/', // Allow only this origin

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
