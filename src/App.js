import React, { Fragment, useEffect, useState, Suspense } from "react";
import SearchBar from "./SearchBar";
import Gallery from "./Gallery";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlbumView } from "./AlbumView";
import { ArtistView } from "./ArtistView";
import { createResource as fetchData } from "./helper";
import Spinner from "./Spinner";

function App() {
    let [search, setSearch] = useState(" ");
    let [message, setMessage] = useState("Search for Music");
    let [data, setData] = useState(null);
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
    });

    const handleSearch = (e, term) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (searchTerm) {
            setData(fecthData(searchTerm));
        }
    }, [searchTerm]);

    const renderGallery = () => {
        if (data) {
            return (
                <Suspense fallback={<Spinner />}>
                    <Gallery data={data} />
                </Suspense>
            );
        }
    };

    return (
        <div>
            {message}
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Fragment>
                                <SearchBar handleSearch={handleSearch} />
                            </Fragment>
                        }
                    />
                    {renderGallery()}
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
