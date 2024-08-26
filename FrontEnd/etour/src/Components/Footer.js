import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation(); // Initialize the useTranslation hook

    return (
        <footer style={styles.footer}>
            <h2>{t('company_name')}</h2>
            <h6>{t('address')}</h6>
            <h6>{t('telephone')}</h6>
            <p>{t('copyright')}</p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
    },
};

export default Footer;
