import { MpSdk, setupSdk } from "@matterport/sdk";
import { useEffect, useRef, useState } from "react";
import "./Tour.css";

function Tour() {
  const [sdk, setSdk] = useState<MpSdk>();
  const [horizontal, setHorizontal] = useState(45);
  const [vertical, setVertical] = useState(15);
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

  const rotate = () => {
    sdk?.Camera.rotate(horizontal, vertical);
  };

  return (
    <>
      <div className="container" ref={container}></div>

      <div className="grid gap-2.5 my-5 mx-auto max-w-[150px] justify-center">
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
  );
}

export default Tour;