'use client';

import { useState, useCallback } from 'react';

export interface StreamingTextState {
  text: string;
  isLoading: boolean;
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
  retryable: boolean;
}

export function useStreamingText() {
  const [state, setState] = useState<StreamingTextState>({
    text: '',
    isLoading: false,
    isStreaming: false,
    isComplete: false,
    error: null,
    retryable: false
  });

  const processStreamingResponse = useCallback(async (
    response: Response,
    onChunk?: (chunk: string, accumulated: string) => void
  ) => {
    // Reset state for new request
    setState({
      text: '',
      isLoading: true,
      isStreaming: false,
      isComplete: false,
      error: null,
      retryable: false
    });

    try {
      // Check if this is a streaming response
      const contentType = response.headers.get('content-type');
      const transferEncoding = response.headers.get('transfer-encoding');
      const isStreamingResponse = response.body && 
        (contentType?.includes('text/plain') || transferEncoding === 'chunked');

      if (isStreamingResponse) {
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';
        let buffer = '';
        setState(prev => ({ ...prev, isStreaming: true, isLoading: false }));

        const processStream = async (): Promise<void> => {
          const { done, value } = await reader.read();

          if (done) {
            // Stream complete
            setState(prev => ({
              ...prev,
              text: accumulatedText,
              isLoading: false,
              isStreaming: false,
              isComplete: true
            }));
            return;
          }

          // Decode the chunk and add to buffer
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Parse SSE format: look for "data: {json}" lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const jsonStr = line.substring(6); // Remove "data: " prefix
                const data = JSON.parse(jsonStr);

                if (data.response) {
                  accumulatedText += data.response;
                  
                  // Update state with new text
                  setState(prev => ({
                    ...prev,
                    text: accumulatedText,
                    isLoading: false,
                    isStreaming: true
                  }));

                  // Call optional chunk callback
                  if (onChunk) {
                    onChunk(data.response, accumulatedText);
                  }

                  // Small delay to make streaming visible
                  await new Promise(resolve => setTimeout(resolve, 50));
                }
              } catch (e) {
                console.warn('Failed to parse SSE data:', line, e);
              }
            }
          }

          // Continue processing
          await processStream();
        };

        await processStream();
      } else {
        // Handle regular JSON response
        const data = await response.json();

        if (data.success) {
          setState({
            text: data.interpretation || data.synthesis || '',
            isLoading: false,
            isStreaming: false,
            isComplete: true,
            error: null,
            retryable: false
          });
        } else {
          setState({
            text: '',
            isLoading: false,
            isStreaming: false,
            isComplete: false,
            error: data.error || 'Unknown error occurred',
            retryable: data.retryable || false
          });
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      setState({
        text: '',
        isLoading: false,
        isStreaming: false,
        isComplete: false,
        error: 'Connection interrupted... data stream corrupted.',
        retryable: false
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      text: '',
      isLoading: false,
      isStreaming: false,
      isComplete: false,
      error: null,
      retryable: false
    });
  }, []);

  return {
    ...state,
    processStreamingResponse,
    reset
  };
}
