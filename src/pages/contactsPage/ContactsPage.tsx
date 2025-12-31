import React, { useEffect } from 'react';
import styles from "./ContactsPage.module.css";
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';

const ContactsPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Контакты';
    }, []);

    const pointCoordinates = [59.752917, 30.549867]; // Колпино

    // Координаты для схемы подъезда (путь)
    const routeCoordinatesFirst = [
        [59.752624, 30.550445],
        [59.752618, 30.552462],
    ];
    const routeCoordinatesFirstArrow = [
        [59.752668, 30.550561],
        [59.752624, 30.550445],
        [59.752579, 30.550571],
    ];

    const routeCoordinatesSecond = [
        [59.752001, 30.552466],
        [59.752550, 30.552456],
    ];
    const routeCoordinatesSecondArrow = [
        [59.752472, 30.552344],
        [59.752550, 30.552456],
        [59.752480, 30.552553],
    ];

    const routeCoordinatesThird = [
        [59.752671, 30.552455],
        [59.753776, 30.552436],
    ];
    const routeCoordinatesThirdArrow = [
        [59.752742, 30.552342],
        [59.752671, 30.552455],
        [59.752743, 30.552547]
    ];

    return (
        <div className={styles.wrapper}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroCard}>
                        <h1>Наши контакты</h1>
                        <div className={styles.heroText}>
                            <p>ООО&nbsp;«Бизнес&nbsp;Паллет»</p>
                            <p>Юридический адрес ( офис) : г.&nbsp;Колпино, ул.&nbsp;Севастьянова, д.&nbsp;12 Лит&nbsp;А, офис&nbsp;207<br />
                                Адрес склада : г.&nbsp;Колпино, ул.&nbsp;Финляндская, участок&nbsp;1, сооружение&nbsp;2,<br />
                                западнее дома&nbsp;30, корпус&nbsp;2, лит&nbsp;А по&nbsp;Финляндской улице<br />
                                Телефон: 8-921-406-08-96<br />
                                <a href="mailto:business_pllt@mail.ru" className={styles.footerEmail}>
                                    Электронная почта: business_pllt@mail.ru<br />
                                </a>
                                <a href="mailto:bp@business-pallet.ru" className={styles.footerEmail}>
                                    Корпоративная почта: bp@business-pallet.ru
                                </a>
                            </p>
                            <br />
                            <p>Позвонив нам , Вы получите подробную информацию.<br />
                                Мы рады каждому клиенту!</p>
                        </div>
                        <button className={styles.mainBtn}>Позвонить</button>
                    </div>
                </div>
            </section>

            <section className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <h1>Как нас найти?</h1>
                    <div className={styles.mapText}>Мы находимя по&nbsp;адресу:  г.&nbsp;Колпино, ул.&nbsp;Финляндская,&nbsp;участок&nbsp;1, сооружение&nbsp;2, западнее дома&nbsp;30, корпус&nbsp;2, лит&nbsp;А</div>
                    <div className={styles.mapWrapper}>
                        <YMaps>
                            <Map
                                defaultState={{
                                    center: pointCoordinates,
                                    zoom: 17,
                                }}
                                width="100%"
                                height="400px"
                            >
                                <Placemark
                                    geometry={pointCoordinates}

                                />
                                <Polyline
                                    geometry={routeCoordinatesFirst}
                                    options={{
                                        strokeColor: '#FF8000',
                                        strokeWidth: 4,
                                    }}
                                />
                                <Polyline
                                    geometry={routeCoordinatesFirstArrow}
                                    options={{
                                        strokeColor: '#FF8000',
                                        strokeWidth: 4,
                                    }}
                                />
                                <Polyline
                                    geometry={routeCoordinatesSecond}
                                    options={{
                                        strokeColor: '#FF8000',
                                        strokeWidth: 4,
                                    }}
                                />
                                <Polyline
                                    geometry={routeCoordinatesSecondArrow}
                                    options={{
                                        strokeColor: '#FF8000',
                                        strokeWidth: 4,
                                    }}
                                />
                                <Polyline
                                    geometry={routeCoordinatesThird}
                                    options={{
                                        strokeColor: '#FF8000',
                                        strokeWidth: 4,
                                    }}
                                />
                                <Polyline
                                    geometry={routeCoordinatesThirdArrow}
                                    options={{
                                        strokeColor: '#FF8000',
                                        strokeWidth: 4,
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>

                    <div className={styles.mapLegend}>
                        <p><span className={styles.legendLine}></span> Схема подъезда</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactsPage;