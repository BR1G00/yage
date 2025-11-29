import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Choice, Page } from "@/models";
import type { Node } from "@xyflow/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Flag,
  Home,
  Play,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const PlayStory = () => {
  const nodes = useGamebookStore((state) => state.nodes);
  const edges = useGamebookStore((state) => state.edges);

  const { pages, choices } = useMemo(() => {
    const p: Node<Page>[] = [];
    const c: Node<Choice>[] = [];

    nodes.forEach((node) => {
      if (node.type === "page") {
        p.push(node as Node<Page>);
      } else if (node.type === "choice") {
        c.push(node as Node<Choice>);
      }
    });

    return { pages: p, choices: c };
  }, [nodes]);

  const [pageHistory, setPageHistory] = useState<string[]>(() => {
    const startPageId = pages?.find((node) => node.data.type === "start")?.id;
    return startPageId ? [startPageId] : [];
  });

  const currentPageId = pageHistory[pageHistory.length - 1];

  const currentPage = useMemo(() => {
    return pages.find((node) => node.id === currentPageId);
  }, [pages, currentPageId]);

  const currentChoices = useMemo(() => {
    const choicesIds = new Set(
      edges
        .filter((edge) => edge.source === currentPageId)
        .map((edge) => edge.target)
    );
    return choices.filter((choice) => choicesIds.has(choice.id));
  }, [choices, currentPageId, edges]);

  const choiceDestinations = useMemo(() => {
    const map = new Map<string, string | undefined>();
    currentChoices.forEach((choice) => {
      map.set(
        choice.id,
        edges.find((edge) => edge.source === choice.id)?.target
      );
    });
    return map;
  }, [currentChoices, edges]);

  const handleChoiceClick = (choiceId: string) => {
    const nextPageId = choiceDestinations.get(choiceId);
    if (nextPageId) {
      setPageHistory((prev) => [...prev, nextPageId]);
    }
  };

  const handleBack = () => {
    if (pageHistory.length > 1) {
      setPageHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleRestart = () => {
    const startPageId = pages?.find((node) => node.data.type === "start")?.id;
    if (startPageId) {
      setPageHistory([startPageId]);
    }
  };

  const isEndPage = currentPage?.data.type === "end";
  const isStartPage = currentPage?.data.type === "start";

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-3">
          {isStartPage ? (
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Play className="w-4 h-4 text-emerald-600" />
            </div>
          ) : isEndPage ? (
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Flag className="w-4 h-4 text-amber-600" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-900">
            {currentPage?.data.title}
          </h2>
        </div>

        <div className="flex items-center justify-between px-2">
          {pageHistory.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </Button>
          )}

          {!isStartPage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRestart}
              className="gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Ricomincia
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`h-full max-w-7xl mx-auto p-8 ${
            isEndPage && currentChoices.length === 0
              ? "flex items-center justify-center"
              : ""
          }`}
        >
          {isEndPage && currentChoices.length === 0 ? (
            <Card className="p-12 bg-white shadow-lg border-gray-200 text-center max-w-md">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <Flag className="w-10 h-10 text-amber-600" />
              </div>
              <p className="text-3xl font-semibold text-gray-900 mb-8">
                Fine della storia
              </p>
              <Button
                onClick={handleRestart}
                variant="outline"
                size="lg"
                className="gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Ricomincia
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              {currentPage?.data.image && (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-100 mx-auto">
                  <img
                    src={currentPage.data.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-70"
                    aria-hidden="true"
                  />
                  <img
                    src={currentPage.data.image}
                    alt={currentPage.data.title || ""}
                    className="relative z-10 object-contain max-h-[90%] max-w-[90%] rounded-xl shadow"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                </div>
              )}

              <div className="space-y-6">
                {currentPage?.data.content && (
                  <Card className="p-6 bg-white border-gray-200">
                    <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                      {currentPage.data.content}
                    </p>
                  </Card>
                )}

                {currentChoices.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide px-1">
                      Scegli la tua azione
                    </h3>
                    {currentChoices.map((choice, index) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoiceClick(choice.id)}
                        className="group w-full text-left bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-xl p-4 transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {choice.data.title}
                            </p>
                            {choice.data.content && (
                              <p className="text-sm text-gray-600 mt-1">
                                {choice.data.content}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
