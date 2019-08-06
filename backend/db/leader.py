from mongoengine import *
from song import Song
from follower import Follower


class Leader(Document):

    name = StringField(required=True, max_length=20)
    access_token = StringField(required=True)

    followers = ListField(EmbeddedDocumentField(Follower))

    queue = ListField(EmbeddedDocumentField(Song))
