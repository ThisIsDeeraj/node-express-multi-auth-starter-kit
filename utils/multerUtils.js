
import multer from "multer";
import fs from "fs";

// Function to determine the destination directory dynamically
function getDestinationDirectory(req, file, cb) {
  let destinationDirectory;

  // Determine the destination directory based on criteria (e.g., user roles, route paths)
  // Modify this logic to match your specific requirements
  if (req.path.startsWith('/seller')) {
    destinationDirectory = 'uploads/sellers/';
  } else if (req.path.startsWith('/client')) {
    destinationDirectory = 'uploads/clients/';
  } else {
    destinationDirectory = 'uploads/default/';
  }

  // Ensure the destination directory exists
  fs.mkdirSync(destinationDirectory, { recursive: true });

  // Provide the destination directory to multer
  cb(null, destinationDirectory);
}

// Create a multer instance with dynamic destination
const storage = multer.diskStorage({
  destination: getDestinationDirectory,
  filename: (req, file, cb) => {
    // Generate a unique file name (you can customize this logic)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Configure multer to accept both single and multiple files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit (adjust as needed)
  },
});
// Create a separate multer instance with adjusted limits for multiple file uploads
const uploadMultiple = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 30, // 30MB file size limit (for multiple file uploads)
    },
  });
  
  export { upload, uploadMultiple };
