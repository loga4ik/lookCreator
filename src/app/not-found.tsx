import Link from "next/link";
import { Wrapper } from "./UIKit/components/Wrapper/Wrapper";
import { Button } from "./UIKit/components/Button/Button";
import { HangerIcon } from "./UIKit/components/icons/HangerIcon";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={styles.stage}>
      <Wrapper className={styles.card}>
        <div className={styles.digits}>
          <span className={styles.digit}>4</span>
          <div className={styles.hangerBadge}>
            <HangerIcon />
          </div>
          <span className={styles.digit}>4</span>
        </div>

        <p className={styles.title}>Такой страницы нет</p>
        <p className={styles.subtitle}>
          Похоже, эта вещь потерялась где-то между вешалками.
          <br />
          Ссылка устарела или страницы никогда не было.
        </p>

        <div className={styles.actions}>
          <Link href="/">
            <Button variant="primary">На главную</Button>
          </Link>
          <Link href="/wardrobe">
            <Button variant="ghost">В гардероб</Button>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default NotFound;
