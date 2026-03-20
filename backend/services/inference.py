import io
from pathlib import Path
from urllib.request import urlopen

import numpy as np
from PIL import Image, ImageOps
from tensorflow import keras

CLASS_LABELS = [
    'Acral_Lentiginous_Melanoma',
    'Healthy_Nail',
    'Nail_psoriasis',
    'Onychogryphosis',
    'blue_finger',
    'clubbing',
    'pitting',
]

MODEL_FILES = {
    'ResNet50': 'best_ResNet50.keras',
    'EfficientNetB0': 'best_EfficientNetB0.keras',
    'MobileNetV3Large': 'best_MobileNetV3Large.keras',
}

INPUT_IMAGE_SIZE = (224, 224)
MODEL_CACHE = {}


def _models_directory():
    return Path(__file__).resolve().parents[2] / 'ai-model'


def _load_models():
    if MODEL_CACHE:
        return MODEL_CACHE

    models_dir = _models_directory()

    for model_name, filename in MODEL_FILES.items():
        model_path = models_dir / filename

        if not model_path.exists():
            raise FileNotFoundError(f'Model file not found: {model_path}')

        MODEL_CACHE[model_name] = keras.models.load_model(model_path, compile=False)

    return MODEL_CACHE


def _download_image(image_url):
    try:
        with urlopen(image_url, timeout=30) as response:
            if response.status != 200:
                raise ValueError(f'Failed to download image: HTTP {response.status}')
            return response.read()
    except Exception as error:
        raise ValueError(f'Unable to download image from URL: {str(error)}') from error


def _preprocess_image(image_bytes):
    """
    Preprocess image to raw pixel values [0, 255].
    Model-specific preprocessing will be applied per-model during ensemble.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = ImageOps.fit(image, INPUT_IMAGE_SIZE, method=Image.Resampling.BILINEAR)

        # Convert to array with pixel values in [0, 255] range
        # Each model will apply its own preprocessing
        image_array = np.asarray(image, dtype=np.float32)
        
        # Log preprocessing details
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Preprocessed image shape: {image_array.shape}")
        logger.info(f"Pixel value range: [{image_array.min():.4f}, {image_array.max():.4f}]")
        logger.info(f"Mean RGB: [{image_array[:,:,0].mean():.4f}, {image_array[:,:,1].mean():.4f}, {image_array[:,:,2].mean():.4f}]")
        
        return np.expand_dims(image_array, axis=0)
    except Exception as error:
        raise ValueError(f'Failed to preprocess image: {str(error)}') from error


def _ensemble_probabilities(image_batch):
    """
    Run ensemble prediction with raw pixel values [0-255].
    Models have preprocessing baked in during training, so we feed raw pixels directly.
    DO NOT apply preprocessing here - it would cause double preprocessing!
    """
    models = _load_models()
    probabilities = []
    model_scores = {}

    for model_name, model in models.items():
        # Feed raw pixels directly - model has preprocessing baked in!
        prediction = model.predict(image_batch, verbose=0)[0]
        prediction = np.asarray(prediction, dtype=np.float32)
        prediction = prediction / np.sum(prediction)
        probabilities.append(prediction)
        model_scores[model_name] = prediction

    ensemble = np.mean(probabilities, axis=0)
    ensemble = ensemble / np.sum(ensemble)
    return ensemble, model_scores


def _derive_features(label):
    return {
        'pitting': label in {'pitting', 'Nail_psoriasis'},
        'onycholysis': label in {'Onychogryphosis', 'Nail_psoriasis'},
        'discoloration': label in {'blue_finger', 'Acral_Lentiginous_Melanoma', 'Onychogryphosis'},
        'crumbling': label in {'Onychogryphosis', 'Nail_psoriasis'},
    }


def _calculate_napsi_score(label, confidence):
    base_scores = {
        'Healthy_Nail': 0,
        'pitting': 12,
        'blue_finger': 14,
        'clubbing': 18,
        'Acral_Lentiginous_Melanoma': 20,
        'Onychogryphosis': 24,
        'Nail_psoriasis': 30,
    }
    confidence_bonus = int(round(float(confidence) * 5))
    return min(80, base_scores.get(label, 10) + confidence_bonus)


def _severity_from_score(score):
    if score <= 10:
        return 'Mild'
    if score <= 25:
        return 'Moderate'
    return 'Severe'


def predict(image_url):
    import logging
    logger = logging.getLogger(__name__)
    
    image_bytes = _download_image(image_url)
    image_batch = _preprocess_image(image_bytes)

    ensemble_probs, model_scores = _ensemble_probabilities(image_batch)
    best_index = int(np.argmax(ensemble_probs))
    best_label = CLASS_LABELS[best_index]
    confidence = float(ensemble_probs[best_index])

    # Log detailed predictions for debugging
    logger.info(f"=== PREDICTION RESULTS ===")
    logger.info(f"Image URL: {image_url}")
    logger.info(f"Predicted Class: {best_label}")
    logger.info(f"Confidence: {confidence:.4f}")
    
    # Log all class probabilities
    logger.info("Ensemble Probabilities:")
    for idx, label in enumerate(CLASS_LABELS):
        logger.info(f"  {label}: {ensemble_probs[idx]:.4f}")
    
    # Log individual model predictions
    logger.info("Individual Model Predictions:")
    for model_name, scores in model_scores.items():
        predicted_idx = int(np.argmax(scores))
        predicted_class = CLASS_LABELS[predicted_idx]
        logger.info(f"  {model_name}: {predicted_class} ({scores[predicted_idx]:.4f})")

    napsi_score = _calculate_napsi_score(best_label, confidence)
    severity = _severity_from_score(napsi_score)
    
    logger.info(f"NAPSI Score: {napsi_score}, Severity: {severity}")
    logger.info("=" * 30)

    return {
        'napsi_score': napsi_score,
        'severity': severity,
        'features': _derive_features(best_label),
        'processed_image_url': image_url,
        'predicted_class': best_label,
        'confidence': round(confidence, 4),
        'model_votes': {
            model_name: round(float(scores[best_index]), 4)
            for model_name, scores in model_scores.items()
        },
    }
