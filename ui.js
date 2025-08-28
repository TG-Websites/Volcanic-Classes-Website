// ui.js

export function injectUIStyles() {
    if (document.getElementById('ui-styles')) return;

    const style = document.createElement('style');
    style.id = 'ui-styles';
    style.textContent = `
    #global-loader {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-radius: 9999px;
      border-top-color: white;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    #toast-msg {
      animation: slideFade 0.4s ease;
    }

    @keyframes slideFade {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
    document.head.appendChild(style);
}

export function showLoader() {
    let loader = document.getElementById('global-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'global-loader';

        // full screen overlay + blur
        loader.style.position = 'fixed';
        loader.style.inset = '0'; // top:0; right:0; bottom:0; left:0;
        loader.style.display = 'flex';
        loader.style.justifyContent = 'center';
        loader.style.alignItems = 'center';
        loader.style.background = 'rgba(255, 255, 255, 0.3)'; // light transparent overlay
        loader.style.backdropFilter = 'blur(6px)';            // 🔥 blur effect
        loader.style.zIndex = '9999';

        loader.innerHTML = `
            <div class="w-12 h-12 border-4 border-white border-t-volcanic-red rounded-full animate-spin"></div>
        `;

        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

export function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.style.display = 'none';
}

export function showToast(type = 'success', message = '') {
    const existing = document.getElementById('toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = `
    fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50
    ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
  `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

export function setButtonLoading(btn, isLoading = true, originalText = "Submit") {
    if (isLoading) {
        btn.disabled = true;
        btn.innerHTML = `<span class="loader mr-2 border-t-white border-white"></span> Processing...`;
    } else {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}



window.addEventListener('DOMContentLoaded', injectUIStyles);