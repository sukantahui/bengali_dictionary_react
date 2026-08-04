export default function WordCard({
    word,
    meaning,
    relatedWords = [],
    onRelatedWordClick,
}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                p-6
                transition
                duration-300
                hover:border-blue-500
                hover:shadow-lg
            "
        >

            <h3
                className="
                    text-center
                    text-3xl
                    font-bold
                    text-white
                "
            >

                {word}

            </h3>

            <p
                className="
                    mt-4
                    text-center
                    leading-7
                    text-slate-300
                "
            >

                {meaning}

            </p>

            {relatedWords.length > 0 && (

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        justify-center
                        gap-2
                    "
                >

                    {relatedWords.map((item) => (

                        <span
                            key={item}
                            onClick={() => onRelatedWordClick?.(item)}
                            className="
                                cursor-pointer
                                rounded-full
                                border
                                border-blue-700
                                bg-blue-900/30
                                px-3
                                py-1
                                text-xs
                                text-blue-300
                                transition
                                hover:bg-blue-700
                                hover:text-white
                            "
                        >
                            {item}
                        </span>

                    ))}

                </div>

            )}

        </div>

    );

}