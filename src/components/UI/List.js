import styles from "./List.module.css";

function List(props) {
  return (
    <ul className={`${styles["menu-list"]} ${props.className}`}>
      {props.children}
    </ul>
  );
}

export default List;
