
import { useState } from 'react';
import { Modal } from '@mui/material/';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import * as topicService from '../../service/TopicService';

const TopicCreateForm = ({date, openTopicCreateForm, onNotify, onReset, onCloseTopicCreateForm}) => {
    // state
    const [topic, setTopic] = useState({'topicName':'', 'date': new Date() })
    const [isError, setIsError] = useState({ 'topicName': false});

    // handle
    const handleTopicChange = (event) => setTopic({ ...topic, 'topicName': event.target.value });
    const handleSubmit = () => fetchApiCreateTopic();
    const handleClose = () => {
        onCloseTopicCreateForm();
        setIsError({ 'topicName': false });
    }
    const isValid = () => {
        let isOk = true;
        if (!topic.topicName) {
            setIsError(pre => ({ ...pre, 'topicName': true }));
            isOk = false;
        } else setIsError(pre => ({ ...pre, 'topicName': false }));
        return isOk;
    }
    const errorNotify = () => toast.error("Create failed!", {
        position: "top-right"
    });

    // api
    const fetchApiCreateTopic = async () => {
        if (!isValid()) return;
        topic.date = format(date, 'dd-MM-yyyy');
        const data = await topicService.create(topic, errorNotify);
        setTopic({ "topicName": "" });
        onCloseTopicCreateForm();
        onReset();
        if(data) onNotify("Create successfully!");
    }

    return (
        <Modal open={openTopicCreateForm}>
            <form className="px-12 py-3 rounded-lg bg-white w-2/5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            shadow-md shadow-sky-400" onSubmit={(event) => event.preventDefault()}>
                <div className="flex justify-end">
                    <button type="button" className="hover:text-sky-950"
                        onClick={handleClose}>
                        <svg className="w-8 h-8  size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
                <div className="py-3 my-3 border-t-2 border-y-gray-300">
                    <label className="font-bold text-sky-900 text-base" 
                    htmlFor="topic-topicName">Topic Name:</label>
                    <input className={`my-2 p-2 w-full outline-none border-b-2 border-sky-900 text-sky-900
                    focus:shadow-md focus:shadow-sky-400
                    ${isError.topicName && 'border-b-red-400'}`}
                        onChange={handleTopicChange}
                        value={topic.topicName}
                        id="topic-topicName" type="text" placeholder="Enter topicName..." />
                    {isError.topicName && <div className='text-red-400'>Please fill out this field.</div>}
                </div>
                <div className="flex justify-end">
                    <button type="button" className="flex justify-center rounded-xl min-w-28 bg-sky-700 p-2
                        text-white shadow shadow-sky-400
                        hover:bg-sky-200 hover:text-sky-950"
                        onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TopicCreateForm;