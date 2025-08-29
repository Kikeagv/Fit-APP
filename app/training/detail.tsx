import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExerciseCard } from '../../components/training/ExerciseCard';
import { TrainingSession, tagColors } from '../../types/training';
import { storage } from '../../utils/storage';

export default function TrainingDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { sessionId } = useLocalSearchParams();
  const [session, setSession] = useState<TrainingSession | null>(null);

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  useFocusEffect(
    useCallback(() => {
      loadSession();
    }, [sessionId])
  );

  const loadSession = async () => {
    if (typeof sessionId !== 'string') return;
    
    const sessions = await storage.getTrainingSessions();
    const foundSession = sessions.find(s => s.id === sessionId);
    setSession(foundSession || null);
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

  if (!session) {
    return (
      <View style={styles.container}>
        <View style={dynamicStyles.headerContainer}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={32} color="#1E1E1E" />
          </Pressable>
          <Text style={styles.headerText}>Training</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.notFoundText}>Session not found</Text>
        </View>
      </View>
    );
  }

  const handleEdit = () => {
    router.push(`/training/form?sessionId=${session.id}`);
  };

  const tagColor = tagColors[session.tag] || tagColors.default;

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
          style={styles.contentContainer}
          contentContainerStyle={styles.content}
        >
          <View style={styles.sessionInfoContainer}>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateText}>{session.date}</Text>
              <Text style={styles.timeText}>{session.time}</Text>
            </View>
            <View 
              style={[
                styles.tagContainer, 
                { backgroundColor: tagColor.backgroundColor }
              ]}
            >
              <Text 
                style={[
                  styles.tagText, 
                  { color: tagColor.textColor }
                ]}
              >
                {session.tag}
              </Text>
            </View>
          </View>

          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>Exercises</Text>
            {session.exercises.length > 0 ? (
              <View style={styles.exercisesList}>
                {session.exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onDelete={() => {}}
                    disableDelete={true}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.noExercisesText}>No exercises added</Text>
            )}
          </View>
        </ScrollView>

        <Pressable style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Edit training session</Text>
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
  editButton: {
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
  editButtonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#F5F5F5',
    lineHeight: 20,
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
  contentContainer: {
    flex: 1,
  },
  content: {
    gap: 24,
    paddingBottom: 16,
  },
  sessionInfoContainer: {
    flexDirection: 'column',
    gap: 16,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 24,
  },
  timeText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 19,
  },
  tagContainer: {
    alignSelf: 'flex-start',
    borderRadius: 99,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  tagText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },
  exercisesContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  exercisesTitle: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 29,
  },
  exercisesList: {
    flexDirection: 'column',
    gap: 16,
  },
  noExercisesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 16,
  },
  notFoundText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 50,
  },
});
