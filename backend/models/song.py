import mongoengine


class Song(mongoengine.EmbeddedDocument):
    uri = StringField(required=True)
    artist = StringField(required=True)
    album = StringField()

    meta = {'collection': 'songs'}
