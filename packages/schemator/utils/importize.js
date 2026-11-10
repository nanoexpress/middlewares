import fs from 'node:fs';
import { load as loadYaml } from 'js-yaml';
import path from 'node:path';

// eslint-disable-next-line consistent-return
const importize = ({ path: _path, raw }, directory) => {
  if (path && !raw) {
    const resolveFile = path.join(directory.substring(1), _path);

    const readBuffer = fs.readFileSync(resolveFile, 'utf-8');

    if (_path.endsWith('.yaml') || _path.endsWith('.yml')) {
      return loadYaml(readBuffer);
    }
    if (_path.endsWith('.json')) {
      return JSON.parse(readBuffer);
    }
    throw new Error('Only YAML and JSON file types are allowed');
  } else if (typeof raw === 'object' && raw && !path) {
    return raw;
  }
};

export default importize;
