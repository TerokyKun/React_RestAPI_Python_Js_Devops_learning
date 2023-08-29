import React, { useState } from "react";
import axios from "axios";
import classes from "./ArtGenerate.module.scss";
import Prompt from "../components/UI/Generation/Prompt";
import Negative from "../components/UI/Generation/Negative";
import Button from "../components/UI/Buttons/Button";
import Width from "../components/UI/Generation/Width";
import Height from "../components/UI/Generation/Height";
import SessionBase64Gallery from "../components/UI/Generation/SessionBase64Gallery";

const ArtGenerate = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(
    "(deformed, distorted, disfigured:1.3), (loli:1.4), poorly drawn, bad anatomy, wrong anatomy, (nude:1.4), extra limb, missing limb, floating limbs, (spread legs:1.4), (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation, EasyNegativeV2,ng_deepnegative_v1_75,(nsfw:1.4)"
  );
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [sessionList, setSessionList] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [optionPayload, setOptionPayload] = useState({
    sd_model_checkpoint: "meinamix_meinaV11.safetensors [54ef3e3610]",
    CLIP_stop_at_last_layers: 2,
  });

  const apiUrl = "http://127.0.0.1:7860/sdapi/v1/txt2img";
  const optionsUrl = "http://127.0.0.1:7860/sdapi/v1/options";

  const handleGenerateImage = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);

      // Update options via API call
      await axios.post(optionsUrl, optionPayload);

      const payload = {
        prompt: prompt,
        negative_prompt: negativePrompt,
        steps: 20,
        cfg_scale: 8,
        width: width,
        height: height,
        seed: -1,
        sampler_index: "Euler a",
      };

      const response = await axios.post(apiUrl, payload);
      const imageBlob = await fetch(
        `data:image/jpeg;base64,${response.data.images[0]}`
      ).then((res) => res.blob());

      const newSession = {
        id: Date.now(),
        imageBase64: response.data.images[0],
        prompt: prompt,
        negativePrompt: negativePrompt,
        width: width,
        height: height,
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
            <option value="hassakuHentaiModel_v13.safetensors [7eb674963a]">
              hassakuHentaiModel_v13.safetensors
            </option>
            <option value="meinamix_meinaV11.safetensors [54ef3e3610]">
              meinamix_meinaV11.safetensors
            </option>
            {/* Add more options as needed */}
          </select>
          <Prompt value={prompt} onChange={setPrompt} />
          <Negative value={negativePrompt} onChange={setNegativePrompt} />
          <Width value={width} onChange={setWidth} />
          <Height value={height} onChange={setHeight} />
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
