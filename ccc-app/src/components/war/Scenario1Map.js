import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";


import StateParty1Layer from "./map layers/StateParty1Layer";
import StateParty2Layer from "./map layers/StateParty2Layer";
import MapTileLayers from "../MapTileLayers";
import GccWarLayer from "./map layers/GccWarLayer";
import StateWarLayer from "./map layers/StateWarLayer";

export default function Scenario1Map({ stateData, gccData }) {
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
                zoom={4.25} scrollWheelZoom={true} style={mapStyle}>
                    <MapTileLayers />
                    <LayersControl>
                    { stateData &&
                    <>
                        <StateWarLayer data={stateData} checked={true} />
                        <StateParty1Layer data={stateData} />
                        <StateParty2Layer data={stateData} />
                    </>
                    }
                    { gccData &&
                    <>
                        <GccWarLayer data={gccData} />
                    </>
                    }
                    </LayersControl>
                </MapContainer>
                </div>
            </div>
        </div>

    )
}