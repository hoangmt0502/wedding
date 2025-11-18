import apiService from "../services/apiService";

/**
 * Upload new image
 * @param {Blob} photoBlob - File dạng binary (Blob)
 * @returns {Promise<Object>} - API response data
 */
export const uploadScreenshot = async (photoBlob: Blob): Promise<Object> => {
    try {
        // Check if photoBlob is a valid Blob object
        if (!(photoBlob instanceof Blob)) {
            throw new Error("Invalid photoBlob: It must be a Blob object");
        }

        const formData = new FormData();
        formData.append("photo", photoBlob, "photo.jpg");

        // Optional: log form data entries for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); 
        }

        // Call API
        return await apiService.post("upload-photo", formData);
    } catch (error) {
        console.error("Photo upload Error:", error);
        throw error;
    }
};
