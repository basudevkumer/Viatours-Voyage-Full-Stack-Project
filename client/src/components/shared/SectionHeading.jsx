const SectionHeading = ({ eyebrow, title, text, action }) => (
  <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
    <div>{eyebrow && <p className="caption text-accent">{eyebrow}</p>}<h2 className="heading mt-2 text-dark">{title}</h2>{text && <p className="body3 mt-3 max-w-[600px] text-text-secondary">{text}</p>}</div>
    {action}
  </div>
);
export default SectionHeading;
