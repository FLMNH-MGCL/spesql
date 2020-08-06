import axios from "axios";

export async function runSelectQuery(query) {
  //sessionStorage.setItem('current_query', query)

  let data = { command: query };
  const res = await axios.post("/api/select/", data);

  return res.data;
}

export async function runCountQuery(query) {
  let data = { command: query };

  const res = await axios.post("/api/select-count/", data);

  return res.data;
}

export async function runUpdateQuery(query) {
  let data = { command: query };

  const ret = await axios.post("/api/update/", data).then((response) => {
    const data = response;
    return data;
  });

  // console.log(ret);

  return ret;
}

export async function runDeleteQuery(query) {
  let data = { command: query };

  const ret = await axios.post(`/api/delete/`, data).then((response) => {
    const data = response;
    return data;
  });

  return ret;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function runInsertQuery(insertions, table) {
  let insertionsData = [];
  asyncForEach(insertions, async (specimen) => {
    const ret = await axios
      .post("/api/insert", { specimen: specimen, table: table })
      .then((response) => {
        const data = response;
        return data;
      });

    insertionsData.push(ret);
  });

  return insertionsData;
}

export async function runSingleInsert(specimen, table) {
  const insertData = await axios.post("api/insert", {
    specimen: specimen,
    table: table,
  });
  return insertData;
}

export async function currentUser() {
  const response = await axios.get("/api/fetchCurrentUser/");
  // console.log(response)
  if (response.data.success === false) {
    console.log("err");
    return null;
  } else {
    const currentUser = response.data.currentUser;
    // console.log(currentUser)
    return currentUser;
  }
}

export async function alterTable(command) {
  const response = await axios.post("/api/admin/alter-table", { command });

  if (response.error) {
    return response.sqlMessage;
  } else {
    return response.data;
  }
}

export async function reregisterTable(command) {
  const response = await axios.post("/api/admin/reregister-table", { command });

  if (response.error) {
    return response.sqlMessage;
  } else {
    return response.data;
  }
}
