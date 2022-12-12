import fetch from "node-fetch";

export const fetchInput = async (year, day, sessionId) => {
  const response = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          cookie: `session=${sessionId}`
        }
      }
  );
  return response.text();
}