import mongoengine


class Follower(mongoengine.EmbeddedDocument):
    name = mongoengine.StringField()

    meta = {'collection': 'followers'}
