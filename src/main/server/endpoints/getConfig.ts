import { Request, Response } from 'express';
import { CONFIG_FILE, CONFIG_DIR } from '../server';
import fs from 'fs';
import { DEFAULT_CONFIG } from '../types';

// TODO: test me
export default function getConfig(_req: Request, res: Response) {
  fs.access(CONFIG_FILE, (err) => {
    if (err && err.code === 'ENOENT') {
      // attempt to make dir
      fs.mkdir(CONFIG_DIR, (err) => {
        if (err) {
          res.status(500);
          res.send('Could not create config directory');
        } else {
          fs.writeFile(
            CONFIG_FILE,
            JSON.stringify(DEFAULT_CONFIG, null, 2),
            (data) => {
              console.log(data);
              res.status(201).send(data);
            }
          );
        }
      });
    } else {
      fs.readFile(CONFIG_FILE, (err, data) => {
        if (err) {
          res.status(500).send('Could not retrieve config file');
        } else {
          res.status(200).send(data);
        }
      });
    }
  });
}
