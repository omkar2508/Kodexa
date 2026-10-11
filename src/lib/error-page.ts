const errorCopy = {
  en: {
    title: "This page didn't load",
    message: "Something went wrong on our end. You can try refreshing or head back home.",
    retry: "Try again",
    home: "Go home",
  },
  mr: {
    title: "हे पान लोड झाले नाही",
    message: "काहीतरी चुकले. पुन्हा प्रयत्न करा किंवा मुख्य पानावर जा.",
    retry: "पुन्हा प्रयत्न करा",
    home: "मुख्य पानावर जा",
  },
  hi: {
    title: "यह पेज लोड नहीं हो पाया",
    message: "कुछ गड़बड़ हुई। फिर कोशिश करें या होम पेज पर जाएँ।",
    retry: "फिर कोशिश करें",
    home: "होम पेज पर जाएँ",
  },
} as const;

export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1 id="error-title">${errorCopy.en.title}</h1>
      <p id="error-message">${errorCopy.en.message}</p>
      <div class="actions">
        <button id="error-retry" class="primary" onclick="location.reload()">${errorCopy.en.retry}</button>
        <a id="error-home" class="secondary" href="/">${errorCopy.en.home}</a>
      </div>
    </div>
    <script>
      (() => {
        const translations = ${JSON.stringify(errorCopy)};
        let lang = "en";
        try {
          const saved = localStorage.getItem("kodexa-lang");
          if (saved === "mr" || saved === "hi") lang = saved;
        } catch (error) {
          console.error("Unable to read the saved language preference.", error);
        }
        const copy = translations[lang];
        document.documentElement.lang = lang;
        document.title = copy.title;
        document.getElementById("error-title").textContent = copy.title;
        document.getElementById("error-message").textContent = copy.message;
        document.getElementById("error-retry").textContent = copy.retry;
        document.getElementById("error-home").textContent = copy.home;
      })();
    </script>
  </body>
</html>`;
}
