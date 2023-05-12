import { AxiosResponse } from "axios";
import { HttpService } from "./http.service";
import { Image } from "../types/images.type";
import { Images } from "./../types/images.type";

class ImageService extends HttpService {
  getImages(): Promise<AxiosResponse<Images>> {
    return this.get({
      url: "",
    });
  }

  addImage(file: File): Promise<AxiosResponse<Image>> {
    return this.post({
      url: "",
      data: file,
    });
  }

  updateImage(file: File, id: string): Promise<AxiosResponse<Image>> {
    return this.patch({
      url: `${id}`,
      data: file,
    });
  }

  deleteImage(id: string): Promise<AxiosResponse<null>> {
    return this.delete({
      url: `${id}`,
    });
  }
}

export const imageService = new ImageService();
