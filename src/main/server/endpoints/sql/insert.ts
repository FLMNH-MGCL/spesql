import { Request, Response } from 'express';
import { Lab, Specimen } from '../../entities';
import { em } from '../../server';
import getSpecimenEntity from './util/getSpecimenEntity';

export default async function insert(req: Request, res: Response) {
  const { specimen, labName } = req.body;

  const lab = await em.findOne(Lab, { name: labName });

  if (!lab) {
    res.status(500).send('No lab was found with that name');
  } else if (!Array.isArray(specimen)) {
    res.status(500).send('Expected array of specimen objects');
  } else {
    let insertions: Specimen[] = [];
    for (let i = 0; i < specimen.length; i++) {
      await getSpecimenEntity(specimen[i], lab).then((dbSpecimen) =>
        insertions.push(dbSpecimen)
      );
    }

    await em
      .persistAndFlush(insertions)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        res.status(500).send(err);
      });
  }
}
