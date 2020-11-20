# Database Field Guide

Fields denoted with (\*) are required and may not be left blank. Those not denoted with this may be assumed to allow empty values, disregarding the specified formatting for these cases where the data for the field is not present.

Fields that do not have any generalized, restricted formatting will have relaxed insertion requirements. You may see additional information about what the field is by referencing the [Darwin Core](https://dwc.tdwg.org/terms/) guide.

## Available Specimen Fields:

(click to view formatting information)

- [catalogNumber](###catalogNumber)
- [otherCatalogNumber](###otherCatalogNumber)
- [recordNumber](###recordNumber)
- [order\_](###order_)
- [superfamily](###superfamily)
- [family](###family)
- [subfamily](###subfamily)
- [tribe](###tribe)
- [genus](###genus)
- [subgenus](###subgenus)
- [specificEpithet](###specificEpithet)
- [infraspecificEpithet](###infraspecificEpithet)
- [identificationQualifier](###identificationQualifier)
- [recordedBy](###recordedBy)
- [otherCollectors](###otherCollectors)
- [identifiedBy](###identifiedBy)
- [dateIdentified](###dateIdentified)
- [verbatimDate](###verbatimDate)
- [collectedYear](###collectedYear)
- [collectedMonth](###collectedMonth)
- [collectedDay](###collectedDay)
- [dateEntered](###dateEntered)
- [sex](###sex)
- [lifeStage](###lifeStage)
- [habitat](###habitat)
- [occurrenceRemarks](###occurrenceRemarks)
- [molecularOccurrenceRemarks](###molecularOccurrenceRemarks)
- [samplingProtocol](###samplingProtocol)
- [country](###country)
- [stateProvince](###stateProvince)
- [county](###county)
- [municipality](###municipality)
- [locality](###locality)
- [elevationInMeters](###elevationInMeters)
- [decimalLatitude](###decimalLatitude)
- [decimalLongitude](###decimalLongitude)
- [geodeticDatum](###geodeticDatum)
- [coordinateUncertainty](###coordinateUncertainty)
- [verbatimLatitude](###verbatimLatitude)
- [verbatimLongitude](###verbatimLongitude)
- [georeferencedBy](###georeferencedBy)
- [disposition](###disposition)
- [isLoaned](###isLoaned)
- [loanInstitution](###loanInstitution)
- [loaneeName](###loaneeName)
- [loanDate](###loanDate)
- [loanReturnDate](###loanReturnDate)
- [preparations](###preparations)
- [freezer](###freezer)
- [rack](###rack)
- [box](###box)
- [tubeSize](###tubeSize)
- [associatedSequences](###associatedSequences)
- [associatedReferences](###associatedReferences)
- [withholdData](###withholdData)
- [reared](###reared)
- [recordEnteredBy](###recordEnteredBy)
- [modifiedInfo](###modifiedInfo)
- [fieldNotes](###fieldNotes)

### catalogNumber \* <section id='##catalogNumber'/>

This is the LEP number. The general format is:

```
  LEP followed by 5-8 digits.
  No punctuation allowed.
  Case sensitive.
  Empty values NOT accepted (i.e. must be included)
```

##### Passing Examples

`LEP12345`
`LEP123456`
`LEP1234567`
`LEP12345678`

##### Failing Examples

`LEP1234`
`LEP-123456`
`lep1234567`
<br/><br/>

### otherCatalogNumber <section id='##otherCatalogNumber'/> <section id='##'/>

This is the MGCL number. The general format is:

```
  MGCL_ followed by 6-8 digits.
  No punctuation allowed.
  Case sensitive.
```

##### Passing Examples

`MGCL_123456`
`MGCL_1234567`
`MGCL_12345678`

##### Failing Examples

`MGCL_12345`
`MGCL_123456789`
`mgcl_12345678`
`MGCL1234678`
`MGCL-1234678`
<br/><br/>

### recordNumber <section id='##recordNumber'/>

This is a Collector's record number. There is no specified, mandatory formatting for this field.

##### Passing Examples

`LK45`

### order\_ <section id='##order\_'/>

Linnaean Order. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Order` `Order Name`

##### Failing Examples

`order` `order name` `order-name` `OrDeR` `Order?`
<br/><br/>

### superfamily <section id='##superfamily'/>

Linnaean Superfamily. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Superfamily` `Super Family`

##### Failing Examples

`superfamily` `super family` `super-family` `SuPerFamilY` `Superfamily?`
<br/><br/>

### family <section id='##family'/>

Linnaean Family. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Family` `Other Family`

##### Failing Examples

`family` `other family` `other-family` `FamilY` `Family?`
<br/><br/>

### subfamily <section id='##subfamily'/>

Linnaean Subfamily. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Subfamily` `Sub Family`

##### Failing Examples

`subfamily` `sub family` `sub-family` `subFamilY` `Subfamily?`
<br/><br/>

### tribe <section id='##tribe'/>

Linnaean Tribe. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Tribe` `Tribe Name`

##### Failing Examples

`tribe` `tribe name` `tribe-name` `tRibE` `Tribe?`
<br/><br/>

### genus <section id='##genus'/>

Linnaean Genus. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Genus` `Genus Name`

##### Failing Examples

`genus` `genus name` `genus-name` `gEnuS` `Genus?`
<br/><br/>

### subgenus <section id='##subgenus'/>

Linnaean Subgenus. The formatting is:

```
  Capitalized first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`Subgenus` `Subgenus Name`

##### Failing Examples

`subgenus` `subgenus name` `subgenus-name` `SubgEnuS` `subGenus?`
<br/><br/>

### specificEpithet <section id='##specificEpithet'/>

Linnaean Species. The formatting is:

```
  Lowercase first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`species` `species name`

##### Failing Examples

`Species` `Species Name` `Species-name` `SpeCiEs` `Species?`
<br/><br/>

### infraspecificEpithet <section id='##infraspecificEpithet'/>

Linnaean Subspecies. The formatting is:

```
  Lowercase first letter for each separate word.
  No random capitalization (i.e. no capitalizations in the middle of a word).
  No punctuation.
```

##### Passing Examples

`subspecies` `subspecies name`

##### Failing Examples

`Subspecies` `Subspecies Name` `Subspecies-name` `SubSpeCiEs` `subspecies?`
<br/><br/>

### identificationQualifier <section id='##identificationQualifier'/>

Identification qualifier for the specimen. Case sensitive, and must match one (only one) of the control values exactly:

`aff`
`cf`
`near`
`sensu stricto`
`sensu lato`

<br/><br/>

### recordedBy <section id='##recordedBy'/>

The primary collector's name, should only be one name pair. The general format is:

```
  Last,First
  First Last
```

Either is accepted, however please make note of how the order changes when using a comma. The resulting value stored in the database will be of the format `Last,First`. Please do not enter a value if this is unknown, instead of iterations of `Unknown Unknown`

##### Passing Examples

`Leopold,Aaron` `Aaron Leopold` `Leopold,Unknown` `Unknown Leopold`

##### Failing Examples

`Leopold,aaron` `aaron leopold` `Leopold` `Aaron`

<br/><br/>

### otherCollectors <section id='##otherCollectors'/>

The names of the collectors other than the primary collector, may be multiple names. The general format is:

```
  Last,First
  Last1,First1 | Last2,First2
  Last1,First1|Last2,First2

  First Last
  First1 Last1 | First2 Last2
  First1 Last1|First2 Last2
```

Please note: I am using numbers to indicate different names, however numbers are not allowed in this field.

The list separator must be the pipe character '|'. Either list format/naming order is accepted, however please make note of how the order changes when using a comma. The resulting value stored in the database will be of the format `Last,First|Last,First|Last,First`

##### Passing Examples

`Leopold,Aaron` `Aaron Leopold` `Leopold,Aaron | Doe,Jane` `Leopold,Aaron|Doe,Jane`

##### Failing Examples

`Leopold` `leopold,aaron` `Leopold,aaron | doe,Jane` `Leopold,Aaron, Doe,Jane`
<br/><br/>

### identifiedBy <section id='##identifiedBy'/>

The name of who identified specimen, should only be one name pair. The general format is:

```
  Last,First
  First Last
```

Either is accepted, however please make note of how the order changes when using a comma. The resulting value stored in the database will be of the format `Last,First`. Please do not enter a value if this is unknown, instead of iterations of `Unknown Unknown`

##### Passing Examples

`Leopold,Aaron` `Aaron Leopold` `Leopold,Unknown` `Unknown Leopold`

##### Failing Examples

`Leopold,aaron` `aaron leopold` `Leopold` `Aaron`
<br/><br/>

### dateIdentified <section id='##dateIdentified'/>

The date in which the specimen was identified. This follows the general date format:

```
  YYYY-MM-DD
  YYYY-MM
  YYYY
```

May not be future dates, or dates that preceed reasonable floor thresholds (e.g. less than 999)

<br/><br/>

### verbatimDate <section id='##verbatimDate'/>

The verbatim date as it is written on the label (if present). This has no structured format as it is a record of whatever is hand written

##### General Example

`Jan-Jun 2019`

<br/><br/>

### collectedYear <section id='##collectedYear'/>

Year of collection. This follows the general date format, only concerning the year. I.e.: `YYYY`

May not be future dates, or dates that preceed reasonable floor thresholds (e.g. less than 999)

<br/><br/>

### collectedMonth <section id='##collectedMonth'/>

Month (as a number, 1-12) of collection. This follows the general date format, only concerning the month. I.e.: `MM`

<br/><br/>

### collectedDay <section id='##collectedDay'/>

Day (as a number, 1-31) of collection. This follows the general date format, only concerning the day. I.e.: `DD`

<br/><br/>

### dateEntered <section id='##dateEntered'/>

The date in which the specimen was entered in the system. This follows the general date format:

```
  YYYY-MM-DD
```

If left empty, an automated time stamp will be assigned on the insert query.

May not be future dates, or dates that preceed reasonable floor thresholds (e.g. less than 999).
<br/><br/>

### sex <section id='##sex'/>

The sex of the specimen. Must match the <b>_first letter_</b> of one of the control values:

`Male` `Female` `Gynandromorph`

##### Passing Examples

`M` `F` `G`

##### Failing Examples

`Male` `Female` `Gynandromorph`

<br/><br/>

### lifeStage <section id='##lifeStage'/>

The life stage the specimen is in. Must match one (only one) of the control values exactly (case sensitive):

`egg` `larva` `pupa` `adult`

<br/><br/>

### habitat <section id='##habitat'/>

There are no generalized formatting schemas for this field

TODO: get examples

<br/><br/>

### occurrenceRemarks <section id='##occurrenceRemarks'/>

Remarks from the collector. Not generalized formatting schemas for this field

<br/><br/>

### molecularOccurrenceRemarks <section id='##molecularOccurrenceRemarks'/>

Remarks from the collector. Not generalized formatting schemas for this field

<br/><br/>

### samplingProtocol <section id='##samplingProtocol'/>

The protocol in which the specimen was sampled. May be a list, where each item matches a control value exactly (case sensitive):

`HandDirect` `NetAerial` `Light` `LightUV` `LightMV` `LightMH` `LightLED` `LightOther` `Bait` `TrapMalaise` `Trap`

The format of the list follows previous field formatting, in that it must be delimited using the pipe '|' character.

##### Passing Examples

`NetAerial` `LightUV|LightLED`

##### Failing Examples

`UV Light` `LightUV,LightLED`

`example`
<br/><br/>

### country <section id='##country'/>

Country of the collection. Must be in the list of accepted countries, matching exactly (case sensitive).

You may find the list here: `https://github.com/FLMNH-MGCL/spesql/blob/typescript-rewrite/src/renderer/assets/countries.ts`. This list is a TypeScript array of Country objects, containing a `name` and `code` field like so:

```typescript
// generalized structure of a country object
type Country = {
  name: string;
  code: string;
};

// example country object
const exampleCountry = {
  name: 'Afghanistan',
  code: 'AF',
};
```

Please ensure the value matches the `name` field, <b>not</b> the `code` field

<br/><br/>

### stateProvince <section id='##stateProvince'/>

The State or Province of the collected specimen. Follows traditional proper noun formatting:

```
  Capitalize first letter of each word.
  No random capitalization.
```

<br/><br/>

### county <section id='##county'/>

The County of the collected specimen. Follows traditional proper noun formatting:

```
  Capitalize first letter of each word.
  No random capitalization.
```

<br/><br/>

### municipality <section id='##municipality'/>

The Municipality of the collected specimen. Follows traditional proper noun formatting:

```
  Capitalize first letter of each word.
  No random capitalization.
```

<br/><br/>

### locality <section id='##locality'/>

The Locality data of the collected specimen. No generalized formatting in place.

<br/><br/>

### elevationInMeters <section id='##elevationInMeters'/>

The elevation at which the specimen was located. Measurements will be converted to meters, however please ensure the unit is either:

`m` for meters, `mi` for miles, `ft` for feet

##### Passing Examples

`50m` `1mi` `100ft`

##### Failing Examples

`50 meters` `1 mile` `1 foot` `100`

<br/><br/>

### decimalLatitude <section id='##decimalLatitude'/>

The latitude the specimen was located at. The value may be a floating point number (decimal) between -90 and 90.

```
-90 <= latitude <= 90
```

<br/><br/>

### decimalLongitude <section id='##decimalLongitude'/>

The longitude the specimen was located at. The value may be a floating point number (decimal) between -180 and 180.

```
-180 <= longitude <= 180
```

<br/><br/>

### geodeticDatum <section id='##geodeticDatum'/>

The coordinate system used. Must match one (only one) of the control values (case sensitive):

`EPSG:4326` `WGS84` `NAD27` `Campo Inchauspe` `European 1950` `Clarke 1866` `Unknown`

<br/><br/>

### coordinateUncertainty <section id='##coordinateUncertainty'/>

The value indicating the uncertainty of the recorded coordinates at which the specimen was located. Measurements will be converted to meters, however please ensure the unit is either:

`m` for meters, `mi` for miles, `ft` for feet

##### Passing Examples

`50m` `1mi` `100ft`

##### Failing Examples

`50 meters` `1 mile` `1 foot` `100`

<br/><br/>

### verbatimLatitude <section id='##verbatimLatitude'/>

The latitude as written on the label (if present). No generalized formatting, as this is just a record of what is hand written

<br/><br/>

### verbatimLongitude <section id='##verbatimLongitude'/>

The longitude as written on the label (if present). No generalized formatting, as this is just a record of what is hand written

<br/><br/>

### georeferencedBy <section id='##georeferencedBy'/>

TODO:

##### Passing Examples

##### Failing Examples

<br/><br/>

### disposition <section id='##disposition'/>

The disposition of the specimen as it is currently in the collection. Must match one (only one) of the control values (case sensitive):

`Present` `Missing` `Sample Used Up` `On Loan`

<br/><br/>

### isLoaned <section id='##isLoaned'/>

Indication of if the specimen is on loan. Must be one of the two accepted values (case sensitive):

`Y` for yes, `N` for no

<br/><br/>

### loanInstitution <section id='##loanInstitution'/>

The name of institution specimen is loaned to. There is no generalized formatting for this field.

If the isLoaned field is indicated as `N` this field is required to be empty.

If the isLoaned field is indicated as `Y` this field is required.

<br/><br/>

### loaneeName <section id='##loaneeName'/>

Name of person responsible with specimen while loaned. This follows the general format:

```
  First Last
  Last,First
```

If the isLoaned field is indicated as `N` this field is required to be empty.

<br/><br/>

### loanDate <section id='##loanDate'/>

Date specimen went on loan

If the isLoaned field is indicated as `N` this field is required to be empty.

If the isLoaned field is indicated as `Y` this field is required.
<br/><br/>

### loanReturnDate <section id='##loanReturnDate'/>

Expected return date for specimen, update to actual when returned.

<br/><br/>

### preparations <section id='##preparations'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### freezer <section id='##freezer'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### rack <section id='##rack'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### box <section id='##box'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### tubeSize <section id='##tubeSize'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### associatedSequences <section id='##associatedSequences'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### associatedReferences <section id='##associatedReferences'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### withholdData <section id='##withholdData'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### reared <section id='##reared'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### recordEnteredBy <section id='##recordEnteredBy'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### modifiedInfo <section id='##modifiedInfo'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>

### fieldNotes <section id='##fieldNotes'/>

##### Passing Examples

##### Failing Examples

`example`
<br/><br/>
