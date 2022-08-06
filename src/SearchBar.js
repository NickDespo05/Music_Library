import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";

function SearchBar() {
    let [term, handleSearch] = useContext(SearchContext);

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Enter a search term"
                    ref={term}
                />
                <button onClick={(e) => handleSearch(e, term.current.value)}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
