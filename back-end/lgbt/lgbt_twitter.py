import json
from flask import Flask, jsonify
import couchdb
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['huge-twitter-v2']

with open('Data/geoJSON_data/state.json', 'r') as f:
        sudo_state_geo = json.load(f)
with open('Data/geoJSON_data/postcode.json', 'r') as f1:
        sudo_postcode_geo = json.load(f1)    
with open('Data/geoJSON_data/suburb.json', 'r') as f2:
        sudo_suburb_geo = json.load(f2)    


with open('geoJSON files/states/STE_2021_AUST_GDA2020_Simplified.json', 'r') as file:
        state_geo = json.load(file)
with open('geoJSON files/gcc/GCCSA_2021_AUST_GDA2020.json', 'r') as file2:
        gcc_geo = json.load(file2)
with open('geoJSON files/postcode/POA_2021_AUST_GDA2020_Medium.json', 'r') as file3:
        postcode_geo = json.load(file3)
with open('geoJSON files/suburbs/SAL_2021_AUST_GDA94_Small.json', 'r') as file4:
        suburb_geo = json.load(file4)

if __name__ == '__main__':
    app.run(debug=True) 