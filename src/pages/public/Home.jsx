import { useEffect, useState } from "react";
import HeroSection from "../../components/public/HeroSection";
import WordCard from "../../components/public/WordCard";
import { getLatestWords } from "../../services/publicDictionaryService";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [latestWords, setLatestWords] = useState([]);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadLatestWords();
    }, []);

    async function loadLatestWords() {
        try {
            const response = await getLatestWords();
             console.log("Latest API:", response.data);
            setLatestWords(response.data.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleSearch() {
        if (!search.trim()) {
            return;
        }
        navigate(
            `/search?q=${encodeURIComponent(search)}`
        );
    }
    return (

        <>

            <HeroSection
                search={search}
                onSearchChange={(e) =>

                    setSearch(e.target.value)

                }
                onSearch={handleSearch}
            />

            <section className="mt-20">

                <h2 className="mb-8 text-3xl font-bold text-white">

                    Latest Words

                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {latestWords.map((word) => (
                        <WordCard
                            key={word.id}
                            word={word.word}
                            meaning={word.meaning}
                        />
                    ))}

                </div>

            </section>

        </>

    );

}