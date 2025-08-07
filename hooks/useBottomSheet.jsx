import { useCallback, useMemo, useRef, useState } from "react";

export default function useBottomSheet({
  BottomSheetViews,
  BottomSheetConfig,
  dataProps = {},
}) {
  const bottomSheetRef = useRef(null);
  const [bsView, setBsView] = useState(() => {
    const defaultKey = Object.keys(BottomSheetViews)[0];
    return BottomSheetViews[defaultKey];
  });
  const currentBsConfig = BottomSheetConfig[bsView];

  const handlePresentModalPress = useCallback((keyView) => {
    setBsView(keyView);
    bottomSheetRef.current?.present();
  }, []);

  const bottomSheetContent = useMemo(() => {
    if (!currentBsConfig) return null;

    const content = currentBsConfig.content;

    return typeof content === "function" ? content(dataProps) : content;
  }, [bsView, BottomSheetConfig, dataProps])

  return {
    handlePresentModalPress,
    currentBsConfig,
    bottomSheetRef,
    bottomSheetContent,
  };
}
