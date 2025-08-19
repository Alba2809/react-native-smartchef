import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import COLORS from "../../constants/colors";
import NewRoute from "./NewRoute";
import FromPhotoRoute from "./FromPhotoRoute";
import ExtractTextRoute from "./ExtractTextRoute";

const routes = [
  { key: "first", title: "Extraer" },
  { key: "second", title: "Nueva" },
  { key: "third", title: "Desde foto" },
];

function AITabs({ ExtractTextOptions, NewRouteOptions, FromPhotoRouteOptions } = {}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  
  /* const renderScene = SceneMap({
    first: <OCRRoute {...ExtractTextOptions} />,
    second: <SecondRoute {...NewRouteOptions} />,
    third: <ThirdRoute {...FromPhotoRouteOptions} />,
  }); */
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <ExtractTextRoute {...ExtractTextOptions} />;
      case "second":
        return <NewRoute {...NewRouteOptions} />;
      case "third":
        return <FromPhotoRoute {...FromPhotoRouteOptions} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, height: 350 }}>
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
