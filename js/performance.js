// Core Web Vitals monitoring
function sendToAnalytics(metric) {
console.log(metric);

  // Send to Google Analytics
    if (window.gtag) {
    gtag('event', metric.name, {
        value: metric.value,
        event_category: 'Web Vitals'
    });
    }
}

// Load web-vitals library
(function() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
    script.onload = function() {
    webVitals.getCLS(sendToAnalytics);
    webVitals.getFID(sendToAnalytics);
    webVitals.getLCP(sendToAnalytics);
    webVitals.getFCP(sendToAnalytics);
    webVitals.getTTFB(sendToAnalytics);
    };
    document.head.appendChild(script);
})();