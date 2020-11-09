import axios from 'axios';
import { BACKEND_URL } from '../../types';

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
  }
  // .then((response) => {
  //   if (response.data.error) {
  //     this.setState({ loading: false });
  //   } else {
  //     // console.log(response);
  //     dbSelection = response.data.tables.map((table, index) => {
  //       return { key: index + 1 * 1002, text: table, value: table };
  //     });

  //     // console.log(dbSelection);
  //     this.setState({ dbSelection: dbSelection, loading: false });
  //   }
  // })
  // .catch((error) => {
  //   const response = error.response;
  //   this.setState({ dbSelection: [], loading: false });
  // });
}
