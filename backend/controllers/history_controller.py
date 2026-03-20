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


@token_required
def update_history_report(report_id):
    from services.firestore_service import update_report
    
    report = get_report_by_id(report_id)

    if not report:
        return error_response('Report not found.', 404)

    if request.user['role'] != 'doctor' and report['user_id'] != request.user['uid']:
        return error_response('You do not have access to this report.', 403)

    data = request.get_json()
    
    # Only allow updating specific fields
    allowed_fields = ['napsi_score', 'severity', 'features', 'needs_review', 'notes']
    updates = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not updates:
        return error_response('No valid fields to update.', 400)
    
    updated_report = update_report(report_id, updates)
    return success_response({'report': updated_report})


@token_required
def delete_history_report(report_id):
    from services.firestore_service import delete_report
    
    report = get_report_by_id(report_id)

    if not report:
        return error_response('Report not found.', 404)

    if request.user['role'] != 'doctor' and report['user_id'] != request.user['uid']:
        return error_response('You do not have access to this report.', 403)

    success = delete_report(report_id)
    
    if success:
        return success_response({'message': 'Report deleted successfully.'})
    else:
        return error_response('Failed to delete report.', 500)
