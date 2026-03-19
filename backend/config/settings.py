import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass
class Settings:
    debug: bool = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
    port: int = int(os.getenv('PORT', '5000'))
    cors_origins: list[str] = None
    firebase_project_id: str | None = os.getenv('FIREBASE_PROJECT_ID')
    firebase_storage_bucket: str | None = os.getenv('FIREBASE_STORAGE_BUCKET')
    firebase_service_account_key_path: str | None = os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY_PATH')

    def __post_init__(self):
        origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173')
        self.cors_origins = [origin.strip() for origin in origins.split(',') if origin.strip()]


settings = Settings()
