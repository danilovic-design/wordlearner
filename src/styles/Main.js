import landingPageImage from "../langs.jpg";

export const BreadCrumbTypographyStyle = {
  paddingTop: "10px",
  paddingBottom: "20px",
  color: "grey",
  fontWeight: "bold",
};

export const BreadCrumbTypographyInactiveStyle = {
  paddingTop: "10px",
  paddingBottom: "20px",
  color: "grey",
  fontWeight: "bold",
};

export const mainBoxStyle = {
  minHeight: "calc(100vh - 64px)",
  backgroundColor: "#EFEFEF",
};

export const landingBoxStyle = {
  minHeight: "calc(100vh - 64px)",
  backgroundColor: "#EFEFEF",
  background: `url(${landingPageImage}) no-repeat center center fixed`,
  backgroundSize: "cover",
};

export const authFormStyle = {
  pt: 5,
  pl: 2,
  pr: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
