##  Running a Load Balancer with Docker Compose

This guide will walk you through setting up a load balancer with Nginx and Docker Compose.

**Prerequisites:**

* Docker installed ([https://www.docker.com/](https://www.docker.com/))
* Docker Compose installed ([https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/))

**Steps:**

**1. Create Nginx Configuration File (server.conf):**

```
server {
  listen 80; # Listen on port 80

  location / {
    proxy_set_header X-Real-IP $remote_addr;  # Forward client IP
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # Add X-Forwarded-For header
    proxy_set_header Host $host;              # Preserve Host header
    proxy_set_header X-NginX-Proxy true;     # Identify as Nginx proxy
    proxy_pass http://node-app:3000;       # Forward requests to Node.js app on port 3000
    proxy_redirect off;                      # Disable redirect
  }
}
```

**2. Create Docker Compose File (docker-compose.yml):**

```yaml
version: "3.8"  # Specify Docker Compose version

services:
  # Nginx Load Balancer
  api-gateway:
    image: nginx:latest
    ports:
      - "80:80"  # Map container port 80 to host port 80
    volumes:
      - ./server.conf:/etc/nginx/conf.d/server.conf:ro  # Mount config file as read-only

  # Your Node.js Application (replace with your service definition)
  node-app:
    image: your-node-app-image  # Replace with your Node.js image name
    ports:
      - "3000:3000"  # Map container port 3000 to host port 3000  (optional)

# Run multiple instances (scale the api-gateway service)
# Usage: docker-compose -f docker-compose.yml up -d --scale api-gateway=2
```

**3. Run the Services:**

  a. Save the Nginx configuration file as `server.conf`.
  b. Save the Docker Compose configuration file as `docker-compose.yml`.
  c. Open a terminal in the directory containing both files.
  d. Run the following command to start the load balancer and your Node.js application:

```bash
docker-compose up -d
```

  e. (Optional) To scale the Nginx service and run multiple instances:

```bash
docker-compose up -d --scale api-gateway=2
```

This will create and run an Nginx container using the `server.conf` configuration. It will also run your Node.js application container. The `api-gateway` service in the Docker Compose file maps port 80 of the container to port 80 of the host machine, allowing you to access your application through `http://localhost`.

**Notes:**

* Replace `your-node-app-image` with the actual image name of your Node.js application.
* The `volumes` section in the `api-gateway` service mounts the `server.conf` file from your local machine into the container at the specified location. This allows you to update the configuration without rebuilding the image.
* The `--scale` flag in the `docker-compose up` command allows you to run multiple instances of the `api-gateway` service for load balancing.

This is a basic example. You can further customize the configuration based on your specific needs. 


# ========================================
steps: 1 create config
server {
    listen 80; // listen to this port
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://node-app:3000;  
        proxy_redirect off;
    }
}

step 2: create image in docker-compose and open ports as in above config

step 3: load the config in container
   - many ways to do this 
   ex: 1) creating image having config file
       2) creating bind mount to sync config files
cmd to run multiple instances:\
  docker-compose -f 1stFile.yml -f 2ndFile.yml -f 3rdFile.yml up -d --scale api-gate-way-ex1=2