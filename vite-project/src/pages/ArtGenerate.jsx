import React, { useState } from "react";
import axios from "axios";
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

const ArtGenerate = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(
    "(deformed, distorted, disfigured:1.3), (loli:1.4), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs,  (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation, (underwear, panties, bra, swimsuit, bed linen,nippless, skirt, underpants, nude breast, without clothes, text:1.4),  "
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

  const apiUrl = "http://127.0.0.1:7860/sdapi/v1/txt2img";
  const optionsUrl = "http://127.0.0.1:7860/sdapi/v1/options";

  const handleGenerateImage = async () => {
    if (isGenerating) return;

    // Фильтрация нежелательных символов из prompt
    const sanitizedPrompt = prompt.replace(/\b(loli|nude|amputation|nsfw|sex|sexy|porn|18+|pregnant|spread|pussy|anal|vaginal|penetration|anus|penis|lesbian|nipples|cum|nipples|masturbation|breast|sexsual|nudes|dick|furry|gay|furry|nudes|naked|slut|BDSM|slave|cumming|pubic hair|gang bang|gangbang|rape|homosexual|impregnation|fuck|sexing|striptease)\b/g, 'sfw');

    try {
      setIsGenerating(true);

      // Update options via API call
      await axios.post(optionsUrl, optionPayload);

      const payload = {
        prompt: sanitizedPrompt,  // Используем отфильтрованный prompt
        negative_prompt: negativePrompt,
        steps: steps,
        cfg_scale: cfg_scale,
        width: width,
        height: height,
        seed: seed,
        sampler_index: "Euler a",
      };

      const response = await axios.post(apiUrl, payload);
      // const imageBlob = await fetch(
      //   `data:image/jpeg;base64,${response.data.images[0]}`
      // ).then((res) => res.blob());

      const backIngoImage = response.data.info 
      const useBackIngoImage = JSON.parse(backIngoImage)
      // console.log(imageBlob)

      const newSession = {
        id: Date.now(),
        imageBase64: response.data.images,
        prompt:  useBackIngoImage.prompt,  // Используем отфильтрованный prompt
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
    <div className={classes.artZone}>
      <div className={classes.container}>
        <h2>Hello in generation!</h2>
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
            <Seed value={seed} onChange={setSeed}/>
            <Steps value={steps} onChange={setSteps}/>
            <CFGscale value={cfg_scale} onChange={setScale}/>
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
  );
};

export default ArtGenerate;
