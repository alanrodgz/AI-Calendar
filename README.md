# AI Calendar App

## Calendar App Screenshot
<!-- Add a screenshot if available -->
<img width="1203" alt="Screenshot 2025-03-20 at 8 21 23 PM" src="https://github.com/user-attachments/assets/13debd0d-252a-4fe5-9b32-956fd06f2d8a" />

The AI Calendar App is a modern, user-friendly calendar application built with Next.js, Firebase, and Tailwind CSS. It allows users to sign in with Google, manage events, and view their calendar in a clean and intuitive interface.

## Features
- **Google Sign-In:** Users can sign in with their Google account.
- **Event Management:** Add, view, and manage events on the calendar.
- **Responsive Design:** The app is fully responsive and works on all devices.
- **Real-Time Updates:** Events are synced in real-time using Firebase Firestore.
- **Customizable Events:** Each event can have a title, date, and color.

## Technologies Used
- **Next.js:** A React framework for server-rendered applications.
- **Firebase:** For authentication (Google Sign-In) and real-time database (Firestore).
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **TypeScript:** For type-safe JavaScript development.

## Getting Started
Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- Firebase account (for authentication and Firestore)
- Google Cloud Project (for Google Sign-In)

### Installation
#### Clone the repository:
```bash
git clone https://github.com/your-username/ai-calendar-app.git
cd ai-calendar-app
```

#### Install dependencies:
```bash
npm install
```

#### Set up Firebase:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Google Sign-In and Firestore in the Firebase Console.
3. Add a web app to your Firebase project and copy the Firebase configuration.

#### Set up environment variables:
Create a `.env.local` file in the root directory and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

#### Run the development server:
```bash
npm run dev
```

#### Open the app:
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
ai-calendar-app/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── LoginButton.tsx
│   │   │   ├── UserProfile.tsx
│   │   ├── calendar/
│   │   │   ├── CalendarHeader.tsx
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── CalendarDay.tsx
│   │   │   ├── EventItem.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── events.ts
│   │   ├── firebase.ts
│   │   ├── calendarUtils.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── [username]/
│   │   ├── page.tsx
├── public/
│   ├── favicon.ico
│   ├── screenshot.png
├── .env.local
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
```

## Contributing
We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on the original repository.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Screenshots
<!-- Add screenshots of your app here -->
- **Sign-In Page**
- **Calendar View**

## Contact
If you have any questions or feedback, feel free to reach out:

- **Your Name:** Alan Rodriguez
- **GitHub:** [Alan Rodriguez](https://github.com/alanrodgz)
- **Project Link:** [AI Calendar App](https://github.com/alanrodgz/AI-Calendar)

