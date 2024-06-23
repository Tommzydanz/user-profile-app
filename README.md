# User Profile App

This is a user profile application built using Expo and TypeScript. The application includes:

- A login screen
- A screen to create a new user
- A homepage displaying the user's full name
- A screen to edit user details
- A profile screen with logout functionality

The application uses the [reqres.in](https://reqres.in/) fake data API for user data.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repository/user-profile-app.git
    cd user-profile-app
    ```

2. Install the dependencies:

    ```sh
    npm install -g expo-cli
    npm install
    ```

3. Start the Expo development server:

    ```sh
    expo start
    ```

## How to Reproduce

To reproduce the user profile functionality, follow these steps:

1. **Login or Sign Up**:
    - Launch the app.
    - You will be presented with the login screen.
    - If you already have an account, enter your credentials and log in.
    - If you do not have an account, navigate to the sign-up screen and create a new user.

2. **Home**:
    - After logging in or signing up, you will be directed to the home screen.
    - The homepage displays your full name and picture.

3. **Profile Screen**:
    - Navigate to the profile screen.
    - Here, you can see your profile details including your name and job title which will reflect after you edit profile.
    - You will also find a logout button at the bottom of this screen.

4. **Edit Profile**:
    - On the profile screen, tap the three dots icon in the top-right corner to navigate to the edit profile screen.
    - Update your profile details (name and job title) and save the changes.
    - After saving, you will be redirected back to the profile screen where the updated details will be displayed.

5. **Logout**:
    - On the profile screen, tap the logout button to log out of the application.
    - This will clear your authentication token and you will be redirected back to the login screen.

## Screens

### Login Screen
- Allows users to log in with their credentials.

### Sign-Up Screen
- Allows new users to create an account.

### Home
- Displays the logged-in user's full name and picture.

### Profile Screen
- Shows the user's profile details (name and job title).
- Contains a logout button.

### Edit Profile Screen
- Allows users to update their profile details (name and job title).
- Updates are saved and reflected on the profile screen.

## Technologies Used

- Expo
- React Native
- TypeScript
- Redux for state management
- AsyncStorage for local storage
- [reqres.in](https://reqres.in/) fake data API for user data
