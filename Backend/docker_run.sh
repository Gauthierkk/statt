# This is used for testing purposes, should not be run in production

#Remove previous container - will just return an error if doesn't exist
docker stop api-backend
docker rm api-backend

# Build docker container
docker build -t api-backend .

# Run docker
docker run -d --name api-backend -p 8080:8080 api-backend