import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker as ImagePickerStyles } from "../assets/styles/create/create.styles";
import COLORS from "../constants/colors";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

export default function ImagePickerComponent({
  image,
  setImage,
  setImageBase64,
}) {
  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Toast.show({
            type: "error",
            text1: "Permiso denegado",
            text2: "Es necesario el permiso para seleccionar la imagen",
            position: "top",
            text1Style: { fontSize: 14 },
          });
          return;
        }
      }

      // launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        const asset = result.assets[0];

        setImage(asset.uri);

        // if base64 is provided, use it
        if (asset.base64) {
          setImageBase64(asset.base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: "base64",
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.log("Error selecting image: ", error);
      // Alert.alert("Error", "No se pudo seleccionar la imagen");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo seleccionar la imagen",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    }
  };

  return (
    <TouchableOpacity
      style={ImagePickerStyles.imagePicker}
      onPress={pickImage}
      accessibilityLabel="Selector de imagen"
    >
      {image ? (
        <Image source={{ uri: image }} style={ImagePickerStyles.previewImage} />
      ) : (
        <View style={ImagePickerStyles.placeholderContainer}>
          <Ionicons
            name="image-outline"
            size={40}
            color={COLORS.textSecondary}
          />
          <Text style={ImagePickerStyles.placeholderText}>
            Seleccionar una imagen
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
