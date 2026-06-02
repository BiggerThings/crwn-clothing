// src/serviceWorkerRegistration.js
import { Workbox } from 'workbox-window';

export function register() {
    // Only register the service worker in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
        const wb = new Workbox(swUrl);

        wb.addEventListener('activated', (event) => {
            if (!event.isUpdate) {
                console.log('App is cached for offline use!');
            }
        });

        wb.register().catch((error) => {
            console.error('Error during service worker registration:', error);
        });
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}

