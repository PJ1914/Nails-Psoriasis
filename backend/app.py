from flask import Flask, jsonify
from flask_cors import CORS

from config.settings import settings
from routes.admin_routes import admin_blueprint
from routes.history_routes import history_blueprint
from routes.prediction_routes import prediction_blueprint


def create_app():
    app = Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False

    CORS(
        app,
        resources={r"/api/*": {"origins": settings.cors_origins}},
        supports_credentials=True,
    )

    app.register_blueprint(prediction_blueprint, url_prefix='/api')
    app.register_blueprint(history_blueprint, url_prefix='/api')
    app.register_blueprint(admin_blueprint, url_prefix='/api')

    @app.get('/api/health')
    def health_check():
        return jsonify({'status': 'ok'})

    return app


app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=settings.port, debug=settings.debug)
