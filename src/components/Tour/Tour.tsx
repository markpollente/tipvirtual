import { MpSdk, setupSdk } from "@matterport/sdk";
import { useEffect, useRef, useState } from "react";

import "./Tour.css";

function Tour() {
  const [sdk, setSdk] = useState<MpSdk>();
  const [horizontal, setHorizontal] = useState(45);
  const [vertical, setVertical] = useState(15);
  const [favorites, setFavorites] = useState<any[]>([]);

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
    let buttonDisplayed: boolean;
    initTags().then(() => {
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
            newFavorites.push({ ...value})
          }
          setFavorites(newFavorites);
        }
      });
    });
  }, [sdk]);

  const initTags = async () =>  {
    await sdk?.Mattertag.add([{
      label: 'Main Building',
      description: "Test",
      anchorPosition: {x: -78.8348218075196, y: 1.224310426550836, z: -43.62401061071125},
      stemVector: { // make the Tag stick straight up and make it 0.30 meters (~1 foot) tall
        x: 0,
        y: 0.30,
        z: 0,
      },
      color: { // blue disc
        r: 0.0,
        g: 0.0,
        b: 1.0,
      },
    },
      {
        label: 'Parking',
        description: "Test",
        anchorPosition: {x: -74.19203936201427, y: 0.0320872962474823, z: -30.431369493758055},
        stemVector: { // make the Tag stick straight up and make it 0.30 meters (~1 foot) tall
          x: 0,
          y: 0.30,
          z: 0,
        },
        color: { // blue disc
          r: 0.0,
          g: 0.0,
          b: 1.0,
        },
      }
      ]);
  }

  const rotate = () => {
    sdk?.Camera.rotate(horizontal, vertical);
  };

  const goToFavorite = (sid: any) => {
    sdk?.Mattertag.navigateToTag(sid, sdk?.Mattertag.Transition.FLY);
  }

  return (
    <>
      <div className="container" ref={container} ></div>


      <div className="grid gap-2.5 my-5 mx-auto max-w-[150px] justify-center">
        <ol>
          {favorites.map(fav => <li key={fav.id}>
            <button onClick={() => goToFavorite(fav.id)}>{fav.label}</button>
          </li>)}
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