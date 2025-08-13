import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import ImagePickerComponent from "../ImagePickerComponent";
import buttonsStyles from "../../assets/styles/create/buttons.styles";

const ExtractTextRoute = ({
  handleExtractText,
  extractTextState,
  updateExtractTextState,
}) => {
  return (
    <View style={{ marginTop: 20, flexDirection: "column", gap: 10 }}>
      {/* Image picker */}
      <ImagePickerComponent
        image={extractTextState.image}
        setImage={(image) => updateExtractTextState({ image })}
        setImageBase64={(imageBase64) =>
          updateExtractTextState({ imageBase64 })
        }
        allowTouch={!extractTextState.isLoading}
        imageOptions={{
          allowsEditing: false,
          quality: 1,
        }}
      />

      <TouchableOpacity
        style={[
          buttonsStyles.buttonSubmit,
          {
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: "100%",
          },
        ]}
        onPress={handleExtractText}
        disabled={extractTextState.isLoading}
      >
        {extractTextState.isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={buttonsStyles.buttonTextSubmit}>Extraer texto</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ExtractTextRoute;
