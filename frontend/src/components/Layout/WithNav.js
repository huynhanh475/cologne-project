import Navbar from '../NavBar/NavBar';
import { Outlet } from 'react-router';

export default () => {
    return (
        <>
            <div className="navbarcomponent">
                <Navbar />
            </div>
            <Outlet />
        </>
    );
};