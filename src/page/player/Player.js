import React, { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../api/getAudio';
import Header from '../../components/header/Header';
import { useGetSongsByIdQuery } from '../../reduxtool/services/songsApi';
import { addSongId, addSongInfo } from '../../reduxtool/slice/currentSongSlice';
import MiniPlayer from './miniPlayer/MiniPlayer';
import './Player.css'
import PlayerControls from './playerControls/PlayerControls';
import RelatedSongs from './relatedSongs/RelatedSongs';


const Player = ({ onHome }) => {
  const [songUrl, setSongUrl] = useState('');
  const [songsInfo, setSongsInfo] = useState([]);
  const [audioLoading, setAudioLoading] = useState(true);
  const [songsList, setSongsList] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true)
  const [onMiniPlayer, setOnMiniPlayer] = useState(false);
   
  // const { id } = JSON.parse(localStorage.getItem('currentSongInfo'));
  // const dispatch = useDispatch();
  // const currentSong = useSelector((state) => state.currentSongSlice.currentSongInfo)
  // const { id } = currentSong;
  // console.log(currentSong)
  let { id } = useParams() ;
  // if(!id){
  //   id= currentSong.id
  // }
  const { data } = useGetSongsByIdQuery(id);

  const [progress, setProgress] = useState(0);

  const audioRef = useRef();
  const navigate = useNavigate()

  // get songs url
  const getSongUrl = async () => {
    try {
      const response = await fetch(`${baseUrl}/song/${id}`, {
        method: "GET",
      })
      const data = await response.json()
      // console.log(data)
      setSongUrl(data)
      setAudioLoading(false)
      setIsPlaying(false)

    } catch (error) {
      console.log(error)
      console.log(error.message)
      setAlertMessage(error.message)
      setTimeout(() => {
        setAlertMessage('')
      }, 3000);
    }
  }
  useEffect(() => {
    getSongUrl();
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (data) {
      setSongsInfo(data.items)
    }
  }, [data])


  useEffect(() => {
    if(songsInfo[0]?.snippet?.liveBroadcastContent === 'live'){
      setAlertMessage("can't play live stream")
      setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }
  }, [songsInfo])
  


  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currTime = audioRef.current.currentTime;
    // console.log(duration,currTime)
    setProgress(currTime / duration * 100);

  }

  //  reset state on song changed
  useEffect(() => {
    setProgress(0)
    setAudioLoading(true)
  }, [id])

 


  // console.log({ isPlaying, audioLoading })

  const mapVideoId = songsList.map((songs) => songs.id.videoId)
  const index = mapVideoId.findIndex((x) => x === id)

  const handleNext = () => {
    // console.log(songsList)
    console.log('current', id)

    console.log(index)


    if (index < mapVideoId.length - 1) {
      console.log(mapVideoId[index + 1])
      navigate(`/play/${mapVideoId[index + 1]}`,{replace:true})
      // setCurrentSongInfo({ id: mapVideoId[index + 1] })
      // dispatch(addSongInfo({ id: mapVideoId[index + 1] }))
      // setIsPlaying(false)
    }
    else {
      console.log('you reached at end')
      setAlertMessage('you reached at end')
      setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }
  }


  const handlePrev = () => {
    console.log(songsList)
    console.log('current', id)
    console.log(index)


    if (index > 0) {
      console.log(mapVideoId[index - 1])
      navigate(`/play/${mapVideoId[index - 1]}`,{replace:true})
      // setCurrentSongInfo({ id: mapVideoId[index - 1] })
      // dispatch(addSongInfo({ id: mapVideoId[index - 1] }))

      // setIsPlaying(false)
    }
    else {
      console.log('you reached at first')
      setAlertMessage('you reached at first')
      setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }

  }

  // useEffect(() => {
  //   localStorage.setItem('currentSongInfo', JSON.stringify(currentSong))
  // }, [currentSong])



  // web media session 

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songsInfo[0]?.snippet?.title,
      album: songsInfo[0]?.snippet?.channelTitle,
      artwork: [
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '96x96', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '128x128', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '192x192', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '256x256', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '384x384', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '512x512', type: 'image/png' },
      ]
    });
  }






  return (
    <div className="player-page-section">
      {/* <Header /> */}
     {/* {!onMiniPlayer && <div className="top-player-controll-wrapper">
        <div className="player-minimize-wrapper cur-pointer" onClick={() => setOnMiniPlayer(!onMiniPlayer)}>
          <BsChevronDown style={{ width: '100%', height: '100%' }} />
        </div>
      </div>} */}


      <div className='player-section ' >
        <div className="player-container">
          <div className="player-song-image-wrapper">
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt="song-poster"
              className='player-song-image'
            />
          </div>
          <div className="player-song-title-channel-wrapper absolute-center">
            <div className="player-song-title">
              {songsInfo[0]?.snippet?.title.slice(0, 70) + '...'}
            </div>
            <div className="player-song-channel">
              • {songsInfo[0]?.snippet?.channelTitle}
            </div>
          </div>

          <audio src={songUrl} ref={audioRef} onTimeUpdate={onPlaying}
            onCanPlay={()=>setAudioLoading(false)}
            onEnded={()=> autoPlay && handleNext()} 
            autoPlay={autoPlay}  />


          <PlayerControls audioRef={audioRef}
            progress={progress} audioLoading={audioLoading}
            audioDuration={songsInfo[0]?.contentDetails?.duration}
            songsList={songsList}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
          />

          {alertMessage && <div className="alert-message-wrapper">
            <div className="alert-message">
              {alertMessage}
            </div>
          </div>}
        </div>



        <RelatedSongs videoId={id} songsList={songsList} setSongsList={setSongsList} setIsPlaying={setIsPlaying} />


      </div>
      
     { onMiniPlayer && <MiniPlayer
        songsInfo={songsInfo}
        videoId={id}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleNext={handleNext}
        handlePrev={handlePrev}
        audioLoading={audioLoading}
        audioRef={audioRef}
        songsList={songsList}
        onMiniPlayer={onMiniPlayer}
        setOnMiniplayer={setOnMiniPlayer}
      />}
      
    


    </div>
  )
}

export default Player