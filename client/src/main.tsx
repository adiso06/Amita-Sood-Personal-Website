import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Global error handler for debugging - make it less intrusive
const originalConsoleError = console.error;
console.error = function(...args) {
  // Check for slice errors which are often related to undefined arrays
  const errorStr = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join('\n');
  const isSliceError = errorStr.includes('slice is not a function') || 
                       errorStr.includes('.slice(') || 
                       errorStr.includes('TypeError: r.slice');

  // Only add to the DOM in development mode
  if (process.env.NODE_ENV === 'development') {
    // Create or find error container div
    let errorContainer = document.getElementById('error-debug-container');
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.id = 'error-debug-container';
      errorContainer.style.cssText = 'position:fixed;bottom:0;right:0;max-width:50%;max-height:30vh;overflow:auto;z-index:9999;background:white;border:1px solid #ddd;padding:5px;font-size:12px;opacity:0.8;';
      errorContainer.innerHTML = '<div style="text-align:right"><button id="error-debug-toggle" style="background:#f44;color:white;border:none;padding:2px 5px;">Hide</button></div><div id="error-debug-content"></div>';
      document.body.appendChild(errorContainer);
      
      // Add toggle functionality
      document.getElementById('error-debug-toggle')?.addEventListener('click', () => {
        const content = document.getElementById('error-debug-content');
        if (content) {
          content.style.display = content.style.display === 'none' ? 'block' : 'none';
          const button = document.getElementById('error-debug-toggle');
          if (button) button.textContent = content.style.display === 'none' ? 'Show' : 'Hide';
        }
      });
    }
    
    // Add error content
    const content = document.getElementById('error-debug-content');
    if (content) {
      const errorMsg = document.createElement('div');
      errorMsg.style.cssText = 'margin-bottom:5px;padding:3px;border-bottom:1px solid #eee;';
      
      // Highlight slice errors for easier identification
      if (isSliceError) {
        errorMsg.innerHTML = `<div style="color:red;font-weight:bold;background:#ffeeee;padding:5px;">SLICE ERROR DETECTED: ${errorStr}</div>`;
        // Get stack trace if available
        if (args[0] && args[0] instanceof Error) {
          const stackTrace = document.createElement('pre');
          stackTrace.style.cssText = 'font-size:10px;margin:5px;background:#f7f7f7;padding:5px;overflow:auto;max-height:200px;';
          stackTrace.textContent = args[0].stack || 'No stack trace available';
          errorMsg.appendChild(stackTrace);
        }
      } else {
        errorMsg.innerHTML = `<div style="color:red">ERROR: ${errorStr}</div>`;
      }
      
      content.appendChild(errorMsg);
    }
  }
  
  // Still call the original console.error
  originalConsoleError.apply(console, args);
};

// Error handling for runtime errors
window.addEventListener('error', (event) => {
  const errorMessage = event.error?.toString() || event.message;
  const isSliceError = errorMessage.includes('slice is not a function') || 
                       errorMessage.includes('TypeError: r.slice');
  
  if (isSliceError) {
    console.error('Array slice error detected:', event.error);
    console.log('This typically means an array is null/undefined or not actually an array.');
    console.log('Stack trace:', event.error?.stack);
  } else {
    console.error('Runtime error:', event.error);
  }
  
  // Prevent the default error handling to avoid disrupting the UI
  event.preventDefault();
});

// Create a simple UI to show if rendering fails
const rootElement = document.getElementById("root");
if (!rootElement) {
  document.body.innerHTML = '<div style="color:red">Root element not found</div>';
} else {
  // Try a very basic render first to test React setup
  try {
    console.log('Starting minimal render test...');
    const testDiv = document.createElement('div');
    testDiv.style.display = 'none';
    document.body.appendChild(testDiv);
    
    // Now try the full render with proper error handling
    try {
      console.log('Starting main render...');
      createRoot(rootElement).render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );
      console.log('Render complete');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isSliceError = errorMessage.includes('slice is not a function') || 
                          errorMessage.includes('TypeError: r.slice');
      
      console.error('React render error:', error);
      document.body.innerHTML = `
        <div style="color:red;background:white;padding:20px;">
          <h2>${isSliceError ? 'Array Slice Error Detected' : 'React Render Error'}</h2>
          ${isSliceError ? '<p>This is likely due to trying to use array methods on null/undefined or non-array values.</p>' : ''}
          <pre>${error instanceof Error ? error.stack : String(error)}</pre>
        </div>
      `;
    }
  } catch (error) {
    console.error('React setup error:', error);
    document.body.innerHTML = `
      <div style="color:red;background:white;padding:20px;">
        <h2>React Setup Error</h2>
        <pre>${error instanceof Error ? error.stack : String(error)}</pre>
      </div>
    `;
  }
}
