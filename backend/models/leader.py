import mongoengine
from models import follower
from models import song


class Leader(mongoengine.Document):

    name = mongoengine.StringField(required=True)
    access_token = mongoengine.StringField(required=True)

    queue = mongoengine.ListField(mongoengine.EmbeddedDocumentField(song.Song))

    followers = mongoengine.ListField(
        mongoengine.EmbeddedDocumentField(follower.Follower))

    meta = {'collection': 'leaders'}
