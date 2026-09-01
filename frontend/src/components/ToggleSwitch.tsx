import React, { useId } from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Size in rem, default 5rem */
  width?: string;
  /** Hue for the off/neutral side, default 220deg */
  hue?: string;
  /** Hue for the on/accent side, default 22deg */
  accentHue?: string;
}

/**
 * Neumorphic toggle switch — from Uiverse.io by csemszepp.
 * 
 * Usage:
 * <ToggleSwitch checked={on} onChange={setOn} />
 */
export default function ToggleSwitch({
  checked,
  onChange,
  width = '5rem',
  hue = '220deg',
  accentHue = '22deg',
}: ToggleSwitchProps) {
  const id = useId();

  return (
    <div
      className="toggle-container"
      style={{
        ['--width' as string]: width,
        ['--hue' as string]: hue,
        ['--accent-hue' as string]: accentHue,
      }}
    >
      <label className="switch" htmlFor={id}>
        <input
          className="togglesw"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="indicator left" />
        <div className="indicator right" />
        <div className="button" />
      </label>
    </div>
  );
}
