from flask import request

from middleware.auth_middleware import token_required
from services.firestore_service import get_report_by_id, list_reports_for_user
from utils.responses import error_response, success_response


@token_required
def get_history():
    reports = list_reports_for_user(request.user['uid'])
    return success_response({'reports': reports})


@token_required
def get_history_report(report_id):
    report = get_report_by_id(report_id)

    if not report:
        return error_response('Report not found.', 404)

    if request.user['role'] != 'doctor' and report['user_id'] != request.user['uid']:
        return error_response('You do not have access to this report.', 403)

    return success_response({'report': report})
