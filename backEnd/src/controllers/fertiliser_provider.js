const {s_and_f} = require('../models/seedsFertiliser');
const {service_provider} = require('../models/machinerySchrms');
const farmer = require('../models/farmerSchema');

const sellSeedAndFertiliser = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      manufacturer,
      batchNumber,
      certification,
      isOrganic,
      description,
      image,   
      weightUnit,
      weight,
      packagingType,
      price,
      discount,
      stockQuantity,
      currency,
      manufactureDate,
      expiryDate,
      storageInstructions,
      usageInstructions,
      safetyInfo,
      seller,
      rating,
      reviews,
      stockAvailable,
      isFeatured,
      createdAt,
      updatedAt

    } = req.body;

    if (!name || !category || !brand || !price || !seller){
      return res.status(400).json({
        success: false,
        message: "All fields (name, category, brand, price, sellerDetails ) are required."
      });
    }
    const serviceProviderId = seller.serviceProvider;

    const provider = await service_provider.findById(serviceProviderId);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Service provider not found. Please register provider first."
      });
    }
    console.log(provider);

    const s_and_fs = await s_and_f.create({
      ...req.body,
      seller: {
        name: provider.name,
        contact: provider.contact,
        serviceProvider: provider._id
      }
    });


    console.log(s_and_fs);
    res.status(201).json({
      success: true,
      message: "Seed/Fertiliser registered successfully.",
      s_and_fs
    });

  } catch (err) {
    console.error("Error registering tool:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while registering tool.",
      error: err.message
    });
  }
};

// when all seed or fertilsed sold , remove seed and fertilised from proverder list
const QuantityManipulator = async(req,res)=>{
    try{
      let {
          quantity,
          productId,
      } = req.body;

      const product = await s_and_f.findById(productId);

      if(!product){
        return res.status(404).json({success:false,message:"Product not found"});
      }

      if(product.stockQuantity < quantity){
        return res.status(400).json({success:false, message:"Not enough stock"});
      }

      console.log("reduce stock");
      product.stockQuantity -= quantity;

      if(product.stockQuantity === 0){
        product.stockAvailable = false; // mark unavailbale, at time of printing, not display unavailbable
      }

      await product.save();

      return res.status(200).json({success:true,message:"Quantity Changed successfull",product});
  }
  catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"server error"});
  }
};

const updatePriceAndDisOfSeedAndFertiliser = async(req,res)=>{

  try {
    const { productId } = req.params;
    const { price, discount } = req.body;

    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return res.status(400).json({ success: false, message: "Invalid price value" });
    }

    if (discount !== undefined && (typeof discount !== "number" || discount < 0 || discount > 100)) {
      return res.status(400).json({ success: false, message: "Discount must be between 0–100%" });
    }

    const product = await s_and_f.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;
    product.updatedAt = Date.now();

    await product.save();

    res.json({
      success: true,
      message: "Product pricing updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product pricing:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

};

const buySeedAndFertiliser = async(req,res)=>{
  try{
    const {farmerId,productId,quantity,finalPrice} = req.body;// id , updateobject, new:true  to return updated object
     
    // Step 1: Find product
    const product = await s_and_f.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Step 2: Check stock & update using QuantityManipulator logic
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock" });
    }

    product.stockQuantity -= quantity;
    if (product.stockQuantity === 0) {
      product.stockAvailable = false;
    }
    await product.save();
    
    const updatedFarmer = await farmer.findByIdAndUpdate(
      farmerId,
      {
        $push: {
          myOrders: {
            orderType: product.category,   // "Seed" or "Fertiliser"
            product: product._id,
            quantity: quantity,
            price: finalPrice,
            serviceProvider: product.seller.serviceProvider,
            purchasedAt: new Date()
          }
        }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Purchase successful",
      farmer: updatedFarmer,
      product
    });
  } catch (err) {
    console.error("Error recording farmer order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// if serviceprocvider give their id to other person then she/he can delete it.
const removeProduct = async(req,res)=>{  // ensure only surviceprovide remove it
    try{
      const {providerId, productId} = req.body;

      const product = await s_and_f.findOne({
        _id : productId,
        "seller.serviceProvider":providerId, // only owner can remove
      });

      if(!product){
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      product.stockAvailable = false;
      product.isFeatured = false;
      await product.save();

      res.json({
        success: true,
        message: "Product removed from shop successfully",
        product,
      });
    } catch (error) {
      console.error("Error removing product:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
}

const getAllSeedFertiliserProducts = async (req, res) => {
  try {
    let {
      category,
      brand,
      isOrganic,
      weight,
      weightUnit,
      discount,
      sortBy,
      order,
      page,
      limit
    } = req.query;

    // Defaults
    const Page = Number(page) || 1;
    const Limit = Number(limit) || 100;
    const skip = (Page - 1) * Limit;
    order = order === "asc" ? 1 : -1;

    let pipeline = [];

    // 🔍 Filtering
    let matchStage = {};

    if (category) matchStage.category = category;
    if (brand) matchStage.brand = brand;
    if (isOrganic !== undefined) matchStage.isOrganic = isOrganic === "true";
    if (weight) matchStage.weight = Number(weight);
    if (weightUnit) matchStage.weightUnit = weightUnit;
    if (discount !== undefined) matchStage.discount = { $gte: Number(discount) };

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    const totalCount = await s_and_f.countDocuments(matchStage);
    const totalPages = Math.ceil(totalCount / Limit);

    pipeline.push({
      $lookup: {
        from: "service_providers",
        localField: "seller.serviceProvider",
        foreignField: "_id",
        as: "serviceProvider"
      }
    });
    pipeline.push({ $unwind: "$serviceProvider" });

    let sortField = "createdAt"; // default
    if (sortBy === "price") sortField = "price";
    else if (sortBy === "rating") sortField = "rating";
    else if (sortBy === "weight") sortField = "weight";

    pipeline.push({ $sort: { [sortField]: order } });

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Limit });

    // 🧼 Optional: Clean response
    pipeline.push({
      $project: {
        name: 1,
        category: 1,
        brand: 1,
        isOrganic: 1,
        weight: 1,
        weightUnit: 1,
        discount: 1,
        price: 1,
        rating: 1,
        stockAvailable: 1,
        image: 1,
        serviceProvider: {
          name: "$serviceProvider.name",
          location: "$serviceProvider.location"
        },
        createdAt: 1
      }
    });

    const result = await s_and_f.aggregate(pipeline);

    res.json({
      success: true,
      products: result,
      totalCount,
      totalPages,
      currentPage: Page,
      count: result.length
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {sellSeedAndFertiliser , QuantityManipulator,updatePriceAndDisOfSeedAndFertiliser,buySeedAndFertiliser,removeProduct,getAllSeedFertiliserProducts};

// https://copilot.microsoft.com/chats/bc7ZohwfgXWYuf5LHaTJz