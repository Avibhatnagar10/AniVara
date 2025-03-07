"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { BookmarkAddOutlined } from "@mui/icons-material";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AnimeCarousel from "./Components/AnimeCarousel";

export default function Home() {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate loading time
  }, []);

  const topAnime = [
    { title: "Naruto", category: "Action", img: "/naruto.jpeg" },
    { title: "Attack on Titan", category: "Action", img: "/Eren Jaeger.jpeg" },
    { title: "Demon Slayer", category: "Action", img: "/Kamado Tanjiro.jpeg" },
    { title: "One Piece", category: "Adventure", img: "/luffy1.jpeg" },
    { title: "Your Name", category: "Romance", img: "/yourname.jpeg" },
    { title: "Weathering with You", category: "Romance", img: "/weathering.jpeg" },
    { title: "Haikyuu", category: "Sports", img: "/haikyuu.png" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: "black",
          }}
        >
          <div className="loader"></div>
        </Box>
      ) : (
        <>
          <Navbar />
          <AnimeCarousel />

          {/* Top Anime Section */}
          <Box textAlign="center" my={4}>
            <Typography variant="h4" fontWeight="bold" color="white">
              Top Anime
            </Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: "red", mx: "auto", mt: 1, borderRadius: 2 }} />
          </Box>

          {/* Anime Grid */}
          <Container>
            <Grid container spacing={3}>
              {topAnime.map((anime, index) => (
                <Grid item key={index} xs={10} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      position: "relative",
                      boxShadow: 2,
                      overflow: "hidden",
                      "&:hover .anime-img": { filter: "blur(2px)", opacity: 0.7 },
                      "&:hover .watch-btn": { opacity: 1 },
                    }}
                  >
                    <CardMedia component="img" image={anime.img} alt={anime.title} height="300" className="anime-img" sx={{ transition: "all 0.3s ease-in-out" }} />
                    <CardContent sx={{ bgcolor: "black", color: "white", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {anime.title}
                      </Typography>
                      <Typography variant="body2">{anime.category}</Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0,
                        transition: "opacity 0.3s",
                      }}
                      className="watch-btn"
                    >
                      <Button variant="contained" color="error">
                        Watch Now
                      </Button>
                    </CardActions>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": { bgcolor: "white", color: "black" },
                      }}
                    >
                      <BookmarkAddOutlined />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Footer />
        </>
      )}
    </Box>
  );
}
