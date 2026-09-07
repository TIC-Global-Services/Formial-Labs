import Image from "next/image";

interface CustomerResultsCardProps {
  image: string;
  name: string;
  location: string;
  duration: string;
  desc?: string;
  type: string;
}

const CustomerResultCard = ({
  image,
  name,
  location,
  duration,
  desc,
}: CustomerResultsCardProps) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-[#00476366] p-4 space-y-4">
      <div className="relative aspect-4/3 w-full">
        <Image
          src={image}
          alt={`${name}'s skin transformation`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="rounded-3xl bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h3 className=" text-xl font-medium text-primary sm:text-base">
            {name}, {location}
          </h3>
          <span className="whitespace-nowrap text-lg font-medium text-primary sm:text-base">
            Duration : {duration}
          </span>
        </div>
        {desc && (
          <>
            <div className="mt-3 h-px w-full bg-linear-to-r from-primary via-primary/10 to-primary" />
            <p className="mt-3 text-base leading-relaxed text-primary/80 sm:text-lg">
              &ldquo;{desc}&rdquo;
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerResultCard;

