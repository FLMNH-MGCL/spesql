import axios from "axios";

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

export async function runSelectQuery(query) {
  //sessionStorage.setItem('current_query', query)

  let data = { command: query };
  const res = await axios.post(PREFIX + "/api/select/", data);

  return res.data;
}

export async function runCountQuery(query) {
  let data = { command: query };

  const res = await axios.post(PREFIX + "/api/select-count/", data);

  return res.data;
}

export async function runUpdateQuery(query) {
  let data = { command: query };

  const ret = await axios
    .post(PREFIX + "/api/update/", data)
    .then((response) => {
      const data = response;
      return data;
    });

  // console.log(ret);

  return ret;
}

export async function runDeleteQuery(query, body) {
  const ret = await axios
    .post(PREFIX + `/api/delete/`, {
      command: query,
      user: body.user,
      password: body.password,
    })
    .then((response) => {
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
      .post(PREFIX + "/api/insert", { specimen: specimen, table: table })
      .then((response) => {
        const data = response;
        return data;
      });

    insertionsData.push(ret);
  });

  return insertionsData;
}

export async function runSingleInsert(specimen, table, userData) {
  const insertData = await axios.post(PREFIX + "api/insert", {
    specimen: specimen,
    table: table,
    username: userData.username,
    password: userData.password,
  });
  return insertData;
}

export async function currentUser() {
  const response = await axios.get(PREFIX + "/api/fetchCurrentUser/");
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
  const response = await axios.post(PREFIX + "/api/admin/alter-table", {
    command,
  });

  if (response.error) {
    return response.sqlMessage;
  } else {
    return response.data;
  }
}

export async function reregisterTable(command) {
  const response = await axios.post(PREFIX + "/api/admin/reregister-table", {
    command,
  });

  if (response.error) {
    return response.sqlMessage;
  } else {
    return response.data;
  }
}
