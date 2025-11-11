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
7. Make sure add the .env content in root project directory

<img width="1438" height="686" alt="Screenshot 2025-11-11 at 7 18 12 PM" src="https://github.com/user-attachments/assets/21c20911-b609-435a-8920-e64169d96ffa" />
<img width="1440" height="683" alt="Screenshot 2025-11-11 at 7 17 48 PM" src="https://github.com/user-attachments/assets/75639a30-459b-483b-a0b8-eeb220f57bae" />
<img width="1440" height="685" alt="Screenshot 2025-11-11 at 7 18 00 PM" src="https://github.com/user-attachments/assets/51e7dc41-841e-4d2e-9642-70e5a7871e76" />
