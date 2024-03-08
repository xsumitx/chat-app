const multer = require('multer');
const AWS = require('aws-sdk');
const User = require('../models/User');
const GroupMessages = require('../models/GroupMessage');
const GroupMember = require('../models/GroupMember');

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // specifying the field name

// Configure AWS S3 with your credentials
const s3 = new AWS.S3({
  accessKeyId:  'AKIAXYKJSCJVK4W7VAWI',
  secretAccessKey:  'K7in9NaGyowcpRdYZ+4OcjobtflsobPtEg48rPQq',
  region:  'ap-southeast-2',
});

module.exports = {
    uploadToS3: (req, res) => {
        const groupid = req.params.groupId;
        const userid = req.user.id;

        try {
            // Handle file upload using multer
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    console.error('Multer Error:', err);
                    return res.status(400).json({ error: 'Error uploading file', success: false });
                } else if (err) {
                    // An unknown error occurred when uploading.
                    console.error('Unknown Error:', err);
                    return res.status(500).json({ error: 'Unknown error occurred', success: false });
                }

                // Check if a file was provided
                if (!req.file) {
                    return res.status(400).json({ error: 'No image file provided' });
                }
                const uniqueFilename = `user_${userid}_${Date.now()}_${req.file.originalname}`;
                // Define S3 upload parameters
                const params = {
                    Bucket: 'chatappbucket2212', // Use your bucket name
                    Key: uniqueFilename, // Adjust key as needed
                    Body: req.file.buffer, // Use buffer from multer's req.file
                    ContentType: req.file.mimetype // Set the content type based on multer's req.file
                };

                // Upload image to S3
                s3.upload(params, async function (err, data) {
                    if (err) {
                        console.error('Error uploading image to S3:', err);
                        return res.status(500).json({ error: 'Error uploading image to S3', success: false });
                    }

                    console.log('Image uploaded successfully to S3:', data.Location);

                    // Find user
                    try {
                      const user = await User.findOne({ where: { id: userid } });
                        if (user) {
                            // Create group message
                            try {
                                await GroupMessages.create({
                                    groupId: groupid,
                                    name: 'Sumit', // Consider getting the user's actual name here
                                    userId: userid,
                                    groupMessage: data.Location
                                });
                                res.status(200).json({ message: 'Image uploaded and group message created successfully', success: true });
                            } catch (error) {
                                console.error('Error creating group message:', error);
                                res.status(500).json({ error: 'Error creating group message', success: false });
                            }
                        } else {
                            res.status(404).json({ error: 'User not found', success: false });
                        }
                    } catch (error) {
                        console.error('Error finding user:', error);
                        res.status(500).json({ error: 'Error finding user', success: false });
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error', success: false });
        }
    },
    
};
