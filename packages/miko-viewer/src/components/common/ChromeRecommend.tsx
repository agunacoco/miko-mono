import { useEffect } from 'react';

export default function ChromeRecommend() {
  useEffect(() => {
    const isChrome = navigator.userAgent.includes('Chrome') && navigator.vendor.includes('Google Inc');
    if (!isChrome) alert('Chrome browser is recommended for best experience.');
  }, []);

  return <></>;
}
