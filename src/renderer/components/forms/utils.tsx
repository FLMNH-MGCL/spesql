import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import {
  validateBooleanField,
  validateBox,
  validateCatalogNumber,
  validateCollectedDay,
  validateCollectedMonth,
  validateCollectedYear,
  validateCountry,
  validateDateField,
  validateDisposition,
  validateElevation,
  validateFamily,
  validateFreezer,
  validateGeodeticDatum,
  validateIndentificationQualifier,
  validateLatitude,
  validateLifeStage,
  validateListField,
  validateLongitude,
  validateLowerCase,
  validateName,
  validateNameListField,
  validateOtherCatalogNumber,
  validatePreparations,
  validateProperNoun,
  validateRack,
  validateSamplingProtocol,
  validateSex,
  validateSubFamily,
  validateSuperFamily,
  validateTribe,
  validateTubeSize,
  validateVerbatimLatitude,
  validateVerbatimLongitude,
} from '../../functions/validation';
import {
  BooleanField,
  countryControl,
  dispositionControl,
  geodeticDatumControl,
  identificationQualifierControl,
  lifeStageControl,
  preparationsControl,
  samplingProtocolControl,
  sexControl,
  tubeSizeControl,
} from '../utils/constants';
import { Datepicker, Form } from '@flmnh-mgcl/ui';

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

export function fixNull(value: string | number | null) {
  if (value === null) {
    return '';
  } else return value;
}

export function stringListToArray(
  value?: string
): string[] | string | undefined {
  console.log(value);
  if (!value || !value.length) {
    return [];
  }

  let valuesOnly = value.match(/[^|]+/gm);

  if (valuesOnly) {
    valuesOnly = valuesOnly
      .filter((match) => match.trim() !== '')
      .map((match) => match.trim());
    console.log(valuesOnly);

    return valuesOnly;
  } else {
    return value;
  }
}

