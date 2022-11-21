import { styled } from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";
import { Field } from "./types/TaskInputField";


type InputFieldProps = Field & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder?: string;
  min?: string;
}

const InputField = ({ labelText, ...props }: InputFieldProps) => {
  return (
    <label htmlFor={props.name}>
      {labelText}
      <InputStyled {...props} />
    </label>
  );
};

export default InputField;

const InputStyled = styled("input")({
  display: "block",
  border: "1px solid black",
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
});
