"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Button,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { signInWithGoogle, logout, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google"; // Google Icon

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

const LoginButton = styled(Button)({
  padding: "8px 16px",
  fontWeight: "bold",
  textTransform: "none",
  background: "linear-gradient(45deg, #FF4081, #F50057)",
  color: "white",
  borderRadius: "25px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
  },
});


export default function Navbar() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Open login menu
  const handleOpenLoginMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close login menu
  const handleCloseLoginMenu = () => {
    setAnchorEl(null);
  };

  // Sign-in with Google function
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      handleCloseLoginMenu();
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Logo & Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

        {/* Right Side - Navigation Links & Auth Buttons */}
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

          {/* If User is Logged In, Show Avatar & Logout */}
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={user.photoURL} alt="User Avatar" sx={{ width: 40, height: 40 }} />
              <Button
                variant="contained"
                color="error"
                onClick={logout}
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <>
              {/* Login Button */}
              <LoginButton
                onClick={handleOpenLoginMenu}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Login"
                )}
              </LoginButton>

              {/* Login Menu */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseLoginMenu}>
                <MenuItem onClick={handleSignInWithGoogle}>
                  <GoogleIcon sx={{ marginRight: 1 }} /> Sign in with Google
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
