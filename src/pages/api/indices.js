export default async function handler(req, res) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const response = await fetch(
      `${apiBaseUrl}/v3/reference/tickers?market=indices&active=true&limit=5&sort=market&apiKey=${apiKey}`
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching indices",
      error: error.message,
    });
  }
}
