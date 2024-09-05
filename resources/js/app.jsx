import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "MerryMate";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />{" "}
                <Toaster
                    position="bottom-right"
                    expand={true}
                    richColors
                    // offset="50px"
                    // closeButton
                    toastOptions={
                        {
                            // style: { background: "orange-500" },
                            // className: "bg-orange-500",
                        }
                    }
                />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
