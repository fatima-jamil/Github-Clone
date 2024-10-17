const fs = require("fs").promises;
const path = require("path");
const { cloudinary } = require("../config/cloudConfig");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);

        // Determine the file extension to check if it's an image
        const fileExtension = path.extname(file).toLowerCase();
        let resourceType = "image"; // Default resource type is image

        // If the file is not an image, set resource type to raw
        if (!['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
          resourceType = "raw"; // Use raw for non-image files
        }

        // Upload file to Cloudinary with appropriate resource type
        await cloudinary.uploader.upload(filePath, {
          folder: `commits/${commitDir}`, // Specify folder
          use_filename: true,             // Use the original filename
          resource_type: resourceType,    // Set the resource type based on file extension
        });

        console.log(`File ${file} from commit ${commitDir} pushed to Cloudinary.`);
      }
    }

    console.log("All commits pushed to Cloudinary.");
  } catch (err) {
    console.error("Error pushing to Cloudinary: ", err);
  }
}

module.exports = { pushRepo };
