import React, {useState, createContext} from "react";

export const CollectionContext = createContext();

export const CollectionContextProvider = props => {

    const [collection, setCollection] = useState([]);

    return(
        <CollectionContext.Provider value={{collection: collection, setCollection: setCollection}}>
            {props.children}
        </CollectionContext.Provider>
    )
}