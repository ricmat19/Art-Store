import React, {useState, createContext} from "react";

export const CollectionContext = createContext();

export const CollectionContextProvider = props => {

    const [collection, setCollection] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const createItem = (item) => {
        setCollection([...collection, item])
    }

    return(
        <CollectionContext.Provider value={{
            collection: collection, 
            setCollection: setCollection, createItem,
            selectedItem: selectedItem,
            setSelectedItem: setSelectedItem
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}