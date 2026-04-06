interface BannerProps {
  title: string;
}

export const Banner = ({ title }: BannerProps) => (
  <h1>{title}</h1>
);