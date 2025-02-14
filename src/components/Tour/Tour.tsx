import { MpSdk, setupSdk } from "@matterport/sdk";
import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import confetti from 'canvas-confetti';
import CloseIcon from '@mui/icons-material/Close';
import "./Tour.css";

function Tour() {
  const [sdk, setSdk] = useState<MpSdk>();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [visited, setVisited] = useState(new Set<number>());
  const [controlsVisible, setControlsVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const location = useLocation();
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsShown, setCongratsShown] = useState(false);


  const handleMouseEnter = () => {
    setControlsVisible(true);
  };

  const handleMouseLeave = () => {
    setControlsVisible(false);
  };

  const container = useRef<HTMLDivElement>(null);

  let started = false;

  const handleScroll = (event: any) => {
    const container = event.target;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'auto'
    });
  };

  useEffect(() => {
    if (!started && container.current) {
      started = true;
      setupSdk("wgb4afxumeh29db8d1rr2nyya", {
        container: container.current,
        space: "fd5cUURtJq2",
        iframeQueryParams: { qs: 1 },
        iframeAttributes: {
          allowFullScreen: true,
          frameborder: 0,
          allowtransparency: true
        }
      }).then(setSdk);

    }
  }, []);

  useEffect(() => {
    sdk?.Tag.data.subscribe({
      onAdded(index, item, collection) {
        console.log('Tag added to the collection', index, item, collection);
      },
      onRemoved(index, item, collection) {
        console.log('Tag removed from the collection', index, item, collection);
      },
      onUpdated(index, item, collection) {
        console.log('Tag updated in place in the collection', index, item, collection);
      },
      onCollectionUpdated(collection) {
        console.log('The full collection of Tags looks like', collection);

        let newFavorites = [];
        for (const [_, value] of collection) {
          newFavorites.push(value);
        }
        setFavorites([...newFavorites]);
        setProgressVisible(true);
      }
    });

    if (location.state?.tag) {
      goToFavorite(location.state.tag);
    }

  }, [sdk]);
  sdk?.Camera.pose.subscribe(pose => {
    let position = pose.position;
    favorites.forEach(favorite => {
      const favoritePosition = favorite.anchorPosition;
      if (!visited.has(favorite.id) && Math.abs(favoritePosition.x - position.x) <= 10 && Math.abs(favoritePosition.z - position.z) <= 3) {
        visited.add(favorite.id);
        setVisited(new Set(visited));
      }
    });
  });

  const goToFavorite = (sid: any) => {
    sdk?.Mattertag.navigateToTag(sid, sdk?.Mattertag.Transition.INSTANT);
    visited.add(sid);
    setCurrentTag(sid);
    setVisited(new Set(visited));
  }
  
  useEffect(() => {
    if (progressVisible && visited.size === favorites.length && !congratsShown) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowCongrats(true);
      setCongratsShown(true); 
    }
  }, [visited, favorites.length, progressVisible, congratsShown]);

  const Congrats = () => (
    <div className="congrats">
      <div className="congrats-content">
        Congratulations!<br/><br/>
        You've discovered all the points of interest.<br/>
        <button onClick={() => setShowCongrats(false)} className="close-congrats-btn">
          <CloseIcon/>
        </button>
        
      </div>
    </div>
  );
  
  

  return (
    <>
      <div className="overlay" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            {showCongrats && <Congrats />}
        <div className="controls">


          <ol className={controlsVisible ? "predefTag" : "predefTagOpen"} onWheel={handleScroll}>
            {favorites.map((fav, index) => {
              const isVisited = visited.has(fav.id);
              const isActive = currentTag === fav.id;
              return (
              <li key={fav.id} className={`predefTag-${index + 1} ${isVisited ? 'visited' : ''} ${isActive ? 'active' : ''}`} >
                  <button onClick={() => goToFavorite(fav.id)}>
                    {fav.label}
                    <span className={`circle-checkbox ${isVisited ? 'filled' : ''}`}></span>
                  </button>
              </li>
              );
            })}
            </ol>
          
          {progressVisible &&
            <Progress percent={visited.size / favorites.length * 100} theme={
              {
                error: {
                  trailColor: 'pink',
                  color: 'red'
                },
                default: {
                  trailColor: 'lightblue',
                  color: 'blue'
                },
                active: {
                  color: '#fbc630'
                },
                success: {
                  trailColor: 'lime',
                  color: 'green'
                }
              }
            }/>
          }
        </div>
      </div>
      {controlsVisible && <div className="dark-overlay"></div>}
      <div className="container" ref={container} ></div>


    </>
  )
}

export default Tour;