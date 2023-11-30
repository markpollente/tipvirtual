import { MpSdk, setupSdk } from "@matterport/sdk";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import "./Tour.css";

function Tour() {
  const [sdk, setSdk] = useState<MpSdk>();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [visited, setVisited] = useState(new Set<number>());
  const [controlsVisible, setControlsVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);

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
    sdk?.Mattertag.navigateToTag(sid, sdk?.Mattertag.Transition.FLY);
    visited.add(sid);
    setVisited(new Set(visited));
  }

  return (
    <>
      <div className="overlay" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
        <div className="controls">


          {controlsVisible && <ol className="predefTag" onWheel={handleScroll}>
            {favorites.map((fav, index) => (
              <li key={fav.id} className={`predefTag-${index + 1}`} >
                  <button onClick={() => goToFavorite(fav.id)}>{fav.label}</button>
              </li>
            ))}
            </ol>
          }
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
      <div className="container" ref={container} ></div>


    </>
  )
}

export default Tour;