from flask import Flask
from war.war_mastodon import war_mastodon_bp
from war.war_twitter import war_twitter_bp
from lgbt.lgbt_mastodon import lgbt_mastodon_bp
from lgbt.lgbt_twitter import lgbt_twitter_bp
from general.general_mastodon import general_mastodon_bp
from general.general_twitter import general_twitter_bp

app = Flask(__name__)

app.register_blueprint(war_mastodon_bp)
app.register_blueprint(war_twitter_bp)
app.register_blueprint(lgbt_mastodon_bp)
app.register_blueprint(lgbt_twitter_bp)
app.register_blueprint(general_mastodon_bp)
app.register_blueprint(general_twitter_bp)

if __name__ == '__main__':
    app.run()


