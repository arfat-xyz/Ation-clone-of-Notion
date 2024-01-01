"use client";
import Cover from "@/components/cover";

import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { jsPDF } from "jspdf";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
interface DocumentProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params }: DocumentProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const componentRef = React.useRef<HTMLDivElement>(null);
  const doc = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  const onChange = (content: string) =>
    update({
      id: params.documentId,
      content,
    });
  if (doc === undefined)
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:mx-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  if (doc === null) return <div>Not found</div>;

  const handleDownload = async () => {
    const content = componentRef.current;
    if (content) {
      const x = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
      x.html(content, {
        html2canvas: {
          scale: 0.5,
        },
        callback: function (x) {
          x.save(doc.title);
        },
      });
    }
  };
  return (
    <div className="pb-40">
      <Cover url={doc.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={doc} />{" "}
        <Button
          variant={"outline"}
          className="hidden md:block"
          onClick={handleDownload}
        >
          Download PDF
        </Button>
        <div className="w-full" ref={componentRef}>
          <Editor onChange={onChange} initialData={doc.content} />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
