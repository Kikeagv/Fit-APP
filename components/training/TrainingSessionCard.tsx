import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TrainingSession, tagColors } from '../../types/training';

interface TrainingSessionCardProps {
  session: TrainingSession;
  onPress: () => void;
}

export const TrainingSessionCard: React.FC<TrainingSessionCardProps> = ({ session, onPress }) => {
  const tagColor = tagColors[session.tag] || tagColors.default;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
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
      <Ionicons name="chevron-down" size={24} color="#1E1E1E" style={styles.chevron} />
    </Pressable>
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
  infoContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 19,
  },
  timeText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 19,
  },
  tagContainer: {
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontFamily: 'AlbertSans-Regular',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
  },
  chevron: {
    transform: [{ rotate: '-90deg' }],
  },
});
