import mongoengine


class Song(mongoengine.EmbeddedDocument):
    uri = mongoengine.StringField(required=True)
    artist = mongoengine.StringField(required=True)
    album = mongoengine.StringField()

    meta = {'collection': 'songs'}
