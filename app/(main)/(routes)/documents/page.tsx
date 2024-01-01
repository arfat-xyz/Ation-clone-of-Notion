"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({ title: "No Title" }).then((id) =>
      router.push(`/documents/${id}`)
    );
    toast.promise(promise, {
      loading: "Wait, creating a new note...",
      success: "Congress, new note created!",
      error: "Sorry, failed to create note",
    });
  };
  return (
    <div className="flex h-full justify-center flex-col items-center space-y-4">
      <Image
        src={"/empty.png"}
        width={300}
        height={300}
        className="object-contain dark:hidden "
        alt="Empty"
      />
      <Image
        src={"/empty-dark.png"}
        width={300}
        height={300}
        className="object-contain  dark:block hidden "
        alt="Empty"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos; s Ation
      </h2>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="w-6 h-6 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
