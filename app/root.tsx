import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import pkg from '@mui/material/locale/index.js';
const { esES } = pkg;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <Meta/>
        <Links/>
    </head>
    <body>
        <ThemeProvider theme={createTheme(esES)}>
            <CssBaseline/>
            {children}
            <ScrollRestoration/>
            <Scripts/>
        </ThemeProvider>
    </body>
    </html>
  );
}

export default function App() {
    return <Outlet/>;
}

export function HydrateFallback() {
    return <p>Loading...</p>;
}
