
import express, { Request, Response } from 'express';

export type Handler = (req: Request, res: Response) => void;

export type Endpoint = {
    method: 'get' | 'post',
    path: string,
    handler: Handler,
};

export interface StartOptions {
  silent?: boolean;
}

export const PORT = process.env.PORT || 8080;

export function start (endpoints: Endpoint[], options: StartOptions = {}) {
    const app = express();
    
    app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));
    
    app.get('/ping', (req: Request, res: Response) => res.json({pong: true}));

    endpoints.forEach(({method, path, handler}) => app[method](path, handler));
    
    const server = app.listen(PORT, () => {
      if (!options.silent) console.log(`Server is running at http://localhost:${PORT}`);
    });

    return server;
}
