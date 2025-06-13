const MODE = import.meta.env.VITE_QUICKTIFY_MODE || 'development';

export const MODEL_API_URL =
  MODE === 'development'
    ? 'http://localhost:9000'
    : 'https://model-api-752562206940.asia-southeast2.run.app';

export const SCRAPER_API_URL =
  MODE === 'development'
    ? 'http://localhost:8181'
    : 'https://scraper-api-752562206940.asia-southeast2.run.app';
