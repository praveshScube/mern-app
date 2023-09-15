import React, { ReactNode } from "react";
import { uuid } from "../../../utils/helpers";
import { Input } from "../../Common/Input/Input";
import { SelectInput } from "../../Common/Input/Select";

const columns = {
    all_components: "All Components",
    form_components: "Form Components",
} as any;

const sample: {
    id: string;
    title: ReactNode;
    column: string;
    disabled: boolean
}[] = [
    {
        id: uuid(),
        title: <Input disabled={true} />,
        column: "all_components",
        disabled: true
    },
    {
        id: uuid(),
        title: <SelectInput disabled={true} />,
        column: "all_components",
        disabled: true
    },
];

function AllComponents2() {
    const [todoTitle, setTodoTitle] = React.useState("");
    const [elements, setElements] = React.useState(sample);
    const [formComponents, setFormComponents] = React.useState([] as any);

    const columnMap = Object.keys(columns);

    const draggedElement = React.useRef<any>(null);

    const handleColumnDrop = (item: any) => {
        if (item === "all_components") {
            return;
        }
        const index = elements.findIndex(
            (ele) => ele.id === draggedElement.current
        );
        const tempElements = [...elements];
        tempElements[index].column = item;
        tempElements[index].disabled = false;
        setElements(tempElements);
    };
    return (
        <div className="flex justify-center">
            {columnMap.map((item: any) => (
                <div className="flex-1 mr-4">
                    <h5>{columns[item]}</h5>
                    <div
                        className="container-sort__items grid grid-cols-2 justify-start items-start"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleColumnDrop(item)}
                    >
                        {elements
                            .filter((ele) => ele.column === item)
                            .map((ele) => (
                                <div
                                    key={ele.id}
                                    className="list-item"
                                    draggable
                                    onDragStart={(e) =>{
                                        (draggedElement.current = ele.id)
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <div className="w-full">{ele.title}</div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllComponents2;
