import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect } from "react";
import { Keyboard, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../assets/styles/bottomSheet.styles";

export default function BottomSheetManager({
  children,
  title = "",
  bottomSheetRef,
  snapPoints = ["50%"],
}) {
  const insets = useSafeAreaInsets();

  /* Background */
  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  /* Keyboard */
  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      // Reset the snap point to the initial position
      bottomSheetRef?.current?.snapToIndex(0);
    });

    return () => keyboardHideListener.remove();
  }, [bottomSheetRef]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      keyboardBehavior="interactive"
    >
      <Text style={styles.title}>{title}</Text>
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollView}
        nestedScrollEnabled={true}
      >
        {children}
      </BottomSheetScrollView>

      {/* Bottom padding */}
      <View style={{ height: insets.bottom }} />
    </BottomSheetModal>
  );
}
