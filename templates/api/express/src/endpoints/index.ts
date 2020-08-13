
import { Endpoint } from '../core';

export const endpoints: Endpoint[] = [
    {
        method: 'get',
        path: '/hello',
        handler: (req, res) => res.send('Hello!!!'),
      }
];
