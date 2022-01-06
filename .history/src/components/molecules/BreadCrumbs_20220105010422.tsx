import Link from "next/link";
import styles from "../../styles/components/breadcrumbs.modules.scss";

type Props = {
  lists?: {
    string: string;
    path: string;
  }[];
};

// パンくずリストコンポーネント
export default function BreadCrumbs({ lists }: Props) {
  return (
    <>
      <ol className={styles.bc_ol}>
        {lists.map(({ string, path }, index) => (
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
}
export default Breadcrumbs;
