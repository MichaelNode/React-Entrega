import { createStore  } from 'redux';
import red  from '../reducerCombined'
import {saveState, loadState} from '../localstorage'

const initialstate= loadState()

export const store = createStore(
    red,
    initialstate ,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
 
store.subscribe( function () {
    saveState(store.getState())
})








