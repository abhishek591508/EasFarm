const express = require('express');
const router = express.Router();
const validUser = require('../middlewares/validUser');
const validSurviceProvider = require('../middlewares/validSurviceProvider.js');
const  {register,registerTools,getSpecificProviderTools, getAllTools}= require('../controllers/service_provider.js');


router.post('/provider/register',register);
router.post('/tools/register',validSurviceProvider,registerTools);
router.get('/specific-provider/tools/:providerId',validUser,getSpecificProviderTools);
router.get('/get-all-tools',validUser,getAllTools);

module.exports = router;