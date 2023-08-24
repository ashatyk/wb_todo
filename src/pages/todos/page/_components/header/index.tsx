import React, { useMemo } from 'react';
import classnames from 'classnames/bind';
import i18next from 'i18next';
import { BASE_LOGO_LINK } from '@/pages/todos/page/_components/header/constants';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Header';

export const Header = () => {
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
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__main`)}>
        <picture className={cn(`${BLOCK_NAME}__logo`)}>
          <img
            alt="logo"
            className={cn(`${BLOCK_NAME}__logo-img`)}
            src={mobileHref}
          />
        </picture>
      </div>
    </div>
  );
};
