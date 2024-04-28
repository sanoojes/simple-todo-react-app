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
            <button
                type="button"
                className="absolute top-4 right-2 bg-slate-800 hover:bg-slate-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 transition-colors"
                onClick={() => {
                    open(
                        `https://github.com/sanoojes` +
                            import.meta.env.BASE_URL,
                        "SingleSecondaryWindowName"
                    );
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="2rem"
                    height="2rem"
                    fill="#fff"
                >
                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
                </svg>
            </button>
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
