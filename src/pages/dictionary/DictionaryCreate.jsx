import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import DictionaryForm from "../../components/dictionary/DictionaryForm";

import { createWord } from "../../services/dictionaryService";
import notify from "../../helpers/notify";
import RecentWords from "../../components/dictionary/RecentWords";

export default function DictionaryCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        word: "",
        meaning: "",
        relatedWords: "",
    });

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [recentWords, setRecentWords] = useState(() => {
        return JSON.parse(localStorage.getItem("recentWords") || "[]");
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }



    async function handleCreate(e) {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        try {
            const payload = {
                word: form.word,
                meaning: form.meaning,
                relatedWords: form.relatedWords
                    .split(",")
                    .map(word => word.trim())
                    .filter(Boolean),
            };
            const response = await createWord(payload);
            notify.success(response.data.message);
            const newWord = {
                ...response.data.data,
                addedAt: new Date().toISOString(),
            };
            setRecentWords(prev => {
                const updated = [newWord, ...prev].slice(0, 10);
                localStorage.setItem(
                    "recentWords",
                    JSON.stringify(updated)
                );
                return updated;
            });
            // navigate("/dictionary");
        } catch (error) {
            // validation error (expected)
            if (error.response?.status === 422) {
                setErrors(error.response?.data?.data || {});
                notify.error(error.response.data.message);
                return;
            }
            // Unexpected errors
            notify.error("Something went wrong.");
            console.error(error);
        } finally {
            setSaving(false);
        }

    }

    // on reset
    function handleReset() {

        if (!form.word && !form.meaning && !form.relatedWords) {
            return;
        }

        if (window.confirm("Clear all entered information?")) {

            setForm({
                word: "",
                meaning: "",
                relatedWords: "",
            });

            setErrors({});
        }
    }

    function handleClearRecent() {

        if (!recentWords.length) {
            return;
        }

        if (window.confirm("Clear recently added words?")) {

            localStorage.removeItem("recentWords");

            setRecentWords([]);

            notify.success("Recent history cleared.");

        }

    }

    return (

        <div className="space-y-8">

            <PageHeader
                title="Add New Word"
                subtitle="Create a new dictionary entry."
            />

            <div className="mx-auto max-w-4xl">
                <DictionaryForm
                    values={form}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleCreate}
                    onReset={handleReset}
                    onCancel={() => navigate("/dictionary")}
                    submitText="Save Word"
                    loading={saving}
                />
            </div>
            <RecentWords
                words={recentWords}
                onClear={handleClearRecent}
            />
        </div>

    );

}