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
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-[#00476366] p-3 space-y-3">
      <div
        className="relative w-full shrink-0 aspect-4/3"
        style={{ aspectRatio: "4 / 3" }}
      >
        <Image
          src={image}
          alt={`${name}'s skin transformation`}
          fill
          sizes="(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center rounded-2xl bg-white px-6 py-4">
        <div className="flex flex-nowrap items-center justify-between gap-x-3">
          <h3 className="min-w-0 truncate lg:text-xl font-medium text-primary sm:text-sm">
            {name}, {location}
          </h3>
          <span className="shrink-0 whitespace-nowrap text-sm lg:text-lg font-medium text-primary sm:text-base">
            Duration: {duration}
          </span>
        </div>
        {desc && (
          <>
            <div className="mt-3 h-px w-full bg-linear-to-r from-primary via-primary/10 to-primary" />
            <p className="mt-3 text-base leading-tight text-primary/90 sm:text-lg">
              &ldquo;{desc}&rdquo;
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerResultCard;

