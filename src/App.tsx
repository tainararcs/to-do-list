
import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { Task, createTask } from "./Task";
import { Summary } from "./Summary";
import { getLocation, copyText, shareText } from "./service/app";

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];

type Filter = "all" | "completed" | "pending";

export function App() {
    const [tasks, setTasks] = useState<Task[]>(storedTasks);
    const [inputTask, setInputTask] = useState("");
    const [filter, setFilter] = useState<Filter>("all");
    const [status, setStatus] = useState("");

    const statusTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Salva as tarefas no localStorage sempre que houver alterações
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Limpa o temporizador quando o componente é desmontado
    useEffect(() => {
        return () => {
            if (statusTimeout.current) 
                clearTimeout(statusTimeout.current);
        };
    }, []);

    // Adiciona uma nova tarefa
        
    async function addTask(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const text = inputTask.trim();
        if (!text) return;

        // Cria a tarefa imediatamente
        const newTask = createTask(text, "--");

        setTasks(prevTasks => [...prevTasks, newTask]);
        setInputTask("");

        // Obtém a localização separadamente
        try {
            const location = await getLocation();

            setTasks(prevTasks =>
                prevTasks.map(task => task.id === newTask.id ? { ...task, location } : task)
            );
        } catch (error) {
            console.error("Erro ao atualizar localização:", error);
        }
    }

    // Alterna o estado de conclusão da tarefa
    const toggleTask = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id  ? { ...task, checked: !task.checked } : task
            )
        );
    };

    // Filtra as tarefas
    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.checked;
        if (filter === "pending") return !task.checked;

        return true;
    });

    // Exibe uma mensagem temporária
    const showStatus = (message: string) => {
        setStatus(message);

        if (statusTimeout.current) 
            clearTimeout(statusTimeout.current);

        statusTimeout.current = setTimeout(() => {
            setStatus("");
            statusTimeout.current = null;
        }, 3000);
    };

    // Copia uma tarefa
    const handleCopy = async (text: string) => {
        const message = await copyText(text);
        showStatus(message);
    };

    // Compartilha uma tarefa
    const handleShare = async (text: string) => {
        const message = await shareText(text);
        showStatus(message);
    };

    return (
        <>
            <h1>To-Do List</h1>

            {status && (<span className="status" role="status" aria-live="polite">{status}</span>            )}

            <form onSubmit={addTask}>
                <input name="task" type="text" placeholder="Crie uma task" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
                <button title="Adicionar tarefa" type="submit">Adicionar</button>
            </form>
        
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        <label className="task-content">
                            <input type="checkbox" checked={task.checked} onChange={() => toggleTask(task.id)} />
                            <span>{task.text}</span>
                            <div className="task-actions">
                                <button title="Copiar tarefa" className="task-action" type="button" onClick={() => handleCopy(task.text)}>
                                    <svg className="task-action-icon" viewBox="0 0 24 24">
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 0 2 2"/>
                                    </svg>
                                </button>
                                <button title="Compartilhar tarefa" className="task-action" type="button" onClick={() => handleShare(task.text)}>
                                    <svg className="task-action-icon" viewBox="0 0 24 24">
                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                        <polyline points="16 6 12 2 8 6"/>
                                        <line x1="12" x2="12" y1="2" y2="15"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="task-location">{task.location}</div>
                        </label>
                    </li>
                ))}
            </ul>

            <Summary tasks={tasks} onFilterChange={setFilter} />
        </>
    );
}