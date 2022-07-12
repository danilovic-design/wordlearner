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
import { errorText } from "../../database/errorcodes";
import { PAGEROOT } from "../../database/deploy";
import { deleteEveryDictionary } from "../../database/dbfunctions";
import { AuthContext } from "../../contexts/Authcontext";
import { DataContext } from "../../contexts/Datacontext";
import { deleteUserAccount } from "../../database/authfunctions";

export default function Profile() {
  const navigate = useNavigate();
  const [updatedPasswordAlertOpen, setUpdatedPasswordAlertOpen] =
    React.useState(false);
  const [reloginState, setReloginState] = React.useState(0);
  const [error, setError] = React.useState(null);
  const { uid, setIsAuthenticated, setUid } = React.useContext(AuthContext);
  const { setStoredDictionaryData } = React.useContext(DataContext);

  React.useEffect(() => {
    setReloginState(0);
    setError(null);
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
  };

  const handleNewPasswordSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    changeUserPassword(data.get("password"))
      .then(() => {
        setError(null);
        setUpdatedPasswordAlertOpen(true);
        setReloginState(0);
      })
      .catch((firebaseError) => {
        setError(errorText(firebaseError.code));
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let persistence = false;
    signIn(data.get("email"), data.get("password"), persistence)
      .then(() => {
        setError(null);
        setReloginState(2);
      })
      .catch((firebaseError) => {
        setError(errorText(firebaseError.code));
      });
  };

  const handleDeleteAccount = () => {
    deleteEveryDictionary(uid)
      .then((result) => {
        console.log(result);
        return setStoredDictionaryData([]);
      })
      .then(() => {
        return deleteUserAccount();
      })
      .then(() => {
        setUid(null);
        return setIsAuthenticated(false);
      })
      .then(() => {
        navigate(`${PAGEROOT}`);
      })
      .catch((firebaseError) => {
        setError(errorText(firebaseError.code));
      });
  };

  const getAction = (actionState) => {
    if (actionState === 0) {
      return <LoginAction setReloginState={setReloginState} />;
    }
    if (actionState === 1) {
      return <ReloginBox handleLogin={handleLogin} error={error} />;
    }
    if (actionState === 2) {
      return (
        <ChangePasswordBox
          handleDeleteAccount={handleDeleteAccount}
          handleNewPasswordSubmit={handleNewPasswordSubmit}
          error={error}
        />
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
              navigate(`${PAGEROOT}`);
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
        handlePasswordAlertClose={handlePasswordAlertClose}
      />
    </Box>
  );
}
