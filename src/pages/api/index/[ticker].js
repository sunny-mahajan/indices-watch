export default async function handler(req, res) {
  const { ticker } = req.query;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const response = await fetch(
      `${apiBaseUrl}/v2/aggs/ticker/${ticker}/range/1/hour/2024-07-10/2024-07-10?sort=asc&apiKey=${apiKey}`
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching index details",
      error: error.message,
    });
  }
}
