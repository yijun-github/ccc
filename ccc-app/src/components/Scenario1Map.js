import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { geoJSON } from "leaflet";

import StateSentLayer from "./StateSentLayer";
import StateParty1Layer from "./StateParty1Layer";
import StateParty2Layer from "./StateParty2Layer";

export default function Scenario1Map() {
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

    const [stateData, setStateData] = useState(null)

    const getData = () => {
        fetch('http://localhost:3002/stateData', {
          header:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((data) => {setStateData(data)})
      }

    useEffect(() => {
        getData()
    }, [])

    return(
         <div className='container'>
            <div className="header">
            <h2 className='heading'>War and Politics</h2>
            <p className="text-muted">Choropleth Map</p></div>
            <div className="">
                <div className="">
                <MapContainer center={[-26.90, 133.76]}
                zoom={4.25} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LayersControl>
                        <StateSentLayer data={stateData} checked={true} />
                        <StateParty1Layer data={stateData} />
                        <StateParty2Layer data={stateData} />
                    </LayersControl>
                </MapContainer>
                </div>
            </div>
        </div>

    )
}