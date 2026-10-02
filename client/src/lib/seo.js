export function createMetadata({ title, description, path, robots } = {}) {
  const metadata = {};
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (path) metadata.alternates = { canonical: path };
  if (robots) metadata.robots = robots;
  return metadata;
}
