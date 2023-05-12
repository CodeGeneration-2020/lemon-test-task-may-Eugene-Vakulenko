import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { imageService } from "../services/image.service";
import { APP_KEYS, SPACES } from "../consts";
import { AxiosError } from "axios";
import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { BsPlusLg } from "react-icons/bs";
import { VIEW_MODE, ViewType } from "../types/view.type";
import CarouselLayout from "../layouts/carousel.layout";
import GalleryLayout from "../layouts/gallery.layout";
import AddImageDialog from "../components/add-image-dialog.component";

const MainPage = () => {
  const queryClient = useQueryClient();

  const [images, setImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewType>(VIEW_MODE.GALLERY);
  const [addMode, setAddMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { refetch } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.IMAGES],
    queryFn: () => imageService.getImages(),
    onSuccess: (successData) => {
      setImages(successData.data.data.url);
    },
    onError: (err: AxiosError) => {},
  });

  useEffect(() => {
    refetch();
  }, []);

  // const { mutate: addImageMutation } = useMutation({
  //   mutationFn: (data: any) => imageService.addImage(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.IMAGES]);
  //   },
  //   onError: (err: AxiosError) => {},
  // });

  const handleChangeMode = () => {
    const newViewMode =
      viewMode === VIEW_MODE.GALLERY ? VIEW_MODE.CAROUSEL : VIEW_MODE.GALLERY;
    setViewMode(newViewMode);
  };

  const openAddModal = () => {
    setAddMode(!addMode);
  };

  const handleUpload = () => {};

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          sx={{ mt: SPACES.sm, mb: SPACES.md }}
          value={viewMode}
          onChange={handleChangeMode}
        >
          <ToggleButton value={VIEW_MODE.GALLERY}>Gallery</ToggleButton>
          <ToggleButton value={VIEW_MODE.CAROUSEL}>Carousel</ToggleButton>
        </ToggleButtonGroup>
        <Button
          sx={{ aspectRatio: 1 / 1 }}
          variant="outlined"
          onClick={openAddModal}
        >
          <BsPlusLg />
        </Button>
      </Box>
      {viewMode === VIEW_MODE.CAROUSEL ? (
        <CarouselLayout images={images} />
      ) : (
        <GalleryLayout images={images} />
      )}
      <AddImageDialog
        open={addMode}
        handleClose={openAddModal}
        handleUpload={handleUpload}
      />
    </Container>
  );
};

export default MainPage;
