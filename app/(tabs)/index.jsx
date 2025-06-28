import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/home.styles";
import useAuthStore from "../../store/authScore";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

export default function index() {
  /* Bottom sheet */
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const { user } = useAuthStore();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          padding: 16,
          gap: 8,
        }}
      >
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          // style={styles.containerAI}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
            borderColor: COLORS.border,
            borderRadius: 14,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                width: 45,
                height: 45,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "JetBrainsMono-Medium",
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                SmartChef
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "JetBrainsMono-Medium",
                  color: COLORS.textPrimary,
                }}
              >
                Buen día, {user.username || "Invitado"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.border}
            />
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
        </LinearGradient>

        {/* Search bar with filter and tags */}
        <View
          style={{
            flexDirection: "column",
            padding: 8,
            gap: 14,
            backgroundColor: COLORS.white,
            borderRadius: 14,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Search bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: COLORS.inputBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: COLORS.border,
              paddingHorizontal: 8,
            }}
          >
            <Ionicons name="search-outline" size={20} />
            <TextInput
              style={{
                fontSize: 14,
                fontFamily: "JetBrainsMono-Medium",
                color: COLORS.textDark,
                flex: 1,
              }}
              placeholder="Buscar receta..."
              placeholderTextColor={COLORS.placeholderText}
            />
            <Ionicons name="filter-outline" size={20} />
          </View>

          {/* Tags */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 14,
                flex: 1,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "JetBrainsMono-Medium",
                  color: COLORS.white,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Todas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 14,
                flex: 1,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "JetBrainsMono-Medium",
                  color: COLORS.white,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Guardadas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 14,
                flex: 1,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "JetBrainsMono-Medium",
                  color: COLORS.white,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Mis recetas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipes list */}
        <ScrollView
          style={{ flex: 1, backgroundColor: COLORS.white }}
        ></ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
