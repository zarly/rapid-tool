
import express, { Request, Response } from 'express';

export type Handler = (req: Request, res: Response) => void;

export type Endpoint = {
    method: 'get' | 'post',
    path: string,
    handler: Handler,
};

export function start (endpoints: Endpoint[]) {
    const app = express();
    const PORT = 8080;
    
    app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));
    
    app.get('/ping', (req: Request, res: Response) => res.json({pong: true}));

    endpoints.forEach(({method, path, handler}) => app[method](path, handler));
    
    app.listen(PORT, () => {
      console.log(`Server is running at https://localhost:${PORT}`);
    });
}
