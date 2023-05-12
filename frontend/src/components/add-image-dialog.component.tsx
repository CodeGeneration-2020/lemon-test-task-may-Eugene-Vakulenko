import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { imageService } from "../services/image.service";
import { APP_KEYS } from "../consts";
import { AxiosError } from "axios";

type AddImageDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleUpload: () => void;
};

const AddImageDialog = ({
  open,
  handleClose,
  handleUpload,
}: AddImageDialogProps) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: addImageMutation } = useMutation({
    mutationFn: (data: File) => imageService.addImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.IMAGES]);
    },
    onError: (err: AxiosError) => {},
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      console.log(selectedFile);

      addImageMutation(selectedFile);
      setSelectedFile(null);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Add a new image"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add an image file less than 1MB (.jpg, .jpeg, .png are allowed)
          <form onSubmit={handleSubmit}>
            <Button variant="outlined" component="label">
              Upload File
              <input type="file" onChange={handleFileChange} hidden />
            </Button>
            <Button type="submit">Upload</Button>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddImageDialog;
