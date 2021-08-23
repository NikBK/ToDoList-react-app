import { React, useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import addDays from "date-fns/addDays";

const TASK_HEADER_MAPPING = {
    INBOX : "Inbox",
    TODAY : "Today",
    NEXT_7 : "Next 7 days",
};

const TaskItems = ({selectedTab, tasks}) => {
    let TasksToRender = [...tasks];

    if(selectedTab === 'NEXT_7'){
        TasksToRender = TasksToRender.filter((task) => 
            (isAfter(task.date, new Date()) && isBefore(task.date, addDays(new Date(), 7)))
        )
    }
    if(selectedTab === 'TODAY'){
        TasksToRender = TasksToRender.filter((task) => isToday(task.date))
    }
    return (
        <div className="task-item-container">
            {TasksToRender.map((task) => (
                <div className="task-item">
                    <p>{task.text}</p>
                    <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                </div>
            ))}
        </div>
    )
}

export const Task = ({ selectedTab }) => {
    const [showTask, setShowTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    // useEffect(
    //     (localStorage.getItem('taskList'), <AddTask />)
    // , []);

    // useEffect(localStorage.setItem('taskList', ...tasks), [tasks]);
    

    const addNewTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date() }
        setTasks((prevState) => [...prevState, newTaskItem]);
    }
    return (
        <div className="tasks">
            <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1>
            { selectedTab === 'INBOX' && <div className="add-task-btn" onClick={() => setShowTask((prevState) => !prevState)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div> }
            {showTask && <AddTask onAddtask={addNewTask} onCancel={() => setShowTask(false)} />}
            {tasks.length > 0 ? <TaskItems selectedTab={selectedTab} tasks={tasks} /> : <p><br />No task yet</p>}
        </div>
    )
}

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}

const AddTask = ({ onAddtask, onCancel }) => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState(null);
    return (
        <div className="add-task-dialog">
            <input value={task} onChange={(event) => setTask(event.target.value)} />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button
                        disabled={!task}
                        className="add-btn"
                        onClick={() => {
                            onAddtask(task, date);
                            onCancel();
                            setTask("");
                        }}
                    >Add Task</button>
                    <button
                        className="cancel-btn"
                        onClick={() => {
                            onCancel();
                            setTask("");
                        }}
                    >Cancel</button>
                </div>
                <div className="icon-container">
                    <DayPickerInput
                        onDayChange={(day) => setDate(day)}
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
