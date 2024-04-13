import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.APP_KEY;
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  // Проверяем валидность токена
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Если токен валидный, обновляем его и отправляем в куки
    const newToken = jwt.sign(decoded, secretKey);
    res.cookie("token", newToken, { maxAge: 3600000 });

    next();
  });
};

export default authMiddleware;
