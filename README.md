<img src="https://socialify.git.ci/BALASANTHOSH01/Storix-AI/image?description=1&forks=1&issues=1&language=1&name=1&pulls=1&stargazers=1&theme=Light" alt="Storix-AI" />

# **StorixAI - Revolutionize Your Pantry Management**

Welcome to StorixAI! Say goodbye to pantry chaos and hello to a smarter, more efficient way to manage your kitchen. Our state-of-the-art pantry management system is designed to streamline your food storage, reduce waste, and save you money. Join the revolution in pantry management. Our system makes it easier than ever to organize your kitchen, reduce waste, and save money. Start your journey to a more efficient pantry today

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [Security Rules](#firestore-security-rules)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)


## **Introduction**

StorixAI is a pantry management application designed to help users efficiently manage their pantry and inventory. With features like user-specific data, collaborator access, notifications, and a responsive interface, StorixAI aims to simplify pantry tracking and collaboration.

## **Features**

- **Real-Time Analytics**: Gain insights into your data with our real-time analytics. Monitor performance metrics, track user engagement, and make data-driven decisions instantly.

- **High Security**: Security is our top priority. Our platform employs state-of-the-art security measures to ensure your data is safe and protected from any threats.

- **Seamless Integration**: Integrate our platform with your existing tools and workflows effortlessly. Our APIs and connectors ensure smooth and efficient integration.

- **Scalable Infrastructure**: Our platform is built on a scalable infrastructure, ensuring it can handle any amount of data and user load without compromising on performance.

- **Authentication**: Firebase Authentication for secure user login and management.

## **Installation**

### **Prerequisites**

- Node.js (v14 or later)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### **Steps to run on Local Machine**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/username/storixai.git
   cd storixai
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Stroix-AI
   ```
3. **Install Dependencies**

   ```bash
   npm install
   yarn install
   ```

4. **Firebase Setup**

- **Create a Firebase project**:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the setup steps.

- **Enable Firestore**:

   - In the Firebase Console, navigate to "Firestore Database."
   - Click on "Create database" and choose the appropriate settings.

- **Enable Authentication**:

   - In the Firebase Console, navigate to "Authentication."
   - Click on "Get Started" and enable the desired authentication methods (e.g., Email/Password).

- **Obtain Firebase configuration**:

   - In the Firebase Console, navigate to "Project settings" (the gear icon).
   - Under "Your apps," click on the web icon (</>) to set up a new web app.
   - Follow the setup steps and copy the Firebase configuration object.

## **Configuration**


- Create a `.env.local` file in the root directory of your project.

- Add your Firebase configuration to the `.env.local` file:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
## **Usage**

### **User Dashboard**

The dashboard is the central hub for users to manage their pantry items. It allows users to:

- **View Pantry Items**: See a list of all items currently in their pantry.
- **Add New Items**: Add new items to the pantry with details such as name, quantity, and expiration date.
- **Update Existing Items**: Modify details of existing items, including updating quantities and expiration dates.
- **Remove Items**: Delete items from the pantry that are no longer needed.

### **Collaborator Management**

Users can manage collaborators to share pantry management responsibilities:

- **Invite Collaborators**: Send invitations to other users to join and manage the pantry.
- **View Collaborators**: See a list of all current collaborators.
- **Remove Collaborators**: Remove collaborators who no longer need access to the pantry.

## **Data Storage**

### **Firestore Structure**

Firestore is used for storing data in StorixAI. The main collections and their purposes are:

- **Users**: Stores user-specific information. Each document represents a single user.
  - **Document ID**: User ID
  - **Fields**:
    - `name`: User's name
    - `email`: User's email address
    - `pantryItems`: Reference to the user's pantry items
    - `collaborators`: List of collaborator IDs

- **PantryItems**: Stores details about items in the pantry. Each document represents a single item.
  - **Document ID**: Item ID
  - **Fields**:
    - `userId`: Reference to the user who owns this item
    - `name`: Name of the item
    - `quantity`: Amount of the item
    - `expirationDate`: Expiration date of the item

- **Collaborators**: Stores information about users who have been given access to manage the pantry.
  - **Document ID**: Collaborator ID
  - **Fields**:
    - `userId`: ID of the user who is the collaborator
    - `pantryId`: ID of the pantry the user has access to

### **Firestore Security Rules**

Ensure you have appropriate security rules to protect user data:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /pantryItems/{itemId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /collaborators/{collaboratorId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## **Troubleshooting**

### **Common Issues**

- **Firebase Errors**: 
  - Ensure your Firebase configuration is correctly set in the `.env.local` file.
  - Verify that the API keys and other configuration details are accurate and match those in your Firebase Console.
  - Check for network issues or Firebase service outages.

- **Styling Issues**: 
  - Ensure Tailwind CSS is properly configured in `tailwind.config.js`.
  - Verify that custom classes and utilities are correctly defined and used.
  - Clear the cache or rebuild the project to reflect recent changes.

- **Authentication Problems**:
  - Ensure that Firebase Authentication is correctly set up and the authentication methods are enabled.
  - Verify that the authentication tokens are valid and not expired.

## **Future Enhancements**

- **Advanced Analytics**: 
  - Add features to track pantry usage patterns and trends.
  - Provide insights and reports on pantry inventory and usage.

- **Mobile App**: 
  - Develop a mobile version of StorixAI for iOS and Android to provide a more accessible and convenient user experience.

- **Recipe Suggestions**: 
  - Implement a feature that suggests recipes based on the items available in the user's pantry.
  - Integrate with recipe APIs or databases to provide diverse recipe options.

## **Contributing**

Contributions to StorixAI are welcome! To contribute:

1. **Fork the Repository**: 
   - Create a copy of the repository under your GitHub account.

2. **Create a New Branch**: 
   - Work on your changes in a separate branch.

3. **Make Your Changes**: 
   - Implement the desired changes or features.

4. **Submit a Pull Request**: 
   - Open a pull request to propose your changes to the main repository.

5. **Provide a Description**: 
   - Include a clear description of the changes and the reasons for them.

Please ensure your contributions adhere to the project's coding standards and guidelines. For major changes or new features, discuss them with the maintainers before submitting a pull request.

## **Contributors**

We want to acknowledge and thank the following contributors for their valuable input and support:

**Creators:**

| ![Manoj Kumar](https://github.com/ManojKumar2920.png?size=100) | ![Bala Santhosh](https://github.com/BALASANTHOSH01.png?size=100) |
|:--:|:--:|
| [Manoj Kumar](https://github.com/ManojKumar2920) | [Bala Santhosh](https://github.com/BALASANTHOSH01) |

**Contributors:**

[Add your Profile Here](https://github.com/BALASANTHOSH01/Storix-AI)


## Contact

For any questions or feedback about StorixAI, please reach out to:

- **Email**: [manojkumararumainathan@gmail.com](mailto:manojkumararumainathan@gmail.com) & [santhos01ac@gmail.com](mailto:santhos01ac@gmail.com)
- **GitHub Issues**: [storixai/issues](https://github.com/BALASANTHOSH01/storixai/issues)


We welcome any inquiries and are happy to assist with any issues or suggestions.

## **Thank You**

Thank you for using StorixAI! We appreciate your support and feedback. If you find the app useful or have any suggestions for improvement, please let us know.

Happy pantry management!
