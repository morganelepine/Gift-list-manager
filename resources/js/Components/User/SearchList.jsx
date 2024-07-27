import { useState } from "react";
import PropTypes from "prop-types";
import ListToFollow from "@/Components/User/ListToFollow";
import TextInput from "@/Components/Utils/TextInput";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function SearchList({ auth }) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset search results or error message
        setResults([]);
        setError("");

        if (search.trim() === "") {
            setError("Veuillez renseigner un nom pour lancer la recherche.");
            return;
        }

        try {
            const response = await fetch(`/lists/search?search=${search}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data.listsToFollow);
            } else {
                const errorData = await response.json();
                setError(errorData.errorMessage);
            }
        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };

    return (
        <>
            <form className="flex flex-col text-center" onSubmit={handleSubmit}>
                <label htmlFor="link" className="text-xl font-semibold mb-4">
                    Rechercher une liste
                </label>
                <TextInput
                    id="search"
                    name="search"
                    placeholder="Prénom ou nom de la liste"
                    className="py-1 text-center"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SmallButton className="my-4" type="submit">
                    Rechercher
                </SmallButton>
            </form>

            {results.length > 0 && (
                <div className="flex flex-col justify-center">
                    {results.map((list) => (
                        <div
                            className="flex flex-col p-5 my-5 text-center shadow bg-white rounded-xl"
                            key={list.id}
                        >
                            <ListToFollow listToFollow={list} auth={auth} />
                        </div>
                    ))}
                </div>
            )}

            {error && <div className="text-center mt-4">{error}</div>}
        </>
    );
}

SearchList.propTypes = {
    auth: PropTypes.object.isRequired,
};
