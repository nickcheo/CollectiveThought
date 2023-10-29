import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../db/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectToMongoDB();

    // Perform MongoDB operations using the 'client' reference

    // For example, you can fetch data from a MongoDB collection:
    const collection = client.db("your-database-name").collection("your-collection-name");
    const data = await collection.find({}).toArray();

    // Close the MongoDB connection when done
    await client.close();

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to MongoDB." });
  }
};
