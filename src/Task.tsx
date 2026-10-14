export interface Task {
    id: string;
    text: string;
    checked: boolean;
}

export function createTask(text: string): Task {
    return {
        id: crypto.randomUUID(),
        text,
        checked: false
    };
}