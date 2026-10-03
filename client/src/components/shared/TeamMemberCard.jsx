import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Reusable data-driven TeamMemberCard component.
 * Safely renders null if member name or data is missing.
 */
export default function TeamMemberCard({ member, className }) {
  if (!member || !member.name) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-gray6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {member.image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray7">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-gray7 text-2xl font-bold text-accent">
          {member.name.charAt(0)}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h4 className="title3 text-dark">{member.name}</h4>
        {member.role && (
          <p className="caption mt-0.5 text-accent font-semibold">{member.role}</p>
        )}
        {member.bio && (
          <p className="body5 mt-2.5 text-text-secondary line-clamp-3">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
