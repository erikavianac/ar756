export const GTM_ID = 'GTM-XXXXX'; // Substitua pelo seu ID do GTM

export const loadGTM = () => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.defer = true;
  script.id = 'gtm';
  script.dataset.cfasync = 'false';
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  
  // Carrega o script apenas quando a página estiver ociosa
  if ('requestIdleCallback' in window) {
    // @ts-ignore
    window.requestIdleCallback(() => {
      document.head.appendChild(script);
    });
  } else {
    // Fallback para browsers que não suportam requestIdleCallback
    setTimeout(() => {
      document.head.appendChild(script);
    }, 3000); // Carrega após 3 segundos
  }
}; 