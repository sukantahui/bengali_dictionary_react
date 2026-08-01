import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [loading, setLoading] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    const login = async (credentials) => {

        const response = await authService.login(credentials);

        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);

        setToken(token);

        setUser(user);

        return response.data;

    };

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    const logout = async () => {

        try {

            if (token) {
                await authService.logout();
            }

        } catch (error) {

            console.error(error);

        } finally {

            localStorage.removeItem("token");

            setToken(null);

            setUser(null);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Fetch Logged In User
    |--------------------------------------------------------------------------
    */

    const fetchProfile = async () => {

        try {

            const response = await authService.profile();

            /*
            |--------------------------------------------------------------------------
            | If your API returns:
            |
            | {
            |   status:true,
            |   user:{...}
            | }
            |--------------------------------------------------------------------------
            */

            setUser(response.data.user);

            /*
            |--------------------------------------------------------------------------
            | If your API returns:
            |
            | {
            |   status:true,
            |   data:{...}
            | }
            |
            | Then use:
            |
            | setUser(response.data.data);
            |--------------------------------------------------------------------------
            */

        } catch (error) {

            console.error(error);

            localStorage.removeItem("token");

            setToken(null);

            setUser(null);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Initialize Authentication
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function init() {

            if (token) {

                await fetchProfile();

            }

            setLoading(false);

        }

        init();

    }, [token]);

    /*
    |--------------------------------------------------------------------------
    | Context Provider
    |--------------------------------------------------------------------------
    */

    return (

        <AuthContext.Provider
            value={{

                user,

                token,

                loading,

                authenticated: !!token,

                login,

                logout,

                fetchProfile,

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}