import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
  }[size];

  return (
    <div id="sk-brand-logo" className="flex items-center gap-3 select-none">
      {/* Brand Icon Shield / Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-xl shadow-md transition-transform duration-300 hover:scale-105 ${
          sizeClasses.icon
        } ${
          isLight
            ? 'bg-gradient-to-br from-[#EAD59A] via-[#C5A059] to-[#8C6D2C] text-[#1B3022]'
            : 'bg-gradient-to-br from-[#1B3022] to-[#101D15] border border-[#C5A059]/40 text-[#EAD59A]'
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-3/4 h-3/4 fill-current drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Tea Cup with Steam and Leaf Motif */}
          <path
            d="M8 18C8 24.5 13 29 20 29C27 29 32 24.5 32 18H8Z"
            fill="currentColor"
            opacity="0.95"
          />
          {/* Cup Handle */}
          <path
            d="M31 19C33.5 19 35.5 21 35.5 23.5C35.5 26 33.5 28 31 28"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Saucer */}
          <path
            d="M6 31C13 33 27 33 34 31"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Subtle Tea Leaf Emerging */}
          <path
            d="M17 14C17 10 20 7 24 6C24 10 21 13 17 14Z"
            fill="#C5A059"
          />
          {/* Rising Steam Lines */}
          <path
            d="M13 13C12.5 11 13.5 9 14.5 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M20 12C19.5 10 20.5 8 21.5 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-extrabold tracking-wider ${
              sizeClasses.text
            } ${
              isLight ? 'text-[#FDFBF7]' : 'text-[#1B3022]'
            }`}
          >
            SK
          </span>
          <span
            className={`font-semibold tracking-wide uppercase ${
              sizeClasses.text
            } ${
              isLight ? 'text-[#EAD59A]' : 'text-[#1B3022]'
            }`}
          >
            TEA
          </span>
          <span
            className={`text-xs font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#C5A059]/15 text-[#8C6D2C] ${
              isLight ? 'text-[#EAD59A] bg-white/10' : ''
            }`}
          >
            CO.
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-tight ${
              sizeClasses.sub
            } ${isLight ? 'text-white/80' : 'text-[#63756A]'}`}
          >
            Quality Tea, Trusted Service
          </span>
        )}
      </div>
    </div>
  );
};
