import path from 'path';
import fs from 'fs';

/**
 * Read file content
 * @param {string} filePath File path to read
 * @returns {string | Buffer} File content
 */
const readFile = (
  filePath: string,
  options?: { encoding?: BufferEncoding; flag?: string } | undefined | null
): string | Buffer => {
  try {
    const fileContent = fs.readFileSync(filePath, options);
    return fileContent;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Write file content
 * @param {string} filePath File path to write
 * @param {string | Buffer} data Data to write into file
 * @returns {string} File path writted
 */
const writeFile = (filePath: string, data: string | Buffer): string => {
  try {
    fs.writeFileSync(filePath, data);
    return filePath;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Append file content
 * @param {string} filePath File path to append
 * @param {string | Buffer} data Data to append into file
 * @returns {string} File path updated
 */
 const appendFile = (filePath: string, data: string | Buffer): string => {
  try {
    fs.appendFileSync(filePath, data);
    return filePath;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * List directory files
 * @param {string} dirPath Directory path to read
 * @returns {string} Directory path readed
 */
const listFiles = (dirPath: string): string[] => {
  const excludeFiles = ['.DS_Store'];
  try {
    const files = fs
      .readdirSync(dirPath)
      .filter((f) => !excludeFiles.includes(f));
    return files;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Create directory
 * @param {string} dirPath Directory path to create
 * @returns {string} Directory path created
 */
const mkdir = (dirPath: string): string => {
  try {
    const dirExists = fs.existsSync(dirPath);
    if (!dirExists) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    return dirPath;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get filename without its extension
 * @param {string} filePath File path to get filename
 * @returns {string} Filename without extension
 */
const getFileNameWithoutExt = (filePath: string): string => {
  try {
    return path.parse(filePath).name;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Check file exists
 * @param {string} filePath File path to check if exists
 * @returns {Boolean} File exists or not
 */
const checkFile = (filePath: string): boolean => {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    throw new Error(error);
  }
};


export { readFile, writeFile, appendFile, listFiles, mkdir, getFileNameWithoutExt, checkFile };