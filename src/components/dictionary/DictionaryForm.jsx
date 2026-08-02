import Input from "../form/Input";
import Textarea from "../form/Textarea";

export default function DictionaryForm({

    values = {},
    errors = {},
    onChange,
    onSubmit,
    onCancel,

    submitText = "Save Word",

    loading = false,

}) {

    return (

        <form
            onSubmit={onSubmit}
            className="rounded-xl bg-slate-800 p-8 shadow-lg"
        >

            <div className="space-y-6">

                <Input
                    label="Word"
                    name="word"
                    value={values.word || ""}
                    onChange={onChange}
                    error={errors.word}
                    placeholder="Enter Bengali word"
                />

                <Textarea
                    label="Meaning"
                    name="meaning"
                    value={values.meaning || ""}
                    onChange={onChange}
                    error={errors.meaning}
                    placeholder="Enter meaning"
                />

                <Input
                    label="Related Words"
                    name="relatedWords"
                    value={values.relatedWords || ""}
                    onChange={onChange}
                    placeholder="Comma separated"
                />

                <div className="flex justify-end gap-3 pt-4">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg bg-slate-700 px-5 py-3 hover:bg-slate-600"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-3
                        hover:bg-blue-700
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                    >
                        {loading ? "Saving..." : submitText}
                    </button>

                </div>

            </div>

        </form>

    );

}