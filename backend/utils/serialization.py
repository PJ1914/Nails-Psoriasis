from datetime import datetime


def _serialize_value(value):
    if isinstance(value, datetime):
        return value.isoformat()

    if isinstance(value, dict):
        return {key: _serialize_value(item) for key, item in value.items()}

    if isinstance(value, list):
        return [_serialize_value(item) for item in value]

    return value


def serialize_document(document):
    payload = document.to_dict() or {}
    payload['id'] = document.id
    return {key: _serialize_value(value) for key, value in payload.items()}
