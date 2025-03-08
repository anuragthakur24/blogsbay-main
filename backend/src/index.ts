import { Hono } from 'hono';
import { userRoutes } from './routes/user';
import { blogRoutes } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS for all routes
app.use('/*', cors());

// Mount user-related routes under /api/v1/user
app.route('/api/v1/user', userRoutes);

// Mount blog-related routes under /api/v1/blog
app.route('/api/v1/blog', blogRoutes);

export default app;