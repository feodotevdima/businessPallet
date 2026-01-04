import React, { useEffect } from 'react';
import styles from "./AboutPage.module.css";
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
        document.title = 'О компании';
    }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroCard}>
            <h1>
              ООО «Бизнес Паллет» <br />
              <span>Мы работаем для Вас <br /> Мы работаем всегда</span>
            </h1>
            <div className={styles.heroText}>
              <p>    Компания ООО «Бизнес Паллет» ведет успешную деятельность в г. Санкт-Петербурге и&nbsp;Ленинградской области с&nbsp;2024 г. </p>
              <p>    Опыт и&nbsp;знание в&nbsp;Паллетном бизнесе у&nbsp;сотрудников компании более&nbsp;15 лет. Производственные возможности компании позволяют сотрудничать с&nbsp;самыми требовательными клиентами и&nbsp;расширяет из года в&nbsp;год свои возможности.</p>
              <p>    На 2025г компания сотрудничает уже&nbsp;с&nbsp;более чем 40 клиентами в&nbsp;г.&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области. Работаем только с&nbsp;проверенными и&nbsp;надежными Партерами. Компания может гарантировать качество товара, хранение, погрузку-разгрузку товара и&nbsp;доставку до&nbsp;пункта назначения в&nbsp;срок.</p>
            </div>
            <button className={styles.mainBtn} onClick={() => navigate('/pallets')}>Выбрать поддоны</button>
          </div>
        </div>
      </section>

      <section className={styles.advantages}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Наши преимущества</h2>
          <p className={styles.sectionSubtitle}>Для нас важно не просто привезти товар, а решить вашу задачу.</p>

          <div className={styles.grid}>
            {[
              { id: 1, text: "Использование спецтехники ускоряет процесс разгрузки\u00A0–\u00A0погрузки, что\u00A0экономит время для Компании и\u00A0ускорять доставку товара до\u00A0Заказчика." },
              { id: 2, text: "Складской центр организован для\u00A0оптимизации процессов, что\u00A0позволяет формировать заказы для\u00A0поставки с\u00A0учетом нестандартных пожеланий клиента, а\u00A0именно: лентовка, индивидуальная сборка, маркировка и\u00A0так\u00A0далее." },
              { id: 3, text: "Все поддоны проходят строгий отбор и\u00A0переборку на\u00A0территории склада и\u00A0формируются сорта с\u00A0учетом требований наших Заказчиков. Компания Предлагает гибкие условия не\u00A0зависимо от\u00A0объема партии и\u00A0выполняет заказы в\u00A0сжатые сроки" },
              { id: 4, text: "Компания гордится стабильной работой с\u00A0нашими уважаемыми Партнерами и\u00A0постоянно работает над\u00A0представленностью на\u00A0территории г.\u00A0Санкт-Петербурга." }
            ].map((item) => (
              <div key={item.id} className={styles.card}>
                <p>{item.text}</p>
                <span className={styles.cardNumber}>{item.id}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`${styles.circle} ${styles.third_left}`}></div>
        <div className={`${styles.circle} ${styles.second_left}`}></div>
        <div className={`${styles.circle} ${styles.first_left}`}></div>

        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Рассчитаем вашу поставку за 1 час</h2>
          <p className={styles.ctaText}>
            Есть потребность в паллетах? Опишите объём, сорт и особые пожелания. <br />
            Мы оперативно подготовим для Вас коммерческое предложение.
          </p>
          <button className={styles.whiteBtn} onClick={() => window.location.href = 'tel:+79214060896'}>Позвоните нам</button>
        </div>
<div className={styles.center_circle}></div>
        <div className={`${styles.circle} ${styles.third_right}`}></div>
        <div className={`${styles.circle} ${styles.second_right}`}></div>
        <div className={`${styles.circle} ${styles.first_right}`}></div>
      </section>
    </div>
  );
};

export default AboutPage;