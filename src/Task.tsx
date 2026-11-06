import { getLocation } from './service/app';

export interface Task {
    id: string;
    text: string;
    checked: boolean;
    location: string;
}

export function createTask(text: string, location: string): Task {
    return {
        id: crypto.randomUUID(),
        text,
        checked: false,
        location
    };
}