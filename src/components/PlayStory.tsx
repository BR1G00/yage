import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Choice, Page } from "@/models";
import type { Node } from "@xyflow/react";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";

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

  return (
    <div className=" flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">{currentPage?.data.title}</h2>
      <p className="text-sm text-muted-foreground">
        {currentPage?.data.content}
      </p>
      {currentPage?.data.image && (
        <div className="relative w-full h-56 bg-gray-100 rounded-sm overflow-hidden  mt-2">
          <img
            src={currentPage?.data.image || ""}
            alt={currentPage?.data.title || ""}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {currentChoices.map((choice) => (
          <div
            key={choice.id}
            className="border border-gray-300 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            onClick={() => handleChoiceClick(choice.id)}
          >
            <p className="text-sm font-medium">{choice.data.title}</p>
            <p className="text-xs text-muted-foreground">
              {choice.data.content}
            </p>
          </div>
        ))}
      </div>

      {pageHistory.length > 1 && (
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft /> Back
        </Button>
      )}
    </div>
  );
};
