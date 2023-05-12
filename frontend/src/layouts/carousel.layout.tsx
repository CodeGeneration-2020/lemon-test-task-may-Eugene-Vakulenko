import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { APP_KEYS, SPACES } from "../consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { imageService } from "../services/image.service";
import EditImageDialog from "../components/edit-image-dialog.component";

type CarouselLayoutProps = {
  images: string[];
};

const CarouselLayout = ({ images }: CarouselLayoutProps) => {
  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayButtons, setDisplayButtons] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { mutate: deleteImageMutation } = useMutation({
    mutationFn: (id: string) => imageService.deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.IMAGES]);
    },
    onError: (err: AxiosError) => {},
  });

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    deleteImageMutation(images[currentIndex]);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={goToPrevSlide}>{"<"}</Button>
        <Box
          component="div"
          sx={{ position: "relative" }}
          onMouseEnter={() => setDisplayButtons(true)}
          onMouseLeave={() => setDisplayButtons(false)}
        >
          {displayButtons && (
            <Box
              sx={{ position: "absolute", top: SPACES.lg, right: SPACES.lg }}
            >
              <Button>
                <BsPencil size={20} onClick={handleEdit} />
              </Button>
              <Button>
                <BsTrash2 size={20} onClick={handleDelete} />
              </Button>
            </Box>
          )}
          <img
            src={`https://placehold.co/600x400?text=${images[currentIndex]}`}
            alt=""
          />
        </Box>

        <Button onClick={goToNextSlide}>{">"}</Button>
      </Box>
      <EditImageDialog
        open={editMode}
        handleClose={() => setEditMode(false)}
        id={images[currentIndex]}
      />
    </>
  );
};

export default CarouselLayout;
