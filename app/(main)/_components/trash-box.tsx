"use client";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );
  const onClick = (docId: string) => router.push(`/documents/${docId}`);
  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id });
    toast.promise(promise, {
      loading: "Wait, restoring note",
      success: "Congress, note resored!",
      error: "Sorry, falied to restore note",
    });
  };
  const onRemove = (id: Id<"documents">) => {
    const promise = remove({ id });
    toast.promise(promise, {
      loading: "Wait, deleting note",
      success: "Congress, note deleted!",
      error: "Sorry, falied to delete note",
    });
    if (params.documentId === id) router.push("/documents");
  };
  if (documents === undefined)
    <>
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    </>;
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found{" "}
        </p>
        {filteredDocuments?.map((doc) => (
          <>
            <div
              key={doc._id}
              role="button"
              onClick={() => onClick(doc._id)}
              className="text-sm rounded-sm w-full hover: bg-primary/5 flex items-center text-primary justify-between"
            >
              <span className="truncate pl-2">{doc?.title}</span>
              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, doc?._id)}
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                  <div
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    role="button"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
