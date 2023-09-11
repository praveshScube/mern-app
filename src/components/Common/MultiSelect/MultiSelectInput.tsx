import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    error: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
            borderRadius: "8px",
        },
    },
    select: {
        "& ul": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
        "& li": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
    },
    icon: {
        fill: "white",
    },
    root: {
        "& .MuiOutlinedInput-input": {
            fontFamily: "RedHatDisplay Regular",
            color: "#141C4C",
        },
        "& .MuiInputLabel-root": {
            fontFamily: "RedHatDisplay Medium",
            color: "#6A6A78",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E7E8ED",
            borderRadius: "8px",
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#141C4C",
        },
        "&:hover .MuiInputLabel-root": {
            color: "#6A6A78",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#141C4C",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#141C4C",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#74BFB6",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
            borderColor: "#74BFB6",
        },
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




export default function MultiSelectInput({ options, label,name,value,handleChange }: any) {

    const classes = useStyles();

    return (
        <div className='w-full'>
            <FormControl className={true ? classes.root : classes.error} fullWidth>
                <InputLabel id="demo-multiple-checkbox-label"> {label} </InputLabel>
                <Select
                    MenuProps={{
                        sx: {
                            "&& .MuiMenuItem-root": {
                                backgroundColor: "#ffffff",
                                border: "1px solid #E7E8ED !important",
                                color: "#141C4C",
                                fontFamily: "RedHatDisplay Medium",
                                "&:hover": {
                                    backgroundColor: "#F5FBFD !important",
                                },
                            },

                            "&& .MuiMenu-list": {
                                padding: "0",
                            },

                            "&& .Mui-selected": {
                                color: "#2F2F2F !important",
                                backgroundColor: "#F5FAF8 !important",
                            },
                        },
                    }}

                    sx={{
                        color: "#141C4C",
                        ".MuiSvgIcon-root ": {
                            fill: "#141C4C !important",
                        },
                    }}

                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    name={name}
                    onChange={handleChange}
                    input={<OutlinedInput fullWidth label={label} />}
                    renderValue={(selected) => selected.join(', ')} 
                >
                    {options?.map((name: any) => (
                        <MenuItem key={name} value={name?.id ? name?.id : name?.name || name}>
                            <Checkbox
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="5.25" stroke="#2F2F2F" stroke-width="1.5" />
                                    </svg>
                                }
                                checkedIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.42945 12.99L14.1795 8.24C14.5195 7.9 14.5195 7.35 14.1795 7C13.8395 6.66 13.2795 6.66 12.9395 7L8.80945 11.13L7.05945 9.38C6.71945 9.04 6.15945 9.04 5.81945 9.38C5.47945 9.72 5.47945 10.27 5.81945 10.62L8.19945 12.99C8.36945 13.16 8.58945 13.24 8.80945 13.24C9.03945 13.24 9.25945 13.16 9.42945 12.99Z" fill="url(#paint0_linear_85_7018)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_85_7018" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#74BFB6" />
                                            <stop offset="0.0001" stop-color="#74BFB6" />
                                            <stop offset="1" stop-color="#3A5A40" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                }
                                checked={value?.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}