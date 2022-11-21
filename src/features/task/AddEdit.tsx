import { Button, styled } from "@mui/material";
import InputField from "./InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "./api";
import { setEditMood, taskAdded, taskUpdated } from "./actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectTaskEditMood } from "./selectors";
import { Field } from "./types/TaskInputField";

const fields: Field[] = [
  {
    labelText: "Task Type",
    type: "text",
    name: "type",
  },
  {
    labelText: "Description",
    type: "text",
    name: "description",
  },
  {
    labelText: "Time to Do",
    type: "number",
    name: "timeToDo",
  },
];

const schema = Yup.object({
  type: Yup.string().required(),
  description: Yup.string().required(),
});

const initialValues = {
  type: "",
  description: "",
  timeToDo: 0,
};

const AddEditForm = () => {
  const dispatch = useDispatch();
  const isEditMood = useSelector(selectTaskEditMood);
  
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    values,
    errors,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (newTask, { resetForm }) => {
      if (isEditMood) {
        api.updateTask({ ...newTask, id: isEditMood.id }).then((task) => {
          dispatch(taskUpdated(task));
        });
      } else {
        api.createTask(newTask).then((task) => {
          dispatch(taskAdded(task));
        });
      }
      resetForm({
        values: initialValues,
      });
    },
  });

  useEffect(() => {
    if (isEditMood) {
      setValues({
        type: isEditMood.type,
        description: isEditMood.description,
        timeToDo: isEditMood.timeToDo,
      });
    }
  }, [isEditMood, setValues]);

  function handleCancle() {
    if(isEditMood) {
      dispatch(setEditMood(null))
    }
    setValues(initialValues);
  }

  return (
    <div style={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
      <h2>{isEditMood ? "Edit Task" : "Add Task"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        {fields.map(({ labelText, type, name }, i) => (
          <InputField
            key={i}
            labelText={labelText}
            type={type}
            name={name}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              touched[name] && errors[name] ? "A required field" : undefined
            }
            min={type === "number" ? "0" : undefined}
          />
        ))}
        <ButtonsDiv
        >
          <Button variant="outlined" size="large" onClick={() => handleCancle()}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" size="large">
            {isEditMood ? "Send" : "Add"}
          </Button>
        </ButtonsDiv>
      </form>
    </div>
  );
};

export default AddEditForm;

const ButtonsDiv = styled("div")({
  width: "220px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-end",
});
