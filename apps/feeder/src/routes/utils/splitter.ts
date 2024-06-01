export async function splitter(path: string) {
  const segments = path.split('/');
  return segments[segments.length - 1];
}
