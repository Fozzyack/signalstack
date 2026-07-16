import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12">
            <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-white"
            >
                <div className="flex items-center justify-center gap-4">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
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
                    <button className="rounded-lg px-4 py-2 text-sm border uppercase border-white text-slate-200 transition hover:bg-white hover:text-black hover:cursor-pointer">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
