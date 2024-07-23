import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import UpcomingTasks from "../components/UpcomingTasks"
import CompletedTasks from "../components/CompletedTasks"
import Top from "../ReactTest/Top"
import Home from "../Home/Home"

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
                path: "/top",
                element:<Top/>
            },
            
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