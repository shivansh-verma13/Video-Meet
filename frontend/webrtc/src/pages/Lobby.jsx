import { VideoPlayer } from "../components/VideoPlayer";
import { Options } from "../components/Options";
import { Notifications } from "../components/Notifications";

export const Lobby = () => {
  return (
    <div className="flex items-center h-full justify-center flex-col text-white">
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};
