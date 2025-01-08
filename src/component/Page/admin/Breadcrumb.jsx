import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

function Breadcrumb({ trail, onNavigate }) {
  return (
    <Breadcrumbs sx={{ marginBottom: "1rem" }}>
      {trail.map((item, index) => (
        <Link
          key={index}
          color={index === trail.length - 1 ? "textPrimary" : "inherit"}
          onClick={() => index < trail.length - 1 && onNavigate(index)}
          style={{
            cursor: index === trail.length - 1 ? "default" : "pointer",
            textDecoration: "none",
            color: index === trail.length - 1 ? "#1976d2" : "#000",
          }}
        >
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
