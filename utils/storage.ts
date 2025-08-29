import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrainingSession } from '../types/training';

const TRAINING_SESSIONS_KEY = 'training_sessions';

export const storage = {
  // Get all training sessions
  async getTrainingSessions(): Promise<TrainingSession[]> {
    try {
      const sessions = await AsyncStorage.getItem(TRAINING_SESSIONS_KEY);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error getting training sessions:', error);
      return [];
    }
  },

  // Save all training sessions
  async saveTrainingSessions(sessions: TrainingSession[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TRAINING_SESSIONS_KEY, JSON.stringify(sessions, null, 2));
    } catch (error) {
      console.error('Error saving training sessions:', error);
      throw error; // Re-throw to let caller handle it
    }
  },

  // Add a new training session
  async addTrainingSession(session: TrainingSession): Promise<void> {
    try {
      const sessions = await this.getTrainingSessions();
      sessions.push(session);
      await this.saveTrainingSessions(sessions);
    } catch (error) {
      console.error('Error adding training session:', error);
    }
  },

  // Update an existing training session
  async updateTrainingSession(updatedSession: TrainingSession): Promise<void> {
    try {
      const sessions = await this.getTrainingSessions();
      const index = sessions.findIndex(session => session.id === updatedSession.id);
      if (index !== -1) {
        sessions[index] = updatedSession;
        await this.saveTrainingSessions(sessions);
      }
    } catch (error) {
      console.error('Error updating training session:', error);
    }
  },

  // Delete a training session
  async deleteTrainingSession(sessionId: string): Promise<void> {
    try {
      const sessions = await this.getTrainingSessions();
      const filteredSessions = sessions.filter(session => session.id !== sessionId);
      await this.saveTrainingSessions(filteredSessions);
    } catch (error) {
      console.error('Error deleting training session:', error);
    }
  },

  // Clear all training sessions (for testing/debugging)
  async clearAllSessions(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TRAINING_SESSIONS_KEY);
    } catch (error) {
      console.error('Error clearing training sessions:', error);
    }
  }
};
