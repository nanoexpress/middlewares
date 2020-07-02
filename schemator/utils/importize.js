import jsYaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const importize = ({ path: _path, raw }, directory) => {
  if (path && !raw) {
    const resolveFile = path.resolve(directory, _path);

    const readBuffer = fs.readFileSync(resolveFile, 'utf-8');

    if (_path.endsWith('.yaml') || _path.endsWith('.yml')) {
      return jsYaml.safeLoad(readBuffer);
    } else if (_path.endsWith('.json')) {
      return JSON.parse(readBuffer);
    } else {
      throw new Error('Only YAML and JSON file types are allowed');
    }
  } else if (typeof raw === 'object' && raw && !path) {
    return raw;
  }
};

export default importize;
