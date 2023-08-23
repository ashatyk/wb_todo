import React, { memo, useMemo } from 'react';
import classnames from 'classnames/bind';
import i18next from 'i18next';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Header';

const BASE_LOGO_LINK =
  'https://mstatic.wbstatic.net/suppliers-portal-header-logo/0.0.4';

export const Header = memo(() => {
  const locale = i18next.language;

  const desktopHref = useMemo(
    () => `${BASE_LOGO_LINK}/desktop-${locale}.svg`,
    [locale],
  );
  const mobileHref = useMemo(
    () => `${BASE_LOGO_LINK}/mobile-${locale}.svg`,
    [locale],
  );

  return (
    <div className={cn(`${BLOCK_NAME}`)}>
      <div className={cn(`${BLOCK_NAME}__main`)}>
        <picture className={cn(`${BLOCK_NAME}__logo`)}>
          <source media="(min-width: 481px)" srcSet={desktopHref} />
          <source media="(max-width: 480px)" srcSet={mobileHref} />
          <img
            alt="logo"
            className={cn(`${BLOCK_NAME}__logo-img`)}
            src={mobileHref}
          />
        </picture>
      </div>
    </div>
  );
});
