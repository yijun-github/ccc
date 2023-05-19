from flask import Flask, jsonify
import couchdb
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
# connecting CouchDB
couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['mastodon_data_v3']



if __name__ == '__main__':
    app.run(debug=True) 