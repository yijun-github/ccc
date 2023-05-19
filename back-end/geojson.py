import json
from flask import Flask, jsonify
import couchdb
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

with open('back-end/geojson output/war_suburb.json', 'r') as f:
        war_suburb_geo = json.load(f)
with open('back-end/geojson output/lgbt_suburb.json', 'r') as f:
        lgbt_suburb_geo = json.load(f)

for i in lgbt_suburb_geo["features"]:
        index = lgbt_suburb_geo["features"].index(i)
        for j in i["properties"]:
                if j not in war_suburb_geo["features"][index]["properties"]:
                        war_suburb_geo["features"][index]["properties"][j] = i["properties"][j]

with open('back-end/geojson output/suburb.json', 'w') as file:
        json.dump(war_suburb_geo, file)

@app.route('/suburb_geojson')
def get_points():
     with open('back-end/geojson output/suburb.json', 'r') as f:
        suburb_geo = json.load(f)
     return jsonify(suburb_geo)
if __name__ == '__main__':
    app.run(debug=True) 