import { Trash } from "phosphor-react";

import check from "../assets/check.svg";
import noCheck from "../assets/noCheck.svg";

import { Task } from "./TaskList";

import styles from "./TaskCard.module.css";

interface TaskCardProps {
    task: Task,
    removeTaskById: (id: number) => void,
    changeTaskStatusByid: (id: number) => void
}

export function TaskCard({ task, removeTaskById, changeTaskStatusByid }: TaskCardProps) {

    function onRemoveTaskById() {
        removeTaskById(task.id);
    }

    function onChangeTaskStatusByid() {
        changeTaskStatusByid(task.id);
    }

    return (
        <div className={styles.taskCard}>
            <div>
                {task.concluded &&
                    <>
                        <img src={check} onClick={onChangeTaskStatusByid}/>
                        <span className={styles.taskConcluded}>{task.message}</span>
                    </>
                }
                {!task.concluded &&
                    <>
                        <img src={noCheck} onClick={onChangeTaskStatusByid}/>
                        <span className={styles.taskNotConcluded}>{task.message}</span>
                    </>
                }
            </div>
            <div>
                <Trash className={styles.deleteTask} size={24} onClick={onRemoveTaskById} />
            </div>


        </div>
    );
}