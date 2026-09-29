import Image from "next/image";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow ">
      {/* Icon */}
      <div className="relative w-10 h-10 mb-4">
        <Image src={icon} fill className="object-contain" alt={title} />
      </div>

      {/* Text */}
      <h3 className="title3 text-text-dark mb-2">{title}</h3>
      <p className="body4 text-text-secondary max-w-[183px]" >{description}</p>
    </div>
  );
};

export default FeatureCard;
