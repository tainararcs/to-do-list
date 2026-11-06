import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Task, createTask } from "./Task";
import { Summary } from "./Summary";
import { getLocation, copyText, shareText } from "./service/app";

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];;

type Filter = "all" | "completed" | "pending";

export function App() {
    const [tasks, setTasks] = useState<Task[]>(storedTasks);
    const [inputTask, setInputTask] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    useEffect(() => {localStorage.setItem("tasks", JSON.stringify(tasks))}, [tasks]);

    async function addTask(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const text = inputTask.trim();
        if (!text) return;

        const location = await getLocation();

        setTasks(prevTasks => [...prevTasks, createTask(text, location)]);
        setInputTask("");
    }

    const toggleTask = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, checked: !task.checked} : task
        ));
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.checked;
        if (filter === "pending") return !task.checked;

        return true;
    });

    return (
        <>
            <h1>To-Do List</h1>

            <span id="status"></span>

            <form onSubmit={addTask}>
                <input type="text" placeholder="Crie uma task" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
                <button title="Adicionar tarefa" type="submit">Adicionar</button>
            </form>
        
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        <label>
                            <input type="checkbox" checked={task.checked} onChange={() => toggleTask(task.id)} />
                            <span>{task.text}</span>
                            <div>
                                <button title="Copiar tarefa" type="button" onClick={() => copyText(task.text)}>📋</button>
                                <button title="Compartilhar tarefa" type="button" onClick={() => shareText(task.text)}>📤</button>
                            </div>
                            <div>{task.location}</div>
                        </label>
                    </li>
                ))}
            </ul>

            <Summary tasks={tasks} onFilterChange={setFilter} />
        </>
    );
}