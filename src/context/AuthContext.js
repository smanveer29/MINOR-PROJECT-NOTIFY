import { storeObjectData } from "../functions/asyncStorage";
import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            const { user } = action.payload
            return { user };
        case "logout":
            return { user: null };
        default:
            return state;
    }
};

const login = dispatch => {
    return (user, callback) => {
        dispatch({ type: "login", payload: { user } });
        if (callback) {
            callback()
        }
    };
};

const logout = dispatch => {
    return () => {
        storeObjectData('user', null)
        dispatch({ type: "logout" });
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { login, logout },
    { user: null }
);