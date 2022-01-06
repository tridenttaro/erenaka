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
  // const pathArray = props?.path ? props.path : [];
  const pathArray = ["a", "b", "c"];

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

        {pathArray.length > 0 &&
          pathArray.map((value, i) => (
            <div key={i}>
              <MuiLink underline="hover" color="inherit">
                {/* Core */}
                <Link href="/">{value}</Link>
              </MuiLink>
            </div>
          ))}

        <Typography color="primary">Breadcrumbs</Typography>
      </MuiBreadcrumbs>
      aaaaaaaaaaaaaaaaaaaa
      <p>aaaaaaaaaaaaaaaaaaaa</p>
    </>
  );
};

export default Breadcrumbs;
