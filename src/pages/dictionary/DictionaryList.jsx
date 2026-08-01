import { useEffect, useState } from "react";
import { getWords } from "../../services/dictionaryService";

export default function DictionaryList() {

    const [words, setWords] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadWords();

    }, []);

    async function loadWords() {

        try {

            const response = await getWords();

            console.log(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div>

            <h1 className="text-4xl font-bold mb-6">

                Dictionary

            </h1>

        </div>

    );

}