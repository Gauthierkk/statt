## Set up

This application is dockerized and while you can manually run both the front end and back end, for ease of use I suggest using docker. If you have not installed docker on your machine yet, please do that first.

To set up the frontend and backend using the docker file, navigate to the root directory and run the command `docker compose up`. This will start both the frontend and backend containers and they will be available at `http://localhost:5173` and `http://localhost:8080` respectively.

Note: You may run the containers independently from one another as well, I have attached scripts to help with that. Be aware you have to make sure the ports are free before doing so.

## Diagram

![alt text](spycloud.drawio.png.png)
