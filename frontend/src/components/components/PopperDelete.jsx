
import { Modal } from '@mui/material/';
import { toast } from 'react-toastify';

import * as topicService from '../../service/TopicService'
import * as taskService from '../../service/TaskService'

const PopperDelete = ({ type, dataId, openPopperDelete, onNotify, onReset, onClosePopperDelete }) => {
    // handle
    const handleDelete = () => fetchApiDelete();
    const errorNotify = () => toast.error("Delete failed!", {
        position: "top-right"
    });

    // api
    const fetchApiDelete = async () => {
        let data = null;
        if (type === 'topic') data = await topicService.remove(dataId, errorNotify);
        else if (type === 'task') data = await taskService.remove(dataId, errorNotify);

        onClosePopperDelete();
        onReset();
        if (data) onNotify("Delete successfully!");
    }

    return (
        <Modal open={openPopperDelete}>
            <div className="px-12 py-3 rounded-lg bg-white w-1/3 absolute top-1/4 left-1/2 translate-x-[-50%]
            shadow shadow-sky-400">
                <div className="flex justify-end">
                    <button type="button" className="hover:text-sky-950"
                        onClick={onClosePopperDelete}>
                        <svg className="w-8 h-8  size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
                <div className="py-5 my-2 border-y-2 border-y-gray-300
                flex justify-center text-xl">
                    Are you sure want to delete this item?
                </div>
                <div className="flex justify-end gap-3">
                    <button onClick={onClosePopperDelete} type="button"
                        className="flex justify-center rounded-xl min-w-28 bg-sky-900 p-2 
                            text-white text-base
                            shadow-md shadow-gray-400
                            hover:bg-gray-200 hover:text-gray-950">
                        Cancel
                    </button>
                    <button type="button"
                        className="flex justify-center rounded-xl min-w-28 bg-red-700 p-2 
                            text-white text-base
                            shadow-md shadow-red-400
                            hover:bg-red-200 hover:text-red-950"
                        onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PopperDelete;