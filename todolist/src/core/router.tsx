import { createBrowserRouter } from "../../node_modules/react-router-dom/dist/index";
import ToDoList from "../view/toDoList/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDoList></ToDoList>,
  },
]);

export default router;
