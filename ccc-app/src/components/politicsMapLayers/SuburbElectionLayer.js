import React from "react";
import { GeoJSON, LayersControl } from "react-leaflet";
import { geoJSON } from "leaflet";
import { round } from "../../functions/round";

export default function StateElectionLayer(props) {

    const checked = (props.checked ? true : false)

    const suburbData = props.data

    function getColor(x) {
        const colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf',
                        '#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'] //Diverging-Red-Blu

        const range = 0.8
        const mid = 0.5
        const val = (x-mid)/range + 0.5

        const colorIndex = Math.max(0,
            Math.min(colors.length-1,
                Math.floor(colors.length*val))
            )
        
        return colors[colorIndex]
    }

    function getStyle(feature) {
        
        const fillColor = (feature.properties.total_formal_votes >= 1) ? 
            getColor(feature.properties["liberal_national%"]) :
            "#000"
        
        const fillOpacity = (feature.properties.total_formal_votes >= 1) ? 0.7 : 0

        return {
            fillColor: fillColor,
            weight: 0.3,
            opacity: 0.2,
            color: "black",
            dashArray: '3',
            fillOpacity: fillOpacity
        };
    }

    function popup(feature, layer) {
        var popUpText = `<div style={text-align: center, margin: 5px}>
            <b>State/Territory: ${feature.properties.SAL_NAME21}</b>
            <p><i>Liberal National %: ${round(feature.properties["liberal_national%"]*100, 2)}</i></p>
            <p><i>Labor %: ${round(feature.properties["labor%"]*100, 2)}</i></p>
            <p><i>Total Votes: ${feature.properties["total_formal_votes"]}</i></p>
            <p><i>Median Income ($): ${round(feature.properties["median_income"], 0)}</i></p>
            <p><i>Degree %: ${round(feature.properties["uni"]*100, 2)}</i></p>
            </div>`
        if (feature.properties && (feature.properties["total_formal_votes"] != null)) {
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
        <BaseLayer checked={checked} name="Suburb Election (2 Party) Results">
            {suburbData && (
                <GeoJSON data={suburbData} key={"liberal_national%"} style={getStyle}
                    onEachFeature={onEachFeature}
                />
            )}
        </BaseLayer>
    )
}