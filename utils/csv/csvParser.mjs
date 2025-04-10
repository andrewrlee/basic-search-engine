import { PassThrough, pipeline } from "stream";
import { CsvTransformer } from "./csvTransformer.mjs";

export const transformCsvStream = (readStream) => {
  const csvTransformer = new CsvTransformer();
  const outputReadable = new PassThrough({ objectMode: true });

  pipeline(readStream, csvTransformer, outputReadable, (err) => {
    if (err) {
      outputReadable.emit("error", err);
    } else {
      outputReadable.end();
    }
  });

  return outputReadable;
};
