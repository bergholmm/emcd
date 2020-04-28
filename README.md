# EMCD

> A web app to explore xkcd comic strips

> https://emcd.herokuapp.com/

![Node.js CI](https://github.com/bergholmm/emcd/workflows/Node.js%20CI/badge.svg)

---

## Design / Architecture
There are two npm projects, one serving as a backend server `/server` and one as a frontend app `/app`. Therefore there is two `package.json` configs and two places to run `yarn`.
* `server` is a Typescript Express server that is used as a API and proxy and serves the app as static files from `app/build/`. The `package.json` along with commands for the backend is located in the root.
* `app` is a create-react-app using Typescript, Redux and Material-UI. The `package.json` along with commands for the app can be found in `/app`. More info can be found in `app/README.md`.

---

## Local Development

### Requirement
```shell
npm or yarn
node: 13.13.0+
```

### Run the server
```shell
# Inital setup
yarn

# Start the server in dev mode
yarn dev
```

### Run the app
```shell
cd app/

# Inital setup
yarn

# Start the app
yarn start
```

## Testing

### Testing the server
```shell
# Run unit tests
yarn test
```

### Testing the app
```shell
cd app/

# Run unit tests
yarn test

# Run integration tests
yarn integration-test
```

---

## Deployment
The web app is deployed via Heroku using the Node.js buildpack. This deployment will build the app with `yarn install` for the server followed by `yarn build` which will build the server to `/dist`, run `yarn install` followed by `yarn build` in `/app` which installs and build the app to `app/build/`. Lastly it runs `yarn start` in root to launch the web app.

## CI Pipeline
Before deployment the CI pipeline runs. This includes:
* Running unit tests for server and app
* Running integration tests for app
* Building both the server and the app

If any of these steps fails the changes are not pushed to Heroku.

Only the master branch is connected to Heroku.

The pipeline runs on pushes on branches as well as PRs to master.

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
