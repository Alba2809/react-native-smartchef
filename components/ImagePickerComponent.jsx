import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

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
          Alert.alert(
            "Permiso denegado",
            "Es necesario el permiso para seleccionar la imagen"
          );
          return;
        }
      }

      // launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // lower quality for smaller base64
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        // if base64 is provided, use it
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            {
              encoding: "base64",
            }
          );
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.log("Error selecting image: ", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  return (
    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
      {image ? (
        <Image source={{ uri: image }} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons
            name="image-outline"
            size={40}
            color={COLORS.textSecondary}
          />
          <Text style={styles.placeholderText}>
            Seleccionar una imagen
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
