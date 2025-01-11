import connection from '../db/connection.js';


const queryPromise = (query, params) => {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (err, results) => {
        if (err) {
          reject(err);  // Reject the promise if there's an error
        } else {
          resolve(results);  // Resolve the promise if successful
        }
      });
    });
  };
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.body; // Extract 'id' from the request body

    console.log('file',req.file);
    console.log('id',req.body)
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // File path to be stored
    const filePath = `/uploads/${file.filename}`;
    console.log('actul file path',filePath);

    // Insert file path into the database for the given ID
    const query = 'UPDATE papers SET file_url = ? WHERE paper_id = ?';
    await queryPromise(query, [filePath, id]);

    res.status(200).json({
      message: 'File uploaded and saved successfully',
      filePath,
    });
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).json({ message: 'An error occurred during file upload' });
  }
};

export const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    // Fetch the file path from the database
    const query = 'SELECT file_url FROM papers WHERE id = ?';
    const rows = await queryPromise(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No file found for the given ID' });
    }

    const { file_path } = rows[0];
    res.status(200).json({ filePath: file_path });
  } catch (error) {
    console.error('Error fetching file by ID:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching the file' });
  }
};