# React Blog CMS

A custom headless CMS made with MERN stack to be used as a blog.

## Features

- Posts
- Categories
- Tags
- Comments
- Notifications
- Profile Info

## Run it locally

**1)** Fill in the values for the following variables in the `.env` file:

```
PORT=3500
DATABASE="<database_connection_string>"
CORS_ORIGIN="http://localhost:3000"
.
.
.
JWT_SECRET="json_web_token_secret_value"
```

You can also change the values of the rest of the parameters regarding:
- The maximum file size to be uploaded.
- The paths in which the images will be stored.
- The number of recent posts to be displayed on frontend.
- The salt rounds used for encrypting your password.
- The JWT related values.

##

**2)** Run the setup script.

This script will check if all `env` variables are configured correctly for the API to run and will prompt you to create a user account in order to log into the admin panel.
In order to do that run:

```
node setup.js
```

##

**3)** Deploy the API, admin and frontend of the blog.

To deploy the API, in the `blog-api` directory run:
```
nodemon index.js
```

To deploy the admin panel, in the `blog` directory run:
```
npm start
```

To deploy the admin panel, in the `blog-web` directory run:
```
npm start
```