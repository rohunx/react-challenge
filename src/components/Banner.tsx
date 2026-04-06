interface BannerProps {
  title: string;
}

export const Banner = ({ title }: BannerProps) => (
  <h1 className="text-4xl sm:text-2xl font-bold mb-6">
    {title}
  </h1>
);