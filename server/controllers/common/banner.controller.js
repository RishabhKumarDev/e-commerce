import { Banner } from '../../models/banner.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';


const addBanner = async (req, res) => {
    const { image } = req.body;

    if (!image) {
        throw new ApiError(400, "Image Can't be Empty")
    }
    const banner = await Banner.create({ image })

    res
        .status(201)
        .json(new ApiResponse(201, { banner }, "successfully uploaed banner"))
};
const deleteBanner = async (req, res) => { };
const fetchBanner = async (req, res) => {
    const images = await Banner.find({});

    res
        .status(200)
        .json(new ApiResponse(200, { images }, "fetch successfull"));
};


export {
    addBanner,
    deleteBanner,
    fetchBanner,
}