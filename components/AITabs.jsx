import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import COLORS from "../constants/colors";

const FirstRoute = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>First</Text>
    </View>
  );
};

const SecondRoute = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Second</Text>
    </View>
  );
};

const ThirdRoute = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Third</Text>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const routes = [
  { key: "first", title: "Extraer texto" },
  { key: "second", title: "Nueva idea" },
  { key: "third", title: "Usar imagen" },
];

function AITabs({ handleLoading }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "white" }}
            activeColor={COLORS.primary}
            inactiveColor="lightgray"
            indicatorStyle={{ backgroundColor: COLORS.primary }}
          />
        )}
      />
    </View>
  );
}

export default AITabs;
