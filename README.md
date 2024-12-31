# Coding Assessment for Statt

To start this web app, run docker compose up in the root directory. The frontend will run on localhost port 5173 (http://localhost:5173), and the backend will run on port 8080 (http://localhost:8080).
Both the frontend and backend can be run as independent Docker containers using the docker_run.sh script located in their respective directories.

# Backend

The core API is hosted using FastAPI and is defined in the api.py file, with two helper functions located in the clean.py file. The available endpoints include:
Health Check Endpoint: Verifies that the API is running.
Fetch All Data: Retrieves all available data with a configurable row limit.
Filtered Data Retrieval: Fetches data based on query filters.
Retrieve Column Keys: Returns all column keys for the dataset.
Manage Fetch Limit: Sets and retrieves the maximum number of rows to fetch per request.
You can run the backend independently using fastapi dev --port 8080. Please note that specifying the port is important because FastAPI defaults to port 8000.

# Frontend

The frontend is a simple single-page React app built using Vite. It features a form with a filter input, which applies the filter to the underlying API query for the dataset. The filtered data is then displayed in tabular format on the webpage. The frontend communicates with the backend through API calls to methods defined in FastAPI.

# Data

The dataset consists of the publicly available list of building permits issued by the City of Austin. It always queries the most up-to-date data available for this dataset. You can find more information about it here: [City of Austin Building Permits Dataset.](https://data.austintexas.gov/Building-and-Development/Issued-Construction-Permits/3syk-w9eu/about_data)
Please note that querying this dataset may sometimes take time, likely due to rate limiting.
By default, only 50 rows are returned. However, you can adjust this limit through the interface, up to a maximum of 1,000 rows.
The preset columns returned were selected based on their informational value. These columns are also used for filtering. While there is no way to change this selection within the interface, you can modify it in the clean.py file.

# Possible improvements

- Allow users to filter from ANY column in the dataset. The challenge here is there is no way to query all the fields present in the API and no way to know if a single item contains all fields. If an item doesn't have a value for a specific field it simply won't be returned as part of the query.
- Allow users to download the data, possibly as CSV. This would probably be a bit redundant, however a nice bit of functionality to have.
- Improve styling, especially in the form section.
- Both the containers are set to run on the dev versions of their respective engines, for a production webapp this should be changed.
- Build out fastAPI documentation for future users.
