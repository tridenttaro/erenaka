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
  const lists = props?.lists ? props.lists : [];
  return (
    <>
      <ol className={styles.bc_ol}>
        <li className={styles.bc_li}>
          <Link href={path}>
            <a className={styles.bc_a}>{string}</a>
          </Link>
          <div className={styles.arrow}>&nbsp; &gt; &nbsp;</div>
        </li>
        {lists.length > 0 &&
          lists.map(({ string, path }, index) => (
            <li className={styles.bc_li} key={index}>
              {lists.length - 1 !== index ? (
                <>
                  <Link href={path}>
                    <a className={styles.bc_a}>{string}</a>
                  </Link>
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
