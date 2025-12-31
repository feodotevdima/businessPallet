import React, { useEffect } from 'react';
import styles from "./ServicesPage.module.css";

const ServicesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Услуги';
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroCard}>
            <h1>Наши услуги</h1>
            <div className={styles.heroText}>
              <p>    Компания ООО «Бизнес Паллет» предлагает нашим Заказчикам как&nbsp;самовывоз поддонов со&nbsp;склада, так&nbsp;и&nbsp;услуги доставки. Сотрудничество с&nbsp;опытными и&nbsp;уважаемыми Логистическими Компаниями позволяет нам сформировать логистику с&nbsp;учетом всех&nbsp;обстоятельств, доставим&nbsp;все&nbsp;«точно&nbsp;в&nbsp;срок».</p>
              <p>    В&nbsp;нашей&nbsp;компании вы&nbsp;можете получить консультацию по&nbsp;объему&nbsp;(м³) автотранспортного средства для&nbsp;доставки груза.</p>
              <p>    Так&nbsp;же&nbsp;компания ООО&nbsp;«Бизнес Паллет» организовывает выкуп и&nbsp;вывоз поддонов с&nbsp;территории заказчика г.&nbsp;Санкт-Петербурга и&nbsp;Ленинградской области.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;