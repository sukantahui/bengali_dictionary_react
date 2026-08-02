import Input from "./Input";

export default function SearchInput({

    value,
    onChange,
    onSearch,
    placeholder = "Search...",

}) {

    return (

        <Input
            type="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={(e) => {

                if (e.key === "Enter") {

                    onSearch();

                }

            }}
        />

    );

}