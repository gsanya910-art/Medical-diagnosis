import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def train_pneumonia_model():
    print("🚀 Starting Pneumonia Model Training...")
    
    # Data paths
    train_dir = 'data/chest_xray/train'
    test_dir = 'data/chest_xray/test'
    
    # Simple data generator without complex augmentations
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        validation_split=0.2
    )
    
    test_datagen = ImageDataGenerator(rescale=1./255)
    
    # Load training data
    print("📂 Loading training data...")
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        shuffle=True,
        subset='training'
    )
    
    # Load validation data
    print("📂 Loading validation data...")
    validation_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        shuffle=False,
        subset='validation'
    )
    
    # Load test data
    print("📂 Loading test data...")
    test_generator = test_datagen.flow_from_directory(
        test_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        shuffle=False
    )
    
    # Create model with transfer learning
    print("🛠️ Creating model architecture...")
    
    # Use pre-trained MobileNetV2 as base
    base_model = keras.applications.MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )
    
    # Freeze base model layers
    base_model.trainable = False
    
    # Create custom model on top
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(2, activation='softmax')
    ])
    
    # Use legacy optimizer with only accuracy metric
    model.compile(
        optimizer=tf.keras.optimizers.legacy.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']  # Only accuracy to avoid issues
    )
    
    print("📊 Model Summary:")
    model.summary()
    
    # Train the model
    print("🎯 Starting training...")
    history = model.fit(
        train_generator,
        epochs=10,
        validation_data=validation_generator,
        verbose=1
    )
    
    # Save the trained model
    model.save('app/models/pneumonia_model.h5')
    print("✅ Trained model saved successfully!")
    
    # Evaluate on test data
    print("📈 Evaluating on test data...")
    test_loss, test_accuracy = model.evaluate(test_generator, verbose=0)
    
    print("\n🎉 Training Complete!")
    print(f"📊 Test Results:")
    print(f"   Accuracy: {test_accuracy:.4f}")
    print(f"   Loss: {test_loss:.4f}")
    
    # Print class indices
    print(f"\n🔍 Class Indices: {train_generator.class_indices}")

if __name__ == "__main__":
    train_pneumonia_model()