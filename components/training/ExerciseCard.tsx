import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Exercise } from '../../types/training';

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete: () => void;
  disableDelete?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onDelete, disableDelete = false }) => {
  const handleDelete = () => {
    if (!disableDelete) {
      onDelete();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.setsContainer}>
          <Text style={styles.setsText}>
            {exercise.reps || 0}x{exercise.sets || 0}
          </Text>
          <Text style={styles.weightText}>
            {exercise.weight || 0}lb
          </Text>
        </View>
      </View>
      {!disableDelete && (
        <Pressable 
          onPress={handleDelete} 
          style={styles.deleteButton}
        >
          <Ionicons 
            name="trash" 
            size={24} 
            color="#1E1E1E" 
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  detailsContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  exerciseName: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 24,
  },
  setsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  setsText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 19,
  },
  weightText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 19,
  },
  deleteButton: {
    padding: 4,
  },
});
