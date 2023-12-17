# Google Doc Clone

## Overview

This project is a collaborative document editing platform inspired by Google Docs. It allows users to create, edit, and collaborate on documents in real-time. The application is built using React for the front end, Quill for rich text editing, and a backend stack consisting of HTTP, Socket.IO for real-time communication, and MongoDB with Mongoose for data storage.

## Features

### 1. Real-Time Collaboration

Users can collaborate on the same document in real time. Changes made by one user are instantly reflected by others, allowing for seamless collaboration.

### 2. Rich Text Editing

The application uses Quill, a powerful and customizable rich text editor, to enable users to format text, insert images, create lists, and more.

### 3. User Authentication

To ensure secure collaboration, users can create accounts, log in, and have their personalized workspace. User authentication helps in maintaining the privacy and integrity of documents.

### 4. Document Sharing

Users can share documents with others by inviting them through email or generating shareable links. Collaborators can join the document by clicking the shared link.

### 5. Document Versioning

The system automatically saves document versions, allowing users to revert to previous states if needed. This feature ensures that no data is lost, even in the case of accidental changes or deletions.

## Tools Used

### Frontend

- **React:** A JavaScript library for building user interfaces. It provides a fast and efficient way to update and render components, making it suitable for real-time applications.

- **Quill:** A powerful WYSIWYG editor that enables rich text editing with an easy-to-use interface. It integrates seamlessly with React, providing a great user experience.

### Backend

- **HTTP:** The application uses HTTP for handling client-server communication. This includes handling user authentication, document creation, and updates.

- **Socket.IO:** For real-time bidirectional communication between clients and the server. Socket.IO enables instant updates to documents for all collaborators.

- **Mongoose:** A MongoDB object modeling tool designed to work in an asynchronous environment. It simplifies interactions with MongoDB, allowing for easy document storage and retrieval.

### Environment Variables

The project uses environment variables to configure certain settings. These variables are stored in a `.env` file located in the `server` directory. Create a `.env` file if it doesn't already exist, and configure the following variables:

```plaintext
# server/.env

# Port for the server to listen on
PORT=3001

# MongoDB connection string
MONGO_CONNECTION=your_mongodb_url
```

- **PORT:** The port on which the server will run. By default, it is set to 3001, but you can change it if needed.

- **MONGO_CONNECTION:** The connection string for your MongoDB database. Update this to point to your MongoDB instance. The example above assumes a local MongoDB instance running on the default port (27017) and using a database named "google-doc-clone."

## Getting Started (Updated)

Follow the updated steps to include the setup of environment variables:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/google-doc-clone.git
   cd google-doc-clone
   ```

2. **Install Dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set Up MongoDB:**
   - Install and run MongoDB on your local machine or use a cloud-based MongoDB service.
   - Update the MongoDB connection string in the backend's `.env` file.

4. **Configure Environment Variables:**
   - Create a `.env` file in the `server` directory.
   - Copy the content above and update the variables as needed.

5. **Run the Application:**
   ```bash
   # Run frontend
   cd client
   npm start

   # Run backend
   cd ../server
   npm start
   ```

6. **Access the Application:**
   Open your web browser and go to `http://localhost:5173` to access the Google Doc Clone application.

This additional information about environment variables will help users understand how to customize the application's settings based on their requirements.
## Screenshot

![Screenshot 2023-12-17 214953](https://github.com/karthiikJR/Google-Docs-Clone/assets/115890844/6828e169-1aa8-4bb1-9bc6-a319ee40b899)
