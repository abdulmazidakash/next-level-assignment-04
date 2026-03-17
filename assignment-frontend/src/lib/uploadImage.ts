export const uploadImageToImgbb = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    console.log(process.env.NEXT_PUBLIC_IMGBB_API_KEY);

    if (!apiKey) {
      throw new Error("IMGBB API key missing");
    }

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};