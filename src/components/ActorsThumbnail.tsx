import Image from 'next/image';
import noposter from '@/assets/noposter.jpg';
import { useRecoilState } from 'recoil';
import { appState } from '@/atoms/detailsAtom';
import { capitalizeFirstLetter } from '@/utils/helpers';

interface Props {
  person: {
    id: number;
    name: string;
    photo: string;
    profession: string;
  };
}

const ActorsThumbnail = ({ person }: Props) => {
  const handleMovieClick = (id: number) => {
    // setAppSettings({ loading: true });
    // router.push(`/${id}`).then(() => setAppSettings({ loading: false }));
  };

  return (
    <div className="md:hover:-translate-y-2 transition">
      <div className="relative min-h-[100px] min-w-[100px] cursor-pointer transition duration-200 ease-out md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] mx-auto">
        <Image
          src={person.photo || noposter}
          alt={person.name || `${person.id}`}
          fill
          sizes="(min-width: 768px) 150px, 100px"
          className="rounded-full object-cover cursor-pointer"
          onClick={() => handleMovieClick(person?.id)}
        />
      </div>
      <div className="min-h-[50px] mt-2 text-center">
        <h4 className="text-sm font-semibold actors-name md:text-base lg:text-lg">
          {person.name}
        </h4>
        <h5 className="text-xs mt-1 text-gray-400 md:text-sm lg:text-base">
          {capitalizeFirstLetter(person.profession)}
        </h5>
      </div>
    </div>
  );
};

export default ActorsThumbnail;
