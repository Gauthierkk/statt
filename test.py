import requests
from pprint import pp

# Define the metadata URL for your dataset
metadata_url = "https://data.austintexas.gov/resource/3syk-w9eu.json"

# Make a GET request to fetch metadata
response = requests.get(metadata_url)

# Parse the JSON response
metadata = response.json()

pp(metadata)

# Extract column names
# column_names = [column['name'] for column in metadata['columns']]

# print("Column Names:", column_names)
