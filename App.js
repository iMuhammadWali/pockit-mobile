// React Native UI primitives
import { ActivityIndicator, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

// App state and hooks
import useAppFonts from "./src/hooks/useAppFonts";
import { ExpenseProvider } from "./src/context/ExpenseContext";
import { AuthProvider } from "./src/context/AuthContext";
import useAuth from "./src/hooks/useAuth";

// Screens
import AddEntryScreen from "./src/screens/AddEntryScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import HomeSreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from "./src/screens/RegisterScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import WalletSetupFlowScreen from "./src/screens/WalletSetupFlowScreen";
import WalletsScreen from "./src/screens/WalletsScreen";

// Custom navigation components
import LiquidGlassTabBar from "./src/components/LiquidGlassTabBar";
// For now I will code the navigation in the app.js and will export it later to a different file or maybe create a different folder for it later.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      // `tabBar={(props) => <LiquidGlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeSreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Wallets" component={WalletsScreen} 
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name={focused ? "wallet" : "wallet-outline"} size={size} color={color}/>
        )
      }}/>
      <Tab.Screen
        name="AddEntry"
        component={AddEntryScreen}
        options={{
          title: "Add New Entry",
          tabBarLabel: "Add Entry",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "time" : "time-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  const {isNewUser} = useAuth();  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    initialRouteName={isNewUser? "WalletSetupFlow" : "HomeTabs"}
    >
      <Stack.Screen name="WalletSetupFlow" component={WalletSetupFlowScreen}/>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
};

const AppContent = () => {
  const { isLoggedIn, isLoading } = useAuth();

  const fontsLoaded = useAppFonts();
  if (!fontsLoaded || isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }
  return (
    <ExpenseProvider>
      <NavigationContainer>
        {isLoggedIn ? <RootStack /> : <AuthStack />}
      </NavigationContainer>
    </ExpenseProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
