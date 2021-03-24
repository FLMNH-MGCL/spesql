---
id: insertsingle
title: Insert Single
---

In SpeSQL you won't actually be handling any of the SQL insert statements, rather SpeSQL generates the queries for you using the CSV parser or form-based single insert. For inserting a single entry into the database, you will want to use the Single Insertion method outlined below

## Insertion Form

<img
src={require('./assets/singleinsert.png').default}
alt="Example banner"
class="shadow round"
/>

<br/>
<br/>

The Single Insert Form requires you to manually enter all of the available data for a single entry, and then attempts to insert it into the target table. The process is rather similar to transcription.

### Form Structure

The insertion form for a single entry is split up into 6 major sections, grouping based on relevant information, as follows:

- Cataloging
  - catalog numbers, record numbers, who entered the entry into the system, etc
- Classifications
  - genus, species, family, order, etc
- Record-level Information
  - collectors, date of collection, sampling information, storage information, etc
- Text Responses
  - remarks and notes about the entry
- Locality
  - country, state/province, longitude/latitude, etc
- Loan
  - if the entry is loaned somewhere and the corresponding information
