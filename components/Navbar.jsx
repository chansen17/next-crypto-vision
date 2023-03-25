import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import Search from './Search';

const Navbar = () => {
    return (
        <>
        <div className="w-full fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 via-blue-700 to-green-400 py-3 z-10">
            <nav className="flex items-center gap-3 justify-between mxw">
                <div className="font-semibold text-gray-100 text-xl">CoinVerse</div>
                <Search />
                <ul className="hidden md:flex gap-3 text-gray-100 font-light">
                    <li className="">
                        <Link href="/" className="flex items-center gap-3 justify-between text-md md:text-lg">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/coins" className="flex items-center gap-3 justify-between text-md md:text-lg">
                            <span>Coins</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/" className="flex items-center gap-3 justify-between text-md md:text-lg">
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/" className="flex items-center gap-3 justify-between text-md md:text-lg">
                            <span>News</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Navbar;
