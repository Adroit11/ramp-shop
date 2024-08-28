// import { useSettings } from '@/data/settings';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';

const DefaultSeo = () => {
  // const { settings } = useSettings();
  return (
    <NextDefaultSeo
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
      title={'Ramp | New Customers, More Sales'}
      titleTemplate={'Ramp | New Customers, More Sales'}
      defaultTitle="Ramp | New Customers, More Sales"
      description={'Ramp | New Customers, More Sales'}
      // canonical={settings?.seo?.canonicalUrl}
      // openGraph={{
      //   title: settings?.seo?.ogTitle,
      //   description: settings?.seo?.ogDescription,
      //   type: 'website',
      //   locale: 'en_US',
      //   site_name: 'Ramp',
      //   images: [
      //     {
      //       url: '/ramp-fav-black.svg',
      //       width: 800,
      //       height: 600,
      //       alt: 'Ramp',
      //     },
      //   ],
      // }}
      // twitter={{
      //   handle: settings?.seo?.twitterHandle,
      //   site: settings?.siteTitle,
      //   cardType: settings?.seo?.twitterCardType,
      // }}
    />
  );
};

export default DefaultSeo;
