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
          MUI
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </MuiLink>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </MuiBreadcrumbs>
    </>
  );
};

export default Breadcrumbs;
