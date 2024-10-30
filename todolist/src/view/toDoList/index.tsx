import {useState} from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../../node_modules/@mui/material/index";
import Header from "../../component/organisms/header/header";
import {makeStyles} from "../../../node_modules/@mui/styles/index";
import "./index.scss";

const useStyles = makeStyles({
  input: {
    width: "70%",
    marginBottom: 30,
  },
  addButton: {
    height: 55,
    marginBottom: 30,
  },
  container: {
    textAlign: "center",
    marginTop: 100,
  },
  list: {
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid light-gray",
  },
  text: {
    width: "70%",
  },
  listButtons: {
    marginLeft: 10,
  },
});

function ToDoList() {
  const [todos, setTodos] = useState<any>([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const classes = useStyles();

  const [todoItem, setTodoItem] = useState({
    title: "",
    status: 0,
  });

  const onChange = (e) => {
    setTodoItem({
      ...todoItem,
      title: e.target.value,
    })
  };

  const handleClick = () => {
    console.log(todoItem)
    const {title, status} = todoItem;
    if (!isEdited) {
      setTodos([
        ...todos,
        {title, status, id: new Date().getTime()},
      ]);
    } else {
      setTodos([...todos, {title, status, id: editedId}]);
    }
    setTodoItem({
      title: "",
      status: 0,
    })
    setIsEdited(false);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    const editVal = todos.find((todo) => todo.id === id);
    setEditedId(editVal.id);
    // setInputVal(editVal.val);
    setTodoItem({
      ...todoItem,
      title: editVal.title
    })
    setTodos(newTodos);
    setIsEdited(true);
  };
  const handleChange = (ev: any) => {
    console.log(ev.target.value);
    setTodoItem({
      ...todoItem, status: ev.target.value
    })
  };
  return (
    <>
      <Header title="To do list"></Header>
      <Container component="main" className={classes.container}>
        <TextField
          variant="outlined"
          onChange={onChange}
          label="type your task"
          value={todoItem.title}
          className={classes.input}
        />
        <div className={!isEdited ? "hidden" : "inline"}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            {todoItem.status}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={todoItem.status}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={0}>Chưa làm</MenuItem>
              <MenuItem value={1}>Đang Làm</MenuItem>
              <MenuItem value={2}>Đã xong</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          size="large"
          variant={isEdited ? "outlined" : "contained"}
          color="primary"
          onClick={handleClick}
          className={classes.addButton}
          disabled={todoItem.title ? false : true}
        >
          {isEdited ? "Edit Task" : "Add Task"}
        </Button>
        <List>
          {todos.map((todo, index: number) => {
            return (
              <>
                <ListItem className={classes.list} key={index}>
                  {/*<Checkbox*/}
                  {/*  onClick={() => handleDone(todo.id)}*/}
                  {/*  checked={todo.isDone}*/}
                  {/*/>*/}
                  <Typography
                    className={classes.text}
                  >
                    {todo.title}
                  </Typography>
                  <Typography
                    className={classes.text}
                    style={{color: todo.status === 0 ? "red" : ""}}
                  >
                    {todo.status === 0 ? 'Chưa làm' : todo.status === 1 ? 'Đang làm' : 'Đã làm'}
                  </Typography>
                  <Button
                    onClick={() => handleEdit(todo.id)}
                    variant="contained"
                    className={classes.listButtons}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(todo.id)}
                    color="secondary"
                    variant="contained"
                    className={classes.listButtons}
                  >
                    delete
                  </Button>
                </ListItem>
              </>
            );
          })}
        </List>
      </Container>
    </>
  );
}

export default ToDoList;
