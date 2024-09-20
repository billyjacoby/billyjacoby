import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import React from 'react';
import { SiteLogo } from './SiteLogo';

const Header = () => {
  return (
    <header className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div>
          <SiteLogo />
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => {
              return (
                <span key={link.title} className="hidden sm:block">
                  <Link
                    legacyBehavior
                    href={link.href}
                    className="font-medium text-gray-900 dark:text-gray-100"
                  >
                    {link.title}
                  </Link>
                </span>
              );
            })}
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
