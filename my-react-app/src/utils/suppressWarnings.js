export const suppressLibraryWarnings = () => {
  const disableDevWarnings = import.meta.env.VITE_DISABLE_DEV_WARNINGS === 'true';
  const disableDepWarnings = import.meta.env.VITE_DISABLE_DEP_WARNINGS === 'true';
  
  if (!disableDevWarnings && !disableDepWarnings) {
    return; // Don't suppress warnings if neither flag is set
  }
  
  const originalConsoleError = console.error;
  
  console.error = (...args) => {
    const shouldSuppress = args.some(arg => {
      if (typeof arg !== 'string') return false;
      
      if (disableDepWarnings && arg.includes('Support for defaultProps will be removed from memo components')) {
        return true;
      }
      
      if (disableDevWarnings && (
        arg.includes('is deprecated in React') ||
        arg.includes('Warning: [antd:') ||
        arg.includes('has been deprecated') ||
        arg.includes('will be removed in a future major release')
      )) {
        return true;
      }
      
      return false;
    });
    
    if (!shouldSuppress) {
      originalConsoleError(...args);
    }
  };
}; 