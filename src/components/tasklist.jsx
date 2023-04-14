import React, { useState } from 'react';
import './tasklist.css'

function Tasklist() {
    const [inputVal, setInputVal] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editInputId, setEditInputId] = useState(null);
    const [editInputVal, setEditInputVal] = useState('');

    function inputOnChange(event) {
        setInputVal(event.target.value);
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function onSubmitAddtask(event) {
        event.preventDefault();
        if (inputVal.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: inputVal }])
            setInputVal('');
        }
    }

    function editInput(taskId, taskText) {
        setEditInputId(taskId)
        setEditInputVal(taskText)
    }

    function cancelEditInput() {
        setEditInputId(null)
        setEditInputVal('')
    }

    function onSubmitEdit(event, taskId) {
        event.preventDefault()
        const updateInputval = tasks.map(task => {
            if (task.id === taskId) {
                if (editInputVal.trim() !== '') {
                    return { ...task, text: editInputVal }
                }
            }
            return task
        })
        setTasks(updateInputval)
        setEditInputId(null)
        setEditInputVal('')
    }


    return (
        <div className='tasklist_wrapper'>
            <h1 className='Heading'>Tasks List</h1>
            <form onSubmit={onSubmitAddtask} className='add_task_form'>
                <input
                    type="text"
                    placeholder='Add Task...'
                    value={inputVal}
                    onChange={inputOnChange}
                />
                <button type='submit'>Add Task</button>
            </form>
            <ul className='tasklist'>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                        <span className='task_count'>{index + 1}</span>
                        {editInputId === task.id ? (
                            <form onSubmit={event => { onSubmitEdit(event, task.id) }} className='edit_task_form'>
                                <input
                                    type="text"
                                    placeholder="Edit Task"
                                    value={editInputVal}
                                    onChange={event => (setEditInputVal(event.target.value))}
                                />
                                <div className="action_wrap">
                                    <button type="submit" className='round_btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </button>
                                    <button type="button" onClick={cancelEditInput} className='round_btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <span className='task'>{task.text}</span>
                                <div className='action_wrap'>
                                    <button type='button' onClick={() => { editInput(task.id, task.text) }} className='round_btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>
                                    <button type='button' onClick={() => { deleteTask(task.id) }} className='round_btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasklist;
