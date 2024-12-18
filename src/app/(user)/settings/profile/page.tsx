"use client";
import {} from "@/components/ui/form";
import { insertUserSchema } from "@/db/schema";
import useEditUser from "@/features/users/api/use-edit-user";
import useGetUser from "@/features/users/api/use-get-user";
import UserForm from "@/features/users/components/user-form";
import { useSession } from "next-auth/react";
import type { ImageListType } from "react-images-uploading";
import type { z } from "zod";

const formSchema = insertUserSchema.pick({
  name: true,
});

type FromValues = z.input<typeof formSchema>;

const SettingsProfilePage = () => {
  const session = useSession();
  const editUser = useEditUser(session.data?.user?.id);
  const userQuery = useGetUser(session.data?.user?.id);

  const user = userQuery.data;

  const defaultValues = { name: user?.name ?? "" };

  const handleSubmit = (
    values: FromValues,
    image: ImageListType,
    faceImage: ImageListType,
  ) => {
    let base64Image: string | undefined;
    let base64FaceImage: string | undefined;

    if (image[0].dataURL?.startsWith("data:image")) {
      base64Image = image[0].dataURL;
    }

    if (faceImage[0].dataURL?.startsWith("data:image")) {
      base64FaceImage = faceImage[0].dataURL;
    }

    editUser.mutate({
      ...values,
      image: base64Image,
      faceImage: base64FaceImage,
    });
  };

  if (userQuery.isLoading) {
    return null;
  }

  return (
    <div className="py-8">
      <UserForm
        defaultValues={defaultValues}
        image={user?.image}
        faceImage={user?.faceImage}
        disabled={editUser.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SettingsProfilePage;
