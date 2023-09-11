import * as _ from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import { getLoggedInUser } from "./auth";
/* eslint-disable */
export const uuid = () => {
    let uuid = "";
    let i;
    for (i = 0; i < 32; i += 1) {
        switch (i) {
            case 8:
            case 20:
                uuid += "-";
                uuid += (Math.random() * 16 || 0).toString(16);
                break;
            case 12:
                uuid += "-";
                uuid += "4";
                break;
            case 16:
                uuid += "-";
                uuid += (Math.random() * 4 || 8).toString(16);
                break;
            default:
                uuid += (Math.random() * 16 || 0).toString(16);
        }
    }
    return uuid;
};
/* eslint-enable */
export const capitalize = (string: string) => {
    if (!string) {
        return "";
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeUppertoLower = (string: string) => {
    if (!string) {
        return "";
    }

    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const getValueAsFloatWithNDecimalPlaces = (
    value: number,
    decimalPlaces: number
) => {
    if (["0", 0].includes(value)) {
        return value;
    }

    return Number(value).toFixed(decimalPlaces);
};

export const validateArray = (array: any[]) => {
    if (!array || !Array.isArray(array) || !array.length) {
        return [];
    }

    return array;
};

export const copyToClipboard = (value: any) => {
    navigator.clipboard.writeText(_.unescape(value));
};

export const showToastMessage = (message: string, type: string) => {
    if (type === "error") {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } else {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
};

export const defaultFiltersDropDown = [
    {
        id: "ALL",
        name: "All",
    },
    {
        id: "0",
        name: "Today",
    },
    {
        id: "-1",
        name: "Yesterday",
    },
    {
        id: "-7",
        name: "Last 7 Days",
    },
    {
        id: "-30",
        name: "Last 30 Days",
    },
    {
        id: "TM",
        name: "This Month",
    },
    {
        id: "LM",
        name: "Last Month",
    },
    {
        id: "custom",
        name: "Custom Date",
    },
];

export const dateRange = (type: any) => {
    let range: any = [];

    switch (type) {
        case "0":
            range = [
                moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
            ];
            break;
        case "-1":
            range = [
                moment()
                    .subtract(1, "days")
                    .startOf("day")
                    .format("YYYY-MM-DD HH:mm:ss"),
                moment()
                    .subtract(1, "days")
                    .endOf("day")
                    .format("YYYY-MM-DD HH:mm:ss"),
            ];
            break;
        case "-7":
            range = [
                moment()
                    .subtract(6, "days")
                    .startOf("day")
                    .format("YYYY-MM-DD HH:mm:ss"),
                moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
            ];
            break;
        case "-30":
            range = [
                moment()
                    .subtract(29, "days")
                    .startOf("day")
                    .format("YYYY-MM-DD HH:mm:ss"),
                moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
            ];
            break;
        case "TM":
            range = [
                moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
                moment().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
            ];
            break;
        case "LM":
            range = [
                moment()
                    .subtract(1, "month")
                    .startOf("month")
                    .format("YYYY-MM-DD HH:mm:ss"),
                moment()
                    .subtract(1, "month")
                    .endOf("month")
                    .format("YYYY-MM-DD HH:mm:ss"),
            ];
            break;
        default:
            range = [];
    }
    return range;
};

export const CountItems = (data: any) => {
    let total = 0;
    Object.values(data).forEach((val) => {
        if (val === null || val === undefined || val === "") {
            return true;
        }
        total += 1;
    });
    // console.log(total, 'tpta;')
    return total;
};

export const dummyOptions = [
    { name: "Facebook" },
    { name: "Instagram" },
    { name: "Linkedin" },
    { name: "Farukh bhai" },
    { name: "Raw Agent from SCUBE" },
    { name: "Dubai" },
];

export const checkModuleAccess = (module: string, user: any) => {
    return user.user_permissions.some((x: any) => x.slug === module);
};

export const checkModulePrivilegeAccess = (module: string, permission: any) => {
    const user = getLoggedInUser();
    return user.user_permissions.find((x: any) => x.slug === module)[permission]
        ? true
        : false;
};


export const unitsList = [
    'S',
    'M',
    'L',
    'XL',
    'XXL',
];

export const colorsList = [
    'Red',
    'Green',
    'Blue',
    'Grey',
    'Black',
];

export const patternList = [
    'Floral',
    'Geometry',
    'Abstract',
];

export const subCategoryList = [
    'Comforter sets',
    'Duvet sets',
    'Quilt sets',
    'Bed in bag',
    'Sheets',
];

export const categories = [
    {
        id: 1,
        name: 'Bedding',
    },
    {
        id: 2,
        name: 'Bath',
    },
    {
        id: 3,
        name: 'Window',
    },
    {
        id: 4,
        name: 'Decor',
    },
    {
        id: 5,
        name: 'Clothing',
    },
]


export const types_of_filters = [
    {
        id: 1,
        name: 'Size'
    },
    {
        id: 2,
        name: 'Color'
    },
    {
        id: 3,
        name: 'Pattern'
    },
]


export const cities = [
    {
        id: 1,
        name: 'Bangalore'
    },
    {
        id: 2,
        name: 'Hyderabad'
    },
    {
        id: 3,
        name: 'Chennai'
    },
]


export const leadSources = [
    {
        id: 1,
        name: 'Social Media'
    },
    {
        id: 2,
        name: 'Other'
    },
    {
        id: 3,
        name: 'Email'
    },
    {
        id: 4,
        name: 'Website'
    },
    {
        id: 5,
        name: 'Whatsapp'
    },

]

export const leadStatusDropdown = [
    {
        id: 1,
        name: "CALLBACK"
    },
    {
        id: 2,
        name: "NOT_INTERESTED"
    },
    {
        id: 3,
        name: "PENDING"
    },
    {
        id: 4,
        name: "CONTACTED"
    }
]