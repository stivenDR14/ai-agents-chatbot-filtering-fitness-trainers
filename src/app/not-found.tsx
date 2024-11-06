import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Box>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sorry, the page you are looking for does not exist. It might have been
          moved or deleted.
        </Typography>

        <Link href="/">Go to Home</Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
