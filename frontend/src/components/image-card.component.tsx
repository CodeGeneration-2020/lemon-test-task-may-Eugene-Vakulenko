import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { APP_KEYS, SPACES } from "../consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { imageService } from "../services/image.service";
import EditImageDialog from "./edit-image-dialog.component";

type ImageCardProps = {
  image: string;
};

const ImageCard = ({ image }: ImageCardProps) => {
  const queryClient = useQueryClient();

  const [displayButtons, setDisplayButtons] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { mutate: deleteImageMutation } = useMutation({
    mutationFn: (id: string) => imageService.deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.IMAGES]);
    },
    onError: (err: AxiosError) => {},
  });

  const handleDelete = () => {
    deleteImageMutation(image);
  };

  const imageLink = `https://placehold.co/300x200?text=${image}`;

  return (
    <>
      <Card sx={{ minWidth: 300 }}>
        <CardActionArea>
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
                  <BsPencil size={20} onClick={() => setEditMode(true)} />
                </Button>
                <Button>
                  <BsTrash2 size={20} onClick={handleDelete} />
                </Button>
              </Box>
            )}
            <CardMedia component="img" height="140" image={imageLink} />
          </Box>

          <CardContent>
            <Typography variant="body2">
              Add a description of the image here
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <EditImageDialog
        open={editMode}
        handleClose={() => setEditMode(false)}
        id={image}
      />
    </>
  );
};

export default ImageCard;
