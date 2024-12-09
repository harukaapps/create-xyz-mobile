# Development Guide

This guide explains how to develop mobile applications using Create.xyz Mobile.

## Converting Your Create.xyz App

### 1. Project Setup

1. Prepare your Create.xyz components:
```bash
src/
├── components/    # Copy your components here
├── pages/         # Copy your pages here
└── App.jsx       # Update routes
```

2. Update dependencies if needed:
```json
{
  "dependencies": {
    // Your existing dependencies
    "@capacitor/core": "^5.0.0",
    "@capacitor/android": "^5.0.0"
  }
}
```

### 2. Mobile Adaptation

1. Add mobile-specific features:
```javascript
import { Capacitor } from '@capacitor/core';

// Check platform
const isPlatform = (platform) => {
  return Capacitor.getPlatform() === platform;
};

// Use native features
if (isPlatform('android')) {
  // Android-specific code
}
```

2. Handle device features:
- Back button
- Screen orientation
- Status bar
- Deep linking

### 3. Testing

1. Web testing:
```bash
npm run dev
```

2. Android testing:
```bash
npm run android
```

### 4. Building for Production

1. Build the web assets:
```bash
npm run build
```

2. Sync with native projects:
```bash
npx cap sync
```

3. Open in IDE:
```bash
npx cap open android
```

## Best Practices

1. **Responsive Design**
   - Use relative units
   - Test on different screen sizes
   - Implement proper touch targets

2. **Performance**
   - Optimize images
   - Implement lazy loading
   - Use proper caching strategies

3. **Native Features**
   - Check platform availability
   - Provide web fallbacks
   - Handle permissions properly

## Debugging

1. Web debugging:
   - Chrome DevTools
   - React Developer Tools

2. Native debugging:
   - Android Studio Debugger
   - Logcat for Android logs

## Deployment

1. Android:
   - Generate signed APK
   - Prepare store listing
   - Submit to Play Store
