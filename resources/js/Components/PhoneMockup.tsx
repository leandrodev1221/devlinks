import { ArrowRight } from 'phosphor-react';
import PhoneMockupIllustration from '/public/assets/images/illustration-phone-mockup.svg';
import { UserLinkProps } from '@/types/user-link';
import clsx from 'clsx';
import { UserProps } from '@/types/user';

type Props = {
  links: UserLinkProps[];
  user?: UserProps;
  photoPreview?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  publicEmail?: string | null;
};

export const LinkCard = ({ link }: { link: UserLinkProps }) => {
  const isFrontendMentor = link.platform.name === 'Frontend Mentor';

  const isValidUrl = link.url && link.url !== '';

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidUrl) e.preventDefault();
  };

  return (
    <a
      key={link.id}
      href={isValidUrl ? (link.url as string) : '#'}
      target="_blank"
      onClick={handleClick}
      className={clsx(
        'flex items-center justify-between p-[0.72rem] rounded-md duration-150 transition-all',
        { 'border border-gray-300': isFrontendMentor },
        { 'disabled:cursor-not-allowed': !isValidUrl },
        isFrontendMentor ? 'text-dark-gray' : 'text-white'
      )}
      style={{ backgroundColor: link.platform.color }}
    >
      <div className="flex items-center gap-2">
        {link.platform.icon_url && (
          <img
            src={`/assets/images/${link.platform.icon_url}`}
            alt={`${link.platform.name} icon`}
            style={{
              filter: `${!isFrontendMentor ? 'saturate(0%) brightness(318%)' : ''}`
            }}
          />
        )}
        <p className="text-md">{link.platform.name}</p>
      </div>
      <ArrowRight
        size={16}
        className={clsx(isFrontendMentor ? 'text-dark-gray' : 'text-white')}
      />
    </a>
  );
};

export const PhoneMockup = ({
  user,
  photoPreview,
  firstName,
  lastName,
  publicEmail,
  links
}: Props) => {
  return (
    <div className="w-[307px] h-[631px] relative">
      <img src={PhoneMockupIllustration} alt="Phone mockup" />
      {(photoPreview || user?.avatar_url) && (
        <div
          style={{
            backgroundImage: `url(${photoPreview || user?.avatar_url})`
          }}
          className="absolute border-4 border-medium-purple rounded-full bg-opacity-20 h-[6.1rem] w-[6.1rem] z-[9998] top-[4rem] left-[6.5rem] bg-cover bg-center"
        />
      )}

      {(firstName || user?.first_name) && (
        <div className="font-bold w-[17.2rem] text-center absolute bg-white z-[9998] top-[11.3rem] left-[1rem] bg-cover bg-center">
          <p>
            {firstName || user?.first_name} {lastName || user?.last_name}
          </p>
        </div>
      )}

      {(publicEmail || user?.public_email) && (
        <div className="text-sm w-[17.2rem] text-center absolute bg-white z-[9998] top-[12.8rem] left-[1rem] bg-cover bg-center">
          <p>{publicEmail || user?.public_email}</p>
        </div>
      )}

      <div className="max-h-[300px] left-[1.3rem] overflow-y-scroll absolute flex flex-col items-center justify-center w-[15.7rem] m-4 top-[16.4rem]">
        <div className="w-full overflow-y-auto flex flex-col gap-[0.98rem]">
          {links?.map((link) => <LinkCard key={link.id} link={link} />)}
        </div>
      </div>
    </div>
  );
};
