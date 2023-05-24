import Image from 'next/image';
import noposter from '@/assets/noposter.jpg';
import { useRecoilState } from 'recoil';
import { personIdState, personModalState } from '@/atoms/detailsAtom';
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
  const [showPersonModal, setShowPersonModal] =
    useRecoilState(personModalState);
  const [currentPersonId, setCurrentPersonId] = useRecoilState(personIdState);

  const handleClick = () => {
    setCurrentPersonId(person.id);
    setShowPersonModal(true);
  };

  return (
    <div className="md:hover:-translate-y-2 transition">
      <div
        className="relative min-h-[100px] w-[100px] cursor-pointer transition duration-200 ease-out md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] mx-auto"
        onClick={() => handleClick()}
      >
        <Image
          src={person.photo || noposter}
          alt={person.name || `${person.id}`}
          fill
          sizes="(min-width: 768px) 150px, 100px"
          className="rounded-full object-cover cursor-pointer"
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
