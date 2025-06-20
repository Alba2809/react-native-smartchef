import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../../assets/styles/create.styles";
import { useCallback, useRef, useState } from "react";
import BottomSheetManager from "../../components/BottomSheetManager";

export default function index() {
  /* Bottom sheet */
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text>index</Text>

      {/* Categories bottom sheet */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Categorías</Text>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text style={styles.buttonText}>Seleccionar categorías</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetManager bottomSheetRef={bottomSheetRef} title="Test">
        <View>
          <Text>Bottom sheet content</Text>
        </View>
      </BottomSheetManager>
    </KeyboardAvoidingView>
  );
}
