import json
from flask import Flask, jsonify
from flask import Blueprint

geojson_bp = Blueprint('geojson', __name__)
app = Flask(__name__)


# merge geojson for state
@geojson_bp.route('/state_geojson')
def merge_geojson_state():
     with open('back-end/geojson output/war_state.json', 'r') as f:
        war_state_geo = json.load(f)
     with open('back-end/geojson output/lgbt_state.json', 'r') as f2:
        lgbt_state_geo = json.load(f2) 
    
     features1 = war_state_geo['features']
     properties1 = [feature['properties'] for feature in features1]
    
     features2 = lgbt_state_geo['features']
     properties2 = [feature['properties'] for feature in features2]

     merged_properties = []
    
     for prop1, prop2 in zip(properties1, properties2):
        merged_prop = {**prop1, **prop2}
        merged_properties.append(merged_prop)
     
     merged_features = []
     for feature, merged_prop in zip(features1, merged_properties):
        new_feature = {
            'type': 'Feature',
            'geometry': feature['geometry'],
            'properties': merged_prop
        }
        merged_features.append(new_feature)
     
     merged_geojson = {
        'type': 'FeatureCollection',
        "crs": {"type": "name","properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
        'features': merged_features
     }
     with open("back-end/geojson output/output_state_geojson_file", 'w') as output:
        json.dump(merged_geojson, output)
     with open("back-end/geojson output/output_state_geojson_file", 'r') as ff:
        state_geo = json.load(ff)
     return jsonify(state_geo)

# merge geojson for state
@geojson_bp.route('/suburb_geojson')
def merge_geojson_suburb():
     with open('back-end/geojson output/war_suburb.json', 'r') as f:
        war_suburb_geo = json.load(f)
     with open('back-end/geojson output/lgbt_suburb.json', 'r') as f2:
        lgbt_suburb_geo = json.load(f2) 
    
     features1 = war_suburb_geo['features']
     properties1 = [feature['properties'] for feature in features1]
    
     features2 = lgbt_suburb_geo['features']
     properties2 = [feature['properties'] for feature in features2]

     merged_properties = []
    
     for prop1, prop2 in zip(properties1, properties2):
        merged_prop = {**prop1, **prop2}
        merged_properties.append(merged_prop)
     
     merged_features = []
     for feature, merged_prop in zip(features1, merged_properties):
        new_feature = {
            'type': 'Feature',
            'geometry': feature['geometry'],
            'properties': merged_prop
        }
        merged_features.append(new_feature)
     
     merged_geojson = {
        'type': 'FeatureCollection',
        "crs": {"type": "name","properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
        'features': merged_features
     }
     with open("back-end/geojson output/output_suburb_geojson_file", 'w') as output:
        json.dump(merged_geojson, output)
     with open("back-end/geojson output/output_suburb_geojson_file", 'r') as ff:
        suburb_geo = json.load(ff)
     return jsonify(suburb_geo)