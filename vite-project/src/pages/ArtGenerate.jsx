import React, { useState } from "react";
import axios from "axios";
import bannedWords from "../config/bannedWords.json";
import classes from "./ArtGenerate.module.scss";
import Prompt from "../components/UI/Generation/Prompt";
import Negative from "../components/UI/Generation/Negative";
import Button from "../components/UI/Buttons/Button";
import Width from "../components/UI/Generation/Width";
import Height from "../components/UI/Generation/Height";
import SessionBase64Gallery from "../components/UI/Generation/SessionBase64Gallery";
import Seed from "../components/UI/Generation/Seed";
import Steps from "../components/UI/Generation/Steps";
import CFGscale from "../components/UI/Generation/CFGscale";
import { useSelector } from "react-redux";
import { selectIsAuth, selectToken } from "../redux/slises/auth";
import Burgermenu from "../components/UI/Burgermenu/Burgermenu";

const ArtGenerate = () => {
  const isAuth = useSelector(selectIsAuth);
  const token = useSelector(selectToken) || (document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1] || " ");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(
    "(deformed, distorted, disfigured:1.3), (loli:1.4), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs,  (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry"
  );
  const [seed, setSeed] = useState(-1);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [sessionList, setSessionList] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState(20);
  const [cfg_scale, setScale] = useState(7);

  const [optionPayload, setOptionPayload] = useState({
    sd_model_checkpoint: "meinamix_meinaV11.safetensors [54ef3e3610]",
    CLIP_stop_at_last_layers: 2,
  });

  const apiUrl = "http://127.0.0.1:4000/createimg";
  const optionsUrl = "http://127.0.0.1:4000/sendoption";

  const handleGenerateImage = async () => {

    if (isGenerating) return;

    // Фильтрация нежелательных символов из prompt в формате /\b(badprompt1|badprompt2|badprompt3|...)\b/g или
    // const sanitizedPrompt = prompt.replace(
    //   /\b()\b/g,
    //   ""
    // );


    //Новый варинат фильтрации через регулярное выражение из config файла (сами его составьте)
    const regex = new RegExp(`\\b(${bannedWords.join("|")})\\b`, "gi");
    const sanitizedPrompt = prompt.replace(regex, "");


    try {
      setIsGenerating(true);

      // Update options via API call
      await axios.post(optionsUrl, optionPayload);

      const payload = {
        prompt: sanitizedPrompt, // Используем отфильтрованный prompt
        negative_prompt: negativePrompt,
        steps: steps,
        cfg_scale: cfg_scale,
        width: width,
        height: height,
        seed: seed,
        sampler_index: "Euler a",
      };


      const response = await axios.post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // const imageBlob = await fetch(
      //   `data:image/jpeg;base64,${response.data.images[0]}`
      // ).then((res) => res.blob());

      const backIngoImage = response.data.info;
      const useBackIngoImage = JSON.parse(backIngoImage);

      // console.log(backIngoImage);


      const newSession = {
        id: Date.now(),
        imageBase64: response.data.images,
        prompt: useBackIngoImage.prompt, // Используем отфильтрованный prompt
        negativePrompt: useBackIngoImage.negative_prompt,
        width: useBackIngoImage.width,
        height: useBackIngoImage.height,
        seed: useBackIngoImage.seed,
        steps: useBackIngoImage.steps,
        cfg_scale: useBackIngoImage.cfg_scale,
      };

      setSessionList([newSession, ...sessionList]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionChange = (key, value) => {
    setOptionPayload((prevPayload) => ({
      ...prevPayload,
      [key]: value,
    }));
  };

  return (
    <>
      {isAuth ? (
        <>
        <div className={classes.artZoneBG}>
          <div className={classes.artZone}>
            <div className={classes.container}>

            <Burgermenu></Burgermenu>

              <h2 className={classes.heading}>Hello in generation!</h2>
              <section>
                <select
                  value={optionPayload.sd_model_checkpoint}
                  onChange={(e) =>
                    handleOptionChange("sd_model_checkpoint", e.target.value)
                  }
                >
                  <option value="CounterfeitV30_v30.safetensors [cbfba64e66]">
                    CounterfeitV30_v30
                  </option>
                  <option value="meinamix_meinaV11.safetensors [54ef3e3610]">
                    meinamix_meinaV11
                  </option>
                </select>
                <Prompt value={prompt} onChange={setPrompt} />
                <Negative value={negativePrompt} onChange={setNegativePrompt} />
                <div className={classes.params}>
                  <Width value={width} onChange={setWidth} />
                  <Height value={height} onChange={setHeight} />
                  <Seed value={seed} onChange={setSeed} />
                  <Steps value={steps} onChange={setSteps} />
                  <CFGscale value={cfg_scale} onChange={setScale} />
                </div>
              </section>
              <Button
                className={classes.button}
                onClick={handleGenerateImage}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Image"}
              </Button>
            </div>
            <SessionBase64Gallery sessionList={sessionList} />
          </div>
        </div>
        </>
      ) : (
        <>
          <Burgermenu></Burgermenu>
          <h2 className={classes.heading}>Hello in generation!</h2>
          <p className={classes.loginPls}>
            Welcome! Log in or register to join our community of creative
            people. If you don't want to register right now, you can view the
            gallery of the best works and posts from our community.
          </p>
        </>
      )}
    </>
  );
};

export default ArtGenerate;
