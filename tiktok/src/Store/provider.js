import { useReducer } from "react";
import ContextSt from "./context";
import reducer, { initState } from "./reducer";
import React from "react";

function Provider({children}){

    const[state, dispatch] = useReducer(reducer, initState);

    return (
        <ContextSt.Provider value={[state, dispatch]}>
            {children}
        </ContextSt.Provider>
    )
}

export default Provider;