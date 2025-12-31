import React from 'react';
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerInfo}>
                    <div>
                        <strong className={styles.footerLogo}>БизнесПаллет</strong>
                        <br />
                        <small className={styles.footerText}>Наша логистика — наша ответственность.</small>
                    </div>
                    <a href="mailto:bp@business-pallet.ru" className={styles.footerEmail}>
                        Корпоративная почта: bp@business-pallet.ru
                    </a>
                    <strong className={styles.footerPhone}>
                        8-921-406-08-96
                    </strong>
                </div>
            </div>
        </footer>
    );
};

export default Footer;