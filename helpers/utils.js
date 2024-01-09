export function jsonToVtt(subtitles) {
  if (!Array.isArray(subtitles)) {
    console.error("Invalid input. Expected an array of subtitles.");
    return "";
  }

  let vttContent = "WEBVTT\n\n";

  subtitles.forEach((subtitle, index) => {
    const start = formatTimetoVtt(subtitle.start);
    const end = formatTimetoVtt(subtitle.end);
    vttContent += `${index + 1}\n${start} --> ${end}\n${subtitle.subtext}\n\n`;
  });

  return vttContent;

  function formatTimetoVtt(time) {
    return `${time}:000`;
  }
}
