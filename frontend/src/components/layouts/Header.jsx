
import { useNavigate } from 'react-router-dom';

import * as userService from '../../service/UserService';

const Header = () => {

    // state
    const navigate = useNavigate();

    // handle
    const handleLogout = () => {
        fetchApiLogout();
    }

    // api
    const fetchApiLogout = async () => {
        await userService.logout();
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className="fixed top-0 left-0 right-0 h-14
        flex items-center justify-end pr-14
        shadow-md shadow-sky-900">
            <button className='min-w-28 p-2 border-b-2 border-sky-900
                text-sky-900 font-bold text-lg
                hover:bg-sky-200 hover:text-sky-900 hover:shadow-inner hover:shadow-sky-900'
                type='button'
                onClick={handleLogout}
            >Logout</button>
        </div>
    );
};

export default Header;