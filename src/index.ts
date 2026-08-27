import { Elysia } from 'elysia';
import { db } from './db';
import { sql } from 'drizzle-orm';
import { usersRoute } from './routes/users-route';

const port = process.env.PORT || 3000;

const app = new Elysia()
  .use(usersRoute)
  .get('/', () => ({
    message: 'Hello World from ElysiaJS with Bun and Drizzle ORM!',
    timestamp: new Date().toISOString()
  }))
  .get('/health', async () => {
    try {
      // Check database connection using drizzle's sql helper
      await db.execute(sql`SELECT 1`);
      return {
        status: 'OK',
        database: 'Connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        status: 'ERROR',
        database: 'Disconnected',
        error: error.message || 'Unknown database connection error',
        timestamp: new Date().toISOString(),
      };
    }
  })
  .listen(port);

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`);
