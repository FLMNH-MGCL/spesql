
/*
    FUNCTION RETURN STRUCTURE

    return_value = {
        errs: [{lineNumber (integer), error_message (string message)}]
    }

    GENERAL CHECKS:
    1). check correct capitalization

    SPECIFIC CHECKS: 
    1). check valid specimen-specific data (i.e. valid family, genus, etc)
    2). 

    If the error isn't automatically correctable by software, the entire entry will be skipped and
    the error will be added to the return log of errors. If it can be correct, it will be corrected 
    treated as otherwise normal.
*/

function checkEntry(lineNumber, specimen) {
    let ret = {
        errs: [],
    }

    // implement checks

    return ret
}

export default checkEntry