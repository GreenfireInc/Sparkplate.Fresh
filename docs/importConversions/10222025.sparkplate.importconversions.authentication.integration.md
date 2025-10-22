# Authentication Integration

## Overview

The authentication system from `loginStandard` (React/TypeScript) has been converted to Vue 3 and integrated into Sparkplate.fresh. This provides a Windows-style login experience similar to the `Greenery` application.

## What Was Done

### 1. Created Composables (Shared Logic)
- **`src/composables/useAuth.ts`**: Manages authentication state, user login/logout, and mock user data
- **`src/composables/useI18n.ts`**: Handles internationalization with support for 5 languages (EN, ES, FR, DE, PT)

### 2. Created Vue Components

#### Authentication Components
- **`src/components/authentication/loginStandard/LoginStandard.vue`**: Main login screen with animated background and user selection
- **`src/components/authentication/user/UserCard.vue`**: Reusable user card component for displaying user options
- **`src/components/authentication/user/UserModal.vue`**: Modal for entering password when logging in as existing user
- **`src/components/authentication/registration/SignupModal.vue`**: Modal for creating new user accounts

### 3. Updated App.vue
- Integrated authentication similar to how Greenery does it with `<access-control />`
- Shows `LoginStandard` when user is not authenticated
- Shows main application (NavBar, SideNav, router-view) when authenticated

## Features

### Login Screen
- Beautiful gradient background with animated icons
- User selection cards on the left side
- Welcome message in the center
- Language selector in bottom-right corner
- Version display

### User Management
- Mock users: Guest, Francis, Elizabeth, Goldie
- Create new account option
- Password-protected login

### Internationalization
- 5 languages supported: English, Spanish, French, German, Portuguese
- Easy language switching via globe icon
- All UI text translated

## File Structure

```
Sparkplate.fresh/src/
├── composables/
│   ├── useAuth.ts           # Authentication state management
│   └── useI18n.ts           # Internationalization logic
├── components/
│   └── authentication/
│       ├── index.ts         # Barrel export
│       ├── loginStandard/
│       │   └── LoginStandard.vue
│       ├── registration/
│       │   └── SignupModal.vue
│       └── user/
│           ├── UserCard.vue
│           └── UserModal.vue
└── App.vue                  # Updated with auth integration
```

## How It Works

1. **On App Load**: `App.vue` checks `isAuthenticated` from `useAuth()` composable
2. **Not Authenticated**: Shows `LoginStandard` component
3. **User Selects Account**: Opens `UserModal` for password entry
4. **Successful Login**: `useAuth().login()` sets authenticated state to `true`
5. **Authenticated**: App shows NavBar, SideNav, and main content

## Usage

### Logging In
1. Select a user from the left sidebar
2. Enter password (any password for now - this is mock data)
3. Click "Sign in"

### Creating Account
1. Click "Create Account" card
2. Fill in first name, last name, email, and password
3. Click "Create Account" button

### Changing Language
1. Click the globe icon in bottom-right
2. Select your preferred language

## Differences from loginStandard (React version)

The Vue version is simplified but captures the core functionality:
- Removed complex UI dependencies (shadcn/ui components replaced with custom Vue components)
- Removed advanced features (temporary key modal, server selection) - can be added later if needed
- Simplified with inline SVG icons instead of lucide-react
- State management using Vue composables instead of React hooks

## Future Enhancements

Possible additions if needed:
1. **Temporary Key Modal**: For blockchain wallet access
2. **Server Selection**: LDAP/ActiveDirectory/WebRTC integration
3. **Persistent Authentication**: Store auth state in localStorage
4. **Real User Management**: Connect to actual user database/API
5. **Password Recovery**: Forgot password functionality
6. **Two-Factor Authentication**: Additional security layer

## Notes

- All authentication is currently mock/demo data
- No actual password validation or user database
- To test logout, you'll need to add a logout button in the main app
- The authentication state is stored in memory only (resets on refresh)

