# AI Healthcare Chatbot UI

A modern, responsive Angular frontend for the AI Healthcare Chatbot, providing an intuitive interface for user authentication and intelligent document-based conversations.

## 🎨 Features

- **User Authentication**: Secure login and registration forms
- **Real-time Chat**: Interactive chat interface with AI responses
- **Document Q&A**: Ask questions about healthcare documents using RAG
- **Responsive Design**: Mobile-friendly UI with Angular Material
- **JWT Integration**: Secure token-based authentication
- **Loading States**: Smooth user experience with progress indicators
- **Error Handling**: Comprehensive error messages and validation

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Styling](#styling)
- [Testing](#testing)
- [Building](#building)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Angular CLI

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/venkateswari2754/ai-healthcare-chatbot-ui.git
   cd ai-healthcare-chatbot-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://127.0.0.1:8001'  // Backend API URL
   };
   ```

## ⚙️ Configuration

### Environment Files
- `src/environments/environment.ts`: Development configuration
- `src/environments/environment.prod.ts`: Production configuration

### API Configuration
Update the API base URL in environment files to match your backend deployment.

## 🚀 Usage

### Development Server
```bash
ng serve
```

Navigate to `http://localhost:4200` (or your configured port).

### Build for Production
```bash
ng build --prod
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Login component
│   │   ├── register/       # Registration component
│   │   └── chat/           # Chat interface
│   ├── services/
│   │   ├── auth.service.ts # Authentication service
│   │   └── chat.service.ts # Chat API service
│   ├── guards/
│   │   └── auth-guard.ts   # Route protection
│   ├── interceptors/
│   │   └── auth-interceptor.ts # HTTP interceptors
│   └── environments/       # Environment configurations
├── assets/                 # Static assets
├── styles.scss            # Global styles
└── index.html             # Main HTML file
```

## 🔑 Key Components

### Authentication Components
- **Login Component**: Handles user login with form validation
- **Register Component**: User registration form
- **Auth Guard**: Protects routes requiring authentication

### Chat Components
- **Chat Interface**: Real-time messaging with AI
- **Message Display**: Formatted responses with line breaks
- **Loading Indicators**: User feedback during API calls

### Services
- **AuthService**: JWT token management and authentication
- **ChatService**: API communication for chat functionality

## 🎨 Styling

### Design System
- **Angular Material**: Consistent UI components
- **Custom SCSS**: Responsive design with gradients and shadows
- **Typography**: Readable fonts with proper line heights

### Key Styles
- Gradient backgrounds for visual appeal
- Card-based layouts for content organization
- Responsive breakpoints for mobile compatibility

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```

### Test Coverage
```bash
ng test --code-coverage
```

## 🏗️ Building

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --prod --aot
```

Build artifacts will be stored in the `dist/` directory.

## 🚢 Deployment

### Static Hosting
Deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Server-Side Rendering (Optional)
For better SEO and performance:
```bash
ng add @nguniversal/express-engine
ng build --prod
ng run healthcare-frontend:server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit changes: `git commit -am 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Projects

- **Backend API**: [ai-healthcare-chatbot-api](https://github.com/venkateswari2754/ai-healthcare-chatbot-api)

## 📞 Support

For questions or issues, please open an issue on GitHub.

## 🔄 Recent Updates

- Enhanced chat UI with proper text formatting
- Improved authentication flow
- Added responsive design
- Integrated with RAG-powered backend
- Comprehensive error handling

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
