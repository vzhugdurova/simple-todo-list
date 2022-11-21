import { IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import Task, { TaskId } from "./types/Task";
import { useDispatch } from "react-redux";
import * as api from "./api";
import { taskDeleted } from "./actionCreators";
import { useCallback } from "react";

export interface TaskProps {
  task: Task;
}

const TaskItem = ({ task }: TaskProps) => {
  const dispatch = useDispatch()
  const handleTaskRemove = useCallback(
    (id: TaskId) => {
      api.deleteTask(id).then(() => {
        dispatch(taskDeleted(id));
      });
    },
    [dispatch]
  );

  return (
    <>
      <ItemWrapperStyled>
        <p style={{ width: "20%", fontSize: 20 }}>{task.type}</p>
        <p style={{ width: "50%" }}>{task.description}</p>
        <p style={{ width: "20%" }}>{task.timeToDo}</p>
        <div style={{ width: "10%", display: "flex", justifyContent: "space-around"}}>
        <IconButton
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => handleTaskRemove(task.id)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ItemWrapperStyled>
    </>
  );
};

export default TaskItem;

const ItemWrapperStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "lightgrey",
  marginBottom: 10,
  borderRadius: 15,
  boxShadow: "10px, 10px, 10px grey",
  padding: "5px 25px",
  textAlign: "left",
});
