import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Exercise } from '../../types/training';
import { generateUniqueId } from '../../utils/idGenerator';

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
}

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [errors, setErrors] = useState<{name?: string; sets?: string; reps?: string; weight?: string}>({});

  const validateInputs = () => {
    const newErrors: {name?: string; sets?: string; reps?: string; weight?: string} = {};
    
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Exercise name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Exercise name must be at least 2 characters';
    }
    
    // Validate sets
    if (sets.trim()) {
      const setsValue = parseInt(sets);
      if (isNaN(setsValue) || setsValue < 0 || setsValue > 20) {
        newErrors.sets = 'Sets must be between 0 and 20';
      }
    }
    
    // Validate reps
    if (reps.trim()) {
      const repsValue = parseInt(reps);
      if (isNaN(repsValue) || repsValue < 0 || repsValue > 100) {
        newErrors.reps = 'Reps must be between 0 and 100';
      }
    }
    
    // Validate weight
    if (weight.trim()) {
      const weightValue = parseInt(weight);
      if (isNaN(weightValue) || weightValue < 0 || weightValue > 2000) {
        newErrors.weight = 'Weight must be between 0 and 2000 lbs';
      }
    }
    
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateInputs();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const newExercise: Exercise = {
          id: generateUniqueId(),
          name: name.trim(),
          sets: parseInt(sets) || 0,
          reps: parseInt(reps) || 0,
          weight: parseInt(weight) || 0,
        };
        
        onSave(newExercise);
        
        // Reset form
        setName('');
        setSets('');
        setReps('');
        setWeight('');
        setErrors({});
      } catch (error) {
        console.error('Error saving exercise:', error);
      }
    }
  };

  const handleCancel = () => {
    // Reset form
    setName('');
    setSets('');
    setReps('');
    setWeight('');
    setErrors({});
    onClose();
  };

  const handleSetsChange = (text: string) => {
    // Only allow numbers
    if (text === '' || /^\d+$/.test(text)) {
      setSets(text);
      // Clear error if valid
      if (errors.sets && (text === '' || (parseInt(text) >= 0 && parseInt(text) <= 20))) {
        const newErrors = { ...errors };
        delete newErrors.sets;
        setErrors(newErrors);
      }
    }
  };

  const handleRepsChange = (text: string) => {
    // Only allow numbers
    if (text === '' || /^\d+$/.test(text)) {
      setReps(text);
      // Clear error if valid
      if (errors.reps && (text === '' || (parseInt(text) >= 0 && parseInt(text) <= 100))) {
        const newErrors = { ...errors };
        delete newErrors.reps;
        setErrors(newErrors);
      }
    }
  };

  const handleWeightChange = (text: string) => {
    // Only allow numbers
    if (text === '' || /^\d+$/.test(text)) {
      setWeight(text);
      // Clear error if valid
      if (errors.weight && (text === '' || (parseInt(text) >= 0 && parseInt(text) <= 2000))) {
        const newErrors = { ...errors };
        delete newErrors.weight;
        setErrors(newErrors);
      }
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.inputField}>
            <Text style={styles.label}>Nombre del ejercicio</Text>
            <View style={[styles.inputContainer, errors.name && styles.inputContainerError]}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Mancuerna, sentadilla, etc"
                placeholderTextColor="#B3B3B3"
                autoFocus={true}
                selectTextOnFocus={true}
                editable={true}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.inputField}>
              <Text style={styles.label}>Sets</Text>
              <View style={[styles.inputContainer, errors.sets && styles.inputContainerError]}>
                <TextInput
                  style={styles.input}
                  value={sets}
                  onChangeText={handleSetsChange}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#B3B3B3"
                  editable={true}
                />
              </View>
              {errors.sets && <Text style={styles.errorText}>{errors.sets}</Text>}
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Reps</Text>
              <View style={[styles.inputContainer, errors.reps && styles.inputContainerError]}>
                <TextInput
                  style={styles.input}
                  value={reps}
                  onChangeText={handleRepsChange}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#B3B3B3"
                  editable={true}
                />
              </View>
              {errors.reps && <Text style={styles.errorText}>{errors.reps}</Text>}
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Peso</Text>
              <View style={[styles.inputContainer, errors.weight && styles.inputContainerError]}>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={handleWeightChange}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#B3B3B3"
                  editable={true}
                />
              </View>
              {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    minWidth: 327,
    maxWidth: 375,
    width: '90%',
  },
  content: {
    flexDirection: 'column',
    gap: 16,
  },
  inputField: {
    flexDirection: 'column',
    gap: 8,
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
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 99,
    minWidth: 120,
  },
  saveButton: {
    backgroundColor: '#6E4CB0',
  },
  cancelButton: {
    backgroundColor: '#7B7782',
  },
  buttonText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#F5F5F5',
    lineHeight: 16,
  },
});
