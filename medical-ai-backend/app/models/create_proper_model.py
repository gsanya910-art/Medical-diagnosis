import tensorflow as tf
from tensorflow.keras import layers, Model
import numpy as np
import os

def create_proper_model():
    print("Creating a properly formatted pneumonia detection model...")
    
    # Create a proper functional API model (more reliable than Sequential)
    inputs = layers.Input(shape=(224, 224, 3), name='input_layer')
    
    # First conv block
    x = layers.Conv2D(32, (3, 3), activation='relu', padding='same')(inputs)
    x = layers.MaxPooling2D((2, 2))(x)
    
    
    # Second conv block
    x = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(x)
    x = layers.MaxPooling2D((2, 2))(x)
    
    # Third conv block
    x = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(x)
    x = layers.MaxPooling2D((2, 2))(x)
    
    # Dense layers
    x = layers.Flatten()(x)
    x = layers.Dense(64, activation='relu')(x)
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(2, activation='softmax', name='output_layer')(x)
    
    # Create model
    model = Model(inputs=inputs, outputs=outputs)
    
    # Compile the model
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy', 'precision', 'recall']
    )
    
    # Create models directory
    os.makedirs('models', exist_ok=True)
    
    # Save the model
    model.save('models/pneumonia_model.h5', save_format='h5')
    
    print("✅ Model created and saved successfully!")
    print("Model summary:")
    model.summary()
    
    # Verify the model can be loaded
    print("\n🔍 Verifying model can be loaded...")
    try:
        loaded_model = tf.keras.models.load_model('models/pneumonia_model.h5')
        print("✅ Model verification successful - can be loaded properly!")
        
        # Test prediction
        test_input = np.random.random((1, 224, 224, 3)).astype('float32')
        prediction = loaded_model.predict(test_input, verbose=0)
        print(f"✅ Test prediction shape: {prediction.shape}")
        
    except Exception as e:
        print(f"❌ Model verification failed: {e}")

if __name__ == "__main__":
    create_proper_model()