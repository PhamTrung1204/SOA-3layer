import { Router } from "express";
import * as controller from "../../controllers/admin/product.controller.js";
import multer from "multer";
import uploadToDrive from "../../middleware/uploadToDrive.js";
import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/tmp"); // Dùng thư mục tạm thay vì /var/task/uploads
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const upload = multer({ dest: "uploads/"});

// const upload = multer({ storage });

const router = Router();

router.get("/", controller.index);
router.get("/productDetail/:id", controller.detail);
router.post(
  "/postProduct",
  upload.array("files", 6),
  uploadToDrive,
  controller.postProduct
);
router.patch(
  "/editProduct/:id",
  upload.array("files", 6),
  uploadToDrive,
  controller.editProduct
);
router.delete("/deleteProduct/:id", controller.deleteProduct);
router.get("/search", controller.search);
router.get("/statistic-brand/:brandId", controller.statisticBrand);

export default router;
