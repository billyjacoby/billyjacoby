'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
];

function Navbar() {
  const path = usePathname();
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex shrink-0 items-center">
          <Link href="/" className=" text-accent-green text-3xl font-bold">
            billy jacoby
          </Link>
        </div>

        <ul
          className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:size-auto md:max-h-screen md:flex-row md:space-x-1 md:border-0 md:opacity-100"
          id="navbar-default"
        >
          {NavItems.map((item) => (
            <li key={item.name}>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={item.href}
              >
                <div
                  className={clsx(
                    'hover:text-accent-pink text-sm transition-colors duration-300',
                    item.href === path ? 'text-accent-pink' : 'text-white'
                  )}
                >
                  {item.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
