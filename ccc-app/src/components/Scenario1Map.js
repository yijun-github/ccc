import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";


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



    const { BaseLayer } = LayersControl

    return(
         <div className='container'>
            <div className="">
                <div className="">
                <MapContainer center={[-26.90, 133.76]}
                zoom={4.25} scrollWheelZoom={true} style={mapStyle}>
                    <LayersControl>
                        <BaseLayer checked={true} name="OpenStreetMap">
                            <TileLayer checked={true}
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </BaseLayer>
                        <BaseLayer name="CartoDB-Dark">
                            <TileLayer
                                url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                subdomains='abcd'
                            />
                        </BaseLayer>
                        <BaseLayer name="Esri.WorldTopoMap">
                            <TileLayer
                                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                                attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                            />
                        </BaseLayer>
                    </LayersControl>
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