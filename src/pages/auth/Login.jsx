import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            await login(data);
            console.log("Login successful");
            navigate("/");
        } catch (error) {
            console.log(error.response);
            alert(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16">
            <div className="bg-slate-800 rounded-xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Login
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div>
                        <label className="block mb-2">
                            Username / Email
                        </label>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Username is required",
                            })}
                            className="w-full rounded-lg bg-slate-700 px-4 py-3"
                        />
                        {errors.email && (
                            <p className="text-red-400 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full rounded-lg bg-slate-700 px-4 py-3"
                        />

                        {errors.password && (
                            <p className="text-red-400 mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}