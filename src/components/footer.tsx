export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-background border-t border-border">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {currentYear} Zamin Askari Rizvi. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/ZaminAskari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/zaminaskari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:contact@zaminaskari.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
