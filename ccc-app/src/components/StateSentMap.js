import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import { geoJSON } from "leaflet";

export default function StateSentimentMap() {
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

    const [stateSentData, setStateSentData] = useState(null)

    const getData = () => {
        fetch('http://localhost:3002/stateData', {
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
        const color = ['#d53e4f','#f46d43','#fdae61','#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd']

        const colorIndex = (
            (Math.floor(color.length*(1+x)/2) < color.length) ?
            Math.floor(color.length*(1+x)/2) : 
            color.length-1
        )

        return color[colorIndex]
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

    function popup(feature, layer) {
        var popUpText = `<div style={text-align: center, margin: 5px}>
            <b>${feature.properties.STATE_NAME}</b>
            <p><i>Ave. Sentiment: ${feature.properties.Sentiment}</i></p>
            </div>`
        if (feature.properties && (feature.properties.Sentiment !== undefined)) {
            layer.bindPopup(popUpText);
        }
    }

    function overFeature(e, layer) {
        layer.openPopup(e.latlng)

        e.target.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        e.target.bringToFront();
    }

    function movePopup(e, layer) {
        layer.openPopup(e.latlng)
    }

    function outFeature(e, layer) {
        layer.closePopup()

        e.target.setStyle({
            weight: 2,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        });
    
        e.target.bringToFront();
    }

    function onEachFeature(feature, layer) {
        popup(feature, layer)

        layer.on({
            mouseover: (e) => overFeature(e, layer),
            mousemove: (e) => movePopup(e, layer),
            mouseout: (e) => outFeature(e, layer)
        })
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
                        <GeoJSON data={stateSentData} key={"Sentiment"} style={getStyle}
                            onEachFeature={onEachFeature}
                        />
                    )}
                </MapContainer>
                </div>
            </div>
        </div>

    )
}