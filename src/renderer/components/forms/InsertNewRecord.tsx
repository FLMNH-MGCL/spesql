import {
  Datepicker,
  Form,
  FormSubmitValues,
  Heading,
  Input,
  SelectOption,
  Text,
} from '@flmnh-mgcl/ui';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import {
  validateBooleanField,
  validateBox,
  validateCatalogNumber,
  validateCollectedDay,
  validateCollectedMonth,
  validateCollectedYear,
  validateCountry,
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
  validateTableSelection,
  validateTribe,
  validateTubeSize,
  validateVerbatimLatitude,
  validateVerbatimLongitude,
} from '../../functions/validation';
import {
  BooleanField,
  countryControl,
  dateDays,
  dateMonths,
  dispositionControl,
  geodeticDatumControl,
  identificationQualifierControl,
  lifeStageControl,
  preparationsControl,
  samplingProtocolControl,
  sexControl,
  tubeSizeControl,
} from '../utils/constants';
import { fetchTables } from './utils';

function Cataloging() {
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { expireSession, expiredSession, fullName } = useStore(
    (store) => ({
      expireSession: store.expireSession,
      expiredSession: store.expiredSession,
      fullName: store.user?.fullName,
    }),
    shallow
  );

  useEffect(() => {
    async function init() {
      const errored = await fetchTables(setTables);

      if (errored) {
        if (errored === 'BAD SESSION') {
          expireSession();
        } else {
          console.log(errored);
          throw new Error('Some other error occurred!');
        }
      }
    }

    init();
  }, [expiredSession]);

  return (
    <div className="select-none">
      <Heading className="py-2">Cataloging</Heading>
      <Form.Group flex>
        <Input
          onChange={() => {}}
          disabled
          value="INSERT"
          label="Query Type"
          className="select-none"
          fullWidth
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          // defaultValue={val}
          fullWidth
          options={tables}
          searchable
          register={{ validate: validateTableSelection }}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="catalogNumber"
          label="catalogNumber"
          placeholder="LEP123456"
          register={{ validate: validateCatalogNumber }}
          fullWidth
        />
        <Form.Input
          name="otherCatalogNumber"
          label="otherCatalogNumber"
          placeholder="MGCL_12345678"
          register={{ validate: validateOtherCatalogNumber }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="recordNumber"
          label="recordNumber"
          placeholder="LK45"
          fullWidth
        />
        <Form.Input
          name="recordEnteredBy"
          label="recordEnteredBy"
          fullWidth
          className="select-none"
          value={fullName}
          disabled
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="projectNumber"
          label="projectNumber"
          placeholder="AC-18-078 | CLDZ:2262"
          register={{ validate: validateListField }}
          fullWidth
        />
        <Form.Input
          name="otherIdentifier"
          label="otherIdentifier"
          placeholder="BOM00001"
          fullWidth
        />
      </Form.Group>
    </div>
  );
}

function Classification() {
  return (
    <div className="select-none">
      <Heading className="py-2">Classifications</Heading>

      <Form.Group flex>
        <Form.Input
          name="order_"
          label="order_"
          placeholder="Lepidoptera"
          register={{ validate: validateProperNoun }}
          fullWidth
        />
        <Form.Input
          name="superfamily"
          label="superfamily"
          placeholder="Papilionoidea"
          register={{ validate: validateSuperFamily }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="family"
          label="family"
          placeholder="Pieridae"
          register={{ validate: validateFamily }}
          fullWidth
        />
        <Form.Input
          name="subfamily"
          label="subfamily"
          placeholder="Pierinae"
          register={{ validate: validateSubFamily }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="tribe"
          label="tribe"
          placeholder="Tribe"
          register={{ validate: validateTribe }}
          fullWidth
        />
        <Form.Input
          name="genus"
          label="genus"
          placeholder="Colias"
          register={{ validate: validateProperNoun }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="subgenus"
          label="subgenus"
          placeholder="Aucolias"
          register={{ validate: validateProperNoun }}
          fullWidth
        />
        <Form.Input
          name="specificEpithet"
          label="specificEpithet"
          placeholder="eurytheme"
          register={{ validate: validateLowerCase }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="infraspecificEpithet"
          label="infraspecificEpithet"
          placeholder="pallida"
          register={{ validate: validateLowerCase }} // FIXME: ?? pronoun or lowercase
          fullWidth
        />
      </Form.Group>
    </div>
  );
}

function RecordLevelInformation() {
  const today = new Date();

  return (
    <div className="select-none">
      {/* PART 1 */}
      <div>
        <Heading className="py-2">Record Information</Heading>

        <Form.Group flex>
          <Form.Select
            label="identificationQualifier"
            name="identificationQualifier"
            placeholder="aff"
            register={{ validate: validateIndentificationQualifier }}
            options={identificationQualifierControl}
            searchable
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="recordedBy"
            name="recordedBy"
            placeholder="Frodo Baggins"
            register={{ validate: validateName }}
            fullWidth
          />
          <Form.Input
            label="identifiedBy"
            name="identifiedBy"
            placeholder="Aragorn Telcontar"
            register={{ validate: validateName }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Area
            label="otherCollectors"
            name="otherCollectors"
            placeholder="Samwise Gamgee | Meriadoc Brandybuck | Peregrin Took"
            register={{ validate: validateNameListField }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Datepicker
            label="dateIdentified"
            name="dateIdentified"
            placeholder={today.toISOString().split('T')[0]}
            fullWidth
          />

          <Datepicker
            name="dateEntered"
            label="dateEntered"
            initialDate={today.toISOString().split('T')[0]}
            disabled
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            name="verbatimDate"
            label="verbatimDate"
            fullWidth
            placeholder={today.toDateString()}
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            name="collectedYear"
            label="collectedYear"
            register={{ validate: validateCollectedYear }}
            placeholder={today.getFullYear().toString()}
          />
          <Form.Select
            name="collectedMonth"
            label="collectedMonth"
            register={{ validate: validateCollectedMonth }}
            options={dateMonths}
            searchable
            fullWidth
            placeholder={today.getMonth().toString()}
          />
          <Form.Select
            name="collectedDay"
            label="collectedDay"
            register={{ validate: validateCollectedDay }}
            options={dateDays}
            searchable
            fullWidth
            placeholder={today.getDay().toString()}
          />
        </Form.Group>
      </div>

      {/* PART 2 */}
      <div>
        <Heading className="py-2">Record Information</Heading>

        <Form.Group flex>
          <Form.Select
            label="sex"
            name="sex"
            placeholder="F"
            register={{ validate: validateSex }}
            options={sexControl}
            fullWidth
          />
          <Form.Select
            label="lifeStage"
            name="lifeStage"
            placeholder="larva"
            register={{ validate: validateLifeStage }}
            options={lifeStageControl}
            searchable
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="habitat"
            name="habitat"
            fullWidth
            placeholder="Fangorn Forest"
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            label="samplingProtocol"
            name="samplingProtocol"
            placeholder="LightUV|LightLED"
            register={{ validate: validateSamplingProtocol }}
            options={samplingProtocolControl}
            searchable
            multiple
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            label="preparations"
            name="preparations"
            placeholder="Molecular"
            register={{ validate: validatePreparations }}
            options={preparationsControl}
            searchable
            multiple
            fullWidth
          />
          <Form.Select
            label="disposition"
            name="disposition"
            placeholder="Molecular Present"
            register={{ validate: validateDisposition }}
            options={dispositionControl}
            searchable
            multiple
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            label="withholdData"
            name="withholdData"
            placeholder="N"
            register={{ validate: validateBooleanField }}
            options={BooleanField}
            className="min-w-24"
          />
          <Form.Select
            label="reared"
            name="reared"
            placeholder="Y"
            register={{ validate: validateBooleanField }}
            options={BooleanField}
            className="min-w-24"
          />
          <Form.Select
            label="tubeSize"
            name="tubeSize"
            placeholder="microcentrifuge"
            register={{ validate: validateTubeSize }}
            options={tubeSizeControl}
            searchable
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="freezer"
            name="freezer"
            placeholder="Kawahara30"
            register={{ validate: validateFreezer }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="rack"
            name="rack"
            placeholder="BB"
            register={{ validate: validateRack }}
            fullWidth
          />
          <Form.Input
            label="box"
            name="box"
            placeholder="25"
            register={{ validate: validateBox }}
            fullWidth
          />
        </Form.Group>
      </div>
    </div>
  );
}

function TextResponses() {
  return (
    <div className="select-none">
      <Heading className="py-2">Text Entries</Heading>

      <Form.Group flex>
        <Form.Area
          label="occurrenceRemarks"
          name="occurrenceRemarks"
          placeholder="Comments or notes about occurrence"
          fullWidth
          rows={4}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Area
          label="molecularOccurrenceRemarks"
          name="molecularOccurrenceRemarks"
          placeholder="Molecular comments or notes about occurrence"
          fullWidth
          rows={4}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Area
          label="associatedSequences"
          name="associatedSequences"
          placeholder="Walker, Faith M., Jeffrey T. Foster, Kevin P. Drees, Carol L. Chambers. 2014. Spotted bat (Euderma maculatum) microsatellite discovery using illumina sequencing. Conservation Genetics Resources."
          fullWidth
          rows={4}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Area
          label="associatedReferences"
          name="associatedReferences"
          placeholder="http://www.ncbi.nlm.nih.gov/nuccore/U34853.1 | http://www.ncbi.nlm.nih.gov/nuccore/GU328060 | http://www.ncbi.nlm.nih.gov/nuccore/AF326093"
          fullWidth
          rows={4}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Area
          label="fieldNotes"
          name="fieldNotes"
          placeholder="Enter notes from the field here"
          fullWidth
        />
      </Form.Group>
    </div>
  );
}

function Locality() {
  return (
    <div className="select-none">
      <div>
        <Heading className="py-2">Locality</Heading>

        <Form.Group flex>
          <Form.Select
            label="country"
            name="country"
            placeholder="United States"
            register={{ validate: validateCountry }}
            options={countryControl}
            searchable
            fullWidth
          />
          <Form.Input
            label="stateProvince"
            name="stateProvince"
            placeholder="Colorado"
            register={{ validate: validateProperNoun }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Area
            label="locality"
            name="locality"
            placeholder="Bariloche, 25 km NNE via Ruta Nacional 40 (=Ruta 237)"
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="county"
            name="county"
            placeholder="Osgiliath"
            register={{ validate: validateProperNoun }}
            fullWidth
          />
          <Form.Input
            label="municipality"
            name="municipality"
            placeholder="Gondor"
            register={{ validate: validateProperNoun }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="decimalLatitude"
            name="decimalLatitude"
            placeholder="23.13698"
            register={{ validate: validateLatitude }}
            fullWidth
          />
          <Form.Input
            label="decimalLongitude"
            name="decimalLongitude"
            placeholder="-178.63840"
            register={{ validate: validateLongitude }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            label="geodeticDatum"
            name="geodeticDatum"
            register={{ validate: validateGeodeticDatum }}
            options={geodeticDatumControl}
            searchable
            fullWidth
          />
        </Form.Group>
      </div>

      <div>
        <Heading className="py-2">Locality</Heading>

        <Form.Group flex>
          <Form.Input
            label="elevationInMeters"
            name="elevationInMeters"
            placeholder="25m"
            register={{ validate: validateElevation }}
            fullWidth
          />

          <Form.Input
            label="coordinateUncertainty"
            name="coordinateUncertainty"
            placeholder="1mi"
            register={{ validate: validateElevation }} // TODO: own validator?
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="verbatimLatitude"
            name="verbatimLatitude"
            register={{ validate: validateVerbatimLatitude }}
            placeholder="-71.31979"
          />

          <Form.Input
            label="verbatimLongitude"
            name="verbatimLongitude"
            register={{ validate: validateVerbatimLongitude }}
            placeholder="-59.01199"
          />

          <Form.Input
            label="georeferencedBy"
            name="georeferencedBy"
            placeholder="Gimli Dúrin | Tom Bombadil | Arwen Evenstar"
            register={{ validate: validateNameListField }}
            fullWidth
          />
        </Form.Group>
      </div>
    </div>
  );
}

function LoanInfo() {
  const { getValues, watch, setValue } = useFormContext();

  const today = new Date();

  watch('isLoaned');

  const { isLoaned } = getValues();

  function toggle(newVal?: any) {
    console.log(newVal);
    if (isLoaned === 'Y') {
      setValue('isLoaned', 'N');
    } else if (newVal === undefined) {
      setValue('isLoaned', 'N');
    } else {
      setValue('isLoaned', 'Y');
    }
  }

  return (
    <div className="select-none">
      <Heading className="py-2">Loan Information</Heading>

      <Form.Group flex>
        <Form.Select
          label="isLoaned"
          name="isLoaned"
          defaultValue="N"
          value={isLoaned}
          updateControlled={toggle}
          register={{ validate: validateBooleanField }}
          options={BooleanField}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          label="loanInstitution"
          name="loanInstitution"
          placeholder="McGuire Center for Lepidoptera"
          register={{ validate: validateProperNoun }}
          fullWidth
          disabled={!isLoaned || isLoaned === 'N'}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          label="loaneeName"
          name="loaneeName"
          placeholder="Grey, Gandalf"
          register={{ validate: validateProperNoun }} // FIXME
          fullWidth
          disabled={!isLoaned || isLoaned === 'N'}
        />
      </Form.Group>

      <Form.Group flex>
        <Datepicker
          name="loanDate"
          label="loanDate"
          placeholder={today.toISOString().split('T')[0]}
          fullWidth
          disabled={!isLoaned || isLoaned === 'N'}
        />
        <Datepicker
          name="loanReturnDate"
          label="loanReturnDate"
          placeholder={today.toISOString().split('T')[0]}
          fullWidth
          disabled={!isLoaned || isLoaned === 'N'}
        />
      </Form.Group>
    </div>
  );
}

export default function InsertNewRecord({
  onSubmit,
}: {
  onSubmit(values: FormSubmitValues): void;
}) {
  return (
    <Form id="new-record-form" onSubmit={onSubmit} mode="onChange">
      <Heading className="py-2">Insert New Record</Heading>
      <Text className="pb-2" size="xs">
        Plese enter all of the applicable values for the new record in the form
        below. Once you are done, you may hit the Checkmark to run the insert
        query for the new record.
      </Text>
      <Cataloging />
      <Classification />
      <RecordLevelInformation />
      <TextResponses />
      <Locality />
      <LoanInfo />
    </Form>
  );
}
