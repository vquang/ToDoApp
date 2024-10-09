
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination'

import * as topicService from '../../service/TopicService';
import Topic from './Topic';
import TopicCreateForm from './TopicCreateForm';
import PopperDelete from '../components/PopperDelete';


const TopicFrame = ({ date, onClickTopic }) => {

    // state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(16);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [topics, setTopics] = useState([]);
    const [openTopicCreateForm, setOpenTopicCreateForm] = useState(false);
    const [openPopperDelete, setOpenPopperDelete] = useState(false);
    const [topicId, setTopicId] = useState(0);

    // handle
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };
    const handPageChange = (event, value) => setPage(value);
    const reset = () => {
        setPage(1);
        setSearch('');
        fetchApiGetListTopic(1, '');
    }
    const handleOpenTopicCreateForm = () => setOpenTopicCreateForm(true);
    const handleCloseTopicCreateForm = () => setOpenTopicCreateForm(false);
    const handleOpenPopperDelete = () => setOpenPopperDelete(true);
    const handleClosePopperDelete = () => setOpenPopperDelete(false);
    const errorNotify = () => toast.error("Error", {
        position: "top-right"
    });
    const successNotify = (message) => toast.success(message, {
        position: "top-right"
    });
    const handleTopicId = (id) => setTopicId(id);

    // effect
    useEffect(() => {
        reset();
    }, [date]);

    useEffect(() => {
        fetchApiGetListTopic();
    }, [page, search]);

    // api
    const fetchApiGetListTopic = async () => {
        const data = await topicService.getList(page, limit, search, format(date, 'dd-MM-yyyy'), errorNotify);
        setTopics(data.items);
        setTotalPages(data.totalPages);
    }

    return (
        <>
            <ToastContainer autoClose={1000} />
            <TopicCreateForm date={date} openTopicCreateForm={openTopicCreateForm}
                onNotify={successNotify} onReset={reset} onCloseTopicCreateForm={handleCloseTopicCreateForm} />
            <PopperDelete type="topic" dataId={topicId} openPopperDelete={openPopperDelete}
                onNotify={successNotify} onReset={reset} onClosePopperDelete={handleClosePopperDelete} />

            <div className='h-full flex flex-col p-5 items-center justify-start'>
                <div className='w-full mb-5 flex justify-between'>
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
                        onClick={handleOpenTopicCreateForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="w-full flex flex-wrap gap-8 justify-start">
                    {topics.map(topic => <Topic
                        key={topic.topicId}
                        topic={topic}
                        onOpenPopperDelete={handleOpenPopperDelete}
                        onTopicId={handleTopicId}
                        onClickTopic={onClickTopic} />)}
                </div>
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
        </>
    )
};

export default TopicFrame;