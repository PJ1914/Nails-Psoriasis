from flask import Blueprint

from controllers.history_controller import get_history, get_history_report

history_blueprint = Blueprint('history', __name__)

history_blueprint.get('/history')(get_history)
history_blueprint.get('/history/<report_id>')(get_history_report)
