import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileIcon, Upload, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
}) {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    console.log(event.target.files);
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
        "http://localhost:5000/api/admin/products/image-upload",
        data
      );
      console.log(response.data);
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
      <Label className="block mb-2 text-lg font-semibold">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-30"
          >
            <Upload className="w-10 h-10 text-muted-foreground" />
            <span> Drag and Drop OR Click to upload</span>
          </Label>
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
