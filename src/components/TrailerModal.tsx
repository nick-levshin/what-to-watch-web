import { modalState } from '@/atoms/detailsAtom';
import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import {
  HandThumbUpIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import ReactPlayer from 'react-player';

interface Props {
  url: string;
}

const TrailerModal = ({ url }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

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
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            playing={playing}
            muted={muted}
            style={{ position: 'absolute', top: '0', left: '0' }}
          />
          <div className="absolute bottom-10 w-full items-center flex justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="modalButton"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <PlayIcon className="h-7 w-7" />
                ) : (
                  <PauseIcon className="h-7 w-7" />
                )}
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default TrailerModal;
