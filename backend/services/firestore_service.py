from datetime import datetime, timezone

from firebase_admin import firestore
from config.firebase import get_firestore_client
from utils.serialization import serialize_document

USERS_COLLECTION = 'users'
REPORTS_COLLECTION = 'reports'


def get_user_profile(uid):
    firestore_client = get_firestore_client()
    document = firestore_client.collection(USERS_COLLECTION).document(uid).get()

    if not document.exists:
        return None

    return serialize_document(document)


def create_report(user_id, image_url, prediction):
    firestore_client = get_firestore_client()
    payload = {
        'user_id': user_id,
        'image_url': image_url,
        'napsi_score': prediction['napsi_score'],
        'severity': prediction['severity'],
        'features': prediction['features'],
        'processed_image_url': prediction['processed_image_url'],
        'predicted_class': prediction.get('predicted_class'),
        'confidence': prediction.get('confidence'),
        'needs_review': prediction.get('needs_review', False),
        'confidence_margin': prediction.get('confidence_margin'),
        'model_votes': prediction.get('model_votes', {}),
        'created_at': datetime.now(timezone.utc),
    }

    document_reference = firestore_client.collection(REPORTS_COLLECTION).document()
    document_reference.set(payload)
    return get_report_by_id(document_reference.id)


def get_report_by_id(report_id):
    firestore_client = get_firestore_client()
    document = firestore_client.collection(REPORTS_COLLECTION).document(report_id).get()

    if not document.exists:
        return None

    return serialize_document(document)


def list_reports_for_user(user_id):
    firestore_client = get_firestore_client()
    reports = [
        serialize_document(document)
        for document in firestore_client.collection(REPORTS_COLLECTION)
        .where(filter=firestore.FieldFilter('user_id', '==', user_id))
        .stream()
    ]
    return sorted(reports, key=lambda item: item.get('created_at', ''), reverse=True)


def list_all_users():
    firestore_client = get_firestore_client()
    users = [serialize_document(document) for document in firestore_client.collection(USERS_COLLECTION).stream()]
    return sorted(users, key=lambda item: item.get('created_at', ''), reverse=True)


def list_all_reports(filters=None):
    firestore_client = get_firestore_client()
    reports = [
        serialize_document(document)
        for document in firestore_client.collection(REPORTS_COLLECTION).stream()
    ]

    filters = filters or {}
    severity = filters.get('severity')
    date_filter = filters.get('date')

    if severity:
        reports = [report for report in reports if report.get('severity') == severity]

    if date_filter:
        reports = [
            report
            for report in reports
            if str(report.get('created_at', '')).startswith(date_filter)
        ]

    return sorted(reports, key=lambda item: item.get('created_at', ''), reverse=True)


def update_report(report_id, updates):
    """Update a report with the provided fields."""
    firestore_client = get_firestore_client()
    document_reference = firestore_client.collection(REPORTS_COLLECTION).document(report_id)
    
    # Check if report exists
    if not document_reference.get().exists:
        return None
    
    # Add updated_at timestamp
    updates['updated_at'] = datetime.now(timezone.utc)
    
    # Update the document
    document_reference.update(updates)
    return get_report_by_id(report_id)


def delete_report(report_id):
    """Delete a report by ID."""
    firestore_client = get_firestore_client()
    document_reference = firestore_client.collection(REPORTS_COLLECTION).document(report_id)
    
    # Check if report exists
    if not document_reference.get().exists:
        return False
    
    document_reference.delete()
    return True

