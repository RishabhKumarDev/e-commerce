import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { Address } from '../../models/address.model.js';


const addAddress = async (req, res) => {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone) {
        throw new ApiError(400, "All Fields are required");
    }

    const newAddress = await Address.create({ userId, address, city, pincode, phone, notes });

    res
        .status(201)
        .json(new ApiResponse(201, newAddress, "Address created successfully"));

};
const fetchAllAddresses = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "UserId is missing");
    }

    const addresses = await Address.find({ userId });

    res
        .status(200)
        .json(new ApiResponse(200, addresses, "Successfully fetched All addresses"))

};

const updateAddress = async (req, res) => {
    const { userId, addressId } = req.params;

    const updateData = req.body;

    if (!userId || !addressId) {
        throw new ApiError(400, "All Fields are required");
    };

    const updatedAddress = await Address.findOneAndUpdate(
        { userId, _id: addressId },
        {
            $set: updateData
        }, {
        new: true,
        runValidators: true,
    });

    if (!updatedAddress) {
        throw new ApiError(404, "Address doesn't exist")
    }

    res
        .status(200)
        .json(new ApiResponse(200, updatedAddress, "successfully updated address"))
};


const deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
        throw new ApiError(400, "All Fields are required");
    };

    const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId })
    if (!deletedAddress) {
        throw new ApiError(404, "Address doesn't exist");
    }

    res
        .status(200)
        .json(new ApiResponse(200, deletedAddress, "Successfully deleted address"))
};

export {
    addAddress,
    fetchAllAddresses,
    updateAddress,
    deleteAddress,
}