import { useEffect, useState } from "react";
import FileUploadImage from "../../../assets/images/FileUploadImage.svg";
import PDFPreview from "../../../assets/images/PDFPreview.svg";
import Video from "../../../assets/images/Video.svg";

import { toast } from "react-toastify";
import CustomButton from "../Button";


type FileMimeTypes =
    | "image/png"
    | "image/jpeg"
    | "application/pdf"
    | "video/mp4";

interface Props {
    setImage: (event: any) => any;
    setPreviewMeta?: (event: any) => any;
    removeImage?: (event: any) => any;
    label: string;
    id: string;
    acceptMimeTypes: FileMimeTypes[];
    title: string;
    maxSize: number;
    imageUrl?: any;
    styleType: "md" | "lg";
    docType?: string;
    filename?: string;
    error?: any;
    previewData?: any;
    name?: any;
    view?: any;
}

const CustomFileUpload: React.FC<Props> = ({
    id,
    label,
    acceptMimeTypes = ["image/png", "image/jpeg"],
    setImage,
    title = "Drag and Drop PDF here",
    maxSize = 5, // in MB,
    imageUrl = "",
    styleType = "lg",
    filename,
    previewData = "",
    name,
    view,
    setPreviewMeta,
    removeImage,
    error,
}) => {
    const [isUploaded, setUpload] = useState(false);
    const [active, setActive] = useState(false);
    const [imageMeta, setImagePreview] = useState({
        name: "",
        url: "",
        type: "",
    } as any);

    useEffect(() => {
        // show preview image
        if (typeof imageUrl === "string" && imageUrl.startsWith("https://")) {
            setUpload(true);
            const name = imageUrl?.substring(imageUrl.lastIndexOf("/") + 1);
            const lastDot = name.lastIndexOf(".");
            const ext = name.substring(lastDot + 1);
            setImagePreview({
                name,
                url: imageUrl,
                type:
                    ext === "pdf"
                        ? "application/pdf"
                        : ext === "mp4"
                            ? "video/mp4"
                            : "image/png",
            });
        }

        if (previewData) {
            setImagePreview(previewData);
            setUpload(true);
        }
    }, [previewData, imageUrl]);

    const validation = (file: any) => {
        const maxSizeInBytes = Number(maxSize) * 1024 ** 2;
        if (file.size > maxSizeInBytes) {
            toast.error(`File Size Exceeds the ${maxSize}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }

        if (!acceptMimeTypes.includes(file.type)) {
            toast.error("Unsupported file selected!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }

        if (
            file.type === "image/jpeg" &&
            file.name.toLowerCase().endsWith(".jfif")
        ) {
            toast.error("JFIF files are not acceptable!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }

        return true;
    };

    const convertBase64 = (file: any) => {
        const isValid = validation(file); // validation for file type and size
        if (isValid) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const meta = { name: file.name, url: reader.result, type: file.type };
                setImagePreview(meta);
                // setPreviewMeta && setPreviewMeta(meta);
                if (setPreviewMeta) {
                    setPreviewMeta(meta);
                }
                setUpload(true);
                setActive(true);
                setImage({
                    url: reader.result || "",
                    name: filename,
                    file,
                    preview: meta,
                });
            };
        }
    };

    const chooseFile = (e: any) => {
        e.preventDefault();
        const ele = document.getElementById(id);
        if (ele) ele.click();
    };
    const onChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        convertBase64(file);
    };

    const handleCancel = () => {
        setUpload(false);
        setActive(false);
        if (removeImage) {
            removeImage("");
        }
    };

    // drag and drop functionalities
    const onDrag = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragover") {
            setActive(true);
        }

        if (event.type === "dragleave") {
            setActive(false);
        }

        if (event.type === "drop") {
            const file = event.dataTransfer.files[0];
            convertBase64(file);
        }
    };
    return (
        <div
            className={`font-redHatDisplayRegular relative file-upload-box w-full h-fit ${error && "file-upload-error"
                } ${active || previewData ? "file-upload-active" : ""}`}
        >
            {!isUploaded ? (
                <>
                    <div>
                        <div
                            className={`flex justify-between items-center  ${styleType === "md" ? "pt-0" : "pt-0"
                                }`}
                        >
                            <div className="flex justify-center items-center  space-x-0 lg:space-x-6">
                                <div className="hidden lg:block">
                                    <img
                                        src={FileUploadImage}
                                        alt=""
                                        className="w-[25px] h-[24px]"
                                    />
                                </div>

                                <div className="text-[#898989] flex flex-col justify-start items-start text-xs sm:text-sm label-sec">
                                    <p>{label}</p>
                                    <p className="pt-2">
                                        Maximum Size:
                                        {maxSize} Mb
                                    </p>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="file"
                                    id={id}
                                    onChange={onChange}
                                    accept={acceptMimeTypes.toString()}
                                    className="hidden"
                                />
                                <div
                                    className="upload-btn   flex cursor-pointer justify-center items-center rounded-lg"
                                    id={id}
                                    role="presentation"
                                >
                                    {!view ? (
                                        <CustomButton
                                            borderRadius="0.5rem"
                                            onClick={(e) => chooseFile(e)}
                                            // width='w-44'
                                            variant="outlined"
                                            size="large"
                                        >
                                            <span className="font-redHatDisplayRegular text-xs sm:text-sm">Choose File</span>
                                        </CustomButton>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`flex justify-center flex-col  items-center ${styleType === "md" ? "hidden" : "block"
                            }`}
                    >
                        <img src={"FileUploaded"} alt="" />
                        <p className="text-SpaceCadet text-center pt-4 font-bold">
                            Uploaded!
                        </p>
                    </div>

                    <div
                        className={`flex justify-between items-center  ${styleType === "md" ? "pt-0" : "pt-6"
                            }`}
                    >
                        <div className="flex justify-center items-center space-x-6">
                            <img
                                src={
                                    imageMeta.type === "application/pdf"
                                        ? PDFPreview
                                        : imageMeta.type === "video/mp4"
                                            ? Video
                                            : imageMeta.url
                                }
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <p className="text-SpaceCadet text-sm">
                                {imageMeta.name.length > 10 ? (
                                    <>
                                        {imageMeta.name.substring(0, 10)}
                                        ...
                                    </>
                                ) : (
                                    <>{imageMeta.name}</>
                                )}
                            </p>
                        </div>
                        <div className="flex md:gap-4 gap-1 items-center">
                            {!view ? (
                                <div className="border-b border-black">
                                    <a href={imageMeta.url} download={imageMeta.url}>
                                        <p>View</p>
                                    </a>
                                </div>
                            ) : (
                                ""
                            )}

                            {!view ? (
                                <button
                                    onClick={handleCancel}
                                    type="button"
                                    className="cancel-btn flex cursor-pointer justify-center items-center rounded-lg"
                                >
                                    Add Another
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </>
            )}

            {error && (
                <p className="absolute -bottom-6 ml-3 text-GlowingBrakeDisc text-xs">
                    {error}
                </p>
            )}
        </div>
    );
};

export default CustomFileUpload;
