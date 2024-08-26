import React from "react";
import { useTranslation } from 'react-i18next';
import Marquee from "react-fast-marquee";

const Crawling = () => {
  const { t } = useTranslation();

  return (
    <Marquee>
      <b>
        <i style={{ fontSize: '32px' }}>
          {t('Make memories that last a lifetime, Discover the unseen.')}
        </i>
      </b>
    </Marquee>
  );
};

export default Crawling;
