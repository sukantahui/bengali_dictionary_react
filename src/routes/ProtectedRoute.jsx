import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {

    const {
        authenticated,
        loading,
    } = useAuth();

    if (loading) {

        return (

            <div className="text-center text-white py-20">

                Loading...

            </div>

        );

    }

    if (!authenticated) {

        return <Navigate to="/login" replace />;

    }

    return children;

}