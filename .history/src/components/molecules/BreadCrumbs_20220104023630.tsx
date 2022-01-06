import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@material-ui/core";
import Link from "next/link";

type Props = {
  path: string[];
};

const Breadcrumbs = (props: Props) => {
  return (
    <>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Link href="/">TOP</Link>
        <Link href="/">Core</Link>
        <Typography color="primary">Breadcrumbs</Typography>
      </MuiBreadcrumbs>
    </>
  );
};

export default Breadcrumbs;
