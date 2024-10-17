const fs = require("fs").promises;
const path = require("path");
const { cloudinary } = require("../config/cloudConfig");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // List all assets in the 'commits' folder from Cloudinary
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "commits/", // List only resources in 'commits/' folder
      max_results: 500,   // Adjust the limit as needed
    });

    const resources = result.resources;

    for (const resource of resources) {
      const publicId = resource.public_id; // Equivalent to 'Key' in S3
      const commitDir = path.join(
        commitsPath,
        path.dirname(publicId).split("/").pop()
      );

      // Create the local directory for this commit
      await fs.mkdir(commitDir, { recursive: true });

      // Download the file using the secure URL
      const fileUrl = resource.secure_url;
      const fileResponse = await fetch(fileUrl); // Fetch file from Cloudinary URL
      const fileContent = await fileResponse.buffer();

      // Save the file locally in the corresponding commit folder
      const localFilePath = path.join(repoPath, `${publicId}${path.extname(resource.url)}`);
      await fs.writeFile(localFilePath, fileContent);

      console.log(`File ${publicId} pulled from Cloudinary.`);
    }

    console.log("All commits pulled from Cloudinary.");
  } catch (err) {
    console.error("Unable to pull: ", err);
  }
}

module.exports = { pullRepo };
