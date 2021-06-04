# <span style="color:#32BB64">cash</span><span style="color:orange">fair</span>

## [Link to mid-course screencast](https://www.youtube.com/watch?v=avGOSQFu8PI)

## [Link to project screencast](https://www.youtube.com/watch?v=bzb-7-w5fVo)

## [Link to youha847 individual oral code screencast](https://www.youtube.com/watch?v=MWot8eLkIy0)

## [Link to elmzi904 individual oral code screencast](https://www.youtube.com/watch?v=OGY_aXJvmiY)

## Functional specification

### Project vision

A web application where people can register cash payments and send money to each other via e.g Swish, which can be implemented using the Swish developer API. The webapp will feature a dashboard where users can see all pending and complete payments. Payments can be registered with individual users and groups of users. The major difference would be that instead of allowing a sender to register a cash payment by temselves, the cash payment needs to be verified by the receiver before being accepted by the system and logged. A user can also request a cash payment or loan from another user. The webapp is basically our own take on Splitwise, with a simpler interface and with more functionality.

### Core features

<ul>
    <li>Record payments to other users, has to be verified by receiver</li>
    <li>Register loans to and from other users</li>
    <li>Request payment from other users</li>
    <li>Create groups and register group payments</li>
    <li>Integrated payment using Swish</li>
    <li>Transaction history</li>
</ul>

## Technological specification
**Front-end:** The planned front-end framework for the project is React, since both project members have used Vue + Django prior to this project and wish to try out using React in a project.

**Back-end:** The planned back-end framework for this project is Flask, which has been slightly used by both project members in the basic web programming course (TDDD97). This is an opportunity to get more familiar with Flask.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `HTTPS=true npm start`

Runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Start the back-end server

## Installing required python packages

To install the required python packages simply run `pip install -r requirements.txt` from the root of the directory.

## Launching the docker environments

From the root of the directory, run `docker-compose up -d`.

## Creating the database

If it is the first time running the backend, then the following commands have to be run as well:

        source .env
        flask db init
        flask db migrate -m "init"
        flask db upgrade

## Launching the server

Run the command `python backend/runserver.py` from the root of the directory.
