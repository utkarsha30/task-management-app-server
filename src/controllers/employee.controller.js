const employeeService = require('../services/employee.service');
const cloudinary = require('cloudinary').v2;
const { Errors } = require('../constants');
const nodemailer = require('nodemailer');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
// Generate an OTP and send it to the user's email
const generateOTP = () => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Reset your password',
    text: `Your OTP is ${otp}. Enter this OTP on the reset password page to set up a new password.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return otp;
};

const findEmployee = async (req, res, next) => {
  const loggedinUser = res.locals.claims;
  try {
    const match = await employeeService.getEmployeeDetails(
      loggedinUser._id
    );
    if (!match) {
      const error = new Error(`Employee with ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};
const updateEmployeeDetails = async (req, res, next) => {
  const loggedinUser = res.locals.claims;
  const { name, managerId } = req.body;
  let file = '';
  try {
    if (req.files.profilepic) {
      file = req.files.profilepic;
      console.log('file', file);
      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'TaskManagementProfilePics', public_id: file.name },
        async (err, image) => {
          console.log('check');
          if (err) {
            console.log(err);
          }
          // console.log(image);
        }
      );
      req.files.profilepic = result.secure_url;
    }
    const update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.managerId) update.name = req.body.managerId;
    if (req.files.profilepic)
      update.profilepic = req.files.profilepic;
    const updatedProfile =
      await employeeService.updateEmployeeDetails(
        loggedinUser._id,
        update
      );
    if (updatedProfile === null) {
      const error = new Error(
        `Employee with id = ${loggedinUser._id} does not exist`
      );
      error.name = Errors.NotFound;

      return next(error);
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  findEmployee,
  updateEmployeeDetails,
};
