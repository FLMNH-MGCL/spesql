import clsx from 'clsx';
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
  validateFreezer,
  validateGeodeticDatum,
  validateIndentificationQualifier,
  validateLatitude,
  validateLifeStage,
  validateLongitude,
  validateLowerCase,
  validateOtherCatalogNumber,
  validatePreparations,
  validateProperNoun,
  validateRack,
  validateSamplingProtocol,
  validateSex,
  validateTableSelection,
  validateTubeSize,
  validateName,
  validateNameListField,
} from '../../functions/validation';
import Datepicker from '../ui/Datepicker';
import Form, { Values } from '../ui/Form';
import Heading from '../ui/Heading';
import { SelectOption } from '../ui/Select';
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
// import { Checkmark } from 'react-checkmark';
import Text from '../ui/Text';
import { useNotify } from '../utils/context';
import Checkmark from '../ui/Checkmark';
import { LoggingError } from '../../../stores/table';

type FormPart = {
  page: number;
};

function Cataloging({ page }: FormPart) {
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
    <div className={clsx(page !== 0 && 'hidden')}>
      <Heading centered className="py-2">
        Cataloging
      </Heading>
      <Form.Group flex>
        <Form.Input
          name="queryType"
          disabled
          value="INSERT"
          label="Query Type"
          fullWidth
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          fullWidth
          options={tables}
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
          value={fullName}
          disabled
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input name="projectNumber" label="projectNumber" fullWidth />
        <Form.Input name="otherIdentifier" label="otherIdentifier" fullWidth />
      </Form.Group>
    </div>
  );
}

