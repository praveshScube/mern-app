import { Input } from "../../Common/Input/Input";
import { SelectInput } from "../../Common/Input/Select";
import { uuid } from "../../../utils/helpers";

const componentsArray = [
    {
        id: uuid(),
        title: (
            <>
                <Input disabled={true} />
            </>
        ),
        column: "all_components",
        disabled: true,
    },
    {
        id: uuid(),
        title: (
            <>
                <SelectInput disabled={true} />
            </>
        ),
        column: "all_components",
        disabled: true,
    },
];

export default componentsArray;