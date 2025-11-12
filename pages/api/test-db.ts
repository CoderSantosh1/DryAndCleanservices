import connectDB from "@/lib/dbConnect";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ message: "✅ MongoDB Connected Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "❌ Connection Failed", details: error.message });
  }
}

