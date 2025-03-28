import { Hono } from 'hono';
import { userRoutes } from './routes/user';
import { blogRoutes } from './routes/blog';
import { cors } from 'hono/cors';

import client from 'prom-client';
import { metricsMiddleware } from '../monitering';

const app = new Hono();

// Enable CORS for all routes
app.use('/*', cors());
app.use(metricsMiddleware);

// Mount user-related routes under /api/v1/user
app.route('/api/v1/user', userRoutes);

// Mount blog-related routes under /api/v1/blog
app.route('/api/v1/blog', blogRoutes);

// Get the site metrics
app.get("/metrics", async (c) => {
    const metrics = await client.register.metrics();
    return c.text(metrics, 200, { "Content-Type": client.register.contentType });
});

export default app;