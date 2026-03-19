def predict(image_url):
    return {
        'napsi_score': 25,
        'severity': 'Moderate',
        'features': {
            'pitting': True,
            'onycholysis': False,
            'discoloration': True,
            'crumbling': False,
        },
        'processed_image_url': image_url,
    }
