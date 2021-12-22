## Description

[Nest](https://github.com/nestjs/nest) Nasa Robot UME Test API.

## Installation

```bash
$ npm install
```

## Running the app

1- In a MySQL Database, create a 'nasarobot' schema. <br />
2- Config the .env file to you database credentials.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

PS: When you run the "npm run start" command, the API runs the migrations and updates the database.

## Endpoints

POST {baseurl}/robot/run-command

 - Body Params:
   * command: commands to the robot: M/m to move forward, L/l to move left, R/r to move right, RESET/reset to reset to the first position (0, 0, N). All these options are not case sensitive;
   * initialX: start robot X position, before the command;
   * initialY: start robot Y position, before the command;
   * initialPos: start robot direction (N, S, E, W). All these options are case sensitive.

 - Return object
   * currentX: robot X position, after the command;
   * currentX: robot X position, after the command;
   * currentX: robot X position, after the command;
   * history: Objects array with all the robot commands (initial and final X, Y, Pos - and the command between it).
