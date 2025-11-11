import tensorflow as tf
import numpy as np
from PIL import Image
import cv2
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PneumoniaModel:
    def __init__(self, model_path: str =   "app/models/pneumonia_model.h5"):
        self.model = None
        self.model_path = model_path
        self.img_size = (224, 224)
        self.class_names = ['NORMAL', 'PNEUMONIA']
        self.model_type = "UNKNOWN"
        self.load_model()
    
    def load_model(self):
        """Load the trained model"""
        # Check if model file exists
        if not os.path.exists(self.model_path):
            logger.error(f"❌ Model file not found at {self.model_path}")
            self.create_dummy_model()
            return
        
        # Check file size to ensure it's not empty/corrupted
        file_size = os.path.getsize(self.model_path)
        if file_size < 1024:  # Less than 1KB
            logger.error(f"❌ Model file seems too small ({file_size} bytes), likely corrupted")
            self.create_dummy_model()
            return
        
        try:
            logger.info(f"🔍 Loading model from {self.model_path} (size: {file_size} bytes)")
            self.model = tf.keras.models.load_model(self.model_path)
            self.model_type = "REAL"
            logger.info("✅ Real model loaded successfully!")
            
            # Test the model with dummy data to verify it works
            test_input = np.random.random((1, 224, 224, 3)).astype('float32')
            prediction = self.model.predict(test_input, verbose=0)
            logger.info(f"✅ Model test successful - prediction shape: {prediction.shape}")
            
        except Exception as e:
            logger.error(f"❌ Error loading real model: {e}")
            self.create_dummy_model()
    
    def create_dummy_model(self):
        """Create a dummy model for testing purposes"""
        logger.warning("🔄 Creating dummy model - THIS WILL GIVE RANDOM RESULTS!")
        
        try:
            # Create a simple sequential model
            self.model = tf.keras.Sequential([
                tf.keras.layers.Flatten(input_shape=(224, 224, 3)),
                tf.keras.layers.Dense(128, activation='relu'),
                tf.keras.layers.Dense(2, activation='softmax')
            ])
            
            # Compile the dummy model
            self.model.compile(
                optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            
            self.model_type = "DUMMY"
            logger.info("✅ Dummy model created successfully")
            
        except Exception as e:
            logger.error(f"❌ Failed to create dummy model: {e}")
            raise
    
    def preprocess_image(self, image: np.ndarray) -> np.ndarray:
        """Preprocess the image for model prediction"""
        try:
            # Resize image
            image = cv2.resize(image, self.img_size)
            
            # Convert to RGB if grayscale
            if len(image.shape) == 2:
                image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            elif image.shape[2] == 1:
                image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            elif image.shape[2] == 4:
                image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
            
            # Normalize pixel values
            image = image.astype('float32') / 255.0
            
            # Add batch dimension
            image = np.expand_dims(image, axis=0)
            
            return image
            
        except Exception as e:
            logger.error(f"❌ Error preprocessing image: {e}")
            raise
    
    def predict(self, image: np.ndarray) -> dict:
        """Make prediction on the image"""
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image)
            
            # Make prediction
            predictions = self.model.predict(processed_image, verbose=0)
            confidence = float(np.max(predictions[0]))
            predicted_class = int(np.argmax(predictions[0]))
            class_name = self.class_names[predicted_class]
            
            logger.info(f"🔍 Prediction - Class: {class_name}, Confidence: {confidence:.4f}, Model: {self.model_type}")
            
            return {
                "class": class_name,
                "confidence": confidence,
                "prediction": predicted_class,
                "probabilities": {
                    "NORMAL": float(predictions[0][0]),
                    "PNEUMONIA": float(predictions[0][1])
                },
                "model_type": self.model_type
            }
            
        except Exception as e:
            logger.error(f"❌ Prediction error: {e}")
            # Return error response
            return {
                "class": "ERROR",
                "confidence": 0.0,
                "prediction": -1,
                "probabilities": {
                    "NORMAL": 0.5,
                    "PNEUMONIA": 0.5
                },
                "model_type": "ERROR",
                "error": str(e)
            }

# Global model instance
model = PneumoniaModel()