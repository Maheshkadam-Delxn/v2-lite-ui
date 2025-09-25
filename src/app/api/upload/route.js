import { NextResponse } from 'next/server';
import formidable from 'formidable';
import cloudinary from 'cloudinary';

// Configure Cloudinary with environment variable
cloudinary.config({
  cloud_name: 'dfyu429bz',
  api_key: '612156488574362',
  api_secret: 'DcFnMTRrULw1wzIOVU0JQICdEQ4',
});

// Disable Next.js default body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    // Parse form data
    const form = formidable({ multiples: false, maxFileSize: 4.5 * 1024 * 1024 }); // 4.5 MB limit
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file?.[0];
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file.filepath, {
        folder: 'vendor_documents',
        resource_type: 'auto', // Supports PDFs, images, etc.
      }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });

    console.log("Result the Data from Api route: - ",result);
    

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}