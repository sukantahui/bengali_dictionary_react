export default function PageHeader({

    title,
    subtitle = null,
    stats = [],
    buttonText = null,
    onButtonClick,

    button = null,

    children,

}) {

    return (

        <header
            className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >

            {/* Left */}

            {/* Left */}

            <div className="flex-1">

                <h1 className="text-3xl font-bold text-white">

                    {title}

                </h1>

                {subtitle && (

                    <p className="mt-2 text-slate-400">

                        {subtitle}

                    </p>

                )}

                {stats.length > 0 && (

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">

                        {stats.map((stat) => (

                            <div
                                key={stat.label}
                                className="
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800
                        px-5
                        py-4
                    "
                            >

                                <p className="text-sm text-slate-400">

                                    {stat.label}

                                </p>

                                <p className="mt-1 text-2xl font-bold text-white">

                                    {stat.value}

                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* Right */}

            <div className="flex flex-wrap items-start gap-3 lg:self-start">
                {children}
                {button}
                {!button && buttonText && (
                    <button
                        type="button"
                        onClick={onButtonClick}
                        className="
                            rounded-lg
                            bg-blue-600
                            px-5
                            py-3
                            font-semibold
                            text-white
                            transition-colors
                            duration-200
                            hover:bg-blue-700
                        "
                    >

                        {buttonText}

                    </button>

                )}

            </div>

        </header>

    );

}