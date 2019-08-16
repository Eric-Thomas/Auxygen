from mongoengine import *
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from models import leader

app = Flask(__name__)
CORS(app)

connect('auxygen', host='localhost', port=27017)


@app.route('/leader', methods=['POST'])
def add_leader():
    new_leader = leader.Leader(
        name=request.json['name'], access_token=request.json['access_token'])
    new_leader.save()
    result_leader = leader.Leader.objects(id=new_leader.id)
    app.logger.info(new_leader.id)
    app.logger.info(result_leader[0].id)
    return jsonify({"name": result_leader[0].name, "access_token": result_leader[0].access_token})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')