## Installation

- Install NodeJS, MongoDB
- Install `npm`
- Start MongoDB
- Run `npm run start`
- Check `http://localhost:8080/api/health` to see it works
- Initial user is created if does not exists check config to get credentials

## With Docker

- Make sure you have `Docker` installed
- To build the image use `docker build . -t node-web-app`
- To run the container use `docker run -p 3000:8080 -d node-web-app`
- Server should be up and running on Port 3000
- Healthcheck on `http://localhost:3000/api/health`

## Configuration

| Name     | Description                 | Example                          |
| -------- | --------------------------- | -------------------------------- |
| NODE_ENV | Environment for node js     | "dev", "prod", "test"            |
| APP      | Name of the application     | My cool express app              |
| PORT     | Port to run the application | 3000                             |
| MONGOURI | MongoDB connection URI      | mongodb://localhost:27017/yourDb |
