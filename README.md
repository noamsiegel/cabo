# Cabo Card Game

## Overview
Cabo is a card game where the objective is to minimize the sum of your own cards. Players start with four face-down cards and can use card effects to reveal, manipulate, and swap cards throughout the game. The player with the lowest total score at the end of a round wins.

This project was built with [Boardzilla](https://www.boardzilla.io). Read the docs [here](https://docs.boardzilla.io)

## Table of Contents
- [Cabo Card Game](#cabo-card-game)
	- [Overview](#overview)
	- [Table of Contents](#table-of-contents)
	- [Installation](#installation)
	- [Usage](#usage)
		- [Scripts](#scripts)
	- [Game Rules](#game-rules)
	- [Project Structure](#project-structure)
	- [Contributing](#contributing)
	- [License](#license)

## Installation
To install the dependencies, run:

```bash
yarn install
```

## Usage
To start the development server, run:

```bash
npm run dev
```

To build the project for production, run:

```bash
npm run build:ui:prod
npm run build:game:prod
```

To run the type checker, use:

```bash
npm run typecheck
```

To run tests, use:

```bash
npm test
```

### Scripts

The following scripts are available:

- `dev`: Starts the development server.
- `info`: Displays project information.
- `submit`: Submits the project.
- `typecheck`: Runs TypeScript type checking.
- `typecheck:clear`: Clears the TypeScript build info and runs type checking.
- `build:ui`: Builds the UI for development.
- `build:ui:prod`: Builds the UI for production.
- `build:game`: Builds the game for development.
- `build:game:prod`: Builds the game for production.
- `test`: Runs the tests.

## Game Rules
For detailed game rules, refer to the [CaboRules.md](./CaboRules.md) file.

## Project Structure
The project structure is as follows:

- **src**: Contains the source code for the game.
  - **game**: Contains the game logic and setup.
    - `index.ts`: Main game logic and setup.
  - **ui**: Contains the UI components and styles.
    - `style.scss`: SCSS styles for the UI.
- **build**: Contains the build output.
  - **ui**: Contains the built UI assets.
  - **game**: Contains the built game assets.
- **assets**: Contains static assets like images and fonts.
- **scripts**: Contains build and development scripts.
  - `esbuild.ui.mjs`: Build script for the UI.
  - `esbuild.game.mjs`: Build script for the game.
- **config**: Contains configuration files.
  - `tsconfig.json`: TypeScript configuration.
  - `package.json`: Project metadata and dependencies.
  - `.gitattributes`: Git attributes configuration.

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.