import { CollectionEvent, CollectionLocation } from '../../../entities';
import { em } from '../../../server';

export default function addCollectionEvent(
  dbSpecimen: any,
  collectionEvent: any
) {
  const {
    recordedBy,
    identifiedBy,
    dateIdentified,
    verbatimDate,
    collectedYear,
    collectedMonth,
    collectedDay,
    fieldNotes,
    otherCollectors,
  } = collectionEvent;

  const dbCollectionEvent = em.create(CollectionEvent, {
    recordedBy,
    identifiedBy,
    dateIdentified,
    verbatimDate,
    collectedYear,
    collectedMonth,
    collectedDay,
    fieldNotes,
    otherCollectors,
  });

  if (collectionEvent.location) {
    dbCollectionEvent.location = em.create(CollectionLocation, {
      ...collectionEvent.location,
    });
  }

  dbSpecimen.collectionEvent = dbCollectionEvent;
}
