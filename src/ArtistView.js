import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function ArtistView() {
    const [artistData, setArtistData] = useState([]);
    const { id } = useParams();

    return (
        <div>
            <h2>the id was passed {id}</h2>
            <p>Artist Data goes here</p>
        </div>
    );
}
