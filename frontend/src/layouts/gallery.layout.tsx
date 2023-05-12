import React from "react";
import ImageCard from "../components/image-card.component";
import { Box } from "@mui/material";
import { SPACES } from "../consts";

type GalleryLayoutProps = {
  images: string[];
};

const GalleryLayout = ({ images }: GalleryLayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: SPACES.md }}>
      {images.map((image) => {
        return <ImageCard image={image} key={image} />;
      })}
    </Box>
  );
};

export default GalleryLayout;
