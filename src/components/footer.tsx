export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-[#050505] border-t border-white/[0.04]">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/30 text-center md:text-left">
                    &copy; {currentYear} Zamin Askari Rizvi. All rights reserved.
                </p>
                <div className="flex items-center gap-5">
                    {[
                        { label: "GitHub", href: "https://github.com/zaaammmiiinnn" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/zamin-askari-rizvi/" },
                        { label: "LeetCode", href: "https://leetcode.com/u/zaaammmiiinnn/" },
                        { label: "Email", href: "mailto:zaminaskari.work@gmail.com" },
                    ].map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("mailto") ? undefined : "_blank"}
                            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                            className="text-xs text-white/25 hover:text-blue-400 transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
