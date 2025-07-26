'use client';

import { ReactNode } from 'react';

interface StreamingTextProps {
  text: string;
  isLoading?: boolean;
  isStreaming?: boolean;
  isComplete?: boolean;
  error?: string | null;
  className?: string;
  showCursor?: boolean;
  showCompletion?: boolean;
  completionMessage?: string;
  loadingMessage?: string;
  children?: ReactNode;
}

export default function StreamingText({
  text,
  isLoading = false,
  isStreaming = false,
  isComplete = false,
  error = null,
  className = '',
  showCursor = true,
  showCompletion = true,
  completionMessage = 'NEURONS DEPLETED, COMPUTATION EXHAUSTED',
  loadingMessage = 'temporal link establishing',
  children
}: StreamingTextProps) {
  return (
    <div className={className}>
      {/* Loading message */}
      {isLoading && !text && (
        <div className="text-text-dim font-mono text-sm animate-pulse mb-4">
          {loadingMessage}
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" />
        </div>
      )}
      
      {/* Main text content */}
      <div className="whitespace-pre-wrap">
        {text}
        {/* Show streaming cursor when actively streaming */}
        {isStreaming && showCursor && (
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" />
        )}
        {/* Loading cursor for initial loading */}
        {isLoading && !isStreaming && text && showCursor && (
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" />
        )}
      </div>
      
      {/* Error state */}
      {error && (
        <div className="mt-4 text-red-300 text-sm">
          {error}
        </div>
      )}
      
      {/* Completion indicator */}
      {text && isComplete && !isLoading && !isStreaming && showCompletion && (
        <div className="mt-4 text-center">
          <div className="text-text-dim font-mono text-xs animate-pulse" style={{animationDuration: '2s'}}>
            {completionMessage}
          </div>
        </div>
      )}
      
      {/* Additional children */}
      {children}
    </div>
  );
}
