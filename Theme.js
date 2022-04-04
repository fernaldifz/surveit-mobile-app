import { createTheme } from "@rneui/themed";

const surveitTheme = createTheme({
  Button: {
    color: "#841584",
  },
  Text: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 700,
  },
  colors: {
    purple: "#F8FAFC",
    lavender: "#A889FF",
    yellow: "#F9AD5D",
    turqoise: "#4ECDC4",
    main_0: "#FFFFFF",
    main_50: "#F1F5F9",
    main_100: "#E2E8F0",
    main_200: "#CBD5E1",
    main_300: "#94A3B8",
    main_400: "#64748B",
    main_500: "#475569",
    main_600: "#334155",
    main_700: "#1E293B",
    main_800: "#0F172A",
  },
  heading_1: {
    fontSize: "24",
    lineHeight: "28",
    fontWeight: "700",
  },
  heading_2: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: "600",
  },
  heading_3: {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "600",
  },
  button_1: {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "600",
  },
  button_2: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "600",
  },
  paragraph_1: {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "400",
  },
  paragraph_2: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "400",
  },
  paragraph_2_semibold: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "600",
  },
});

export default surveitTheme;
