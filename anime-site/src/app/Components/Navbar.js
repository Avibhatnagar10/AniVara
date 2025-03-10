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
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { signInWithGoogle, logout, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const [setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenLoginMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseLoginMenu = () => setAnchorEl(null);
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMobileOpen(open);
  };

  const menuItems = ["Home", "Categories", "Watchlist"];

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
          {!isMobile && (
            <SearchBar>
              <InputBase placeholder="Search Anime..." fullWidth sx={{ color: "white", ml: 1 }} />
            </SearchBar>
          )}
        </Box>

        {/* Right Side - Navigation & Auth */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem button key={index} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
                {user ? (
                  <ListItem button onClick={logout}>
                    <ListItemText primary="Logout" sx={{ color: "error.main" }} />
                  </ListItem>
                ) : (
                  <ListItem button onClick={handleSignInWithGoogle}>
                    <GoogleIcon sx={{ marginRight: 1 }} /> Sign in with Google
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {menuItems.map((item, index) => (
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
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={user.photoURL} alt="User Avatar" sx={{ width: 40, height: 40 }} />
                <Button variant="contained" color="error" onClick={logout}>Logout</Button>
              </Box>
            ) : (
              <LoginButton onClick={handleOpenLoginMenu} disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
              </LoginButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
