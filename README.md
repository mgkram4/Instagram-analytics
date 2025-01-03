# Instagram Analytics Dashboard

A Next.js application that provides analytics and insights for Instagram profiles. Built with TypeScript, React Query, and Tailwind CSS.

## Features

- 📊 Real-time Instagram metrics visualization
- 📈 Engagement rate analysis
- ⏰ Best posting times recommendations
- 📱 Fully responsive design
- 🚀 Optimized data fetching with React Query
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tanstack Query](https://tanstack.com/query) - Data fetching and caching
- [Recharts](https://recharts.org/) - Data visualization
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Headless UI](https://headlessui.com/) - UI components

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Instagram API credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd instagram-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
INSTAGRAM_API_KEY=your_api_key_here
INSTAGRAM_API_SECRET=your_api_secret_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Project Structure

```
src/
├── app/                    # Next.js 13+ app router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React Query provider
├── components/            # React components
├── hooks/                # Custom React hooks
└── types/               # TypeScript types
```

## Instagram API Setup

1. Register as a Meta developer at [developers.facebook.com](https://developers.facebook.com)
2. Create a new app
3. Set up Instagram Basic Display API
4. Configure OAuth redirect URLs
5. Get your API credentials
6. Add credentials to `.env.local`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Development

### Adding New Features

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes
3. Run tests and type checking:
```bash
npm run type-check
npm run lint
```

4. Commit your changes:
```bash
git add .
git commit -m "Add your feature"
```

### Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add proper types for all props and functions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Instagram API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
