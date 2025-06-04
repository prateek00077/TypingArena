
//Array having 300 random words
const words = [
  "Prateek", "Pandey", "nit", "jamshedpur", "keyboard", "typing", "speed", "accuracy", "challenge",
  "focus", "practice", "improve", "skills", "coding", "logic", "test", "game", "competition",
  "javascript", "react", "frontend", "backend", "node", "express", "mongo", "database", "tailwind",
  "component", "props", "state", "effect", "hook", "function", "variable", "array", "object", "loop",
  "condition", "render", "element", "html", "css", "layout", "design", "performance", "optimization",
  "syntax", "debug", "console", "terminal", "npm", "vite", "webpack", "github", "commit", "push",
  "pull", "branch", "merge", "conflict", "clone", "remote", "origin", "project", "folder", "file",
  "import", "export", "default", "return", "string", "number", "boolean", "null", "undefined", "true",
  "false", "class", "id", "div", "span", "section", "header", "footer", "main", "article", "nav",
  "link", "button", "input", "form", "submit", "event", "listener", "handler", "click", "change",
  "keydown", "keyup", "press", "char", "word", "space", "enter", "tab", "shift", "control", "alt",
  "backspace", "delete", "style", "color", "margin", "padding", "border", "radius", "shadow", "flex",
  "grid", "center", "align", "justify", "gap", "column", "row", "wrap", "nowrap", "position", "fixed",
  "absolute", "relative", "zindex", "overflow", "scroll", "auto", "hidden", "transition", "duration",
  "ease", "hover", "focus", "active", "disabled", "responsive", "mobile", "desktop", "dark", "light",
  "theme", "custom", "animation", "frame", "fps", "canvas", "svg", "icon", "image", "photo", "text",
  "bold", "italic", "underline", "strike", "line", "height", "width", "max", "min", "full", "half",
  "left", "right", "top", "bottom", "centered", "absolute", "sticky", "menu", "dropdown", "modal",
  "overlay", "transition", "toast", "alert", "notification", "message", "success", "error", "info",
  "warning", "debug", "build", "deploy", "server", "client", "token", "auth", "login", "logout",
  "session", "cookie", "local", "storage", "cache", "request", "response", "json", "api", "rest",
  "fetch", "axios", "hook", "context", "provider", "consumer", "middleware", "route", "path", "link",
  "navigate", "router", "params", "query", "search", "filter", "sort", "map", "reduce", "forEach",
  "find", "index", "slice", "splice", "join", "split", "replace", "match", "test", "regex", "stringify",
  "parse", "date", "time", "timer", "interval", "setTimeout", "setInterval", "clear", "start", "stop",
  "pause", "resume", "restart", "reload", "refresh", "scroll", "drag", "drop", "select", "highlight",
  "mark", "type", "input", "output", "result", "score", "rank", "leaderboard", "typing", "arena",
  "practice", "master", "fast", "accuracy", "mistake", "correction", "stats", "history", "session",
  "words", "characters", "quote", "passage", "paragraph", "level", "custom", "mode", "theme", "profile",
  "user", "dashboard", "settings", "account", "password", "email", "confirm", "save", "edit", "delete"
];

//function to generate an array of random words which will shown to the user
//It will be taking no. of words as a parameter
const generateRandomText = (wordscount) => {
    let result = [];

    for(let i = 0; i < wordscount; i++){
        let randomIndex = Math.floor(Math.random() * (words.length));
        result.push(words[randomIndex]);
    }
    return result.join(" ");
}

export {generateRandomText}