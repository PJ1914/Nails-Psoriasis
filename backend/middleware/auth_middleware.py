from functools import wraps

from firebase_admin import auth as firebase_auth
from flask import request

from config.firebase import get_firebase_app
from services.firestore_service import get_user_profile
from utils.responses import error_response


def _get_bearer_token():
    authorization_header = request.headers.get('Authorization', '')

    if not authorization_header.startswith('Bearer '):
        return None

    return authorization_header.split(' ', 1)[1].strip()


def token_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        token = _get_bearer_token()

        if not token:
            return error_response('Authorization token is required.', 401)

        try:
            get_firebase_app()
            decoded_token = firebase_auth.verify_id_token(token)
            profile = get_user_profile(decoded_token['uid']) or {}
        except Exception:
            return error_response('Invalid or expired token.', 401)

        request.user = {
            'uid': decoded_token['uid'],
            'email': decoded_token.get('email'),
            'role': profile.get('role', 'user'),
            'profile': profile,
        }

        return view(*args, **kwargs)

    return wrapped


def doctor_required(view):
    @token_required
    @wraps(view)
    def wrapped(*args, **kwargs):
        if request.user['role'] != 'doctor':
            return error_response('Doctor access is required.', 403)

        return view(*args, **kwargs)

    return wrapped
