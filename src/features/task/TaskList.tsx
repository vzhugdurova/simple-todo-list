import { styled } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./api";
import { tasksLoaded, tasksSortedByTime } from "./actionCreators";
import { selectTasks } from "./selectors";
import TaskItem from "./TaskItem";
import { FilterType } from "./types/TaskAction";

const ListWithAllTasks = () => {
  const [taskSort, setTaskSort] = useState<FilterType>("ASC");
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    api.getTasks().then((loadedTasks) => {
      dispatch(tasksLoaded(loadedTasks));
    });
  }, [dispatch]);

  const handleTasksSort = () => {
    setTaskSort((prev) => prev === "DESC"? "ASC" : "DESC");
    dispatch(tasksSortedByTime(taskSort));
  };
    
  return (
    <div>
      <HeaderWrapperStyled>
        <p style={{ width: "20%" }}>Type</p>
        <p style={{ width: "50%" }}>Description</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <p>Time to do</p>
          <div onClick={() => handleTasksSort()} style={{
            display: "flex",
            alignItems: "center",
          }}>
            {taskSort === "ASC" ? <IconStyled as={ArrowDropDown}/> : <IconStyled as={ArrowDropUp}/>}
          </div>
        </div>
        <div style={{ width: "10%" }}></div> 
      </HeaderWrapperStyled>
      {!!tasks.length &&
        tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  );
};

export default ListWithAllTasks;

const HeaderWrapperStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  justifyContent: "flex-start",
  padding: "5px 25px",
});

const IconStyled = styled('div')({
  fontSize: 35,
  cursor: "pointer",
  ":hover": {
    color: "#1976d2",
  },
});
