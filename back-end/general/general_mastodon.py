from flask import Flask, jsonify
import couchdb
from flask import Blueprint

general_mastodon_bp = Blueprint('general_mastodon', __name__)

app = Flask(__name__)

# connecting CouchDB
couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['mastodon_data_v3']

# count_per_hour
@general_mastodon_bp.route('/general/mastondon/proportion_sentiment')
def get_data():
    results = db.view('_design/general/_view/count_per_hour', group=True)
    data = {}
    for row in results:
        if row.key != None:
            data[row.key] = row.value

    return jsonify(data)
