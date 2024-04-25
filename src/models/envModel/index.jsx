import { useState, useEffect, useTransition } from "react";

function Env() {
    const [preset, setPreset] = useState("sunset");
    const [inTransition, startTransition] = useTransition();
    const { blur } = useControls({
      blur: { value: 0.65, min: 0, max: 1 },
      preset: {
        value: preset,
        options: [
          "sunset",
          "dawn",
          "night",
          "warehouse",
          "forest",
          "apartment",
          "studio",
          "city",
          "park",
          "lobby",
        ],
        onChange: (value) => startTransition(() => setPreset(value)),
      },
    });
    return <Environment preset={preset} background blur={blur} />;
  }