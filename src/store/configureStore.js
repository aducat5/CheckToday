import { createStore, combineReducers } from "redux";

import taskReducer from "./reducers/taskReducers";

const rootReducer = combineReducers({
    appState: taskReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;
