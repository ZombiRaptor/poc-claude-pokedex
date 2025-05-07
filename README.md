# Pokédex Web App

A modern React web application that displays information about Pokémon using the public [PokéAPI](https://pokeapi.co/). Built with Next.js, React Query, and shadcn/ui following clean architecture principles.

## Features

- Browse Pokémon with pagination
- View Pokémon details
- Clean architecture implementation
- Type-safe API integration with Zod
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state
- **Testing**: Jest & React Testing Library
- **API Integration**: PokéAPI

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/features/pokemon/` - Feature-based organization
  - `/domain/` - Core business logic, types and interfaces
  - `/application/` - Use cases and hooks
  - `/infrastructure/` - External API implementation
  - `/ui/` - UI components for this feature

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run typecheck` - Run TypeScript type checking