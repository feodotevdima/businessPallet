import React, { useState, useEffect, useRef } from 'react';
import styles from "./PalletsPage.module.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface CatalogItem {
    path: string;
    text: string;
}

const PalletsPage: React.FC = () => {
    const [group, setGroup] = useState(0);
    const [currentPallet, setCurrentPallet] = useState(0);
    const [currentItems, setCurrentItems] = useState<CatalogItem[]>([]);
    const [text, setText] = useState('');
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isChangingSlide, setIsChangingSlide] = useState(false);

    const touchStartX = useRef(0);
    const touchCurrentX = useRef(0);
    const slideContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const SWIPE_THRESHOLD = 80;
    const MAX_SWIPE_OFFSET = 200;

    const menuItems = [
        { id: 0, text: 'Евро группа' },
        { id: 1, text: 'Евро группа (БК)' },
        { id: 2, text: 'Типовая группа' },
        { id: 3, text: 'Широкая группа' }
    ];

    useEffect(() => {
        document.title = 'Поддоны';
    }, []);

    const onMenuItemClick = (groupIndex: number) => {
        setGroup(groupIndex);
        setCurrentPallet(0);
        setSwipeOffset(0);
        setIsMobileMenuOpen(false); // Закрываем меню после выбора

        if (groupIndex === 0) {
            setCurrentItems([
                {
                    path: '/assets/catalog/euro/variety1.svg',
                    text: `Европоддон б/у 800х1200 мм 1 сорт, грузоподъемность 2500 кг.`
                },
                {
                    path: '/assets/catalog/euro/variety2.svg',
                    text: `Европоддон б/у 800х1200 мм 2 сорт, грузоподъемность 2500 кг.`
                }
            ]);
            setText('Евро группа')
        } else if (groupIndex === 1) {
            setCurrentItems([
                {
                    path: '/assets/catalog/euroBk/variety1.svg',
                    text: `Европоддон б/у 800х1200 мм 1 сорт, грузоподъемность 2500 кг. (БК)`
                },
                {
                    path: '/assets/catalog/euroBk/variety2.svg',
                    text: `Европоддон б/у 800х1200 мм 2 сорт, грузоподъемность 2500 кг. (БК)`
                }
            ]);
            setText('Евро группа (БК)')
        } else if (groupIndex === 2) {
            setCurrentItems([
                {
                    path: '/assets/catalog/typical/variety1.svg',
                    text: `Поддон б/у 800х1200 мм 1 сорт, грузоподъемность 1500 кг.`
                },
                {
                    path: '/assets/catalog/typical/variety2.svg',
                    text: `Поддон б/у 800х1200 мм 2 сорт, грузоподъемность 1500 кг.`
                }
            ]);
            setText('Типовая группа')
        } else if (groupIndex === 3) {
            setCurrentItems([
                {
                    path: '/assets/catalog/wide/variety1.svg',
                    text: `Поддон б/у 1000х1200 мм 1 сорт, грузоподъемность 1500 кг.`
                },
                {
                    path: '/assets/catalog/wide/variety2.svg',
                    text: `Поддон б/у 1000х1200 мм 2 сорт, грузоподъемность 1500 кг.`
                }
            ]);
            setText('Широкая группа')
        }
    };

    const nextPallet = () => {
        if (currentItems.length === 0) return;

        setSlideDirection('right');
        setIsAnimatingIn(false);

        setTimeout(() => {
            setCurrentPallet((prev) => (prev + 1) % currentItems.length);
            setSlideDirection(null);
            setIsAnimatingIn(true);

            setTimeout(() => {
                setIsAnimatingIn(false);
            }, 300);
        }, 300);
    };

    const prevPallet = () => {
        if (currentItems.length === 0) return;

        setSlideDirection('left');
        setIsAnimatingIn(false);

        setTimeout(() => {
            setCurrentPallet((prev) => (prev - 1 + currentItems.length) % currentItems.length);
            setSlideDirection(null);
            setIsAnimatingIn(true);

            setTimeout(() => {
                setIsAnimatingIn(false);
            }, 300);
        }, 300);
    };

    const goToPallet = (index: number) => {
        if (index === currentPallet) return;

        const direction = index < currentPallet ? 'left' : 'right';
        setSlideDirection(direction);

        setTimeout(() => {
            setCurrentPallet(index);
            setSlideDirection(null);
        }, 300);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchCurrentX.current = e.touches[0].clientX;
        setIsSwiping(true);
        setSwipeOffset(0);
        setIsChangingSlide(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isSwiping || isChangingSlide) return;

        e.preventDefault();
        touchCurrentX.current = e.touches[0].clientX;
        const deltaX = touchCurrentX.current - touchStartX.current;

        let offset = deltaX;
        if (Math.abs(deltaX) > MAX_SWIPE_OFFSET) {
            offset = deltaX > 0 ? MAX_SWIPE_OFFSET : -MAX_SWIPE_OFFSET;
        }

        setSwipeOffset(offset);
    };

    const handleTouchEnd = () => {
        if (!isSwiping || isChangingSlide) return;

        setIsSwiping(false);
        const deltaX = touchCurrentX.current - touchStartX.current;

        const shouldSwitch = Math.abs(deltaX) > SWIPE_THRESHOLD;

        if (shouldSwitch) {
            setIsChangingSlide(true);

            const targetOffset = deltaX > 0 ? MAX_SWIPE_OFFSET * 2 : -MAX_SWIPE_OFFSET * 2;
            const duration = 200;
            const startOffset = swipeOffset;
            const startTime = Date.now();

            const animateSwipeCompletion = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentOffset = startOffset + (targetOffset - startOffset) * easeProgress;

                setSwipeOffset(currentOffset);

                if (progress < 1) {
                    requestAnimationFrame(animateSwipeCompletion);
                } else {
                    if (deltaX > 0) {
                        setCurrentPallet((prev) => (prev - 1 + currentItems.length) % currentItems.length);
                    } else {
                        setCurrentPallet((prev) => (prev + 1) % currentItems.length);
                    }

                    setIsAnimatingIn(true);
                    setSwipeOffset(0);

                    setTimeout(() => {
                        setIsAnimatingIn(false);
                        setIsChangingSlide(false);
                    }, 300);
                }
            };

            requestAnimationFrame(animateSwipeCompletion);
        } else {
            animateReturnToCenter();
        }

        touchStartX.current = 0;
        touchCurrentX.current = 0;
    };

    const animateReturnToCenter = () => {
        const duration = 200;
        const startOffset = swipeOffset;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentOffset = startOffset * (1 - easeProgress);

            setSwipeOffset(currentOffset);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setSwipeOffset(0);
            }
        };

        requestAnimationFrame(animate);
    };

    const getSlideStyle = () => {
        const style: React.CSSProperties = {};

        if (isSwiping || Math.abs(swipeOffset) > 0) {
            style.transform = `translateX(${swipeOffset}px)`;
            style.transition = isSwiping ? 'none' : 'transform 0.2s ease-out';

            if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
                const opacity = 1 - Math.abs(swipeOffset) / (MAX_SWIPE_OFFSET * 3);
                style.opacity = Math.max(0.7, opacity);
            }
        }

        return style;
    };

    const getSlideClasses = () => {
        const classes = [styles.carouselSlide];

        if (slideDirection === 'left') {
            classes.push(styles.slideOutLeft);
        } else if (slideDirection === 'right') {
            classes.push(styles.slideOutRight);
        }

        return classes.join(' ');
    };

    // Закрываем dropdown при клике вне его области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        onMenuItemClick(0);
    }, []);

    return (
        <div className={styles.wrapper}>
            <section className={styles.hero}>
                {/* Боковое меню для десктопа */}
                <div className={`${styles.heroOverlay} ${isMobileMenuOpen ? styles.show : ''}`}>
                    <div className={styles.heroCard}>
                        <h1>Поддоны</h1>
                        <div className={styles.line}></div>
                        <ul>
                            <li onClick={() => onMenuItemClick(0)} className={group === 0 ? styles.activeMenuItem : undefined}>Евро группа</li>
                            <li onClick={() => onMenuItemClick(1)} className={group === 1 ? styles.activeMenuItem : undefined}>Евро группа (БК)</li>
                            <li onClick={() => onMenuItemClick(2)} className={group === 2 ? styles.activeMenuItem : undefined}>Типовая группа</li>
                            <li onClick={() => onMenuItemClick(3)} className={group === 3 ? styles.activeMenuItem : undefined}>Широкая группа</li>
                        </ul>
                    </div>
                </div>

                {currentItems.length > 0 && (
                    <div className={styles.carouselContainer} ref={dropdownRef}>
                        {/* Заголовок с dropdown для мобильных */}
                        <div style={{ position: 'relative', marginBottom: '30px' }}>
                            <h1
                                className={styles.carouselTitle}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {text}
                                <span className={`${styles.arrowIcon} ${isMobileMenuOpen ? styles.open : ''}`}>
                                    {isMobileMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
                                </span>
                            </h1>

                            {/* Dropdown меню для мобильных */}
                            <div className={`${styles.dropdownMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                                <ul>
                                    {menuItems.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => onMenuItemClick(item.id)}
                                            className={group === item.id ? styles.activeMenuItem : ''}
                                        >
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div
                            className={styles.carousel}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
                        >
                            <button
                                className={`${styles.carouselButton} ${styles.prevButton}`}
                                onClick={prevPallet}
                            >
                                <img src='/assets/buttons/prevButton.svg' alt="Previous" />
                            </button>

                            <div
                                className={styles.carouselSlideContainer}
                                ref={slideContainerRef}
                            >
                                <div
                                    className={getSlideClasses()}
                                    style={getSlideStyle()}
                                >
                                    <div className={`
                                        ${styles.carouselContent} 
                                        ${isAnimatingIn ? styles.slideIn : ''}
                                    `}>
                                        <div className={styles.imageWrapper}>
                                            <img
                                                src={currentItems[currentPallet].path}
                                                className={styles.carouselImage}
                                                alt={currentItems[currentPallet].text}
                                                draggable="false"
                                            />
                                        </div>
                                        <div className={styles.textContent}>
                                            <div className={styles.carouselText}>
                                                {currentItems[currentPallet].text}
                                            </div>
                                            <button
                                                className={styles.mainBtn}
                                                onClick={() => window.location.href = 'tel:+79214060896'}
                                            >
                                                Узнать цену
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={`${styles.carouselButton} ${styles.nextButton}`}
                                onClick={nextPallet}
                            >
                                <img src='/assets/buttons/nextButton.svg' alt="Next" />
                            </button>
                        </div>

                        <div className={styles.carouselIndicators}>
                            {currentItems.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.indicator} ${index === currentPallet ? styles.activeIndicator : ''}`}
                                    onClick={() => goToPallet(index)}
                                    aria-label={`Перейти к поддону ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default PalletsPage;