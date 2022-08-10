import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export function AlbumView() {
    const [albumData, setAlbumData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>back</button>|
                <button onClick={() => navigate("/")}>Home</button>
            </div>
        );
    };

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`;
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setAlbumData(resData.results);
        };
        fetchData();
    }, [id]);

    const justSongs = albumData.filter(
        (entry) => entry.wrapperType === "track"
    );

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <Link to={`/song/${song.collectionId}`}>
                    <p>{song.trackName}</p>
                </Link>
            </div>
        );
    });

    return (
        <div>
            <h2>the id was passed {id}</h2>

            <p>Album Data goes here</p>
            {renderSongs}
            {navButtons()}
        </div>
    );
}
