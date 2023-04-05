import React from "react";
import { useForm } from "react-hook-form";

const MovieForm = ({ clubId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Your code to submit the form data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Movie Title:</label>
      <input id="title" {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}

      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        {...register("date", { required: true })}
      />
      {errors.date && <span>This field is required</span>}

      <label htmlFor="time">Time:</label>
      <input
        type="time"
        id="time"
        {...register("time", { required: true })}
      />
      {errors.time && <span>This field is required</span>}

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
