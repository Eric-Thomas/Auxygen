from flask import Blueprint
from flask import jsonify, request
from mongoengine import *
from models.leader import Leader
from jsonEncoder import JSONEncoder
import random

leader_api = Blueprint('leader_api', __name__)

connect('auxygen', host='localhost', port=27017)


@leader_api.route('/leader', methods=['POST'])
def add_leader():
    party_room_rand = random.randint(0, 99999)
    tries = 0
    while (tries < 10):
        try:
            new_leader = Leader(
                name=request.json['name'], access_token=request.json['access_token'], party_room=party_room_rand)
            new_leader.save()
            return jsonify({"id": JSONEncoder().encode(new_leader.id), "party_room": new_leader.party_room})
        except Exception as e:
            tries += 1
            party_room_rand = random.randint(0, 99999)

    return jsonify({"Error": "More than 10 tries exceeded"})
