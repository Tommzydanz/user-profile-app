import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigationContainer from "./src/navigation/AppNavigationContainer";
import { Provider } from "react-redux";
import { store } from "@store/main";
import { initInterceptors } from "@utils/axios-utils/axiosInterceptors";


// init axios interceptor
initInterceptors();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigationContainer />
      </SafeAreaProvider>
    </Provider>
  );
}

