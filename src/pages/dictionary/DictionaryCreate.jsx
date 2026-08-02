import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import DictionaryForm from "../../components/dictionary/DictionaryForm";

import { createWord } from "../../services/dictionaryService";

export default function DictionaryCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        word: "",
        meaning: "",
        relatedWords: "",
    });

    const [errors, setErrors] = useState({});

    const [saving, setSaving] = useState(false);

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
            console.log("Payload:", payload);
            const response = await createWord(payload);

            console.log(response.data);

            navigate("/dictionary");

        } catch (error) {

            console.error(error);

            if (error.response?.status === 422) {

                setErrors(error.response.data.errors || {});

            }

        } finally {

            setSaving(false);

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
                    onCancel={() => navigate("/dictionary")}
                    submitText="Save Word"
                    loading={saving}
                />
            </div>

        </div>

    );

}