import { useNavigate } from "react-router-dom";

export default function DictionaryEntry({
    word,
    meaning,
    relatedWords = [],
}) {

    const navigate = useNavigate();

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                p-8
                shadow-lg
            "
        >

            <h2
                className="
                    text-5xl
                    font-bold
                    text-center
                    text-white
                "
            >
                {word}
            </h2>

            <div className="mt-8">

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-blue-400
                    "
                >
                    অর্থ
                </h3>

                <p
                    className="
                        mt-3
                        text-lg
                        leading-8
                        text-slate-300
                    "
                >
                    {meaning}
                </p>

            </div>

            {relatedWords.length > 0 && (

                <div className="mt-8">

                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-blue-400
                        "
                    >
                        সংশ্লিষ্ট শব্দ
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-3">

                        {relatedWords.map((item) => (

                            <button
                                key={item}
                                onClick={() =>
                                    navigate(`/search?q=${encodeURIComponent(item)}`)
                                }
                                className="
                                    rounded-full
                                    border
                                    border-blue-600
                                    bg-blue-900/30
                                    px-4
                                    py-2
                                    text-sm
                                    text-blue-300
                                    transition
                                    hover:bg-blue-700
                                    hover:text-white
                                "
                            >
                                {item}
                            </button>

                        ))}

                    </div>

                </div>

            )}

        </div>

    );

}