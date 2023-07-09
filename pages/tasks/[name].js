import { useRouter } from "next/router";
import Task from "../../components/Task";
import React, { useState } from "react";
import axios from "axios";

import styles from "../../styles/AllTask.module.css";


const url=process.env.URL



export const getServerSideProps = async ({ query }) => {

  // console.log("url is")
  // console.log(url)
  const { name } = query;

  console.log(name);
  let data = [];

  await axios
    .get(url+"/api/task/" + name)
    .then((result) => {
      data = result.data[0].tasks;
      console.log("data is :");
      console.log(result.data[0].tasks);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      tasks: data,
    },
  };
};

export default function (props) {
  const router = useRouter();
  const { name } = router?.query || {};

  console.log("Tasks are");
  console.log(props);

  const [tasks, setTasks] = useState(props.tasks);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
    time: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    const updatedTasks = [
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
      },
    ];

    // Making Axios post call to /api/task
    console.log("url is")

    console.log(process.env.URL)
   
    axios
      .post("/api/task", {
        name: name,
        task: {
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
          createdAt: newTask.time,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(newTask);

    setTasks(updatedTasks);

    // Make Axios Call To add the task to background

    setNewTask({
      title: "",
      description: "",
      completed: false,
      time: "",
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome {name}</h1>

      <div className={styles.form}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Title"
        />

        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description"
        ></textarea>

        <input
          type="time"
          name="time"
          value={newTask.time}
          onChange={handleInputChange}
          placeholder="Time"
        />

        <button className={styles.addButton} onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            completed={task.completed}
            time={task.time}
          />
        ))}
      </div>
    </div>
  );
}
