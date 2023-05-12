export type Image = {
  data: {
    url: string;
  };
  bucketName: string;
};

export type Images = {
  data: {
    url: string[];
  };
  bucketName: string;
};
