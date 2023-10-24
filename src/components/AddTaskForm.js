import React from "react";
import { useForm } from "react-hook-form";

const AddTaskForm = ({ onChange }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  const submit = (formData) => {
    onChange(formData);
    reset({
      title: "",
      body: "",
    });
  };
  return (
    <div className="tasks-form__container">
      <form className="tasks-form" onSubmit={handleSubmit(submit)}>
        <input type="text" {...register("title")} placeholder="task title" />
        <textarea type="text" {...register("body")} placeholder="task text" />
        <button>добавить</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
