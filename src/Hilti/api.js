import { fetchJSON } from '../api';

export function hiltiMapper(json) {
  return json.Sales.map((item) => [item.City, item.Lat, item.Long]);
}

export function fetchPoints(){
  const dev = document.location.search.indexOf('test') > -1;
  const url = dev ? './billion.json' : 'http://billion.hilti.paulschwarz.me/billion.json';
  //const url = './billion.json';
  return fetchJSON(url);
}
