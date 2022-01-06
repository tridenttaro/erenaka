import Link from "next/link";
import styles from "../../styles/components/breadcrumbs.module.scss";

type Props = {
  lists?: {
    name: string;
    path: string[];
  }[];
};

// パンくずリストコンポーネント
const BreadCrumbs = (props: Props) => {
  const lists = props?.lists ? props.lists : [];

  console.log("lists" + JSON.stringify(lists));
  {
    console.log("path0" + lists[0].path[0]);
  }
  {
    console.log("path1" + lists[0].path[1]);
  }

  return (
    <>
      <ol className={styles.bc_ol}>
        <li className={styles.bc_li}>
          <Link href="/">
            <a className={styles.bc_a}>TOP</a>
          </Link>
          <div className={styles.arrow}>&nbsp; &gt; &nbsp;</div>
        </li>

        {lists.length > 0 &&
          lists.map(({ name, path }, index) => (
            <li className={styles.bc_li} key={index}>
              {lists.length - 1 !== index ? (
                <>
                  <Link href={path[0]} as={path[1]}>
                    <a className={styles.bc_a}>{name}</a>
                  </Link>
                  <div className={styles.arrow}>&nbsp; &gt; &nbsp;</div>
                </>
              ) : (
                <span className={styles.bc_span} aria-current="page">
                  {name}
                </span>
              )}
            </li>
          ))}
      </ol>
    </>
  );
};
export default BreadCrumbs;
