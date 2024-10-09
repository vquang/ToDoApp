
import Header from "./Header";

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <div className="py-16 h-screen">{children}</div>
        </div>
    );
};

export default Layout;