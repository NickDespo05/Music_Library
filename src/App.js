import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Gallery from "./Gallery";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import { useRef } from "react";

function App() {
    let [search, setSearch] = useState(" ");
    let [message, setMessage] = useState("Search for Music");
    let [data, setData] = useState([]);
    let searchInput = useRef("");

    const API_URL =
        "https://itunes.apple.com/search?term=the%20grateful%20dead";

    useEffect(() => {
        if (search) {
            const fetchData = async () => {
                document.title = `${search} music`;
                const response = await fetch(API_URL + search);
                const resData = await response.json();
                console.log(resData);
                if (resData.results.length > 0) {
                    return setData(resData.results);
                } else {
                    setMessage("not found");
                }
            };
            fetchData();
        }
    }, [search]);

    const handleSearch = (e, term) => {
        e.preventDefault();
        setSearch(term);
    };

    return (
        <div>
            <SearchContext.Provider
                value={{
                    term: searchInput,
                    handleSearch: handleSearch,
                }}
            >
                <SearchBar handleSearch={handleSearch} />
            </SearchContext.Provider>

            {message}

            <DataContext.Provider value={data}>
                <Gallery data={data} />
            </DataContext.Provider>
        </div>
    );
}

export default App;
