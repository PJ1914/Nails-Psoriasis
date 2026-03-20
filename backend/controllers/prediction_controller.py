from flask import request

from middleware.auth_middleware import token_required
from services.firestore_service import create_report
from services.inference import predict
from utils.responses import error_response, success_response


@token_required
def create_prediction():
    payload = request.get_json(silent=True) or {}
    image_url = payload.get('image_url')

    if not image_url or not isinstance(image_url, str):
        return error_response('image_url is required.', 400)

    try:
        prediction = predict(image_url)
        report = create_report(request.user['uid'], image_url, prediction)

        response_body = {
            'message': 'Prediction generated successfully.',
            'report_id': report['id'],
            **prediction,
        }

        return success_response(response_body, 201)
    except ValueError as value_error:
        return error_response(str(value_error), 400)
    except Exception as error:
        return error_response(f'Prediction failed: {str(error)}', 500)
