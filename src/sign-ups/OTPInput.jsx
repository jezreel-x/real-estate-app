// OTPInput.jsx
import React, { useRef, useState } from "react";
import logo from '../assets/black.png';
import { useNavigate, useLocation } from "react-router-dom";

/**
 * OTPInput
 *
 * Props:
 *  - length (number) default 6
 *  - onComplete (function) called with the full code string when all digits are filled
 */
export default function OTPInput({ length, onComplete }) {
  const [values, setValues] = useState(Array.from({ length }, () => ""));

  // inputsRef.current will hold references to each input element
  // inputsRef.current[0] -> first input, etc.
  const inputsRef = useRef([]);

  const { state } = useLocation();
  const method = state?.method || "your method";

  const navigate = useNavigate();

  // Helper: focus input by index
  // moves focus to the input at given index
  const focusInput = (index) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  };

  // Helper: set a single cell value (immutable update)
  const setValueAt = (index, val) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  // Called on each input change
  const handleChange = (e, index) => {
    const raw = e.target.value || "";
    // Keep digits only
    const digits = raw.replace(/\D/g, "");

    if (!digits) {
      // If user pasted non-digits or cleared
      setValueAt(index, "");
      return;
    }

    // If user pasted multiple digits into one box (or typed quickly)
    if (digits.length > 1) {
      // distribute digits across inputs starting from 'index'
      setValues((prev) => {
        const next = [...prev];
        let writeIdx = index;
        for (let ch of digits) {
          if (writeIdx >= length) break;
          next[writeIdx] = ch;
          writeIdx++;
        }
        // focus after the last written index (or last box)
        setTimeout(() => focusInput(Math.min(writeIdx, length - 1)), 0);
        // if all filled, call complete
        if (next.every((d) => d !== "")) {
          onComplete();
        }
        return next;
      });
      return;
    }

    // Single-digit case
    const digit = digits[0];
    setValueAt(index, digit);

    // move focus to next input if exists
    const nextIndex = Math.min(index + 1, length - 1);
    if (index < length - 1) {
      // small timeout to ensure dom updates before focusing
      setTimeout(() => focusInput(nextIndex), 0);
    }



    // handles edge case where user fills last box
    setTimeout(() => {

      // merges current values to string
      const code = inputsRef.current.map((i) => i?.value || "").join("");

      // checks to see if all boxes are filled with digits
      if (code.length === length && /^\d+$/.test(code)) {
        onComplete();
      }
    }, 0);
  };

  // Key handling: backspace behavior and arrow navigation
  const handleKeyDown = (e, index) => {
    const key = e.key;

    // Backspace: if current box is empty, go to previous; if not empty, clear it
    if (key === "Backspace") {
      if (values[index]) {
        // clear current value (handled by default onChange too, but ensure state)
        setValueAt(index, "");
        // keep focus on current (but user expectation often is to stay)
        return;
      }
      // If current is empty, move to previous and clear it
      if (index > 0) {
        e.preventDefault(); // prevent browser navigation in some contexts
        setValueAt(index - 1, "");
        focusInput(index - 1);
      }
    }

    // Arrow left/right navigation
    if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    }
    if (key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }

    // Allow digits and navigation, block others (optional)
    // (We don't need to block as onChange filters non-digits)
  };

  // Paste handler: distribute pasted digits across inputs starting from index
  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "");
    if (!digits) return;

    setValues((prev) => {
      const next = [...prev];
      let writeIdx = index;
      for (let ch of digits) {
        if (writeIdx >= length) break;
        next[writeIdx] = ch;
        writeIdx++;
      }
      // focus after pasted block (or last cell)
      setTimeout(() => focusInput(Math.min(writeIdx, length - 1)), 0);

      // if all filled, call onComplete
      if (next.every((d) => d !== "")) {
        onComplete();
      }
      return next;
    });
  };

  // Submit handler (for forms)
  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const code = values.join("");
    if (code.length !== length || /\D/.test(code)) {
      // you can provide feedback here (toast, inline message, etc.)
      // For demo we'll console.warn
      console.warn("Incomplete or invalid OTP:", code);
      return;
    }
    onComplete();
  };

  // Render
  return (
    <form onSubmit={handleSubmit} className="mx-auto">

        <img 
            src={logo}
            alt="logo"
            className="w-24 h-auto my-6 mx-auto"
        />

        <label className="my-8 block text-center text-2xl font-bold text-gray-900" aria-hidden>
            Confirm OTP
        </label>

        <label className="my-8 block text-center text-xl font-semibold text-gray-700" aria-hidden>
            Enter the 6-digit code sent to your 
            {
              method === "Email" ? " email address" : " phone number"
            }.
        </label>

        <div
            role="group"
            aria-label={`One-time code — ${length} digits`}
            className="flex gap-2 justify-center items-center"
        >
            {Array.from({ length }).map((_, idx) => (
            <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                value={values[idx]}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={(e) => handlePaste(e, idx)}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                type="text"
                maxLength={1}
                aria-label={`Digit ${idx + 1}`}
                // Nice accessible visual styling
                className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-gray-900 text-center rounded-md 
                text-lg sm:text-xl md:text-2xl font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 
                transition-shadow bg-white caret-transparent`}
                // prevent mobile from suggesting previous values inside each cell
                spellCheck="false"
            />
            ))}
        </div>

        {/* Optional helper / submit */}
        <div className="my-8 flex items-center justify-between">
            {/* <button
            type="button"
            onClick={() => {
                // clear
                setValues(Array.from({ length }, () => ""));
                focusInput(0);
            }}
            className="text-sm text-gray-600 hover:text-amber-600"
            >
            Clear
            </button> */}

            <button
            type="submit"
            className={`px-5 py-4 cursor-pointer rounded-lg w-full text-white text-lg font-semibold
                ${values.every((v) => v !== "") ? "bg-amber-600 hover:bg-amber-700" : "bg-gray-300 cursor-not-allowed"}`}
            disabled={!values.every((v) => v !== "")}
            onClick={() => navigate('/')}
            >
            Verify
            </button>
        </div>
    </form>
  );
}
