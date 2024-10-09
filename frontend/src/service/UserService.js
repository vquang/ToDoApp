import http from '../util/http';

export const register = async ({ username, password, confirmPassword }, notify) => {
    try {
        const res = await http.post('/user/register', {
            username,
            password,
            confirmPassword
        });
        return res.data.data;
    } catch (error) {
        console.error(error);
        notify('Username already exists!');
    }
};

export const login = async ({ username, password }, notify) => {
    try {
        const res = await http.post('/user/login', {
            username,
            password
        });
        return res.data.data;
    } catch (error) {
        console.error(error);
        notify();
    }
};

export const logout = async () => {
    try {
        const res = await http.get('/user/logout');
        return res.data.data;
    } catch (error) {
        console.error(error);
    }
};