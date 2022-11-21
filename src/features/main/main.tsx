import { Container } from "@mui/material";
import AddEditForm from "../task/AddEdit";
import TaskList from "../task/TaskList";

const MainPage = () => {
  return (
    <Container sx={{ pt: 5, textAlign: "left" }}>
      <AddEditForm />
      <TaskList />
    </Container>
  );
};

export default MainPage;
