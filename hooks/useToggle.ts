import { useState } from 'react';

export function useToggle(initialValue: boolean): [boolean, (value?: boolean) => void] {
  const [state, setState] = useState(initialValue);

  const toggle = (value?: boolean) => {
    if (typeof value === 'boolean') {
      setState(value);
    } else {
      setState((prev) => !prev);
    }
  };

  return [state, toggle];
}
