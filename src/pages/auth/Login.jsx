import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    BookOpen,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LoaderCircle,
    ShieldCheck,
    Search,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit(data) {

        try {

            await login(data);

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {

            alert(
                error.response?.data?.message ??
                "Login failed."
            );

        }

    }

    return (

        <div
            className="
                min-h-screen
                bg-slate-950
                flex
                items-center
                justify-center
                px-6
                py-12
            "
        >

            <div
                className="
                    w-full
                    max-w-6xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900/60
                    backdrop-blur-xl
                    shadow-2xl
                    grid
                    lg:grid-cols-2
                "
            >

                {/* LEFT PANEL */}

                <div
                    className="
                        hidden
                        lg:flex
                        flex-col
                        justify-center
                        p-16
                        bg-gradient-to-br
                        from-blue-900
                        via-slate-900
                        to-slate-950
                    "
                >

                    <div className="flex items-center gap-3">

                        <BookOpen
                            size={42}
                            className="text-blue-400"
                        />

                        <h1
                            className="
                                text-5xl
                                font-bold
                            "
                        >
                            Bengali
                            <br />
                            Dictionary
                        </h1>

                    </div>

                    <p
                        className="
                            mt-8
                            text-lg
                            leading-8
                            text-slate-300
                        "
                    >

                        Discover Bengali words,
                        meanings and related
                        vocabulary through a
                        fast and modern dictionary.

                    </p>

                    <div
                        className="
                            mt-12
                            space-y-5
                        "
                    >

                        <Feature
                            icon={<Search size={20} />}
                            text="Instant Word Search"
                        />

                        <Feature
                            icon={<BookOpen size={20} />}
                            text="Thousands of Dictionary Entries"
                        />

                        <Feature
                            icon={<ShieldCheck size={20} />}
                            text="Secure Admin Dashboard"
                        />

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div
                    className="
                        p-8
                        md:p-16
                    "
                >

                    <div
                        className="
                            mx-auto
                            max-w-md
                        "
                    >

                        <h2
                            className="
                                text-4xl
                                font-bold
                                text-white
                            "
                        >

                            Welcome Back 👋

                        </h2>

                        <p
                            className="
                                mt-3
                                text-slate-400
                            "
                        >

                            Sign in to manage your
                            Bengali Dictionary.

                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-10 space-y-7"
                        >

                            {/* EMAIL */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        font-medium
                                    "
                                >

                                    Email

                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-500
                                        "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Enter Email or User ID"
                                        {...register("email", {
                                            required: "Please enter your Email or User ID.",
                                        })}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-700
                                            bg-slate-800
                                            py-3
                                            pl-12
                                            pr-4
                                            outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-500/30
                                        "
                                    />

                                </div>

                                {errors.email && (

                                    <p
                                        className="
                                            mt-2
                                            text-sm
                                            text-red-400
                                        "
                                    >

                                        {errors.email.message}

                                    </p>

                                )}

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        font-medium
                                    "
                                >

                                    Password

                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-500
                                        "
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required:
                                                "Please enter your password.",
                                        })}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-700
                                            bg-slate-800
                                            py-3
                                            pl-12
                                            pr-12
                                            outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-500/30
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    >

                                        {showPassword
                                            ? <EyeOff size={18} />
                                            : <Eye size={18} />}

                                    </button>

                                </div>

                                {errors.password && (

                                    <p
                                        className="
                                            mt-2
                                            text-sm
                                            text-red-400
                                        "
                                    >

                                        {errors.password.message}

                                    </p>

                                )}

                            </div>

                            {/* REMEMBER */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <label
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        text-slate-400
                                    "
                                >

                                    <input
                                        type="checkbox"
                                        className="
                                            rounded
                                        "
                                    />

                                    Remember me

                                </label>

                            </div>

                            {/* LOGIN */}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-xl
                                    bg-blue-600
                                    py-3
                                    text-lg
                                    font-semibold
                                    transition
                                    hover:bg-blue-700
                                    disabled:opacity-70
                                "
                            >

                                {isSubmitting ? (

                                    <>

                                        <LoaderCircle
                                            size={20}
                                            className="animate-spin"
                                        />

                                        Logging in...

                                    </>

                                ) : (

                                    "Login"

                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

function Feature({
    icon,
    text,
}) {

    return (

        <div
            className="
                flex
                items-center
                gap-4
                text-lg
            "
        >

            <div
                className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600/20
                    text-blue-300
                "
            >

                {icon}

            </div>

            <span>

                {text}

            </span>

        </div>

    );

}