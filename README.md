# Fit App 👋

A comprehensive fitness tracking application built with Expo and React Native.

## Features

- **Training Management**: Create, view, edit, and delete training sessions
- **Exercise Tracking**: Add exercises with sets, reps, and weight tracking
- **Tagging System**: Organize workouts with color-coded tags (Brazo, Pierna, Pecho, etc.)
- **Date/Time Tracking**: Record when each training session was completed
- **Local Storage**: All data is persisted locally on the device

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Training Feature Overview

The Training feature allows users to:

1. **View Training Sessions**: Browse all recorded training sessions with date, time, and tag information
2. **Add New Sessions**: Create new training sessions with:
   - Date selection
   - Time selection
   - Tag categorization (Brazo, Pierna, Pecho, Espalda, Hombro, Cardio, Abdomen)
   - Exercise tracking with sets, reps, and weight
3. **Edit Existing Sessions**: Modify any aspect of a training session
4. **Delete Sessions**: Remove unwanted training records
5. **View Session Details**: See complete details of each training session

## Project Structure

- **app/**: Main application screens and routing
- **components/training/**: Training-specific UI components
- **types/**: TypeScript type definitions
- **utils/**: Utility functions for storage and ID generation

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
