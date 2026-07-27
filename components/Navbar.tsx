import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight text-white"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Image src="/logo.png" alt="SignalStack logo" width={40} height={40} />
                        <p>SignalStack</p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        href="/#how-it-works"
                        className="rounded-lg px-4 py-2 text-sm uppercase text-slate-200 transition hover:text-white"
                    >
                        How it works
                    </Link>

                    <Link
                        href="/#about-us"
                        className="rounded-lg px-4 py-2 text-sm uppercase text-slate-200 transition hover:text-white"
                    >
                        About us
                    </Link>

                    <Link
                        href="/#testimonials"
                        className="rounded-lg px-4 py-2 text-sm uppercase text-slate-200 transition hover:text-white"
                    >
                        Testimonials
                    </Link>

                    <Link
                        href="/#contact"
                        className="rounded-lg px-4 py-2 text-sm uppercase text-slate-200 transition hover:text-white"
                    >
                        Contact
                    </Link>
                    <Link href="/login">
                        <button className="rounded-lg border border-white px-4 py-2 text-sm uppercase text-slate-200 transition hover:cursor-pointer hover:bg-white hover:text-black">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
