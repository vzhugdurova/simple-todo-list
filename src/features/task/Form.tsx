import { Button } from "@mui/material";
import InputField from "./InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "./api";
import { taskAdded } from "./actionCreators";
import { useDispatch } from "react-redux";

export type Field = {
    labelText: string;
    type: string;
    name: "type" | "description" | "timeToDo";
};

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

const AddTaskForm = () => {
  const dispatch = useDispatch();

  const { handleChange, handleSubmit, handleBlur, touched, values, errors } =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit: (newTask, { resetForm }) => {
        api.createTask(newTask).then((task) => {
          dispatch(taskAdded(task));
        });
        resetForm({
          values: initialValues,
        });
      },
    });

  return (
    <div style={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        {fields.map(({labelText, type, name}, i) => (
          <InputField
          key={i}
          labelText={labelText}
          type={type}
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={
            touched[name] && errors[name]
              ? "A required field"
              : undefined
          }
          min={type === "number" ? "0": undefined}
        /> 
        ))}
        <Button variant="outlined" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddTaskForm;
