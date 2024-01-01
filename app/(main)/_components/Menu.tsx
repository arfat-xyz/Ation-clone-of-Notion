"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface MenuInterface {
  id: Id<"documents">;
}

const Menu = ({ id }: MenuInterface) => {
  const router = useRouter();
  const { user } = useUser();
  const archieve = useMutation(api.documents.archive);
  const onArchieve = () => {
    if (!id) return;
    const promise = archieve({ id });
    toast.promise(promise, {
      loading: "Wait, moving it to trash...",
      success: "Congress, moved to trash!",
      error: "Sorry, to move in trash",
    });
    router.push("/documents");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchieve}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};

export default Menu;
