import { fetchJSON } from '../api';

export function hiltiMapper(json) {
  return json.Sales.map((item) => [item.City, item.Lat, item.Long]);
}

export function fetchPoints(){
  const url = 'http://billion.hilti.paulschwarz.me/billion.json';
  //const url = './billion.json';
  return fetchJSON(url);
}
