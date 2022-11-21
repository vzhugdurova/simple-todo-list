import { Container } from "@mui/material";
import Form from "../task/Form";
import TaskList from '../task/TaskList';
import { Provider } from 'react-redux';
import store from '../../store';

const MainPage = () => {
  return (
    <Provider store={store}>
      <Container sx={{ pt: 5, textAlign: "left" }}>
        <h2>Add Task</h2>
        <Form />
        <h2>Tasks List</h2>
        <TaskList />
      </Container>
    </Provider>
  );
};

export default MainPage;
