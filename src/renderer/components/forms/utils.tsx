import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import {
  validateCatalogNumber,
  validateCollectedDay,
  validateCollectedMonth,
  validateCollectedYear,
  validateDateField,
  validateDisposition,
  validateGeodeticDatum,
  validateIndentificationQualifier,
  validateLifeStage,
  validateListField,
  validateLowerCase,
  validateOtherCatalogNumber,
  validatePreparations,
  validatePronoun,
  validateSamplingProtocol,
  validateSex,
  validateTubeSize,
} from '../../functions/validation';
import Form from '../ui/Form';
import {
  BooleanField,
  dispositionControl,
  geodeticDatumControl,
  identificationQualifierControl,
  lifeStageControl,
  preparationsControl,
  samplingProtocolControl,
  sexControl,
  tubeSizeControl,
} from '../utils/constants';
import Datepicker from '../ui/Datepicker';

export async function fetchTables(setTables: any) {
  const res = await axios
    .get(BACKEND_URL + '/api/queriables/select/')
    .catch((error) => error.response);

  if (res.data && res.data.tables) {
    setTables(
      res.data.tables.map((table: string) => {
        return { label: table, value: table };
      })
    );
  } else if (res.status === 401) {
    return 'BAD SESSION';
  }

  return undefined;
}

export function getFormElementForField(key: string, currentValue: any) {
  // console.log(key, currentValue);

  // TODO: complete missing fields
  // TODO: convert some fields to appropriate form element
  const formElementForField = {
    catalogNumber: (
      <Form.Input
        slim
        name="catalogNumber"
        register={{ validate: validateCatalogNumber }}
        defaultValue={currentValue}
      />
    ),
    otherCatalogNumber: (
      <Form.Input
        slim
        name="otherCatalogNumber"
        register={{ validate: validateOtherCatalogNumber }}
        defaultValue={currentValue}
      />
    ),
    recordNumber: (
      <Form.Input
        slim
        name="recordNumber"
        // register={{ validate: validateRecordNumber }}
        defaultValue={currentValue}
      />
    ),
    order_: (
      <Form.Input
        slim
        name="order_"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    superfamily: (
      <Form.Input
        slim
        name="superfamily"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    family: (
      <Form.Input
        slim
        name="family"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    subfamily: (
      <Form.Input
        slim
        name="subfamily"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    tribe: (
      <Form.Input
        slim
        name="tribe"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    genus: (
      <Form.Input
        slim
        name="genus"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    subgenus: (
      <Form.Input
        slim
        name="subgenus"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    specificEpithet: (
      <Form.Input
        slim
        name="specificEpithet"
        register={{ validate: validateLowerCase }}
        defaultValue={currentValue}
      />
    ),
    infraspecificEpithet: (
      <Form.Input
        slim
        name="infraspecificEpithet"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    identificationQualifier: (
      <Form.Select
        slim
        name="identificationQualifier"
        register={{ validate: validateIndentificationQualifier }}
        options={identificationQualifierControl}
        defaultValue={currentValue}
      />
    ),
    recordedBy: (
      <Form.Input
        slim
        name="recordedBy"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    otherCollectors: (
      <Form.Input
        slim
        name="otherCollectors"
        register={{ validate: validateListField }}
        defaultValue={currentValue}
      />
    ),
    identifiedBy: (
      <Form.Input
        slim
        name="identifiedBy"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    // TODO: make a date input
    dateIdentified: (
      <Datepicker
        slim
        name="dateIdentified"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    verbatimDate: (
      <Form.Input slim name="verbatimDate" defaultValue={currentValue} />
    ),
    collectedYear: (
      <Form.Input
        slim
        name="collectedYear"
        register={{ validate: validateCollectedYear }}
        defaultValue={currentValue}
      />
    ),
    collectedMonth: (
      <Form.Input
        slim
        name="collectedMonth"
        register={{ validate: validateCollectedMonth }}
        defaultValue={currentValue}
      />
    ),
    collectedDay: (
      <Form.Input
        slim
        name="collectedDay"
        register={{ validate: validateCollectedDay }}
        defaultValue={currentValue}
      />
    ),
    dateEntered: (
      <Datepicker
        slim
        name="dateEntered"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    sex: (
      <Form.Select
        slim
        name="sex"
        register={{ validate: validateSex }}
        options={sexControl}
        defaultValue={currentValue}
      />
    ),
    lifeStage: (
      <Form.Select
        slim
        name="lifeStage"
        register={{ validate: validateLifeStage }}
        options={lifeStageControl}
        defaultValue={currentValue}
      />
    ),
    habitat: (
      <Form.Input
        slim
        name="habitat"
        // register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    // TODO: make form area
    occurrenceRemarks: (
      <Form.Input
        slim
        name="occurrenceRemarks"
        // register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    // TODO: make form area
    molecularOccurrenceRemarks: (
      <Form.Input
        slim
        name="molecularOccurrenceRemarks"
        // register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    samplingProtocol: (
      <Form.Select
        slim
        name="samplingProtocol"
        register={{ validate: validateSamplingProtocol }}
        options={samplingProtocolControl}
        defaultValue={currentValue}
      />
    ),
    country: null,
    stateProvince: null,
    county: null,
    municipality: (
      <Form.Input
        slim
        name="municipality"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    locality: (
      <Form.Input
        slim
        name="locality"
        register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    elevationInMeters: null, // TODO:
    decimalLatitude: null,
    decimalLongitude: null,
    geodeticDatum: (
      <Form.Select
        slim
        name="geodeticDatum"
        register={{ validate: validateGeodeticDatum }}
        options={geodeticDatumControl}
        defaultValue={currentValue}
      />
    ),
    coordinateUncertainty: null,
    verbatimLatitude: (
      <Form.Input
        slim
        name="verbatimLatitude"
        // register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    verbatimLongitude: (
      <Form.Input
        slim
        name="verbatimLongitude"
        // register={{ validate: validatePronoun }}
        defaultValue={currentValue}
      />
    ),
    georeferencedBy: null,
    disposition: (
      <Form.Select
        slim
        name="disposition"
        register={{ validate: validateDisposition }}
        options={dispositionControl}
        defaultValue={currentValue}
      />
    ),
    isLoaned: null,
    loanInstitution: null,
    loaneeName: null,
    loanDate: (
      <Datepicker
        slim
        name="loanDate"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    loanReturnDate: (
      <Datepicker
        slim
        name="loanReturnDate"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    preparations: (
      <Form.Select
        slim
        name="preparations"
        register={{ validate: validatePreparations }}
        options={preparationsControl}
        defaultValue={currentValue}
      />
    ),
    freezer: null,
    rack: null,
    box: null,
    tubeSize: (
      <Form.Select
        slim
        name="tubeSize"
        register={{ validate: validateTubeSize }}
        options={tubeSizeControl}
        defaultValue={currentValue}
      />
    ),
    associatedSequences: null,
    associatedReferences: null,
    withholdData: (
      <Form.Select
        slim
        name="withholdData"
        // register={{ validate: validateYe }}
        options={BooleanField}
        defaultValue={currentValue}
      />
    ),
    reared: (
      <Form.Select
        slim
        name="reared"
        // register={{ validate: validateYe }}
        options={BooleanField}
        defaultValue={currentValue}
      />
    ),
    recordEnteredBy: null,
    modifiedInfo: null,
    fieldNotes: null,
  };

  // @ts-ignore
  let element = formElementForField[key];

  // console.log(element);

  return element ?? null;
}
