export default function sitemap() {
  const baseUrl = "https://photocartoon.xyz"; // Replace with your actual domain
  const languages = ["en", "hi", "zh", "fr", "es", "de"];

  const urls = languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date().toISOString().split("T")[0], // Today’s date
    changeFrequency: "daily",
    priority: 0.7, // Higher priority for language pages
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...urls,
  ];
}
