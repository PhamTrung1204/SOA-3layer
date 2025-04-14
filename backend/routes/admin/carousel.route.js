import { Router } from "express";
import carouselController from "../../controllers/admin/carosel.controller.js";
import multer from "multer";
import uploadToDrive from "../../middleware/uploadToDrive.js";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp"); // Dùng thư mục tạm thay vì /var/task/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const carouselRouter = Router();

// Xem
carouselRouter.get("/", carouselController.showCarousel);

// Xóa
carouselRouter.delete("/:id", carouselController.delCarousel);

// Thêm
carouselRouter.post(
  "/",
  upload.array("files", 1),
  uploadToDrive,
  carouselController.addCarousel
);

// Cập nhật
carouselRouter.patch(
  "/:id",
  upload.array("files", 1),
  uploadToDrive,
  carouselController.updateCarousel
);

export default carouselRouter;
