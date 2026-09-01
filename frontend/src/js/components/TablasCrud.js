export class TablasCrud {
  constructor({
    containerId,
    entityName,
    searchPlaceholder,
    addButtonHtml,
    columnsHtml,
    renderRow,
    fetchData,
    filterFn,
    emptyMessage = 'No hay registros.',
    pageSize = 5
  }) {
    this.containerId = containerId;
    this.entityName = entityName;
    this.searchPlaceholder = searchPlaceholder;
    this.addButtonHtml = addButtonHtml || '';
    this.columnsHtml = columnsHtml;
    this.renderRow = renderRow;
    this.fetchData = fetchData;
    this.filterFn = filterFn;
    this.emptyMessage = emptyMessage;
    this.pageSize = pageSize;

    this.allData = [];
    this.filteredData = [];
    this.currentPage = 1;

    // DOM Elements
    this.container = document.getElementById(this.containerId);
    this.tbody = null;
    this.searchInput = null;
    this.scrollContainer = null;
    this.loader = null;
    this.countDisplay = null;
  }

  async init() {
    if (!this.container) return;

    this.renderSkeleton();
    this.cacheDOM();
    this.bindEvents();

    if (this.tbody) {
      this.tbody.innerHTML = `<tr><td colspan="10" class="px-6 py-4 text-center text-slate-400">Cargando...</td></tr>`;
    }

    try {
      const data = await this.fetchData();
      if (!data || data.length === 0) {
        this.showEmpty();
        return;
      }
      this.allData = data;
      this.filteredData = data;
      this.currentPage = 1;
      this.renderTable();
    } catch (error) {
      console.error(`Error loading data for ${this.entityName}:`, error);
      if (this.tbody) {
        this.tbody.innerHTML = `<tr><td colspan="10" class="px-6 py-4 text-center text-red-500">Error cargando los datos.</td></tr>`;
      }
    }
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <!-- Toolbar -->
      <div class="p-4 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 bg-white/5 backdrop-blur-xl">
        <div class="relative w-full max-w-md" id="${this.entityName}-search-container">
          <input type="text" id="${this.entityName}-search-input" placeholder="${this.searchPlaceholder}" class="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-sky-400/70 focus:bg-white/15 focus:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all placeholder-white/40">
          <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        ${this.addButtonHtml}
      </div>

      <!-- Table Container (Scrollable) -->
      <div id="${this.entityName}-scroll-container" class="flex-1 overflow-y-auto relative w-full">
        <table class="min-w-full divide-y divide-white/10 w-full relative">
          <thead class="bg-slate-900/60 backdrop-blur-2xl sticky top-0 z-10 border-b border-white/10">
            <tr>
              ${this.columnsHtml}
            </tr>
          </thead>
          <tbody id="${this.entityName}-list" class="divide-y divide-white/5 bg-slate-900/40">
          </tbody>
        </table>
        <!-- Infinite Scroll Loader -->
        <div id="${this.entityName}-infinite-loader" class="hidden py-6 text-center">
          <svg class="animate-spin h-6 w-6 text-sky-400 mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
        </div>
      </div>

      <!-- Footer Count -->
      <div class="p-3 border-t border-white/10 bg-white/5 backdrop-blur-xl shrink-0">
        <p id="${this.entityName}-count-display" class="text-xs font-medium text-slate-400">Mostrando 0 de 0</p>
      </div>
    `;
  }

  cacheDOM() {
    this.tbody = document.getElementById(`${this.entityName}-list`);
    this.searchInput = document.getElementById(`${this.entityName}-search-input`);
    this.scrollContainer = document.getElementById(`${this.entityName}-scroll-container`);
    this.loader = document.getElementById(`${this.entityName}-infinite-loader`);
    this.countDisplay = document.getElementById(`${this.entityName}-count-display`);
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        this.filteredData = this.allData.filter(item => this.filterFn(item, q));
        this.currentPage = 1;
        this.renderTable();
      });
    }

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', () => {
        if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight - 10) {
          if (this.currentPage * this.pageSize < this.filteredData.length) {
            this.currentPage++;
            if (this.loader) this.loader.classList.remove('hidden');
            setTimeout(() => {
              if (this.loader) this.loader.classList.add('hidden');
              this.renderTable();
            }, 400); // Simulate network/render delay
          }
        }
      });
    }
  }

  showEmpty() {
    if (this.tbody) {
      this.tbody.innerHTML = `<tr><td colspan="10" class="px-6 py-4 text-center text-slate-500">${this.emptyMessage}</td></tr>`;
    }
    if (this.countDisplay) {
      this.countDisplay.innerText = 'Mostrando 0 de 0';
    }
  }

  renderTable() {
    if (!this.tbody) return;

    if (this.filteredData.length === 0) {
      this.showEmpty();
      return;
    }

    const visibleItems = this.filteredData.slice(0, this.currentPage * this.pageSize);
    let html = '';
    visibleItems.forEach(item => {
      html += this.renderRow(item);
    });
    this.tbody.innerHTML = html;

    if (this.countDisplay) {
      this.countDisplay.innerText = `Mostrando ${visibleItems.length} de ${this.filteredData.length}`;
    }
  }

  // Method to refresh data from server manually
  async refresh() {
    if (this.tbody) {
      this.tbody.innerHTML = `<tr><td colspan="10" class="px-6 py-4 text-center text-slate-400">Actualizando...</td></tr>`;
    }
    try {
      const data = await this.fetchData();
      this.allData = data || [];
      // Re-apply current search query if exists
      const q = this.searchInput ? this.searchInput.value.toLowerCase() : '';
      if (q) {
        this.filteredData = this.allData.filter(item => this.filterFn(item, q));
      } else {
        this.filteredData = this.allData;
      }
      this.currentPage = 1;
      this.renderTable();
      if (this.onDataLoaded) this.onDataLoaded(this.allData);
    } catch (error) {
      console.error(`Error refreshing data for ${this.entityName}:`, error);
      this.showEmpty();
    }
  }
}
