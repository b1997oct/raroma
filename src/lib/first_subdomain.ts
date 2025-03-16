export default function first_subdomain(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    console.log('hostname: ', hostname);
    const parts = hostname.split(".");
    return parts[1];
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

