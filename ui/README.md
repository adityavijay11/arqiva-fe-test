# UI Client to Fetch Contributions

# Framework used
I have used Vite React Typescript based framework to develop this application. I was originally planning with Next

# Note: Added delay in network response of FastAPI server
I have added 1 sec delay in FastAPI server response. Added RESPONSE_DELAY = 1 in main.py code to mimic slow Network condition and to demonstate that how well pagination cope race condition when network response delay occur meanwhile someone try to change pagination quickly.

# Number of Test Cases
Kindly ignore in limited time I could not add unit test cases for all files. But I have added for test cases for Pagination Component to showcase Unit test writing

# Whitelisting Vite dev server origin on FastAPI Server CORS
I have currently added "http://localhost:5173" 
if Vite dev server registers different port on your machine please add that in FastAPI CORS origins


Please use repo as provided, clone the project
and then run
# npm install


Following are commands

1. To access app with Dev Server: 
# npm start
2. To build Distribution Code: 
# npm run build
3. To test: 
# npm test
4. Linting: 
# npm run lint
5. Fix Linting:
# npm run lint:fix
