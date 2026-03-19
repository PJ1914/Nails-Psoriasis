import firebase_admin
from firebase_admin import credentials, firestore, initialize_app, storage

from config.settings import settings


def _build_credential():
    if settings.firebase_service_account_key_path:
        return credentials.Certificate(settings.firebase_service_account_key_path)

    return credentials.ApplicationDefault()


def get_firebase_app():
    if firebase_admin._apps:
        return firebase_admin.get_app()

    options = {}

    if settings.firebase_project_id:
        options['projectId'] = settings.firebase_project_id

    if settings.firebase_storage_bucket:
        options['storageBucket'] = settings.firebase_storage_bucket

    return initialize_app(_build_credential(), options)


def get_firestore_client():
    firebase_app = get_firebase_app()
    return firestore.client(app=firebase_app)


def get_storage_bucket():
    if not settings.firebase_storage_bucket:
        return None

    firebase_app = get_firebase_app()
    return storage.bucket(app=firebase_app)
