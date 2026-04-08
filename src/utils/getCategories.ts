import Papa from "papaparse";

export interface Category {
  id: string;
  name: string;
  label: string;
}

const CATEGORIES_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=215447160&single=true&output=csv";

let categoriesCache: Record<string, Category[]> = {};

export const fetchAllCategories = async (
  lang: string = "en"
): Promise<Category[]> => {
  if (categoriesCache[lang]) return categoriesCache[lang];

  try {
    const response = await fetch(CATEGORIES_SHEET_URL, {
      cache: "no-store",
    });

    const csvText = await response.text();

    const rows = Papa.parse(csvText, {
      delimiter: "",
      skipEmptyLines: true,
    }).data as string[][];

    if (!rows.length) throw new Error("Empty data");

    const languages = rows[0].map((l) => l.trim().toLowerCase());

    const normalizedLang = lang.trim().toLowerCase();

    const langIndex = languages.indexOf(normalizedLang);
    const enIndex = languages.indexOf("en");

    if (langIndex === -1 || enIndex === -1) {
      console.error("Languages found:", languages);
      throw new Error(`Language ${lang} not found`);
    }

    const dataRows = rows.slice(1);

    const dynamicCategories: Category[] = dataRows
      .map((row) => {
        const enValue = row[enIndex]?.trim();

        if (!enValue) return null;

        return {
          id: enValue.toLowerCase().replace(/\s+/g, "_"),
          name: enValue.toLowerCase().replace(/\s+/g, "_"),
          label: row[langIndex]?.trim() || enValue,
        };
      })
      .filter(Boolean) as Category[];

    const result: Category[] = [
      {
        id: "all",
        name: "all",
        label: normalizedLang === "ua" ? "Всі" : "All",
      },
      {
        id: "new",
        name: "new",
        label: normalizedLang === "ua" ? "Нові" : "New",
      },
      {
        id: "sale",
        name: "sale",
        label: normalizedLang === "ua" ? "Знижки" : "Sale",
      },
      ...dynamicCategories,
    ];

    categoriesCache[lang] = result;

    return result;
  } catch (error) {
    console.error("Error loading categories:", error);

    return [
      { id: "all", name: "all", label: "All" },
      { id: "new", name: "new", label: "New" },
    ];
  }
};