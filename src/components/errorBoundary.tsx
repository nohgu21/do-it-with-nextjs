'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import Link from 'next/link';
import { Lato } from 'next/font/google';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className={`${lato.className} min-h-screen bg-[#0F4C5C] text-white flex flex-col items-center justify-center px-6 text-center space-y-4`}>
          <h2 className="text-2xl font-bold">Yikes. Something went wrong 😬</h2>
          <p className="text-gray-300">It&apos;s not you, it&apos;s us. Try refreshing or head back home.</p>
          <Link 
            href="/"
            className="inline-block bg-white text-[#0F4C5C] font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            Go Home
          </Link>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
