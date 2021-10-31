# node-red-contrib-bl3p

Node-RED module that interfaces with the BL3P API (https://www.bl3p.eu/)

Install this module with the following command: `npm install pieterjm/node-red-contrib-bl3p`

As umbrel (https://getumbrel.com/), a popular Bitcoin and Lightning node distribution, includes Node-RED, this module can be installed there with the following procedure:

 1. Make sure that the Node-RED app on your umbrel node is installed and active. 
 2. Log in with SSH on your umbrel node.
 3. Check the name of the node-red docker container id (`CONTAINER_ID`) with `docker ps`
 4. Start a shell in the node-red docker container: `docker exec -it CONTAINER_ID < /bin/bash`
 5. In the shell, navigate to the `/data` directory and install the module with the following commands:
    ```
    cd /data
    npm install pieterjm/node-red-contrib-bl3p
    exit
    ```
 6. Restart the node-red container `docker restart CONTAINER_ID`

A minimal sample flow (`example-1.json`) that executes a buy order at BL3P is available in the examples folder. 

