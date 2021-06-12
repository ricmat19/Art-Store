import React, {useState, createContext} from "react";

export const CollectionContext = createContext();

export const CollectionContextProvider = props => {

    const [collection, setCollection] = useState([]);

    const createItem = (item) => {
        setCollection([...collection, item])
    }

    return(
        <CollectionContext.Provider value={{collection: collection, setCollection: setCollection, createItem}}>
            {props.children}
        </CollectionContext.Provider>
    )
}