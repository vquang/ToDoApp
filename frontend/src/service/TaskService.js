import http from '../util/http';

export const create = async ({ taskName, topicId }, notify) => {
    try {
        const res = await http.post('/task', {
            taskName,
            topicId
        }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const update = async (id, { taskName, topicId }, notify) => {
    try {
        const res = await http.put(`/task/${id}`, {
            taskName,
            topicId
        }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const remove = async (id, notify) => {
    try {
        const res = await http.delete(`/task/${id}`,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        );

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const getList = async (topicId, page = 1, limit = 10, search = '', notify) => {
    try {
        const res = await http.get(`/task/${topicId}`, {
            params: {
                page,
                limit,
                search
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const done = async (id, notify) => {
    try {
        const res = await http.put(`/task/done/${id}`, {},
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        );

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};