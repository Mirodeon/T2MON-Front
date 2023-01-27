import React from "react";

type InputFormProps = {
  name: string;
  message: string;
  error: string | undefined;
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  showMessage: boolean;
};

const InputForm = ({
  name,
  message,
  error,
  value,
  handleChange,
  handleBlur,
  showMessage,
}: InputFormProps) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container_input_form">
      <input
        className={
          "input_form" +
          (message ? " incorrect_input" : "") +
          (error ? " invalid_input" : "")
        }
        id={name}
        type={name}
        placeholder={capitalizeFirstLetter(name)}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor={name} className="label_form">
        {capitalizeFirstLetter(name)}
      </label>
      <div className="error_form">
        {error ? error : message && showMessage ? message : null}
      </div>
    </div>
  );
};

export default InputForm;
