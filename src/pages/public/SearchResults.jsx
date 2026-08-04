import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import WordCard from "../../components/public/WordCard";
import { lookupWord } from "../../services/publicDictionaryService";
import DictionaryEntry from "../../components/public/DictionaryEntry";
import { ArrowLeft } from "lucide-react";


export default function SearchResults() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const word = searchParams.get("q") || "";
    const [exactWord, setExactWord] = useState(null);
    const [similarWords, setSimilarWords] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (word) {

            loadWords();

        } else {

            setLoading(false);

        }

    }, [word]);

    async function loadWords() {

        try {

            setLoading(true);
            const response = await lookupWord(word);
            setExactWord(response.data.data.exact);
            setSimilarWords(response.data.data.similar);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="space-y-10">

            <div className="space-y-6">

                <button
                    onClick={() => navigate("/")}
                    className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-slate-300
            transition
            hover:border-blue-500
            hover:text-white
        "
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </button>

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-white">

                        {exactWord ? exactWord.word : "Search Results"}

                    </h1>
                    <p className="mt-2 text-slate-400">

                        {exactWord
                            ? "Dictionary Entry"
                            : `Search Results for "${word}"`}

                    </p>

                    <p className="mt-2 text-slate-400">

                        Search:

                        <span className="ml-2 font-semibold text-white">

                            {word}

                        </span>

                    </p>

                </div>

            </div>

            {loading && (

                <p className="text-slate-400">

                    Searching...

                </p>

            )}

            {!loading && !exactWord && similarWords.length > 0 && (

                <div
                    className="
                        rounded-xl
                        border
                        border-yellow-700
                        bg-yellow-900/20
                        p-5
                        text-yellow-300
                    "
                >
                    No exact dictionary entry found.

                    <br />

                    Showing similar words instead.
                </div>

            )}

            {!loading && !exactWord && similarWords.length === 0 && (

                <div
                    className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            p-10
            text-center
            text-slate-400
        "
                >
                    No matching words found.
                </div>

            )}

            {!loading && (exactWord || similarWords.length > 0) && (

                <>
                    {exactWord && (

                        <DictionaryEntry
                            word={exactWord.word}
                            meaning={exactWord.meaning}
                            relatedWords={exactWord.relatedWords}
                        />

                    )}

                    {similarWords.length > 0 && (

                        <div className="mt-8">

                            <h2 className="mb-5 text-2xl font-semibold text-white">

                                Similar Words ({similarWords.length})

                            </h2>

                        </div>

                    )}

                    {similarWords.length > 0 && (

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {similarWords.map((item) => (

                                <WordCard
                                    key={item.id}
                                    word={item.word}
                                    meaning={item.meaning}
                                    relatedWords={item.relatedWords}
                                    onRelatedWordClick={(relatedWord) =>
                                        navigate(`/search?q=${encodeURIComponent(relatedWord)}`)
                                    }
                                />

                            ))}

                        </div>

                    )}

                </>

            )}

        </div>

    );

}