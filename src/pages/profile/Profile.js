import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../../database/authfunctions";
import { BreadCrumbTypographyStyle } from "../../styles/Main";
import { mainBoxStyle } from "../../styles/Main";
import { StyledBreadcrumb } from "../../styles/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import ProfileSnackbars from "./profilesnackbars/Profilesnackbars";
import ChangePasswordBox from "./changepasswordbox/Changepasswordbox";
import ReloginBox from "./reloginbox/Reloginbox";
import { signIn } from "../../database/authfunctions";
import LoginAction from "./loginaction/Loginaction";

export default function Profile() {
  const navigate = useNavigate();
  const [updatedPasswordAlertOpen, setUpdatedPasswordAlertOpen] =
    React.useState(false);
  const [updatedPasswordAlertError, setUpdatedPasswordAlertError] =
    React.useState(false);
  const [reloginState, setReloginState] = React.useState(0);

  React.useEffect(() => {
    setReloginState(0);
  }, []);

  /*const handleClick = () => {
    setOpen(true);
  };*/
  /*
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };*/

  const handlePasswordAlertClose = () => {
    setUpdatedPasswordAlertOpen(false);
    setUpdatedPasswordAlertError(false);
  };

  const handleNewPasswordSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    changeUserPassword(data.get("password"))
      .then(() => {
        setUpdatedPasswordAlertOpen(true);
        setReloginState(0);
      })
      .catch((err) => {
        setUpdatedPasswordAlertError(true);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let persistence = false;
    signIn(data.get("email"), data.get("password"), persistence)
      .then(() => {
        setReloginState(2);
      })
      .catch(() => {
        setUpdatedPasswordAlertError(true);
      });
  };

  const getAction = (actionState) => {
    if (actionState === 0) {
      return <LoginAction setReloginState={setReloginState} />;
    }
    if (actionState === 1) {
      return <ReloginBox handleLogin={handleLogin} />;
    }
    if (actionState === 2) {
      return (
        <ChangePasswordBox handleNewPasswordSubmit={handleNewPasswordSubmit} />
      );
    }
  };

  return (
    <Box sx={mainBoxStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Breadcrumbs aria-label="breadcrumb" sx={BreadCrumbTypographyStyle}>
          <StyledBreadcrumb
            onClick={() => {
              navigate("/");
            }}
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb label="Manage your account" />
        </Breadcrumbs>
        {getAction(reloginState)}
      </Container>
      <ProfileSnackbars
        updatedPasswordAlertOpen={updatedPasswordAlertOpen}
        updatedPasswordAlertError={updatedPasswordAlertError}
        handlePasswordAlertClose={handlePasswordAlertClose}
      />
    </Box>
  );
}
