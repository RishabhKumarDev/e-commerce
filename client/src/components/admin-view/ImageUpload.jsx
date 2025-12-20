import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { FileIcon, Upload, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  lableText="Upload Image"
}) {
  const inputRef = useRef(null);
  const handleImageFileChange = (event) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImageFile(selectedImage);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const dropedFile = event.dataTransfer.files?.[0];
    if (dropedFile) {
      setImageFile(dropedFile);
    }
  };

  const handleRemoveFile = (event) => {
    event.preventDefault();
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/image-upload`,
        data
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.data.result.url);
        setImageLoadingState(false);
      }
    } catch (error) {
      console.warn(error);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="block mb-2 text-lg font-semibold">{lableText}</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60 " : ""
        }border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={` ${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-30`}
          >
            <Upload className="w-10 h-10 text-muted-foreground" />
            <span> Drag and Drop OR Click to upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-400 " />
        ) : (
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              size="icon"
              onClick={handleRemoveFile}
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove Image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
