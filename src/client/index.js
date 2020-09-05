import './styles/header.scss'
import './styles/base.scss'
import './styles/footer.scss'

import { handleSubmit } from './js/formHandler'
import { isInputEmpty, isInputNull, isDateEarlierThanToday } from './js/inputValidate'



//const url = 'http://api.geonames.org/searchJSON?q=london&maxRows=10&username=njuacha';

//const dataReturned = fetch(url);

//console.log("dataReturned"+dataReturned);

export {
  handleSubmit,
  isInputEmpty,
  isInputNull,
  isDateEarlierThanToday
}
