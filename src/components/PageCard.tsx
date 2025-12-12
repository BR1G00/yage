import { Flag, Home, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Page } from "@/models";
import React from "react";

interface PageCardProps {
  page: Page;
  image?: string;
  onRestart?: () => void;
  children?: React.ReactNode;
}

export const PageCard: React.FC<PageCardProps> = ({
  page,
  image,
  onRestart,
  children,
}) => (
  <Card
    className={
      `p-12 bg-white shadow-xl text-center border-2 max-h-[70vh] ${
        image ? "" : "max-w-md mx-auto"
      } ` +
      (page.type === "start"
        ? "border-emerald-300/40"
        : page.type === "end"
        ? "border-amber-100/40"
        : "border-violet-300/40")
    }
  >
    <div className="flex h-full min-h-0">
      <div className={image ? "w-1/2 flex flex-col min-h-0" : "w-fit mx-auto"}>
        <div className="flex items-center gap-3 mb-8 w-full flex-shrink-0">
          {page.type === "start" && (
            <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Play className="w-4 h-4 text-emerald-600" />
            </span>
          )}
          {page.type === "end" && (
            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Flag className="w-4 h-4 text-amber-600" />
            </span>
          )}
          <p className="text-3xl font-semibold text-gray-900 text-left w-full">
            {page.title || "Fine"}
          </p>
        </div>
        <div className="flex flex-col items-start justify-start overflow-y-auto flex-1 min-h-0 pl-1">
          {page.content && (
            <p className="text-lg text-gray-700 mb-8 text-le text-left w-full">
              {page.content}
            </p>
          )}
          {page.type !== "end" && (
            <h3 className="text-sm font-medium uppercase tracking-wide px-1 mb-4 w-full text-left text-gray-500">
              Fai la tua scelta
            </h3>
          )}
          {children}
          {onRestart && (
            <Button
              onClick={onRestart}
              variant={page.type === "end" ? "outline" : "outline"}
              size="lg"
              className={
                `gap-2 cursor-pointer mt-6 transition-all duration-200 ` +
                (page.type === "end"
                  ? "border-amber-400 text-amber-700 hover:bg-amber-50 hover:border-amber-500 hover:scale-105 hover:text-amber-700"
                  : "")
              }
            >
              <Home
                className={
                  page.type === "end"
                    ? "w-4 h-4 text-amber-700 group-hover:text-amber-700"
                    : "w-4 h-4"
                }
              />
              Ricomincia
            </Button>
          )}
        </div>
      </div>
      {image && (
        <div
          className={
            "relative overflow-hidden shadow-lg flex items-center justify-center bg-gray-100 h-[550px] ml-8 rounded-2xl w-1/2"
          }
        >
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-70"
            aria-hidden="true"
          />
          <img
            src={image}
            alt={page.title || ""}
            className="relative z-10 object-contain max-h-[90%] max-w-[90%] rounded-xl shadow"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />
        </div>
      )}
    </div>
  </Card>
);
