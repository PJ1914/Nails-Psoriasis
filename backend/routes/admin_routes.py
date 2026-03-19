from flask import Blueprint

from controllers.admin_controller import get_reports, get_users

admin_blueprint = Blueprint('admin', __name__)

admin_blueprint.get('/users')(get_users)
admin_blueprint.get('/reports')(get_reports)
