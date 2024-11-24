import React from "react";

export default function Layout ({ children }: { children: React.ReactNode}) {
    return (
        <div>
            <header>HEADER</header>
            <main>{children}</main>
            <footer>FOOTER</footer>        
        </div>
    )
}