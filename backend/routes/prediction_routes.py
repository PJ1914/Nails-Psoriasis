from flask import Blueprint

from controllers.prediction_controller import create_prediction

prediction_blueprint = Blueprint('prediction', __name__)

prediction_blueprint.post('/predict')(create_prediction)
