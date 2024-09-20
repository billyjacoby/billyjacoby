'use client';
import { useEffect } from 'react';

const GlowCard = ({ children, identifier }) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(
      `.glow-container-${identifier}`
    ) as HTMLElement;
    const CARDS = document.querySelectorAll(
      `.glow-card-${identifier}`
    ) as NodeListOf<HTMLElement>;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect();

        if (
          event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          CARD.style.setProperty('--active', (1).toString());
        } else {
          CARD.style.setProperty('--active', CONFIG.opacity.toString());
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];

        let ANGLE =
          (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
            180) /
          Math.PI;

        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

        CARD.style.setProperty('--start', (ANGLE + 90).toString());
      }
    };

    document.body.addEventListener('pointermove', UPDATE);

    const RESTYLE = () => {
      CONTAINER?.style.setProperty('--gap', CONFIG.gap.toString());
      CONTAINER?.style.setProperty('--blur', CONFIG.blur.toString());
      CONTAINER?.style.setProperty('--spread', CONFIG.spread.toString());
      CONTAINER?.style.setProperty(
        '--direction',
        CONFIG.vertical ? 'column' : 'row'
      );
    };

    RESTYLE();
    UPDATE(null);

    // Cleanup event listener
    return () => {
      document.body.removeEventListener('pointermove', UPDATE);
    };
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article
        className={`glow-card glow-card-${identifier} relative h-fit w-full cursor-pointer rounded-xl border border-[#2a2e5a] bg-[#101123] text-gray-200 transition-all duration-300 hover:border-transparent`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;