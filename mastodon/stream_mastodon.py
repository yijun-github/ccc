from mastodon import Mastodon, MastodonNotFoundError, MastodonRatelimitError, StreamListener
import csv, os, time, json
import re
from bs4 import BeautifulSoup
from textblob import TextBlob
import datetime
import couchdb



# Connect to CouchDB
# username:password@localhost:5984
couch = couchdb.Server('http://admin:1231@127.0.0.1:5984/')
db_name = 'mastodon_data'
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]


m = Mastodon(
    api_base_url='https://mastodon.au',
    access_token=os.environ['MASTODON_ACCESS_TOKEN']
)

class Listener(StreamListener):
    def on_update(self, status):
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(status['content'], 'html.parser')
        content = soup.get_text()
        
        # check if content is empty
        if len(content) == 0:
            return
        
        # Analyze the sentiment of the content using TextBlob
        blob = TextBlob(content)
        sentiment_score = blob.sentiment.polarity
        
        # get date of this toot
        status_date = status['created_at'].date()
        status_date_str = status_date.strftime('%Y-%m-%d')

        
            
        # Search for keywords of Russia and Ukraine war
        keywords = ['russian', 'ukraine', 'war']
        num_keywords = 0
        for keyword in keywords:
            if re.search(keyword, content, re.IGNORECASE):
                num_keywords += 1
        RUwar = num_keywords >= 2
        
        # Process the data as desired
        processed_data = {
            'date': status_date_str,
            'content': content,
            'language': status['language'],
            'sentiment': sentiment_score,
            'RUwar': RUwar
        }

        # Write the processed data to couchdb
        db.save(processed_data)


listener = Listener()
m.stream_public(listener)
