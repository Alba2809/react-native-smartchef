import * as FileSystem from "expo-file-system";

export const imageData = async (uri, base64Original) => {
  const base64 = base64Original ?? await getBase64(uri);
  const type = imageType(uri);
  return `data:${type};base64,${base64}`;
};

export const getBase64 = async (uri) => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
};

export const imageType = (uri) => {
  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];
  return fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
};

export const getImageName = (uri) => {
  const array = uri.split("/");
  const fileName = array[array.length - 1];
  return fileName;
};

export const deleteImage = async (uri) => {
  const filename = getImageName(uri);
  const directory = `${FileSystem.documentDirectory}recipes/${filename}`;

  const fileInfo = await FileSystem.getInfoAsync(directory);

  if (!fileInfo.exists) return true;

  await FileSystem.deleteAsync(directory, { idempotent: true });

  // check if the image was deleted
  const check = await FileSystem.getInfoAsync(directory);

  return check.exists;
};
