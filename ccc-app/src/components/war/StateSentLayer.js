import React from "react";
import { GeoJSON, LayersControl } from "react-leaflet";
import { geoJSON } from "leaflet";

export default function StateSentLayer(props) {

    const checked = (props.checked ? true : false)

    const stateData = props.data

    function getColor(x) {
        const colors = ['#d53e4f','#f46d43','#fdae61','#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd'] //Diverging-Red-Blue

        const colorIndex = Math.min(Math.floor(colors.length*(x-0.3)/0.2), colors.length-1)

        return colors[colorIndex]
    }

    function getStyle(feature) {
        return {
            fillColor: getColor(feature.properties['Positive Proportion']),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function popup(feature, layer) {
        var popUpText = `<div style={text-align: center, margin: 5px}>
            <b>${feature.properties.STE_NAME21}</b>
            <p><i>Positive Sentiment %: ${feature.properties['Positive Proportion']}</i></p>
            </div>`
        if (feature.properties && (feature.properties['Positive Proportion'] !== undefined)) {
            layer.bindPopup(popUpText);
        }
    }

    function overFeature(e, layer) {
        layer.openPopup(e.latlng)

        e.target.setStyle(e.target.feature);
    
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

    const { BaseLayer } = LayersControl

    return(
        <BaseLayer checked={checked} name="War Sentiment">
            {stateData && (
                <GeoJSON data={stateData} key={"Negative Proportion"} style={getStyle}
                    onEachFeature={onEachFeature}
                />
            )}
        </BaseLayer>
    )
}