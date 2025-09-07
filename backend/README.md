# Lumora Backend

Welcome to the backend of Lumora, a platform designed to power intelligent chatbots and document-based search experiences. This backend is built with Python and provides the core logic, data management, and API endpoints for the Lumora system.

## What Does This Backend Do?

- **Chatbot Functionality**: Enables users to interact with AI-powered chatbots that can answer questions, provide information, and assist with tasks.
- **Document Management**: Allows uploading, processing, and searching through documents (like PDFs) to find relevant information.
- **User Authentication**: Handles user sign-up, login, and security.
- **Background Tasks**: Manages tasks that run behind the scenes, such as processing documents or updating data.
- **Rate Limiting & Security**: Protects the system from abuse and ensures fair usage.

## Directory Overview

```
backend/
│
├── app/                  # Main application code
│   ├── __init__.py
│   ├── background_tasks.py      # Handles tasks that run in the background
│   ├── chatbot.py               # Chatbot logic and response generation
│   ├── database.py              # Database connection and queries
│   ├── main.py                  # Entry point for running the backend server
│   ├── prompts.py               # Stores prompts used by the chatbot
│   ├── auth/                    # User authentication and security
│   │   ├── dependencies.py
│   │   └── utils.py
│   ├── middleware/              # System protections (e.g., rate limiting)
│   │   └── rate_limiting.py
│   ├── models/                  # Data models (users, documents, sessions)
│   │   ├── __init__.py
│   │   ├── document.py
│   │   ├── session.py
│   │   └── user.py
│   ├── routers/                 # API endpoints for chat, documents, users
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   ├── chat_v2.py
│   │   ├── documents.py
│   │   └── user.py
│   ├── services/                # Core services for chat, documents, search
│   │   ├── chat_service.py
│   │   ├── chat_service_v2.py
│   │   ├── document_processor.py
│   │   ├── document_processor_v2.py
│   │   ├── document_service.py
│   │   ├── file_service.py
│   │   ├── knowledge_base.py
│   │   ├── langchain_service.py
│   │   ├── langgraph_chat_service.py
│   │   ├── vector_store.py
│   │   └── vector_store_v2.py
│   └── utils/                   # Helper functions and utilities
│       ├── __init__.py
│       ├── build_vector_db.py
│       ├── helpers.py
│       ├── startup.py
│       └── vector_db.py
│
├── requirements.txt     # List of Python packages needed to run the backend
└── README.md            # This file
```

## How Does It Work?

1. **User Authentication**: Users sign up and log in securely.
2. **Document Upload**: Users can upload documents (like PDFs) to the system.
3. **Processing & Search**: Uploaded documents are processed and stored in a way that makes them easy to search. The system uses advanced techniques to understand and find relevant information.
4. **Chatbot Interaction**: Users can ask questions or chat with the AI, which uses the stored documents and its own intelligence to provide helpful answers.
5. **APIs**: The backend exposes endpoints (URLs) that the frontend or other systems can use to interact with all these features.

## Getting Started

### Install Python 3.8+
Make sure Python is installed on your computer.

### Install Dependencies
Open a terminal in the backend folder and run:
```
pip install -r requirements.txt
```

### Run the Server
Start the backend server (usually with a command like):
```
uvicorn app.main:app
```

This will launch the backend, making it ready to accept requests from the frontend or other clients.

## Who Is This For?

- **End Users**: People who want to chat with an AI or search through their documents.
- **Developers**: Those who want to build on top of Lumora, add new features, or connect other systems.
- **Administrators**: Anyone managing the platform, users, or data.

## Notes

- The backend is only one part of the Lumora system. It works together with a frontend (user interface) and possibly other services.
- All sensitive operations (like login and document upload) are protected for security.
