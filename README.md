Frontend setup
1. cd medical-ai-frontend
2. create the .env file in root directory 
   2.1 put this REACT_APP_API_URL=http://localhost:8000
3. npm install --legacy-peer-deps
4. npm run start




For Backend setup
1. Download the data set from the kaggle if you want to re-train the model.
2. move the data set to medical-ai-backend inside the project with data folder name
3. install the python 3.11
4. pip3 install -r requirements.txt
5. Run the command uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
6. Make sure add the .env content in root project directory
