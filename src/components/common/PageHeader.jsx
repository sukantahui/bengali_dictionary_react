export default function PageHeader({

    title,
    subtitle = null,

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

            <div>

                <h1 className="text-3xl font-bold text-white">

                    {title}

                </h1>

                {subtitle && (

                    <div className="mt-2 text-slate-400">

                        {subtitle}

                    </div>

                )}

            </div>

            {/* Right */}

            <div className="flex flex-wrap items-center gap-3">

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