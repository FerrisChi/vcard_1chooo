import React from "react";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";

import "@/styles/resume/normal-item.css";

export interface NormalItemProps {
  titleMarkdown: string;
  contentMarkdown: string;
}

function NormalItem({
  titleMarkdown,
  contentMarkdown,
}: NormalItemProps) {
  return (
    <li className="normal-item">
      <h4 className="text-white-2 font-bold leading-[1.3] mb-6 mt-6">
        <MarkdownRenderer content={titleMarkdown} />
      </h4>
      <div className="normal-text">
        <MarkdownRenderer content={contentMarkdown} />
      </div>
    </li>
  );
};

export default NormalItem;
