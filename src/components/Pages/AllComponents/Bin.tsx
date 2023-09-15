import { useDrop } from "react-dnd";

const Bin = ({ binnedItems }: any) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "note",
        drop: (item:any, monitor) => {
        },
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    return (
        <div className="border h-screen" ref={drop}>
            <p className="text-center font-medium py-2">Bin</p>
            <div className="grid grid-cols-2">
            {binnedItems.map((item: any, i: any) => (
                <div key={i} className="w-full">
                    <p>{item}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Bin;
