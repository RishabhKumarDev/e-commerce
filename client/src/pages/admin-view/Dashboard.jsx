import ProductImageUpload from "@/components/admin-view/ImageUpload";
import { Button } from "@/components/ui/button";
import { addBannerImage, getBannerImages } from "@/features/common/bannerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { bannerImages } = useSelector((state) => state.commonBanner);
  const dispatch = useDispatch();
  console.log(uploadedImageUrl, "uploaded image url");

  const handleBannerImageUpload = async () => {
    try {
      const result = await dispatch(addBannerImage(uploadedImageUrl)).unwrap();
      await dispatch(getBannerImages()).unwrap();
      setImageFile(null);
      setUploadedImageUrl("");
      toast.success("Image uploaded Successfull");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const fetchBannerImages = async () => {
    try {
      await dispatch(getBannerImages()).unwrap();
    } catch (error) {
      toast.error(error?.data.message);
    }
  };
  
  useEffect(() => {
    fetchBannerImages();
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        lableText="Upload Banner Image"
        // isEditMode={currentEditedId !== null}
      />
      <Button
        disabled={imageLoadingState || !imageFile}
        onClick={handleBannerImageUpload}
        className="mx-auto mt-6 "
      >
        {imageFile
          ? imageLoadingState
            ? "Wait..."
            : "Upload"
          : "Select Image"}
      </Button>

      <div className="mt-10 relative">
        {bannerImages && bannerImages.length > 0
          ? bannerImages.map((bImg, idx) => (
              <>
                <img
                  src={bImg?.image}
                  key={idx}
                  className={` w-2xl h-40 rounded-lg border m-2 object-cover`}
                />
              </>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
