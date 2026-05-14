# PGP/GPG Key Tool

## Overview

This is a web-based tool for handling PGP/GPG key operations. It allows users to validate keypairs, encrypt files with a public key, and decrypt files with a private key. The application is built with Vue.js and OpenPGP.js.

## Features

- **Keypair Validation**: Users can input a public and private key to check if they form a valid pair.
- **Automatic Public Key Generation**: When a user enters a private key, the corresponding public key is automatically generated and displayed.
- **Key Fingerprint Display**: The fingerprint of the public key is displayed, formatted for readability (uppercase, with spaces).
- **Key Data Export**: Users can export the public key and fingerprint to a file in various formats (TXT, CSV, JSON, vCard).
- **File Encryption**: Users can upload a file and encrypt it using a provided public key.
- **File Decryption**: Users can upload an encrypted file and decrypt it using a provided private key.

## Design and Layout

The application features a modern, dark theme with a two-column layout to optimize the user experience and reduce scrolling. The main components are organized as follows:

- **Left Column**: The primary "Validate Keypair" card, which is the main focus of the application.
- **Right Column**: A side panel containing the "Encrypt File" and "Decrypt File" cards, stacked vertically.

This layout provides a clear and intuitive workflow, allowing users to easily access all the core functionalities without excessive scrolling.

## Current Task: Layout Refactor

This iteration refactored the application layout to improve usability:

1.  **Two-Column Layout**: The main view is now split into two columns. The "Validate Keypair" section is on the left, and the "Encrypt File" and "Decrypt File" sections are stacked on the right.
2.  **CSS Updates**: Flexbox was used to create the new layout. The `.main-layout` class was added to wrap the columns, and the `.validation-card` and `.side-panel` classes were created to manage the column structure.
3.  **Improved User Experience**: This change reduces the need for vertical scrolling, making the application more compact and user-friendly.
