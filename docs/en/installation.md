# Installation Guide

This guide will help you set up Create.xyz Mobile and prepare your development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/harukaapps/create-xyz-mobile.git
cd create-xyz-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Set up development environment:
```bash
# For Android
npm run android
```

## Environment Setup

### Android Development

1. Install Android Studio
2. Install the Android SDK
3. Set up an Android Virtual Device (AVD)
4. Configure environment variables:
   - ANDROID_HOME
   - JAVA_HOME

### Troubleshooting

Common installation issues:

1. **Node version mismatch**
   - Solution: Use nvm to install the correct version

2. **Android SDK issues**
   - Solution: Verify SDK installation in Android Studio

3. **Build errors**
   - Solution: Clean the project and rebuild
   ```bash
   npm run clean
   npm install
   ```

## Next Steps

Once installation is complete, proceed to the [Development Guide](./development.md) to learn how to convert your Create.xyz app.
