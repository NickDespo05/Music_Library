import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export function ArtistView() {
    const [artistData, setArtistData] = useState([]);
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
        const API_URL = `http://localhost:4000/album/${id}`;
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setArtistData(resData.results);
        };
        fetchData();
    }, [id]);

    const justAlbums = artistData.filter(
        (entry) => entry.collectionType === "Album"
    );

    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        );
    });

    return (
        <div>
            <h2>The id was passed {id}</h2>
            <p>Artist Data goes here</p>
            {renderAlbums}
            {navButtons()}
        </div>
    );
}
