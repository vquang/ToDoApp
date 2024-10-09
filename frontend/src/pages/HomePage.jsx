import { useState, useEffect } from 'react';
import { DatePicker } from 'rsuite';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';

import Calendar from '../components/components/Calendar';
import * as topicService from '../service/TopicService';
import TopicFrame from '../components/topic/TopicFrame';
import { da } from 'date-fns/locale';
import TaskFrame from '../components/task/TaskFrame';

const HomePage = () => {

    // state
    const [date, setDate] = useState(new Date());
    const [topicId, setTopicId] = useState({});
    const [isDetail, setIsDetail] = useState(false);

    // handle
    const handlePickDate = (value) => {
        setDate(value ? value : new Date());
        setIsDetail(false);
    }
    const handleClickTopic = (_topicId) => {
        setTopicId(_topicId);
        setIsDetail(true);
    }
    const errorNotify = () => toast.error("Error", {
        position: "top-right"
    });
    const handleIsDetail = () => setIsDetail(!isDetail);

    // api



    return (
        <div className="h-full mb-5 flex gap-4">
            <ToastContainer autoClose={1000} />
            <div className="basis-1/3 p-5
            shadow-md shadow-sky-900
            flex flex-col items-center gap-5">
                <div className='h-5 mb-5'>
                    <DatePicker
                        format="dd-MM-yyyy"
                        value={date}
                        onChange={handlePickDate} />
                </div>
                <div>
                    <Calendar date={date} handlePickDate={handlePickDate} />
                </div>
            </div>
            <div className="w-full">
                {isDetail
                    ? <TaskFrame topicId={topicId} onIsDetail={handleIsDetail} />
                    : <TopicFrame date={date} onClickTopic={handleClickTopic} />}
            </div>
        </div>
    );
};

export default HomePage;