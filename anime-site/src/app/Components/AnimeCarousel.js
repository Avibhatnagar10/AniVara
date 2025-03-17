"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Typography, Button, Card, CardMedia } from "@mui/material";

const slides = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    description:
      "A young boy, Tanjiro Kamado, vows to become a Demon Slayer after his family is slaughtered by demons, with his only surviving sister, Nezuko, transformed into a demon herself.",
    image: "/tanjiro.jpeg",
  },
  {
    id: 2,
    title: "Horimiya",
    description:
      "A popular and cheerful girl crosses paths with a quiet and reserved classmate, only to discover they both have hidden sides unknown to others. As they grow closer, their bond deepens, revealing a heartfelt story of love, friendship, and self-acceptance in a high school setting.",
    image: "/horimiya.jpg",
  },
  {
    id: 3,
    title: "Teasing-Master: Takagi-san",
    description:
    "Teasnig-Master Takagi-san is a Japanese manga series written and illustrated by Takagi-san. It tells the story of a man who is a master of the tea ceremony and spends his days teaching it to others.",
    image: "/teasing.jpg",
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    description:
      "Jujutsu Kaisen follows Yuji Itadori, a high schooler who becomes the vessel for the powerful Curse, Sukuna. To protect humanity, he joins Jujutsu High, where sorcerers battle monstrous Curses.",
    image: "/jjk.jpg",
  },
  {
    id: 5,
    title: "One Piece",
    description:
      "One Piece follows Monkey D. Luffy, a young pirate with the ability to stretch like rubber after eating a Devil Fruit. He sets sail with his crew, the Straw Hat Pirates, in search of the legendary One Piece treasure. Filled with adventure, epic battles, and deep storytelling, it's a timeless journey.",
    image: "/luffy.jpeg",
  },
];

export default function AnimeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box sx={{ position: "relative", width: "100%", height: 620, overflow: "hidden" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((anime) => (
          <SwiperSlide key={anime.id}>
            <Card sx={{ position: "relative", width: "100%", height: "100%" }}>
              <CardMedia
                component="img"
                image={anime.image}
                alt={anime.title}
                sx={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Dark overlay */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(to right, rgb(0, 0, 0), transparent)",
                }}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Text Content */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 4,
          maxWidth: 500,
          zIndex: 10,
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
            {slides[activeIndex].title}
          </Typography>
          <Typography variant="body1" sx={{ color: "black.1000", mt: 3 }}>
            {slides[activeIndex].description}
          </Typography>
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button variant="contained" color="warning">
              Watch Now
            </Button>
            <Button variant="contained"  >
              Detail ➝
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
