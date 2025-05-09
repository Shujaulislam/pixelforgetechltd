# TaskMate Mobile App

A simple task management mobile application built with React Native and Expo.

## Features

- User authentication (signup/login)
- View and manage personal tasks
- Create, edit, and delete tasks
- Toggle task completion status
- Clean and simple user interface

## Tech Stack

- React Native with Expo
- React Navigation
- Basic styling with TailwindCSS
- Secure API integration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for mobile testing)

## Getting Started

1. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Start the development server**

```bash
npm start
# or
yarn start
```

3. **Run on mobile device**
- Scan the QR code with Expo Go (Android)
- Scan the QR code with Camera app (iOS)

## Project Structure

```
app/
├── (auth)/       # Authentication screens
├── (tabs)/       # Main app screens
components/       # Reusable components
contexts/         # React contexts
hooks/            # Custom hooks
```

## Development

### Available Scripts

- `npm start` or `yarn start` - Start the Expo development server
- `npm run android` or `yarn android` - Run on Android emulator
- `npm run ios` or `yarn ios` - Run on iOS simulator
- `npm run web` or `yarn web` - Run in web browser

### Environment Setup

1. Create a `.env` file in the root directory
2. Add the following variables:
   ```
   API_URL=http://localhost:3000/api
   ```

### Testing

To test the app on your physical device:
1. Make sure your device and development machine are on the same network
2. Scan the QR code with:
   - Expo Go app (Android)
   - Camera app (iOS)


## License

MIT
