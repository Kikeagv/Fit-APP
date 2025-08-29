import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TrainingSessionCard } from '../../components/training/TrainingSessionCard';
import { TrainingSession } from '../../types/training';
import { storage } from '../../utils/storage';

export default function TrainingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [])
  );

  const loadSessions = async () => {
    try {
      setLoading(true);
      const loadedSessions = await storage.getTrainingSessions();
      // Sort sessions by date (newest first)
      const sortedSessions = loadedSessions.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);
        
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
      setSessions(sortedSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSession = () => {
    router.push('/training/add');
  };

  const handleSessionPress = (session: TrainingSession) => {
    router.push(`/training/view?sessionId=${session.id}`);
  };

  const dynamicStyles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 24,
      paddingTop: insets.top,
      paddingBottom: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={32} color="#1E1E1E" />
        </Pressable>
        <Text style={styles.headerText}>Training</Text>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.sessionsContainer}
          contentContainerStyle={styles.sessionsContent}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading sessions...</Text>
            </View>
          ) : sessions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No training sessions yet</Text>
              <Text style={styles.emptySubtext}>Add your first session to get started</Text>
            </View>
          ) : (
            sessions.map((session) => (
              <TrainingSessionCard
                key={session.id}
                session={session}
                onPress={() => handleSessionPress(session)}
              />
            ))
          )}
        </ScrollView>

        <Pressable style={styles.addButton} onPress={handleAddSession}>
          <Text style={styles.addButtonText}>Add a training session</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  mainContainer: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sessionsContainer: {
    flex: 1,
  },
  sessionsContent: {
    gap: 16,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#6E4CB0',
    borderRadius: 99,
    marginTop: 10,
  },
  addButtonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#F5F5F5',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    gap: 8,
  },
  emptyText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 22,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
});
