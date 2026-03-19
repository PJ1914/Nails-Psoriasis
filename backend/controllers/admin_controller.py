from flask import request

from middleware.auth_middleware import doctor_required
from services.firestore_service import list_all_reports, list_all_users
from utils.responses import success_response


@doctor_required
def get_users():
    return success_response({'users': list_all_users()})


@doctor_required
def get_reports():
    filters = {
        'severity': request.args.get('severity'),
        'date': request.args.get('date'),
    }
    return success_response({'reports': list_all_reports(filters)})
