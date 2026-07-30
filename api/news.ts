export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800');

  if (!process.env.GNEWS_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=6&apikey=${process.env.GNEWS_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `GNews API returned ${response.status}` });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: 'Failed to fetch news' });
  }
}
