# Sahayak - Women's Safety App

A React Native mobile application designed to enhance women's safety through real-time location tracking, emergency contacts, and quick SOS features.

## Features

- Real-time location tracking
- Emergency contact management
- Quick SOS button with SMS alerts
- Location sharing with trusted contacts
- Emergency services integration
- User-friendly interface

## Tech Stack

- React Native
- Expo
- Firebase (Authentication & Realtime Database)
- Expo Location Services
- Expo SMS
- Expo Camera
- Expo Media Library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Sahayak
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Scan the QR code with Expo Go app on your mobile device

## Project Structure

```
Sahayak/
├── App.js              # Main application component
├── screens/            # Screen components
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── EmergencyScreen.js
├── components/         # Reusable components
├── navigation/         # Navigation configuration
└── assets/            # Images and other static assets
```

## MVP Features

1. **User Authentication**
   - Login/Register functionality
   - Secure user data storage

2. **Emergency Features**
   - One-tap SOS button
   - Location sharing
   - Emergency contact management

3. **Location Services**
   - Real-time location tracking
   - Location history
   - Safe zone marking

4. **User Interface**
   - Intuitive navigation
   - Emergency-first design
   - Quick access to critical features

## Future Enhancements

- Offline support
- Push notifications
- AI-powered threat detection
- Community safety features
- Integration with local law enforcement

## Contributing

This is an MVP version of the Sahayak app. Contributions are welcome for future development.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
