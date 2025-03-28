import { MiddlewareHandler } from 'hono';
import client from 'prom-client';

// Counter
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of requests',
    labelNames: ['method', 'route', 'status_code']
})

// Gauge
const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
});

// Histogram
const httpRequestDurationMicroSeconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]
})

export const metricsMiddleware: MiddlewareHandler = async (c, next) => {
    const startTime = Date.now();
    activeRequestsGauge.inc();
    await next();

    c.executionCtx.waitUntil(
        (async () => {

            const endTime = Date.now();
            const duration = endTime - startTime;
            console.log(`Request took ${duration}ms`);

            // Increment Counter
            requestCounter.inc({
                method: c.req.method,
                route: c.req.path,
                status_code: c.res.status
            })

            // Requests in ms
            httpRequestDurationMicroSeconds.observe({
                method: c.req.method,
                route: c.req.path,
                status_code: c.res.status
            }, duration);

            // Active Requests
            activeRequestsGauge.dec();
        })()
    );
    return;
}