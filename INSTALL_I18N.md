# Install i18next for Translation

## Installation Command

Run this command in the 100acressFront directory:

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

Or with yarn:

```bash
yarn add react-i18next i18next i18next-browser-languagedetector
```

## What Gets Installed

- **react-i18next**: React bindings for i18next
- **i18next**: Core i18next library
- **i18next-browser-languagedetector**: Automatically detects user language

## After Installation

Once installed, the i18n configuration and translation files are already created in:
- `/src/Pages/Dubai/i18n/` - Configuration
- `/src/Pages/Dubai/locales/` - Translation files

The system will automatically:
1. Detect browser language
2. Load appropriate translations
3. Persist language preference to localStorage
4. Support RTL for Arabic
