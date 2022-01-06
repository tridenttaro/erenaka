import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from "@material-ui/core";
import Link from "next/link";

type Props = {
  path: string[];
};

const Breadcrumbs = (props: Props) => {
  return (
    <>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <MuiLink underline="hover" color="inherit" href="/">
          TOP
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </MuiLink>
        <Link href="/">TOP</Link>
        <Link href="/">Core</Link>
        {path.length > 0 && <></>}
        <Typography color="primary">Breadcrumbs</Typography>
      </MuiBreadcrumbs>
    </>
  );
};

export default Breadcrumbs;
