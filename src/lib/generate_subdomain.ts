function generate_subdomain(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); 
}

export default generate_subdomain