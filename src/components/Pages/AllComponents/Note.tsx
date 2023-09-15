import { useEffect } from "react";
import { useDrag } from "react-dnd";

const Note = ({ note, binnedItems, setBinnedItems, setItemIndex, handleDrop }: any) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "note",
        item: { name: note },
        end: (item: any, monitor: any) => {
            const dropResult: any = monitor.getDropResult();
            if (item && dropResult) {
                setBinnedItems((prevBinnedItems: any) => [
                    ...prevBinnedItems,
                    item.name,
                ]);
                handleDrop()
                // setItemIndex((prev:any)=> prev+1)
            }
        },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })) as any;

    console.log(binnedItems, "binnedItems");

    return(
        <div ref={drag} className=" w-full">{note}</div>
    )
};

export default Note;
