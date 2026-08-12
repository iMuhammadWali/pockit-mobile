import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import SingleSettingsItem from "../components/SingleSettingsItem";
import ConfirmationDialog from "../components/ConfirmationDialog";
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

const ProfileSection = () => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>W</Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.profileName}>Wali</Text>
        <Text style={styles.profileEmail}>wali@pockit.com</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C4A882" />
    </View>
  );
};

const SettingsScreen = () => {
  const { logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // I can add icons here as well but I wont do it myself. I will let GPT do it.
  const options = [
    {
      title: "Sync Online",
      icon: "cloud-upload-outline",
      iconColor: "#4CAF50",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      iconColor: "#E53935",
      onPress: () => {
        setIsLogoutDialogOpen(true);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header pageName="Settings" />
      <View style={styles.contentContainer}>
        {/* Profile Card component */}
        <ProfileSection />

        {options.map((item, index) => (
          <SingleSettingsItem key={index} item={item}></SingleSettingsItem>
        ))}
      </View>

      <ConfirmationDialog
        isOpen={isLogoutDialogOpen}
        title="Are you sure you want to logout?"
        confirmLabel="Logout"
        onCancel={() => setIsLogoutDialogOpen(false)}
        onConfirm={() => {
          setIsLogoutDialogOpen(false);
          logout();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf7",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fdf7f0",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#C4A882",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d75d69",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
  },
  profileDetails: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#000",
  },
  profileEmail: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#7a2a35",
    marginTop: 2,
  },
});

export default SettingsScreen;

