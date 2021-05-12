import { Request, Response } from 'express';
import { Lab, Specimen } from '../../entities';
import { em } from '../../server';

export default async function select(req: Request, res: Response) {
  const { labName, conditions, loadRelations } = req.body;

  if (!labName) {
    res.status(400).send('You must provide a target labName(s)');
  } else if (labName === 'any') {
    await em
      .find(Specimen, { ...(conditions ?? {}) }, [...(loadRelations ?? [])])
      .then((specimen) => res.send(specimen))
      .catch((err) => res.status(500).send(err));
  } else {
    // loadRelations example: -->
    // ['taxonomy', 'collectionEvent', 'collectionEvent.location', 'loan', 'storage']
    // this is determined  manually if the user plucks a column(s)

    const lab = await em.findOne(Lab, { labName });

    if (lab) {
      await em
        .find(Specimen, { ...(conditions ?? {}), lab }, [
          ...(loadRelations ?? []),
        ])
        .then((specimen) => res.send(specimen))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(500).send('Could not location target lab: ' + labName);
    }
  }
}
