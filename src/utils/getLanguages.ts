import Papa from "papaparse";

const CATEGORIES_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=215447160&single=true&output=csv";

export const fetchLanguages = async (): Promise<string[]> => {
  try {
    const response = await fetch(CATEGORIES_SHEET_URL, { cache: "no-store" });
    const csvText = await response.text();

    const rows = Papa.parse(csvText, { skipEmptyLines: true }).data as string[][];
    if (!rows.length) return [];

    return rows[0].map((l) => l.trim().toLowerCase());
  } catch (error) {
    console.error("Error fetching languages:", error);
    return ["en", "ua"];
  }
};