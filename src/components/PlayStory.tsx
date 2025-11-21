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
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

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
    <div className="flex flex-col h-full w-full overflow-hidden bg-white">
      <div className="flex-shrink-0 flex items-center justify-between p-4 pr-14 border-b h-16">
        <div className="flex items-center gap-3">
          {isStartPage ? (
            <Play className="w-4 h-4 text-green-600" />
          ) : isEndPage ? (
            <Flag className="w-4 h-4 text-orange-600" />
          ) : (
            <BookOpen className="w-4 h-4 text-gray-400" />
          )}

          <h2 className="text-base font-semibold text-gray-900">
            {currentPage?.data.title}
          </h2>

          {isStartPage && (
            <Badge className="bg-green-600 text-white text-xs">Start</Badge>
          )}

          {isEndPage && (
            <Badge
              variant="outline"
              className="text-xs bg-orange-600 text-white border-orange-600"
            >
              End
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {pageHistory.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-1 cursor-pointer"
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
              className="gap-1 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Ricomincia
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6 space-y-6">
          {currentPage?.data.image && (
            <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={currentPage.data.image}
                alt={currentPage.data.title || ""}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {currentPage?.data.content && (
            <Card className="p-6 bg-white border-1">
              <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                {currentPage.data.content}
              </p>
            </Card>
          )}

          {currentChoices.length > 0 && (
            <div className="space-y-3 pt-4">
              <Separator />
              <div className="grid gap-3">
                {currentChoices.map((choice) => (
                  <Card
                    key={choice.id}
                    className="group cursor-pointer hover:border-gray-400 bg-white border-1 mt-4"
                    onClick={() => handleChoiceClick(choice.id)}
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold text-gray-900">
                          {choice.data.title}
                        </p>
                        {choice.data.content && (
                          <p className="text-sm text-gray-600">
                            {choice.data.content}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-900 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {isEndPage && currentChoices.length === 0 && (
            <div className="text-center space-y-4 py-8">
              <Flag className="w-8 h-8 mx-auto text-orange-600" />
              <p className="text-lg font-medium text-gray-900">
                Fine della storia
              </p>
              <Button
                onClick={handleRestart}
                variant="outline"
                className="gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Ricomincia
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
