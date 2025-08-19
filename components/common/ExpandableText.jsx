import { Text, TouchableOpacity } from "react-native";

const ExpandableText = ({
  text,
  lines = 5,
  isExpanded = false,
  onToggle = () => {},
  styles = { container: {}, text: {} },
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Text style={styles.text} numberOfLines={isExpanded ? undefined : lines}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ExpandableText;
