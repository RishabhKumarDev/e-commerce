import CommonForm from "@/components/common/Form";
import AddressCard from "@/components/shopping-view/AddressCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addressFormControls } from "@/config/formConfig";
import {
  addAddress,
  deleteAddress,
  fetchAllAddressess,
  updateAddress,
} from "@/features/shopping/addressSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  const handleManageAddress = async (event) => {
    event.preventDefault();

    if (currentEditedId !== null) {
      try {
        const result = await dispatch(
          updateAddress({
            userId: user?._id,
            addressId: currentEditedId,
            formData,
          })
        ).unwrap();
        setFormData(initialAddressFormData);
        setCurrentEditedId(null);
        toast.success(result?.message);
        await dispatch(fetchAllAddressess(user?._id)).unwrap();
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      if (addressList.length >= 3) {
        toast.warning("Sorry, You can only have 3 addresses at max.🙂‍↕️");
        setFormData(initialAddressFormData);
        return;
      }

      try {
        const addressData = { userId: user?._id, ...formData };
        const result = await dispatch(addAddress(addressData)).unwrap();
        setFormData(initialAddressFormData);
        toast.success(result?.message);
        await dispatch(fetchAllAddressess(user?._id)).unwrap();
      } catch (error) {
        toast.error(error?.data?.message || "Couldn't Add Address");
      }
    }
  };
  const isFormValid = () => {
    return Object.values(formData).every((item) => item !== "");
  };

  const handleAddressDelete = async (addressId) => {
    try {
      const result = await dispatch(
        deleteAddress({ userId: user?._id, addressId })
      ).unwrap();
      await dispatch(fetchAllAddressess(user?._id)).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleAddressUpdate = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchAllAddressess(user?._id)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [dispatch]);
  return (
    <Card>
      <div className="grid grid-cols-1 gap-2 p-3 mb-5 sm:grid-cols-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddress) => (
            <AddressCard
              handleAddressDelete={handleAddressDelete}
              addressInfo={singleAddress}
              handleAddressUpdate={handleAddressUpdate}
            />
          ))
        ) : (
          <h1>Added Addresses will be visible here...</h1>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit You Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          disableBtn={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
