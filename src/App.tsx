import { useEffect, useState } from "react";
import { Task, createTask } from "./Task";
import type { SyntheticEvent } from "react";
import { Summary } from "./Summary";

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];;

export function App() {
    const [tasks, setTasks] = useState<Task[]>(storedTasks);
    const [inputTask, setInputTask] = useState("");

    useEffect(() => {localStorage.setItem("tasks", JSON.stringify(tasks))}, [tasks]);

    function addTask(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const text = inputTask.trim();
        if (!text) return;

        setTasks(prevTasks => [...prevTasks, createTask(text)]);
        setInputTask("");
    }

    const toggleTask = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, checked: !task.checked} : task
        ));
    }

    return (
        <>
            <h1>To-Do List</h1>

            <span id="status"></span>

            <form onSubmit={addTask}>
                <input type="text" placeholder="Crie uma task" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
                <button type="submit">Adicionar</button>
            </form>
        
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <label>
                            <input type="checkbox" checked={task.checked} onChange={() => toggleTask(task.id)} />
                            <span>{task.text}</span>
                        </label>
                    </li>
                ))}
            </ul>

            <Summary tasks={tasks} />
        </>
    );
}