import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination'

import PopperDelete from '../components/PopperDelete';
import * as taskService from '../../service/TaskService';
import * as topicService from '../../service/TopicService';
import TaskCreateForm from "./TaskCreateForm";
import TaskUpdateForm from "./TaskUpdateForm";
import Task from "./Task";

const TaskFrame = ({ topicId, onIsDetail }) => {
    // state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState([]);
    const [openTaskCreateForm, setOpenTaskCreateForm] = useState(false);
    const [openTaskUpdateForm, setOpenTaskUpdateForm] = useState(false);
    const [openPopperDelete, setOpenPopperDelete] = useState(false);
    const [taskId, setTaskId] = useState(0);
    const [topic, setTopic] = useState({});
    const [task, setTask] = useState({});
    const inputRef = useRef(null);

    // handle
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };
    const handPageChange = (event, value) => setPage(value);
    const reset = () => {
        setPage(1);
        setSearch('');
        fetchApiGetListTask(1, '');
    }
    const handleOpenTaskCreateForm = () => setOpenTaskCreateForm(true);
    const handleCloseTaskCreateForm = () => setOpenTaskCreateForm(false);
    const handleOpenTaskUpdateForm = () => setOpenTaskUpdateForm(true);
    const handleCloseTaskUpdateForm = () => setOpenTaskUpdateForm(false);
    const handleOpenPopperDelete = () => setOpenPopperDelete(true);
    const handleClosePopperDelete = () => setOpenPopperDelete(false);
    const errorNotify = () => toast.error("Error", {
        position: "top-right"
    });
    const successNotify = (message) => toast.success(message, {
        position: "top-right"
    });
    const handleTaskId = (id) => setTaskId(id);
    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            if (!event.target.value) return;
            inputRef.current.blur();
        }
    }
    const handleNotFocus = async () => {
        if (!inputRef.current.value) return;
        await fetchApiUpdateTopic(inputRef.current.value)
        await fetchApiGetTopic();
    }
    const handleClickUpdateTask = (task) => {
        setOpenTaskUpdateForm(true);
        setTask(task);
    }

    // effect
    useEffect(() => {
        fetchApiGetTopic();
    }, []);

    useEffect(() => {
        fetchApiGetListTask();
    }, [page, search]);

    // api
    const fetchApiGetListTask = async () => {
        const data = await taskService.getList(topicId, page, limit, search, errorNotify);
        setTasks(data.items);
        setTotalPages(data.totalPages);
    }
    const fetchApiGetTopic = async () => {
        const data = await topicService.getById(topicId, errorNotify);
        setTopic(data);
    }
    const fetchApiUpdateTopic = async (topicName) => {
        const data = await topicService.update(topicId, {
            'topicName': topicName,
            'date': format(topic.date, 'dd-MM-yyyy')
        }, errorNotify);
    }


    return (
        <>
            <ToastContainer autoClose={1000} />
            <TaskCreateForm topicId={topicId} openTaskCreateForm={openTaskCreateForm}
                onNotify={successNotify} onReset={reset} onCloseTaskCreateForm={handleCloseTaskCreateForm} />
            <TaskUpdateForm _data={task} openTaskUpdateForm={openTaskUpdateForm}
                onNotify={successNotify} onReset={reset} onCloseTaskUpdateForm={handleCloseTaskUpdateForm} />
            <PopperDelete type="task" dataId={taskId} openPopperDelete={openPopperDelete}
                onNotify={successNotify} onReset={reset} onClosePopperDelete={handleClosePopperDelete} />

            <div className='h-full flex flex-col p-5 items-center justify-start'>
                <div className='w-full mb-3 flex justify-between'>
                    <button className="flex justify-center rounded-full bg-sky-900 p-3
                    text-white shadow shadow-sky-400
                    hover:bg-sky-200 hover:text-sky-900"
                        onClick={onIsDetail}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <input className="p-2 w-3/4
                    border-2 border-sky-900
                    text-sky-900 text-base
                    rounded-xl
                    focus:outline-sky-400 focus:outline-4"
                        onChange={handleSearchChange}
                        value={search}
                        type="search" placeholder="search by name..." />
                    <button className="flex justify-center rounded-full bg-sky-900 p-3
                    text-white shadow shadow-sky-400
                    hover:bg-sky-200 hover:text-sky-900"
                        onClick={handleOpenTaskCreateForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div>
                    <input className="p-2 mb-3 w-full outline-0
                    text-sky-900 font-bold text-2xl
                    flex justify-center
                    border-b-2 border-b-sky-900
                    focus:outline-sky-400 focus:outline-4"
                        ref={inputRef}
                        defaultValue={topic.topicName}
                        onKeyDown={handlePressEnter}
                        onBlur={handleNotFocus}
                        type="text" />
                </div>

                <div className="w-full h-full flex flex-col gap-4 p-12 
                border-double border-sky-900 border-4 rounded-md overflow-y-auto">
                    {tasks.map(task => {
                        task.topicId = topicId;
                        return (
                            <Task key={task.taskId}
                                task={task}
                                onOpenPopperDelete={handleOpenPopperDelete}
                                onClickUpdateTask={handleClickUpdateTask}
                                onTaskId={handleTaskId}
                                onReset={fetchApiGetListTask}
                            />)
                    })}

                    <div className='w-full h-full flex justify-end items-end'>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handPageChange}
                            color="primary" showFirstButton showLastButton
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: '#0c4a6e',
                                    fontSize: '1.2rem',
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#0c4a6e',
                                    color: 'white',
                                },
                            }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskFrame;