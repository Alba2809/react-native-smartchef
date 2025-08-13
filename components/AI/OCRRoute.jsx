import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import ImagePickerComponent from "../ImagePickerComponent";
import buttonsStyles from "../../assets/styles/create/buttons.styles";

const OCRRoute = ({ handleOCR, ocrState, updateOCRState }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Image picker */}
      <ImagePickerComponent
        image={ocrState.image}
        setImage={(image) => updateOCRState({ image })}
        setImageBase64={(imageBase64) => updateOCRState({ imageBase64 })}
        allowTouch={!ocrState.isLoading}
        imageOptions={{
          allowsEditing: false,
          quality: 1,
        }}
      />

      <TouchableOpacity
        style={[buttonsStyles.buttonSubmit, {
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: "100%",
        }]}
        onPress={handleOCR}
        disabled={ocrState.isLoading}
      >
        {
          ocrState.isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={buttonsStyles.buttonTextSubmit}>Extraer texto</Text>
          )
        }
      </TouchableOpacity>
    </View>
  );
};

export default OCRRoute;
