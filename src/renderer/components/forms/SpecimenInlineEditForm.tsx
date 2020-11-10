import React from 'react';
import { Specimen } from '../../types';

type InlineEditProps = {
  specimen: Specimen;
  onEditConfirm(): void;
  onEditCancel(): void;
};

// TODO: the basic logic should be something like:
// render input for each field, make sure it makes sense
// @ts-ignore:
// TODO: use all the things
export default function SpecimenInlineEditForm({
  onEditConfirm,
  onEditCancel,
  specimen,
}: InlineEditProps) {
  return <div></div>;
}
