# Create.xyz Mobile

English | [日本語](./README.ja.md)

Transform your [Create.xyz](https://create.xyz) applications into mobile apps with zero configuration. Create.xyz lets you turn your words into sites, components, and tools - built with code. This project extends that capability to native mobile platforms using Capacitor.

## Features

- 🔄 Direct conversion of Create.xyz apps to mobile
- 📱 Native mobile capabilities with Capacitor
- 🚀 Zero configuration required
- ⚡️ Same components and logic
- 🎨 Retain your Create.xyz design
- 🛠 Efficient development workflow
- 📦 Easy deployment process
- 📲 Support for both iOS and Android platforms

## Why Create.xyz Mobile?

Create.xyz Mobile allows you to take your text-to-app creations from Create.xyz and turn them into native mobile applications. No need to learn new frameworks or rewrite your application - your Create.xyz-generated components work seamlessly on mobile.

## Technologies Used

- React 18
- Capacitor 5
- Tailwind CSS 3
- Vite 5
- ESLint & Prettier for code formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### Installation

1. Clone the repository
```bash
git clone https://github.com/harukaapps/create-xyz-mobile.git
cd create-xyz-mobile
```

2. Install dependencies
```bash
npm install
```

3. Initialize Capacitor
```bash
npx cap init [APP_NAME] [APP_ID]
# Example: npx cap init "My App" com.example.app
```

4. Install platform-specific dependencies
```bash
# For Android
npm install @capacitor/android
npx cap add android

# For iOS (Mac only)
npm install @capacitor/ios
npx cap add ios
```

5. Run the development server
```bash
npm run dev
```

### Converting Your Create.xyz App

1. Copy your Create.xyz React components to the `src/components` directory
2. Update the routes in `src/App.jsx`
3. Run the development server to test your app
4. Build for mobile platforms

### Building for Mobile

#### Android Development Setup

1. Install Android Studio from the [official website](https://developer.android.com/studio)

2. Install the following through Android Studio:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

3. Set up environment variables:
```bash
# For Windows
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools"

# For macOS/Linux
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

4. Create an Android Virtual Device (AVD) in Android Studio:
   - Open Android Studio
   - Click "Tools" > "Device Manager"
   - Click "Create Device"
   - Select a device definition and system image

#### iOS Development Setup

1. Install Xcode 15 or later from the [official website](https://developer.apple.com/xcode/)

2. Install the following through Xcode:
   - Xcode Command Line Tools

3. Set up environment variables:
```bash
# For macOS
export PATH=$PATH:/Applications/Xcode.app/Contents/Developer/usr/bin
```

4. Create a new iOS Simulator in Xcode:
   - Open Xcode
   - Click "Window" > "Devices"
   - Click the "+" button
   - Select a device definition and system image

#### Android
```bash
npm run build
npx cap sync android
npx cap open android
```

#### iOS
```bash
npm run build
npx cap sync ios
npx cap open ios
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run android` - Build and open in Android Studio
- `npm run ios` - Build and open in Xcode

### Customizing App Icons

The project includes a utility script to generate Android app icons from an SVG file. The default icon is already generated, but if you want to customize it:

1. Replace `icon.svg` with your own icon
2. Install the required package: `npm install sharp`
3. Run: `node generate-icons.js`

This will generate icons in various sizes required for Android:
- Launcher icons (48x48 to 192x192)
- Round icons
- Adaptive icons (with foreground layer)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-party Licenses

This project uses the following open-source packages:

- [React](https://github.com/facebook/react) - MIT License
- [Capacitor](https://github.com/ionic-team/capacitor) - MIT License
- [Vite](https://github.com/vitejs/vite) - MIT License
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - MIT License

## Acknowledgments

- [Create.xyz](https://create.xyz) team for pioneering text-to-app development
- React team for the amazing framework
- Capacitor team for enabling native mobile development
- All contributors who help improve this project

Note: This project was developed with assistance from AI tools.
Some portions may have been AI-generated and subsequently reviewed/modified by the author.
