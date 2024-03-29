"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./Menu";
import Publish from "./publish";
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const doc = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });
  if (doc === undefined)
    return (
      <nav
        className={`bg-background dark:bg-[#1f1f1f] px-3 py-2 ${
          isCollapsed ? "w-screen" : "w-full"
        }  flex items-center gap-x-4`}
      >
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  if (doc === null) return null;
  return (
    <>
      <nav
        className={`bg-background dark:bg-[#1f1f1f] px-3 py-2 ${
          isCollapsed ? "w-screen" : "w-full"
        }  flex items-center gap-x-4`}
      >
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={doc} />
          <div className="flex items-center gap-x-2">
            <Publish doc={doc} />

            <Menu id={doc._id} />
          </div>
        </div>
      </nav>
      {doc.isArchived && <Banner id={doc._id} />}
    </>
  );
};

export default Navbar;
