import React, { useState, useEffect, useRef } from 'react';
import styles from "./Header.module.css";
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollYRef = useRef(0);

    const getButtonColor = () => {
        switch (location.pathname) {
            case '/about':
                return '#85AE72';
            case '/pallets':
                return '#FFAD5B';
            case '/services':
                return '#bad3edff';
            case '/contacts':
                return '#C4C59C';
            default:
                return '#85AE72';
        }
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleCall = () => {
        window.location.href = 'tel:+79214060896';
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (menuOpen) {
            scrollYRef.current = window.scrollY;
            
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';

            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            document.documentElement.style.overflow = '';

            window.scrollTo(0, scrollYRef.current);
        }
        
        return () => {
            if (menuOpen) {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.overflow = '';
                document.body.style.width = '';
                document.documentElement.style.overflow = '';
                window.scrollTo(0, scrollYRef.current);
            }
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && menuOpen) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    useEffect(() => {
        const headerHeight = window.innerWidth <= 768 ? 70 : 80;

        const style = document.createElement('style');
        style.innerHTML = `
            body {
                padding-top: ${headerHeight}px;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.desktopNav}>
                    <button
                        className={isActive('/about') ? styles.active : ''}
                        onClick={() => navigate('/about')}
                    >
                        О компании
                    </button>
                    <button
                        className={isActive('/pallets') ? styles.active : ''}
                        onClick={() => navigate('/pallets')}
                    >
                        Поддоны
                    </button>
                    <button
                        className={isActive('/services') ? styles.active : ''}
                        onClick={() => navigate('/services')}
                    >
                        Услуги
                    </button>
                    <button
                        className={isActive('/contacts') ? styles.active : ''}
                        onClick={() => navigate('/contacts')}
                    >
                        Контакты
                    </button>
                </nav>

                <button 
                    className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={styles.contacts}>
                    <div className={styles.phone}>8-921-406-08-96</div>
                    <button 
                        className={styles.callBtn} 
                        style={{ backgroundColor: getButtonColor() }}
                        onClick={handleCall}
                    >
                        Позвонить
                    </button>
                </div>

                <div 
                    className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
                    onClick={closeMenu}
                    role="button"
                    tabIndex={0}
                    aria-label="Закрыть меню"
                />

                <div 
                    className={`${styles.mobileMenu} ${menuOpen ? styles.show : ''}`}
                    role="menu"
                    aria-hidden={!menuOpen}
                >
                    <button 
                        onClick={() => handleNavigate('/about')}
                        role="menuitem"
                    >
                        О компании
                    </button>
                    <button 
                        onClick={() => handleNavigate('/pallets')}
                        role="menuitem"
                    >
                        Поддоны
                    </button>
                    <button 
                        onClick={() => handleNavigate('/services')}
                        role="menuitem"
                    >
                        Услуги
                    </button>
                    <button 
                        onClick={() => handleNavigate('/contacts')}
                        role="menuitem"
                    >
                        Контакты
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;