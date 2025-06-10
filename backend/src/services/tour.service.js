const Tour = require("../models/tour.model");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const getAllTours = async (filter) => {
  let query = {};

  // Lọc theo tên tour
  if (filter.name) {
    query.name = { $regex: filter.name, $options: "i" };
  }

  // Lọc theo địa điểm chính (location)
  if (filter.location) {
    query.location = { $regex: filter.location, $options: "i" };
  }

  // Lọc theo điểm xuất phát
  if (filter.start_location) {
    query.start_location = { $regex: filter.start_location, $options: "i" };
  }

  // Lọc theo điểm đến (nằm trong mảng destinations)
  if (filter.destination) {
    query.destinations = {
      $elemMatch: { $regex: filter.destination, $options: "i" },
    };
  }

  // Lọc theo khoảng giá
  if (filter.price && /^\d+(\.\d+)?-\d+(\.\d+)?$/.test(filter.price)) {
    const [minPrice, maxPrice] = filter.price.split("-").map(Number);
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  // Lọc theo thời lượng (duration số)
  if (filter.duration && /^\d+-\d+$/.test(filter.duration)) {
    const [minDuration, maxDuration] = filter.duration.split("-").map(Number);
    query.duration = { $gte: minDuration, $lte: maxDuration };
  }

  // Hoặc lọc theo lịch trình dạng chuỗi (schedule)
  if (filter.schedule) {
    query.schedule = { $regex: filter.schedule, $options: "i" };
  }

  // Lọc theo trạng thái tour
  if (filter.status) {
    query.status = filter.status;
  }

  // Lọc theo sức chứa tối đa
  if (filter.capacity && !isNaN(filter.capacity)) {
    query.capacity = { $lte: parseInt(filter.capacity) };
  }

  // Lọc theo số slot còn trống (available_slots >= x)
  if (filter.slots_gte && !isNaN(filter.slots_gte)) {
    query.available_slots = { $gte: parseInt(filter.slots_gte) };
  }

  // Lọc theo ngày bắt đầu
  if (filter.start_date && filter.end_date) {
    query.start_date = { $gt: new Date(filter.start_date) }; // start_date phải > ngày được chọn
    query.end_date = { $lt: new Date(filter.end_date) }; // end_date phải < ngày được chọn
  } else if (filter.start_date) {
    query.start_date = { $gt: new Date(filter.start_date) }; // start_date > ngày được chọn
  } else if (filter.end_date) {
    query.end_date = { $lt: new Date(filter.end_date) }; // end_date < ngày được chọn
  }

  // Lọc theo phương tiện di chuyển
  if (filter.transport) {
    query.transport = { $regex: filter.transport, $options: "i" };
  }

  // Lọc theo loại tour (category ID)
  if (filter.category) {
    query.category = filter.category;
  }

  // Lọc theo các tiện ích bao gồm (mảng includes)
  if (filter.include) {
    query.includes = { $elemMatch: { $regex: filter.include, $options: "i" } };
  }

  // Lọc theo những gì không bao gồm (mảng excludes)
  if (filter.exclude) {
    query.excludes = { $elemMatch: { $regex: filter.exclude, $options: "i" } };
  }

  // Xử lý sắp xếp
  const sortOptions = filter.sort_by
    ? { [filter.sort_by]: filter.sort_order === "desc" ? -1 : 1 }
    : { created_at: -1 };
  return await Tour.find(query).sort(sortOptions);
};

const getTourById = async (id) => {
  return await Tour.findById(id);
};

const createTour = async (tourData, files) => {
  const images = await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "tours/images",
      });
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    })
  );

  const slug = slugify(tourData.name, { lower: true, strict: true });

  const newTour = new Tour({ ...tourData, images, slug });
  return await newTour.save();
};

const updateTour = async (id, updatedData, files) => {
  const existingTour = await Tour.findById(id);
  if (!existingTour) return null;

  // Nếu có ảnh mới thì upload và nối thêm vào images
  if (files && files.length > 0) {
    const newImages = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "tours/images",
        });
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    // Nối ảnh cũ + ảnh mới
    updatedData.images = [...existingTour.images, ...newImages];
  }

  return await Tour.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteTour = async (id) => {
  const tour = await Tour.findById(id);
  if (!tour) return null;

  // Xóa ảnh trên Cloudinary
  if (tour.images && tour.images.length > 0) {
    for (const img of tour.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }
  }

  return await Tour.findByIdAndDelete(id);
};

const deleteTourImage = async (tour_id, image_id) => {
  const tour = await Tour.findById(tour_id);
  if (!tour) return null;

  // Tìm chỉ số của ảnh trong mảng images dựa vào _id
  const imageIndex = tour.images.findIndex(
    (img) => img._id.toString() === image_id
  );
  if (imageIndex === -1) return null;

  const image = tour.images[imageIndex];

  // Xóa ảnh trên Cloudinary nếu có public_id
  if (image.public_id) {
    await cloudinary.uploader.destroy(image.public_id);
  }

  // Xóa ảnh khỏi mảng images
  tour.images.splice(imageIndex, 1);

  // Lưu lại Tour
  await tour.save();

  return true; // Trả về true để báo đã xóa thành công
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  deleteTourImage,
};
