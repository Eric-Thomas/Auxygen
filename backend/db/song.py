from mongoengine import *


class Song(EmbeddedDocument):
    uri = StringField(required=True)
    artist = StringField(required=True)
    album = StringField(required=True)
