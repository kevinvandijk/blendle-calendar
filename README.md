# Blendle Calendar

### Usage

Open `dist/index.html` in your browser. It should immediately work.

### Development

You will need [yarn](https://yarnpkg.com/en/) to install all necessary dependencies.
With yarn installed run
```
yarn install
```

You can now start the development server by running
```
yarn start
```

The app will now be running on http://localhost:3000

### Running tests

[Jest](https://facebook.github.io/) is used for unit tests and snapshot tests.
To run the included tests:
```
yarn test
```

or for watch mode:
```
yarn test -- --watch
```

### Building

To create a new distribution version:
```
yarn run build
```
