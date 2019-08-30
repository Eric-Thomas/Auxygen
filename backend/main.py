from mongoengine import *
from flask import Flask
from flask_cors import CORS
from blueprints.leaderAPI import leader_api

app = Flask(__name__)
CORS(app)
app.register_blueprint(leader_api) 


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
