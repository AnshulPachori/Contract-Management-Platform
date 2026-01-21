Contract Management Platform
📌 Overview

This project is a frontend-focused Contract Management Platform designed to showcase modern UI/UX design, reusable component architecture, and structured state-driven workflows.
The application allows users to build reusable contract templates, generate contracts from those templates, configure dynamic fields, and manage contracts through a controlled lifecycle — all without a backend.

The main goal of this project is to demonstrate frontend engineering skills, product-oriented thinking, and clean state management using mocked persistence.

🌐 Live Demo

🔗 Live Application:
https://contractmanagementplatform.netlify.app

📂 Source Code

🔗 GitHub Repository:
https://github.com/AnshulPachori/Contract-Management-Platform.git

✨ Core Features
🧩 Blueprint (Template) Builder

Create reusable contract templates

Supported configurable field types:

Text

Date

Checkbox

Signature (visual placeholder)

Assign labels and basic layout positions to fields

Blueprint metadata stored using local / mocked persistence

Templates can be reused across multiple contracts

📝 Contract Generation

Create contracts directly from existing blueprints

Contracts automatically inherit all blueprint fields

Users can fill and update field values

Clear separation between template structure and contract data

🔄 Contract Lifecycle Control

Each contract follows a strict and controlled lifecycle to prevent invalid transitions.

Key Rules

Lifecycle stages cannot be skipped

Revocation is allowed only in specific states

Locked contracts are fully read-only

Revoked contracts cannot move forward

Available actions update dynamically based on contract status

📊 Contract Dashboard

Centralized dashboard displaying all contracts

Filter and group contracts by status:

Active

Pending Signature

Completed

Table view includes:

Contract name

Associated blueprint

Current status

Creation date

Context-aware action buttons

🛠 Technology Stack

React

TypeScript

Tailwind CSS

Component-driven architecture

Local Storage / Mocked persistence

Clean and scalable folder structure

🧠 Architecture & Design Decisions

Modular, reusable component structure

Centralized state handling for contracts and templates

Business logic separated from UI components

Lifecycle enforcement handled through controlled state transitions

No backend dependency to keep the focus on frontend design and architecture

⚙️ Getting Started
Prerequisites

Node.js (v16 or later)

Installation
# Clone the repository
git clone https://github.com/AnshulPachori/Contract-Management-Platform.git

# Navigate to the project directory
cd Contract-Management-Platform

# Install dependencies
npm install

# Start the development server
npm run dev


The app will run locally at:

http://localhost:5173

⚠️ Assumptions & Limitations

Backend services and authentication are not implemented

Data persistence is local / mocked

Signature field is visual only (no real signing logic)

Field positioning is basic and not advanced drag-and-drop

Designed primarily as a frontend architecture and UI showcase

🎯 Project Purpose

This project was built to demonstrate:

Real-world frontend workflows

Clean and scalable React architecture

UI/UX attention to detail

Controlled state-driven business logic

Product-level thinking without backend complexity
