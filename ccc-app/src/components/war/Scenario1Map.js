import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";


import StateSentLayer from "./StateSentLayer";
import StateParty1Layer from "./StateParty1Layer";
import StateParty2Layer from "./StateParty2Layer";
import MapTileLayers from "../MapTileLayers";
import GccWarLayer from "./GccWarLayer";

export default function Scenario1Map({ stateData, gccData }) {
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }
{/*
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
        .catch(err => {
            console.log('======failed to fetch data=======');
            console.log(err);
        });
      }

    useEffect(() => {
        getData()
    }, [])
*/}

    return(
         <div className='container'>
            <div className="">
                <div className="">
                <MapContainer center={[-26.90, 133.76]}
                zoom={4.25} scrollWheelZoom={true} style={mapStyle}>
                    <MapTileLayers />
                    { stateData &&
                    <LayersControl>
                        <StateSentLayer data={stateData} />
                        <StateParty1Layer data={stateData} />
                        <StateParty2Layer data={stateData} />
                    </LayersControl>
                    }
                    { gccData &&
                    <LayersControl>
                        <GccWarLayer data={gccData} checked={true} />
                    </LayersControl>
                    }
                </MapContainer>
                </div>
            </div>
        </div>

    )
}