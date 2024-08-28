import { NextSeo, NextSeoProps } from 'next-seo';
interface SeoProps extends NextSeoProps {
  url: string;
}
const Seo = ({ title, description, url, ...props }: SeoProps) => {
  return (
    <NextSeo
      title={'Ramp | New Customers, More Sales'}
      description={'Ramp | New Customers, More Sales'}
      openGraph={{
        url: `http://res.cloudinary.com/dc9kfp5gt/image/upload/v1724451002/RampIcon/nk4lnmcd8vhwhet6mvn8.svg`,
        title: 'Ramp | New Customers, More Sales',
        description: 'Ramp | New Customers, More Sales',
      }}
      // {...props}
    />
  );
};

export default Seo;
