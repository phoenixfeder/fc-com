# Flashcard Community Frontend Installation Guide

Thank you for trying out our application. If you come up to various problems that you can't solve by following our troubleshooting guide, feel free to inform us by opening an issue or write us an [E-Mail](mailto:flashcardcommunity@gmail.com).

## Requirements

  - Clone the repository with any tool of your choice. We prefer GitKraken, but it is up to you!

  - Have our backend running! See the installation guide [here](https://github.com/phoenixfeder/fc-com/tree/master/backend).

  - You will need...
      - NPM installed which comes with NodeJS - get it here: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
      - A texteditor of your choice, but it's not necessarily needed. Visual Studio Code and WebStorm are both stellar choices for frontend development. Only if you want to adjust the code to your favor.

## Make it run

1) Open your terminal (cmd, PowerShell in Windows) and navigate to the frontend folder of our repository.\
`cd PATH_YOU_CLONED_TO/frontend`

2) Run `npm install` within that directory to install all the dependencies that are needed to run the application.

3) Now run `npm start` to start a local development server. Note that this not how you would run this application in production, but this more than enough to have it running on your local machine. To learn more about npm scripts for react, see [here](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started). Furthermore `npm test` will start our UI tests with Testcafé.

4) Eventually, [http://localhost:3000/](http://localhost:3000/) will open automatically after a small period of time. If not, open it manually after some minutes.

## Troubleshooting

  - When trying to login, register etc., nothing happens and the whole console is being spammed by errors. This occurs, when the backend is not running properly. See the installation guide for our backend!
  - `ENOENT: no such file or directory, open '...\package.json'` appears when you forgot to navigate to the frontend directory. See step 1.
  - `... is not defined`. Perhaps you are missing some dependencies. Try to install all dependencies by following step 2.
