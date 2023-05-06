import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";


export default function StateSentimentMap() {
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

    const [stateSentData, setStateSentData] = useState(null)

    const getData = () => {
        fetch('http://localhost:3002/features', {
          header:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((data) => {setStateSentData(data)})
      }

    useEffect(() => {
        getData()
    }, [])

    function getColor(x) {
        return x > 0.75 ? '#d73027' :
               x > 0.5  ? '#f46d43' :
               x > 0.25  ? '#fdae61' :
               x > 0  ? '#fee090' :
               x > -0.25   ? '#e0f3f8' :
               x > -0.5   ? '#abd9e9' :
               x > -0.75   ? '#74add1' :
                          '#d73027';
    }

    function getStyle(feature) {
        return {
            fillColor: getColor(feature.properties.Sentiment),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    return(
         <div className='container'>
            <div className="header">
            <h2 className='heading'>State Sentiments</h2>
            <p className="text-muted">Choropleth Map</p></div>
            <div className="">
                <div className="">
                <MapContainer center={[-26.90, 133.76]}
                zoom={4.25} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {stateSentData && (
                        <GeoJSON data={stateSentData} key={"Sentiment"} style={getStyle}/>
                    )}
                </MapContainer>
                </div>
            </div>
        </div>

    )
}