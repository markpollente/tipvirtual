import { MpSdk, setupSdk } from "@matterport/sdk";
import { useEffect, useRef, useState } from "react";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import "./Tour.css";

function Tour() {
  const [sdk, setSdk] = useState<MpSdk>();
  const [horizontal, setHorizontal] = useState(45);
  const [vertical, setVertical] = useState(15);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [visited, setVisited] = useState(new Set<number>());

  const container = useRef<HTMLDivElement>(null);

  let started = false;

  useEffect(() => {
    if (!started && container.current) {
      started = true;
      setupSdk("nid5a57zkc7ecf32m9nig3ncb", {
        container: container.current,
        space: "mbb564E3oxH",
        iframeQueryParams: { qs: 1 },
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
  const rotate = () => {
    sdk?.Camera.rotate(horizontal, vertical);
  };

  const goToFavorite = (sid: any) => {
    sdk?.Mattertag.navigateToTag(sid, sdk?.Mattertag.Transition.FLY);
    visited.add(sid);
    setVisited(new Set(visited));
  }

  return (
    <>
      <div className="container" ref={container} ></div>
      {visited.size}
      {favorites.length}
      <Progress percent={visited.size / favorites.length * 100} />
      <div className="grid gap-2.5 my-5 mx-auto max-w-[150px] justify-center">
      {/*<ol>
          {favorites.map(fav => <li key={fav.id}>
            <button onClick={() => goToFavorite(fav.id)}>{fav.label}</button>
          </li>)}
        </ol>*/}
        <ol className="predefTag">
          {favorites.map((fav, index) => (
            <li key={fav.id} className={`predefTag-${index + 1}`}>
                <button onClick={() => goToFavorite(fav.id)}>{fav.label}</button>
            </li>
          ))}
        </ol>

        <label className="text-sm">
          <span className="font-bold">Horizontal rotation</span>
          <input
            type="number"
            value={horizontal}
            onInput={(evt) =>
              setHorizontal(parseFloat((evt.target as HTMLInputElement).value))
            }
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm w-full"
          />
        </label>
        <label className="text-sm">
          <span className="font-bold">Vertical rotation</span>
          <input
            type="number"
            value={vertical}
            onInput={(evt) =>
              setVertical(parseFloat((evt.target as HTMLInputElement).value))
            }
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm w-full"
          />
        </label>
        <button
          onClick={rotate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Rotate
        </button>
      </div>
    </>
  )
}

export default Tour;