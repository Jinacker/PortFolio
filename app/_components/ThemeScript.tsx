// Runs before paint to apply the persisted (or system) theme and avoid a flash
// of the wrong color scheme. Kept dependency-free and inlined in the document.
const THEME_SCRIPT = `(function(){try{var stored=localStorage.getItem('theme');var isDark=stored?stored==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',isDark);}catch(e){}})();`;

const ThemeScript = () => <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;

export default ThemeScript;
