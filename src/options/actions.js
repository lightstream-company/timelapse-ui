import { parse } from 'querystring';
import _ from 'lodash';
import { createAction } from 'redux-actions';

export const loadOptionsFromEnv = createAction('LOAD_OPTIONS', (window) => {
  const search = _.get(window, 'document.location.search');
  if(search){
    const options = parse(search.replace('?', ''));
    return options;
  }else{
    return {};
  }
});
