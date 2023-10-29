// pages/api/test-mongodb.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../db/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectToMongoDB();
    if (client.isConnected()) {
      res.status(200).json({ message: "Connected to MongoDB!" });
    } else {
      res.status(500).json({ error: "Failed to connect to MongoDB." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to MongoDB." });
  }
};
