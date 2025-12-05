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
import { PageCard } from "./PageCard";

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
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-violet-600" />
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-900">Play mode</h2>
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
          className="h-full max-w-7xl mx-auto p-8 flex items-center justify-center"
        >
          {isEndPage && currentChoices.length === 0 ? (
            currentPage && (
              <PageCard
                page={currentPage.data}
                image={currentPage.data.image}
                onRestart={handleRestart}
              />
            )
          ) : (
            currentPage && (
              <PageCard
                page={currentPage.data}
                image={currentPage.data.image}
              >
                {currentChoices.length > 0 && (
                  <div className="space-y-3 w-full">
                    {currentChoices.map((choice, index) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoiceClick(choice.id)}
                        className={
                          `group w-full text-left bg-white border border-gray-200 rounded-xl p-4 transition-all shadow-sm hover:shadow-md cursor-pointer ` +
                          (isStartPage
                            ? "hover:bg-emerald-50 hover:border-emerald-300"
                            : isEndPage
                            ? "hover:bg-amber-50 hover:border-amber-200"
                            : "hover:bg-violet-50 hover:border-violet-300")
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div className={
                            `flex-shrink-0 w-10 h-10 rounded-lg text-white font-bold text-lg flex items-center justify-center shadow-sm ` +
                            (isStartPage
                              ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                              : isEndPage
                              ? "bg-gradient-to-br from-amber-400 to-amber-600"
                              : "bg-gradient-to-br from-violet-500 to-violet-600")
                          }>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={
                              `font-semibold transition-colors ` +
                              (isStartPage
                                ? "text-emerald-700 group-hover:text-emerald-900"
                                : isEndPage
                                ? "text-amber-700 group-hover:text-amber-900"
                                : "text-violet-700 group-hover:text-violet-900")
                            }>
                              {choice.data.title}
                            </p>
                            {choice.data.content && (
                              <p className="text-sm text-gray-600 mt-1">
                                {choice.data.content}
                              </p>
                            )}
                          </div>
                          <ArrowRight className={
                            `w-5 h-5 group-hover:translate-x-1 transition-all flex-shrink-0 ` +
                            (isStartPage
                              ? "text-emerald-400 group-hover:text-emerald-600"
                              : isEndPage
                              ? "text-amber-400 group-hover:text-amber-600"
                              : "text-violet-400 group-hover:text-violet-600")
                          } />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </PageCard>
            )
          )}
        </div>
      </div>
    </div>
  );
};
