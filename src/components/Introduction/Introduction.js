import styles from "./Introduction.module.css";

function Introduction() {
  return (
    <div className={styles.intro}>
      <h1 className={styles.intro__title}>Delicious Food, Delivered To You</h1>
      <div className={styles["intro__description-box"]}>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients just-in-time
          and of course by experienced chefs!
        </p>
      </div>
    </div>
  );
}

export default Introduction;
