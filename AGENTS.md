# Agent Configuration for Fit Project

## Build/Lint/Test Commands
- Start development server: `bun start`
- Run on Android: `bun run android`
- Run on iOS: `bun run ios`
- Run on Web: `bun run web`
- Lint code: `bun run lint`
- Reset project: `bun run reset-project`

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Follow Expo's ESLint configuration
- Use functional components with React hooks
- Import paths using `@/*` alias (configured in tsconfig.json)
- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use UPPER_SNAKE_CASE for constants
- Prefer named exports over default exports
- Use descriptive variable and function names
- Handle errors gracefully with try/catch blocks
- Use async/await for asynchronous operations
- Format code with Prettier (implied through ESLint)
- Organize imports alphabetically
- Use explicit typing for function parameters and return values
- Destructure props in component parameters when possible
- Use React Native components from "react-native" import
- Follow React best practices for component structure