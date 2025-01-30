import IconTitle from "./icon-title";
import TimelineItem from "./timeline-item";
import NormalItem from "./normal-item";
import type { ProfessionalExperience } from "@/types/resume";
import type { Education } from "@/types/resume";
import type { AwardLeaderships } from "@/types/resume";
import type { TeachingExperience } from "@/types/resume";
import type { Other } from "@/types/resume";
import type { Project } from "@/types/resume";

interface Props {
  data: ProfessionalExperience | Education | AwardLeaderships | TeachingExperience | Other | Project;
}

function ItemList({ items }: { items: any[] }) {
  return (
    <ol className="timeline-list">
      {items.map((item, index) => {
        if ('company' in item) {
          return (
            <TimelineItem
              key={index}
              company={item.company}
              location={item.location}
              role={item.role}
              duration={item.duration}
              tasksMarkdown={item.tasksMarkdown}
            />
          );
        } else {
          return (
            <NormalItem
              key={index}
              titleMarkdown={item.titleMarkdown}
              contentMarkdown={item.contentMarkdown}
            />
          );
        }
      })}
    </ol>
  );
}

function TimeLine({ data }: Props) {
  const { icon, title, items } = data;

  return (
    <section className="timeline">
      <IconTitle icon={icon} title={title} />
      <ItemList items={items} />
    </section>
  );
}

export default TimeLine;