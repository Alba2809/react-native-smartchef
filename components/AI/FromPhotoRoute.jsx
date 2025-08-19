import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import buttonsStyles from "../../assets/styles/create/buttons.styles";
import ImagePickerComponent from "../common/ImagePickerComponent";

const FromPhotoRoute = ({
  handleFromPhoto,
  fromPhotoState,
  updateFromPhotoState,
}) => {
  return (
    <View style={{ marginTop: 20, flexDirection: "column", gap: 10 }}>
      {/* Image picker */}
      <ImagePickerComponent
        image={fromPhotoState.image}
        setImage={(image) => updateFromPhotoState({ image })}
        setImageBase64={(imageBase64) => updateFromPhotoState({ imageBase64 })}
        allowTouch={!fromPhotoState.isLoading}
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
        onPress={handleFromPhoto}
        disabled={fromPhotoState.isLoading}
      >
        {fromPhotoState.isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={buttonsStyles.buttonTextSubmit}>Deducir receta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FromPhotoRoute;
