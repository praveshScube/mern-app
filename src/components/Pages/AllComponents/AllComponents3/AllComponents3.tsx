import React, { useState } from "react";
import { uuid } from "../../../../utils/helpers";
import { Input } from "../../../Common/Input/Input";
import { SelectInput } from "../../../Common/Input/Select";
import CustomButton from "../../../Common/Button";
import FileUpload from "../../../Common/FileUpload";
import TextArea from "../../../Common/Input/TextArea";
import CustomCheckbox from "../../../Common/Input/Checkbox";

const sample = [
    {
        id: uuid(),
        title: "Input",
        column: "L_side",
    },
    {
        id: uuid(),
        title: "Select Input",
        column: "L_side",
    },
    {
        id: uuid(),
        title: "TextArea",
        column: "L_side",
    },
    {
        id: uuid(),
        title: "File Uploader",
        column: "L_side",
    },
    {
        id: uuid(),
        title: "Multi Select Input",
        column: "L_side",
    },
    {
        id: uuid(),
        title: "Checkbox",
        column: "L_side",
    },
];

const AllComponents3 = () => {
    const [draggedItems, setDraggedItems] = useState<any[]>([]);

    const handleDragStart = (event: React.DragEvent, item: any) => {
        event.dataTransfer.setData("text/plain", item.id);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const itemId = event.dataTransfer.getData("text/plain");
        const draggedItem = sample.find((item) => item.id === itemId);
        if (draggedItem) {
            const modifiedItem = { ...draggedItem };
            modifiedItem.column = "R_side";
            setDraggedItems((prevItems) => [...prevItems, modifiedItem]);
        }
    };

    return (
        <div className="flex gap-4">
            <div className="w-[25%] h-fit grid grid-cols-2 gap-4">
                {sample.map((item) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(event) => handleDragStart(event, item)}
                        className={`cursor-move bg-white hover:shadow-xl p-3 rounded duration-500 text-center text-xs font-semibold`}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div
                className="w-[40%] bg-gray-100 shadow-lg  border-2 border-gray-200 overflow-y-auto rounded p-4 grid grid-cols-2 gap-4"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {draggedItems.length > 0 &&
                    draggedItems.map((item) => (
                        <div key={item.id} className="">
                            {item.title === "Input" ? (
                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={true}
                                    label="Placeholder"
                                    // handleChange={handleChange}
                                    // value={params?.designation}
                                    // error={!!errors?.designation}
                                    // helperText={errors?.designation}
                                    name="designation"
                                />
                            ) : item.title === "TextArea" ? (
                                <TextArea
                                    placeholder="Content"
                                    name="content"
                                    rows={2}
                                    // handleChange={handleChange}
                                    // value={params?.content}
                                    // error={errors?.content}
                                    // helperText={errors?.content}
                                    className="border border-[#E7E8ED] hover:border-black"
                                    readOnly={true}
                                />
                            ) : item.title === "Select Input" ? (
                                <SelectInput
                                    //   handleChange={handleChange}
                                    //   options={ratings}
                                    label="Select"
                                    name="rating"
                                    bgcolor={"white"}
                                    readonly={true}
                                    //   value={params?.rating}
                                    //   error={errors?.rating}
                                    //   helperText={errors?.rating}
                                />
                            ) : item.title === "File Uploader" ? (
                                <FileUpload
                                    // imageUrl={params?.user_image}
                                    removeImage={() => {}}
                                    styleType={"md"}
                                    setImage={() => {}}
                                    acceptMimeTypes={[
                                        "image/jpeg",
                                        "image/png",
                                    ]}
                                    title="Click to Upload file or Drag/drop file"
                                    // label="File Format: JPEG, PNG Files"
                                    label=""
                                    id="img"
                                    maxSize={5}
                                    filename="user_image"
                                    // error={errors?.user_image}
                                />
                            ) : item.title === "Checkbox" ? (
                                <CustomCheckbox
                                    handleCheck={()=>{}}
                                    ischecked={item?.value}
                                    color="text-Comet"
                                    name="gender"
                                    Label={item?.type}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllComponents3;
