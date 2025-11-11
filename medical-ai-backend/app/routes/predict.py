from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from app.models.prediction_model import model
from app.utils.image_processing import validate_image, process_uploaded_image
import numpy as np

router = APIRouter()

@router.post("/predict")
async def predict_pneumonia(file: UploadFile = File(...)):
    """
    Predict pneumonia from chest X-ray image
    """
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400, 
            detail="File must be an image"
        )
    
    try:
        # Read file content
        contents = await file.read()
        
        # Validate image
        if not validate_image(contents):
            raise HTTPException(
                status_code=400, 
                detail="Invalid image file"
            )
        
        # Process image
        image_array = process_uploaded_image(contents)
        

        # Make prediction
        prediction = model.predict(image_array)
        
        
        return JSONResponse(content={
            "success": True,
            "prediction": prediction,
            "filename": file.filename
        })
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error processing prediction: {str(e)}"
        )

@router.get("/model-info")
async def get_model_info():
    """Get information about the loaded model"""
    return {
        "model_loaded": model.model is not None,
        "input_size": model.img_size,
        "classes": model.class_names
    }