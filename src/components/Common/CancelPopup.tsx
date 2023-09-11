import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import CloseSquare from "../../assets/icons/closeSquare.svg";
import CustomButton from "./Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

const CancelPopup = ({
  open,
  handleClose,
  title,
  handleYes,
}: any) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="w-[320px] sm:w-[400px]"
        sx={style}
        style={{
          textAlign: "center",
          borderRadius: "16px",
          outline: "none",
          // padding: '10px',
        }}
      >
        <div className="bg-bodyBg p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-redHatDisplayBold text-[18px] text-blackFont">
              {title}
            </p>
            <img
              className="cursor-pointer"
              onClick={handleClose}
              src={CloseSquare}
              alt="Close"
            />
          </div>
          <div className="flex justify-center items-center gap-6 mt-6">
            <CustomButton
              borderRadius="8px"
              onClick={handleClose}
              width="w-fit"
              variant="outlined"
              size="large"
            >
              <p className="text-base text-blackFont font-redHatDisplayBold tracking-normal">
                No
              </p>
            </CustomButton>
            <CustomButton
              borderRadius="8px"
              onClick={handleYes}
              width="w-fit"
              variant="contained"
              size="large"
            >
              Yes
            </CustomButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default CancelPopup;
