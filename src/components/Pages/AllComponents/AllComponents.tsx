import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Note from "./Note";
import Bin from "./Bin";
import all_components from "./Components";

const AllComponents = () => {
    const [notes, setNotes] = useState([]);
    const [binnedItems, setBinnedItems] = useState([]);
    const [itemIndex, setItemIndex] = useState(0 as number);
    const [inputDisabledStates, setInputDisabledStates] = useState([] as any);

    useEffect(() => {
        const initialNotes: any = all_components.map(
            (Component: any, index: any) => (
                <Component key={index} disabled={inputDisabledStates} />
            )
        );
        if(initialNotes.length > 0){
            let allFields = [...inputDisabledStates]
            for(let i=0; i<initialNotes.length; i++){
                allFields.push(true)
            }
            setInputDisabledStates(allFields)
        }
        setNotes(initialNotes);
    }, []);

    const handleDrop = () => {
        let updatedInputDisabledStates = [...inputDisabledStates];
        updatedInputDisabledStates[itemIndex] = false;
        setInputDisabledStates(updatedInputDisabledStates);
    };

    console.log(inputDisabledStates, "inputDisabledStates");
    console.log(itemIndex, "itemIndex");

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="text-center text-3xl font-semibold mt-4 py-2">
                AllComponents
            </div>
            <div className="flex">
                {notes.map((item: any, index: any) => (
                    <Note
                        key={index}
                        note={item}
                        binnedItems={binnedItems}
                        setBinnedItems={setBinnedItems}
                        itemIndex={itemIndex}
                        setItemIndex={setItemIndex}
                        handleDrop={handleDrop}
                    />
                ))}
            </div>

            <Bin binnedItems={binnedItems}  />
        </DndProvider>
    );
};

export default AllComponents;
