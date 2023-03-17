type dimension = "width" | "original"

export function createImageUrl(path: string, width: number) {
  const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URI;
  const result = `${baseImageUrl}/w${width}${path}`;
  return result;
}

export function createImageUrlBanner(path: string, width: number, type: dimension) {
  const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URI;
  const result = `${baseImageUrl}/${type}${path}`;
  return result;
}
