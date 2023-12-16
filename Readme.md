 curl -v -X POST localhost:8080/api/v1/auth/register -H 'Content-type: application/json'  -d '{ "email": "abc", "name": "123", "password": "123"}'


  curl -v -X POST localhost:8080/api/v1/auth/register -H 'Content-type: application/json' --cookie 's%3AuFleijO1sYRGDibHV_70KCkoR018K_NC.Usmo7eGzTALcKII1xcqSjmkrJjYPWHVG2dE6a%2B56ZDw'

// cmd to run two app instances
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d --scale api-gate-way-ex1=2

  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

for more info read docker.txt file
  