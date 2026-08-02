export default function Loader({
    text = "Loading..."
}) {

    return (

        <div className="flex flex-col items-center justify-center py-20">

            <div
                className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
            />

            <p className="mt-4 text-slate-400">
                {text}
            </p>

        </div>

    );

}