import mongoengine
from follower import Follower
from song import Song


class Leader(mongoengine.Document):

    name = mongoengine.StringField(required=True)
    access_token = mongoengine.StringField(required=True)
    queue = ListField(mongoengine.EmbeddedDocumentField(Song))

    followers = ListField(mongoengine.EmbeddedDocumentField(Follwer))

    meta = {'collection': 'leaders'}
