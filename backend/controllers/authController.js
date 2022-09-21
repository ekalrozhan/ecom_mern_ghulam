const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// register a user =>  /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/leio-mclaren-L2dTmhQzx4Q-unsplash_f3yjhn",
      url: "https://res.cloudinary.com/dmtuoxiiu/image/upload/v1663755796/avatars/leio-mclaren-L2dTmhQzx4Q-unsplash_f3yjhn.jpg",
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});
