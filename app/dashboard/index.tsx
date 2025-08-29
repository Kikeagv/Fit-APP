import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();

  const handleTrainingPress = () => {
    router.push('/training/list');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello!</Text>
      
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleTrainingPress}>
            <Text style={styles.buttonText}>Training</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </Pressable>
          
          <Pressable style={styles.button} onPress={() => router.push('/food')}>
            <Text style={styles.buttonText}>Food</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </Pressable>
          
          <Pressable style={styles.button} onPress={() => router.push('/health')}>
            <Text style={styles.buttonText}>Health</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </Pressable>
          
          <Pressable style={styles.button} onPress={() => router.push('/settings')}>
            <Text style={styles.buttonText}>Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    fontSize: 40,
    fontWeight: "400",
    color: "black",
    marginTop: 28,
    marginLeft: 24,
    fontFamily: "AlbertSans-Regular",
  },
  mainContainer: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 13,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6E4CB1",
    borderRadius: 8,
    padding: 16,
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    fontFamily: "AlbertSans-SemiBold",
  },
});
