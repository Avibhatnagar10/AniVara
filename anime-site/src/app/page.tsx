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
  Button,
} from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AnimeCarousel from "./Components/AnimeCarousel";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const categories = [
    "All",
    "Action",
    "Romance",
    "Comedy",
    "Adventure",
    "Fantasy",
    "Sports",
    "Sci-Fi",
    "Thriller",
    "Horror",
  ];

  const topAnime = [
    { title: "Naruto", category: "Action", img: "/naruto.jpeg" },
    { title: "Attack on Titan", category: "Action", img: "/Eren Jaeger.jpeg" },
    { title: "Demon Slayer", category: "Action", img: "/Kamado Tanjiro.jpeg" },
    { title: "One Piece", category: "Adventure", img: "/luffy1.jpeg" },
    { title: "Your Name", category: "Romance", img: "/yourname.jpeg" },
    { title: "Weathering with You", category: "Romance", img: "/weathering.jpeg" },
    { title: "Haikyuu", category: "Sports", img: "/haikyuu.png" },
  ];

  const animeList = [
    { title: "One Punch Man", category: "Comedy", img: "/punch.jpeg" },
    { title: "Haikyuu", category: "Sports", img: "/haikyuu.png" },
    { title: "Horimiya", category: "Romance", img: "/hori1.jpeg" },
    { title: "One Piece", category: "Adventure", img: "/luffy1.jpeg" },
    { title: "My Dress Up Darling", category: "Fantasy", img: "/Kitagawa1.jpeg" },
    { title: "Spy X Family", category: "Action", img: "/spy.jpeg" },
    { title: "Your Name", category: "Romance", img: "/yourname.jpeg" },
    { title: "Solo Leveling", category: "Adventure", img: "/solo1.jpeg" },
    { title: "Suzume", category: "Adventure", img: "/suzume.jpeg" },
    { title: "Jujutsu Kaisen", category: "Adventure", img: "/jjk.jpg" },
    { title: "Tokyo Revengers", category: "Action", img: "/mikey.jpeg" },
    { title: "Terminator Zero", category: "Sci-Fi", img: "/Terminator.jpeg" },
    { title: "Re:Zero", category: "Thriller", img: "/rezero.jpeg" },
    { title: "Parasyte", category: "Horror", img: "/Parasyte.jpeg" },
    { title: "The Angel Next Door", category: "Romance", img: "/Shiina Mahiru.jpeg" },
    { title: "I Want to Eat Your Pancreas", category: "Romance", img: "/eat.jpeg" },
  ];

  const filteredAnime =
    selectedCategory === "All"
      ? animeList
      : animeList.filter((anime) => anime.category === selectedCategory);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#121212", color: "white" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="loader"></div>
        </Box>
      ) : (
        <>
          <Navbar />
          <AnimeCarousel />

          <Box textAlign="center" my={4}>
            <Typography variant="h4" fontWeight="bold" color="red">
              Top Anime
            </Typography>
            <Box
              sx={{
                width: 100,
                height: 4,
                bgcolor: "red",
                mx: "auto",
                mt: 1,
                borderRadius: 2,
              }}
            />
          </Box>

          <Container>
            <Grid container spacing={3} justifyContent="center">
              {topAnime.map((anime, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ boxShadow: 4, bgcolor: "#1e1e1e", borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      image={anime.img}
                      alt={anime.title}
                      height="300"
                      sx={{ borderRadius: "3px 3px 0 0" }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold" color="red">
                        {anime.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Box textAlign="center" my={4} display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "contained" : "outlined"}
                color="error"
                onClick={() => setSelectedCategory(category)}
                sx={{
                  borderRadius: 10,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: selectedCategory === category ? 4 : 2,
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          <Container>
            <Grid container spacing={3} justifyContent="center">
              {filteredAnime.map((anime, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ boxShadow: 4, bgcolor: "#1e1e1e", borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      image={anime.img}
                      alt={anime.title}
                      height="300"
                      sx={{ borderRadius: "3px 3px 0 0" }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold" color="red">
                        {anime.title}
                      </Typography>
                    </CardContent>
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
