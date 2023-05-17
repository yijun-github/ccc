import React from "react";
import { TileLayer, LayersControl } from "react-leaflet";


export default function MapTileLayers() {

    const { BaseLayer } = LayersControl

    return (
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
            <BaseLayer name="Stamen.Toner">
                <TileLayer
                    url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}'
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    subdomains='abcd'
                    ext='png'
                />
            </BaseLayer>
            <BaseLayer name="CartoDB.Positron">
                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    subdomains='abcd'
                />
            </BaseLayer>
        </LayersControl>
    )
}