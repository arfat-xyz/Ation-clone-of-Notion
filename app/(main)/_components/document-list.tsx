"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const onExpand = (docId: string) => {
    setExpanded((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };
  const documents = useQuery(api.documents.getSidebar, {
    pareentDocument: parentDocumentId,
  });
  const onRedirect = (docId: string) => router.push(`/documents/${docId}`);
  if (documents === undefined)
    <>
      <Item.Skeleton level={level} />
      {level === 0 && (
        <>
          <Item.Skeleton level={level} />
          <Item.Skeleton level={level} />
        </>
      )}
    </>;
  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-xs font-medium to-muted-foreground",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          />
          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
