import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate();

    const {
        authenticated,
        user,
        logout,
    } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/");

    };

    return (
        <nav className="bg-slate-900 border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    📖 Bengali Dictionary
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white"
                    >
                        Home
                    </Link>
                    {authenticated ? (

                        <>
                            <Link
                                to="/dictionary"
                                className="text-gray-300 hover:text-white"
                            >
                                Dictionary
                            </Link>

                            <span className="text-green-400 font-medium">
                                👋 {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-red-400 hover:text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (

                        <>
                            <Link
                                to="/login"
                                className="text-gray-300 hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-gray-300 hover:text-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}