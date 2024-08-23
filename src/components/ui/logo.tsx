import cn from 'classnames';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { siteSettings } from '@/data/static/site-settings';
import { useSettings } from '@/data/settings';

export default function Logo({
  className = 'w-20',
  ...props
}: React.AnchorHTMLAttributes<{}>) {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  const { lightLogo, darkLogo } = siteSettings;
  const { settings }: any = useSettings();
  return (
    <AnchorLink
      href={process.env.NEXT_PUBLIC_WEBSITE_URL ?? '#'}
      target="_blank"
      className={cn(
        'relative flex items-center text-dark focus:outline-none dark:text-light',
        className,
      )}
      {...props}
    >
      <span
        className="relative overflow-hidden"
        style={{
          width: siteSettings?.width,
          height: siteSettings?.height,
        }}
      >
        {isMounted && isDarkMode && (
          <Image
            src={'/logo_brand.png'}
            fill
            loading="eager"
            alt={'Ramp Dark Logo'}
            className="object-contain"
            priority
            sizes="(max-width: 968px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        )}
        {isMounted && !isDarkMode && (
          <Image
            src={'/logo_black.png'}
            fill
            loading="eager"
            alt={'Ramp Light Logo'}
            className="object-contain"
          />
        )}
      </span>
    </AnchorLink>
  );
}
