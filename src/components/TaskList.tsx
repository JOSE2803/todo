import { PlusCircle } from "phosphor-react";
import { useState } from "react";

import { TaskCard } from "./TaskCard";

import clipboard from "../assets/clipboard.svg";

import styles from "./TaskList.module.css";

export interface Task {
    id: number,
    message: string,
    concluded: boolean
}

export function TaskList() {

    const [task, setTask] = useState<Task []>([]);

    const [message, setMessage] = useState("");

    const numberOfTasks = task.length;
    const numberOfTasksConcluded = task.filter(item => item.concluded).length;

    function addTask(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (message.trim() !== "") {
            const newTask = {
                id: Math.random(),
                message,
                concluded: false
            };
            setTask(currentTasks => [...currentTasks, newTask]);
            setMessage("");
        }
    }

    function removeTaskById(taskId: number) {
        const updatedTasks = task.filter(item => item.id !== taskId);
        setTask(updatedTasks);
    }

    function changeTaskStatusByid(taskId: number) {
        const updatedTasks = task.map(item => {
            if (item.id === taskId) {
                return { ...item, concluded: !item.concluded };
            }
            return item;
        });
        setTask(updatedTasks);
    }

    function setTaskMessage(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value)
    }

    return (
        <>
            <form className={styles.newTask}>
                <input
                    value={message}
                    onChange={setTaskMessage}
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                />
                <button onClick={addTask}>Criar {<PlusCircle size={20} />}</button>
            </form>
            <div className={styles.taskList}>
                <header>
                    <div className={styles.created}>
                        <span>Tarefas criadas</span>
                        <i>{numberOfTasks}</i>
                    </div>
                    <div className={styles.finished}>
                        <span>Concluídas</span>
                        {numberOfTasks > 0 && <i>{numberOfTasksConcluded} de {numberOfTasks}</i>}
                        {numberOfTasks === 0 && <i>0</i>}
                    </div>
                </header>
                {numberOfTasks > 0 &&
                    <main className={styles.list}>
                        {task.map(item => {
                            return <TaskCard
                                task={item}
                                removeTaskById={removeTaskById}
                                changeTaskStatusByid={changeTaskStatusByid}
                            />
                        })}
                    </main>
                }
                {numberOfTasks === 0 &&
                    <main className={styles.emptyList}>
                        <img src={clipboard} />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    </main>
                }
            </div>
        </>

    );
}