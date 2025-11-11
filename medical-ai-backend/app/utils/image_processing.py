import numpy as np
from PIL import Image
import io
import cv2

def validate_image(file_content: bytes) -> bool:
    """Validate if the uploaded file is a valid image"""
    try:
        image = Image.open(io.BytesIO(file_content))
        image.verify()
        return True
    except Exception:
        return False

def process_uploaded_image(file_content: bytes) -> np.ndarray:
    """Process uploaded image file to numpy array"""
    try:
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(file_content))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert to numpy array
        image_array = np.array(image)
        
        return image_array
        
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")