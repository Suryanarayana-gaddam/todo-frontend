const app = express()
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { ObjectId } = require("mongodb");
const serverless = require('serverless-http');

const bcrypt = require("bcryptjs")
const port = process.env.PORT || 5990;

const corsOptions = {
    origin: ['https://todo-sigma-ten-66.vercel.app/', 'http://localhost:5990','http://localhost:5173','https://todo-frontend-gamma-five.vercel.app'],
}
app.use(cors(corsOptions))
app.use(express.json())

const uri = process.env.URI;
const client = new MongoClient(uri)

app.get("/", (req,res)=> { 
    res.send("Hello World!")
})

async function run(){
    try{
        const db = await client.connect();
        const users = client.db("TODO").collection("users");
        const tasks = client.db("TODO").collection("tasks");

        app.post("/register-user",async (req,res) => {
            try{
                const {username,email,password} = req.body;
                const existingUser = await users.findOne({email});
                if(existingUser){
                    return res.status(403).json("Existing user, Please login!")
                }
                const hpassword = await bcrypt.hash(password,10);
                const userData = {username,email,password:hpassword,tasks:[]};
                const newUser = await users.insertOne(userData);
                res.status(200).json(newUser);
            }catch(error){
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
                    return res.status(200).json(User);
                }
            }catch(error){
                res.status(500).json({message : "Internal server error!"})
            }
        })

        app.post("/addtask/:username", async (req,res) => {
            const {taskTitle,dateScheduled,description} = req.body;
            const username = req.params.username;
            try {
                const result = await tasks.insertOne({username,taskTitle,dateScheduled,description})
                const newTask = await tasks.findOne({username});
                await users.updateOne(
                    {username},
                    {$addToSet:{tasks:newTask}},
                    {new : true}
                )
                if(!result){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json("Internal server error!")
            }
        })

        app.get("/getuser/:username", async (req,res) => {
            try {
                const username = req.params.username;
                const user = await users.findOne({username});
                if(!user){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json("Internal server error!")
            }
        })

        app.get("/get-tasks/:username", async (req,res) => {
            try {
                const username = req.params.username;
                const tasksByUsername = await tasks.find({ username : username}).toArray();
                if(!tasksByUsername){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json(tasksByUsername);
            } catch (error) {
                res.status(500).json("Internal server error!")
            }
        })

        app.delete("/delete-task/:id", async (req,res) =>{
            const id = req.params.id;
            const {username} = req.body;
            try {
                const deletedOne = await tasks.findOne({_id:new ObjectId(id)})
                const deletedTask = await tasks.deleteOne({_id:new ObjectId(id)});
                const responses = await users.findOneAndUpdate(
                    {username : username},
                    {$pull : {tasks : {_id :new ObjectId(id)}}},
                    {new : true}
                );
                if(!deletedTask){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json({ message: "Task deleted successfully", deletedTask: deletedOne });
            } catch (error) {
                res.status(500).json("Internal server error!")
            }
        })

        app.get("/get/task/:id", async (req,res) =>{
            const id = req.params.id;
            try {
                const reqTask = await tasks.findOne({_id:new ObjectId(id)})
                
                if(!reqTask){
                    return res.status(501).json("Error in adding task");
                }
                res.send(reqTask);
            } catch (error) {
                res.status(500).json("Internal server error!")
            }
        })

        app.patch("/update/task/:id", async (req,res) => {
            const taskData = req.body;
            const id = req.params.id;
            try {
                const updatedTask = await tasks.findOneAndUpdate(
                    {_id : new ObjectId(id)},
                    {$set : {...taskData}},
                    {upsert : true}
                )
                if(!updatedTask){
                    return res.status(501).json("Error in adding task");
                }
                res.status(200).json(updatedTask);
            } catch (error) {
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
