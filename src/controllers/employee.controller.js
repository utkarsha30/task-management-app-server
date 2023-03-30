const employeeService = require("../services/employee.service");
const cloudinary = require("cloudinary").v2;
const { Errors } = require("../constants");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRETE,
  });
const findEmployee = async(req,res,next)=>{
    const loggedinUser = res.locals.claims;
    try{
        const match = await employeeService.getEmployeeDetails(loggedinUser._id);
        if (!match) {
            const error = new Error(`Employee with ${id} does not exist`);
            error.name = Errors.NotFound;
            return next(error);
          }
          res.status(200).json(match);

    }catch(error){
        next(error);
    }
}
const updateEmployeeDetails = async(req,res,next)=>{
    const loggedinUser = res.locals.claims;
    let file = '';
    try{
        if(req.files.profilepic)
        {
            file = req.files.profilepic;
            console.log("file",file);
            const result = await cloudinary.uploader.upload(
                file.tempFilePath,
                { folder: "TaskManagementProfilePics", public_id: file.name },
                async (err, image) => {
                  console.log("check");
                  if (err) {
                    console.log(err);
                  }
                  console.log(image);
                }
              );
              req.files.profilepic = result.secure_url;
              }        
       
        const updatedProfile = await employeeService.updateEmployeeDetails(loggedinUser._id,req.files);
              if (updatedProfile === null) {
                      const error = new Error(`Employee with id = ${loggedinUser._id} does not exist`);
                      error.name = Errors.NotFound;
                
                      return next(error);
                    }
            res.status(200).json(updatedProfile);
        
    }catch(error){
        next(error);
    }
}
module.exports={
    findEmployee,
    updateEmployeeDetails
}