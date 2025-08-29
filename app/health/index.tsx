import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HealthScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={32} color="#1E1E1E" />
        </Pressable>
        <Text style={styles.headerText}>Health</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.comingSoonText}>Health tracking feature coming soon</Text>
        <Text style={styles.descriptionText}>Monitor your health metrics and wellness</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 0,
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 40,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 48,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  comingSoonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
