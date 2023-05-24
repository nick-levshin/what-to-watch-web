import { personModalState } from '@/atoms/detailsAtom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import MuiModal from '@mui/material/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Person } from '../../typings';

interface Props {
  id: number | null;
}

const ActorModal = ({ id }: Props) => {
  const [showModal, setShowModal] = useRecoilState(personModalState);
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);

  const fetchActor = async () => {
    const res = await axios.get(`https://api.kinopoisk.dev/v1/person/${id}`, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return res.data;
  };

  useEffect(() => {
    fetchActor().then((res) => setCurrentPerson(res));
  }, []);

  return (
    <MuiModal
      open={showModal}
      onClose={() => setShowModal(false)}
      className="fixed !top-10 left-0 right-0 z-50 mx-auto w-full max-w-5xl] overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={() => setShowModal(false)}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 bg-[#181818]hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="">{currentPerson?.name}</div>
      </>
    </MuiModal>
  );
};

export default ActorModal;
