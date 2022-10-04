// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./reducers/rootReducer";

export const store = configureStore({
    reducer: rootReducer
})