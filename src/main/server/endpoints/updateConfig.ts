import { Request, Response } from 'express';
import { CONFIG_FILE } from '../server';
import { MySqlCredentials } from '../types';
import fs from 'fs';

export default function updateConfig(req: Request, res: Response) {
  const newConfig: MySqlCredentials = req.body.newConfig;

  if (!newConfig) {
    res.status(400).send('Missing config content');
    return;
  }

  fs.writeFile(CONFIG_FILE, JSON.stringify(newConfig, null, 2), (err) => {
    if (err) {
      res.status(500).send('Could not load config file');
    } else {
      res.status(201).send('Updated config file');
    }
  });
}
