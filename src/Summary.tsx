import { Task } from "./Task";

type Filter = "all" | "completed" | "pending";

type SummaryProps = {
    tasks: Task[];
    onFilterChange: (filter: Filter) => void;
};

export function Summary({ tasks, onFilterChange }: SummaryProps) {

    const completedTasks = tasks.filter(task => task.checked).length;
    const pendingTasks = tasks.filter(task => !task.checked).length;

    return (
        <div className="summary">
            <p onClick={() => onFilterChange("completed")}>
                Tarefas concluídas: {completedTasks}
            </p>

            <p onClick={() => onFilterChange("pending")}>
                Tarefas pendentes: {pendingTasks}
            </p>

            <p onClick={() => onFilterChange("all")}>
                Todas as tarefas: {tasks.length}
            </p>
        </div>
    );
}