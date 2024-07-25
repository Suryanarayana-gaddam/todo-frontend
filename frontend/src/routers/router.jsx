import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import UpcomingTasks from "../components/UpcomingTasks"
import CompletedTasks from "../components/CompletedTasks"
import Home from "../Home/Home"
import AllTasks from "../components/AllTasks"
import UpdateTask from "../components/UpdateTask"

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children : [
            {
                path: "/",
                element:<UpcomingTasks/>
            },
            {
                path: "/upcoming-tasks",
                element:<UpcomingTasks/>
            },
            {
                path: "/completed-tasks",
                element:<CompletedTasks/>
            },
            {
                path: "/all-tasks",
                element:<AllTasks/>
            },
            {
                path: "/update/task/:taskId",
                element:<UpdateTask/>,
                loader: ({params}) => {
                    return fetch(`http://localhost:5990/get/task/${params.taskId}`,{
                        method:"GET",
                        headers:{
                            "Content-type" : "application/json"
                        }
                    })
                }
            }
        ],
        
    },
    {
        path: "/home",
        element:<Home/>
    },
    {
        path:"/login",
        element:<Login/>
    },{
        path:'/signup',
        element:<SignUp/>
    }
]);

export default router