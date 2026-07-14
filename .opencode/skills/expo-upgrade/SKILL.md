---
name: expo-upgrade
description: Use ONLY when the user wants to upgrade the Expo project to a new SDK version, run `npx expo install --fix`, use `expo-doctor`, or migrate between Expo SDK releases (e.g. SDK 53 to 54). Triggers on keywords like upgrade, expo upgrade, sdk update, migration, expo-doctor.
---

# Expo SDK Upgrade Skill

Use this skill when upgrading the Expo project to a new SDK version.

## Current Project Info

- **Current SDK**: 53 (expo@^53.0.9)
- **Target SDK**: 54
- **React Native**: 0.79.2
- **React**: 19.0.0

## Upgrade Steps

### 1. Pre-flight Checks

```bash
npx expo-doctor
```

Fix any warnings before proceeding. Expo doctor identifies dependency conflicts and issues.

### 2. Update Expo Packages

```bash
npx expo install expo@^54.0.0 --fix
```

This upgrades `expo` and all compatible `expo-*` packages to SDK 54 versions.

### 3. Update Related Packages

After the core update, ensure these packages are at their SDK 54 compatible versions:

```bash
npx expo install react-native@0.79.x react@19.0.0 react-dom@19.0.0
```

> Check the [Expo SDK 54 changelog](https://expo.dev/changelog/sdk-54) for the exact compatible versions of React Native and React.

### 4. Update Dev Dependencies

```bash
npx expo install -- --save-dev jest-expo@^54.0.0
```

### 5. Run Expo Doctor Again

```bash
npx expo-doctor
```

Ensure all dependencies are compatible. Resolve any remaining warnings.

### 6. Check for Breaking Changes

Review the SDK 54 changelog for:
- Removed or renamed APIs
- Changes to native module behavior
- Configuration file changes (app.json, eas.json)
- Metro bundler updates

### 7. Test

```bash
npx expo start --clear
```

Test on iOS, Android, and Web. Verify:
- App builds and runs
- Navigation works (expo-router)
- Database operations work (expo-sqlite)
- Image picker works (expo-image-picker)
- All UI renders correctly

### 8. Update TypeScript Config

If the SDK update changes TS defaults, update `tsconfig.json` accordingly.

## Key Dependencies to Watch

These packages in the project are SDK-version-sensitive:

- `expo-router` — must match SDK version
- `expo-sqlite` — check for API changes
- `expo-image-picker` — check for API changes
- `expo-image-manipulator` — check for API changes
- `react-native-reanimated` — may need update for new RN version
- `react-native-gesture-handler` — may need update
- `react-native-screens` — may need update
- `react-native-safe-area-context` — may need update
- `@react-navigation/native` — check compatibility with expo-router

## Rollback

If something breaks, revert all changes:

```bash
git checkout -- .
npm install
```
