---
id: fieldguide
title: Field Guide
---

## About

This section serves as an aide to be used when attempting to insert new or update existing data. SpeSQL will catch any violation of the rules outlined below, however it is important to familiarize yourself with the structure of the data as to best expedite future workflows.

## Notes

Fields denoted with (\*) are required and may not be left blank. Those not denoted with this may be assumed to allow empty values, disregarding the specified formatting for these cases where the data for the field is not present.

Fields that do not have any generalized, restricted formatting will have relaxed insertion requirements. You may see additional information about what the field is by referencing the [Darwin Core](https://dwc.tdwg.org/terms/) guide.

Note: Some fields are automatically generated/determined, these fields should <b>not</b> be included in the CSV for batch insertions. An example is `recordEnteredBy`, the credentials of the logged in user will be applied for this information.

To see available countries, please refer to the [Countries](#Countries) section at the end of this file.

## Available Specimen Fields

(click to view formatting information)

- [catalogNumber](###catalogNumber)
- [otherCatalogNumber](###otherCatalogNumber)
- [recordNumber](###recordNumber)
- [otherIdentifier](###otherIdentifier)
- [projectNumber](###projectNumber)
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

### otherCatalogNumber <section id='##otherCatalogNumber'/>

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

### otherIdentifier

Any other identifiers assigned to this specimen.

```
25 character limit
alphanumeric
```

### projectNumber

Other numbers/identifiers relating to a specific project that was assigned to this specimen. This may be one or more values and follows the standard, list format:

```
  identifier
  identifier | identifier2
  identifier | identifier2 | identifier3
```

The list separator must be the pipe character '|'.

Additionally, it follows the following format:

```
50 character limit
alphanumeric
```

##### Passing Examples

`AC-18-078`
`AC-18-078 | CLDZ:2262`

##### Failing Examples

`AC-18-078 ; CLDZ:2262`
`AC-18-078, CLDZ:2262`

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

<br/>
<b>Darwin Core:</b> A brief phrase or a standard term ("cf.", "aff.") to express the determiner's doubts about the Identification.

<br/><br/>

### recordedBy <section id='##recordedBy'/>

The primary collector's name, should only be one name pair. The general format is:

```
  First Last
```

##### Passing Examples

`Aaron Leopold` `Leopold,Unknown` `Unknown Leopold`

##### Failing Examples

`Leopold,aaron`
`Leopold,Aaron`
`aaron leopold`
`Aaron`
`Unknown Unknown`

<br/><br/>

### otherCollectors <section id='##otherCollectors'/>

The names of the collectors other than the primary collector, may be multiple names.

This follows the standard, name list format:

```
  First Last
  First Last | First2 Last2
  First Last|First2 Last2
```

Please note: I am using numbers to indicate different names, however numbers are not allowed in this field.
The list separator must be the pipe character '|'.

##### Passing Examples

`Brad Millen | Kristina Yamamoto | Janet Fang`

##### Failing Examples

`Millen,Brad | Yamamoto,Kristina | Fang,Janet`
`Millen,Brad, Yamamoto,Kristina, Fang,Janet`

<br/><br/>

### identifiedBy <section id='##identifiedBy'/>

The name(s) of who identified the specimen, may be multiple names.

<br/>
<b>Darwin Core:</b> A list (concatenated and separated) of names of people, groups, or organizations who assigned the Taxon to the subject.

This follows the standard, name list format:

```
  First Last
  First Last | First2 Last2
  First Last|First2 Last2
```

Please note: I am using numbers to indicate different names, however numbers are not allowed in this field.
The list separator must be the pipe character '|'.

##### Passing Examples

`Brad Millen | Kristina Yamamoto | Janet Fang`

##### Failing Examples

`Millen,Brad | Yamamoto,Kristina | Fang,Janet`
`Millen,Brad, Yamamoto,Kristina, Fang,Janet`

<br/><br/>

### dateIdentified <section id='##dateIdentified'/>

The date in which the specimen was identified.

<br/>
<b>Darwin Core:</b> The date on which the subject was determined as representing the Taxon.

This follows the general date format:

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

<br/>
<b>Darwin Core:</b> The sex of the biological individual(s) represented in the Occurrence.

##### Passing Examples

`M` `F` `G`

##### Failing Examples

`Male` `Female` `Gynandromorph`

<br/><br/>

### lifeStage <section id='##lifeStage'/>

The life stage the specimen is in. Must match one (only one) of the control values exactly (case sensitive):

`egg` `larva` `pupa` `adult`

<br/>
<b>Darwin Core:</b> The age class or life stage of the biological individual(s) at the time the Occurrence was recorded.

<br/><br/>

### habitat <section id='##habitat'/>

<br/>
<b>Darwin Core:</b> A category or description of the habitat in which the Event occurred.

There are no generalized formatting schemas for this field

##### General Examples

`oak savanna` `pre-cordilleran steppe`

<br/><br/>

### occurrenceRemarks <section id='##occurrenceRemarks'/>

Remarks from the collector. Not generalized formatting schemas for this field

<br/>
<b>Darwin Core:</b> Comments or notes about the Occurrence.

<br/><br/>

### molecularOccurrenceRemarks <section id='##molecularOccurrenceRemarks'/>

Remarks from the collector. Not generalized formatting schemas for this field

<br/><br/>

### samplingProtocol <section id='##samplingProtocol'/>

The protocol in which the specimen was sampled. May be a list, where each item matches a control value exactly (case sensitive):

`HandDirect` `NetAerial` `Light` `LightUV` `LightMV` `LightMH` `LightLED` `LightOther` `Bait` `TrapMalaise` `Trap`

The format of the list follows previous field formatting, in that it must be delimited using the pipe '|' character.

<br/>
<b>Darwin Core:</b> The name of, reference to, or description of the method or protocol used during an Event.

##### Passing Examples

`NetAerial` `LightUV|LightLED`

##### Failing Examples

`UV Light` `LightUV,LightLED`

`example`
<br/><br/>

### country <section id='##country'/>

Country of the collection. Must be in the list of accepted countries, matching exactly (case sensitive).

You may find the list here: `https://github.com/FLMNH-MGCL/spesql/blob/typescript-rewrite/src/renderer/assets/countries.ts`, or you may them at this end of this file. This list is a TypeScript array of Country objects, containing a `name` and `code` field like so:

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

<br/>
<b>Darwin Core:</b> The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the Location occurs. Do not use this term for a nearby named place that does not contain the actual location.

Darwin Core Recommendation: Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.

##### General Examples

`Holzminden` `Araçatuba` `Ga-Segonyana`

<br/><br/>

### locality <section id='##locality'/>

The Locality data of the collected specimen. No generalized formatting in place.

<br/>
<b>Darwin Core:</b> The specific description of the place. Less specific geographic information can be provided in other geographic terms. This term may contain information modified from the original to correct perceived errors or standardize the description.

##### General Example

`Bariloche, 25 km NNE via Ruta Nacional 40 (=Ruta 237)`

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

<br/>
<b>Darwin Core:</b> The ellipsoid, geodetic datum, or spatial reference system (SRS) upon which the geographic coordinates given in decimalLatitude and decimalLongitude as based.

<br/><br/>

### coordinateUncertainty <section id='##coordinateUncertainty'/>

The value indicating the uncertainty of the recorded coordinates at which the specimen was located. Measurements will be converted to meters, however please ensure the unit is either:

`m` for meters, `mi` for miles, `ft` for feet

<br/>
<b>Darwin Core:</b> The horizontal distance (in meters) from the given decimalLatitude and decimalLongitude describing the smallest circle containing the whole of the Location. Leave the value empty if the uncertainty is unknown, cannot be estimated, or is not applicable (because there are no coordinates). Zero is not a valid value for this term.

##### Passing Examples

`50m` `1mi` `100ft`

##### Failing Examples

`50 meters` `1 mile` `1 foot` `100` `0m` `0`

<br/><br/>

### verbatimLatitude <section id='##verbatimLatitude'/>

The latitude as written on the label (if present). No generalized formatting, as this is just a record of what is hand written

<br/><br/>

### verbatimLongitude <section id='##verbatimLongitude'/>

The longitude as written on the label (if present). No generalized formatting, as this is just a record of what is hand written

<br/><br/>

### georeferencedBy <section id='##georeferencedBy'/>

<br/>
<b>Darwin Core:</b> A list (concatenated and separated) of names of people, groups, or organizations who determined the georeference (spatial representation) for the Location.

This follows the standard, name list format:

```
  First Last
  First Last | First2 Last2
  First Last|First2 Last2
```

##### Passing Examples

`Brad Millen | Kristina Yamamoto | Janet Fang`

##### Failing Examples

`Millen,Brad | Yamamoto,Kristina | Fang,Janet`
`Millen,Brad, Yamamoto,Kristina, Fang,Janet`

<br/><br/>

### disposition <section id='##disposition'/>

The disposition (current state) of the specimen as it is currently in the collection. May be a list, where each item matches a control value exactly (case sensitive):

`Voucher Present`
`Molecular Present`
`Pinned Present`
`Larval Present`
`GRR Present`

`Voucher Missing`
`Molecular Missing`
`Pinned Missing`
`Larval Missing`
`GRR Missing`

`Voucher Used Up`
`Molecular Used Up`
`GRR Used Up`

`Voucher On Loan`
`Molecular On Loan`
`Pinned On Loan`
`Larval On Loan`
`GRR On Loan`

`Voucher Absent`

The format of the list follows previous field formatting, in that it must be delimited using the pipe '|' character.

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

This follows the general date format:

```
  YYYY-MM-DD
  YYYY-MM
  YYYY
```

May not preceed reasonable floor thresholds (e.g. less than 1990)

<br/><br/>

### preparations <section id='##preparations'/>

The preparations of the specimen. May be a list, where each item matches a control value exactly (case sensitive):

`Wing Voucher` `Molecular Collection` `Pinned Collection` `Larval Collection` `Genetic Collection`

The format of the list follows previous field formatting, in that it must be delimited using the pipe '|' character.

<br/>
<b>Darwin Core:</b> A preparation or preservation method for a specimen.

##### Passing Examples

`Wing Voucher`
`Wing Voucher | Molecular Collection`
`Wing Voucher|Molecular Collection`

##### Failing Examples

`wing voucher`
`Wing Voucher|`
`Wing Voucher, Molecular Collection`
`Wing Voucher,Molecular Collection`

<br/><br/>

### freezer <section id='##freezer'/>

The freezer the specimen is stored in (if applicable). The general format is as follows:

```
  'Kawahara' followed by two digits:
  Kawahara##

  OR

  GRR
```

##### Passing Examples

`Kawahara05` `Kawahara11` `GRR`

##### Failing Examples

`kawahara 5` `karahara30` `Kawahara119` `grr` `Grr`

<br/><br/>

### rack <section id='##rack'/>

The rack on/in which the specimen is stored. The general format is:

```
  1-3 characters long.
  No punctuation.
  No numbers, only characters
```

Numbers in a rack field indicate a box value, and should be parsed into the appropriate field (box)

##### Passing Examples

`B` `BB` `AA`

##### Failing Examples

`B32` `AA2`

<br/><br/>

### box <section id='##box'/>

Box number of specimen. The general format is:

```
  Integer value between 1-99.
  1 <= box <= 99
```

<br/><br/>

### tubeSize <section id='##tubeSize'/>

The size of the tube/container/other used. It must match one (only one) of the control values:

`papered` `50falcon` `15falcon` `microcentrifuge`

<br/><br/>

### associatedSequences <section id='##associatedSequences'/>

A list of identifiers (publication, bibliographic reference, global unique identifier, URI) of literature associated with the Occurrence.

Note: This field is too complex to validate programmatically, so please refer to the example below to see the manner in which you should structure the list.

##### General Example

`http://www.sciencemag.org/cgi/content/abstract/322/5899/261, Christopher J. Conroy, Jennifer L. Neuwald. 2008. Phylogeographic study of the California vole, Microtus californicus Journal of Mammalogy, 89(3):755-767., Steven R. Hoofer and Ronald A. Van Den Bussche. 2001. Phylogenetic Relationships of Plecotine Bats and Allies Based on Mitochondrial Ribosomal Sequences. Journal of Mammalogy 82(1):131-137. | Walker, Faith M., Jeffrey T. Foster, Kevin P. Drees, Carol L. Chambers. 2014. Spotted bat (Euderma maculatum) microsatellite discovery using illumina sequencing. Conservation Genetics Resources.`

<br/><br/>

### associatedReferences <section id='##associatedReferences'/>

A list of identifiers (publication, global unique identifier, URI) of genetic sequence information associated with the Occurrence.

The general format follows the standard list format, and is as follows:

```
link
linkOne|linkTwo
linkOne | linkTwo
```

##### Passing Examples

`http://www.ncbi.nlm.nih.gov/nuccore/U34853.1 | http://www.ncbi.nlm.nih.gov/nuccore/GU328060 | http://www.ncbi.nlm.nih.gov/nuccore/AF326093`

##### Failing Examples

`http://www.ncbi.nlm.nih.gov/nuccore/U34853.1, http://www.ncbi.nlm.nih.gov/nuccore/GU328060, http://www.ncbi.nlm.nih.gov/nuccore/AF326093`
<br/><br/>

### withholdData <section id='##withholdData'/>

Indication of if there was data withheld. Must be one of the two accepted values (case sensitive):

`Y` for yes, `N` for no

Note: please refer to informationWithheld in Darwin Core to view more about what this field is

<br/><br/>

### reared <section id='##reared'/>

Indication of if the specimen has been reared. Must be one of the two accepted values (case sensitive):

`Y` for yes, `N` for no

<br/><br/>

### recordEnteredBy <section id='##recordEnteredBy'/>

The (spesql) credentials of the individual inserting this into the database. This is automatically determined, <b>DO NOT</b> manually attempt to insert this field. The insertion will fail.

This field is available for logging and querying.

<br/><br/>

### modifiedInfo <section id='##modifiedInfo'/>

The edit history of this entry in the database. This is automatically determined and updated as changes to the entry are made, <b>DO NOT</b> manually attempt to insert this field. The insertion will fail.

This field is available for logging and querying.

<br/><br/>

### fieldNotes <section id='##fieldNotes'/>

Notes from field, other notes about specimen. There is no specified formatting to follow

<br/><br/>

## Countries <section id='Countries'/>

| Country Name                                 | Country Code |
| -------------------------------------------- | ------------ |
| Afghanistan                                  | AF           |
| Åland Islands                                | AX           |
| Albania                                      | AL           |
| Algeria                                      | DZ           |
| American Samoa                               | AS           |
| AndorrA                                      | AD           |
| Angola                                       | AO           |
| Anguilla                                     | AI           |
| Antarctica                                   | AQ           |
| Antigua and Barbuda                          | AG           |
| Argentina                                    | AR           |
| Armenia                                      | AM           |
| Aruba                                        | AW           |
| Australia                                    | AU           |
| Austria                                      | AT           |
| Azerbaijan                                   | AZ           |
| Bahamas                                      | BS           |
| Bahrain                                      | BH           |
| Bangladesh                                   | BD           |
| Barbados                                     | BB           |
| Belarus                                      | BY           |
| Belgium                                      | BE           |
| Belize                                       | BZ           |
| Benin                                        | BJ           |
| Bermuda                                      | BM           |
| Bhutan                                       | BT           |
| Bolivia                                      | BO           |
| Bosnia and Herzegovina                       | BA           |
| Botswana                                     | BW           |
| Bouvet Island                                | BV           |
| Brazil                                       | BR           |
| British Indian Ocean Territory               | IO           |
| Brunei Darussalam                            | BN           |
| Bulgaria                                     | BG           |
| Burkina Faso                                 | BF           |
| Burundi                                      | BI           |
| Cambodia                                     | KH           |
| Cameroon                                     | CM           |
| Canada                                       | CA           |
| Cape Verde                                   | CV           |
| Cayman Islands                               | KY           |
| Central African Republic                     | CF           |
| Chad                                         | TD           |
| Chile                                        | CL           |
| China                                        | CN           |
| Christmas Island                             | CX           |
| Cocos (Keeling) Islands                      | CC           |
| Colombia                                     | CO           |
| Comoros                                      | KM           |
| Congo                                        | CG           |
| Congo, The Democratic Republic of the        | CD           |
| Cook Islands                                 | CK           |
| Costa Rica                                   | CR           |
| Cote D'Ivoire                                | CI           |
| Croatia                                      | HR           |
| Cuba                                         | CU           |
| Cyprus                                       | CY           |
| Czech Republic                               | CZ           |
| Denmark                                      | DK           |
| Djibouti                                     | DJ           |
| Dominica                                     | DM           |
| Dominican Republic                           | DO           |
| Ecuador                                      | EC           |
| Egypt                                        | EG           |
| El Salvador                                  | SV           |
| Equatorial Guinea                            | GQ           |
| Eritrea                                      | ER           |
| Estonia                                      | EE           |
| Ethiopia                                     | ET           |
| Falkland Islands (Malvinas)                  | FK           |
| Faroe Islands                                | FO           |
| Fiji                                         | FJ           |
| Finland                                      | FI           |
| France                                       | FR           |
| French Guiana                                | GF           |
| French Polynesia                             | PF           |
| French Southern Territories                  | TF           |
| Gabon                                        | GA           |
| Gambia                                       | GM           |
| Georgia                                      | GE           |
| Germany                                      | DE           |
| Ghana                                        | GH           |
| Gibraltar                                    | GI           |
| Greece                                       | GR           |
| Greenland                                    | GL           |
| Grenada                                      | GD           |
| Guadeloupe                                   | GP           |
| Guam                                         | GU           |
| Guatemala                                    | GT           |
| Guernsey                                     | GG           |
| Guinea                                       | GN           |
| Guinea-Bissau                                | GW           |
| Guyana                                       | GY           |
| Haiti                                        | HT           |
| Heard Island and Mcdonald Islands            | HM           |
| Holy See (Vatican City State)                | VA           |
| Honduras                                     | HN           |
| Hong Kong                                    | HK           |
| Hungary                                      | HU           |
| Iceland                                      | IS           |
| India                                        | IN           |
| Indonesia                                    | ID           |
| Iran, Islamic Republic Of                    | IR           |
| Iraq                                         | IQ           |
| Ireland                                      | IE           |
| Isle of Man                                  | IM           |
| Israel                                       | IL           |
| Italy                                        | IT           |
| Jamaica                                      | JM           |
| Japan                                        | JP           |
| Jersey                                       | JE           |
| Jordan                                       | JO           |
| Kazakhstan                                   | KZ           |
| Kenya                                        | KE           |
| Kiribati                                     | KI           |
| Korea, Democratic People'S Republic of       | KP           |
| Korea, Republic of                           | KR           |
| Kuwait                                       | KW           |
| Kyrgyzstan                                   | KG           |
| Lao People’s Democratic Republic             | LA           |
| Latvia                                       | LV           |
| Lebanon                                      | LB           |
| Lesotho                                      | LS           |
| Liberia                                      | LR           |
| Libyan Arab Jamahiriya                       | LY           |
| Liechtenstein                                | LI           |
| Lithuania                                    | LT           |
| Luxembourg                                   | LU           |
| Macao                                        | MO           |
| Macedonia, The Former Yugoslav Republic of   | MK           |
| Madagascar                                   | MG           |
| Malawi                                       | MW           |
| Malaysia                                     | MY           |
| Maldives                                     | MV           |
| Mali                                         | ML           |
| Malta                                        | MT           |
| Marshall Islands                             | MH           |
| Martinique                                   | MQ           |
| Mauritania                                   | MR           |
| Mauritius                                    | MU           |
| Mayotte                                      | YT           |
| Mexico                                       | MX           |
| Micronesia, Federated States of              | FM           |
| Moldova, Republic of                         | MD           |
| Monaco                                       | MC           |
| Mongolia                                     | MN           |
| Montserrat                                   | MS           |
| Morocco                                      | MA           |
| Mozambique                                   | MZ           |
| Myanmar                                      | MM           |
| Namibia                                      | NA           |
| Nauru                                        | NR           |
| Nepal                                        | NP           |
| Netherlands                                  | NL           |
| Netherlands Antilles                         | AN           |
| New Caledonia                                | NC           |
| New Zealand                                  | NZ           |
| Nicaragua                                    | NI           |
| Niger                                        | NE           |
| Nigeria                                      | NG           |
| Niue                                         | NU           |
| Norfolk Island                               | NF           |
| Northern Mariana Islands                     | MP           |
| Norway                                       | NO           |
| Oman                                         | OM           |
| Pakistan                                     | PK           |
| Palau                                        | PW           |
| Palestinian Territory, Occupied              | PS           |
| Panama                                       | PA           |
| Papua New Guinea                             | PG           |
| Paraguay                                     | PY           |
| Peru                                         | PE           |
| Philippines                                  | PH           |
| Pitcairn                                     | PN           |
| Poland                                       | PL           |
| Portugal                                     | PT           |
| Puerto Rico                                  | PR           |
| Qatar                                        | QA           |
| Reunion                                      | RE           |
| Romania                                      | RO           |
| Russian Federation                           | RU           |
| RWANDA                                       | RW           |
| Saint Helena                                 | SH           |
| Saint Kitts and Nevis                        | KN           |
| Saint Lucia                                  | LC           |
| Saint Pierre and Miquelon                    | PM           |
| Saint Vincent and the Grenadines             | VC           |
| Samoa                                        | WS           |
| San Marino                                   | SM           |
| Sao Tome and Principe                        | ST           |
| Saudi Arabia                                 | SA           |
| Senegal                                      | SN           |
| Serbia and Montenegro                        | CS           |
| Seychelles                                   | SC           |
| Sierra Leone                                 | SL           |
| Singapore                                    | SG           |
| Slovakia                                     | SK           |
| Slovenia                                     | SI           |
| Solomon Islands                              | SB           |
| Somalia                                      | SO           |
| South Africa                                 | ZA           |
| South Georgia and the South Sandwich Islands | GS           |
| Spain                                        | ES           |
| Sri Lanka                                    | LK           |
| Sudan                                        | SD           |
| Suriname                                     | SR           |
| Svalbard and Jan Mayen                       | SJ           |
| Swaziland                                    | SZ           |
| Sweden                                       | SE           |
| Switzerland                                  | CH           |
| Syrian Arab Republic                         | SY           |
| Taiwan, Province of China                    | TW           |
| Tajikistan                                   | TJ           |
| Tanzania, United Republic of                 | TZ           |
| Thailand                                     | TH           |
| Timor-Leste                                  | TL           |
| Togo                                         | TG           |
| Tokelau                                      | TK           |
| Tonga                                        | TO           |
| Trinidad and Tobago                          | TT           |
| Tunisia                                      | TN           |
| Turkey                                       | TR           |
| Turkmenistan                                 | TM           |
| Turks and Caicos Islands                     | TC           |
| Tuvalu                                       | TV           |
| Uganda                                       | UG           |
| Ukraine                                      | UA           |
| United Arab Emirates                         | AE           |
| United Kingdom                               | GB           |
| United States                                | US           |
| United States Minor Outlying Islands         | UM           |
| Uruguay                                      | UY           |
| Uzbekistan                                   | UZ           |
| Vanuatu                                      | VU           |
| Venezuela                                    | VE           |
| Vietnam                                      | VN           |
| Virgin Islands, British                      | VG           |
| Virgin Islands, U.S.                         | VI           |
| Wallis and Futuna                            | WF           |
| Western Sahara                               | EH           |
| Yemen                                        | YE           |
| Zambia                                       | ZM           |
| Zimbabwe                                     | ZW           |
