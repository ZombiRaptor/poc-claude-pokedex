# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Setup: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test (all): `npm run test`
- Test (single): `npm run test -- -t "test name"`
- Test watch: `npm run test:watch`
- Coverage: `npm run test:coverage`

## Code Style Guidelines
- Follow TDD approach: write tests before implementation
- Use TypeScript with strict type checking
- Clean Architecture: separate domain, application, and infrastructure layers
- UI components: use shadcn/ui components with consistent styling
- Structure: feature-based organization (/features/{feature-name})
- API integration: use React Query for data fetching and state management
- Use custom hooks for encapsulating business logic
- Test with React Testing Library and Mock Service Worker
- Use Zod for runtime validation of API responses
- Components: prefer small, focused components with explicit props
- State: isolate global state in context providers when needed
- Error handling: graceful degradation with user-friendly messages
- Accessibility: follow WCAG guidelines with proper ARIA attributes