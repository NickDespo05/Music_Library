import { useContext, useState } from "react";
import { SearchContext } from "./context/SearchContext";

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>
                <input
                    type="text"
                    placeholder="Enter a search term"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}

export default SearchBar;
