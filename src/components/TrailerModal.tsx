import { modalState, userState } from '@/atoms/detailsAtom';
import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import {
  CheckBadgeIcon,
  HandThumbUpIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { supabase } from '@/utils/supabaseClient';
import { Toaster, toast } from 'react-hot-toast';

interface Props {
  url: string;
  id: number;
  name: string;
}

const TrailerModal = ({ url, id, name }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(user?.liked_movies?.includes(id));

  const handleLike = async () => {
    try {
      let newLikedMovies: number[];
      if (isLiked) {
        newLikedMovies = (user?.liked_movies as []).filter(
          (movieId) => movieId !== id
        );
      } else {
        newLikedMovies = user?.liked_movies
          ? [...(user?.liked_movies as []), id]
          : [id];
      }
      const { error } = await supabase
        .from('users')
        .update({ liked_movies: newLikedMovies })
        .eq('id', user?.id);
      if (!error) {
        setUser((prev) => {
          return { ...prev, liked_movies: newLikedMovies };
        });
        setIsLiked((prev) => !prev);
        if (isLiked) {
          toast.success(`"${name}" был удален из избранного`, {
            duration: 8000,
          });
        } else {
          toast.success(`"${name}" был добавлен в избранное`, {
            duration: 8000,
          });
        }
      } else {
        throw new Error('Handle like error');
      }
    } catch (e) {
      console.log('Handle like error:', e);
    }
  };

  return (
    <MuiModal
      open={showModal}
      onClose={() => setShowModal(false)}
      className="fixed !top-10 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
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
                {isLiked ? (
                  <CheckBadgeIcon
                    onClick={() => handleLike()}
                    className="w-6 h-6"
                  />
                ) : (
                  <HandThumbUpIcon
                    onClick={() => handleLike()}
                    className="h-7 w-7"
                  />
                )}
              </button>
            </div>
            <button
              className="modalButton"
              onClick={() => setMuted((prev) => !prev)}
            >
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
