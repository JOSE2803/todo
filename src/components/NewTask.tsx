import { PlusCircle } from "phosphor-react";

import styles from "./NewTask.module.css";

export function NewTask() {
    return (
        <form className={styles.newTask}>
            <input
                name="task"
                placeholder="Adicione uma nova tarefa"
            />
            <button>Criar {<PlusCircle size={20} />}</button>
        </form>
    );
}