import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

mock.onPost('/api/skin').reply(() => {
  return [200, {
    4: {"paint": 3, "seed": 0, "wear": 0, "name": ""},
    7: {"paint": 1171, "seed": 0, "wear": 0, "name": ""},
    61: {"paint": 1142, "seed": 0, "wear": 0, "name": "test"},
    507: {"paint": 568, "seed": 0, "wear": 0, "name": ""},
    5033: {"paint": 10026, "seed": 0, "wear": 0, "name": ""}
  }]
})

const instance = axios.create()

export default instance;
