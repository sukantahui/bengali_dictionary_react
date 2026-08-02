export default function Textarea({

    label,
    error,
    rows = 5,
    className = "",
    ...props

}) {

    return (

        <div className="space-y-2">

            {label && (

                <label className="block font-medium text-slate-300">

                    {label}

                </label>

            )}

            <textarea
                rows={rows}
                {...props}
                className={`
                    w-full
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-colors
                    focus:border-blue-500
                    ${className}
                `}
            />

            {error && (

                <p className="text-sm text-red-400">

                    {error}

                </p>

            )}

        </div>

    );

}