import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducerVideoGames from '../reducer';

const store = createStore(
    reducerVideoGames,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;