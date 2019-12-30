# Whizzball Reborn
Through examination of the decompiled source code of the old flash game Whizzball by Discovery, I have been able to reverse engineer the backend server so that the game may be played past its official end-of-life.

## Public Host
At the moment, there is no public host. I hope to either run one myself or have someone else handle it. Once there is a public host, I will post the link here.

## Installation
For self-hosts, installation is easy through Docker. Simply download the `docker-compose.yaml` file and run with `docker stack deploy -c docker-compose.yaml whizzball` for Docker Swarm or `docker-compose up` for Docker Compose.

If running as swarm, be sure to run `docker swarm init` first.

After the containers have been spun up, access the webpage from http://localhost, http://127.0.0.1, or any other form of your local IP.

## Disclaimers
For one, I do not own this game. The game was created by Discovery.com. Also, the code of the flash game is not the same as when it was still active. I made very minor modifications to the game's code so that it directs its network traffic to the correct location.

Since I do not own this game and was not given explicit permission to revive it, I or anyone else will not be able to profit from this game. This repository only exists for public archival purposes.