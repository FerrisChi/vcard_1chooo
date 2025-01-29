import React from "react";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";

import "@/styles/resume/timeline-item.css";

export interface NormalItemProps {
  titleMarkdown: string;
  tasksMarkdown: string;
}

function NormalItem({
  titleMarkdown,
  tasksMarkdown,
}: NormalItemProps) {
  return (
    <li className="timeline-item">
      <MarkdownRenderer content={titleMarkdown} />
      <br />
      <div className="timeline-text">
        <MarkdownRenderer content={tasksMarkdown} />
      </div>
    </li>
  );
};

export default NormalItem;
