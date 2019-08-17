from mongoengine import *
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from models import leader
from jsonEncoder import JSONEncoder
import random

app = Flask(__name__)
CORS(app)

connect('auxygen', host='localhost', port=27017)


@app.route('/leader', methods=['POST'])
def add_leader():
    party_room_rand = random.randint(0, 99999)
    try:
        new_leader = leader.Leader(
            name=request.json['name'], access_token=request.json['access_token'], party_room=party_room_rand)
        app.logger.info(new_leader.party_room)
        new_leader.save()
    except Exception as e:
        party_room_rand += 1

    return jsonify({"id": JSONEncoder().encode(new_leader.id), "party_room": new_leader.party_room})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
