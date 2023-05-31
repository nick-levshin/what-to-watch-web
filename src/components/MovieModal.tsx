import { movieModalState } from '@/atoms/detailsAtom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';

interface Props {
  url: string;
}

const MovieModal = ({ url }: Props) => {
  const [showMovieModal, setShowMovieModal] = useRecoilState(movieModalState);

  return (
    <MuiModal
      open={showMovieModal}
      onClose={() => setShowMovieModal(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={() => setShowMovieModal(false)}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 bg-[#181818]hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
          }}
        />
      </>
    </MuiModal>
  );
};

export default MovieModal;
