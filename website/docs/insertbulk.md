---
id: insertbulk
title: Insert Bulk
---

In SpeSQL you won't actually be handling any of the SQL insert statements, rather SpeSQL generates the queries for you using the CSV parser or form-based single insert. For inserting multiple entries into the database at one time, you will want to use the Bulk Insertion methods outlined below

## CSV File Upload

<img
src={require('./assets/bulkinsert.png').default}
alt="Bulk Insert"
class="shadow round"
/>

<br/>
<br/>

### Table & File Selection

All that is required to run an insert query is to select the target destination (the table in the database to insert into) and then the CSV file containing the entries to insert. In the File Upload method, you simply drag and drop your desired CSV file to load it in.

### Row-by-Row

Row-by-row insertion will run insert statements one-to-one with how many rows there are; rows will be validated and then inserted one at a time. The benefit with this method is that if a row were to pass client-side validation but throw a server error, this entry simply gets logged and skipped.

This method takes a considerable amount of time to process and insert

### All at Once

This is the 'true' bulk insert option; validation is run on all of the rows, and valid entries are added to a singluar insert query. The major benefit of this method is the time it takes to process and insert the data. One consideration is that since this is a singular query, if one of the entries throws a server-side error the entire query will fail.

### Download Failures

If selected, any rows that fail validation will be downloaded to their own CSV document. This is a utility added so that you may automically separate the rows that were uploaded from those that were not.

## CSV Paste

<img
src={require('./assets/bulkinsertpaste.png').default}
alt="Bulk Insert Paste"
class="shadow round"
/>

<br/>
<br/>

Much of the CSV File Upload information above is applicable to this method, as well. The main difference is the way in which data gets loaded in.

### CSV Paste Structure

Rather than uploading the file using a file selection pop-up dialogue, you copy and paste the data directly into the text-area. An important note is to ensure you always paste the header row, otherwise the query will be rejected.
