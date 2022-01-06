import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from "@material-ui/core";
import Link from "next/link";

type Props = {
  path?: string[];
};

const Breadcrumbs = (props: Props) => {
  const path = props?.path ? props.path : [];

  return (
    <>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <MuiLink underline="hover" color="inherit">
          {/* TOP */}
          <Link href="/">TOP</Link>
        </MuiLink>
        <MuiLink underline="hover" color="inherit">
          {/* Core */}
          <Link href="/">Core</Link>
        </MuiLink>

        {path.length > 0 &&
          path.map((value) => (
            <>
              <MuiLink underline="hover" color="inherit">
                {/* Core */}
                <Link href="/">{value}</Link>
              </MuiLink>
            </>
          ))}

        <Typography color="primary">Breadcrumbs</Typography>
      </MuiBreadcrumbs>
      aaaaaaaaaaaaaaaaaaaa
      <p>aaaaaaaaaaaaaaaaaaaa</p>
    </>
  );
};

export default Breadcrumbs;
