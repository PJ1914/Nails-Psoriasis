from flask import jsonify


def success_response(payload, status=200):
    response = jsonify(payload)
    response.status_code = status
    return response


def error_response(message, status=400):
    response = jsonify({'message': message})
    response.status_code = status
    return response
