import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../constants/colors";
import { Form } from "../../assets/styles/create/create.styles";
import buttonsStyles from "../../assets/styles/create/buttons.styles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const NewRoute = ({
  handleNewRecipe,
  newRecipeState,
  updateNewRecipeState,
}) => {
  return (
    <View style={{ marginTop: 20, flexDirection: "column", gap: 10 }}>
      {/* Title Input */}
      <View style={Form.formGroup}>
        <Text style={Form.label}>Título de la receta</Text>
        <View style={Form.inputContainer}>
          <Ionicons
            name="fast-food-outline"
            size={20}
            color={COLORS.textSecondary}
            style={Form.inputIcon}
          />
          <BottomSheetTextInput
            style={Form.input}
            placeholder="Ej. Pasta con salsa verde"
            placeholderTextColor={COLORS.placeholderText}
            value={newRecipeState.title}
            onChangeText={(title) => updateNewRecipeState({ title })}
          />
        </View>
      </View>

      {/* Description Input */}
      <View style={Form.formGroup}>
        <Text style={Form.label}>Descripción</Text>
        <View style={Form.textAreaContainer}>
          <BottomSheetTextInput
            style={Form.textArea}
            placeholderTextColor={COLORS.placeholderText}
            placeholder="Describe tu idea..."
            onChangeText={(description) =>
              updateNewRecipeState({ description })
            }
            textAlignVertical="top"
            value={newRecipeState.description}
            multiline
          />
        </View>
      </View>

      {/* Submit button */}
      <TouchableOpacity
        style={[
          buttonsStyles.buttonSubmit,
          {
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: "100%",
          },
        ]}
        onPress={handleNewRecipe}
        disabled={newRecipeState.isLoading}
      >
        {newRecipeState.isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={buttonsStyles.buttonTextSubmit}>Crear idea</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NewRoute;
