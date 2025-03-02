"use client";
import { AppBar, Toolbar, Typography, Box, InputBase, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  width: "280px",
  borderRadius: "20px",
  backgroundColor: theme.palette.grey[800],
  padding: "6px 12px",
  display: "flex",
  alignItems: "center",
  color: "white",
  "&:focus-within": {
    boxShadow: `0 0 6px ${theme.palette.error.main}`,
  },
}));

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "black", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Logo & Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "error.main",
              letterSpacing: 1,
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            AniVara
          </Typography>

          {/* Search Bar */}
          <SearchBar>
            <InputBase
              placeholder="Search Anime..."
              fullWidth
              sx={{ color: "white", ml: 1 }}
            />
          </SearchBar>
        </Box>

        {/* Right Side - Navigation Links & Login Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {["Home", "Categories", "Watchlist"].map((item, index) => (
            <Typography
              key={index}
              component="a"
              href={`/${item.toLowerCase()}`}
              sx={{
                color: "grey.300",
                textDecoration: "none",
                fontSize: "1rem",
                transition: "color 0.3s ease-in-out",
                "&:hover": { color: "error.main" },
              }}
            >
              {item}
            </Typography>
          ))}
          {/* Login Button */}
          <Button
            variant="contained"
            color="error"
            sx={{
              px: 3,
              py: 1,
              fontWeight: "bold",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
              "&:active": { transform: "scale(0.95)" },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
