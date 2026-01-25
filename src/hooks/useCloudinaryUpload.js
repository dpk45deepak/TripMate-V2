import { useState } from "react";
import { uploadToCloudinary } from "../Services/cloudinaryService";

const useCloudinaryUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const upload = async (file, folder) => {
        try {
            setUploading(true);
            setError(null);

            const result = await uploadToCloudinary(file, folder);
            setUploadedFile(result);

            return result;
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            setError(err);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    return {
        upload,
        uploading,
        uploadedFile,
        error,
    };
};

export default useCloudinaryUpload;