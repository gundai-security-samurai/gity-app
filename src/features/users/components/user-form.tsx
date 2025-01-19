"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { ImageListType } from "react-images-uploading";
import ReactImageUploading from "react-images-uploading";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string(),
});

type FromValues = z.input<typeof formSchema>;

interface Props {
  disabled: boolean;
  defaultValues: FromValues;
  image?: string | null;
  faceImage?: string | null;
  onSubmit: (
    values: FromValues,
    image: ImageListType,
    faceImage: ImageListType,
  ) => void;
}

const UserForm = ({
  disabled,
  defaultValues,
  image,
  faceImage,
  onSubmit,
}: Props) => {
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    { dataURL: image || "/default-icon.png" },
  ]);
  const [faceImageUpload, setFaceImageUpload] = useState<ImageListType>([
    { dataURL: faceImage || "/default-icon.png" },
  ]);

  const form = useForm<FromValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FromValues) => {
    onSubmit(values, imageUpload, faceImageUpload);
  };

  const handleChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file;
    const maxFileSize = 5 * 1024 * 1014;

    if (file && file.size > maxFileSize) {
      toast({
        variant: "destructive",
        description: "ファイルサイズは5MBを超えることはできません",
      });
      return;
    }

    setImageUpload(imageList);
  };

  const handleChangeFaceImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file;
    const maxFileSize = 5 * 1024 * 1014;

    if (file && file.size > maxFileSize) {
      toast({
        variant: "destructive",
        description: "ファイルサイズは5MBを超えることはできません",
      });
      return;
    }

    setFaceImageUpload(imageList);
  };

  return (
    <Form {...form}>
      <div className="mb-5 flex items-center gap-5 place-content-center">
        <div className="">
          <ReactImageUploading
            value={imageUpload}
            onChange={handleChangeImage}
            maxNumber={1}
            acceptType={["jpg", "png", "jpeg"]}
          >
            {({ imageList, onImageUpdate }) => (
              <div className="flex w-full flex-col items-center justify-center">
                {imageList.map((image, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <div key={index}>
                    {image.dataURL && (
                      <div className="relative size-24">
                        <Image
                          fill
                          src={image.dataURL as string}
                          alt="avatar"
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {imageList.length > 0 && (
                  <div className="mt-3 text-center">
                    <Button variant="outline" onClick={() => onImageUpdate(0)}>
                      アバターの変更
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ReactImageUploading>
        </div>
        <div className="">
          <ReactImageUploading
            value={faceImageUpload}
            onChange={handleChangeFaceImage}
            maxNumber={1}
            acceptType={["jpg", "png", "jpeg"]}
          >
            {({ imageList, onImageUpdate }) => (
              <div className="flex w-full flex-col items-center justify-center">
                {imageList.map((image, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <div key={index}>
                    {image.dataURL && (
                      <div className="relative size-24">
                        <Image
                          fill
                          src={image.dataURL as string}
                          alt="face"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {imageList.length > 0 && (
                  <div className="mt-3 text-center">
                    <Button variant="outline" onClick={() => onImageUpdate(0)}>
                      顔写真の変更
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ReactImageUploading>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="名前"
                  className="bg-background"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  disabled
                  placeholder="メールアドレス"
                  className="bg-background"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>自己紹介</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder="自己紹介..."
                  rows={5}
                  className="bg-background"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled} className="w-full">
          更新
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
