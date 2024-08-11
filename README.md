# Full-Stack Chat Application

This repository contains the code for a full-stack chat application utilizing a Node.js backend with Socket.IO for real-time communication and an Angular frontend. The application allows users to join chatrooms and send messages in real-time.

## Features

- **Real-time chat**: Users can join chatrooms and send messages in real-time.
- **User authentication**: Supports user login and session management.
- **Responsive design**: The frontend is designed to be responsive and works on both desktop and mobile browsers.
- **Persistent connections**: Utilizes WebSockets for maintaining persistent connections for real-time updates.

## Technologies Used

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: Angular, ngx-socket-io, RxJS
- **Database**: SQLite
- **Styling**: CSS/SCSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

`Node: v20.11.0, as well as NPM: 10.4.0`


### Installing

A step-by-step series of examples that tell you how to get a development environment running.

#### Backend

Navigate to the backend directory:

`cd backend`

Install the dependencies:

`npm install`

Start the server:

`node index.js`


#### Frontend

Navigate to the frontend directory:

`cd ../frontend`


Install the dependencies:

`npm install`

Start the server:

`npm start`

## Usage

Register an account, log into said account, create a chatroom or join an existing one, then start chatting. For testing purposes, I advice using a separate browser to simulate the chat between two users.

## Testing

Run Jasmine testing via: `npm test`

## Authors

- **Nae T Sebastian** - *Initial work(Still in progress)* - [www.github.com/sebastian311](https://www.github.com/sebastian311)

## Acknowledgments

- Me
