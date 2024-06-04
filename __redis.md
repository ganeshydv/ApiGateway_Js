
cmd : docker run -d --name my-redis-container -p 6379:6379 redis

in compose:

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"


to connect with other conatiner:
1) run redis container
2) run node app container
   : docker run -d --name my-node-app-container -p 3000:3000 --link my-redis-container my-node-app
cmd to run cli : 
  docker exec -it apigateway-redis-1 redis-cli -a secret


Redis cmds:
1) scan : gives keys
2) get key_value 
3) DEL key_value
=======================================================
  to connect with redis from app
=======================================================
