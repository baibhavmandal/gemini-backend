import { verifyToken } from "../services/jwtService.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader)
      return res
        .status(401)
        .json({ success: false, message: "Authorization header missing" });

    const authHeaderArray = authHeader.split(" ");
    if (authHeaderArray.length !== 2 || authHeaderArray[0] !== "Bearer")
      return res
        .status(401)
        .json({ success: false, message: "'Invalid Authorization Format" });

    const token = authHeaderArray[1];
    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Auth", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired  token" });
  }
};

export default authMiddleware;
