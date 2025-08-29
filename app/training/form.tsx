import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddExerciseModal } from '../../components/training/AddExerciseModal';
import { ExerciseCard } from '../../components/training/ExerciseCard';
import { Exercise, TrainingSession } from '../../types/training';
import { generateUniqueId } from '../../utils/idGenerator';
import { storage } from '../../utils/storage';

export default function TrainingFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tag, setTag] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState<{date?: string; time?: string; tag?: string}>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  // Get session data for editing
  const params = useLocalSearchParams();
  const sessionId = params.sessionId as string || null;

  useEffect(() => {
    if (sessionId) {
      loadSessionForEditing(sessionId);
    }
  }, [sessionId]);

  useFocusEffect(
    useCallback(() => {
      if (sessionId) {
        loadSessionForEditing(sessionId);
      }
    }, [sessionId])
  );

  const loadSessionForEditing = async (id: string) => {
    try {
      const sessions = await storage.getTrainingSessions();
      const session = sessions.find(s => s.id === id);
      if (session) {
        setDate(session.date);
        setTime(session.time);
        setTag(session.tag);
        setExercises(session.exercises);
        setIsEditing(true);
        setEditingSessionId(session.id);
        
        // Set the selected date for the date/time pickers
        const [day, month, year] = session.date.split('/');
        if (day && month && year) {
          const dateObj = new Date(`${year}-${month}-${day}`);
          if (!isNaN(dateObj.getTime())) {
            setSelectedDate(dateObj);
          }
        }
      }
    } catch (error) {
      console.error('Error loading session for editing:', error);
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    try {
      setExercises([...exercises, exercise]);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
  };

  const handleSaveSession = async () => {
    // Validate required fields
    const newErrors: {date?: string; time?: string; tag?: string} = {};
    
    if (!date.trim()) {
      newErrors.date = 'Date is required';
    }
    
    if (!time.trim()) {
      newErrors.time = 'Time is required';
    }
    
    if (!tag.trim()) {
      newErrors.tag = 'Tag is required';
    }
    
    setErrors(newErrors);
    
    // If no errors, save the session
    if (Object.keys(newErrors).length === 0) {
      try {
        const sessionData: TrainingSession = {
          id: isEditing && editingSessionId ? editingSessionId : generateUniqueId(),
          date: date.trim(),
          time: time.trim(),
          tag: tag.trim(),
          exercises,
        };
        
        if (isEditing && editingSessionId) {
          await storage.updateTrainingSession(sessionData);
        } else {
          await storage.addTrainingSession(sessionData);
        }
        
        router.back();
      } catch (error) {
        console.error('Error saving training session:', error);
      }
    }
  };

  const handleDeleteSession = () => {
    if (isEditing && editingSessionId) {
      Alert.alert(
        'Delete Session',
        'Are you sure you want to delete this training session?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await storage.deleteTrainingSession(editingSessionId);
                router.back();
              } catch (error) {
                console.error('Error deleting session:', error);
              }
            },
          },
        ]
      );
    }
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
          style={styles.contentContainer}
          contentContainerStyle={styles.content}
        >
          <View style={styles.baseDataContainer}>
            <View style={styles.dateTimeInputContainer}>
              <View style={styles.inputField}>
                <Text style={styles.label}>Fecha</Text>
                <Pressable 
                  style={[styles.inputContainer, errors.date && styles.inputContainerError]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={[styles.input, !date && { color: '#B3B3B3' }]} numberOfLines={1}>
                    {date || 'Select date'}
                  </Text>
                </Pressable>
                {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event: any, selectedDateValue: Date | undefined) => {
                      setShowDatePicker(false);
                      if (selectedDateValue) {
                        setSelectedDate(selectedDateValue);
                        // Format date as DD/MM/YYYY
                        const formattedDate = selectedDateValue.toLocaleDateString('es-ES');
                        setDate(formattedDate);
                      }
                    }}
                  />
                )}
              </View>

              <View style={styles.inputField}>
                <Text style={styles.label}>Hora</Text>
                <Pressable 
                  style={[styles.inputContainer, errors.time && styles.inputContainerError]}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={[styles.input, !time && { color: '#B3B3B3' }]} numberOfLines={1}>
                    {time || 'Select time'}
                  </Text>
                </Pressable>
                {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
                {showTimePicker && (
                  <DateTimePicker
                    testID="timePicker"
                    value={selectedDate}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={(event: any, selectedTimeValue: Date | undefined) => {
                      setShowTimePicker(false);
                      if (selectedTimeValue) {
                        setSelectedDate(selectedTimeValue);
                        // Format time as HH:MM AM/PM
                        const formattedTime = selectedTimeValue.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        });
                        setTime(formattedTime);
                      }
                    }}
                  />
                )}
              </View>
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Tag</Text>
              <View style={[styles.inputContainer, errors.tag && styles.inputContainerError]}>
                <TextInput
                  style={styles.input}
                  value={tag}
                  onChangeText={setTag}
                  placeholder="Pierna, brazo, etc"
                  placeholderTextColor="#B3B3B3"
                />
              </View>
              {errors.tag && <Text style={styles.errorText}>{errors.tag}</Text>}
            </View>

            <Pressable 
              style={styles.addExerciseButton} 
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.addExerciseButtonText}>Add exercise</Text>
            </Pressable>
          </View>

          {exercises.length > 0 && (
            <View style={styles.exerciseContainer}>
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onDelete={() => handleDeleteExercise(exercise.id)}
                  disableDelete={false}
                />
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {isEditing && (
            <Pressable style={styles.deleteButton} onPress={handleDeleteSession}>
              <Text style={styles.deleteButtonText}>Delete Session</Text>
            </Pressable>
          )}
          
          <Pressable style={styles.saveButton} onPress={handleSaveSession}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Update Session' : 'Save training session'}
            </Text>
          </Pressable>
        </View>
      </View>

      <AddExerciseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddExercise}
      />
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
  contentContainer: {
    flex: 1,
  },
  content: {
    gap: 24,
    paddingBottom: 16,
  },
  baseDataContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    gap: 16,
  },
  dateTimeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    gap: 16,
  },
  inputField: {
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#1E1E1E',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
  },
  inputContainerError: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 24,
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#FF0000',
    lineHeight: 16,
    marginTop: 4,
  },
  addExerciseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: '#6E4CB0',
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
  addExerciseButtonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#F5F5F5',
    lineHeight: 16,
  },
  exerciseContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 10,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#6E4CB0',
    borderRadius: 99,
  },
  saveButtonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#F5F5F5',
    lineHeight: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FF4444',
    borderRadius: 99,
  },
  deleteButtonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#F5F5F5',
    lineHeight: 20,
  },
});
