
// const mongoose = require('mongoose');
const {tools,service_provider} = require('../models/machinerySchrms');
const mongoose = require('mongoose');

const register = async (req, res) => {
  try {
    const { name, contact, lng, lat } = req.body;

    if (!name || !contact || !lng || !lat) {
      return res.status(400).json({
        success: false,
        message: "Name, contact, lng, and lat are required."
      });
    }

    const existingProvider = await service_provider.findOne({ contact });
    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: "Service provider with this contact already exists."
      });
    }

    const provider = await service_provider.create({
      name,
      contact,
      location: {
        type: "Point",
        coordinates: [lng, lat] 
      }
    });

    res.status(201).json({
      success: true,
      message: "Service provider registered successfully.",
      provider
    });

  } catch (err) {
    console.error("Error in provider registration:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: err.message
    });
  }

}
const registerTools = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      rentPrice,
      rentUnit,
      lng,
      lat,
      serviceProviderId
    } = req.body;

    if (!name || !category || !rentPrice || !rentUnit || !lng || !lat || !serviceProviderId) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, category, rentPrice, rentUnit, lng, lat, serviceProviderId) are required."
      });
    }

    const provider = await service_provider.findById(serviceProviderId);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Service provider not found. Please register provider first."
      });
    }
    console.log(provider);

    const tool = await tools.create({
      name,
      description,
      category,
      rentPrice,
      rentUnit,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      },
      serviceProvider: serviceProviderId
    });
    console.log(tool);
    res.status(201).json({
      success: true,
      message: "Tool registered successfully.",
      tool
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
const getSpecificProviderTools =async (req,res)=>{// tools of specific provider
    try{
        const providerId = req.params.providerId; // from url params
            // const Tools =   await tools.find({ 
            //                 serviceProvider: new mongoose.service_provider.ObjectId(providerId) 
            //                 });
        const Tools = await tools.find({serviceProvider:providerId});
        // const toolsAndProvider = await tools.find({surviceProvider : providerId}).populate("serviceProvider");
        console.log(Tools);
        console.log(providerId);
        if(!Tools.length){
            return res.status(404).send({
                success: false,
                message:"No tools found for this provider"
            });
        }

        res.json({
            success:true,
            count: Tools.length,
            Tools
        });
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const getAllTools = async(req,res)=>{ // with sorting filtering , in normal return all document but with paging

    try{
        let {
            available,
            minPrice,
            maxPrice,
            rating,
            category,
            isFeatured,
            sortBy,
            order,
            lat,
            lng,
            maxDistance, // in meters
            page = 0,
            limit

        } = req.query;

        // default values
        order = order === 'asc' ? 1: -1; // desc by default
        maxDistance = maxDistance ? Number(maxDistance) : 5000 // 5 km default


        let Page = Number(page) || 1;
        let Limit = Number(limit) || 100;
        let skip = (Page - 1) * Limit;


        let pipeline = [];

        if (lat && lng) { // filter on basis of location if user give lat and lng
            pipeline.push({
                $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                distanceField: "distance",
                spherical: true,
                maxDistance: maxDistance
                }
            });
        }

        let matchStage = {};

        if(available !== undefined) matchStage.available = available === 'true';
        if(rating) matchStage.rating = {$gte:Number(rating)};
        if(category) matchStage.category = category;
        if(isFeatured !== undefined) matchStage.isFeatured = isFeatured === 'true';
        if(minPrice || maxPrice){
            matchStage.rentPrice = {};
            if(minPrice) matchStage.rentPrice.$gte = Number(minPrice);
            if(maxPrice) matchStage.rentPrice.$lte = Number(maxPrice);
        }

        if(Object.keys(matchStage).length>0){
            pipeline.push({$match:matchStage});// MongoDB’s aggregation $match stage works like an SQL WHERE clause.SELECT * FROM tools WHERE available = true;
        }

        const totalCount = await tools.countDocuments(matchStage);
        const totalPages = Math.ceil(totalCount / Limit);



        //Join serviceProvider so we can filter by location & address
        pipeline.push({
            $lookup: { //  यह एक "जॉइन" ऑपरेशन है।
                from: "service_providers",
                localField: "serviceProvider",
                foreignField: "_id",
                as: "serviceProvider"
            }
        });
        pipeline.push({ $unwind: "$serviceProvider" });
        

        // sorting
        if (sortBy) {
            let sortField =
                sortBy === "price"
                ? "rentPrice"
                : sortBy === "rating"
                ? "rating"
                : "createdAt";
            pipeline.push({ $sort: { [sortField]: order } });
        }


        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: Limit });

        const result = await tools.aggregate(pipeline);

        // This executes the query you just built dynamically (with filters + sorting).
        //User only sees the final filtered + sorted list of tools.

        res.json({
        success: true,
        tools: result,
        totalCount,
        totalPages,
        currentPage: Page,   // ✅ use numeric Page
        count: result.length,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {register,registerTools, getSpecificProviderTools ,getAllTools};


/*
        // https://gemini.google.com/app/d0b28c48c22a8a39?hl=en-IN read about much for above code 
        // https://chatgpt.com/c/68a6ced6-da3c-8327-b6da-f6c2f1d02f6e
        // 
*/


// manything to add;

// populate is like JOIN , add two collection based on condition
// Now if you add .populate("serviceProvider"), Mongoose replaces that ObjectId with the full provider document from the ServiceProvider collection
// You can also control what fields to bring (e.g., .populate("serviceProvider", "name contact") will only return those).
//
// he $lookup operator in MongoDB is a powerful tool used for performing left outer joins between documents from two collections. This operator allows you to merge data from different collections based on specified criteria, enhancing and analyzing data across multiple documents.

/* ✅ Example Requests:

// All tools (no filters):

// GET /api/tools


// Available tractors only:

// GET /api/tools?available=true&category=Tractor


// Sort by price ascending:

// GET /api/tools?sortBy=price&order=asc


// Nearby within 3km:

// GET /api/tools?lat=28.6139&lng=77.2090&maxDistance=3000


// Price range + rating filter:

// GET /api/tools?minPrice=100&maxPrice=500&rating=4 */

/*
Externally:

This executes the query you just built dynamically (with filters + sorting).
User only sees the final filtered + sorted list of tools.

Internally:

MongoDB goes through the pipeline step by step:

$geoNear (if given) → finds nearest providers.
$lookup → attaches provider data.
$match → filters tools (available, rating, price, etc.).
$sort → orders the results.

MongoDB streams the documents stage by stage → finally returns an array of JSON objects.
 */

// add text search
// filter by rent unit
// Caching (Optional but Powerful)
// If getAllTools is hit often, add Redis caching:
// Key: tools:${JSON.stringify(req.query)}
// If found in Redis → return cached.
// Else → query MongoDB → set in Redis.

//7. Error Handling Improvements

// Right now only 500.
// Add 404 case if no tools found:

// if (!result.length) {
//   return res.status(404).json({ success: false, message: "No tools found" });
// }

//8. Nearby Sorting (if location is given)

// Right now, you filter nearby, but maybe farmer wants them sorted by closest distance:

// if (lat && lng && sortBy === "distance") {
//   pipeline.push({ $sort: { distance: 1 } });
// }

// Client Request
//  ↓
// Parse query params (filters, sorting, pagination, location)
//  ↓
// Build pipeline (geoNear → lookup → match → sort → skip/limit → project)
//  ↓
// Check Redis cache (if enabled)
//  ↓
// MongoDB aggregate(pipeline)
//  ↓
// Format response (totalPages, currentPage, count, tools[])
//  ↓
// Send JSON response
