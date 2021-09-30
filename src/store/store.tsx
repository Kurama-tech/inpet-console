import { State } from "@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core";
import React, {createContext, Dispatch, useReducer} from "react";
import Reducer, {StateContext} from './reducer'

interface IContextProps {
    state: StateContext;
    dispatch: ({type}:{type:string, data: any}) => void;
  }

const initialState = {
    APIData: [],
    error: 'error',
    alerts: [],
    Suppliers: [],
    Customers: []
};

export const Context = React.createContext({} as IContextProps);;

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const value = { state, dispatch };
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
};

export default Store;