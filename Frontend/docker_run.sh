# This is used for testing purposes, should not be run in production

#Remove previous container - will just return an error if doesn't exist
docker stop vite-frontend
docker rm vite-frontend

# Build docker container
docker build -t vite-frontend .

# Run docker
docker run -d --name vite-frontend -p 5173:5173 vite-frontend