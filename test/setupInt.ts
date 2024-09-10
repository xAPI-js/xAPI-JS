beforeEach(() => {
  // Add artificial delay between integration tests to avoid rate limit in SCORM Cloud
  return new Promise((resolve) => setTimeout(() => resolve(null), 250));
});
