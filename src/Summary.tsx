import { Task } from "./Task";

interface SummaryProps {
    tasks: Task[];
}

export function Summary({ tasks }: SummaryProps) {
    const numberCheckedTasks = tasks.filter(task => task.checked ).length;
    const numberUncheckedTasks = tasks.length - numberCheckedTasks;

    return (
        <>
            <p>Tarefas concluídas: {numberCheckedTasks}</p>
            <p>Tarefas pendentes: {numberUncheckedTasks}</p>
            <p>Total de tarefas: {tasks.length}</p>
        </>
    )
}