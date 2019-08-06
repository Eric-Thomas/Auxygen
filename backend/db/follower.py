from mongoengine import *


class Follower(EmbeddedDocument):
    name = StringField(required=true)
