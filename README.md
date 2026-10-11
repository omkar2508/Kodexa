# Kodexa Digital

The Kodexa Digital website is built with React, TypeScript, Vite, TanStack
Router, and Tailwind CSS. It includes the agency homepage, services, portfolio
and project details, industries, about, contact, quote, and locations pages.

## Development

Install dependencies with Bun and start the development server:

```sh
bun install
bun run dev
```

Run the available checks:

```sh
bun run test
bun run lint
bun run build
```

## Contact configuration

The contact email is read from the public `VITE_CONTACT_EMAIL` environment
variable. Leave it unset until the verified business email is available; the
site then does not display a placeholder address.

The contact and quote forms currently provide client-side validation only.
Their entries are not submitted or stored. Do not present the forms as an
active inquiry channel until a backend or email delivery integration has been
configured and verified.

## Languages

The site supports English, Marathi, and Hindi through the language selector in
the desktop navigation and mobile menu. The selected language is saved in
`localStorage` and restored on later visits. English is the default when no
valid preference has been saved. Page titles, descriptions, and the document
language are updated with the selected language; URLs remain language-neutral.
"# Kodexa" 
