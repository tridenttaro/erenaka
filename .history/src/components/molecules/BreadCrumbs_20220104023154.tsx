import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from "@material-ui/core";

type Props = {};

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
        <Typography color="primary">Breadcrumbs</Typography>
      </MuiBreadcrumbs>
    </>
  );
};

export default Breadcrumbs;
