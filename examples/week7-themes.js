// ====================================================================
// CIS 133JS — Week 7 Community Color Themes Dataset
// ====================================================================
// Each theme maps a popular open-source community color palette onto
// the 8 semantic CSS custom properties defined in `src/common/style.css`.
// You can also reuse any of these palettes in your Final Project!
// ====================================================================

export const themes = [
  {
    id: 'catppuccin-latte',
    name: 'Catppuccin Latte',
    mode: 'light',
    author: 'Catppuccin Org',
    repoUrl: 'https://github.com/catppuccin/catppuccin',
    colors: {
      '--color-bg': '#eff1f5',
      '--color-surface': '#e6e9ef',
      '--color-surface-hover': '#ccd0da',
      '--color-border': '#bcc0cc',
      '--color-text': '#4c4f69',
      '--color-text-muted': '#6c6f85',
      '--color-primary': '#1e66f5',
      '--color-primary-hover': '#7287fd',
    },
  },
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    mode: 'dark',
    author: 'Catppuccin Org',
    repoUrl: 'https://github.com/catppuccin/catppuccin',
    colors: {
      '--color-bg': '#1e1e2e',
      '--color-surface': '#313244',
      '--color-surface-hover': '#45475a',
      '--color-border': '#585b70',
      '--color-text': '#cdd6f4',
      '--color-text-muted': '#a6adc8',
      '--color-primary': '#89b4fa',
      '--color-primary-hover': '#b4befe',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    mode: 'dark',
    author: 'Sven Greb (Arctic Ice Studio)',
    repoUrl: 'https://github.com/nordtheme/nord',
    colors: {
      '--color-bg': '#2e3440',
      '--color-surface': '#3b4252',
      '--color-surface-hover': '#434c5e',
      '--color-border': '#4c566a',
      '--color-text': '#eceff4',
      '--color-text-muted': '#d8dee9',
      '--color-primary': '#88c0d0',
      '--color-primary-hover': '#81a1c1',
    },
  },
  {
    id: 'rose-pine-dawn',
    name: 'Rosé Pine Dawn',
    mode: 'light',
    author: 'Rosé Pine',
    repoUrl: 'https://github.com/rose-pine/rose-pine-theme',
    colors: {
      '--color-bg': '#faf4ed',
      '--color-surface': '#fffaf3',
      '--color-surface-hover': '#f2e9e1',
      '--color-border': '#dfdad9',
      '--color-text': '#575279',
      '--color-text-muted': '#797593',
      '--color-primary': '#907aa9',
      '--color-primary-hover': '#d7827e',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    mode: 'dark',
    author: 'Zeno Rocha & Dracula Team',
    repoUrl: 'https://github.com/dracula/dracula-theme',
    colors: {
      '--color-bg': '#282a36',
      '--color-surface': '#343746',
      '--color-surface-hover': '#44475a',
      '--color-border': '#6272a4',
      '--color-text': '#f8f8f2',
      '--color-text-muted': '#bfbfbf',
      '--color-primary': '#bd93f9',
      '--color-primary-hover': '#ff79c6',
    },
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    mode: 'dark',
    author: 'Ethan Schoonover',
    repoUrl: 'https://github.com/altercation/solarized',
    colors: {
      '--color-bg': '#002b36',
      '--color-surface': '#073642',
      '--color-surface-hover': '#0d4654',
      '--color-border': '#586e75',
      '--color-text': '#eee8d5',
      '--color-text-muted': '#93a1a1',
      '--color-primary': '#268bd2',
      '--color-primary-hover': '#2aa198',
    },
  },
]

// --------------------------------------------------------------------
// Optional Sample Preview Markup:
// Feel free to drop this into your rendered template so you can see
// how the starter kit's CSS custom properties style headings, text,
// blockquotes, inline code, and links across every theme.
// --------------------------------------------------------------------
export const previewMarkup = `
  <section class="theme-preview">
    <h3>Sample Elements Preview</h3>
    <p>
      Every element in this preview is styled automatically by the semantic
      <code>--color-*</code> custom properties in <code>src/common/style.css</code>.
      For a deeper dive into scope and closures, explore Kyle Simpson's
      <a href="https://github.com/getify/You-Dont-Know-JS" target="_blank" rel="noopener noreferrer">
        You Don't Know JS Yet (GitHub repository)
      </a>.
    </p>
    <blockquote>
      <p>
        "Closure is observed when a function uses variable(s) from outer
        scope(s) even while running in a scope where those variables wouldn't
        be accessible."
      </p>
    </blockquote>
  </section>
`
