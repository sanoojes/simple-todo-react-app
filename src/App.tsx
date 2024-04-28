import { useState, useEffect } from "react";
import Button from "./components/ui/Button";
import ListItem from "./components/ui/ListItem";

type TaskType = {
    id: number;
    text: string;
    completed: boolean;
};

function App() {
    const [inputText, setInputText] = useState<string>("");
    // Initialize tasks from local storage, or default to an empty array
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [nextId, setNextId] = useState<number>(() => {
        const storedId = localStorage.getItem("nextId");
        return storedId ? parseInt(storedId, 10) : 0;
    });

    useEffect(() => {
        // Update local storage when tasks change
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("nextId", nextId.toString());
    }, [tasks, nextId]);

    const handleInputChange = (text: string) => {
        setInputText(text);
    };

    const addTask = () => {
        if (inputText.trim() !== "") {
            const newTask = { id: nextId, text: inputText, completed: false };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNextId((prevId) => prevId + 1);
            setInputText("");
        }
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const completeTask = (taskId: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    return (
        <>
            <main className="flex-center h-screen w-screen bg-[url('/bg.webp')] bg-cover bg-center m-0 font-semibold font-sans">
                <div className="flex-center flex-col gap-4 w-11/12 bg-neutral-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border border-gray-100 px-8 py-10 max-w-screen-sm">
                    <h1 className="text-3xl font-bold text-orange-100">
                        To-Do List
                    </h1>
                    <div className="flex gap-2 bg-neutral-50 bg-opacity-70 rounded-full overflow-hidden shadow-lg w-full border-2 border-neutral-900 border-opacity-35">
                        <input
                            value={inputText}
                            type="text"
                            placeholder="Add your task"
                            onChange={(e) => handleInputChange(e.target.value)}
                            className="px-4 rounded-full text-neutral-950 focus:outline-none bg-transparent placeholder:text-neutral-800 w-full"
                            aria-label="Enter a task"
                        />
                        <Button onClick={addTask}>Add Task</Button>
                    </div>
                    <ul className="w-full flex flex-col gap-2">
                        {tasks.map((task) => (
                            <ListItem
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                onDelete={() => deleteTask(task.id)}
                                onComplete={() => completeTask(task.id)}
                                completed={task.completed}
                            />
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default App;

