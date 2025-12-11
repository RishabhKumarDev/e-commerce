import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function AddressCard({ addressInfo, handleAddressDelete, handleAddressUpdate }) {
  return (
    <Card>
      <CardContent className="grid gap-4">
        <Label> Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label> Pincode: {addressInfo?.pincode}</Label>
        <Label> Phone: {addressInfo?.phone}</Label>
        <Label> Notes:- {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between mb-0" >
        <Button onClick={() => handleAddressUpdate(addressInfo)}> Edit </Button>
        <Button onClick={() => handleAddressDelete(addressInfo?._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
