import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function AlbumView() {
    const [albumData, setAlbumData] = useState([]);
    const { id } = useParams();

    return (
        <div>
            <h2>the id was passed {id}</h2>

            <p>Album Data goes here</p>
        </div>
    );
}
