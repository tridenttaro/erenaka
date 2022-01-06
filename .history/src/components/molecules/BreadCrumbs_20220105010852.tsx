import Link from "next/link";
import styles from "../../styles/components/breadcrumbs.module.scss";

type Props = {
  lists?: {
    string: string;
    path: string;
  }[];
};

// パンくずリストコンポーネント
const BreadCrumbs = (props: Props) => {
  return (
    <>
      <ol className={styles.bc_ol}>
        {lists.length > 0 &&
          lists.map(({ string, path }, index) => (
            <li className={styles.bc_li} key={index}>
              {lists.length - 1 !== index ? (
                <>
                  <a className={styles.bc_a} href={path}>
                    {string}
                  </a>
                  <div className={styles.arrow}>&nbsp; &gt; &nbsp;</div>
                </>
              ) : (
                <span className={styles.bc_span} aria-current="page">
                  {string}
                </span>
              )}
            </li>
          ))}
      </ol>
    </>
  );
};
export default Breadcrumbs;