export function getFormElementForField(key: string, currentValue: any) {
  // TODO: complete missing fields
  // TODO: null values

  const formElementForField = {
    catalogNumber: () => (
      <Form.Input
        slim
        name="catalogNumber"
        register={{ validate: validateCatalogNumber }}
        defaultValue={currentValue}
      />
    ),
    otherCatalogNumber: () => (
      <Form.Input
        slim
        name="otherCatalogNumber"
        register={{ validate: validateOtherCatalogNumber }}
        defaultValue={currentValue}
      />
    ),
    recordNumber: () => (
      <Form.Input slim name="recordNumber" defaultValue={currentValue} />
    ),
    projectNumber: () => (
      <Form.Input slim name="projectNumber" defaultValue={currentValue} />
    ),
    otherIdentifier: () => (
      <Form.Input slim name="otherIdentifier" defaultValue={currentValue} />
    ),
    order_: () => (
      <Form.Input
        slim
        name="order_"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    superfamily: () => (
      <Form.Input
        slim
        name="superfamily"
        register={{ validate: validateSuperFamily }}
        defaultValue={currentValue}
      />
    ),
    family: () => (
      <Form.Input
        slim
        name="family"
        register={{ validate: validateFamily }}
        defaultValue={currentValue}
      />
    ),
    subfamily: () => (
      <Form.Input
        slim
        name="subfamily"
        register={{ validate: validateSubFamily }}
        defaultValue={currentValue}
      />
    ),
    tribe: () => (
      <Form.Input
        slim
        name="tribe"
        register={{ validate: validateTribe }}
        defaultValue={currentValue}
      />
    ),
    genus: () => (
      <Form.Input
        slim
        name="genus"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    subgenus: () => (
      <Form.Input
        slim
        name="subgenus"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    specificEpithet: () => (
      <Form.Input
        slim
        name="specificEpithet"
        register={{ validate: validateLowerCase }}
        defaultValue={currentValue}
      />
    ),
    infraspecificEpithet: () => (
      <Form.Input
        slim
        name="infraspecificEpithet"
        register={{ validate: validateLowerCase }}
        defaultValue={currentValue}
      />
    ),
    identificationQualifier: () => (
      <Form.Select
        slim
        name="identificationQualifier"
        register={{ validate: validateIndentificationQualifier }}
        options={identificationQualifierControl}
        searchable
        defaultValue={currentValue}
      />
    ),
    recordedBy: () => (
      <Form.Input
        slim
        name="recordedBy"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    otherCollectors: () => (
      <Form.Input
        slim
        name="otherCollectors"
        register={{ validate: validateListField }}
        defaultValue={currentValue}
      />
    ),
    identifiedBy: () => (
      <Form.Input
        slim
        name="identifiedBy"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    // TODO: make a date input
    dateIdentified: () => (
      <Datepicker
        slim
        name="dateIdentified"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    verbatimDate: () => (
      <Form.Input slim name="verbatimDate" defaultValue={currentValue} />
    ),
    collectedYear: () => (
      <Form.Input
        slim
        name="collectedYear"
        register={{ validate: validateCollectedYear }}
        defaultValue={currentValue}
      />
    ),
    collectedMonth: () => (
      <Form.Input
        slim
        name="collectedMonth"
        register={{ validate: validateCollectedMonth }}
        defaultValue={currentValue}
      />
    ),
    collectedDay: () => (
      <Form.Input
        slim
        name="collectedDay"
        register={{ validate: validateCollectedDay }}
        defaultValue={currentValue}
      />
    ),
    dateEntered: () => (
      <Datepicker
        slim
        name="dateEntered"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    sex: () => (
      <Form.Select
        slim
        name="sex"
        register={{ validate: validateSex }}
        options={sexControl}
        defaultValue={currentValue}
      />
    ),
    lifeStage: () => (
      <Form.Select
        slim
        name="lifeStage"
        register={{ validate: validateLifeStage }}
        options={lifeStageControl}
        searchable
        defaultValue={currentValue}
      />
    ),
    habitat: () => (
      <Form.Input
        slim
        name="habitat"
        // register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    // TODO: make form area
    occurrenceRemarks: () => (
      <Form.Input
        slim
        name="occurrenceRemarks"
        // register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    // TODO: make form area
    molecularOccurrenceRemarks: () => (
      <Form.Input
        slim
        name="molecularOccurrenceRemarks"
        // register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    samplingProtocol: () => (
      <Form.Select
        slim
        name="samplingProtocol"
        register={{ validate: validateSamplingProtocol }}
        options={samplingProtocolControl}
        defaultValue={stringListToArray(currentValue)}
        searchable
        multiple
      />
    ),
    country: () => (
      <Form.Select
        slim
        name="country"
        register={{ validate: validateCountry }}
        options={countryControl}
        defaultValue={currentValue}
      />
    ),
    stateProvince: () => (
      <Form.Input
        slim
        name="stateProvince"
        defaultValue={currentValue}
        register={{ validate: validateProperNoun }}
      />
    ),
    county: () => (
      <Form.Input
        slim
        name="county"
        register={{ validate: validateProperNoun }}
      />
    ),
    municipality: () => (
      <Form.Input
        slim
        name="municipality"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    locality: () => (
      <Form.Input
        slim
        name="locality"
        // register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    elevationInMeters: () => (
      <Form.Input
        slim
        name="elevationInMeters"
        register={{ validate: validateElevation }}
        defaultValue={currentValue}
      />
    ), // TODO:
    decimalLatitude: () => (
      <Form.Input
        slim
        name="decimalLatitude"
        register={{ validate: validateLatitude }}
        defaultValue={currentValue}
      />
    ),
    decimalLongitude: () => (
      <Form.Input
        slim
        name="decimalLongitude"
        register={{ validate: validateLongitude }}
        defaultValue={currentValue}
      />
    ),
    geodeticDatum: () => (
      <Form.Select
        slim
        name="geodeticDatum"
        register={{ validate: validateGeodeticDatum }}
        options={geodeticDatumControl}
        searchable
        defaultValue={currentValue}
      />
    ),
    coordinateUncertainty: () => (
      <Form.Input
        slim
        name="coordinateUncertainty"
        register={{ validate: validateElevation }} // TODO: own validator?
        defaultValue={currentValue}
      />
    ),
    verbatimLatitude: () => (
      <Form.Input
        slim
        name="verbatimLatitude"
        register={{ validate: validateVerbatimLatitude }}
        defaultValue={currentValue}
      />
    ),
    verbatimLongitude: () => (
      <Form.Input
        slim
        name="verbatimLongitude"
        register={{ validate: validateVerbatimLongitude }}
        defaultValue={currentValue}
      />
    ),
    georeferencedBy: () => (
      <Form.Input
        slim
        name="georeferencedBy"
        register={{ validate: validateNameListField }}
        defaultValue={stringListToArray(currentValue)}
      />
    ),
    disposition: () => (
      <Form.Select
        slim
        name="disposition"
        register={{ validate: validateDisposition }}
        options={dispositionControl}
        defaultValue={currentValue}
      />
    ),
    isLoaned: () => (
      <Form.Select
        slim
        name="isLoaned"
        defaultValue={currentValue}
        register={{ validate: validateBooleanField }}
        options={BooleanField}
      />
    ),
    loanInstitution: () => (
      <Form.Input
        slim
        name="loanInstitution"
        register={{ validate: validateProperNoun }}
        defaultValue={currentValue}
      />
    ),
    loaneeName: () => (
      <Form.Input
        slim
        name="loaneeName"
        register={{ validate: validateName }}
        defaultValue={currentValue}
      />
    ),
    loanDate: () => (
      <Datepicker
        slim
        name="loanDate"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    loanReturnDate: () => (
      <Datepicker
        slim
        name="loanReturnDate"
        register={{ validate: validateDateField }}
        defaultValue={currentValue}
      />
    ),
    preparations: () => (
      <Form.Select
        slim
        name="preparations"
        register={{ validate: validatePreparations }}
        options={preparationsControl}
        searchable
        defaultValue={currentValue}
      />
    ),
    freezer: () => (
      <Form.Input
        slim
        name="freezer"
        register={{ validate: validateFreezer }}
        defaultValue={currentValue}
      />
    ),
    rack: () => (
      <Form.Input
        slim
        name="rack"
        register={{ validate: validateRack }}
        defaultValue={currentValue}
      />
    ),
    box: () => (
      <Form.Input
        slim
        name="box"
        register={{ validate: validateBox }}
        defaultValue={currentValue}
      />
    ),
    tubeSize: () => (
      <Form.Select
        slim
        name="tubeSize"
        register={{ validate: validateTubeSize }}
        options={tubeSizeControl}
        searchable
        defaultValue={currentValue}
      />
    ),
    associatedSequences: () => (
      <Form.Area name="associatedSequences" defaultValue={currentValue} />
    ),
    associatedReferences: () => (
      <Form.Area name="associatedReferences" defaultValue={currentValue} />
    ),
    withholdData: () => (
      <Form.Select
        slim
        name="withholdData"
        register={{ validate: validateBooleanField }}
        options={BooleanField}
        defaultValue={currentValue}
      />
    ),
    reared: () => (
      <Form.Select
        slim
        name="reared"
        register={{ validate: validateBooleanField }}
        options={BooleanField}
        defaultValue={currentValue}
      />
    ),
    recordEnteredBy: () => (
      <Form.Input
        name="recordEnteredBy"
        value={fixNull(currentValue)}
        disabled
      />
    ),
    modifiedInfo: () => null,
    fieldNotes: () => (
      <Form.Area name="fieldNotes" defaultValue={currentValue} />
    ),
  };

  // @ts-ignore
  let fn = formElementForField[key];

  return fn ? fn() : null;
}

// SELECT * FROM molecularLab WHERE samplingProtocol = 'LightLED|LightUV'
