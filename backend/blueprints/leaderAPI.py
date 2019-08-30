from flask import Blueprint
from flask import jsonify, request
from mongoengine import *
from models.leader import Leader
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
            return jsonify({"id": str(new_leader.id), "party_room": new_leader.party_room})
        except Exception as e:
            print(e)
            tries += 1
            party_room_rand = random.randint(0, 99999)
    return jsonify({"Error": "More than 10 tries exceeded"})


@leader_api.route('/leader/<id>/accesstoken')
def get_access_token(id):
    try:
        print("id: " + id)
        leader = Leader.objects.get(id=id)
        print("Access token: " + leader.access_token)
        return jsonify({"access_token": leader.access_token})
    except Exception as E:
        print(E)
        return jsonify({"Error": "Error retrieving access token"})

# @leader_api.route('/leader/fallbackplaylist', methods=['POST'])
# def create_fallback_playlist()
