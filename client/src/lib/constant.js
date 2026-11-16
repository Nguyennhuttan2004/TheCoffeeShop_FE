export const DOMAIN_BE = (
  import.meta.env.VITE_DOMAIN_BE || `https://thecoffeeshop-server.onrender.com`
).replace(/\/+$/, "");
export const FOLDER_IMAGE_BE = (
  import.meta.env.VITE_FOLDER_IMAGE_BE || "images"
).replace(/^\/+|\/+$/g, "");

export function getImageUrl(image) {
  if (!image) {
    return "";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const imagePath = String(image).replace(/^\/+/, "");
  const normalizedPath = imagePath.startsWith(`${FOLDER_IMAGE_BE}/`)
    ? imagePath
    : `${FOLDER_IMAGE_BE}/${imagePath}`;

  return `${DOMAIN_BE}/${normalizedPath}`;
}