function Classification({ page }: FormPart) {
  return (
    <div className={clsx(page !== 1 && 'hidden')}>
      <Heading centered className="py-2">
        Classifications
      </Heading>

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
          register={{ validate: validateProperNoun }}
          fullWidth
        />
        <Form.Input
          name="family"
          label="family"
          placeholder="Pieridae"
          register={{ validate: validateProperNoun }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="subfamily"
          label="subfamily"
          placeholder="Pierinae"
          register={{ validate: validateProperNoun }}
          fullWidth
        />
        <Form.Input
          name="tribe"
          label="tribe"
          placeholder="Tribe"
          register={{ validate: validateProperNoun }}
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

function RecordLevelInformation({ page }: FormPart) {
  const today = new Date();

  return (
    <React.Fragment>
      {/* PART 1 */}
      <div className={clsx(page !== 2 && 'hidden')}>
        <Heading centered className="py-2">
          Record Information
        </Heading>

        <Form.Group flex>
          <Form.Select
            label="identificationQualifier"
            name="identificationQualifier"
            placeholder="aff"
            register={{ validate: validateIndentificationQualifier }}
            options={identificationQualifierControl}
            fullWidth
          />
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
            placeholder="Gamgee, Samwise | Meriadoc Brandybuck | Peregrin Took"
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
            fullWidth
            placeholder={today.getMonth().toString()}
          />
          <Form.Select
            name="collectedDay"
            label="collectedDay"
            register={{ validate: validateCollectedDay }}
            options={dateDays}
            fullWidth
            placeholder={today.getDay().toString()}
          />
        </Form.Group>
      </div>

      {/* PART 2 */}
      <div className={clsx(page !== 3 && 'hidden')}>
        <Heading centered className="py-2">
          Record Information
        </Heading>

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
            fullWidth
          />
          <Form.Input
            label="habitat"
            name="habitat"
            fullWidth
            placeholder="Sannava"
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            label="samplingProtocol"
            name="samplingProtocol"
            placeholder="LightUV|LightLED"
            register={{ validate: validateSamplingProtocol }}
            options={samplingProtocolControl}
            multiple
            fullWidth
          />
          <Form.Select
            label="preparations"
            name="preparations"
            placeholder="Molecular"
            register={{ validate: validatePreparations }}
            options={preparationsControl}
            multiple
            fullWidth
          />
          <Form.Select
            label="disposition"
            name="disposition"
            placeholder="Molecular Present"
            register={{ validate: validateDisposition }}
            options={dispositionControl}
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
          <Form.Input
            label="rack"
            name="rack"
            placeholder="BB"
            register={{ validate: validateRack }}
          />
          <Form.Input
            label="box"
            name="box"
            placeholder="25"
            register={{ validate: validateBox }}
          />
        </Form.Group>
      </div>
    </React.Fragment>
  );
}

function TextResponses({ page }: FormPart) {
  return (
    <div className={clsx(page !== 4 && 'hidden')}>
      <Heading centered className="py-2">
        Text Entries
      </Heading>

      <Form.Group flex>
        <Form.Area
          label="occurrenceRemarks"
          name="occurrenceRemarks"
          placeholder="Comments or notes about occurrence"
          fullWidth
          rows={4}
        />

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

function Locality({ page }: FormPart) {
  return (
    <React.Fragment>
      <div className={clsx(page !== 5 && 'hidden')}>
        <Heading centered className="py-2">
          Locality
        </Heading>

        <Form.Group flex>
          <Form.Select
            label="country"
            name="country"
            placeholder="United States"
            register={{ validate: validateCountry }}
            options={countryControl}
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
            placeholder=""
            register={{ validate: validateProperNoun }}
            fullWidth
          />
          <Form.Input
            label="municipality"
            name="municipality"
            placeholder=""
            register={{ validate: validateProperNoun }}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Input
            label="decimalLatitude"
            name="decimalLatitude"
            placeholder=""
            register={{ validate: validateLatitude }}
            fullWidth
          />
          <Form.Input
            label="decimalLongitude"
            name="decimalLongitude"
            placeholder=""
            register={{ validate: validateLongitude }}
            fullWidth
          />
          <Form.Select
            label="geodeticDatum"
            name="geodeticDatum"
            register={{ validate: validateGeodeticDatum }}
            options={geodeticDatumControl}
            fullWidth
          />
        </Form.Group>
      </div>

      {/* PAGE 2 */}
      <div className={clsx(page !== 6 && 'hidden')}>
        <Heading centered className="py-2">
          Locality
        </Heading>

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
            placeholder=""
          />

          <Form.Input
            label="verbatimLongitude"
            name="verbatimLongitude"
            placeholder=""
          />

          <Form.Input
            label="georeferencedBy"
            name="georeferencedBy"
            placeholder="Dúrin, Gimli | Tom Bombadil | Arwen Evenstar"
            register={{ validate: validateNameListField }}
            fullWidth
          />
        </Form.Group>
      </div>
    </React.Fragment>
  );
}

function LoanInfo({ page }: FormPart) {
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
    <div className={clsx(page !== 7 && 'hidden')}>
      <Heading centered className="py-2">
        Loan Information
      </Heading>

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
        <Form.Input
          label="loanInstitution"
          name="loanInstitution"
          placeholder="TODO"
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

function ConfirmationPage({ page }: FormPart) {
  return (
    <div className={clsx(page !== 8 && 'hidden')}>
      <div className="pt-1 pb-3">
        <Heading centered>All Done!</Heading>
        <Text centered>
          If any errors occur please check the logs and correct the form
        </Text>
      </div>
      <div className="py-12">
        {/* this library has an invalid prop type >:( so an error is in the console */}
        {/* @ts-ignore */}
        <Checkmark />
      </div>
    </div>
  );
}

type Props = {
  page: number;
  onSubmit(values: Values): void;
};

function FormErrorHandler() {
  const { errors } = useFormContext();

  const { notify } = useNotify();

  const updateSingleInsertLog = useStore(
    (state) => state.updateSingleInsertLog
  );

  useEffect(() => {
    if (!errors || errors === {} || !Object.keys(errors).length) {
      return;
    }

    notify(
      {
        title: 'Validation Errors',
        message:
          'There were some errors present in the form, please check the corresponding error log and correct the invalid entries',
        level: 'error',
      },
      'error'
    );

    // console.log(errors);
    let insertErrors = Object.keys(errors).map((field) => {
      const { message } = errors[field];

      return {
        field,
        message,
      } as LoggingError;
    });

    updateSingleInsertLog(insertErrors);
  }, [errors]);

  return null;
}

export default function SingleInsertForm({ page, onSubmit }: Props) {
  return (
    <Form
      id="single-insert"
      mode="onChange"
      onSubmit={onSubmit}
      className="pb-2"
    >
      <FormErrorHandler />
      <Cataloging page={page} />
      <Classification page={page} />
      <RecordLevelInformation page={page} />
      <TextResponses page={page} />
      <Locality page={page} />
      <LoanInfo page={page} />
      <ConfirmationPage page={page} />
    </Form>
  );
}
