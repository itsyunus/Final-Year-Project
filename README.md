# Air Bharat Udaan Platform

A modern, "Liquid Glass" styled aviation dashboard and RAG-powered Chat Assistant for Air Bharat passengers, ground staff, cabin crew, and operations admins. 

## Features
- **Role-Based Access Control**: Different experiences for Passengers vs. Staff/Admins.
- **Dual AI Engine**: Seamlessly toggle between Groq (Llama 3 70B) and Amazon Bedrock models.
- **RAG (Retrieval-Augmented Generation)**: Answers questions based on a simulated aviation knowledge base, including flight schedules, PNRs, baggage info, and DGCA policies.
- **Flight Board & PNR Lookup**: Real-time mock data displays.
- **Admin Dashboard**: Analytics and Document Management views.

## Running the Application Locally

Follow these steps to set up and run the Air Bharat Udaan platform on a new computer:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your computer.

### 2. Download the Project
Copy the `air-bharat-udaan` project folder to your new computer, or clone it if it is hosted on a Git repository.

### 3. Install Dependencies
Open a terminal in the root directory of the project (`air-bharat-udaan`) and run:
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env.local` in the root directory of the project, and add your API keys.

```env
# Example .env.local
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VITE_BEDROCK_MODEL_ID=meta.llama3-3-70b-instruct-v1:0
VITE_BEDROCK_EMBED_MODEL_ID=amazon.titan-embed-text-v2:0
VITE_AWS_REGION=us-east-2
VITE_GROQ_API_KEY=your_groq_api_key
```

### 5. Start the Development Server
Once dependencies are installed and the environment variables are set up, start the app by running:
```bash
npm run dev
```

### 6. View the App
Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`).
