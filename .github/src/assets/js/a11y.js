// a11y.js - Sistema completo de acessibilidade
class A11yManager {
  constructor() {
    this.focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.init();
  }

  init() {
    this.setupSkipLinks();
    this.setupFocusTraps();
    this.setupKeyboardNavigation();
    this.setupAriaLiveRegions();
    this.setupScreenReaderAnnouncements();
    this.observeDynamicContent();
  }

  // 1. Skip Links para navegação por teclado
  setupSkipLinks() {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Ir para o conteúdo principal";
    skipLink.setAttribute(
      "aria-label",
      "Pular navegação e ir para o conteúdo principal"
    );

    document.body.insertBefore(skipLink, document.body.firstChild);

    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();
        mainContent.removeAttribute("tabindex");
      }
    });
  }

  // 2. Gerenciamento de foco em modais
  setupFocusTraps() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });
  }

  closeAllModals() {
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => {
      modal.classList.remove("show");
      const closeButton = modal.querySelector("[data-a11y-close]");
      if (closeButton) closeButton.focus();
    });
  }

  // 3. Navegação por teclado avançada
  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Navegação em menus dropdown
      if (e.key === "Enter" || e.key === " ") {
        this.handleEnterSpace(e);
      }

      // Navegação por setas em listas
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        this.handleArrowKeys(e);
      }

      // Atalhos de teclado
      if (e.altKey) {
        this.handleAccessKeys(e);
      }
    });
  }

  handleEnterSpace(e) {
    const target = e.target;

    if (target.classList.contains("dropdown-toggle")) {
      e.preventDefault();
      this.toggleDropdown(target);
    }

    if (target.hasAttribute("data-a11y-toggle")) {
      e.preventDefault();
      this.toggleA11yElement(target);
    }
  }

  handleArrowKeys(e) {
    const target = e.target;
    const parent = target.closest('[role="menu"], [role="listbox"]');

    if (!parent) return;

    e.preventDefault();
    const items = parent.querySelectorAll('[role="menuitem"], [role="option"]');
    const currentIndex = Array.from(items).indexOf(target);
    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
    }

    items[nextIndex].focus();
  }

  handleAccessKeys(e) {
    const accessKeys = {
      1: '[data-accesskey="1"]',
      2: '[data-accesskey="2"]',
      3: '[data-accesskey="3"]',
      s: ".search-input",
      m: ".main-menu",
      c: ".contact-link",
    };

    const selector = accessKeys[e.key];
    if (selector) {
      e.preventDefault();
      const element = document.querySelector(selector);
      if (element) element.focus();
    }
  }

  // 4. Regiões ARIA Live para atualizações dinâmicas
  setupAriaLiveRegions() {
    const createLiveRegion = (id, politeness = "polite") => {
      const region = document.createElement("div");
      region.id = id;
      region.setAttribute("aria-live", politeness);
      region.setAttribute("aria-atomic", "true");
      region.className = "sr-only";
      document.body.appendChild(region);
      return region;
    };

    this.alertRegion = createLiveRegion("a11y-alerts", "assertive");
    this.statusRegion = createLiveRegion("a11y-status", "polite");
  }

  announceToScreenReader(message, politeness = "polite") {
    const region =
      politeness === "assertive" ? this.alertRegion : this.statusRegion;
    region.textContent = "";
    setTimeout(() => {
      region.textContent = message;
    }, 100);
  }

  // 5. Observar conteúdo dinâmico
  observeDynamicContent() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            this.enhanceNewContent(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  enhanceNewContent(element) {
    // Adicionar atributos ARIA a elementos dinâmicos
    const buttons =
      element.querySelectorAll?.("button:not([aria-label])") || [];
    buttons.forEach((button) => {
      if (!button.textContent.trim() && !button.getAttribute("aria-label")) {
        const label =
          button.getAttribute("title") || button.getAttribute("data-label");
        if (label) button.setAttribute("aria-label", label);
      }
    });

    // Melhorar formulários dinâmicos
    const forms = element.querySelectorAll?.("form") || [];
    forms.forEach((form) => {
      this.enhanceFormAccessibility(form);
    });
  }

  enhanceFormAccessibility(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input, index) => {
      if (!input.id) {
        input.id = `input-${Date.now()}-${index}`;
      }

      const label = form.querySelector(`label[for="${input.id}"]`);
      if (!label && input.getAttribute("placeholder")) {
        const newLabel = document.createElement("label");
        newLabel.htmlFor = input.id;
        newLabel.textContent = input.getAttribute("placeholder");
        newLabel.className = "sr-only";
        input.parentNode.insertBefore(newLabel, input);
      }
    });
  }

  // 6. Utilitários de acessibilidade
  toggleDropdown(button) {
    const dropdown = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", !isExpanded);
    dropdown.hidden = isExpanded;

    if (!isExpanded) {
      const firstItem = dropdown.querySelector('[role="menuitem"]');
      if (firstItem) firstItem.focus();
    }
  }

  toggleA11yElement(button) {
    const targetId = button.getAttribute("data-a11y-toggle");
    const target = document.getElementById(targetId);

    if (target) {
      const isHidden = target.hidden;
      target.hidden = !isHidden;
      button.setAttribute("aria-expanded", !isHidden);

      this.announceToScreenReader(
        `${target.getAttribute("aria-label") || "Elemento"} ${
          isHidden ? "aberto" : "fechado"
        }`
      );
    }
  }

  // 7. Gerenciamento de foco para SPA
  setupSPAFocusManagement() {
    let lastFocusedElement = null;

    document.addEventListener("focusin", (e) => {
      lastFocusedElement = e.target;
    });

    // Restaurar foco após navegação SPA
    window.addEventListener("routeChanged", () => {
      const mainHeading = document.querySelector('h1, [role="heading"]');
      if (mainHeading) {
        mainHeading.setAttribute("tabindex", "-1");
        mainHeading.focus();
        setTimeout(() => mainHeading.removeAttribute("tabindex"), 1000);
      }
    });
  }
}

// Inicializar acessibilidade
document.addEventListener("DOMContentLoaded", () => {
  window.a11yManager = new A11yManager();
});

export default A11yManager;
