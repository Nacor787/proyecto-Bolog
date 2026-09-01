export function showAlert(message, type = 'success') {
  // Ensure container exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  
  // Style based on type
  const bgColors = {
    'success': 'bg-green-100 text-green-800 border-green-200',
    'error': 'bg-red-100 text-red-800 border-red-200',
    'warning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'info': 'bg-blue-100 text-blue-800 border-blue-200'
  };
  const colorClass = bgColors[type] || bgColors['info'];
  
  toast.className = `transform transition-all duration-300 translate-x-full opacity-0 max-w-sm w-full shadow-lg rounded-lg border p-4 ${colorClass}`;
  
  toast.innerHTML = `
    <div class="flex items-center justify-between">
      <p class="font-medium text-sm">${message}</p>
      <button class="ml-4 text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  `;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
  }, 10);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 3000);
}

export function showConfirm(title, message, onConfirmCallback) {
  // Ensure container exists
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    modalContainer.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300';
    document.body.appendChild(modalContainer);
  }

  // Modal HTML
  modalContainer.innerHTML = `
    <div class="glass-card max-w-md w-full mx-4 transform scale-95 transition-transform duration-300 overflow-hidden" id="modal-box">
      <div class="p-6">
        <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
        <p class="text-white/80 text-sm">${message}</p>
      </div>
      <div class="bg-white/10 px-6 py-4 flex justify-end gap-3 border-t border-white/5">
        <button id="modal-cancel-btn" class="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/5 rounded-md hover:bg-white/10 transition-colors">
          Cancelar
        </button>
        <button id="modal-confirm-btn" class="px-4 py-2 text-sm font-medium text-white bg-info-600 rounded-md hover:bg-info-700 transition-colors shadow-sm">
          Confirmar
        </button>
      </div>
    </div>
  `;

  // Show modal
  modalContainer.classList.remove('hidden');
  // Trigger reflow
  void modalContainer.offsetWidth;
  modalContainer.classList.remove('opacity-0');
  document.getElementById('modal-box').classList.remove('scale-95');

  // Event Listeners
  const closeModal = () => {
    modalContainer.classList.add('opacity-0');
    document.getElementById('modal-box').classList.add('scale-95');
    setTimeout(() => {
      modalContainer.classList.add('hidden');
    }, 300);
  };

  document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
  
  document.getElementById('modal-confirm-btn').addEventListener('click', () => {
    closeModal();
    if (onConfirmCallback) onConfirmCallback();
  });
}
