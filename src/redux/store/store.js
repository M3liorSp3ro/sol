import { applyMiddleware, combineReducers, createStore } from 'redux'
import { userReducer } from '../reducers/userReducer'


const allReducers = combineReducers({
    user: userReducer
})

export const store = createStore(allReducers)