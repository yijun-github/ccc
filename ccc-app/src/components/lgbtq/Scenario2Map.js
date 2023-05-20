import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import PostLgbtLayer from "./PostLgbtLayer";
import MapTileLayers from "../MapTileLayers";


export default function Scenario2Map({ postData }) {
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

    return(
         <div className='container'>
            <div className="">
                <div className="">
                <MapContainer center={[-26.90, 133.76]}
                zoom={5} scrollWheelZoom={true} style={mapStyle}>
                    <MapTileLayers />
                    { postData &&
                    <LayersControl>
                        <PostLgbtLayer data={postData} checked={true} />
                    </LayersControl>
                    }
                </MapContainer>
                </div>
            </div>
        </div>

    )
}