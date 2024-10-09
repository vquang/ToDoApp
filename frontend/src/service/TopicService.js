import http from '../util/http';

export const create = async ({ topicName, date }, notify) => {
    try {
        const res = await http.post('/topic', {
            topicName,
            date
        }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const update = async (id, { topicName, date }, notify) => {
    try {
        const res = await http.put(`/topic/${id}`, {
            topicName,
            date
        }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
        
        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const remove = async (id, notify) => {
    try {
        const res = await http.delete(`/topic/${id}`
            , { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        );

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const getById = async (id, notify) => {
    try {
        const res = await http.get(`/topic/${id}`
            , { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        );

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const getList = async (page = 1, limit = 10, search = '', date, notify) => {
    try {
        const res = await http.get('/topic', {
            params: {
                page,
                limit,
                search,
                date
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};