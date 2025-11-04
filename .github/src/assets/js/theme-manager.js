// theme-manager.js - Gerenciador de temas de alto contraste e modo escuro
class ThemeManager {
  constructor() {
    this.themes = {
      light: "light",
      dark: "dark",
      highContrast: "high-contrast",
    };
    this.currentTheme = this.getSavedTheme() || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeSwitcher();
    this.setupSystemPreferenceListener();
  }

  createThemeSwitcher() {
    const switcher = document.createElement("div");
    switcher.className = "theme-switcher";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Selecionar tema de visualização");

    switcher.innerHTML = `
            <button class="theme-btn" data-theme="light" aria-pressed="${
              this.currentTheme === "light"
            }">
                <span class="sr-only">Tema claro</span>
                <i class="fas fa-sun" aria-hidden="true"></i>
            </button>
            <button class="theme-btn" data-theme="dark" aria-pressed="${
              this.currentTheme === "dark"
            }">
                <span class="sr-only">Tema escuro</span>
                <i class="fas fa-moon" aria-hidden="true"></i>
            </button>
            <button class="theme-btn" data-theme="high-contrast" aria-pressed="${
              this.currentTheme === "high-contrast"
            }">
                <span class="sr-only">Alto contraste</span>
                <i class="fas fa-assistive-listening-systems" aria-hidden="true"></i>
            </button>
        `;

    // Adicionar ao header
    const header = document.querySelector(".header-content");
    if (header) {
      header.appendChild(switcher);
    }

    this.setupThemeButtons();
  }

  setupThemeButtons() {
    const buttons = document.querySelectorAll(".theme-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const theme = e.currentTarget.dataset.theme;
        this.switchTheme(theme);
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const theme = e.currentTarget.dataset.theme;
          this.switchTheme(theme);
        }
      });
    });
  }

  switchTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.updateButtonStates(theme);

    // Anunciar mudança para leitores de tela
    if (window.a11yManager) {
      window.a11yManager.announceToScreenReader(
        `Tema alterado para ${this.getThemeName(theme)}`
      );
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    // Remover todas as classes de tema
    Object.values(this.themes).forEach((t) => {
      document.body.classList.remove(`theme-${t}`);
    });

    // Adicionar classe do tema atual
    document.body.classList.add(`theme-${theme}`);
  }

  updateButtonStates(activeTheme) {
    const buttons = document.querySelectorAll(".theme-btn");
    buttons.forEach((btn) => {
      const isActive = btn.dataset.theme === activeTheme;
      btn.setAttribute("aria-pressed", isActive);
      btn.classList.toggle("active", isActive);
    });
  }

  getThemeName(theme) {
    const names = {
      light: "claro",
      dark: "escuro",
      "high-contrast": "alto contraste",
    };
    return names[theme] || theme;
  }

  setupSystemPreferenceListener() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const prefersContrast = window.matchMedia("(prefers-contrast: high)");

    prefersDark.addEventListener("change", (e) => {
      if (this.currentTheme === "light" && e.matches) {
        this.switchTheme("dark");
      }
    });

    prefersContrast.addEventListener("change", (e) => {
      if (e.matches) {
        this.switchTheme("high-contrast");
      }
    });
  }

  getSavedTheme() {
    return localStorage.getItem("preferred-theme");
  }

  saveTheme(theme) {
    localStorage.setItem("preferred-theme", theme);
  }
}

export default ThemeManager;
