import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";


import StateElectionLayer from "../politicsMapLayers/StateElectionLayer";
import MapTileLayers from "../MapTileLayers";
import SuburbWarLayer from "./map layers/SuburbWarLayer";
import StateWarLayer from "./map layers/StateWarLayer";
import SuburbElectionLayer from "../politicsMapLayers/SuburbElectionLayer";

export default function Scenario1Map({ stateData, suburbData }) {
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
                        <StateElectionLayer data={stateData} />
                    </>
                    }
                    { suburbData &&
                    <>
                        <SuburbWarLayer data={suburbData} />
                        <SuburbElectionLayer data={suburbData} />
                    </>
                    }
                    </LayersControl>
                </MapContainer>
                </div>
            </div>
        </div>

    )
}