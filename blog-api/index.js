const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectToDatabase = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

/* Initialize dotenv to get environment variables. */
dotenv.config();

/* Connect to database. */
connectToDatabase();

/* Admin route files. */
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');
const tags = require('./routes/admin/tags');
const profile = require('./routes/admin/profile');
const notifications = require('./routes/admin/notifications');
const quicksearch = require('./routes/admin/quicksearch');
const stats = require('./routes/admin/stats');
const auth = require('./routes/admin/auth');

/* Web route files. */
const webPosts = require('./routes/web/posts');
const webCategories = require('./routes/web/categories');
const webComments = require('./routes/web/comments');
const webProfile = require('./routes/web/profile');
const webNotifications = require('./routes/web/notifications');
const webStats = require('./routes/web/stats');
const webTags = require('./routes/web/tags');

/* Create app. */
const app = express();

/* Body parser. */
app.use(express.json());

/* CORS setup. */
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/* Cookie parser. */
app.use(cookieParser());

// Set static folder
app.use('/media', express.static(path.join(__dirname, 'media')));

/* Mount admin routers. */
app.use('/api/v1/admin/posts', posts);
app.use('/api/v1/admin/categories', categories);
app.use('/api/v1/admin/comments', comments);
app.use('/api/v1/admin/tags', tags);
app.use('/api/v1/admin/profile', profile);
app.use('/api/v1/admin/notifications', notifications);
app.use('/api/v1/admin/quicksearch', quicksearch);
app.use('/api/v1/admin/stats', stats);
app.use('/api/v1/admin/auth', auth);

/* Mount web routers. */
app.use('/api/v1/web/posts', webPosts);
app.use('/api/v1/web/categories', webCategories);
app.use('/api/v1/web/comments', webComments);
app.use('/api/v1/web/profile', webProfile);
app.use('/api/v1/web/notifications', webNotifications);
app.use('/api/v1/web/stats', webStats);
app.use('/api/v1/web/tags', webTags);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({'status' : 'success'});
});

app.set('port', process.env.PORT || 3500);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});