import React from "react";
import { GeoJSON, LayersControl } from "react-leaflet";
import { geoJSON } from "leaflet";

export default function StateParty1Layer(props) {

    const checked = (props.checked ? true : false)

    const stateData = props.data

    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

    function getColor(x) {
        const colors = ['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#0868ac','#084081'] //Sequential-Blue

        const colorIndex = Math.min(Math.floor(colors.length*(x)/100), colors.length-1)

        return colors[colorIndex]
    }

    function getStyle(feature) {
        return {
            fillColor: getColor(feature.properties.Party1Perc),
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
            <p><i>Party 1 %: ${feature.properties.Party1Perc}</i></p>
            </div>`
        if (feature.properties && (feature.properties.Party1Perc !== undefined)) {
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

    const { BaseLayer } = LayersControl

    return(
        <BaseLayer checked={checked} name="Party 1 %">
            {stateData && (
                <GeoJSON data={stateData} key={"Party1Perc"} style={getStyle}
                    onEachFeature={onEachFeature}
                />
            )}
        </BaseLayer>
    )
}